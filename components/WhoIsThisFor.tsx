import React from "react";
import MotionWrapper from './MotionWrapper';
import Image from "next/image";

type Audience = {
  title: string;
  description: React.ReactNode;
  bestFor: string;
  vibe: string;
  accent: string;
  icon: React.ReactNode;
};

function SunIcon() {
  return (
    <Image src="/sun.svg" alt="Sun" width={32} height={32} className="h-8 w-8 object-contain" />
  );
}

function CloudIcon() {
  return (
    <Image src="/cloud.svg" alt="Cloud" width={32} height={32} className="h-8 w-8 object-contain" />
  );
}

function SparkleIcon() {
  return (
    <Image src="/gemini_star.svg" alt="Sparkle" width={32} height={32} className="h-8 w-8 object-contain" />
  );
}

const audiences: Audience[] = [
  {
    title: "The Everyday Essential",
    description: (
      <>
        For people who want one hoodie they can wear anywhere. Whether you&apos;re heading out with friends, working late, or relaxing at home, this hoodie is built for all-day comfort and effortless style.
      </>
    ),
    bestFor: "Daily wear, layering, and casual outfits.",
    vibe: "Clean, versatile, and always comfortable.",
    accent: "#FF857A",
    icon: <SunIcon />,
  },
  {
    title: "The Comfort-First Minimalist",
    description: (
      <>
        You appreciate soft fabrics, relaxed fits, and clothing that feels as good as it looks. With its premium cotton blend and modern fit, this hoodie delivers warmth without feeling heavy.
      </>
    ),
    bestFor: "Cozy mornings, colder evenings, and laid-back weekends.",
    vibe: "Soft, minimal, and effortlessly premium.",
    accent: "#ADEBB3",
    icon: <CloudIcon />,
  },
  {
    title: "The Streetwear Enthusiast",
    description: (
      <>
        For those who treat fashion as part of their identity. The structured fit, quality details, and timeless design make this hoodie easy to style with any outfit while standing out in a subtle way.
      </>
    ),
    bestFor: "Oversized looks, layered fits, and everyday streetwear styling.",
    vibe: "Modern, confident, and built for everyday movement.",
    accent: "#F3D266",
    icon: <SparkleIcon />,
  },
];

export default function WhoIsThisFor() {
  return (
    <section className="w-full bg-[#fafafa] px-6 py-24 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <MotionWrapper
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex max-w-3xl flex-col gap-5"
        >
          <div className="w-fit rounded-full bg-[#6B403C]/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#6B403C]">
            Who Is This Hoodie For?
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-[#6B403C] md:text-6xl">
            Find the hoodie match for your style.
          </h2>
          <p className="text-lg leading-relaxed text-[#6B403C]/75">
            From relaxed weekends to streetwear statements, this hoodie fits the routines of your everyday life.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <MotionWrapper
              key={audience.title}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="flex h-full flex-col gap-7 rounded-3xl border border-[#6B403C]/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-[#6B403C]"
                  style={{ backgroundColor: `${audience.accent}33` }}
                >
                  {audience.icon}
                </div>
                <span
                  className="mt-2 h-3 w-3 rounded-full"
                  style={{ backgroundColor: audience.accent }}
                />
              </div>

              <div className="flex flex-1 flex-col gap-5">
                <h3 className="text-2xl font-extrabold leading-tight text-[#6B403C]">
                  {audience.title}
                </h3>
                <p className="text-base leading-relaxed text-[#6B403C]/75">
                  {audience.description}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#6B403C]/10 pt-6">
                <p className="text-sm leading-relaxed text-[#6B403C]/80">
                  <span className="font-extrabold text-[#6B403C]">Best for: </span>
                  <strong className="font-extrabold text-[#6B403C]">
                    {audience.bestFor}
                  </strong>
                </p>
                <p className="text-sm leading-relaxed text-[#6B403C]/80">
                  <span className="font-extrabold text-[#6B403C]">The Vibe: </span>
                  <strong className="font-extrabold text-[#6B403C]">
                    {audience.vibe}
                  </strong>
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
