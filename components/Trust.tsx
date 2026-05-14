import React from 'react';
import Image from 'next/image';
import MotionWrapper from './MotionWrapper';
import highQuality from "@/public/premium_quality.svg";
import securePayments from "@/public/secure_payments.svg";
import orderTracking from "@/public/tracking_order.svg";


const trustFeatures = [
  {
    title: "High Quality",
    description: "Premium materials and construction.",
    icon: (
      <Image src={highQuality} alt="High Quality" className="w-8 h-8 object-contain" />
    )
  },
  {
    title: "Secure Payments",
    description: "Encrypted Payments via Stripe.",
    icon: (
      <Image src={securePayments} alt="Secure Payments" className="w-8 h-8 object-contain" />
    )
  },
  {
    title: "Order Tracking",
    description: "Real-time Tracking on Every Order.",
    icon: (
      <Image src={orderTracking} alt="Order Tracking" className="w-8 h-8 object-contain" />
    )
  }
];

export default function Trust() {
  return (
    <section className="w-full bg-[#fafafa] py-12 px-6 md:px-12 border-b border-[#6B403C]/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustFeatures.map((feature, index) => (
            <MotionWrapper
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white  hover:-translate-y-1 hover:border-b-1 border-gray-400 transition-all  cursor-default group"
            >
              <div className="mb-4 p-3 bg-gray-50 rounded-full group-hover:bg-[#6B403C]/5 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[#6B403C] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#6B403C]/70">
                {feature.description}
              </p>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
