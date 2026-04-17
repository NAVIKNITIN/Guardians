"use client";

import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useState } from "react";

type JobListing = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
};

const JOBS: JobListing[] = [
  {
    id: "1",
    title: "Senior Sales Manager",
    department: "Sales",
    location: "Mumbai",
    type: "Full-time",
    experience: "5–8 years",
  },
  {
    id: "2",
    title: "Channel Partner Manager",
    department: "Sales",
    location: "Mumbai / Pune",
    type: "Full-time",
    experience: "3–6 years",
  },
  {
    id: "3",
    title: "Real Estate Analyst",
    department: "Research",
    location: "Mumbai",
    type: "Full-time",
    experience: "2–4 years",
  },
  {
    id: "4",
    title: "Market Intelligence Specialist",
    department: "Research",
    location: "Mumbai",
    type: "Full-time",
    experience: "3–5 years",
  },
  {
    id: "5",
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Mumbai",
    type: "Full-time",
    experience: "4–7 years",
  },
  {
    id: "6",
    title: "Brand & Content Strategist",
    department: "Marketing",
    location: "Mumbai",
    type: "Full-time",
    experience: "3–5 years",
  },
  {
    id: "7",
    title: "HR Business Partner",
    department: "HR",
    location: "Mumbai",
    type: "Full-time",
    experience: "4–6 years",
  },
  {
    id: "8",
    title: "Operations Executive",
    department: "Operations",
    location: "Mumbai / Pune",
    type: "Full-time",
    experience: "2–4 years",
  },
  {
    id: "9",
    title: "CRM & Technology Lead",
    department: "Operations",
    location: "Mumbai",
    type: "Full-time",
    experience: "3–5 years",
  },
  {
    id: "10",
    title: "Investment Advisory Analyst",
    department: "Advisory",
    location: "Mumbai / Dubai",
    type: "Full-time",
    experience: "2–5 years",
  },
];

const DEPARTMENTS = ["All", "Sales", "Research", "Marketing", "HR", "Operations", "Advisory"] as const;
type Department = (typeof DEPARTMENTS)[number];

function JobCard({ job }: { job: JobListing }) {
  return (
    <div className="group flex flex-col gap-4 border-b border-black/[0.06] py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="n-reg  text-lg  text-[#202225] transition-colors group-hover:text-[#8F8183]">
          {job.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="n-reg  text-xs text-brand-text-secondary">
            {job.location}
          </span>
          <span className="h-1 w-1 rounded-full bg-brand-text-muted" aria-hidden />
          <span className="n-reg  text-xs text-brand-text-secondary">
            {job.experience}
          </span>
          <span className="h-1 w-1 rounded-full bg-brand-text-muted" aria-hidden />
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 n-reg  text-[10px] font-semibold uppercase tracking-wide",
              job.type === "Full-time"
                ? "bg-[#DADADB] text-[#202225]"
                : "bg-[#8F8183]/15 text-[#8F8183]",
            )}
          >
            {job.type}
          </span>
        </div>
      </div>

      <Link
        href="/contact"
        className={cn(
          "inline-flex w-fit shrink-0 items-center gap-2",
          "border border-[#202225] px-5 py-2.5 n-reg  text-xs  uppercase tracking-[0.15em] text-[#202225]",
          "transition-all hover:bg-[#202225] hover:text-white",
          "sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100",
        )}
      >
        Apply Now
        <IconArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export function OpenPositions() {
  const [active, setActive] = useState<Department>("All");

  const filtered =
    active === "All" ? JOBS : JOBS.filter((j) => j.department === active);

  return (
    <section
      id="open-positions"
      className="border-t border-black/[0.06] bg-[#FAFAFA] py-16 sm:py-20 lg:py-24"
      aria-labelledby="positions-heading"
    >
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="positions-heading"
            className={marketingClasses.headingDisplay}
          >
            Open Positions
          </h2>
          <p className="n-reg  text-sm text-brand-text-secondary">
            {filtered.length} role{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Department filter tabs */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter by department"
        >
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              role="tab"
              aria-selected={active === dept}
              onClick={() => setActive(dept)}
              className={cn(
                "px-4 py-2 n-reg  text-xs  uppercase tracking-[0.15em] transition-colors",
                active === dept
                  ? "bg-[#202225] text-white"
                  : "bg-white text-[#202225] border border-black/[0.12] hover:border-[#202225]",
              )}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job listings */}
        <div className="mt-8" role="tabpanel" aria-live="polite">
          {filtered.length > 0 ? (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="py-12 text-center n-reg  text-sm text-brand-text-secondary">
              No open positions in this department right now. Check back soon.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
