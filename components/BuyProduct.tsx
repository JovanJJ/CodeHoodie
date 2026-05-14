"use client";

import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';
import MotionWrapper from './MotionWrapper';
import { useState } from 'react';
import CheckoutSidebar from './CheckoutSidebar';
import trackOrder from "@/public/tracking_order.svg";
import easyWash from "@/public/easy_washing.svg";
import materialQuality from "@/public/quality_materials.svg";

//black
import hoodieBlack from "@/public/hoodie_black.jpg";
import hoodieBlack1 from "@/public/hoodie_1.jpg";
import hoodieBlack2 from "@/public/hoodie_2.jpg";
import hoodieBlack3 from "@/public/hoodie_3.jpg";

//blue
import hoodieBlue from "@/public/hoodie_blue.jpg";
import hoodieBlue1 from "@/public/hoodie_blue_1.jpg";
import hoodieBlue2 from "@/public/hoodie_blue_2.jpg";
import hoodieBlue3 from "@/public/hoodie_blue_3.jpg";

//gray
import hoodieGray from "@/public/hoodie_gray.jpg";
import hoodieGray1 from "@/public/hoodie_gray_1.jpg";
import hoodieGray2 from "@/public/hoodie_gray_2.jpg";

//green
import hoodieGreen from "@/public/hoodie_green.jpg";
import hoodieGreen1 from "@/public/hoodie_green_1.jpg";
import hoodieGreen2 from "@/public/hoodie_green_2.jpg";


const colorImages: Record<string, any[]> = {
  Black: [hoodieBlack1, hoodieBlack2, hoodieBlack3],
  Blue: [hoodieBlue1, hoodieBlue2, hoodieBlue3],
  Green: [hoodieGreen1, hoodieGreen2],
  Gray: [hoodieGray1, hoodieGray2],
};

const colors = [
  { img: hoodieBlack, color: "Black" },
  { img: hoodieBlue, color: "Blue" },
  { img: hoodieGreen, color: "Green" },
  { img: hoodieGray, color: "Gray" },
];

const sizes = [
  "S", "M", "L", "XL"
]

const productName = "COOFANDY Mens 100% Cotton T-Shirts";
const productPrice = "$19.99";

export default function BuyProduct() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [color, setColor] = useState<string>("Black");
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [pickedSize, setPickedSize] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const currentImages = colorImages[color] || colorImages["Black"];

  const nextImage = () => {
    if (activeImageIndex < currentImages.length - 1) {
      setActiveImageIndex(prev => prev + 1);
    }
  }

  const prevImage = () => {
    if (activeImageIndex > 0) {
      setActiveImageIndex(prev => prev - 1);
    }
  }

  const handleColorClick = (newColor: string) => {
    setColor(newColor);
    setActiveImageIndex(0);
  };

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  }

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  }

  return (
    <section id="product" className="py-20 px-6 md:px-12 bg-[#fafafa] min-h-screen flex items-center">
      <MotionWrapper
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >

        {/* Left Column: Images */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 h-[500px]">
            {/* Main Image */}
            <div className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100">
              <Image
                src={hoveredColor ? colorImages[hoveredColor][0] : currentImages[activeImageIndex]}
                alt="Product Main"
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-4 w-24">
              {currentImages.map((src, index) => (
                <button
                  key={index}
                  type="button"
                  onMouseEnter={() => setActiveImageIndex(index)}
                  className={`flex-1 relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white shadow-md ${activeImageIndex === index && !hoveredColor ? 'border-[#6B403C]' : 'border-transparent hover:border-[#6B403C]'
                    }`}
                >
                  <Image
                    src={src}
                    alt="Product preview"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-2 justify-center lg:justify-start">
            <button
              onClick={prevImage}
              className="w-12 h-12 rounded-full border-2 border-[#6B403C] flex items-center justify-center text-[#6B403C] hover:bg-[#6B403C] hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button onClick={nextImage} className="w-12 h-12 rounded-full border-2 border-[#6B403C] flex items-center justify-center text-[#6B403C] hover:bg-[#6B403C] hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Testimonials */}
          <div className="mt-8 border-t border-[#6B403C]/10 pt-8">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-widest text-[#6B403C]/75">Customer Reviews</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "Michael T.", review: "Most comfortable hoodie I own. The fit is perfect.", rating: 5 },
                { name: "Sarah J.", review: "Washes great, hasn't shrunk at all. Love the color.", rating: 5 },
                { name: "David R.", review: "Premium quality without the crazy price tag. Highly recommend.", rating: 5 }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-4 rounded-2xl border border-[#6B403C]/10 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#F3D266]">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M12 2.25l2.99 6.06 6.69.97-4.84 4.72 1.14 6.66L12 17.52l-5.98 3.14 1.14-6.66-4.84-4.72 6.69-.97L12 2.25z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs font-bold text-[#6B403C] opacity-80 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-[#2f7d46]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Verified Buyer
                    </p>
                  </div>
                  <p className="text-sm font-medium text-[#6B403C]/80 italic">&quot;{testimonial.review}&quot;</p>
                  <p className="text-xs font-bold text-[#6B403C]">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="flex flex-col gap-8 text-[#6B403C]">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">{productName}</h2>
            <div className="mb-3 flex items-center gap-2" aria-label="Rated 4.8 out of 5 stars">
              <div className="flex gap-1 text-[#F3D266]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 2.25l2.99 6.06 6.69.97-4.84 4.72 1.14 6.66L12 17.52l-5.98 3.14 1.14-6.66-4.84-4.72 6.69-.97L12 2.25z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-[#6B403C]/75">4.8 (124 reviews)</span>
            </div>
            <p className="text-xl font-semibold opacity-80">{productPrice}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg inline font-bold uppercase tracking-wider">Select Color:</h3>
            <span className='ml-2 color-black font-bold'>{color}</span>
            <div className="flex gap-4">
              {colors.map((img, i) => (
                <button
                  className={`border rounded hover:border-blue-400 transition cursor-pointer ${img.color === color ? "border-blue-400 border-2" : "border-gray-300"}`}
                  key={i}
                  onClick={() => handleColorClick(img.color)}
                  onMouseEnter={() => setHoveredColor(img.color)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <Image src={img.img} alt='img' />
                </button>
              ))}
            </div>
            <span className='text-lg font-bold uppercase tracking-wider'>Select size:</span>
            <span className='ml-2 font-bold'>{pickedSize}</span>
            <div className='flex gap-2'>
              {sizes.map((size, i) => (
                <div
                  key={i}
                  className={`border px-3 py-1 rounded cursor-pointer ${size === pickedSize ? "border-blue-400 border-2" : "border-gray-400"}`}
                  onClick={() => setPickedSize(size)}
                >
                  {size}
                </div>
              ))}

            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-relaxed max-w-md opacity-90">
              SOFT COTTON FABRIC: Mens T-Shirts feature premium cotton fabric that provides exceptional comfort and breathability, with reinforced stitching for lasting durability
              VINTAGE WASHED TEXTURE: Mens Short Sleeve T Shirts feature unique pre-washed finish that creates an authentic retro look with soft, lived-in feel that is delicate, and incredibly comfortable - getting better with every wear
            </p>
            <button
              type="button"
              onClick={openCheckout}
              className="w-full md:w-auto px-12 py-4 bg-[#6B403C] text-[#ADEBB3] font-bold text-xl rounded-full hover:bg-opacity-90 hover:shadow-xl transition-all shadow-[#6B403C]/20 shadow-lg"
            >
              Buy now
            </button>
            <div className="mt-4 border-t border-[#6B403C]/10 pt-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBAEE6]/20 flex items-center justify-center">
                    <Image src={easyWash} alt="Easy to wash" className="h-5 w-5 object-contain" />
                  </div>
                  <span className="font-semibold text-sm">Easy to wash</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FF857A]/20 flex items-center justify-center">
                    <Image src={materialQuality} alt="Material Quality" className="h-5 w-5 object-contain" />
                  </div>
                  <span className="font-semibold text-sm">Material Quality</span>
                </div>
              </div>
            </div>
            <div className="max-w-md rounded-2xl border border-[#6B403C]/10 bg-white p-4 text-sm font-semibold text-[#6B403C]/80 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ADEBB3]/25 text-[#2f7d46]">
                  <Image src={trackOrder} alt="Track Order" className="h-5 w-5 object-contain" />
                </div>
                <div>
                  <p>Shipping details: 1-5 days</p>
                  <a
                    href="/tracking"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex text-[#f21137] underline decoration-[#f21137]/35 underline-offset-4 hover:text-[#6B403C]"
                  >
                    Track your order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutSidebar
            onClose={closeCheckout}
            productImage={currentImages[activeImageIndex]}
            productName={productName}
            productPrice={productPrice}
            selectedSize={pickedSize}
            selectedColor={color}
          />
        )}
      </AnimatePresence>
    </section >
  );
}
