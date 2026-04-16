"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type UserType = "business" | "employee";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  issueTitle: string;
}

function RadioCircle({ checked }: { checked: boolean }) {
  return (
    <span
      className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#202225]"
      aria-hidden
    >
      {checked && (
        <span className="h-[18px] w-[18px] rounded-full bg-[#CFCFCF]" />
      )}
    </span>
  );
}

function CornerArrowIcon({ color = "white" }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M0 0H14.4958V14.4958" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="8" height="4" viewBox="0 0 8 4" fill="none" aria-hidden>
      <path
        d="M7.02459 0.146449C7.24775 -0.0488165 7.60947 -0.0488165 7.83263 0.146449C8.05579 0.341715 8.05579 0.658228 7.83263 0.853494L4.40402 3.85355C4.18086 4.04882 3.81914 4.04882 3.59598 3.85355L0.167369 0.853494C-0.0557898 0.658228 -0.0557898 0.341715 0.167369 0.146449C0.390529 -0.0488165 0.752255 -0.0488165 0.975414 0.146449L4 2.79298L7.02459 0.146449Z"
        fill="black"
        fillOpacity="0.6"
      />
    </svg>
  );
}

const inputCls =
  "w-full border border-black/20 bg-black/5 px-3.5 py-3 n-reg  text-base text-black/60 placeholder:text-black/60 focus:outline-none focus:border-black/40 transition-colors";

export function DownloadModal({ isOpen, onClose, issueTitle }: DownloadModalProps) {
  const [userType, setUserType] = useState<UserType>("business");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(185,186,188,0.80)] px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal
      aria-labelledby="download-modal-title"
    >
      <div className="relative w-full max-w-[1014px] bg-[#F2F2F2] px-8 py-10 sm:px-14 sm:py-12">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center text-[#202225] transition-opacity hover:opacity-60"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M0.0175781 0L15.6565 15.6389" stroke="#202225" strokeWidth="1.42224" strokeLinecap="round" />
            <path d="M15.6387 0L-0.000211952 15.6389" stroke="#202225" strokeWidth="1.42224" strokeLinecap="round" />
          </svg>
        </button>

        {/* Heading */}
        <h2
          id="download-modal-title"
          className="qs-reg text-[clamp(2rem,3.5vw,3.125rem)] font-normal uppercase tracking-[0.05em] text-[#202225] text-center"
        >
          Download file
        </h2>

        {/* Description */}
        <p className="mt-4 text-center n-reg  text-base text-[#202225]/80 tracking-[-0.01em]">
          Lorem ipsum dolor sit amet consectetur. Congue nulla ut sit ac donec eros. Sed mauris malesuada risus.
        </p>

        {/* Form */}
        <form
          className="mt-8 mx-auto max-w-[452px]"
          onSubmit={(e) => { e.preventDefault(); onClose(); }}
          noValidate
        >
          {/* User type toggle */}
          <div className="flex items-center gap-6 mb-6">
            <button
              type="button"
              className="flex items-center gap-3 n-reg  text-base text-[#202225] tracking-[-0.01em]"
              onClick={() => setUserType("business")}
            >
              <RadioCircle checked={userType === "business"} />
              Business Person
            </button>
            <button
              type="button"
              className="flex items-center gap-3 n-reg  text-base text-[#202225] tracking-[-0.01em]"
              onClick={() => setUserType("employee")}
            >
              <RadioCircle checked={userType === "employee"} />
              Employee
            </button>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-x-4 mb-3">
            <input
              className={inputCls}
              type="text"
              placeholder="First Name"
              aria-label="First Name"
            />
            <input
              className={inputCls}
              type="text"
              placeholder="Last Name"
              aria-label="Last Name"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              className={inputCls}
              type="email"
              placeholder="Email"
              aria-label="Email"
            />
          </div>

          {/* Phone */}
          <div className="mb-3 flex gap-0">
            <div className={cn(inputCls, "flex w-20 flex-shrink-0 items-center justify-between gap-2")}>
              <span>+91</span>
              <ChevronDown />
            </div>
            <input
              className={cn(inputCls, "flex-1")}
              type="tel"
              placeholder="Phone Number"
              aria-label="Phone Number"
            />
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <div className={cn(inputCls, "flex items-center justify-between cursor-pointer")}>
              <span>Company Name</span>
              <ChevronDown />
            </div>
          </div>

          {/* Designation — Employee only */}
          {userType === "employee" && (
            <div className="mb-3">
              <div className={cn(inputCls, "flex items-center justify-between cursor-pointer")}>
                <span>Designation</span>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center gap-5 py-[18px] n-reg  text-xl font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
            }}
          >
            Submit
            <Image
              src="/images/arrowwhite.svg"
              alt="Submit"
              width={15}
              height={15}
              className="object-cover"
            />
          </button>
        </form>
      </div>
    </div>
  );
}
