import React from 'react';
import MotionWrapper from './MotionWrapper';

export default function SizingExplanation() {
  const sizes = [
    { size: 'Small (S)', chestIn: '20–21.5"', chestCm: '50–55 cm' },
    { size: 'Medium (M)', chestIn: '21.5–23"', chestCm: '55–58 cm' },
    { size: 'Large (L)', chestIn: '23–25"', chestCm: '58–63 cm' },
    { size: 'Extra Large (XL)', chestIn: '25–26"', chestCm: '63–66 cm' },
  ];

  return (
    <section className="w-full bg-[#fafafa] py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <MotionWrapper
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="bg-[#ADEBB3]/30 w-fit px-4 py-1.5 rounded-full text-[#6B403C] font-bold text-sm tracking-widest uppercase mx-auto mb-4">
            Perfect Fit
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#6B403C] mb-4">
            Find Your Size
          </h2>
          <p className="text-lg text-[#6B403C]/80 max-w-2xl mx-auto">
            Our hoodies feature a relaxed, comfortable fit. Use the guide below to find your perfect match.
          </p>
        </MotionWrapper>

        <MotionWrapper
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {sizes.map((item, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-[#6B403C]/10 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-2xl font-bold text-[#6B403C] mb-4 pb-4 border-b border-[#6B403C]/10 w-full">
                {item.size}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#6B403C]/60 text-sm uppercase tracking-wider font-semibold">Chest Width</span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-lg font-bold text-[#6B403C] bg-[#FF857A]/20 px-3 py-1 rounded-lg">{item.chestIn}</span>
                  <span className="text-[#6B403C]/40">|</span>
                  <span className="text-lg font-bold text-[#6B403C] bg-[#EBAEE6]/20 px-3 py-1 rounded-lg">{item.chestCm}</span>
                </div>
              </div>
            </div>
          ))}
        </MotionWrapper>
      </div>
    </section>
  );
}
