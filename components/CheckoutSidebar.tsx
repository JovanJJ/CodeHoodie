"use client";

import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { createPaymentIntent } from "@/lib/actions";
import type { ShippingInfo } from "@/lib/actions";
import Payment from "./Payment";
import CountrySelect from "./CountrySelect";
import DemoPaymentNotice from "./DemoPaymentNotice";

type CheckoutStep = "summary" | "shipping" | "payment";

type CheckoutSidebarProps = {
  onClose: () => void;
  productImage: StaticImageData;
  productName: string;
  productPrice: string;
  selectedSize: string | null;
  selectedColor: string | null;
};

const initialShippingInfo: ShippingInfo = {
  name: "",
  email: "",
  street: "",
  zip: "",
  city: "",
  country: "",
};

export default function CheckoutSidebar({
  onClose,
  productImage,
  productName,
  productPrice,
  selectedSize,
  selectedColor,
}: CheckoutSidebarProps) {
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("summary");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(initialShippingInfo);
  const [clientSecret, setClientSecret] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateShippingInfo = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const canContinueToShipping = Boolean(selectedSize && selectedColor);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedSize || !selectedColor) {
      setCheckoutStep("summary");
      setSubmitError("Select a size and color before continuing.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");
      const payment = await createPaymentIntent(selectedSize, selectedColor, shippingInfo);
      setClientSecret(payment.clientSecret);
      setCheckoutStep("payment");
    } catch (error) {
      console.error(error);
      setSubmitError("We could not start checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end bg-[#241514]/45"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="h-full w-full max-w-md overflow-y-auto bg-[#fafafa] px-6 py-6 text-[#6B403C] shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-[#6B403C]/60">
              Checkout
            </p>
            <h2 id="checkout-title" className="text-3xl font-extrabold tracking-tight">
              {checkoutStep === "summary" && "Order Summary"}
              {checkoutStep === "shipping" && "Shipping"}
              {checkoutStep === "payment" && "Payment"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#6B403C]/15 bg-white text-[#6B403C] transition hover:bg-[#6B403C] hover:text-white"
            aria-label="Close checkout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3 text-sm font-bold">
          <div className={`rounded-full px-4 py-2 text-center ${checkoutStep === "summary" ? "bg-[#6B403C] text-[#ADEBB3]" : "bg-white text-[#6B403C]/60"}`}>
            Summary
          </div>
          <div className={`rounded-full px-4 py-2 text-center ${checkoutStep === "shipping" ? "bg-[#6B403C] text-[#ADEBB3]" : "bg-white text-[#6B403C]/60"}`}>
            Shipping
          </div>
          <div className={`rounded-full px-4 py-2 text-center ${checkoutStep === "payment" ? "bg-[#6B403C] text-[#ADEBB3]" : "bg-white text-[#6B403C]/60"}`}>
            Payment
          </div>
        </div>

        {checkoutStep === "summary" && (
          <div className="space-y-6">
            <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
              <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#6B403C]/5">
                <Image
                  src={productImage}
                  alt={productName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-extrabold leading-snug">{productName}</h3>
                <p className="mt-2 text-xl font-extrabold">{productPrice}</p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-white p-4 text-sm font-semibold shadow-sm">
              <div className="flex items-center justify-between gap-4 border-b border-[#6B403C]/10 pb-3">
                <span className="text-[#6B403C]/60">Size</span>
                <span>{selectedSize ?? "Not selected"}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-[#6B403C]/10 pb-3">
                <span className="text-[#6B403C]/60">Color</span>
                <span className="capitalize">{selectedColor ?? "Not selected"}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[#6B403C]/60">Total</span>
                <span className="text-lg font-extrabold">{productPrice}</span>
              </div>
            </div>

            {submitError && (
              <p className="rounded-2xl bg-[#f21137]/10 px-4 py-3 text-sm font-bold text-[#f21137]">
                {submitError}
              </p>
            )}

            <button
              type="button"
              disabled={!canContinueToShipping}
              onClick={() => setCheckoutStep("shipping")}
              className="w-full rounded-full bg-[#6B403C] px-6 py-4 text-lg font-bold text-[#ADEBB3] shadow-lg shadow-[#6B403C]/20 transition hover:shadow-xl disabled:cursor-not-allowed disabled:bg-[#6B403C]/45 disabled:text-white/70 disabled:shadow-none"
            >
              Next
            </button>
          </div>
        )}
        {checkoutStep === "shipping" && (
          <form
            className="space-y-5"
            onSubmit={handleFormSubmit}
          >
            <label className="block text-sm font-bold">
              Name
              <input
                type="text"
                value={shippingInfo.name}
                onChange={(event) => updateShippingInfo("name", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#6B403C]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-[#6B403C]"
                placeholder="Your name"
                required
              />
            </label>

            <label className="block text-sm font-bold">
              Email
              <input
                type="email"
                value={shippingInfo.email}
                onChange={(event) => updateShippingInfo("email", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#6B403C]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-[#6B403C]"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block text-sm font-bold">
              Street
              <input
                type="text"
                value={shippingInfo.street}
                onChange={(event) => updateShippingInfo("street", event.target.value)}
                className="mt-2 w-full rounded-2xl border border-[#6B403C]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-[#6B403C]"
                placeholder="Street address"
                required
              />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block text-sm font-bold">
                ZIP
                <input
                  type="text"
                  value={shippingInfo.zip}
                  onChange={(event) => updateShippingInfo("zip", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#6B403C]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-[#6B403C]"
                  placeholder="ZIP code"
                  required
                />
              </label>

              <label className="block text-sm font-bold">
                City
                <input
                  type="text"
                  value={shippingInfo.city}
                  onChange={(event) => updateShippingInfo("city", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-[#6B403C]/15 bg-white px-4 py-3 text-base font-semibold outline-none transition focus:border-[#6B403C]"
                  placeholder="City"
                  required
                />
              </label>
            </div>

            <label className="block text-sm font-bold">
              Country
              <CountrySelect
                value={shippingInfo.country}
                onChange={(code) => updateShippingInfo("country", code)}
              />
            </label>

            {submitError && (
              <p className="rounded-2xl bg-[#f21137]/10 px-4 py-3 text-sm font-bold text-[#f21137]">
                {submitError}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                type="button"
                onClick={() => setCheckoutStep("summary")}
                className="rounded-full border border-[#6B403C]/20 bg-white px-6 py-4 font-bold text-[#6B403C] transition hover:border-[#6B403C]"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-[#6B403C] px-6 py-4 font-bold text-[#ADEBB3] shadow-lg shadow-[#6B403C]/20 transition hover:shadow-xl disabled:cursor-wait disabled:bg-[#6B403C]/55 disabled:shadow-none"
              >
                {isSubmitting ? "Processing..." : "Continue"}
              </button>
            </div>
          </form>
        )}
        {checkoutStep === "payment" && clientSecret && (
          <div className="space-y-5">
            <DemoPaymentNotice compact />
            <Payment clientSecret={clientSecret} />
            <button
              type="button"
              onClick={() => setCheckoutStep("shipping")}
              className="w-full rounded-full border border-[#6B403C]/20 bg-white px-6 py-4 font-bold text-[#6B403C] transition hover:border-[#6B403C]"
            >
              Back
            </button>
          </div>
        )}

        <div className="mt-8 rounded-2xl bg-[#6B403C]/5 p-5 text-sm font-medium text-[#6B403C]/80">
          <div className="mb-3 flex items-center gap-2 text-base font-extrabold text-[#6B403C]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            Shipping & Delivery
          </div>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B403C]/40"></span>
              <span><strong>Delivery Time:</strong> 1 - 5 business days worldwide.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B403C]/40"></span>
              <span><strong>Processing:</strong> Orders are processed within 24 hours.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6B403C]/40"></span>
              <span><strong>Tracking:</strong> A tracking link will be sent to your email once dispatched.</span>
            </li>
          </ul>
        </div>
      </motion.aside>
    </motion.div>
  );
}
