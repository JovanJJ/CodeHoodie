"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactMessage, type ContactFormState } from "@/lib/actions";

const contactLinks = [
  {
    label: "Email",
    value: "jovanjj99@gmail.com",
    href: "mailto:jovanjj99@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/JovanJJ",
    href: "https://github.com/JovanJJ",
  },
  {
    label: "Upwork",
    value: "View profile",
    href: "https://www.upwork.com/freelancers/~01e9755d9bf9b9d4b9",
  },
];

const initialContactFormState: ContactFormState = {
  ok: false,
  message: "",
};

export default function ContactSection() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialContactFormState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <section id="contact" className="w-full bg-[#fafafa] px-6 py-24 md:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 w-fit rounded-full bg-[#ADEBB3]/35 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-[#6B403C]">
            Contact
          </div>
          <h2 className="text-3xl font-extrabold text-[#6B403C] md:text-5xl">
            Let&apos;s Talk
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#6B403C]/75">
            Send a message directly from the site, or reach out through one of the links below.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#6B403C]/10 bg-white px-5 py-4 text-[#6B403C] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#6B403C]/25 hover:shadow-md"
              >
                <span>
                  <span className="block text-xs font-extrabold uppercase tracking-widest text-[#6B403C]/55">
                    {link.label}
                  </span>
                  <span className="mt-1 block font-bold">{link.value}</span>
                </span>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6B403C] text-lg text-[#ADEBB3] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>

        <form
          ref={formRef}
          action={formAction}
          className="rounded-3xl border border-[#6B403C]/10 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="text-sm font-bold uppercase tracking-wider text-[#6B403C]/70">
              Name
              <input
                name="name"
                type="text"
                required
                defaultValue={state.fields?.name}
                className="mt-2 w-full rounded-2xl border border-[#6B403C]/15 bg-[#fafafa] px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#6B403C] outline-none transition focus:border-[#6B403C] focus:bg-white"
                placeholder="Your name"
              />
            </label>

            <label className="text-sm font-bold uppercase tracking-wider text-[#6B403C]/70">
              Email
              <input
                name="email"
                type="email"
                required
                defaultValue={state.fields?.email}
                className="mt-2 w-full rounded-2xl border border-[#6B403C]/15 bg-[#fafafa] px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#6B403C] outline-none transition focus:border-[#6B403C] focus:bg-white"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-bold uppercase tracking-wider text-[#6B403C]/70">
            Message
            <textarea
              name="message"
              required
              rows={7}
              maxLength={2000}
              defaultValue={state.fields?.message}
              className="mt-2 w-full resize-none rounded-2xl border border-[#6B403C]/15 bg-[#fafafa] px-4 py-3 text-base font-semibold normal-case tracking-normal text-[#6B403C] outline-none transition focus:border-[#6B403C] focus:bg-white"
              placeholder="Write your message"
            />
          </label>

          {state.message ? (
            <p
              className={`mt-5 rounded-2xl px-4 py-3 text-sm font-bold ${state.ok
                ? "bg-[#ADEBB3]/30 text-[#2f7d46]"
                : "bg-[#f21137]/10 text-[#f21137]"
                }`}
            >
              {state.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isPending}
            className="mt-6 w-full rounded-full bg-[#6B403C] px-8 py-4 text-lg font-bold text-[#ADEBB3] shadow-lg shadow-[#6B403C]/20 transition hover:shadow-xl disabled:cursor-wait disabled:bg-[#6B403C]/55 disabled:text-white/70 disabled:shadow-none"
          >
            {isPending ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
