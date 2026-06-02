"use client";

import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  audienceMarketingOutlineCtaClass,
  audienceMarketingOutlineCtaIconClass,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

type UserType = "business" | "employee";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  issueTitle: string;
  fileUrl?: string;
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

export function DownloadModal({
  isOpen,
  onClose,
  issueTitle,
  fileUrl,
}: DownloadModalProps) {
  const [userType, setUserType] = useState<UserType>("business");
  const [formError, setFormError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setFormError(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setDesignation("");
    setUserType("business");
  };

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

  useEffect(() => {
    if (!isOpen) return;
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, issueTitle]);

  useEffect(() => {
    if (userType !== "employee") setDesignation("");
  }, [userType]);

  if (!isOpen) return null;

  const normalizedPhone = phone.replace(/\s+/g, "");
  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const isValidPhone = (value: string) => /^\d{10}$/.test(value.trim());

  const validate = () => {
    if (!firstName.trim()) return "Please enter your first name.";
    if (!lastName.trim()) return "Please enter your last name.";
    if (!email.trim() || !isValidEmail(email)) return "Please enter a valid email.";
    if (!normalizedPhone || !isValidPhone(normalizedPhone)) return "Please enter a valid 10-digit phone number.";
    if (!company.trim()) return "Please enter your company name.";
    if (userType === "employee" && !designation.trim()) return "Please enter your designation.";
    if (!fileUrl) return "Download is unavailable for this issue.";
    return null;
  };

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
          className="absolute pointer-cursor right-6 top-6 flex h-8 w-8 items-center justify-center text-[#202225] transition-opacity hover:opacity-60"
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
          className="qs-reg text-[clamp(2rem,3.5vw,3.125rem)]  uppercase tracking-[0.05em] text-[#202225] text-center"
        >
          Download file
        </h2>

        {/* Description */}
        <p className=" text-center n-reg  text-base text-[#202225] tracking-[-0.01em]">
          Lorem ipsum dolor sit amet consectetur. Congue nulla ut sit ac donec eros. Sed mauris malesuada risus.
        </p>

        {/* Form */}
        <form
          className="mt-8 mx-auto max-w-[452px]"
          onSubmit={(e) => {
            e.preventDefault();

            const error = validate();
            if (error) {
              setFormError(error);
              return;
            }

            setFormError(null);

            // Trigger browser download (served by `/api/publications/download`)
            // Note: keep the download behavior here so we only download after submit.
            if (fileUrl) {
              const a = document.createElement("a");
              a.href = fileUrl;
              a.download = "";
              a.rel = "noopener";
              document.body.appendChild(a);
              a.click();
              a.remove();
            }

            resetForm();
            onClose();
          }}
          noValidate
          data-file-url={fileUrl ?? ""}
        >
          {formError ? (
            <p className="mb-4 rounded border border-red-500/30 bg-red-500/10 px-3 py-2 n-reg text-sm text-red-700">
              {formError}
            </p>
          ) : null}

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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={inputCls}
              type="text"
              placeholder="Last Name"
              aria-label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              className={inputCls}
              type="email"
              placeholder="Email"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              pattern="\\d{10}"
              required
            />
          </div>

          {/* Company Name */}
          <div className="mb-3">
            <input
              className={inputCls}
              type="text"
              placeholder="Company Name"
              aria-label="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          {/* Designation — Employee only */}
          {userType === "employee" && (
            <div className="mb-3">
              <input
                className={inputCls}
                type="text"
                placeholder="Designation"
                aria-label="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </div>
          )}

          {/* Submit */}
          <div className="mt-4 flex justify-center [&_button]:w-fit [&_button]:max-w-full">
            <OutlineArrowButton
              type="submit"
              className={cn(
                audienceMarketingOutlineCtaClass,
                "max-lg:!w-fit max-lg:!max-w-full",
              )}
              iconClassName={audienceMarketingOutlineCtaIconClass}
              iconAlt=""
            >
              Submit
            </OutlineArrowButton>
          </div>
        </form>
      </div>
    </div>
  );
}
