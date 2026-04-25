"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Image from "next/image";
import dynamic from "next/dynamic";

const AdminLoginForm = dynamic(
  () =>
    import("@/components/admin/AdminLoginForm").then(
      (mod) => mod.AdminLoginForm,
    ),
  {
    ssr: false,
  },
);
const LOGIN_BG_SRC = "/images/admin/login-bg.png";

export function AdminLoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5efec]">
      <div className="absolute inset-0">
        <Image
          src={LOGIN_BG_SRC}
          alt="Admin login background"
          fill
          priority
          sizes="100vw"
          className=""
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,241,239,0.52)_0%,rgba(246,241,239,0.34)_26%,rgba(246,241,239,0.18)_52%,rgba(246,241,239,0.26)_100%)]" />

        <div className="absolute inset-0 bg-white/16 backdrop-blur-[1.2px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <ScrollReveal direction="up" distance={28} className="w-full max-w-[510px]">
          <div className="w-full max-w-[510px] rounded-[28px] border border-white/70 bg-white/88 p-6 shadow-[0_24px_70px_rgba(83,51,40,0.16)] backdrop-blur-lg sm:p-10">
            <AdminLoginForm />
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
