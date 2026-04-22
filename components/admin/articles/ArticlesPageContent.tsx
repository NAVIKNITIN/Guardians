"use client";

import type { ChangeEvent, FormEvent, KeyboardEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { IconPlus } from "@/components/admin/panel/AdminIcons";
import { apiClient } from "@/utils/api";
const hiddenScrollbarClass =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

type IconProps = {
  className?: string;
};

type ArticleType = "NEWS" | "BLOG";
type ArticleStatus = "Published" | "Draft";
type ModalMode = "create" | "view" | "edit";

type ArticleApiItem = {
  id: number;
  title: string;
  type: ArticleType;
  description: string | null;
  active: boolean;
  created_at: string;
  file: {
    id: number;
    file_url: string;
    file_name: string;
  } | null;
  categories: string[];
};

type ArticleListResponse = {
  success: boolean;
  data: {
    current_page: number;
    last_page: number;
    data: ArticleApiItem[];
  };
};

type ArticleMutationResponse = {
  success: boolean;
  message?: string;
  data: ArticleApiItem;
};

type FileUploadResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    file_url: string;
    file_name: string;
    file_type: string;
    sequence_no: number | null;
  };
};

type ArticleRow = {
  id: number;
  title: string;
  type: ArticleType;
  categories: string[];
  createdDate: string;
  status: ArticleStatus;
  description: string;
  fileId: number | null;
  fileName: string | null;
  fileUrl: string | null;
};

const typeBadgeClasses: Record<ArticleType, string> = {
  NEWS: "bg-[#dceaff] text-[#2563eb]",
  BLOG: "bg-[#f2e4ff] text-[#8b24ff]",
};

const statusBadgeClasses: Record<ArticleStatus, string> = {
  Published: "bg-[#ddf9e8] text-[#049647]",
  Draft: "bg-[#fff2b8] text-[#c68300]",
};

const ITEMS_PER_PAGE = 2;

function formatCreatedDate(value: string) {
  if (!value) return "";
  return value.slice(0, 10);
}

function mapArticle(item: ArticleApiItem): ArticleRow {
  return {
    id: item.id,
    title: item.title,
    type: item.type,
    categories: Array.isArray(item.categories) ? item.categories : [],
    createdDate: formatCreatedDate(item.created_at),
    status: item.active ? "Published" : "Draft",
    description: item.description ?? "",
    fileId: item.file?.id ?? null,
    fileName: item.file?.file_name ?? null,
    fileUrl: item.file?.file_url ?? null,
  };
}

function IconChevronDown({ className }: IconProps) {
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
        d="m6.75 9.75 5.25 5.25 5.25-5.25"
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

function IconEye({ className }: IconProps) {
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
        d="M2.25 12S5.625 5.25 12 5.25 21.75 12 21.75 12 18.375 18.75 12 18.75 2.25 12 2.25 12Z"
      />
      <circle cx="12" cy="12" r="2.25" />
    </svg>
  );
}

function IconPencil({ className }: IconProps) {
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
        d="m16.862 4.487 2.651 2.651a1.875 1.875 0 0 1 0 2.652l-9.36 9.36-4.403.55.55-4.403 9.36-9.36a1.875 1.875 0 0 1 2.652 0Z"
      />
    </svg>
  );
}

function IconTrash({ className }: IconProps) {
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
        d="M4.5 7.5h15M9.75 3.75h4.5M8.25 3.75h7.5A1.5 1.5 0 0 1 17.25 5.25V7.5H6.75V5.25a1.5 1.5 0 0 1 1.5-1.5ZM6.75 7.5v10.125A2.625 2.625 0 0 0 9.375 20.25h5.25a2.625 2.625 0 0 0 2.625-2.625V7.5M10.5 11.25v5.25M13.5 11.25v5.25"
      />
    </svg>
  );
}

function IconXMark({ className }: IconProps) {
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
        d="M6 6 18 18M18 6 6 18"
      />
    </svg>
  );
}

function InputShell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-3">
      <span className="text-[1.05rem] font-semibold text-[#111827]">
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
  readOnly = false,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <input
      value={value}
      readOnly={readOnly}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="h-[58px] w-full rounded-[16px] border border-[#e7ebf1] bg-[#f8f9fc] px-5 text-[1.05rem] text-[#44506a] outline-none transition placeholder:text-[#8b95a7] focus:border-[#f09684] focus:bg-white read-only:cursor-default"
    />
  );
}

function TextAreaField({
  placeholder,
  value,
  onChange,
  readOnly = false,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) {
  return (
    <textarea
      rows={5}
      value={value}
      readOnly={readOnly}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-[16px] border border-[#e7ebf1] bg-[#f8f9fc] px-5 py-4 text-[1.05rem] text-[#44506a] outline-none transition placeholder:text-[#8b95a7] focus:border-[#f09684] focus:bg-white read-only:cursor-default"
    />
  );
}

function SelectField({
  value,
  onChange,
  options,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-[58px] w-full appearance-none rounded-[16px] border border-[#e7ebf1] bg-[#f8f9fc] px-5 pr-14 text-[1.05rem] text-[#111827] outline-none transition focus:border-[#f09684] focus:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa3b3]" />
    </div>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[1.02rem] font-semibold text-[#374151]">{label}</p>
      {children}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[58px] w-full appearance-none rounded-[16px] border border-[#e9edf2] bg-[#f8f9fc] px-5 pr-14 text-[1.05rem] font-medium text-[#111827] outline-none transition focus:border-[#f09684] focus:bg-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a3acbb]" />
    </div>
  );
}

function AddArticleModal({
  open,
  onClose,
  onSaved,
  mode,
  initialArticle,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
  mode: ModalMode;
  initialArticle: ArticleRow | null;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Select article type");
  const [fileValue, setFileValue] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  function resetForm() {
    setTitle("");
    setType("Select article type");
    setFileValue("");
    setSelectedFileName("");
    setIsUploadingFile(false);
    setCategoryInput("");
    setCategories([]);
    setMessage("");
    setErrorMessage("");
  }

  useEffect(() => {
    if (!open) return;

    if (initialArticle) {
      setTitle(initialArticle.title);
      setType(initialArticle.type);
      setFileValue(initialArticle.fileId ? String(initialArticle.fileId) : "");
      setSelectedFileName(
        initialArticle.fileName ||
          (initialArticle.fileId ? `File ID: ${initialArticle.fileId}` : ""),
      );
      setCategoryInput("");
      setCategories(initialArticle.categories);
      setMessage(initialArticle.description ?? "");
      setErrorMessage("");
      return;
    }

    resetForm();
  }, [open, initialArticle]);

  function handleClose() {
    resetForm();
    onClose();
  }

  function addCategory() {
    if (isViewMode) return;

    const nextCategory = categoryInput.trim();
    if (!nextCategory) return;

    const alreadyExists = categories.some(
      (item) => item.toLowerCase() === nextCategory.toLowerCase(),
    );

    if (!alreadyExists) {
      setCategories((current) => [...current, nextCategory]);
    }

    setCategoryInput("");
  }

  function handleCategoryKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      addCategory();
    }
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const maxFileSizeInBytes = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setFileValue("");
      setSelectedFileName("");
      setErrorMessage("Only JPG, JPEG, and PNG images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > maxFileSizeInBytes) {
      setFileValue("");
      setSelectedFileName("");
      setErrorMessage("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    try {
      setIsUploadingFile(true);
      setErrorMessage("");
      setSelectedFileName("Uploading...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_type", "HERO");

      const result = await apiClient.request<FileUploadResponse>(
        "/files/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!result.success) {
        throw new Error(result.message || "Image upload failed.");
      }

      setFileValue(String(result.data.id));
      setSelectedFileName(result.data.file_name || file.name);
    } catch (error) {
      setFileValue("");
      setSelectedFileName("");
      setErrorMessage(
        error instanceof Error ? error.message : "Image upload failed.",
      );
      event.target.value = "";
    } finally {
      setIsUploadingFile(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isViewMode) {
      handleClose();
      return;
    }

    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }

    if (type !== "NEWS" && type !== "BLOG") {
      setErrorMessage("Please select article type.");
      return;
    }

    const trimmedFileValue = fileValue.trim();
    const normalizedFileId = trimmedFileValue ? Number(trimmedFileValue) : null;

    if (trimmedFileValue && Number.isNaN(normalizedFileId)) {
      setErrorMessage("File ID must be a number.");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        type,
        title: title.trim(),
        description: message.trim() || null,
        file_id: normalizedFileId,
        active: initialArticle ? initialArticle.status === "Published" : true,
        categories,
      };

      const result =
        isEditMode && initialArticle
          ? await apiClient.put<ArticleMutationResponse>(
              `/articles/${initialArticle.id}`,
              payload,
            )
          : await apiClient.post<ArticleMutationResponse>("/articles", payload);

      if (!result.success) {
        throw new Error(
          result.message ||
            (isEditMode
              ? "Failed to update article."
              : "Failed to add article."),
        );
      }

      await onSaved();
      handleClose();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0f172a]/35 p-4 backdrop-blur-[3px] sm:items-center ${hiddenScrollbarClass}`}>
      <div
  className={`my-6 max-h-[calc(100vh-2rem)] w-full max-w-[760px] overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_28px_60px_rgba(15,23,42,0.18)] sm:p-8 ${hiddenScrollbarClass}`}>

        <div className="flex items-start justify-between gap-4">
          <h2 className="font-qasbyne text-[clamp(2rem,3vw,3rem)] leading-none text-[#111827]">
            {isViewMode
              ? "View Article"
              : isEditMode
                ? "Update Article"
                : "Add New Article"}
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#606776] transition hover:bg-[#f5f7fb]"
          >
            <IconXMark className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-7">
          <InputShell label="Title">
            <TextInput
              placeholder="Enter article title"
              value={title}
              onChange={setTitle}
              readOnly={isViewMode}
            />
          </InputShell>

          <InputShell label="Type">
            <SelectField
              value={type}
              onChange={setType}
              options={["Select article type", "NEWS", "BLOG"]}
              disabled={isViewMode}
            />
          </InputShell>

          <InputShell label="Upload">
            {isViewMode ? (
              <TextInput
                placeholder="No image uploaded"
                value={selectedFileName || fileValue}
                onChange={() => {}}
                readOnly
              />
            ) : (
              <div className="space-y-3">
                <label className="flex h-[58px] cursor-pointer items-center justify-between rounded-[16px] border border-[#e7ebf1] bg-[#f8f9fc] px-5 text-[1.05rem] text-[#44506a] transition hover:border-[#f09684] hover:bg-white">
                  <span>
                    {isUploadingFile
                      ? "Uploading..."
                      : selectedFileName || "Upload"}
                  </span>

                  <span className="text-sm font-semibold text-[#f07c61]">
                    JPG/PNG
                  </span>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    onChange={handleFileChange}
                    disabled={isUploadingFile}
                    className="hidden"
                  />
                </label>

                {fileValue ? (
                  <p className="text-sm font-medium text-[#2f7a4b]">
                    Image uploaded successfully.
                  </p>
                ) : null}
              </div>
            )}
          </InputShell>

          <div className="space-y-3">
            <span className="block text-[1.05rem] font-semibold text-[#111827]">
              Categories
            </span>

            {!isViewMode ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={categoryInput}
                  onChange={(event) => setCategoryInput(event.target.value)}
                  onKeyDown={handleCategoryKeyDown}
                  placeholder="Add category (press Enter)"
                  className="h-[58px] flex-1 rounded-[16px] border border-[#e7ebf1] bg-[#f8f9fc] px-5 text-[1.05rem] text-[#44506a] outline-none transition placeholder:text-[#8b95a7] focus:border-[#f09684] focus:bg-white"
                />

                <button
                  type="button"
                  onClick={addCategory}
                  className="inline-flex h-[58px] items-center justify-center rounded-[16px] border border-[#e2e6ed] bg-white px-8 text-[1.05rem] font-semibold text-[#111827] transition hover:bg-[#f8fafc]"
                >
                  Add
                </button>
              </div>
            ) : null}

            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex rounded-full border border-[#dbe2ec] bg-[#f8fafc] px-3 py-2 text-sm font-medium text-[#526178]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#8b95a7]">No categories added.</p>
            )}
          </div>

          <InputShell label="Message">
            <TextAreaField
              placeholder="Enter article message"
              value={message}
              onChange={setMessage}
              readOnly={isViewMode}
            />
          </InputShell>

          {errorMessage ? (
            <p className="text-sm font-medium text-[#d05c43]">{errorMessage}</p>
          ) : null}

          <div className="border-t border-[#ebeef3] pt-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="inline-flex h-[54px] items-center justify-center rounded-[16px] border border-[#e2e6ed] bg-white px-8 text-[1.08rem] font-semibold text-[#111827] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isViewMode ? "Close" : "Cancel"}
              </button>

              {!isViewMode ? (
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingFile}
                  className="inline-flex h-[54px] items-center justify-center rounded-[16px] px-8 text-[1.08rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting
                    ? isEditMode
                      ? "Updating..."
                      : "Adding..."
                    : isEditMode
                      ? "Update Article"
                      : "Add Article"}
                </button>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ArticlesPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [selectedArticle, setSelectedArticle] = useState<ArticleRow | null>(
    null,
  );

  const [draftTypeFilter, setDraftTypeFilter] = useState("All Types");
  const [draftYearFilter, setDraftYearFilter] = useState("All Years");

  const [appliedTypeFilter, setAppliedTypeFilter] = useState("All Types");
  const [appliedYearFilter, setAppliedYearFilter] = useState("All Years");

  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadArticles() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const params = new URLSearchParams();
        params.set("per_page", String(ITEMS_PER_PAGE));
        params.set("page", String(currentPage));

        if (appliedTypeFilter !== "All Types") {
          params.set("type", appliedTypeFilter);
        }

        if (appliedYearFilter !== "All Years") {
          params.set("year", appliedYearFilter);
        }

        const result = await apiClient.get<ArticleListResponse>(
          `/articles?${params.toString()}`,
        );

        if (!isMounted) return;

        setArticles(result.data.data.map(mapArticle));
        setLastPage(Math.max(1, result.data.last_page));
      } catch (error) {
        if (!isMounted) return;

        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load articles.",
        );
        setArticles([]);
        setLastPage(1);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadArticles();

    return () => {
      isMounted = false;
    };
  }, [currentPage, appliedTypeFilter, appliedYearFilter, reloadKey]);

  function handleApplyFilter() {
    setAppliedTypeFilter(draftTypeFilter);
    setAppliedYearFilter(draftYearFilter);
    setCurrentPage(1);
  }

  function handleArticleSaved() {
    setCurrentPage(1);
    setReloadKey((value) => value + 1);
  }

  function goToPage(page: number) {
    if (page < 1 || page > lastPage) return;
    setCurrentPage(page);
  }

  function handleOpenCreate() {
    setSelectedArticle(null);
    setModalMode("create");
    setIsModalOpen(true);
  }

  function handleOpenView(article: ArticleRow) {
    setSelectedArticle(article);
    setModalMode("view");
    setIsModalOpen(true);
  }

  function handleOpenEdit(article: ArticleRow) {
    setSelectedArticle(article);
    setModalMode("edit");
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedArticle(null);
  }

  return (
    <>
      <section className="mx-auto max-w-[1420px] space-y-8">
        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex h-[58px] items-center justify-center gap-3 rounded-[18px] px-8 text-[1.15rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_32px_rgba(240,150,132,0.22)]"
          >
            <IconPlus className="h-5 w-5" />
            <span>Add Article</span>
          </button>
        </div>

        <section className="rounded-[28px] border border-[#e7ecf3] bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:p-8">
          <div className="grid gap-5 xl:grid-cols-2">
            <FilterField label="Type">
              <FilterSelect
                value={draftTypeFilter}
                onChange={setDraftTypeFilter}
                options={["All Types", "NEWS", "BLOG"]}
              />
            </FilterField>

            <FilterField label="Year">
              <FilterSelect
                value={draftYearFilter}
                onChange={setDraftYearFilter}
                options={["All Years", "2026", "2025", "2024"]}
              />
            </FilterField>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleApplyFilter}
              className="inline-flex h-[54px] items-center justify-center rounded-[16px] px-8 text-[1.08rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.22)]"
            >
              Apply Filter
            </button>
          </div>
        </section>

        {errorMessage ? (
          <div className="rounded-[20px] border border-[#f3d3cb] bg-[#fff6f3] px-5 py-4 text-[1rem] font-medium text-[#c25b45]">
            {errorMessage}
          </div>
        ) : null}

        <section className="overflow-hidden rounded-[28px] border border-[#e7ecf3] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1120px]">
              <thead className="border-b border-[#e9edf3] bg-white">
                <tr className="text-left">
                  <th className="px-4 py-5 text-[1rem] font-semibold text-[#111827] sm:px-6">
                    Title
                  </th>
                  <th className="px-4 py-5 text-[1rem] font-semibold text-[#111827] sm:px-6">
                    Type
                  </th>
                  <th className="px-4 py-5 text-[1rem] font-semibold text-[#111827] sm:px-6">
                    Categories
                  </th>
                  <th className="px-4 py-5 text-[1rem] font-semibold text-[#111827] sm:px-6">
                    Created Date
                  </th>
                  <th className="px-4 py-5 text-[1rem] font-semibold text-[#111827] sm:px-6">
                    Status
                  </th>
                  <th className="px-4 py-5 text-[1rem] font-semibold text-[#111827] sm:px-6">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center text-[1.05rem] text-[#6b7280]"
                    >
                      Loading articles...
                    </td>
                  </tr>
                ) : articles.length > 0 ? (
                  articles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-[#eef2f6] last:border-b-0"
                    >
                      <td className="px-4 py-5 align-top text-[1rem] font-semibold text-[#161b22] sm:px-6">
                        {article.title}
                      </td>

                      <td className="px-4 py-5 align-top sm:px-6">
                        <span
                          className={[
                            "inline-flex rounded-[14px] px-4 py-2 text-[0.95rem] font-semibold",
                            typeBadgeClasses[article.type],
                          ].join(" ")}
                        >
                          {article.type}
                        </span>
                      </td>

                      <td className="px-4 py-5 align-top sm:px-6">
                        <div className="flex max-w-[300px] flex-wrap gap-2">
                          {article.categories.map((category) => (
                            <span
                              key={category}
                              className="inline-flex rounded-[14px] border border-[#dbe2ec] bg-[#f8fafc] px-3 py-1.5 text-[0.95rem] font-medium text-[#526178]"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-5 align-top text-[1rem] text-[#4b5563] sm:px-6">
                        {article.createdDate}
                      </td>

                      <td className="px-4 py-5 align-top sm:px-6">
                        <span
                          className={[
                            "inline-flex rounded-[14px] px-4 py-2 text-[0.95rem] font-semibold",
                            statusBadgeClasses[article.status],
                          ].join(" ")}
                        >
                          {article.status}
                        </span>
                      </td>

                      <td className="px-4 py-5 align-top sm:px-6">
                        <div className="flex items-center gap-5 text-[#111827]">
                          <button
                            type="button"
                            onClick={() => handleOpenView(article)}
                            className="transition hover:text-[#f07c61]"
                          >
                            <IconEye className="h-6 w-6" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(article)}
                            className="transition hover:text-[#f07c61]"
                          >
                            <IconPencil className="h-6 w-6" />
                          </button>

                          <button
                            type="button"
                            className="cursor-not-allowed opacity-50"
                          >
                            <IconTrash className="h-6 w-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center text-[1.05rem] text-[#6b7280]"
                    >
                      No articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-[16px] border border-[#e6eaf0] bg-white text-[#6b7280] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
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
                  "inline-flex h-[54px] w-[54px] items-center justify-center rounded-[16px] text-[1.15rem] font-semibold transition",
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
            className="inline-flex h-[54px] w-[54px] items-center justify-center rounded-[16px] border border-[#e6eaf0] bg-white text-[#6b7280] transition hover:bg-[#f8fafc] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <IconChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <AddArticleModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSaved={handleArticleSaved}
        mode={modalMode}
        initialArticle={selectedArticle}
      />
    </>
  );
}
