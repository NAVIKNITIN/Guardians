"use client";

import { FileUploadField } from "@/components/common/FileUploadField";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent, ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  uploadFile as uploadFileRequest,
} from "@/src/api/services/fileService";
import {
  createProject,
  getProjectById,
  updateProject,
} from "@/src/api/services/projectService";
import {
  IconCheckSeal,
  IconImageSquare,
  IconInfoCircle,
  IconPlus,
  IconRoute,
  IconSparkles,
  IconUpload,
} from "@/components/admin/panel/AdminIcons";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  AMENITY_CATALOG,
  catalogKeysFromProjectAmenities,
} from "@/lib/admin/amenityCatalog";
import { cn } from "@/utils/cn";
import {
  ALLOWED_UPLOAD_IMAGE_ACCEPT,
  getUploadErrorMessage,
  MAX_UPLOAD_FILE_BYTES,
  formatMaxUploadSizeMb,
  validateUploadImageFile,
} from "@/src/utils/uploadErrorMessage";

type FormState = {
  projectName: string;
  reraNumber: string;
  /** Maps to API `type` (builder filter on marketing listings). */
  builderName: string;
  logoFileName: string;
  heroImageName: string;
  areaSqft: string;
  description: string;
  /** `YYYY-MM` for `<input type="month" />`; sent to API as `YYYY-MM-01`. */
  completionDate: string;
  caseStudyInfo: string;
  /** Project completion flag sent as API `isCompleted`. */
  isCompleted: boolean;
};

type ConfigurationSection = {
  id: number;
  location: string;
  bhkType: string;
  priceMin: string;
  priceMax: string;
  active: boolean;
  status: string | null;
};

type LocationConnectivitySection = {
  id: number;
  fullAddress: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
  pincode: string;
  place: string;
  walkingTime: string;
  drivingTime: string;
};

type UploadedFile = {
  id: number;
  file_url: string;
  file_name: string;
  file_type: string;
  sequence_no: number | null;
};

type ProjectConfiguration = {
  id: number;
  location?: string | null;
  bhk_type: string;
  price_min: number | string | null;
  price_max: number | string | null;
  active?: boolean | null;
  status?: string | null;
};

type ProjectConfigurationPayload = {
  id?: number;
  bhk_type: string;
  price_min: number;
  price_max: number;
  location: string | null;
  active?: boolean;
  status?: string | null;
};

type ProjectLocation = {
  id: number;
  place_name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  /** API may expose either `pincode` or `pin_code` (Laravel). */
  pincode?: string | null;
  pin_code?: string | null;
  latitude: string | number | null;
  longitude: string | number | null;
  walking_time: string | null;
  driving_time: string | null;
};

type ProjectAmenity = {
  id: number;
  name: string;
  amenities_image_id: number | null;
};

type ProjectDetails = {
  id: number;
  name: string;
  status?: boolean;
  isCompleted?: boolean;
  type: string | null;
  rera_number: string | null;
  area: string | null;
  description?: string | null;
  completion_date?: string | null;
  case_study_info?: string | null;
  files: UploadedFile[];
  configurations: ProjectConfiguration[];
  locations: ProjectLocation[];
  amenities: ProjectAmenity[];
};

type ProjectDetailsResponse = {
  success: boolean;
  data: ProjectDetails;
};

type SingleFileUploadResponse = {
  success: boolean;
  message: string;
  data: UploadedFile;
};

type ProjectMutationResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
  };
};

type GallerySlot = {
  fileId: number | null;
  fileName: string;
};

type ExistingProjectFiles = {
  logoId: number | null;
  heroId: number | null;
  gallerySlots: GallerySlot[];
};

/** Gallery SEQUENCE files — exactly this many required on create/update. */
const REQUIRED_GALLERY_IMAGES = 6;

function createEmptyGallerySlots(): GallerySlot[] {
  return Array.from({ length: REQUIRED_GALLERY_IMAGES }, () => ({
    fileId: null,
    fileName: "",
  }));
}

function gallerySlotsFromApiFiles(files: UploadedFile[]): GallerySlot[] {
  const slots = createEmptyGallerySlots();
  const sequenceFiles = files
    .filter((file) => file.file_type === "SEQUENCE")
    .sort((first, second) => {
      const firstSeq = first.sequence_no ?? 0;
      const secondSeq = second.sequence_no ?? 0;
      return firstSeq - secondSeq;
    });

  for (const file of sequenceFiles) {
    const seqIndex = (file.sequence_no ?? 0) - 1;
    let targetIndex = seqIndex;
    if (targetIndex < 0 || targetIndex >= REQUIRED_GALLERY_IMAGES) {
      targetIndex = slots.findIndex((slot) => slot.fileId == null);
    }
    if (targetIndex < 0 || targetIndex >= REQUIRED_GALLERY_IMAGES) {
      continue;
    }
    if (slots[targetIndex]?.fileId != null) {
      targetIndex = slots.findIndex((slot) => slot.fileId == null);
    }
    if (targetIndex < 0) continue;

    slots[targetIndex] = {
      fileId: file.id,
      fileName: file.file_name ?? "",
    };
  }

  return slots;
}

function filledGalleryCount(slots: GallerySlot[]) {
  return slots.filter((slot) => slot.fileId != null).length;
}

function galleryIdsFromSlots(slots: GallerySlot[]) {
  return slots
    .map((slot) => slot.fileId)
    .filter((id): id is number => id != null);
}

const BUTTON_PRIMARY_CLASS =
  "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-[14px] text-[0.96rem] font-semibold text-white btn-primary-gradient shadow-[0_14px_24px_rgba(240,150,132,0.22)]";

const BUTTON_OUTLINE_CLASS =
  "inline-flex cursor-pointer items-center justify-center rounded-[16px] border border-[#f09684] px-6 text-[1rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]";

function createLocalId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

/** Stable row id: API ids must match `item.id` for updates; avoid string/number `===` misses. */
function toSectionId(raw: string | number | undefined) {
  const n = Number(raw);
  if (Number.isFinite(n) && n > 0) {
    return n;
  }
  return createLocalId();
}

function createEmptyLocationSection(
  id = createLocalId(),
): LocationConnectivitySection {
  return {
    id,
    fullAddress: "",
    latitude: "",
    longitude: "",
    city: "",
    state: "",
    pincode: "", // field disabled in UI; kept for section shape
    place: "",
    walkingTime: "",
    drivingTime: "",
  };
}

/** True for API primary keys (e.g. 165); false for client `createLocalId()` timestamps. */
function isPersistedApiId(id: number | string | undefined) {
  const n = Number(id);
  return Number.isFinite(n) && n > 0 && n < 1_000_000_000;
}

function configurationLocationFromApi(configuration: ProjectConfiguration) {
  return trimSectionValue(configuration.location);
}

function configurationSectionHasData(section: ConfigurationSection) {
  return Boolean(section.location.trim() || section.bhkType.trim());
}

function buildConfigurationApiPayload(
  section: ConfigurationSection,
): ProjectConfigurationPayload | null {
  if (!configurationSectionHasData(section)) {
    return null;
  }

  const locationText = section.location.trim();

  const row: ProjectConfigurationPayload = {
    bhk_type: section.bhkType.trim() || "—",
    price_min: parsePrice(section.priceMin) || 0,
    price_max: parsePrice(section.priceMax) || 0,
    location: locationText.length > 0 ? locationText : null,
    active: section.active,
    status: section.status,
  };

  if (isPersistedApiId(section.id)) {
    row.id = Number(section.id);
  }

  return row;
}

function createEmptyConfigurationSection(id = createLocalId()): ConfigurationSection {
  return {
    id,
    location: "",
    bhkType: "",
    priceMin: "",
    priceMax: "",
    active: true,
    status: null,
  };
}

function parsePrice(value: string) {
  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function parseInteger(value: string) {
  const normalized = value.replace(/[^0-9]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Positive integer for optional API fields; omit nulls instead of sending 0 when empty. */
function parseOptionalPositiveInt(raw: string): number | null {
  const t = raw.trim();
  if (!t) return null;
  const n = parseInt(t.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Non‑negative decimal for carpet/built‑up area etc. */
function parseOptionalNonNegativeFloat(raw: string): number | null {
  const t = raw.trim();
  if (!t) return null;
  const n = parseFloat(t.replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/** Leading numeric token from strings like `1200 sqft` for `<input type="number">`. */
function stripLeadingNumeric(raw: string | null | undefined): string {
  const s = String(raw ?? "").trim();
  const m = s.match(/^[\d.,]+/);
  return m ? m[0].replace(/,/g, "") : "";
}

function toTextValue(value: string | number | null | undefined) {
  return value == null ? "" : String(value);
}

/**
 * Laravel often uses `ConvertEmptyStringsToNull`: JSON `""` becomes `null` before
 * validation, so `string` rules fail with "must be a string". Sending a single
 * space keeps a real string through the pipeline; we trim on load so the form
 * still shows empty fields after update/prepopulate.
 */
function toLaravelLocationString(value: string | null | undefined): string {
  const t = String(value ?? "").trim();
  return t.length > 0 ? t : " ";
}

function trimSectionValue(value: string | number | null | undefined) {
  return toTextValue(value).trim();
}

/** `YYYY-MM` for `<input type="month" />` from API string or ISO. */
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

/** API `completion_date` from month picker value (`YYYY-MM` → `YYYY-MM-01`). */
function completionDateForApi(monthValue: string): string | null {
  const trimmed = monthValue.trim();
  if (!trimmed) return null;
  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    return `${trimmed}-01`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed.slice(0, 7) + "-01";
  }
  return trimmed;
}

/**
 * Compare `YYYY-MM` to the current calendar month.
 * @returns negative if past, positive if future, 0 if same month, null if invalid/empty.
 */
function compareCompletionMonthToToday(
  monthValue: string,
  now = new Date(),
): number | null {
  const match = /^(\d{4})-(\d{2})$/.exec(monthValue.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return null;
  }

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year !== currentYear) {
    return year - currentYear;
  }
  return month - currentMonth;
}

/**
 * Completed when “Project completed in” is before the current month/year.
 * Ongoing when it is the same month or in the future.
 */
function isCompletedFromCompletionMonth(monthValue: string): boolean {
  const comparison = compareCompletionMonthToToday(monthValue);
  if (comparison == null) {
    return false;
  }
  return comparison < 0;
}

function projectStatusLabelFromCompletionMonth(monthValue: string): string {
  if (!monthValue.trim()) {
    return "Set a completion month to classify the project.";
  }
  return isCompletedFromCompletionMonth(monthValue)
    ? "Completed project"
    : "Ongoing project";
}

function mapProjectLocationsToSections(
  locations: ProjectLocation[],
): LocationConnectivitySection[] {
  if (locations.length === 0) {
    return [createEmptyLocationSection()];
  }

  return locations.map((location) => ({
    id: toSectionId(location.id),
    fullAddress: trimSectionValue(location.address),
    latitude: trimSectionValue(location.latitude),
    longitude: trimSectionValue(location.longitude),
    city: trimSectionValue(location.city),
    state: trimSectionValue(location.state),
    // Pincode disabled in admin UI — not loaded into form when editing.
    // pincode: trimSectionValue(location.pincode ?? location.pin_code),
    pincode: "",
    // Always map API `place_name` to the "Place / Landmark" field (was dropped when
    // place_name === city and no walk/drive times, which killed round-trips to the API).
    place: trimSectionValue(location.place_name),
    walkingTime: trimSectionValue(location.walking_time),
    drivingTime: trimSectionValue(location.driving_time),
  }));
}

function mapProjectConfiguration(
  configurations: ProjectConfiguration[],
): ConfigurationSection {
  const configuration = configurations[0];
  if (!configuration) {
    return createEmptyConfigurationSection();
  }

  return {
    id: toSectionId(configuration.id),
    location: configurationLocationFromApi(configuration),
    bhkType: trimSectionValue(configuration.bhk_type),
    priceMin: trimSectionValue(configuration.price_min),
    priceMax: trimSectionValue(configuration.price_max),
    active: configuration.active !== false,
    status:
      configuration.status == null || configuration.status === ""
        ? null
        : String(configuration.status).trim(),
  };
}

function SectionCard({
  icon,
  title,
  children,
  titleClassName,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  /** Override default `qs-reg` (e.g. `font-nexa font-bold` for Location & Connectivity). */
  titleClassName?: string;
}) {
  return (
    <motion.section
      className="rounded-[30px] border border-[#e7e4df] bg-white shadow-[0_8px_18px_rgba(22,20,19,0.06)]"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -1 }}
    >
      <div className="flex min-w-0 items-center gap-4 border-b border-[#efede9] p-2 md:p-4">
        <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-[18px] bg-[#fff3ed] text-[#f07c61]">
          {icon}
        </div>

        <h2
          className={cn(
            "min-w-0 text-[clamp(1.5rem,3vw,3.15rem)] leading-tight text-[#081a43] sm:leading-none",
            titleClassName ?? "n-reg",
          )}
        >
          {title}
        </h2>
      </div>

      <div className="space-y-6 px-2 py-2 md:px-4 md:py-4">{children}</div>
    </motion.section>
  );
}

const FIELD_LABEL_CLASS =
  "block text-[1rem] font-semibold leading-snug text-[#33425e] md:text-[1.05rem]";

const TABLE_INPUT_CLASS =
  "h-[52px] rounded-[14px] px-4 text-[0.98rem] md:h-[54px] md:px-5";

function FormField({
  label,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className={FIELD_LABEL_CLASS}>
        {label}
      </label>
      {children}
      {hint ? (
        <p className="text-[0.88rem] leading-relaxed text-[#657188]">{hint}</p>
      ) : null}
    </div>
  );
}

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
} & Omit<
  ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "className"
>;

function TextInput({
  value,
  onChange,
  className,
  type = "text",
  ...rest
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={[
        "h-[74px] w-full rounded-[20px] border border-[#e0e4eb] bg-white px-7 text-[1.15rem] text-[#44506a] outline-none transition focus:border-[#f09684]",
        className ?? "",
      ].join(" ")}
      {...rest}
    />
  );
}

function TextArea({
  value,
  onChange,
  className,
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}) {
  return (
    <textarea
      id={id}
      rows={4}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={[
        "w-full rounded-[20px] border border-[#e0e4eb] bg-white px-7 py-6 text-[1.15rem] text-[#44506a] outline-none transition focus:border-[#f09684]",
        className ?? "",
      ].join(" ")}
    />
  );
}

function AddItemButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${BUTTON_PRIMARY_CLASS} h-[50px] px-6`}
    >
      <IconPlus className="h-5 w-5" />
      {label}
    </button>
  );
}

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function truncateFileName(name: string, maxLength = 42) {
  const trimmed = name.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const extMatch = trimmed.match(/(\.[a-z0-9]+)$/i);
  const ext = extMatch?.[1] ?? "";
  const baseMax = Math.max(maxLength - ext.length - 1, 8);
  return `${trimmed.slice(0, baseMax)}…${ext}`;
}

export function AddProjectWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const isEditMode = Boolean(projectId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(isEditMode);
  const [errorMessage, setErrorMessage] = useState("");
  const [bannerUploadError, setBannerUploadError] = useState<string | null>(
    null,
  );
  const [logoUploadError, setLogoUploadError] = useState<string | null>(null);
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(
    null,
  );

  /** Per-slot upload state for gallery images 1–6. */
  const [gallerySlotUploading, setGallerySlotUploading] = useState<boolean[]>(
    () => Array.from({ length: REQUIRED_GALLERY_IMAGES }, () => false),
  );

  /** Set when an immediate file upload (logo/hero/gallery) is in progress. */
  const [fileUploading, setFileUploading] = useState<{
    logo: boolean;
    hero: boolean;
  }>({
    logo: false,
    hero: false,
  });

  const isAnyFileUploading =
    fileUploading.logo ||
    fileUploading.hero ||
    gallerySlotUploading.some(Boolean);

  const [existingProjectFiles, setExistingProjectFiles] =
    useState<ExistingProjectFiles>({
      logoId: null,
      heroId: null,
      gallerySlots: createEmptyGallerySlots(),
    });

  const [form, setForm] = useState<FormState>({
    projectName: "",
    reraNumber: "",
    builderName: "",
    logoFileName: "",
    heroImageName: "",
    areaSqft: "",
    description: "",
    completionDate: "",
    caseStudyInfo: "",
    isCompleted: false,
  });

  const [selectedAmenityKeys, setSelectedAmenityKeys] = useState<string[]>([]);
  const [configuration, setConfiguration] = useState<ConfigurationSection>(
    createEmptyConfigurationSection(),
  );

  const [locationSections, setLocationSections] = useState<
    LocationConnectivitySection[]
  >([createEmptyLocationSection()]);

  /** Bumps each time the load effect re-runs so stale async work never applies state. */
  const projectLoadTokenRef = useRef(0);

  function setGallerySlotUploadingAt(slotIndex: number, uploading: boolean) {
    setGallerySlotUploading((current) => {
      const next = [...current];
      next[slotIndex] = uploading;
      return next;
    });
  }

  useEffect(() => {
    if (!projectId) {
      setIsLoadingProject(false);
      return;
    }

    const loadToken = ++projectLoadTokenRef.current;

    async function loadProject() {
      try {
        setIsLoadingProject(true);
        setErrorMessage("");

        const result = (await getProjectById(
          projectId!,
        )) as ProjectDetailsResponse;

        if (loadToken !== projectLoadTokenRef.current) {
          return;
        }

        if (!result.success) {
          throw new Error("Failed to load project details.");
        }

        const project = result.data;
        const logoFile = project.files.find((file) => file.file_type === "LOGO");
        const heroFile = project.files.find((file) => file.file_type === "HERO");
        setExistingProjectFiles({
          logoId: logoFile?.id ?? null,
          heroId: heroFile?.id ?? null,
          gallerySlots: gallerySlotsFromApiFiles(project.files),
        });

        setForm({
          projectName: project.name ?? "",
          reraNumber: project.rera_number ?? "",
          builderName: project.type ?? "",
          logoFileName: logoFile?.file_name ?? "",
          heroImageName: heroFile?.file_name ?? "",
          areaSqft: stripLeadingNumeric(project.area),
          description: project.description ?? "",
          completionDate: toInputMonthValue(project.completion_date),
          caseStudyInfo: project.case_study_info ?? "",
          isCompleted: isCompletedFromCompletionMonth(
            toInputMonthValue(project.completion_date),
          ),
        });

        setConfiguration(mapProjectConfiguration(project.configurations));

        const mappedLocationSections = mapProjectLocationsToSections(
          project.locations,
        );

        setLocationSections(mappedLocationSections);

        setSelectedAmenityKeys(
          project.amenities.length > 0
            ? catalogKeysFromProjectAmenities(project.amenities)
            : [],
        );
      } catch (error) {
        if (loadToken !== projectLoadTokenRef.current) {
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        if (loadToken === projectLoadTokenRef.current) {
          setIsLoadingProject(false);
        }
      }
    }

    loadProject();

    return () => {
      projectLoadTokenRef.current += 1;
    };
  }, [projectId]);

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function updateCompletionDate(monthValue: string) {
    setForm((current) => ({
      ...current,
      completionDate: monthValue,
      isCompleted: isCompletedFromCompletionMonth(monthValue),
    }));
  }

  function updateLocationSection<
    Key extends keyof Omit<LocationConnectivitySection, "id">,
  >(id: number, key: Key, value: LocationConnectivitySection[Key]) {
    const rowId = Number(id);
    setLocationSections((current) =>
      current.map((item) =>
        Number(item.id) === rowId ? { ...item, [key]: value } : item,
      ),
    );
  }

  function addLocationSection() {
    setLocationSections((current) => [...current, createEmptyLocationSection()]);
  }

  function updateConfigurationField<
    Key extends keyof Omit<ConfigurationSection, "id">,
  >(key: Key, value: ConfigurationSection[Key]) {
    setConfiguration((current) => ({ ...current, [key]: value }));
  }

  function removeLocationSection(id: number) {
    const rowId = Number(id);
    setLocationSections((current) => {
      if (current.length <= 1) return current;
      return current.filter((item) => Number(item.id) !== rowId);
    });
  }

  async function uploadProjectImageFile(
    file: File,
    fileType: "LOGO" | "HERO" | "SEQUENCE",
    sequenceNo?: number,
  ): Promise<number> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_type", fileType);
    if (fileType === "SEQUENCE" && sequenceNo != null) {
      formData.append("sequence_no", String(sequenceNo));
    }

    const result = (await uploadFileRequest(
      formData,
    )) as SingleFileUploadResponse;

    if (!result.success) {
      throw new Error(
        result.message?.trim() ||
          `Failed to upload ${fileType.toLowerCase()} file.`,
      );
    }

    return result.data.id;
  }

  function removeLogoImage() {
    setForm((current) => ({ ...current, logoFileName: "" }));
    setExistingProjectFiles((current) => ({ ...current, logoId: null }));
    setLogoUploadError(null);
  }

  async function handleLogoFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    const input = event.target;

    if (!file) {
      input.value = "";
      return;
    }

    const validationError = validateUploadImageFile(file, MAX_UPLOAD_FILE_BYTES);
    if (validationError) {
      setLogoUploadError(validationError);
      input.value = "";
      return;
    }

    setFileUploading((current) => ({ ...current, logo: true }));
    setLogoUploadError(null);
    setErrorMessage("");

    try {
      const id = await uploadProjectImageFile(file, "LOGO");
      setForm((current) => ({ ...current, logoFileName: file.name }));
      setExistingProjectFiles((current) => ({ ...current, logoId: id }));
    } catch (error) {
      setLogoUploadError(
        getUploadErrorMessage(error, "Logo upload failed."),
      );
    } finally {
      setFileUploading((current) => ({ ...current, logo: false }));
      input.value = "";
    }
  }

  function removeBannerImage() {
    setForm((current) => ({ ...current, heroImageName: "" }));
    setExistingProjectFiles((current) => ({ ...current, heroId: null }));
    setBannerUploadError(null);
  }

  async function handleBannerFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    const input = event.target;

    if (!file) {
      input.value = "";
      return;
    }

    const validationError = validateUploadImageFile(file, MAX_UPLOAD_FILE_BYTES);
    if (validationError) {
      setBannerUploadError(validationError);
      input.value = "";
      return;
    }

    setFileUploading((current) => ({ ...current, hero: true }));
    setBannerUploadError(null);
    setErrorMessage("");

    try {
      const id = await uploadProjectImageFile(file, "HERO");
      setForm((current) => ({ ...current, heroImageName: file.name }));
      setExistingProjectFiles((current) => ({ ...current, heroId: id }));
    } catch (error) {
      setBannerUploadError(
        getUploadErrorMessage(error, "Banner image upload failed."),
      );
    } finally {
      setFileUploading((current) => ({ ...current, hero: false }));
      input.value = "";
    }
  }

  function removeGallerySlot(slotIndex: number) {
    setExistingProjectFiles((current) => {
      const gallerySlots = [...current.gallerySlots];
      gallerySlots[slotIndex] = { fileId: null, fileName: "" };
      return { ...current, gallerySlots };
    });
    setGalleryUploadError(null);
  }

  async function handleGallerySlotFile(
    slotIndex: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;
    const input = event.target;

    if (!file) {
      input.value = "";
      return;
    }

    const validationError = validateUploadImageFile(file, MAX_UPLOAD_FILE_BYTES);
    if (validationError) {
      setGalleryUploadError(`Image ${slotIndex + 1}: ${validationError}`);
      input.value = "";
      return;
    }

    setGallerySlotUploadingAt(slotIndex, true);
    setGalleryUploadError(null);
    setErrorMessage("");

    try {
      const id = await uploadProjectImageFile(file, "SEQUENCE", slotIndex + 1);
      setExistingProjectFiles((current) => {
        const gallerySlots = [...current.gallerySlots];
        gallerySlots[slotIndex] = { fileId: id, fileName: file.name };
        return { ...current, gallerySlots };
      });
    } catch (error) {
      setGalleryUploadError(
        getUploadErrorMessage(
          error,
          `Gallery image ${slotIndex + 1} upload failed.`,
        ),
      );
    } finally {
      setGallerySlotUploadingAt(slotIndex, false);
      input.value = "";
    }
  }

  function toggleAmenityKey(key: string) {
    setSelectedAmenityKeys((current) =>
      current.includes(key)
        ? current.filter((k) => k !== key)
        : [...current, key],
    );
  }

  function toggleAllAmenities() {
    setSelectedAmenityKeys((current) =>
      current.length === AMENITY_CATALOG.length
        ? []
        : AMENITY_CATALOG.map((item) => item.key),
    );
  }

  function getPreparedAmenities(): Array<{
    name: string;
    existingImageId: number;
  }> {
    const out: Array<{ name: string; existingImageId: number }> = [];
    for (const key of selectedAmenityKeys) {
      const c = AMENITY_CATALOG.find((x) => x.key === key);
      if (c) {
        out.push({ name: c.name, existingImageId: c.imageFileId });
      }
    }
    return out;
  }

  function buildProjectPayload(
    projectFileIds: number[],
    amenityPayload: Array<{ name: string; amenities_image_id: number }>,
  ) {
    const configurationRow = buildConfigurationApiPayload(configuration);
    const configurations = configurationRow ? [configurationRow] : [];

    const locations = locationSections
      .filter((section) =>
        Boolean(
          section.fullAddress.trim() ||
          section.latitude.trim() ||
          section.longitude.trim() ||
          section.city.trim() ||
          section.state.trim() ||
          // section.pincode.trim() ||
          section.place.trim() ||
          section.walkingTime.trim() ||
          section.drivingTime.trim(),
        ),
      )
      .map((section) => {
        // Pincode not collected in admin — omit from create/update payload.
        // const pinRaw = toLaravelLocationString(section.pincode);
        return {
          ...(isPersistedApiId(section.id) ? { id: Number(section.id) } : {}),
          place_name:
            section.place.trim() ||
            section.city.trim() ||
            form.projectName.trim() ||
            "Project Location",
          country: "India",
          city: toLaravelLocationString(section.city),
          state: toLaravelLocationString(section.state),
          address: toLaravelLocationString(section.fullAddress),
          // pincode: pinRaw,
          // pin_code: pinRaw,
          latitude: toLaravelLocationString(section.latitude),
          longitude: toLaravelLocationString(section.longitude),
          walking_time: toLaravelLocationString(section.walkingTime),
          driving_time: toLaravelLocationString(section.drivingTime),
        };
      });

    const isCompleted = isCompletedFromCompletionMonth(form.completionDate);

    return {
      name: form.projectName.trim(),
      type: form.builderName.trim() || null,
      rera_number: form.reraNumber.trim() || null,
      description: form.description.trim() || null,
      area:
        form.areaSqft.trim() === ""
          ? null
          : String(parseOptionalNonNegativeFloat(form.areaSqft) ?? form.areaSqft.trim()),
      completion_date: completionDateForApi(form.completionDate),
      case_study_info: form.caseStudyInfo.trim() || null,
      isCompleted,
      /** Marketing detail + admin list: `false` = completed / inactive. */
      status: !isCompleted,
      files: projectFileIds.map((file_id) => ({ file_id })),
      configurations,
      locations,
      amenities: amenityPayload,
    };
  }

  async function publishProject() {
    setErrorMessage("");

    const hasProjectName = Boolean(form.projectName.trim());
    if (!hasProjectName) {
      setErrorMessage("Project Name is required.");
      return;
    }

    const galleryCount = filledGalleryCount(existingProjectFiles.gallerySlots);
    if (galleryCount !== REQUIRED_GALLERY_IMAGES) {
      setErrorMessage(
        `Exactly ${REQUIRED_GALLERY_IMAGES} gallery images are required (currently ${galleryCount}).`,
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const preparedAmenities = getPreparedAmenities();
      const projectFileIds: number[] = [];

      if (existingProjectFiles.logoId) {
        projectFileIds.push(existingProjectFiles.logoId);
      }
      if (existingProjectFiles.heroId) {
        projectFileIds.push(existingProjectFiles.heroId);
      }
      const galleryIds = galleryIdsFromSlots(existingProjectFiles.gallerySlots);
      if (galleryIds.length > 0) {
        projectFileIds.push(...galleryIds);
      }

      const uploadedAmenities = preparedAmenities.map((amenity) => ({
        name: amenity.name.trim(),
        amenities_image_id: amenity.existingImageId!,
      }));

      const payload = buildProjectPayload(projectFileIds, uploadedAmenities);

      const result = (isEditMode
        ? await updateProject(projectId!, payload)
        : await createProject(payload)) as ProjectMutationResponse;

      if (!result.success) {
        throw new Error(
          isEditMode ? "Project update failed." : "Project creation failed.",
        );
      }

      router.push("/admin/projects");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit() {
    await publishProject();
  }

  const descriptionWordCount = countWords(form.description);
  const filledGalleryImages = filledGalleryCount(
    existingProjectFiles.gallerySlots,
  );
  const hasBannerImage = Boolean(existingProjectFiles.heroId);
  const hasLogoImage = Boolean(existingProjectFiles.logoId);
  const derivedProjectStatusLabel = projectStatusLabelFromCompletionMonth(
    form.completionDate,
  );
  const isDerivedCompletedProject = isCompletedFromCompletionMonth(
    form.completionDate,
  );
  const selectedAmenityCount = selectedAmenityKeys.length;
  const allAmenitiesSelected =
    selectedAmenityCount === AMENITY_CATALOG.length;
  const someAmenitiesSelected =
    selectedAmenityCount > 0 && !allAmenitiesSelected;
  const selectAllAmenitiesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllAmenitiesRef.current) {
      selectAllAmenitiesRef.current.indeterminate = someAmenitiesSelected;
    }
  }, [someAmenitiesSelected]);

  const projectDetailFields: Array<{
    key: "projectName" | "reraNumber" | "builderName" | "areaSqft";
    label: string;
    id: string;
    type?: ComponentProps<"input">["type"];
    hint?: string;
  }> = [
    { key: "projectName", label: "Name of the Project", id: "project-name" },
    { key: "reraNumber", label: "RERA Number", id: "rera-number" },
    { key: "builderName", label: "Builder Name", id: "builder-name" },
    {
      key: "areaSqft",
      label: "Area",
      id: "project-area",
      type: "number",
      hint: "Square feet",
    },
  ];

  return (
    <section className="w-full space-y-5">
      <SectionCard
        icon={<IconInfoCircle className="h-7 w-7" />}
        title="Project Information"
      >
        <div className="grid gap-2.5 md:gap-5 lg:grid-cols-2">
          {projectDetailFields.map((field) => (
            <FormField
              key={field.key}
              label={field.label}
              htmlFor={field.id}
              hint={field.hint}
            >
              <TextInput
                id={field.id}
                type={field.type}
                inputMode={field.type === "number" ? "decimal" : undefined}
                min={field.type === "number" ? 0 : undefined}
                step={field.type === "number" ? 1 : undefined}
                value={form[field.key]}
                onChange={(value) => updateField(field.key, value)}
              />
            </FormField>
          ))}
          <FormField
            label="Type"
            htmlFor="project-type"
            hint="e.g. 2 BHK, Residential"
          >
            <TextInput
              id="project-type"
              value={configuration.bhkType}
              onChange={(value) => updateConfigurationField("bhkType", value)}
            />
          </FormField>
          <FormField label="Location" htmlFor="project-location">
            <TextInput
              id="project-location"
              value={configuration.location}
              onChange={(value) => updateConfigurationField("location", value)}
            />
          </FormField>
          <FormField
            label="Project completed in"
            htmlFor="project-completion-date"
            hint="Month and year only"
            className="lg:col-span-2"
          >
            <TextInput
              id="project-completion-date"
              type="month"
              value={form.completionDate}
              onChange={(value) => updateCompletionDate(value)}
            />
            <p
              className={cn(
                "text-[0.92rem] font-medium",
                !form.completionDate.trim()
                  ? "text-[#657188]"
                  : isDerivedCompletedProject
                    ? "text-[#059669]"
                    : "text-[#b45309]",
              )}
            >
              {derivedProjectStatusLabel}
              {form.completionDate.trim()
                ? " — based on completion month vs today."
                : ""}
            </p>
          </FormField>
        </div>
      </SectionCard>

      <SectionCard
        icon={<IconImageSquare className="h-7 w-7" />}
        title="Logo, Banner & Gallery"
      >
        <div className="space-y-6">
          <div className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-[20px] border border-[#e7e4df] bg-[#fafafa] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className={FIELD_LABEL_CLASS}>Logo</span>
              {hasLogoImage ? (
                <button
                  type="button"
                  onClick={removeLogoImage}
                  disabled={fileUploading.logo}
                  className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#f09684] px-3 text-[0.82rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              ) : null}
            </div>

            {form.logoFileName ? (
              <p
                className="truncate text-[0.88rem] font-medium text-[#657188]"
                title={form.logoFileName}
              >
                {truncateFileName(form.logoFileName)}
              </p>
            ) : null}

            <FileUploadField
              key={`logo-${String(existingProjectFiles.logoId)}`}
              id="project-logo"
              accept={ALLOWED_UPLOAD_IMAGE_ACCEPT}
              title={
                fileUploading.logo
                  ? "Uploading…"
                  : hasLogoImage
                    ? "Replace image"
                    : "Choose image"
              }
              helperText={
                form.logoFileName
                  ? undefined
                  : `JPG or PNG, max ${formatMaxUploadSizeMb()}. Shown as the developer logo on the project page.`
              }
              selectedFileNames={
                form.logoFileName ? [form.logoFileName] : []
              }
              showFileSummary={false}
              leadingContent={<IconUpload className="h-6 w-6" />}
              disabled={fileUploading.logo}
              dropzoneClassName="min-h-[130px] rounded-[18px] [&_p:first-of-type]:mt-3 [&_p:first-of-type]:text-[1.05rem]"
              className="w-full min-w-0"
              onChange={handleLogoFile}
            />

            {logoUploadError ? (
              <p className="text-[0.95rem] font-medium text-[#d05c43]">
                {logoUploadError}
              </p>
            ) : null}
          </div>

          <div className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-[20px] border border-[#e7e4df] bg-[#fafafa] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className={FIELD_LABEL_CLASS}>Banner Image</span>
              {hasBannerImage ? (
                <button
                  type="button"
                  onClick={removeBannerImage}
                  disabled={fileUploading.hero}
                  className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#f09684] px-3 text-[0.82rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              ) : null}
            </div>

            {form.heroImageName ? (
              <p
                className="truncate text-[0.88rem] font-medium text-[#657188]"
                title={form.heroImageName}
              >
                {truncateFileName(form.heroImageName)}
              </p>
            ) : null}

            <FileUploadField
              key={`hero-${String(existingProjectFiles.heroId)}`}
              id="project-hero"
              accept={ALLOWED_UPLOAD_IMAGE_ACCEPT}
              title={
                fileUploading.hero
                  ? "Uploading…"
                  : hasBannerImage
                    ? "Replace image"
                    : "Choose image"
              }
              helperText={
                form.heroImageName
                  ? undefined
                  : `JPG or PNG, max ${formatMaxUploadSizeMb()}. Uploads as soon as you select a file.`
              }
              selectedFileNames={
                form.heroImageName ? [form.heroImageName] : []
              }
              showFileSummary={false}
              leadingContent={<IconUpload className="h-6 w-6" />}
              disabled={fileUploading.hero}
              dropzoneClassName="min-h-[130px] rounded-[18px] [&_p:first-of-type]:mt-3 [&_p:first-of-type]:text-[1.05rem]"
              className="w-full min-w-0"
              onChange={handleBannerFile}
            />

            {bannerUploadError ? (
              <p className="text-[0.95rem] font-medium text-[#d05c43]">
                {bannerUploadError}
              </p>
            ) : null}
          </div>

          <FormField
            label="Gallery Images"
            hint={`${filledGalleryImages} / ${REQUIRED_GALLERY_IMAGES} uploaded — JPG or PNG, max ${formatMaxUploadSizeMb()} each. Upload each slot independently.`}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {existingProjectFiles.gallerySlots.map((slot, slotIndex) => {
                const slotUploading = gallerySlotUploading[slotIndex];
                const slotLabel = `Gallery image ${slotIndex + 1}`;

                return (
                  <div
                    key={`gallery-slot-${slotIndex}`}
                    className="flex min-w-0 flex-col gap-3 overflow-hidden rounded-[20px] border border-[#e7e4df] bg-[#fafafa] p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[0.95rem] font-semibold text-[#33425e]">
                        {slotLabel}
                      </span>
                      {slot.fileId ? (
                        <button
                          type="button"
                          onClick={() => removeGallerySlot(slotIndex)}
                          disabled={slotUploading}
                          className="inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[#f09684] px-3 text-[0.82rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>

                    {slot.fileName ? (
                      <p
                        className="truncate text-[0.88rem] font-medium text-[#657188]"
                        title={slot.fileName}
                      >
                        {truncateFileName(slot.fileName)}
                      </p>
                    ) : null}

                    <FileUploadField
                      key={`gallery-slot-${slotIndex}-${String(slot.fileId)}`}
                      id={`project-gallery-${slotIndex + 1}`}
                      accept={ALLOWED_UPLOAD_IMAGE_ACCEPT}
                      title={
                        slotUploading
                          ? "Uploading…"
                          : slot.fileId
                            ? "Replace image"
                            : "Choose image"
                      }
                      helperText={
                        slot.fileName
                          ? undefined
                          : `JPG or PNG, max ${formatMaxUploadSizeMb()}. Uploads as soon as you select a file.`
                      }
                      selectedFileNames={slot.fileName ? [slot.fileName] : []}
                      showFileSummary={false}
                      leadingContent={<IconUpload className="h-6 w-6" />}
                      disabled={slotUploading}
                      dropzoneClassName="min-h-[130px] rounded-[18px] [&_p:first-of-type]:mt-3 [&_p:first-of-type]:text-[1.05rem]"
                      className="w-full min-w-0"
                      onChange={(event) =>
                        handleGallerySlotFile(slotIndex, event)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </FormField>

          {galleryUploadError ? (
            <p className="text-[0.95rem] font-medium text-[#d05c43]">
              {galleryUploadError}
            </p>
          ) : null}

          <p className="text-[1rem] text-[#657188]">
            Required: exactly {REQUIRED_GALLERY_IMAGES} gallery images to create
            or update a project.
          </p>
        </div>
      </SectionCard>

      <SectionCard
        icon={<IconInfoCircle className="h-7 w-7" />}
        title="Short Description"
      >
        <FormField
          label="Short description of property"
          htmlFor="project-description"
          hint="30–50 words recommended"
        >
          <TextArea
            id="project-description"
            value={form.description}
            onChange={(value) => updateField("description", value)}
            className="min-h-[140px]"
          />
        </FormField>
        <p
          className={cn(
            "text-[0.92rem] font-medium",
            descriptionWordCount >= 30 && descriptionWordCount <= 50
              ? "text-[#059669]"
              : "text-[#657188]",
          )}
        >
          {descriptionWordCount} word{descriptionWordCount === 1 ? "" : "s"}
          {descriptionWordCount > 0 && descriptionWordCount < 30
            ? " — aim for 30–50 words"
            : descriptionWordCount > 50
              ? " — consider trimming to 30–50 words"
              : descriptionWordCount >= 30 && descriptionWordCount <= 50
                ? " — within recommended range"
                : ""}
        </p>
      </SectionCard>

      <SectionCard
        icon={<IconSparkles className="h-7 w-7" />}
        title="Project Amenities"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.98rem] leading-relaxed text-[#657188]">
            Select one or more amenities for this project.
          </p>
          <label className="inline-flex cursor-pointer items-center gap-2.5 rounded-[12px] border border-[#e7e4df] bg-[#fafafa] px-4 py-2.5 transition hover:border-[#e8d5cf]">
            <input
              ref={selectAllAmenitiesRef}
              type="checkbox"
              checked={allAmenitiesSelected}
              onChange={toggleAllAmenities}
              className="h-4 w-4 accent-[#f07c61]"
              aria-label="Select all amenities"
            />
            <span className="text-[0.92rem] font-semibold text-[#33425e]">
              Select all ({selectedAmenityCount}/{AMENITY_CATALOG.length})
            </span>
          </label>
        </div>
        <div
          className="mt-5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
          role="group"
          aria-label="Amenities"
        >
          {AMENITY_CATALOG.map((opt) => {
            const selected = selectedAmenityKeys.includes(opt.key);
            return (
              <label
                key={opt.key}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-[20px] border-2 p-3 transition",
                  selected
                    ? "border-[#f07c61] bg-[#fff8f5] shadow-sm"
                    : "border-[#ece7e1] bg-white hover:border-[#e8d5cf]",
                )}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selected}
                  onChange={() => toggleAmenityKey(opt.key)}
                />
                <div className="relative h-12 w-12 shrink-0">
                  <Image
                    src={opt.thumbnailSrc}
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <span className="min-w-0 flex-1 text-left text-[0.95rem] font-medium leading-snug text-[#33425e]">
                  {opt.name}
                </span>
                {selected ? (
                  <span className="shrink-0 text-[#f07c61]" aria-hidden>
                    <IconCheckSeal className="h-5 w-5" />
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard
        icon={<IconRoute className="h-7 w-7" />}
        title="Location & Connectivity"
        titleClassName="font-nexa text-[clamp(1.5rem,2.4vw,2.75rem)] font-bold leading-tight text-[#081a43] sm:leading-none"
      >
        <p className="text-[0.98rem] leading-relaxed text-[#657188]">
          Add nearby landmarks with walk or drive times in minutes. Each row is
          saved as a separate connectivity entry on the project.
        </p>

        <div className="mt-5 overflow-x-auto rounded-[20px] border border-[#e7e4df]">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#efede9] bg-[#fafafa]">
                <th
                  scope="col"
                  className="w-12 px-3 py-3.5 text-[0.82rem] font-semibold uppercase tracking-wide text-[#657188] md:px-4"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="min-w-[220px] px-3 py-3.5 text-[0.82rem] font-semibold uppercase tracking-wide text-[#657188] md:px-4"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="w-[120px] px-3 py-3.5 text-[0.82rem] font-semibold uppercase tracking-wide text-[#657188] md:w-[140px] md:px-4"
                >
                  Walk (min)
                </th>
                <th
                  scope="col"
                  className="w-[120px] px-3 py-3.5 text-[0.82rem] font-semibold uppercase tracking-wide text-[#657188] md:w-[140px] md:px-4"
                >
                  Drive (min)
                </th>
                <th
                  scope="col"
                  className="w-[88px] px-3 py-3.5 text-right text-[0.82rem] font-semibold uppercase tracking-wide text-[#657188] md:px-4"
                >
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {locationSections.map((section, index) => {
                const placeId = `connectivity-${String(section.id)}-place`;
                const walkId = `connectivity-${String(section.id)}-walk`;
                const driveId = `connectivity-${String(section.id)}-drive`;

                return (
                  <tr
                    key={`loc-${String(section.id)}-${index}`}
                    className="border-b border-[#efede9] last:border-b-0 odd:bg-white even:bg-[#fcfcfb]"
                  >
                    <td className="px-3 py-3 align-middle text-[0.95rem] font-semibold text-[#657188] md:px-4">
                      {index + 1}
                    </td>
                    <td className="px-3 py-3 align-middle md:px-4">
                      <label htmlFor={placeId} className="sr-only">
                        Location {index + 1}
                      </label>
                      <TextInput
                        id={placeId}
                        value={section.place}
                        onChange={(value) =>
                          updateLocationSection(section.id, "place", value)
                        }
                        className={TABLE_INPUT_CLASS}
                      />
                    </td>
                    <td className="px-3 py-3 align-middle md:px-4">
                      <label htmlFor={walkId} className="sr-only">
                        Walk minutes {index + 1}
                      </label>
                      <TextInput
                        id={walkId}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={1}
                        value={section.walkingTime}
                        onChange={(value) =>
                          updateLocationSection(
                            section.id,
                            "walkingTime",
                            value,
                          )
                        }
                        className={TABLE_INPUT_CLASS}
                      />
                    </td>
                    <td className="px-3 py-3 align-middle md:px-4">
                      <label htmlFor={driveId} className="sr-only">
                        Drive minutes {index + 1}
                      </label>
                      <TextInput
                        id={driveId}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={1}
                        value={section.drivingTime}
                        onChange={(value) =>
                          updateLocationSection(
                            section.id,
                            "drivingTime",
                            value,
                          )
                        }
                        className={TABLE_INPUT_CLASS}
                      />
                    </td>
                    <td className="px-3 py-3 text-right align-middle md:px-4">
                      {locationSections.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => removeLocationSection(section.id)}
                          className="inline-flex h-10 cursor-pointer items-center justify-center rounded-[10px] border border-[#f09684] px-3 text-[0.82rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                        >
                          Remove
                        </button>
                      ) : (
                        <span className="inline-block h-10" aria-hidden />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <AddItemButton
            label="Add connectivity"
            onClick={addLocationSection}
          />
        </div>
      </SectionCard>

      <div className="space-y-3">
        {errorMessage ? (
          <p className="text-sm font-medium text-[#d05c43]">{errorMessage}</p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              isLoadingProject ||
              isAnyFileUploading ||
              filledGalleryImages !== REQUIRED_GALLERY_IMAGES
            }
            className={`${BUTTON_PRIMARY_CLASS} h-[52px] w-full px-7 text-[0.98rem] transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto`}
          >
            <IconCheckSeal className="h-5 w-5" />
            <span>
              {isLoadingProject
                ? "Loading..."
                : isSubmitting
                  ? isEditMode
                    ? "Updating..."
                    : "Creating…"
                  : isEditMode
                    ? "Update Project"
                    : "Create Project"}
            </span>
          </button>
        </div>

        {filledGalleryImages !== REQUIRED_GALLERY_IMAGES ? (
          <p className="text-end text-[0.88rem] font-medium text-[#657188]">
            Add {REQUIRED_GALLERY_IMAGES - filledGalleryImages} more gallery
            image
            {REQUIRED_GALLERY_IMAGES - filledGalleryImages === 1 ? "" : "s"} (
            {filledGalleryImages}/{REQUIRED_GALLERY_IMAGES}).
          </p>
        ) : null}
      </div>
    </section>
  );
}
