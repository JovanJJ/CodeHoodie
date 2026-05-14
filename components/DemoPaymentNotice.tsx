type DemoPaymentNoticeProps = {
  compact?: boolean;
};

export default function DemoPaymentNotice({ compact = false }: DemoPaymentNoticeProps) {
  return (
    <div
      className={`border border-[#f21137]/20 bg-[#f21137]/5 text-[#6B403C] ${
        compact ? "rounded-2xl p-4" : "rounded-3xl p-5 md:p-6"
      }`}
    >
      <p className="text-sm font-extrabold uppercase tracking-widest text-[#f21137]">
        Demo website
      </p>
      <p className={`${compact ? "mt-2 text-sm" : "mt-3 text-base"} leading-relaxed text-[#6B403C]/80`}>
        This checkout is for testing only. At the payment step, use card number{" "}
        <span className="font-extrabold text-[#6B403C]">4242 4242 4242 4242</span>,
        any future expiration date, and any three-digit CVC.
      </p>
    </div>
  );
}
