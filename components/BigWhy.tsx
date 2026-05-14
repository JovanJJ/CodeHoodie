import React from 'react';
import Image from 'next/image';
import MotionWrapper from './MotionWrapper';
import preview1 from "@/public/preview_1.png";
import preview2 from "@/public/preview_2.png";
import preview3 from "@/public/preview_3.png";

export default function BigWhy() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">

        {/* Section Header */}


        {/* Row 1: Text Left, Image Right */}
        <MotionWrapper
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="flex flex-col justify-center gap-6 order-2 md:order-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#6B403C]">
              Comfort You’ll Want Every Day
            </h3>
            <p className="text-lg text-[#6B403C]/80 leading-relaxed">
              Soft premium fabric with a relaxed fit designed for everyday wear and lasting comfort.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {['Soft brushed interior feel', 'Relaxed everyday fit', 'Lightweight warmth without bulk'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#6B403C] font-medium leading-relaxed">
                  <svg className="w-5 h-5 text-[#FF857A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2">
            <Image
              src={preview1}
              alt='preview_1'
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </MotionWrapper>

        {/* Row 2: Image Left, Text Right */}
        <MotionWrapper
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl order-1">
            <Image
              src={preview2}
              alt='preview_2'
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 order-2">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#6B403C]">
              Four Colors. One Perfect Hoodie.
            </h3>
            <p className="text-lg text-[#6B403C]/80 leading-relaxed">
              Available in black, gray, blue, and green — easy to match with any outfit and any style.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {['Midnight Black, Steel Gray, Ocean Blue & Forest Green', 'Easy to style for any occasion', 'Timeless colors that never go out of style'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#6B403C] font-medium leading-relaxed">
                  <svg className="w-5 h-5 text-[#EBAEE6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </MotionWrapper>

        {/* Row 3: Reviews Left, Image Right */}
        <MotionWrapper
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="flex flex-col justify-center gap-6 order-2 md:order-1">
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#6B403C]">
              Made To Look Good Anywhere
            </h3>
            <p className="text-lg text-[#6B403C]/80 leading-relaxed">
              Clean modern design that works whether you&apos;re outside, relaxing, or on the move.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {['Minimal premium aesthetic', 'Perfect for layering or standalone wear', 'Designed for everyday versatility'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#6B403C] font-medium leading-relaxed">
                  <svg className="w-5 h-5 text-[#F3D266] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2">
            <Image
              src={preview3}
              alt='preview_3'
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </MotionWrapper>

        {/* Row 4: Image Left, Text Right (To fulfill the "four images" request) */}


      </div>
    </section>
  );
}
