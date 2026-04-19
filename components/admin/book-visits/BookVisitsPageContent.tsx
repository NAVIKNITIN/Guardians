"use client";

import { IconMapPin } from "@/components/admin/panel/AdminIcons";

type IconProps = {
  className?: string;
};

type BookVisit = {
  id: string | number;
  name: string;
  date: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  cvLabel?: string;
  detailsLabel?: string;
};

function IconEnvelope({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
      aria-hidden
    >
      <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2.25" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 6 7.046 5.285a.75.75 0 0 0 .908 0L19.5 6"
      />
    </svg>
  );
}

function IconPhone({ className }: IconProps) {
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
        d="M2.25 5.25c0 9.113 7.387 16.5 16.5 16.5h1.5a1.5 1.5 0 0 0 1.5-1.5v-3.097a1.5 1.5 0 0 0-1.281-1.484l-3.172-.453a1.5 1.5 0 0 0-1.478.64l-.696 1.045a12.035 12.035 0 0 1-5.569-5.569l1.045-.696a1.5 1.5 0 0 0 .64-1.478l-.453-3.172A1.5 1.5 0 0 0 8.847 3.75H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
      />
    </svg>
  );
}

function IconDocumentText({ className }: IconProps) {
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
        d="M6.75 3.75h6.879c.398 0 .779.158 1.061.439l2.121 2.121c.281.282.439.663.439 1.061V19.5a.75.75 0 0 1-.75.75H6.75A2.25 2.25 0 0 1 4.5 18V6A2.25 2.25 0 0 1 6.75 3.75Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 9.75h7.5M8.25 13.5h7.5M8.25 17.25h4.5"
      />
    </svg>
  );
}

function VisitCard({ visit }: { visit: BookVisit }) {
  return (
    <article className="rounded-[28px] border border-[#dbe4f0] bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="space-y-2">
        <h2 className="text-[2.05rem] font-semibold leading-tight text-[#1f2a44]">
          {visit.name}
        </h2>
        <p className="text-[1.1rem] text-[#7c8aa5]">{visit.date}</p>
      </div>

      <div className="mt-8 space-y-4 text-[#6d7d98]">
        <div className="flex items-center gap-4">
          <IconEnvelope className="h-6 w-6 shrink-0" />
          <span className="text-[1.05rem]">{visit.email}</span>
        </div>

        <div className="flex items-center gap-4">
          <IconPhone className="h-6 w-6 shrink-0" />
          <span className="text-[1.05rem]">{visit.phone}</span>
        </div>

        <div className="flex items-center gap-4">
          <IconMapPin className="h-6 w-6 shrink-0" />
          <span className="text-[1.05rem]">{visit.location}</span>
        </div>
      </div>

      <div className="mt-8 rounded-[20px] bg-[#f7f9fc] px-5 py-5 text-[1.05rem] leading-8 text-[#5f6f89]">
        {visit.message}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-3 text-[1.05rem] font-medium text-[#5e6f8b]"
        >
          <IconDocumentText className="h-6 w-6" />
          <span>{visit.cvLabel ?? "Download CV"}</span>
        </button>

        <button
          type="button"
          className="inline-flex h-[54px] items-center justify-center rounded-[18px] px-8 text-[1.08rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.24)]"
        >
          {visit.detailsLabel ?? "View Details"}
        </button>
      </div>
    </article>
  );
}

export function BookVisitsPageContent({
  visits = [],
}: {
  visits?: BookVisit[];
}) {
  return (
    <section className="mx-auto min-h-[420px] max-w-[1420px]">
      {visits.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {visits.map((visit) => (
            <VisitCard key={visit.id} visit={visit} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
