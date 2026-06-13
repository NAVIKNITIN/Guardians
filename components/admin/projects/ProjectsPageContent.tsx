"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconFolderStack } from "@/components/admin/panel/AdminIcons";
import { deleteProject, listProjects } from "@/src/api/services/projectService";
import { normalizeApiError } from "@/src/utils/apiErrorHandler";

type ProjectItem = {
  id: number;
  name: string;
  type: string | null;
  rera_number: string | null;
  area: string | null;
  isCompleted?: boolean;
  completion_date?: string | null;
};

function toInputMonthValue(raw: string | null | undefined): string {
  if (raw == null || raw === "") return "";
  const s = String(raw).trim();
  if (/^\d{4}-\d{2}/.test(s)) {
    return s.slice(0, 7);
  }
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function isProjectCompleted(project: ProjectItem): boolean {
  if (typeof project.isCompleted === "boolean") {
    return project.isCompleted;
  }

  const monthValue = toInputMonthValue(project.completion_date);
  const match = /^(\d{4})-(\d{2})$/.exec(monthValue);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return false;
  }

  const now = new Date();
  const projectIndex = year * 12 + (month - 1);
  const nowIndex = now.getFullYear() * 12 + now.getMonth();
  return projectIndex < nowIndex;
}

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
  const [actionError, setActionError] = useState("");
  const [selectedProjectIds, setSelectedProjectIds] = useState<number[]>([]);
  const [deletingProjectId, setDeletingProjectId] = useState<number | null>(
    null,
  );
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);

  const listLoadTokenRef = useRef(0);
  const selectAllProjectsRef = useRef<HTMLInputElement>(null);

  const selectedCount = selectedProjectIds.length;
  const allProjectsSelected =
    projects.length > 0 && selectedCount === projects.length;
  const someProjectsSelected =
    selectedCount > 0 && selectedCount < projects.length;
  const isOperating = isBatchDeleting || deletingProjectId !== null;

  async function loadProjects() {
    const loadToken = ++listLoadTokenRef.current;

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
      setSelectedProjectIds((current) =>
        current.filter((id) =>
          (result.data.data ?? []).some((project) => project.id === id),
        ),
      );
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

  useEffect(() => {
    void loadProjects();

    return () => {
      listLoadTokenRef.current += 1;
    };
  }, []);

  useEffect(() => {
    if (selectAllProjectsRef.current) {
      selectAllProjectsRef.current.indeterminate = someProjectsSelected;
    }
  }, [someProjectsSelected]);

  function toggleProjectSelection(projectId: number) {
    setSelectedProjectIds((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId],
    );
  }

  function toggleSelectAllProjects() {
    setSelectedProjectIds((current) =>
      current.length === projects.length
        ? []
        : projects.map((project) => project.id),
    );
  }

  function clearProjectSelection() {
    setSelectedProjectIds([]);
  }

  async function handleDeleteProject(project: ProjectItem) {
    const confirmed = window.confirm(
      `Delete "${project.name}"? This cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }

    setActionError("");
    setDeletingProjectId(project.id);

    try {
      const result = (await deleteProject(project.id)) as {
        success?: boolean;
        message?: string;
      };

      if (result?.success === false) {
        throw new Error(result.message || "Failed to delete project");
      }

      setProjects((current) =>
        current.filter((item) => item.id !== project.id),
      );
      setSelectedProjectIds((current) =>
        current.filter((id) => id !== project.id),
      );
    } catch (error) {
      const { message } = normalizeApiError(error);
      setActionError(message || "Failed to delete project. Please try again.");
    } finally {
      setDeletingProjectId(null);
    }
  }

  async function handleBatchDeleteProjects() {
    const ids = [...selectedProjectIds];
    if (ids.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${ids.length} project${ids.length === 1 ? "" : "s"}? This cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }

    setActionError("");
    setIsBatchDeleting(true);

    const results = await Promise.allSettled(
      ids.map((id) => deleteProject(id)),
    );

    const failedIds: number[] = [];
    results.forEach((result, index) => {
      const id = ids[index];
      if (result.status === "rejected") {
        failedIds.push(id);
        return;
      }

      const payload = result.value as { success?: boolean };
      if (payload?.success === false) {
        failedIds.push(id);
      }
    });

    const succeededIds = ids.filter((id) => !failedIds.includes(id));
    setProjects((current) =>
      current.filter((project) => !succeededIds.includes(project.id)),
    );
    setSelectedProjectIds(failedIds);

    if (failedIds.length > 0) {
      setActionError(
        failedIds.length === ids.length
          ? "Failed to delete selected projects. Please try again."
          : `Deleted ${succeededIds.length} of ${ids.length} projects. ${failedIds.length} could not be deleted.`,
      );
    }

    setIsBatchDeleting(false);
  }

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
              <div className="space-y-3">
                {actionError ? (
                  <p className="text-sm font-medium text-[#d05c43]">
                    {actionError}
                  </p>
                ) : null}

                {selectedCount > 0 ? (
                  <div className="flex flex-col gap-3 rounded-[14px] border border-[#e8edf5] bg-[#f6f8fc] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-[#44506a]">
                      {selectedCount} selected
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={clearProjectSelection}
                        disabled={isOperating}
                        className="inline-flex h-9 cursor-pointer items-center justify-center rounded-[10px] border border-[#d5dbe8] px-3 text-[0.8125rem] font-semibold text-[#44506a] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Clear selection
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleBatchDeleteProjects()}
                        disabled={isOperating}
                        className="inline-flex h-9 cursor-pointer items-center justify-center rounded-[10px] border border-[#e8a8a0] px-3 text-[0.8125rem] font-semibold text-[#d05c43] transition hover:bg-[#fff5f1] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isBatchDeleting ? "Deleting…" : "Delete selected"}
                      </button>
                    </div>
                  </div>
                ) : null}

                <div className="-mx-5 overflow-x-auto sm:mx-0 sm:rounded-[16px] sm:border sm:border-[#e8edf5]">
                <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e8edf5] bg-[#f6f8fc] text-[#44506a]">
                      <th className="w-12 whitespace-nowrap px-4 py-3 text-center">
                        <input
                          ref={selectAllProjectsRef}
                          type="checkbox"
                          checked={allProjectsSelected}
                          onChange={toggleSelectAllProjects}
                          disabled={isOperating}
                          className="h-4 w-4 accent-[#f07c61] disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label="Select all projects"
                        />
                      </th>
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
                      <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5d6678]">
                    {projects.map((project) => {
                      const completed = isProjectCompleted(project);
                      const isDeleting = deletingProjectId === project.id;
                      const isSelected = selectedProjectIds.includes(project.id);

                      return (
                      <tr
                        key={project.id}
                        className={[
                          "border-b border-[#edf2f8] transition-colors last:border-b-0",
                          isSelected
                            ? "bg-[#fff8f5] hover:bg-[#fff3ed]"
                            : "bg-[#fcfdff] hover:bg-[#f3f6fb]",
                        ].join(" ")}
                      >
                        <td className="px-4 py-3 text-center align-middle">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleProjectSelection(project.id)}
                            disabled={isOperating}
                            className="h-4 w-4 accent-[#f07c61] disabled:cursor-not-allowed disabled:opacity-60"
                            aria-label={`Select ${project.name}`}
                          />
                        </td>
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
                              completed
                                ? "bg-[#edf2f8] text-[#44506a]"
                                : "bg-[#edf8f0] text-[#2f7a47]",
                            ].join(" ")}
                          >
                            {completed ? "Completed" : "Ongoing"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/add-project?id=${project.id}`}
                              className="inline-flex h-9 items-center justify-center rounded-[10px] border border-[#f09684] px-3 text-[0.8125rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                            >
                              Update
                            </Link>
                            <button
                              type="button"
                              onClick={() => void handleDeleteProject(project)}
                              disabled={isDeleting || isOperating}
                              className="inline-flex h-9 cursor-pointer items-center justify-center rounded-[10px] border border-[#e8a8a0] px-3 text-[0.8125rem] font-semibold text-[#d05c43] transition hover:bg-[#fff5f1] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isDeleting ? "Deleting…" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
