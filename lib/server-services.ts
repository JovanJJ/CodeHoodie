import { Pool } from "pg";
import Stripe from "stripe";

const STRIPE_API_VERSION = "2026-04-22.dahlia";
const ORDER_STATUSES = ["DRAFT", "PROCESSING", "SHIPPED", "DELIVERED", "PAID"];

let pool: Pool | null = null;
let stripe: Stripe | null = null;
let ordersSchemaPromise: Promise<void> | null = null;

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

function shouldUseSsl(connectionString: string) {
  return !connectionString.includes("localhost") && !connectionString.includes("127.0.0.1");
}

function assertDeployableDatabaseUrl(connectionString: string) {
  let host = "";

  try {
    host = new URL(connectionString).hostname;
  } catch {
    return;
  }

  if (process.env.VERCEL && /^db\.[^.]+\.supabase\.co$/.test(host)) {
    throw new Error(
      "DATABASE_URL uses the Supabase direct database host. Vercel Functions cannot reliably connect to that IPv6-only host; use the Supabase Supavisor transaction pooler connection string instead."
    );
  }
}

export function getPool() {
  if (!pool) {
    const connectionString = getRequiredEnv("DATABASE_URL");
    assertDeployableDatabaseUrl(connectionString);

    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 10000,
      max: 1,
      ssl: shouldUseSsl(connectionString)
        ? {
          rejectUnauthorized: false,
        }
        : undefined,
    });
  }

  return pool;
}

export function getStripe() {
  if (!stripe) {
    stripe = new Stripe(getRequiredEnv("STRIPE_SECRET_KEY"), {
      apiVersion: STRIPE_API_VERSION,
    });
  }

  return stripe;
}

export function getStripeWebhookSecret() {
  return getRequiredEnv("STRIPE_WEBHOOK_SECRET");
}

export async function ensureOrdersSchema() {
  if (!ordersSchemaPromise) {
    ordersSchemaPromise = ensureOrdersSchemaInternal().catch((error) => {
      ordersSchemaPromise = null;
      throw error;
    });
  }

  return ordersSchemaPromise;
}

async function ensureOrdersSchemaInternal() {
  const db = getPool();

  await db.query(`
    DO $$
    BEGIN
      CREATE TYPE public.order_status AS ENUM ('DRAFT', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'PAID');
    EXCEPTION WHEN duplicate_object THEN
      NULL;
    END
    $$;
  `);

  for (const status of ORDER_STATUSES) {
    await db.query(`ALTER TYPE public.order_status ADD VALUE IF NOT EXISTS '${status}'`);
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      status public.order_status NOT NULL DEFAULT 'DRAFT',
      order_number TEXT NOT NULL,
      product_sku TEXT NOT NULL,
      size TEXT NOT NULL,
      color TEXT NOT NULL,
      price_cents INTEGER NOT NULL,
      customer_email TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      address_line1 TEXT NOT NULL,
      city TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      country_code TEXT NOT NULL,
      stripe_intent_id TEXT,
      order_number_email_sent_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS status public.order_status DEFAULT 'DRAFT',
      ADD COLUMN IF NOT EXISTS order_number TEXT,
      ADD COLUMN IF NOT EXISTS product_sku TEXT,
      ADD COLUMN IF NOT EXISTS size TEXT,
      ADD COLUMN IF NOT EXISTS color TEXT,
      ADD COLUMN IF NOT EXISTS price_cents INTEGER,
      ADD COLUMN IF NOT EXISTS customer_email TEXT,
      ADD COLUMN IF NOT EXISTS customer_name TEXT,
      ADD COLUMN IF NOT EXISTS address_line1 TEXT,
      ADD COLUMN IF NOT EXISTS city TEXT,
      ADD COLUMN IF NOT EXISTS postal_code TEXT,
      ADD COLUMN IF NOT EXISTS country_code TEXT,
      ADD COLUMN IF NOT EXISTS stripe_intent_id TEXT,
      ADD COLUMN IF NOT EXISTS order_number_email_sent_at TIMESTAMP,
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `);

  await db.query("CREATE INDEX IF NOT EXISTS orders_order_number_idx ON orders (order_number)");
  await db.query("CREATE INDEX IF NOT EXISTS orders_stripe_intent_id_idx ON orders (stripe_intent_id)");
}

export function logServerError(label: string, error: unknown) {
  if (error instanceof Error) {
    console.error(label, {
      name: error.name,
      message: error.message,
      type: "type" in error ? error.type : undefined,
      code: "code" in error ? error.code : undefined,
      detail: "detail" in error ? error.detail : undefined,
    });
    return;
  }

  console.error(label, error);
}
