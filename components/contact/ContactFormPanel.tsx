"use client";

import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  ContactEnquiryEmailIcon,
  ContactEnquiryPhoneIcon,
} from "@/components/common/ContactEnquiryIcons";
import { CONTACT_ENQUIRIES, type ContactEnquiry } from "@/data/contactEnquiries";
import { cn } from "@/utils/cn";
import { useState } from "react";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="8"
      height="4"
      viewBox="0 0 8 4"
      fill="none"
      aria-hidden
      className={cn(className)}
    >
      <path d="M7.02459 0.146449C7.24775 -0.0488165 7.60947 -0.0488165 7.83263 0.146449C8.05579 0.341715 8.05579 0.658228 7.83263 0.853494L4.40402 3.85355C4.18086 4.04882 3.81914 4.04882 3.59598 3.85355L0.167369 0.853494C-0.0557898 0.658228 -0.0557898 0.341715 0.167369 0.146449C0.390529 -0.0488165 0.752255 -0.0488165 0.975414 0.146449L4 2.79298L7.02459 0.146449Z" fill="black" fillOpacity="0.6" />
    </svg>
  );
}

// ─── Contact info block ───────────────────────────────────────────────────────

const CONNECT_INTRO =
  "Whether you’re exploring an opportunity or looking to take one forward, we’re here to help you move ahead with clarity.";

const enquiryLinkCls =
  "n-book fs-18 flex items-center gap-2 break-words text-sm leading-[1.35] text-[#161616] transition-opacity hover:opacity-70 sm:items-center sm:text-base md:text-lg lg:text-[20px] lg:leading-[24px]";

function ContactInfoBlock({ block }: { block: ContactEnquiry }) {
  return (
    <div className="flex flex-col items-start text-left sm:py-2 md:py-5 lg:items-stretch">
      <h3 className="n-bold fs-20 lh-24 text-[#161616] mb-2">
        {block.title}
      </h3>
      {block.email ? (
        <a href={`mailto:${block.email}`} className={enquiryLinkCls}>
          <ContactEnquiryEmailIcon className="mt-0.5 text-[#161616]" />
          {block.email}
        </a>
      ) : null}
      {block.phones.map((phone, phoneIdx) => (
        <a
          key={`${phone.telHref}-${phoneIdx}`}
          href={phone.telHref}
          className={cn(enquiryLinkCls, (block.email || phoneIdx > 0) && "mt-1")}
        >
          <ContactEnquiryPhoneIcon className="mt-0.5 shrink-0 text-[#161616]" />
          {phone.display}
        </a>
      ))}
    </div>
  );
}

// ─── Radio option ─────────────────────────────────────────────────────────────

type UserType = "buyer" | "developer" | "other";

function RadioOption({
  label,
  value,
  selected,
  onClick,
}: {
  label: string;
  value: UserType;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 n-reg  text-base text-[#202225] tracking-[-0.01em]"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#202225]">
        {selected && <span className="h-[18px] w-[18px] rounded-full bg-[#CFCFCF]" />}
      </span>
      {label}
    </button>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────────

/** Figma: panel #F2F2F2; fields one step darker for contrast */
const inputCls =
  "w-full border border-black/[0.14] bg-[#E8E8E8] px-3.5 py-3 n-reg text-base text-[#161616] placeholder:text-[#161616]/50 focus:outline-none focus:border-black/35 transition-colors";

// ─── Main panel ──────────────────────────────────────────────────────────────

export function ContactFormPanel() {
  const [userType, setUserType] = useState<UserType>("buyer");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dialCode: "+91",
    phone: "",
    country: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <section
      className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:py-20"
      aria-label="Contact form"
    >
      {/* Figma: single #F2F2F2 card on white, generous inner padding */}
      <div className="mt-5 mx-auto w-full max-w-[1014px] bg-[#F2F2F2] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">

          {/* ── Left: contact info ─────────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-8 lg:w-[45%] lg:shrink-0 lg:gap-10">
            <header className="text-left">
              <h2 className="qs-reg text-[clamp(2rem,4vw,3.125rem)] uppercase leading-[1.05] tracking-[0.05em] text-[#202225]">
                Let&apos;s connect!
              </h2>
              <p className="mt-3 n-book text-sm  text-[#161616] sm:mt-4 ">
                {CONNECT_INTRO}
              </p>
            </header>
            <div className="flex flex-col gap-6 sm:gap-7">
              {CONTACT_ENQUIRIES.map((block) => (
                <ContactInfoBlock key={block.title} block={block} />
              ))}
            </div>
          </div>

          {/* ── Right: enquiry form ────────────────────────────────────── */}
          <div className="min-w-0 flex-1 mt-4 md:mt-10 lg:mt-16 ">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="w-full text-left"
            >
              {/* User type selector — same width as fields below */}
              <div
                className="mb-6 flex w-full flex-wrap items-start gap-x-6 gap-y-3 sm:gap-x-10"
                role="group"
                aria-label="I am a"
              >
                <RadioOption label="Buyer" value="buyer" selected={userType === "buyer"} onClick={() => setUserType("buyer")} />
                <RadioOption label="Developer" value="developer" selected={userType === "developer"} onClick={() => setUserType("developer")} />
                <RadioOption label="Other" value="other" selected={userType === "other"} onClick={() => setUserType("other")} />
              </div>

              {/* Name row */}
              <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className={inputCls} type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} aria-label="First Name" />
                <input className={inputCls} type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} aria-label="Last Name" />
              </div>

              {/* Email */}
              <div className="mb-3">
                <input className={inputCls} type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} aria-label="Email" />
              </div>

              {/* Phone */}
              <div className="mb-3 flex gap-2">
                <div className="relative shrink-0">
                  <select
                    name="dialCode"
                    value={form.dialCode}
                    onChange={handleChange}
                    className={cn(
                      inputCls,
                      "w-[min(100%,92px)] cursor-pointer appearance-none pr-7",
                    )}
                    aria-label="Country calling code"
                  >
                    <option value="+91">+91</option>
                    <option value="+971">+971</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
                <input
                  className={cn(inputCls, "min-w-0 flex-1")}
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  aria-label="Phone Number"
                />
              </div>

              {/* Country */}
              <div className="relative mb-3">
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={cn(
                    inputCls,
                    "cursor-pointer appearance-none pr-10 text-left",
                    form.country ? "text-[#161616]" : "text-[#161616]/50",
                  )}
                  aria-label="Country"
                >
                  <option value="">Country</option>
                  <option value="IN">India</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Message */}
              <div className="mb-4">
                <textarea
                  className={cn(inputCls, "h-[109px] resize-none")}
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  aria-label="Message"
                />
              </div>

              {/* Submit */}
              <OutlineArrowButton
                type="submit"
                className="flex w-full py-[18px] n-bold fs-20 lh-24 uppercase tracking-[0.1em]"
                iconClassName="h-[15px] w-[15px]"
                iconAlt=""
              >
                Submit
              </OutlineArrowButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
