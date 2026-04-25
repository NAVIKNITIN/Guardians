"use client";

import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { IconChevronLeft } from "@/components/common/icons";
import { login as loginRequest } from "@/src/api/services/authService";
import { login as setLoggedIn } from "@/src/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginResponse = {
  success: boolean;
  message: string;
  data?: {
    id: number;
    username: string;
    role_type: string;
  };
};

function IconBuilding({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M6 21V6.75A2.25 2.25 0 0 1 8.25 4.5h7.5A2.25 2.25 0 0 1 18 6.75V21M9 8.25h.008v.008H9V8.25Zm0 3h.008v.008H9v-.008Zm0 3h.008v.008H9v-.008Zm6-6h.008v.008H15V8.25Zm0 3h.008v.008H15v-.008Zm0 3h.008v.008H15v-.008ZM10.5 21v-3.75a1.5 1.5 0 0 1 3 0V21"
      />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0A2.25 2.25 0 0 0 19.5 5.25h-15A2.25 2.25 0 0 0 2.25 7.5m19.5 0-8.69 5.518a2.25 2.25 0 0 1-2.12 0L2.25 7.5"
      />
    </svg>
  );
}

function IconLock({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V8.25a4.5 4.5 0 1 0-9 0v2.25M6.75 10.5h10.5A1.5 1.5 0 0 1 18.75 12v6a1.5 1.5 0 0 1-1.5 1.5H6.75A1.5 1.5 0 0 1 5.25 18v-6a1.5 1.5 0 0 1 1.5-1.5Z"
      />
    </svg>
  );
}

function IconEye({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12Z"
      />
      <circle cx="12" cy="12" r="2.25" />
    </svg>
  );
}

function IconEyeSlash({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.584 10.587A2.25 2.25 0 0 0 13.416 13.4M9.88 5.53A10.84 10.84 0 0 1 12 5.25c6 0 9.75 6.75 9.75 6.75a17.6 17.6 0 0 1-4.172 4.772M6.61 6.617C4.142 8.294 2.25 12 2.25 12s3.75 6.75 9.75 6.75a10.6 10.6 0 0 0 3.318-.525"
      />
    </svg>
  );
}

export function AdminLoginForm() {
  // CHANGE: backend login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-[412px]">
      <StaggerContainer className="contents" staggerChildren={0.1}>
        <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full btn-primary-gradient text-white shadow-[0_14px_30px_rgba(240,150,132,0.28)] transition-transform duration-300 hover:scale-105">
          <IconBuilding className="h-9 w-9 text-[#ffe9e1]" />
        </div>

        <h1 className="mt-6 text-center qs-reg text-[clamp(2.6rem,4vw,3.45rem)] leading-none text-[#3f3a39]">
          Admin Login
        </h1>

        <div
          className="mx-auto mt-5 h-[3px] w-[70px] rounded-full btn-primary-gradient"
          aria-hidden
        />
      </StaggerContainer>

      <form
        className="mt-11"
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMessage("");

          try {
            setIsSubmitting(true);

            // CHANGE: login request backend ko helper ke through bhej rahe hain
            const result = (await loginRequest({
              username,
              password,
            })) as LoginResponse;

            // CHANGE: backend HTTP 200 ke saath success false bhi bhej sakta hai
            if (!result.success) {
              throw new Error(result.message || "Login failed");
            }

            setLoggedIn();
            // CHANGE: abhi token auth nahi hai, isliye success ke baad direct route change
            router.push("/admin/projects");
          } catch (error) {
            setErrorMessage(
              error instanceof Error ? error.message : "Something went wrong",
            );
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div>
          <label
            htmlFor="username"
            className="mb-3 block text-[1.04rem] font-semibold text-[#66615f]"
          >
            Username
          </label>

          <div className="flex h-[58px] items-center gap-3 rounded-[15px] border border-[#e6ddd8] bg-white px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <IconMail className="h-5 w-5 shrink-0 text-[#98a2b3]" />
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              className="h-full w-full border-0 bg-transparent text-[1.05rem] text-[#4f4b49] outline-none placeholder:text-[#8a8a8a]"
            />
          </div>
        </div>

        <div className="mt-7">
          <label
            htmlFor="password"
            className="mb-3 block text-[1.04rem] font-semibold text-[#66615f]"
          >
            Password
          </label>

          <div className="flex h-[58px] items-center gap-3 rounded-[15px] border border-[#e6ddd8] bg-white px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <IconLock className="h-5 w-5 shrink-0 text-[#98a2b3]" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="........"
              className="h-full w-full border-0 bg-transparent text-[1.05rem] tracking-[0.2em] text-[#4f4b49] outline-none placeholder:text-[#8a8a8a]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="shrink-0 text-[#98a2b3] transition-colors hover:text-[#6b7280]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IconEyeSlash className="h-5 w-5" />
              ) : (
                <IconEye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-4 text-sm font-medium text-[#d05c43]">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col gap-4 text-[1.02rem] sm:flex-row sm:items-center sm:justify-between">
          <label className="flex items-center gap-3 text-[#4f5968]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border border-[#cfcfcf] accent-[#ec8769]"
            />
            <span>Remember me</span>
          </label>

          <Link
            href="#"
            className="font-medium text-[#d27e6c] transition-colors hover:text-[#ee6846]"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="text-3xl cursor-pointer mt-8 h-[58px] w-full rounded-[16px] btn-grad text-[1.08rem] font-bold uppercase tracking-widest text-white shadow-[0_18px_32px_rgba(239,111,82,0.24)]"
        >
          {isSubmitting ? "Logging In..." : "Login"}
        </button>
      </form>

      <div className="mt-10 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[1.02rem] text-[#6b7280] transition-colors hover:text-[#414b5f]"
        >
          <IconChevronLeft className="h-4 w-4" />
          Back to Website
        </Link>
      </div>
    </section>
  );
}
