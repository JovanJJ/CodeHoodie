import { fetchOrderStatus } from "@/lib/actions";
import Image from "next/image";

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


        <div className="mx-auto mb-16 max-w-md">
          <form action="/tracking" method="GET" className="relative flex items-center">
            <input
              type="text"
              name="orderNumber"
              defaultValue={orderNumber || ""}
              placeholder="Enter your order number (e.g. ORD-12345)"
              className="w-full rounded-full border-2 border-gray-100 bg-white px-6 py-4 pr-12 shadow-sm outline-none transition-all focus:border-[#ADEBB3] focus:ring-4 focus:ring-[#ADEBB3]/20"
            />
            <button type="submit" className="absolute cursor-pointer right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#6B403C] text-white transition-colors hover:bg-[#6B403C]/80">
              <Image src="/search.svg" alt="search icon" width={22} height={22} />
            </button>
          </form>
          {orderNumber && currentStatus === "PROCESSING" && (
            <p className="mt-4 text-center text-sm text-gray-500">
              Showing tracking for: <span className="font-semibold">{orderNumber}</span>
            </p>
          )}
        </div>


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

                <div className="mb-6 flex-shrink-0">
                  {isCurrent ? (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ADEBB3]/20">
                      <Image src="/done.svg" alt="search icon" width={22} height={22} />
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
