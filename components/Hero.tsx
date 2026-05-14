import React from 'react';
import Image from 'next/image';
import heroImage from "@/public/hero.png";
import Link from 'next/link';
import ScrollButton from './ScrollButton';

export default function Hero() {
  return (
    <section id="home" className="relative w-full flex items-center overflow-hidden bg-[#fafafa] pt-32 pb-16 min-h-[70vh]">
      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

          {/* Left Column */}
          <div className="flex flex-col items-start gap-6 text-left">
            {/* Sale Badge */}
            <div className="bg-[#F3D266] text-[#6B403C] font-extrabold px-5 py-2 rounded-full uppercase tracking-widest text-sm shadow-md inline-block">
              15% Sale
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-[#6B403C] tracking-tight">
              Essential Everyday Hoodie
            </h1>

            <p className="text-lg md:text-xl text-[#6B403C]/80 max-w-lg">
              Midnight Black, Ocean Blue, Steel Gray, Forest Green
            </p>

            <ScrollButton targetId="product" className="mt-4 bg-[#f21137] text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 hover:bg-[#ff1e47] transition-all duration-300 shadow-xl shadow-[#f21137]/30">
              Buy now
            </ScrollButton>
          </div>

          {/* Right Column (Image Container) */}
          <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={heroImage}
              alt="Hero Product"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
