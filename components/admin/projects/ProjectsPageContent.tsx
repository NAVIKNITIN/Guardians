"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconFolderStack } from "@/components/admin/panel/AdminIcons";
import { listProjects } from "@/src/api/services/projectService";

type ProjectItem = {
  id: number;
  name: string;
  type: string | null;
  rera_number: string | null;
  area: string | null;
  status: boolean;
  files?: Array<{ id: number }>;
  configurations?: Array<{ id: number }>;
  locations?: Array<{ id: number }>;
  amenities?: Array<{ id: number }>;
};

type ProjectsListResponse = {
  success: boolean;
  data: {
    data: ProjectItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export function ProjectsPageContent() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const listLoadTokenRef = useRef(0);

  useEffect(() => {
    const loadToken = ++listLoadTokenRef.current;

    async function loadProjects() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = (await listProjects()) as ProjectsListResponse;

        if (loadToken !== listLoadTokenRef.current) {
          return;
        }

        if (!result.success) {
          throw new Error("Failed to load projects");
        }

        setProjects(result.data.data ?? []);
      } catch (error) {
        if (loadToken !== listLoadTokenRef.current) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        if (loadToken === listLoadTokenRef.current) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      listLoadTokenRef.current += 1;
    };
  }, []);

  return (
    <section className="w-full">
      <ScrollReveal direction="up" distance={24}>
        <div className="overflow-hidden rounded-[24px] border border-[#e5ebf3] bg-white shadow-[0_12px_28px_rgba(13,30,70,0.08)]">
          <div className="flex flex-col gap-4 border-b border-[#edf2f8] px-5 py-4 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#fff3ed] text-[#f07c61]">
                <IconFolderStack className="h-6 w-6" />
              </div>

              <h2 className="qs-reg text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none text-[#0d1e46]">
                All Projects
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
              <Link
                href="/admin/add-project"
                className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-[14px] px-6 text-[0.94rem] font-semibold text-white btn-primary-gradient shadow-[0_12px_22px_rgba(240,150,132,0.2)]"
              >
                Add Project
              </Link>

              <Link
                href="/"
                className="inline-flex h-[48px] cursor-pointer items-center justify-center rounded-[14px] border border-[#f09684] px-6 text-[0.94rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
              >
                Back to Website
              </Link>
            </div>
          </div>

          <div className="space-y-4 px-5 py-5 sm:px-7 sm:py-6">
            {isLoading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[24px] bg-[#fffdfa] text-center">
                <p className="text-[1.12rem] font-medium text-[#5d6678]">
                  Loading projects...
                </p>
              </div>
            ) : errorMessage ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[24px] bg-[#fff8f5] px-6 text-center">
                <p className="text-[1.02rem] font-medium text-[#d05c43]">
                  {errorMessage}
                </p>
              </div>
            ) : projects.length === 0 ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-[24px] bg-[#fffdfa] px-6 text-center">
                <p className="max-w-[780px] text-[1.28rem] leading-relaxed text-[#5d6678]">
                  Your projects will appear here. Click "Add Project" to create
                  your first listing.
                </p>
              </div>
            ) : (
              <div className="-mx-5 overflow-x-auto sm:mx-0 sm:rounded-[16px] sm:border sm:border-[#e8edf5]">
                <table className="w-full min-w-[920px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8edf5] bg-[#f6f8fc] text-[#44506a]">
                      <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                        ID
                      </th>
                      <th className="min-w-[140px] whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                        Name
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                        Type
                      </th>
                      <th className="min-w-[100px] whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                        RERA
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                        Area
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">
                        Status
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">
                        Cfgs
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">
                        Locs
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">
                        Amen.
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide">
                        Files
                      </th>
                      <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5d6678]">
                    {projects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-[#edf2f8] bg-[#fcfdff] transition-colors hover:bg-[#f3f6fb] last:border-b-0"
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[0.8125rem] font-semibold tabular-nums text-[#0d1e46]">
                          {project.id}
                        </td>
                        <td className="max-w-[220px] px-4 py-3 font-qasbyne text-[1rem] font-normal leading-tight text-[#0d1e46]">
                          <span className="line-clamp-2">{project.name}</span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {project.type || "N/A"}
                        </td>
                        <td className="max-w-[140px] px-4 py-3">
                          <span className="line-clamp-2">
                            {project.rera_number || "N/A"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {project.area || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={[
                              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
                              project.status
                                ? "bg-[#edf8f0] text-[#2f7a47]"
                                : "bg-[#fff1ef] text-[#d05c43]",
                            ].join(" ")}
                          >
                            {project.status ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center tabular-nums">
                          {project.configurations?.length ?? 0}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center tabular-nums">
                          {project.locations?.length ?? 0}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center tabular-nums">
                          {project.amenities?.length ?? 0}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-center tabular-nums">
                          {project.files?.length ?? 0}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <Link
                            href={`/admin/add-project?id=${project.id}`}
                            className="inline-flex h-9 items-center justify-center rounded-[10px] border border-[#f09684] px-3 text-[0.8125rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                          >
                            Update
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
