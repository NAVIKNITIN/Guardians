"use client";

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
    <section className="mx-auto max-w-[1420px]">
      <div className="rounded-[30px] border border-[#e7e4df] bg-white shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
        <div className="flex items-center gap-4 border-b border-[#efede9] px-6 py-7 sm:px-9">
          <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-[#fff3ed] text-[#f07c61]">
            <IconFolderStack className="h-7 w-7" />
          </div>

          <h2 className="qs-reg text-[clamp(2.4rem,4vw,3.4rem)] leading-none text-[#081a43]">
            All Projects
          </h2>
        </div>

        <div className="space-y-6 px-6 py-7 sm:px-9 sm:py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <Link
              href="/admin/add-project"
              className="inline-flex h-[58px] items-center justify-center rounded-[18px] px-8 text-lg font-semibold text-white btn-primary-gradient shadow-[0_20px_32px_rgba(240,150,132,0.22)]"
            >
              Add Project
            </Link>

            <Link
              href="/"
              className="inline-flex h-[58px] items-center justify-center rounded-[18px] border border-[#f09684] px-8 text-lg font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
            >
              Back to Website
            </Link>
          </div>

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
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-[24px] border border-[#ece7e1] bg-[#fffdfa] p-6 shadow-[0_6px_14px_rgba(22,20,19,0.04)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-qasbyne text-[2rem] leading-none text-[#081a43]">
                        {project.name}
                      </h3>

                      <p className="mt-3 text-sm font-medium text-[#7b879b]">
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

                  <div className="mt-5 space-y-2 text-sm text-[#5d6678]">
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

                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#5d6678]">
                    <div className="rounded-[16px] bg-white px-4 py-3">
                      <p className="font-semibold text-[#44506a]">
                        {project.configurations?.length ?? 0}
                      </p>
                      <p className="mt-1">Configurations</p>
                    </div>

                    <div className="rounded-[16px] bg-white px-4 py-3">
                      <p className="font-semibold text-[#44506a]">
                        {project.locations?.length ?? 0}
                      </p>
                      <p className="mt-1">Locations</p>
                    </div>

                    <div className="rounded-[16px] bg-white px-4 py-3">
                      <p className="font-semibold text-[#44506a]">
                        {project.amenities?.length ?? 0}
                      </p>
                      <p className="mt-1">Amenities</p>
                    </div>

                    <div className="rounded-[16px] bg-white px-4 py-3">
                      <p className="font-semibold text-[#44506a]">
                        {project.files?.length ?? 0}
                      </p>
                      <p className="mt-1">Files</p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/admin/add-project?id=${project.id}`}
                      className="inline-flex h-[50px] flex-1 items-center justify-center rounded-[16px] border border-[#f09684] px-5 text-sm font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                    >
                      Update Project
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
