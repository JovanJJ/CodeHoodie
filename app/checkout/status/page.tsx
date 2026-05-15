import Link from "next/link";
import Image from "next/image";
import {
  fetchOrderNumber,
  sendOrderNumberEmail,
  type OrderData,
  type OrderNumberEmailResult,
} from "@/lib/actions";

export default async function CheckoutStatusPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const status = getSearchParam(searchParams.redirect_status);
  const paymentIntent = getSearchParam(searchParams.payment_intent);

  if (status === "succeeded" && paymentIntent) {
    const orderResult = await fetchOrderNumber(paymentIntent);
    const emailResult = orderResult.success
      ? await sendOrderNumberEmail(orderResult.orderData.order_number)
      : null;

    return (
      <SuccessStatus
        orderData={orderResult.success ? orderResult.orderData : null}
        emailResult={emailResult}
      />
    );
  }

  return <FailedStatus />;
}

function getSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function SuccessStatus({
  orderData,
  emailResult,
}: {
  orderData: OrderData | null;
  emailResult: OrderNumberEmailResult | null;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 text-[#6B403C]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ADEBB3]/20 text-[#ADEBB3]">
          <Image src="/done.svg" alt="checkmark" width={25} height={25} />
        </div>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Payment Successful!</h1>
        <p className="mb-8 font-medium text-[#6B403C]/70">
          Thank you for your order. We are processing it and will ship it soon.
        </p>

        <div className="rounded-xl bg-[#6B403C]/5 p-4 text-left text-sm font-semibold">
          <p className="mb-1 text-[#6B403C]/60">Order Tracking Number</p>
          <p className="font-mono text-base uppercase">
            {orderData?.order_number || "Unavailable"}
          </p>
        </div>

        {emailResult ? (
          <p
            className={`mt-4 rounded-xl px-4 py-3 text-sm font-bold ${emailResult.ok
              ? "bg-[#ADEBB3]/25 text-[#2f7d46]"
              : "bg-[#f21137]/10 text-[#f21137]"
              }`}
          >
            {emailResult.message}
          </p>
        ) : null}

        <Link
          href="/tracking"
          className="mt-8 inline-block w-full rounded-full bg-[#6B403C] px-6 py-4 font-bold text-[#ADEBB3] transition hover:shadow-xl"
        >
          Track order
        </Link>

        <Link
          href="/"
          className="mt-8 inline-block w-full rounded-full bg-[#6B403C] px-6 py-4 font-bold text-[#ADEBB3] transition hover:shadow-xl"
        >
          Return to Store
        </Link>
      </div>
    </div>
  );
}

function FailedStatus() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-4 text-[#6B403C]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f21137]/10 text-[#f21137]">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#ADEBB3]/20 text-[#ADEBB3]">
            <Image src="/red-x.svg" alt="x" width={25} height={25} />
          </div>
        </div>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight">Payment Failed</h1>
        <p className="mb-8 font-medium text-[#6B403C]/70">
          Something went wrong with your payment. Your card was not charged.
        </p>

        <Link
          href="/"
          className="inline-block w-full rounded-full border border-[#6B403C]/20 bg-white px-6 py-4 font-bold text-[#6B403C] transition hover:border-[#6B403C]"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
