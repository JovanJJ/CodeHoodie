import { fetchOrderStatus } from "@/lib/actions";

type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "PAID";

export default async function TrackingPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const orderNumber = searchParams.orderNumber as string | undefined;

  let currentStatus: OrderStatus = "PAID";

  if (orderNumber) {
    const { success, orderStatus } = await fetchOrderStatus(orderNumber);
    console.log(orderStatus)
    if (success && orderStatus?.status) {
      currentStatus = orderStatus.status as OrderStatus;
    }
  }

  const statuses = [
    {
      id: "PROCESSING",
      title: "Preparing order",
      description: "We've received your payment and our team is currently packing your item.",
    },
    {
      id: "SHIPPED",
      title: "On The Way",
      description: "Your package has been handed to the courier.",
    },
    {
      id: "DELIVERED",
      title: "Delivered",
      description: "Your order has arrived! We hope you enjoy your new product.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center py-16 bg-[#fafafa] px-4 text-[#6B403C]">
      <div className="w-full max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-[#6B403C]">Order Tracking</h1>

        {/* Tracking Input */}
        <div className="mx-auto mb-16 max-w-md">
          <form action="/tracking" method="GET" className="relative flex items-center">
            <input
              type="text"
              name="orderNumber"
              defaultValue={orderNumber || ""}
              placeholder="Enter your order number (e.g. ORD-12345)"
              className="w-full rounded-full border-2 border-gray-100 bg-white px-6 py-4 pr-12 shadow-sm outline-none transition-all focus:border-[#ADEBB3] focus:ring-4 focus:ring-[#ADEBB3]/20"
            />
            <button type="submit" className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#6B403C] text-white transition-colors hover:bg-[#6B403C]/80">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </form>
          {orderNumber && currentStatus === "PROCESSING" && (
            <p className="mt-4 text-center text-sm text-gray-500">
              Showing tracking for: <span className="font-semibold">{orderNumber}</span>
            </p>
          )}
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {statuses.map((status) => {
            const isCurrentOrPassed =
              status.id === "PROCESSING" ||
              (status.id === "SHIPPED" && currentStatus !== "PROCESSING") ||
              (status.id === "DELIVERED" && currentStatus === "DELIVERED");

            const isCurrent = status.id === currentStatus;

            return (
              <div
                key={status.id}
                className={`flex flex-col items-center justify-start rounded-[2.5rem] bg-white p-8 text-center shadow-lg transition-all hover:shadow-xl ${isCurrent ? 'ring-2 ring-[#ADEBB3] ring-offset-4' : ''
                  }`}
              >
                {/* Icon/Checkmark area */}
                <div className="mb-6 flex-shrink-0">
                  {isCurrent ? (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ADEBB3]/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-10 w-10 text-[#ADEBB3]"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                      <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                    </div>
                  )}
                </div>

                {/* Text content */}
                <div className="flex flex-col items-center">
                  <h3 className={`mb-3 text-xl font-bold ${isCurrent ? 'text-[#6B403C]' : 'text-gray-400'}`}>
                    {status.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">{status.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
