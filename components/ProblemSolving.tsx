import React from "react";
import MotionWrapper from './MotionWrapper';
import Image from "next/image";

type ComparisonPoint = {
  title: string;
  accent: string;
  typical: string[];
  premium: string[];
  microcopy: string;
};



function CheckIcon() {
  return (
    <Image src="/done.svg" alt="Check" width={20} height={20} className="h-5 w-5 shrink-0" />
  );
}

function CrossIcon() {
  return (
    <Image src="/x.svg" alt="Cross" width={20} height={20} className="h-5 w-5 shrink-0" />
  );
}

const comparisonPoints: ComparisonPoint[] = [
  {
    title: "Superior Fabric & Feel",
    accent: "#ADEBB3",
    typical: ["Thin fabric that loses shape over time", "Rough interior after a few washes", "Feels heavy or stiff"],
    premium: ["Premium blend designed for long-lasting comfort and structure", "Soft brushed feel that stays comfortable all day", "Lightweight comfort with the right amount of warmth"],
    microcopy: "Experience comfort that lasts wash after wash.",
  },
  {
    title: "Modern Fit & Style",
    accent: "#EBAEE6",
    typical: ["Generic oversized fit", "Colors fade quickly", "Basic look with little attention to detail"],
    premium: ["Clean modern fit made for everyday wear", "Rich colors that keep their look longer", "Minimal premium design that works with every outfit"],
    microcopy: "Look sharp and put-together without trying.",
  },
  {
    title: "Uncompromising Quality",
    accent: "#F3D266",
    typical: ["Inconsistent stitching and finish", "Made just to wear"],
    premium: ["Carefully crafted with attention to quality and durability", "Made to become your everyday favorite"],
    microcopy: "Built to be the hoodie you reach for every day.",
  },
];

export default function ProblemSolving() {
  return (
    <section className="w-full bg-white px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-14">
        <MotionWrapper
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-4 w-fit rounded-full bg-[#FF857A]/15 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#6B403C]">
            Problem Solving
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#6B403C] md:text-6xl">
            The hoodie that fixes everyday frustrations.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6B403C]/75">
            See how a regular hoodie compares with a premium hoodie built for
            comfort, durability, and a clean modern fit.
          </p>
        </MotionWrapper>

        <div className="grid gap-8">
          {comparisonPoints.map((point, index) => (
            <MotionWrapper
              key={point.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.65,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr]"
            >
              <div className="overflow-hidden rounded-3xl border border-[#6B403C]/10 bg-[#fafafa] p-5 md:p-7">
                <div>
                  <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-[#f21137]">
                    Regular Hoodie
                  </p>
                  <h3 className="mb-5 text-2xl font-extrabold text-[#6B403C]">
                    {point.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {point.typical.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base font-medium leading-relaxed text-[#6B403C]/75"
                      >
                        <CrossIcon />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="hidden items-center px-2 lg:flex">
                <div className="flex h-full min-h-56 flex-col items-center justify-center gap-3">
                  <div className="h-full w-px bg-[#6B403C]/10" />
                  <span className="rounded-full bg-[#6B403C] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white">
                    vs
                  </span>
                  <div className="h-full w-px bg-[#6B403C]/10" />
                </div>
              </div>

              <div
                className="overflow-hidden rounded-3xl border p-5 shadow-xl md:p-7"
                style={{
                  backgroundColor: `${point.accent}22`,
                  borderColor: `${point.accent}88`,
                }}
              >
                <div>
                  <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-[#2f7d46]">
                    Our Hoodie
                  </p>
                  <h3 className="mb-5 text-2xl font-extrabold text-[#6B403C]">
                    {point.title}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {point.premium.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base font-semibold leading-relaxed text-[#6B403C]"
                      >
                        <CheckIcon />
                        <span>{item}</span>
                      </li>
                  ))}
                  </ul>
                  <p className="mt-7 rounded-2xl bg-white/80 px-5 py-4 text-lg font-extrabold leading-snug text-[#6B403C] shadow-sm">
                    &quot;{point.microcopy}&quot;
                  </p>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
