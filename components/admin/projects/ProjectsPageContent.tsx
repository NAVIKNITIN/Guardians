"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = (await listProjects()) as ProjectsListResponse;

        if (!result.success) {
          throw new Error("Failed to load projects");
        }

        if (!isMounted) return;
        setProjects(result.data.data ?? []);
      } catch (error) {
        if (!isMounted) return;

        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
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
            <StaggerContainer className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" staggerChildren={0.08}>
              {projects.map((project, index) => (
                <ScrollReveal key={project.id} direction="up" delay={index * 0.03} distance={18}>
                <article
                  className="rounded-[18px] border border-[#e8edf5] bg-[#fcfdff] p-2.5 shadow-[0_5px_12px_rgba(13,30,70,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d7e0ee] hover:shadow-[0_14px_24px_rgba(13,30,70,0.12)]"
                >
                  <div className="flex items-start justify-between gap-2.5">
                    <div>
                      <h3 className="font-qasbyne text-[1.65rem] leading-none text-[#0d1e46]">
                        {project.name}
                      </h3>

                      <p className="mt-2.5 text-sm font-medium text-[#7b879b]">
                        Project ID: {project.id}
                      </p>
                    </div>

                    <span
                      className={[
                        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                        project.status
                          ? "bg-[#edf8f0] text-[#2f7a47]"
                          : "bg-[#fff1ef] text-[#d05c43]",
                      ].join(" ")}
                    >
                      {project.status ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-2.5 space-y-2.5 text-sm text-[#5d6678]">
                    <p>
                      <span className="font-semibold text-[#44506a]">Type:</span>{" "}
                      {project.type || "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold text-[#44506a]">RERA:</span>{" "}
                      {project.rera_number || "N/A"}
                    </p>

                    <p>
                      <span className="font-semibold text-[#44506a]">Area:</span>{" "}
                      {project.area || "N/A"}
                    </p>
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-2.5 text-sm text-[#5d6678]">
                    <div className="rounded-[12px] bg-white px-2.5 py-2.5">
                      <p className="font-semibold text-[#44506a]">
                        {project.configurations?.length ?? 0}
                      </p>
                      <p className="mt-2">Configurations</p>
                    </div>

                    <div className="rounded-[12px] bg-white px-2.5 py-2.5">
                      <p className="font-semibold text-[#44506a]">
                        {project.locations?.length ?? 0}
                      </p>
                      <p className="mt-2">Locations</p>
                    </div>

                    <div className="rounded-[12px] bg-white px-2.5 py-2.5">
                      <p className="font-semibold text-[#44506a]">
                        {project.amenities?.length ?? 0}
                      </p>
                      <p className="mt-2">Amenities</p>
                    </div>

                    <div className="rounded-[12px] bg-white px-2.5 py-2.5">
                      <p className="font-semibold text-[#44506a]">
                        {project.files?.length ?? 0}
                      </p>
                      <p className="mt-2">Files</p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex gap-2.5">
                    <Link
                      href={`/admin/add-project?id=${project.id}`}
                      className="inline-flex h-[44px] flex-1 items-center justify-center rounded-[12px] border border-[#f09684] px-4 text-[0.86rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                    >
                      Update Project
                    </Link>
                  </div>
                </article>
                </ScrollReveal>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}
