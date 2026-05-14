import React from 'react';
import MotionWrapper from './MotionWrapper';
import ScrollButton from './ScrollButton';

export default function FinalCTA() {

  return (
    <section className="py-24 px-6 md:px-12 bg-white flex flex-col items-center justify-center text-center border-t border-[#6B403C]/10">
      <MotionWrapper
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto flex flex-col items-center w-full"
      >
        <div className="flex flex-col md:flex-row gap-6 mb-12 w-full justify-center">
          <div className="bg-[#fafafa] p-8 rounded-3xl border border-[#6B403C]/10 flex-1 flex flex-col items-center justify-center shadow-sm">
            <span className="text-5xl font-black text-[#6B403C]/10 mb-2">1</span>
            <h3 className="text-xl font-bold text-[#6B403C]">Find your fit</h3>
          </div>
          <div className="bg-[#fafafa] p-8 rounded-3xl border border-[#6B403C]/10 flex-1 flex flex-col items-center justify-center shadow-sm">
            <span className="text-5xl font-black text-[#6B403C]/10 mb-2">2</span>
            <h3 className="text-xl font-bold text-[#6B403C]">Choose your color</h3>
          </div>
          <div className="bg-[#fafafa] p-8 rounded-3xl border border-[#f21137]/20 flex-1 flex flex-col items-center justify-center shadow-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f21137]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="text-5xl font-black text-[#f21137]/10 mb-2 relative z-10">3</span>
            <h3 className="text-xl font-bold text-[#f21137] relative z-10">Get yours today</h3>
          </div>
        </div>

        <ScrollButton targetId="product"
          className="bg-[#f21137] text-white px-14 py-5 rounded-full font-bold text-2xl hover:bg-opacity-90 transition-all shadow-2xl shadow-[#f21137]/30 hover:-translate-y-1"
        >
          Shop now
        </ScrollButton>
      </MotionWrapper>
    </section>
  );
}
