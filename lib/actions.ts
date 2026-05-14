"use server"

import nodemailer from "nodemailer";
import { Pool } from "pg";
import Stripe from "stripe";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const PRODUCT_NAME = "T-SHIRT BLACK&WHITE BLA BLA";
const TSHIRT_PRICE = 2500;

//./stripe listen --forward-to localhost:3000/api/webhook --api-key sk_test_YOUR_KEY_HERE

export async function run() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS test_data (
        id SERIAL PRIMARY KEY,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const insertRes = await pool.query(
      'INSERT INTO test_data (message) VALUES ($1) RETURNING *',
      ['Connection is working!']
    );

    console.log("Inserted Row:", insertRes.rows[0]);

    const selectRes = await pool.query('SELECT * FROM test_data ORDER BY created_at DESC LIMIT 5');
    console.log("Last 5 rows in test_data:", selectRes.rows);

    console.log("--- Database Test Success ---");

    return { ok: true, row: insertRes.rows[0] };
  } catch (err) {
    console.error("--- Database Test Failed ---");
    console.error(err);

    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown database error",
    };
  }
}




export type ShippingInfo = {
  name: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  country: string;
};

export async function createPaymentIntent(
  selectedSize: string,
  selectedColor: string,
  shippingInfo: ShippingInfo
) {
  try {
    const orderNumber = `ORD-${Date.now()}`;
    const size = selectedSize.trim();
    const color = selectedColor.trim();
    const normalizedShippingInfo = {
      name: shippingInfo.name.trim(),
      email: shippingInfo.email.trim(),
      street: shippingInfo.street.trim(),
      zip: shippingInfo.zip.trim(),
      city: shippingInfo.city.trim(),
      country: shippingInfo.country.trim().toUpperCase(),
    };

    if (
      !size ||
      !color ||
      !normalizedShippingInfo.name ||
      !normalizedShippingInfo.email ||
      !normalizedShippingInfo.street ||
      !normalizedShippingInfo.zip ||
      !normalizedShippingInfo.city ||
      !normalizedShippingInfo.country
    ) {
      throw new Error("Missing required checkout information");
    }

    if (!/^[A-Z]{2}$/.test(normalizedShippingInfo.country)) {
      throw new Error("Shipping country must be a two-letter country code");
    }

    await pool.query(
      `
      INSERT INTO orders (
        status,
        order_number,
        product_sku,
        size,
        color,
        price_cents,
        customer_email,
        customer_name,
        address_line1,
        city,
        postal_code,
        country_code
      ) VALUES ($1::public.order_status, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `,
      [
        "DRAFT",
        orderNumber,
        PRODUCT_NAME,
        size,
        color,
        TSHIRT_PRICE,
        normalizedShippingInfo.email,
        normalizedShippingInfo.name,
        normalizedShippingInfo.street,
        normalizedShippingInfo.city,
        normalizedShippingInfo.zip,
        normalizedShippingInfo.country,
      ]
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: TSHIRT_PRICE,
      currency: "usd",
      receipt_email: normalizedShippingInfo.email,
      shipping: {
        name: normalizedShippingInfo.name,
        address: {
          line1: normalizedShippingInfo.street,
          city: normalizedShippingInfo.city,
          postal_code: normalizedShippingInfo.zip,
          country: normalizedShippingInfo.country,
        },
      },
      metadata: {
        order_number: orderNumber,
        size,
        color,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Stripe did not return a client secret");
    }

    await pool.query(
      "UPDATE orders SET stripe_intent_id = $1 WHERE order_number = $2",
      [paymentIntent.id, orderNumber]
    );

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Checkout creation failed:", error);
    throw new Error("Failed to create payment intent");
  }
}


export interface OrderData {
  order_number: string;
  customer_email: string;
}

export type FetchOrderNumberResult =
  | { success: true; orderData: OrderData }
  | { success: false; message: string; orderData?: null };

export async function fetchOrderNumber(intentId: string): Promise<FetchOrderNumberResult> {
  if (!intentId) {
    return { success: false, message: "Payment failed", orderData: null }
  }
  try {
    const sql = `
    SELECT order_number, customer_email FROM orders WHERE stripe_intent_id = $1
    `
    const res = await pool.query<OrderData>(sql, [intentId]);
    const orderData = res.rows[0];

    if (!orderData) {
      return { success: false, message: "Order was not found", orderData: null };
    }

    return { success: true, orderData }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Something went wrong", orderData: null }
  }
}

export async function fetchOrderStatus(orderNumber: string) {
  if (!orderNumber) {
    return { success: false, message: "Order number is missing" }
  }
  try {
    const sql = `SELECT status FROM orders WHERE order_number = $1`;
    const res = await pool.query(sql, [orderNumber]);
    const status = res.rows[0];
    return { success: true, orderStatus: status }
  } catch {
    return { success: false, message: "Something went wrong, please try again later" }
  }
};

const CONTACT_RECIPIENT_EMAIL = "jovanjj99@gmail.com";

export type ContactFormState = {
  ok: boolean;
  message: string;
  fields?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getMailerCredentials() {
  const email = process.env.NODE_MAILER_EMAIL;
  const password = process.env.NODE_MAILER_PW;

  if (!email || !password) {
    return null;
  }

  return { email, password };
}

function createMailerTransporter(credentials: { email: string; password: string }) {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: credentials.email,
      pass: credentials.password,
    },
  });
}

export type OrderNumberEmailResult = {
  ok: boolean;
  sent: boolean;
  message: string;
};

type OrderEmailRow = {
  order_number: string;
  customer_email: string;
  customer_name: string | null;
  order_number_email_sent_at: Date | null;
};

export async function sendOrderNumberEmail(orderNumber: string): Promise<OrderNumberEmailResult> {
  const normalizedOrderNumber = orderNumber.trim();

  if (!normalizedOrderNumber) {
    return {
      ok: false,
      sent: false,
      message: "Order number is missing.",
    };
  }

  const credentials = getMailerCredentials();

  if (!credentials) {
    return {
      ok: false,
      sent: false,
      message: "Order email is not configured yet.",
    };
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const result = await client.query<OrderEmailRow>(
      `
        SELECT
          order_number,
          customer_email,
          customer_name,
          order_number_email_sent_at
        FROM orders
        WHERE order_number = $1
        FOR UPDATE
      `,
      [normalizedOrderNumber]
    );
    const order = result.rows[0];

    if (!order) {
      await client.query("ROLLBACK");

      return {
        ok: false,
        sent: false,
        message: "Order was not found.",
      };
    }

    if (order.order_number_email_sent_at) {
      await client.query("COMMIT");

      return {
        ok: true,
        sent: false,
        message: "Order number email was already sent.",
      };
    }

    const transporter = createMailerTransporter(credentials);
    const customerName = order.customer_name || "there";

    await transporter.sendMail({
      from: `"Order Confirmation" <${credentials.email}>`,
      to: order.customer_email,
      subject: `Your order number is ${order.order_number}`,
      text: [
        `Hi ${customerName},`,
        "",
        "Thank you for your order.",
        `Your order tracking number is: ${order.order_number}`,
        "",
        "You can use this number to track your order on our website.",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #241514;">
          <h2>Thank you for your order</h2>
          <p>Hi ${escapeHtml(customerName)},</p>
          <p>Your order tracking number is:</p>
          <p style="font-size: 20px; font-weight: 700; letter-spacing: 0.04em;">
            ${escapeHtml(order.order_number)}
          </p>
          <p>You can use this number to track your order on our website.</p>
        </div>
      `,
    });

    await client.query(
      `
        UPDATE orders
        SET order_number_email_sent_at = CURRENT_TIMESTAMP
        WHERE order_number = $1
      `,
      [normalizedOrderNumber]
    );
    await client.query("COMMIT");

    return {
      ok: true,
      sent: true,
      message: "Order number email was sent to your email.",
    };
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    console.error("Order number email failed:", error);

    return {
      ok: false,
      sent: false,
      message: "Order number email could not be sent.",
    };
  } finally {
    client.release();
  }
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const message = getFormValue(formData, "message");
  const fields = { name, email, message };

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Please fill out your name, email, and message.",
      fields,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      ok: false,
      message: "Please enter a valid email address.",
      fields,
    };
  }

  if (message.length > 2000) {
    return {
      ok: false,
      message: "Please keep your message under 2000 characters.",
      fields,
    };
  }

  const credentials = getMailerCredentials();

  if (!credentials) {
    return {
      ok: false,
      message: "Contact form is not configured yet. Please try again later.",
      fields,
    };
  }

  const transporter = createMailerTransporter(credentials);

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${credentials.email}>`,
      to: CONTACT_RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New contact message from ${name} (Single product website)`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #241514;">
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
        </div>
      `,
    });

    return {
      ok: true,
      message: "Thanks, your message was sent successfully.",
    };
  } catch (error) {
    console.error("Contact email failed:", error);

    return {
      ok: false,
      message: "Something went wrong while sending your message. Please try again later.",
      fields,
    };
  }
}
