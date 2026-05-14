const faqs = [
  {
    question: "Does the hoodie fit oversized?",
    answer:
      "The hoodie has a relaxed modern fit. For a more oversized look, consider sizing up.",
  },
  {
    question: "Does it shrink after washing?",
    answer:
      "The premium cotton blend is designed to maintain its fit when washed according to care instructions.",
  },
  {
    question: "Is the fabric thick or lightweight?",
    answer:
      "The hoodie offers balanced everyday warmth without feeling overly heavy.",
  },
  {
    question: "What material is used?",
    answer: "The hoodie is made of 60% cotton and 60% polyester.",
  },
  {
    question: "How does sizing work?",
    answer:
      "Sizing is explained in detail on our website below this section.",
  },
  {
    question: "How long is shipping?",
    answer: "Shipping takes 1-5 days.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="w-full bg-white px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="mb-4 w-fit rounded-full bg-[#F3D266]/40 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#6B403C]">
            FAQ
          </div>
          <h2 className="text-3xl font-extrabold text-[#6B403C] md:text-5xl">
            Good Things To Know
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#6B403C]/75">
            Quick answers about fit, fabric, sizing, washing, and delivery.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-[#6B403C]/10 bg-[#fafafa] p-5 shadow-sm transition-all duration-300 open:border-[#6B403C]/25 open:bg-white open:shadow-md md:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-extrabold text-[#6B403C] [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B403C] text-xl leading-none text-[#ADEBB3] transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="mt-4 border-t border-[#6B403C]/10 pt-4">
                <p className="text-base font-medium leading-relaxed text-[#6B403C]/75">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
