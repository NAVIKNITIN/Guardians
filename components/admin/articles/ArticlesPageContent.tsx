"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { IconFolderStack, IconPlus } from "@/components/admin/panel/AdminIcons";
import Link from "next/link";
import {
  createArticle,
  getAllArticles,
  updateArticle,
} from "@/src/api/services/articleService";
import { uploadFile } from "@/src/api/services/fileService";
const hiddenScrollbarClass =
  "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";
const BUTTON_PRIMARY_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-[14px] text-[0.96rem] font-semibold text-white btn-primary-gradient shadow-[0_14px_24px_rgba(240,150,132,0.22)]";
const BUTTON_OUTLINE_CLASS =
  "inline-flex cursor-pointer items-center justify-center rounded-[16px] border border-[#f09684] px-6 text-[1rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]";

type IconProps = {
  className?: string;
};

type ArticleType = "NEWS" | "BLOG" | "MAGAZINE" | "GAZETTE";
type ArticleStatus = "Published" | "Draft";
type ModalMode = "create" | "view" | "edit";

type ArticleApiItem = {
  id: number;
  title: string;
  type: string;
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

const ARTICLE_TYPE_OPTIONS = [
  "NEWS",
  "BLOG",
  "MAGAZINE",
  "GAZETTE",
] as const;
const ARTICLE_CATEGORY_OPTIONS = [
  "Real Estate",
  "Market Trends",
  "Investment",
  "Architecture",
  "Interior Design",
  "Technology",
  "Sustainability",
  "Home Buying",
] as const;

const typeBadgeClasses: Record<ArticleType, string> = {
  NEWS: "bg-[#dceaff] text-[#2563eb]",
  BLOG: "bg-[#f2e4ff] text-[#8b24ff]",
  MAGAZINE: "bg-[#fff3d6] text-[#b7791f]",
  GAZETTE: "bg-[#d7f3ef] text-[#0f766e]",
};

const statusBadgeClasses: Record<ArticleStatus, string> = {
  Published: "bg-[#ddf9e8] text-[#049647]",
  Draft: "bg-[#fff2b8] text-[#c68300]",
};

const ITEMS_PER_PAGE = 10;

function formatCreatedDate(value: string) {
  if (!value) return "";
  return value.slice(0, 10);
}

function mapArticle(item: ArticleApiItem): ArticleRow {
  const normalizedType =
    String(item.type).toUpperCase() === "BLOGS" ? "BLOG" : String(item.type).toUpperCase();

  return {
    id: item.id,
    title: item.title,
    type: (normalizedType as ArticleType),
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
      <span className="text-[1.02rem] font-medium text-[#46536d]">
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
      className="h-[58px] w-full rounded-[16px] border border-[#e0e4eb] bg-white px-5 text-[1rem] text-[#44506a] outline-none transition placeholder:text-[#a3acbb] focus:border-[#f09684] read-only:cursor-default"
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
      className="w-full rounded-[16px] border border-[#e0e4eb] bg-white px-5 py-4 text-[1rem] text-[#44506a] outline-none transition placeholder:text-[#a3acbb] focus:border-[#f09684] read-only:cursor-default"
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
        className="h-[58px] w-full appearance-none rounded-[16px] border border-[#e0e4eb] bg-white px-5 pr-12 text-[1rem] text-[#44506a] outline-none transition focus:border-[#f09684] disabled:cursor-not-allowed disabled:opacity-70"
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
      <p className="text-[1.02rem] font-medium text-[#46536d]">{label}</p>
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
        className="h-[58px] w-full appearance-none rounded-[16px] border border-[#e0e4eb] bg-white px-5 pr-12 text-[1rem] text-[#44506a] outline-none transition focus:border-[#f09684]"
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

export function AddArticleModal({
  open,
  onClose,
  onSaved,
  mode,
  initialArticle,
  inline = false,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void | Promise<void>;
  mode: ModalMode;
  initialArticle: ArticleRow | null;
  inline?: boolean;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Select article type");
  const [fileValue, setFileValue] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [categoryInput, setCategoryInput] = useState<string>(
    ARTICLE_CATEGORY_OPTIONS[0],
  );
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
    setCategoryInput(ARTICLE_CATEGORY_OPTIONS[0]);
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
      setCategoryInput(ARTICLE_CATEGORY_OPTIONS[0]);
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

    setCategoryInput(ARTICLE_CATEGORY_OPTIONS[0]);
  }

  function removeCategory(categoryToRemove: string) {
    if (isViewMode) return;
    setCategories((current) =>
      current.filter((item) => item !== categoryToRemove),
    );
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

      const result = (await uploadFile(formData)) as FileUploadResponse;

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

    if (!ARTICLE_TYPE_OPTIONS.includes(type as (typeof ARTICLE_TYPE_OPTIONS)[number])) {
      setErrorMessage("Please select article type.");
      return;
    }

    const trimmedFileValue = fileValue.trim();
    const normalizedFileId = trimmedFileValue ? Number(trimmedFileValue) : null;

    if (trimmedFileValue && Number.isNaN(normalizedFileId)) {
      setErrorMessage("File ID must be a number.");
      return;
    }

    if (!trimmedFileValue || normalizedFileId == null) {
      setErrorMessage("Image upload is required.");
      return;
    }

    if (categories.length === 0) {
      setErrorMessage("Please add at least one category.");
      return;
    }

    try {
      setIsSubmitting(true);

      const basePayload = {
        type: type === "BLOG" ? "BLOG" : type,
        title: title.trim(),
        description: message.length > 0 ? message : null,
        file_id: normalizedFileId,
        categories,
      };
      const payload =
        isEditMode && initialArticle
          ? {
            ...basePayload,
            active: initialArticle.status === "Published",
          }
          : basePayload;

      const result = (isEditMode && initialArticle
        ? await updateArticle(initialArticle.id, payload)
        : await createArticle(payload)) as ArticleMutationResponse;

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

  if (!open && !inline) return null;

  const content = (
    <div
      className={`${inline ? "w-full rounded-[30px] border border-[#e7e4df] bg-white p-4 shadow-[0_8px_18px_rgba(22,20,19,0.06)] sm:p-6" : `my-6 max-h-[calc(100vh-2rem)] w-full max-w-[900px] overflow-y-auto rounded-[30px] border border-[#e7e4df] bg-white p-4 shadow-[0_8px_18px_rgba(22,20,19,0.06)] sm:p-6 ${hiddenScrollbarClass}`}`}>

      {!inline ? (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#606776] transition hover:bg-[#f5f7fb]"
          >
            <IconXMark className="h-6 w-6" />
          </button>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
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
            options={["Select article type", ...ARTICLE_TYPE_OPTIONS]}
            disabled={isViewMode}
          />
        </InputShell>

        <InputShell label="Upload">
          {isViewMode ? (
            <TextInput
              placeholder="No image uploaded"
              value={selectedFileName || fileValue}
              onChange={() => { }}
              readOnly
            />
          ) : (
            <div className="space-y-3">
              <label className="flex h-[58px] cursor-pointer items-center justify-between rounded-[16px] border border-[#e0e4eb] bg-white px-5 text-[1rem] text-[#44506a] transition hover:border-[#f09684]">
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
              <SelectField
                value={categoryInput}
                onChange={setCategoryInput}
                options={[...ARTICLE_CATEGORY_OPTIONS]}
              />

              <button
                type="button"
                onClick={addCategory}
                className={`${BUTTON_OUTLINE_CLASS} h-[46px] px-6 text-[0.95rem]`}
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
                  className="inline-flex items-center gap-2 rounded-full border border-[#dbe2ec] bg-[#f8fafc] px-3 py-2 text-sm font-medium text-[#526178]"
                >
                  {category}
                  {!isViewMode ? (
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#7a8497] transition hover:bg-[#e9eef6] hover:text-[#374151]"
                      aria-label={`Remove category ${category}`}
                    >
                      <IconXMark className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
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
              className={`${BUTTON_OUTLINE_CLASS} h-[46px] px-6 text-[0.95rem] disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {isViewMode ? "Close" : "Cancel"}
            </button>

            {!isViewMode ? (
              <button
                type="submit"
                disabled={isSubmitting || isUploadingFile}
                className={`${BUTTON_PRIMARY_CLASS} h-[46px] px-6 text-[0.95rem] disabled:cursor-not-allowed disabled:opacity-70`}
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
  );

  if (inline) {
    return content;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0f172a]/35 p-4 backdrop-blur-[3px] sm:items-center ${hiddenScrollbarClass}`}
    >
      {content}
    </div>
  );
}

export function ArticlesPageContent() {
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

        const result = (await getAllArticles({
          per_page: ITEMS_PER_PAGE,
          page: currentPage,
        })) as ArticleListResponse;

        if (!isMounted) return;
        const filteredItems = result.data.data.filter((item) => {
          const typeMatch =
            appliedTypeFilter === "All Types" || item.type === appliedTypeFilter;
          const yearMatch =
            appliedYearFilter === "All Years" ||
            formatCreatedDate(item.created_at).startsWith(appliedYearFilter);
          return typeMatch && yearMatch;
        });

        setArticles(filteredItems.map(mapArticle));
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

  function goToPage(page: number) {
    if (page < 1 || page > lastPage) return;
    setCurrentPage(page);
  }

  return (
    <>
      <section className="w-full space-y-5">
        <ScrollReveal direction="up" distance={24}>
          <div className="rounded-[22px] border border-[#e7e4df] bg-white p-2.5 shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[#fff3ed] text-[#f07c61]">
                  <IconFolderStack className="h-6 w-6" />
                </div>
                <h2 className="qs-reg text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none text-[#0d1e46]">
                  All Articles
                </h2>
              </div>
              <Link href="/admin/add-article" className={`${BUTTON_PRIMARY_CLASS} h-[50px] px-6`}>
                <IconPlus className="h-5 w-5" />
                <span>Add Article</span>
              </Link>
            </div>

            <div className="mt-3 grid gap-3 border-t border-[#ebeef3] pt-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
              <FilterField label="Type">
                <FilterSelect
                  value={draftTypeFilter}
                  onChange={setDraftTypeFilter}
                  options={["All Types", ...ARTICLE_TYPE_OPTIONS]}
                />
              </FilterField>

              <FilterField label="Year">
                <FilterSelect
                  value={draftYearFilter}
                  onChange={setDraftYearFilter}
                  options={["All Years", "2026", "2025", "2024"]}
                />
              </FilterField>

              <button
                type="button"
                onClick={handleApplyFilter}
                className={`${BUTTON_PRIMARY_CLASS} h-[50px] px-6 sm:mb-px`}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </ScrollReveal>

        {errorMessage ? (
          <div className="rounded-[20px] border border-[#f3d3cb] bg-[#fff6f3] px-5 py-4 text-[1rem] font-medium text-[#c25b45]">
            {errorMessage}
          </div>
        ) : null}

        <ScrollReveal direction="up" delay={0.08} distance={20}>
          <section className="overflow-hidden rounded-[30px] border border-[#e7e4df] bg-white shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1120px]">
                <thead className="border-b border-[#e9edf3] bg-white">
                  <tr className="text-left">
                    <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">
                      ID
                    </th>
                    <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">
                      Title
                    </th>
                    <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">
                      Type
                    </th>
                    <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">
                      Categories
                    </th>
                    <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">
                      Created Date
                    </th>
                    <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">
                      Status
                    </th>
                    <th className="px-4 py-4 text-[0.95rem] font-semibold text-[#111827] sm:px-5">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-14 text-center text-[1.05rem] text-[#6b7280]"
                      >
                        Loading articles...
                      </td>
                    </tr>
                  ) : articles.length > 0 ? (
                    articles.map((article) => (
                      <tr
                        key={article.id}
                        className="border-b border-[#eef2f6] transition-colors hover:bg-[#f8fafc] last:border-b-0"
                      >
                        <td className="px-4 py-4 align-top text-[0.9rem] font-medium text-[#4b5563] sm:px-5">
                          {article.id}
                        </td>
                        <td className="px-4 py-4 align-top text-[0.94rem] font-semibold text-[#161b22] sm:px-5">
                          {article.title}
                        </td>

                        <td className="px-4 py-4 align-top sm:px-5">
                          <span
                            className={[
                              "inline-flex rounded-[12px] px-3 py-1.5 text-[0.86rem] font-semibold",
                              typeBadgeClasses[article.type],
                            ].join(" ")}
                          >
                            {article.type}
                          </span>
                        </td>

                        <td className="px-4 py-4 align-top sm:px-5">
                          <div className="flex max-w-[300px] flex-wrap gap-2">
                            {article.categories.map((category) => (
                              <span
                                key={category}
                                className="inline-flex rounded-[12px] border border-[#dbe2ec] bg-[#f8fafc] px-2.5 py-1 text-[0.82rem] font-medium text-[#526178]"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-4 py-4 align-top text-[0.9rem] text-[#4b5563] sm:px-5">
                          {article.createdDate}
                        </td>

                        <td className="px-4 py-4 align-top sm:px-5">
                          <span
                            className={[
                              "inline-flex rounded-[12px] px-3 py-1.5 text-[0.86rem] font-semibold",
                              statusBadgeClasses[article.status],
                            ].join(" ")}
                          >
                            {article.status}
                          </span>
                        </td>

                        <td className="px-4 py-4 align-top sm:px-5">
                          <div className="flex items-center gap-4 text-[#111827]">
                            <Link
                              href={`/admin/articles/${article.id}/view`}
                              className="transition hover:text-[#f07c61]"
                            >
                              <IconEye className="h-6 w-6" />
                            </Link>

                            <Link
                              href={`/admin/articles/${article.id}/edit`}
                              className="transition hover:text-[#f07c61]"
                            >
                              <IconPencil className="h-6 w-6" />
                            </Link>

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
                        colSpan={7}
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
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.12} className="flex items-center justify-center gap-2.5">
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
                  "inline-flex h-[48px] w-[48px] items-center justify-center rounded-[14px] text-[1rem] font-semibold transition",
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

    </>
  );
}
