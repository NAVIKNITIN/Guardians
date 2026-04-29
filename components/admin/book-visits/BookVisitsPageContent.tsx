"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { FileUploadField } from "@/components/common/FileUploadField";
import { useEffect, useState } from "react";
import { getAllVisits } from "@/src/api/services/visitService";
import { IconMapPin } from "@/components/admin/panel/AdminIcons";

type IconProps = {
  className?: string;
};

type BookVisitApiItem = {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  phone_no: string;
  location: string | null;
  message: string | null;
  cv_file_url: string | null;
  created_at: string;
  updated_at: string;
};

type BookVisitsResponse = {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    data: BookVisitApiItem[];
  };
};

type BookVisit = {
  id: string | number;
  name: string;
  date: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  cvFileUrl: string | null;
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

function IconChevronLeft({ className }: IconProps) {
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
        d="m14.25 6.75-5.25 5.25 5.25 5.25"
      />
    </svg>
  );
}

function IconChevronRight({ className }: IconProps) {
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
        d="m9.75 6.75 5.25 5.25-5.25 5.25"
      />
    </svg>
  );
}

function formatVisitDate(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function mapVisit(item: BookVisitApiItem): BookVisit {
  const fullName = [item.first_name, item.last_name ?? ""].join(" ").trim();

  return {
    id: item.id,
    name: fullName || "Unnamed Visitor",
    date: formatVisitDate(item.created_at),
    email: item.email,
    phone: item.phone_no,
    location: item.location ?? "Location not provided",
    message: item.message ?? "No message provided.",
    cvFileUrl: item.cv_file_url,
  };
}

function VisitCard({ visit }: { visit: BookVisit }) {
  return (
    <article className="rounded-[28px] border border-[#dbe4f0] bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(15,23,42,0.09)] sm:p-8">
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
        <div className="w-full min-w-0 sm:max-w-md sm:flex-1">
          {visit.cvFileUrl ? (
            <FileUploadField
              layout="inline"
              id={`visit-cv-${visit.id}`}
              accept="application/pdf"
              downloadHref={visit.cvFileUrl}
              onChange={() => {}}
              valueDisplay={visit.cvLabel ?? "Download CV"}
              leadingContent={
                <IconDocumentText className="h-5 w-5 shrink-0" />
              }
            />
          ) : (
            <FileUploadField
              layout="inline"
              id={`visit-cv-${visit.id}`}
              accept="application/pdf"
              disabled
              onChange={() => {}}
              valueDisplay="No CV Uploaded"
              leadingContent={
                <IconDocumentText className="h-5 w-5 shrink-0" />
              }
            />
          )}
        </div>

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

export function BookVisitsPageContent() {
  const [visits, setVisits] = useState<BookVisit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadVisits() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = (await getAllVisits({
          per_page: 6,
          page: currentPage,
        })) as BookVisitsResponse;

        if (!isMounted) return;

        setVisits(result.data.data.map(mapVisit));
        setLastPage(Math.max(1, result.data.last_page));
      } catch (error) {
        if (!isMounted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to load book visits.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadVisits();

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  function goToPage(page: number) {
    if (page < 1 || page > lastPage) return;
    setCurrentPage(page);
  }

  return (
    <section className="min-h-[420px] w-full space-y-4">
      {errorMessage ? (
        <ScrollReveal direction="up" distance={20}>
        <div className="rounded-[20px] border border-[#f3d3cb] bg-[#fff6f3] px-5 py-4 text-[1rem] font-medium text-[#c25b45]">
          {errorMessage}
        </div>
        </ScrollReveal>
      ) : null}

      <ScrollReveal direction="up" delay={0.04} distance={20}>
        <section className="overflow-hidden rounded-[30px] border border-[#e7e4df] bg-white shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="border-b border-[#e9edf3] bg-white">
                <tr className="text-left">
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">ID</th>
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">Name</th>
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">Date</th>
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">Email</th>
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">Phone</th>
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">Location</th>
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">Message</th>
                  <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">CV</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-14 text-center text-[1.05rem] text-[#6b7280]">
                      Loading book visits...
                    </td>
                  </tr>
                ) : visits.length > 0 ? (
                  visits.map((visit) => (
                    <tr
                      key={visit.id}
                      className="border-b border-[#eef2f6] transition-colors hover:bg-[#f8fafc] last:border-b-0"
                    >
                      <td className="px-4 py-4 align-top text-[0.9rem] font-medium text-[#4b5563] sm:px-5">{visit.id}</td>
                      <td className="px-4 py-4 align-top text-[0.94rem] font-semibold text-[#161b22] sm:px-5">{visit.name}</td>
                      <td className="px-4 py-4 align-top text-[0.9rem] text-[#4b5563] sm:px-5">{visit.date}</td>
                      <td className="px-4 py-4 align-top text-[0.9rem] text-[#4b5563] sm:px-5">{visit.email}</td>
                      <td className="px-4 py-4 align-top text-[0.9rem] text-[#4b5563] sm:px-5">{visit.phone}</td>
                      <td className="px-4 py-4 align-top text-[0.9rem] text-[#4b5563] sm:px-5">{visit.location}</td>
                      <td className="px-4 py-4 align-top text-[0.9rem] text-[#4b5563] sm:px-5">
                        <p className="max-w-[320px] line-clamp-2">{visit.message}</p>
                      </td>
                      <td className="px-4 py-4 align-top text-[0.9rem] sm:px-5">
                        {visit.cvFileUrl ? (
                          <a
                            href={visit.cvFileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex rounded-[12px] border border-[#dbe2ec] bg-[#f8fafc] px-3 py-1.5 font-medium text-[#526178] transition hover:bg-[#eef3fa]"
                          >
                            Download CV
                          </a>
                        ) : (
                          <span className="text-[#8b95a7]">No CV</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-14 text-center text-[1.05rem] text-[#6b7280]">
                      No book visits found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.08} className="flex items-center justify-center gap-2.5">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[14px] border border-[#e6eaf0] bg-white text-[#6b7280] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>

        {Array.from({ length: lastPage }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              className={[
                "inline-flex h-[48px] w-[48px] items-center justify-center rounded-[14px] text-[0.98rem] font-semibold transition",
                currentPage === page
                  ? "btn-primary-gradient text-white"
                  : "border border-[#e6eaf0] bg-white text-[#111827] hover:bg-[#f8fafc]",
              ].join(" ")}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-[14px] border border-[#e6eaf0] bg-white text-[#6b7280] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </ScrollReveal>
    </section>
  );
}
