"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";
import Image from "next/image";

// ─── Icons ───────────────────────────────────────────────────────────────────

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden className="shrink-0 mt-0.5">
      <path d="M4.39435 5.07808C4.95547 6.24678 5.7204 7.34214 6.68913 8.31087C7.65786 9.2796 8.75322 10.0445 9.92192 10.6057C10.0224 10.6539 10.0727 10.6781 10.1363 10.6966C10.3623 10.7625 10.6399 10.7152 10.8313 10.5781C10.8852 10.5395 10.9313 10.4934 11.0234 10.4013C11.3053 10.1194 11.4462 9.97849 11.5879 9.88635C12.1223 9.53888 12.8113 9.53888 13.3458 9.88635C13.4875 9.97849 13.6284 10.1194 13.9103 10.4013L14.0674 10.5584C14.4958 10.9868 14.71 11.2011 14.8264 11.4311C15.0579 11.8887 15.0579 12.4291 14.8264 12.8867C14.71 13.1168 14.4958 13.331 14.0674 13.7594L13.9403 13.8865C13.5133 14.3135 13.2998 14.527 13.0095 14.6901C12.6874 14.871 12.1872 15.0011 11.8178 15C11.4848 14.999 11.2573 14.9344 10.8022 14.8053C8.35667 14.1111 6.04899 12.8015 4.12377 10.8762C2.19854 8.95101 0.888867 6.64333 0.19474 4.19776C0.0655784 3.74269 0.000997077 3.51516 6.9162e-06 3.18224C-0.00109252 2.81281 0.129 2.31256 0.309931 1.99047C0.472986 1.70021 0.686481 1.48672 1.11347 1.05973L1.24056 0.932638C1.66902 0.504181 1.88324 0.289953 2.11332 0.17358C2.5709 -0.05786 3.11128 -0.0578601 3.56885 0.17358C3.79893 0.289953 4.01316 0.504181 4.44162 0.932638L4.59872 1.08974C4.88058 1.3716 5.02151 1.51253 5.11365 1.65425C5.46112 2.18868 5.46112 2.87765 5.11365 3.41209C5.02151 3.5538 4.88058 3.69473 4.59872 3.97659C4.50656 4.06875 4.46048 4.11483 4.42191 4.16869C4.28485 4.36011 4.23752 4.63766 4.30341 4.86368C4.32195 4.92729 4.34608 4.97755 4.39435 5.07808Z" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden className="shrink-0 mt-0.5">
      <path d="M15.6 10.5L10.2857 6M5.71429 6L0.400028 10.5M0 2.25L6.53194 6.53658C7.06087 6.8837 7.32534 7.05726 7.61301 7.12448C7.86712 7.18386 8.13288 7.18386 8.38699 7.12448C8.67466 7.05726 8.93913 6.8837 9.46806 6.53658L16 2.25M3.84 12H12.16C13.5041 12 14.1762 12 14.6896 11.7548C15.1412 11.539 15.5083 11.1948 15.7384 10.7715C16 10.2902 16 9.66012 16 8.4V3.6C16 2.33988 16 1.70982 15.7384 1.22852C15.5083 0.805157 15.1412 0.46095 14.6896 0.245235C14.1762 0 13.5041 0 12.16 0H3.84C2.49587 0 1.82381 0 1.31042 0.245235C0.858834 0.46095 0.49168 0.805157 0.261584 1.22852C0 1.70982 0 2.33988 0 3.6V8.4C0 9.66012 0 10.2902 0.261584 10.7715C0.49168 11.1948 0.858834 11.539 1.31042 11.7548C1.82381 12 2.49587 12 3.84 12Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

type ContactBlock = {
  title: string;
  phone?: string;
  email?: string;
  telHref: string;
};

const CONNECT_INTRO =
  "Lorem ipsum dolor sit amet consectetur. Congue nulla ut sit ac donec eros. Sed mauris malesuada risus.";

const CONTACT_BLOCKS: ContactBlock[] = [
  {
    title: "Business Related Enquiries",
    email: "enquiry@theguardiansindia.com",
    phone: "9152420242",
    telHref: "tel:+919152420242",
  },
  {
    title: "Channel Partner Related Enquiries",
    email: "partnertalk@theguardiansindia.com",
    phone: "022-69750000",
    telHref: "tel:+912269750000",
  },
  {
    title: "HR Related Enquiries",
    email: "hr@theguardiansindia.com",
    phone: "022-68770076 / 022-6877005",
    telHref: "tel:+912268770076",
  },
];

function ContactInfoBlock({ block }: { block: ContactBlock }) {
  return (
    <div className="flex flex-col items-center text-center sm:py-2 md:py-5 lg:items-stretch lg:text-left">
      <h3 className="n-bold text-lg leading-[1.25] text-[#161616] sm:text-xl md:text-2xl lg:text-[24px] lg:leading-[34px]">
        {block.title}
      </h3>
      {block.email && (
        <a
          href={`mailto:${block.email}`}
          className="mt-2 inline-flex min-w-0 items-start gap-2 break-words n-book text-sm leading-[1.35] text-[#161616] transition-opacity hover:opacity-70 sm:items-center sm:text-base md:text-lg lg:text-[20px] lg:leading-[24px]"
        >
          <EmailIcon />
          {block.email}
        </a>
      )}
      {block.phone && (
        <a
          href={block.telHref}
          className="inline-flex min-w-0 flex-wrap items-center gap-2 n-book text-sm leading-[1.35] text-[#161616] transition-opacity hover:opacity-70 sm:text-base md:text-lg lg:text-[20px] lg:leading-[24px]"
        >
          <PhoneIcon />
          {block.phone}
        </a>
      )}
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

const inputCls =
  "w-full border border-black/20 bg-black/5 px-3.5 py-3 n-reg  text-base text-black/60 placeholder:text-black/60 focus:outline-none focus:border-black/40 transition-colors";

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
    <section className="bg-[#F2F2F2] py-12 sm:py-14 lg:py-16" aria-label="Contact form">
      <div className="mx-auto w-full max-w-[1014px] px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-10 xl:gap-16">

          {/* ── Left: contact info ─────────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-10 lg:w-[45%] lg:flex-shrink-0">
            <header className="text-center lg:text-left">
              <h2 className="qs-reg text-[clamp(2rem,4vw,3.125rem)]  uppercase leading-[1.05] tracking-[0.05em] text-[#202225]">
                Let&apos;s connect!
              </h2>
              <p className="mt-3 n-book text-sm leading-[1.5] text-[#161616] sm:mt-4 sm:text-base lg:text-[16px] lg:leading-[24px]">
                {CONNECT_INTRO}
              </p>
            </header>
            <div className="flex flex-col gap-4">
              {CONTACT_BLOCKS.map((block) => (
                <ContactInfoBlock key={block.title} block={block} />
              ))}
            </div>
          </div>

          {/* ── Right: enquiry form ────────────────────────────────────── */}
          <div className="min-w-0 flex-1 sm:mt-5 md:mt-17">
            <form onSubmit={handleSubmit} noValidate className="w-full">
              {/* User type selector — same width as fields below */}
              <div
                className="mb-6 flex w-full flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-10"
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
                      "w-[min(100%,92px)] cursor-pointer appearance-none pr-7 text-black/80",
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
                    form.country ? "text-[#161616]" : "text-black/60",
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
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-5 py-[18px] n-reg  text-xl  uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
                }}
              >
                Submit
                <span className="inline-block" aria-hidden>
                  <Image
                    src="/images/arrowwhite.svg"
                    alt=""
                    width={15}
                    height={15}
                    className="object-cover"
                  />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
