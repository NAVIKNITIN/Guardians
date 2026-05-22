"use client";

import { cn } from "@/utils/cn";

export function BookVisitChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width="17"
      height="10"
      viewBox="0 0 17 10"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M1 1L8.5 9L16 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
    </svg>
  );
}

export function BookVisitArrowUpRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
      <line x1="0" y1="14" x2="14" y2="0" stroke="white" strokeWidth="2" />
    </svg>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  required?: boolean;
}

const underlineInputCls =
  "border-b border-[#8F8183]/70 bg-white/60 pb-2 pt-0.5 text-left n-reg text-sm text-[#202020] placeholder-[#202020]/40 outline-none transition-[border-color,background-color] duration-200 focus:border-[#f07c61] focus:bg-white dark:border-neutral-600 dark:bg-white/[0.04] dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-[#f07c61] dark:focus:bg-white/[0.06]";

export function BookVisitFormField({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  id,
  required,
}: FormFieldProps) {
  const inputId = id ?? name;
  return (
    <div className="flex flex-col gap-1 text-left">
      <label
        htmlFor={inputId}
        className="text-left n-bold text-xs uppercase tracking-[0.08em] text-brand-text-primary dark:text-neutral-200"
      >
        {label}
        {required ? (
          <span className="sr-only"> (required)</span>
        ) : null}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={underlineInputCls}
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  id?: string;
}

export function BookVisitSelectField({
  label,
  name,
  placeholder,
  value,
  onChange,
  options,
  id,
}: SelectFieldProps) {
  const selectId = id ?? name;
  return (
    <div className="flex flex-col gap-1 text-left">
      <label
        htmlFor={selectId}
        className="text-left n-reg text-sm text-brand-text-primary dark:text-neutral-100"
      >
        {label}
      </label>
      <div className="relative border-b border-[#8F8183] pb-1 transition-colors focus-within:border-[#f07c61] dark:border-neutral-600 dark:focus-within:border-[#f07c61]">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full appearance-none bg-transparent text-left n-reg text-sm outline-none",
            value ? "text-[#202020] dark:text-neutral-100" : "text-[#202020]/40 dark:text-neutral-500",
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="text-[#202020] dark:text-neutral-900">
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#202020]/40 dark:text-neutral-500">
          <BookVisitChevronDown />
        </div>
      </div>
    </div>
  );
}

interface MessageFieldProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
}

export function BookVisitMessageField({ name, value, onChange, id }: MessageFieldProps) {
  const textareaId = id ?? name;
  return (
    <div className="text-left">
      <label
        htmlFor={textareaId}
        className="block text-left n-bold text-xs uppercase tracking-[0.08em] text-brand-text-primary dark:text-neutral-200"
      >
        Message
      </label>
      <textarea
        id={textareaId}
        name={name}
        placeholder="Type Message...."
        value={value}
        onChange={onChange}
        rows={2}
        className={cn(underlineInputCls, "mt-2 w-full resize-none")}
      />
    </div>
  );
}
