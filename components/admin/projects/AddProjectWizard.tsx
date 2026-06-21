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
import { AmenityImageByFileId } from "@/components/common/AmenityImageByFileId";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LEGACY_AMENITY_IMAGE_IDS,
  LOCAL_AMENITY_IMAGE_FILE_ID,
  isPresetAmenityKey,
  parseAmenityApiIdFromKey,
  projectAmenitiesForWizard,
  type WizardProjectAmenity,
} from "@/lib/admin/amenityCatalog";
import {
  PROJECT_AMENITY_PRESETS,
  findPresetByKey,
  findPresetByName,
  presetImageSrc,
  type ProjectAmenityPreset,
} from "@/lib/admin/projectAmenityPresets";
import { resolveApiAssetUrl } from "@/lib/api/resolveAssetUrl";
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

const MEDIA_SLOT_SHELL_CLASS =
  "flex min-w-0 flex-col gap-1.5 overflow-hidden rounded-[14px] border border-[#e7e4df] bg-[#fafafa] p-3";

const MEDIA_SLOT_LABEL_CLASS = "text-[0.88rem] font-semibold text-[#33425e]";

const MEDIA_REMOVE_BUTTON_CLASS =
  "inline-flex h-8 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[#f09684] px-2.5 text-[0.78rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1] disabled:cursor-not-allowed disabled:opacity-50";

const MEDIA_UPLOAD_DROPZONE_CLASS =
  "h-[48px] min-h-0 rounded-[12px] border px-3 py-0 [&_span]:max-w-[min(100%,100%)] [&_span]:truncate [&_span]:text-[0.86rem]";

const MEDIA_UPLOAD_ERROR_CLASS = "text-[0.82rem] font-medium text-[#d05c43]";

const AMENITY_COMPACT_INPUT_CLASS =
  "h-[48px] rounded-[12px] px-4 text-[0.92rem]";

const AMENITY_COMPACT_TEXTAREA_CLASS =
  "min-h-[96px] resize-y rounded-[12px] px-4 py-3 text-[0.92rem] leading-snug";

/** Split bulk amenity input on commas, newlines, and common paste separators. */
function parseAmenityNamesFromInput(input: string): string[] {
  const normalized = input
    .replace(/\r\n/g, "\n")
    .replace(/[，;|]/g, ",");

  const parts = normalized
    .split(/[,\n]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const seen = new Set<string>();
  const names: string[] = [];

  for (const part of parts) {
    const key = part.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    names.push(part);
  }

  return names;
}

const AMENITY_CUSTOM_PANEL_CLASS =
  "rounded-[14px] border border-dashed border-[#e8d5cf] bg-[#fffdfb] p-3";

const AMENITY_CARD_CLASS =
  "relative flex min-h-[52px] rounded-[14px] border transition";

const AMENITY_COMPACT_LABEL_CLASS =
  "mb-1 block text-[0.82rem] font-semibold text-[#33425e]";

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
  contentClassName,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  /** Override default `qs-reg` (e.g. `font-nexa font-bold` for Location & Connectivity). */
  titleClassName?: string;
  contentClassName?: string;
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

      <div
        className={cn(
          "space-y-6 px-2 py-2 md:px-4 md:py-4",
          contentClassName,
        )}
      >
        {children}
      </div>
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
  const [projectAmenities, setProjectAmenities] = useState<WizardProjectAmenity[]>(
    [],
  );
  const [newAmenityName, setNewAmenityName] = useState("");
  const [newAmenityFileName, setNewAmenityFileName] = useState("");
  const [newAmenityPreview, setNewAmenityPreview] = useState<string | null>(null);
  const [newAmenityUploadedFileId, setNewAmenityUploadedFileId] = useState<
    number | null
  >(null);
  const [useLocalAmenityImage, setUseLocalAmenityImage] = useState(false);
  const [newAmenityError, setNewAmenityError] = useState<string | null>(null);
  const [isUploadingAmenityImage, setIsUploadingAmenityImage] = useState(false);
  const [isSavingAmenity, setIsSavingAmenity] = useState(false);
  const [editingAmenityKey, setEditingAmenityKey] = useState<string | null>(null);
  const [amenityPresetSearch, setAmenityPresetSearch] = useState("");
  const [uploadingPresetKeys, setUploadingPresetKeys] = useState<string[]>([]);
  const projectAmenityKeyRef = useRef(0);
  const presetImageUploadCacheRef = useRef(new Map<string, number>());
  const newAmenityPreviewRef = useRef<string | null>(null);
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

        const loadedAmenities = projectAmenitiesForWizard(project.amenities);
        for (const amenity of loadedAmenities) {
          if (
            amenity.thumbnailSrc.startsWith("/images/projects_amenities/") &&
            amenity.imageFileId != null &&
            !LEGACY_AMENITY_IMAGE_IDS.has(amenity.imageFileId)
          ) {
            presetImageUploadCacheRef.current.set(
              amenity.thumbnailSrc,
              amenity.imageFileId,
            );
          }
        }
        setProjectAmenities(loadedAmenities);
        setSelectedAmenityKeys(loadedAmenities.map((item) => item.key));
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
    fileType: "LOGO" | "HERO" | "SEQUENCE" | "ICON",
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
    const allKeys = projectAmenities.map((item) => item.key);
    setSelectedAmenityKeys((current) =>
      current.length === allKeys.length ? [] : allKeys,
    );
  }

  function isPresetSelected(presetKey: string) {
    return projectAmenities.some((item) => item.key === presetKey);
  }

  function isPresetUploading(presetKey: string) {
    return uploadingPresetKeys.includes(presetKey);
  }

  function setPresetUploading(presetKey: string, uploading: boolean) {
    setUploadingPresetKeys((current) =>
      uploading
        ? current.includes(presetKey)
          ? current
          : [...current, presetKey]
        : current.filter((key) => key !== presetKey),
    );
  }

  function presetLocalImageSrc(preset: ProjectAmenityPreset) {
    return presetImageSrc(preset);
  }

  function resolvePresetLocalImageSrc(amenity: {
    key: string;
    thumbnailSrc: string;
  }): string | null {
    if (amenity.thumbnailSrc.startsWith("/images/projects_amenities/")) {
      return amenity.thumbnailSrc;
    }

    if (isPresetAmenityKey(amenity.key)) {
      const preset = findPresetByKey(amenity.key);
      return preset ? presetLocalImageSrc(preset) : null;
    }

    return null;
  }

  async function uploadPresetImageBySrc(localSrc: string): Promise<number> {
    const cache = presetImageUploadCacheRef.current;
    const cached = cache.get(localSrc);
    if (cached != null) return cached;

    const uploadedId = await uploadLocalAmenityImage(localSrc);
    cache.set(localSrc, uploadedId);
    return uploadedId;
  }

  async function ensurePresetImageUploaded(
    preset: ProjectAmenityPreset,
  ): Promise<number> {
    const localSrc = presetLocalImageSrc(preset);
    const existing = projectAmenities.find((entry) => entry.key === preset.key);
    if (
      existing?.imageFileId != null &&
      !LEGACY_AMENITY_IMAGE_IDS.has(existing.imageFileId) &&
      existing.imageFileId !== LOCAL_AMENITY_IMAGE_FILE_ID
    ) {
      presetImageUploadCacheRef.current.set(localSrc, existing.imageFileId);
      return existing.imageFileId;
    }

    return uploadPresetImageBySrc(localSrc);
  }

  async function addPresetAmenity(preset: ProjectAmenityPreset) {
    if (isPresetSelected(preset.key) || isPresetUploading(preset.key)) return;

    setPresetUploading(preset.key, true);
    setErrorMessage("");

    try {
      const imageFileId = await ensurePresetImageUploaded(preset);
      const entry: WizardProjectAmenity = {
        key: preset.key,
        name: preset.name,
        imageFileId,
        thumbnailSrc: presetLocalImageSrc(preset),
      };

      setProjectAmenities((current) => {
        const withoutDuplicate = current.filter((item) => item.key !== preset.key);
        return [...withoutDuplicate, entry];
      });
      setSelectedAmenityKeys((current) =>
        current.includes(preset.key) ? current : [...current, preset.key],
      );
    } catch (error) {
      setErrorMessage(
        getUploadErrorMessage(
          error,
          `Could not upload icon for ${preset.name}.`,
        ),
      );
    } finally {
      setPresetUploading(preset.key, false);
    }
  }

  async function togglePresetAmenity(preset: ProjectAmenityPreset) {
    if (isPresetSelected(preset.key)) {
      removeProjectAmenity(preset.key);
      return;
    }
    await addPresetAmenity(preset);
  }

  async function toggleAllFilteredPresets(presets: readonly ProjectAmenityPreset[]) {
    if (presets.length === 0) return;

    const allSelected = presets.every((preset) => isPresetSelected(preset.key));
    if (allSelected) {
      const presetKeys = new Set(presets.map((preset) => preset.key));
      setProjectAmenities((current) =>
        current.filter((item) => !presetKeys.has(item.key)),
      );
      setSelectedAmenityKeys((current) =>
        current.filter((key) => !presetKeys.has(key)),
      );
      return;
    }

    const presetsToAdd = presets.filter((preset) => !isPresetSelected(preset.key));
    if (presetsToAdd.length === 0) return;

    setErrorMessage("");
    for (const preset of presetsToAdd) {
      setPresetUploading(preset.key, true);
    }

    try {
      const uploadedEntries = await Promise.all(
        presetsToAdd.map(async (preset) => {
          const imageFileId = await ensurePresetImageUploaded(preset);
          return {
            key: preset.key,
            name: preset.name,
            imageFileId,
            thumbnailSrc: presetLocalImageSrc(preset),
          } satisfies WizardProjectAmenity;
        }),
      );

      setProjectAmenities((current) => {
        const existingKeys = new Set(current.map((item) => item.key));
        const next = [...current];
        for (const entry of uploadedEntries) {
          if (!existingKeys.has(entry.key)) {
            next.push(entry);
            existingKeys.add(entry.key);
          }
        }
        return next;
      });
      setSelectedAmenityKeys((current) => {
        const next = [...current];
        for (const entry of uploadedEntries) {
          if (!next.includes(entry.key)) next.push(entry.key);
        }
        return next;
      });
    } catch (error) {
      setErrorMessage(
        getUploadErrorMessage(error, "Could not upload selected amenity icons."),
      );
    } finally {
      for (const preset of presetsToAdd) {
        setPresetUploading(preset.key, false);
      }
    }
  }

  function revokeNewAmenityPreview() {
    if (newAmenityPreviewRef.current) {
      URL.revokeObjectURL(newAmenityPreviewRef.current);
      newAmenityPreviewRef.current = null;
    }
    setNewAmenityPreview(null);
  }

  function clearAmenityDraft() {
    revokeNewAmenityPreview();
    setNewAmenityName("");
    setNewAmenityFileName("");
    setNewAmenityUploadedFileId(null);
    setUseLocalAmenityImage(false);
    setNewAmenityError(null);
    setEditingAmenityKey(null);
  }

  function startEditAmenity(key: string) {
    const item = projectAmenities.find((entry) => entry.key === key);
    if (!item) return;

    revokeNewAmenityPreview();
    setEditingAmenityKey(key);
    setNewAmenityName(item.name);
    const isLocalImage = item.imageFileId === LOCAL_AMENITY_IMAGE_FILE_ID;
    setUseLocalAmenityImage(isLocalImage);
    setNewAmenityUploadedFileId(isLocalImage ? LOCAL_AMENITY_IMAGE_FILE_ID : null);
    setNewAmenityFileName(
      isLocalImage
        ? "Local image"
        : item.thumbnailSrc
          ? "Current image"
          : "",
    );
    setNewAmenityError(null);
  }

  function handleUseLocalAmenityImageChange(checked: boolean) {
    setUseLocalAmenityImage(checked);
    setNewAmenityError(null);

    if (checked) {
      revokeNewAmenityPreview();
      setNewAmenityFileName("Local image");
      setNewAmenityUploadedFileId(LOCAL_AMENITY_IMAGE_FILE_ID);
    } else {
      setNewAmenityFileName("");
      setNewAmenityUploadedFileId(null);
    }
  }

  async function handleNewAmenityFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    const input = event.target;

    if (!file) {
      input.value = "";
      return;
    }

    const validationError = validateUploadImageFile(file, MAX_UPLOAD_FILE_BYTES);
    if (validationError) {
      setNewAmenityError(validationError);
      input.value = "";
      return;
    }

    setUseLocalAmenityImage(false);
    revokeNewAmenityPreview();
    setNewAmenityUploadedFileId(null);
    const previewUrl = URL.createObjectURL(file);
    newAmenityPreviewRef.current = previewUrl;
    setNewAmenityPreview(previewUrl);
    setNewAmenityFileName(file.name);
    setNewAmenityError(null);
    setIsUploadingAmenityImage(true);
    setErrorMessage("");

    try {
      const uploaded = await uploadAmenityIconFile(file);
      setNewAmenityUploadedFileId(uploaded.id);
      const apiThumbnail =
        resolveApiAssetUrl(uploaded.file_url) ?? previewUrl;
      revokeNewAmenityPreview();
      setNewAmenityPreview(apiThumbnail);
    } catch (error) {
      revokeNewAmenityPreview();
      setNewAmenityFileName("");
      setNewAmenityUploadedFileId(null);
      setNewAmenityError(
        getUploadErrorMessage(error, "Amenity image upload failed."),
      );
    } finally {
      setIsUploadingAmenityImage(false);
      input.value = "";
    }
  }

  async function uploadAmenityIconFile(file: File): Promise<SingleFileUploadResponse["data"]> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_type", "ICON");

    const result = (await uploadFileRequest(
      formData,
    )) as SingleFileUploadResponse;

    if (!result.success) {
      throw new Error(
        result.message?.trim() || "Amenity image upload failed.",
      );
    }

    return result.data;
  }

  async function uploadLocalAmenityImage(imageSrc: string): Promise<number> {
    const response = await fetch(imageSrc);
    if (!response.ok) {
      throw new Error(`Could not load amenity image (${imageSrc}).`);
    }

    const blob = await response.blob();
    const fileName = decodeURIComponent(imageSrc.split("/").pop() ?? "amenity.png");
    const file = new File([blob], fileName, {
      type: blob.type || "image/png",
    });
    const uploaded = await uploadAmenityIconFile(file);
    return uploaded.id;
  }

  async function resolveAmenityImageFileId(
    amenity: {
      key: string;
      name: string;
      existingImageId: number | null;
      thumbnailSrc: string;
    },
    uploadCache: Map<string, number>,
  ): Promise<number> {
    if (
      amenity.existingImageId != null &&
      !LEGACY_AMENITY_IMAGE_IDS.has(amenity.existingImageId) &&
      (!isPresetAmenityKey(amenity.key) ||
        amenity.existingImageId !== LOCAL_AMENITY_IMAGE_FILE_ID)
    ) {
      return amenity.existingImageId;
    }

    const localSrc = resolvePresetLocalImageSrc(amenity);

    if (localSrc) {
      const cached = uploadCache.get(localSrc) ??
        presetImageUploadCacheRef.current.get(localSrc);
      if (cached != null) {
        uploadCache.set(localSrc, cached);
        return cached;
      }

      const uploadedId = await uploadPresetImageBySrc(localSrc);
      uploadCache.set(localSrc, uploadedId);
      return uploadedId;
    }

    if (amenity.existingImageId != null) {
      return amenity.existingImageId;
    }

    throw new Error(`Missing image for amenity "${amenity.name}".`);
  }

  async function saveAmenityFromForm() {
    const names = editingAmenityKey
      ? newAmenityName.trim()
        ? [newAmenityName.trim()]
        : []
      : parseAmenityNamesFromInput(newAmenityName);

    if (names.length === 0) {
      setNewAmenityError(
        editingAmenityKey
          ? "Amenity name is required."
          : "Add at least one amenity name (one per line or comma-separated).",
      );
      return;
    }

    const existing = editingAmenityKey
      ? projectAmenities.find((entry) => entry.key === editingAmenityKey)
      : null;

    const draftImageFileId = useLocalAmenityImage
      ? LOCAL_AMENITY_IMAGE_FILE_ID
      : newAmenityUploadedFileId;

    if (!draftImageFileId && !existing?.imageFileId) {
      setNewAmenityError("Amenity image is required.");
      return;
    }

    setNewAmenityError(null);
    setErrorMessage("");
    setIsSavingAmenity(true);

    try {
      const imageFileId = draftImageFileId ?? existing?.imageFileId ?? null;
      const thumbnailSrc = useLocalAmenityImage
        ? ""
        : newAmenityPreview ??
          existing?.thumbnailSrc ??
          "";

      if (imageFileId == null) {
        setNewAmenityError("Amenity image is required.");
        return;
      }

      if (editingAmenityKey && existing) {
        setProjectAmenities((current) =>
          current.map((entry) =>
            entry.key === editingAmenityKey
              ? { ...entry, name: names[0]!, imageFileId, thumbnailSrc }
              : entry,
          ),
        );
        setSelectedAmenityKeys((current) =>
          current.includes(editingAmenityKey)
            ? current
            : [...current, editingAmenityKey],
        );
      } else {
        const presetsToAdd: ProjectAmenityPreset[] = [];
        const customNames: string[] = [];

        for (const name of names) {
          const preset = findPresetByName(name);
          if (preset) {
            if (
              !projectAmenities.some((entry) => entry.key === preset.key) &&
              !presetsToAdd.some((entry) => entry.key === preset.key)
            ) {
              presetsToAdd.push(preset);
            }
            continue;
          }
          customNames.push(name);
        }

        if (customNames.length > 0 && imageFileId == null) {
          setNewAmenityError("Amenity image is required for custom amenities.");
          return;
        }

        if (presetsToAdd.length === 0 && customNames.length === 0) {
          setNewAmenityError("All listed amenities are already added.");
          return;
        }

        const newPresetEntries: WizardProjectAmenity[] = await Promise.all(
          presetsToAdd.map(async (preset) => ({
            key: preset.key,
            name: preset.name,
            imageFileId: await ensurePresetImageUploaded(preset),
            thumbnailSrc: presetLocalImageSrc(preset),
          })),
        );

        const newCustomEntries: WizardProjectAmenity[] = customNames.map(
          (name) => {
            projectAmenityKeyRef.current += 1;
            const key = `amenity-${Date.now()}-${projectAmenityKeyRef.current}`;
            return {
              key,
              name,
              imageFileId,
              thumbnailSrc,
            };
          },
        );

        const newEntries = [...newPresetEntries, ...newCustomEntries];

        setProjectAmenities((current) => [...current, ...newEntries]);
        setSelectedAmenityKeys((current) => {
          const next = [...current];
          for (const entry of newEntries) {
            if (!next.includes(entry.key)) {
              next.push(entry.key);
            }
          }
          return next;
        });
      }

      clearAmenityDraft();
    } catch (error) {
      setNewAmenityError(
        getUploadErrorMessage(error, "Could not save amenity."),
      );
    } finally {
      setIsSavingAmenity(false);
    }
  }

  function removeProjectAmenity(key: string) {
    if (editingAmenityKey === key) {
      clearAmenityDraft();
    }
    setProjectAmenities((current) => current.filter((item) => item.key !== key));
    setSelectedAmenityKeys((current) => current.filter((k) => k !== key));
  }

  function getPreparedAmenities(): Array<{
    key: string;
    name: string;
    existingImageId: number | null;
    thumbnailSrc: string;
    apiId: number | null;
  }> {
    const out: Array<{
      key: string;
      name: string;
      existingImageId: number | null;
      thumbnailSrc: string;
      apiId: number | null;
    }> = [];

    for (const key of selectedAmenityKeys) {
      const item = projectAmenities.find((entry) => entry.key === key);
      if (!item) continue;

      out.push({
        key: item.key,
        name: item.name,
        existingImageId: item.imageFileId,
        thumbnailSrc: item.thumbnailSrc,
        apiId: item.apiId ?? parseAmenityApiIdFromKey(item.key),
      });
    }

    return out;
  }

  function buildProjectPayload(
    projectFileIds: number[],
    amenityPayload: Array<{
      id?: number;
      name: string;
      amenities_image_id: number;
    }>,
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

      const amenityUploadCache = new Map<string, number>();
      const uploadedAmenities = await Promise.all(
        preparedAmenities.map(async (amenity) => {
          const amenities_image_id = await resolveAmenityImageFileId(
            amenity,
            amenityUploadCache,
          );

          return {
            ...(isEditMode && amenity.apiId != null ? { id: amenity.apiId } : {}),
            name: amenity.name.trim(),
            amenities_image_id,
          };
        }),
      );

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

  const filledGalleryImages = filledGalleryCount(
    existingProjectFiles.gallerySlots,
  );
  const isBlockingFileUpload =
    isAnyFileUploading ||
    isUploadingAmenityImage ||
    uploadingPresetKeys.length > 0;
  const hasBannerImage = Boolean(existingProjectFiles.heroId);
  const hasLogoImage = Boolean(existingProjectFiles.logoId);
  const derivedProjectStatusLabel = projectStatusLabelFromCompletionMonth(
    form.completionDate,
  );
  const isDerivedCompletedProject = isCompletedFromCompletionMonth(
    form.completionDate,
  );
  const selectedAmenityCount = selectedAmenityKeys.length;
  const totalAmenityCount = projectAmenities.length;
  const allAmenitiesSelected =
    totalAmenityCount > 0 && selectedAmenityCount === totalAmenityCount;
  const someAmenitiesSelected =
    selectedAmenityCount > 0 && !allAmenitiesSelected;
  const selectAllAmenitiesRef = useRef<HTMLInputElement>(null);
  const editingAmenity = editingAmenityKey
    ? projectAmenities.find((entry) => entry.key === editingAmenityKey)
    : null;
  const amenityDraftPreviewSrc = useLocalAmenityImage
    ? null
    : newAmenityPreview ?? editingAmenity?.thumbnailSrc ?? null;
  const amenityDraftImageFileId = useLocalAmenityImage
    ? LOCAL_AMENITY_IMAGE_FILE_ID
    : newAmenityUploadedFileId ?? editingAmenity?.imageFileId ?? null;
  const canSaveAmenityDraft = editingAmenityKey
    ? Boolean(amenityDraftImageFileId) ||
      Boolean(editingAmenity?.imageFileId)
    : (() => {
        const parsedNames = parseAmenityNamesFromInput(newAmenityName);
        if (parsedNames.length === 0) return false;
        const hasCustomNames = parsedNames.some((name) => !findPresetByName(name));
        return !hasCustomNames || Boolean(amenityDraftImageFileId);
      })();
  const parsedAmenityNameCount = editingAmenityKey
    ? 0
    : parseAmenityNamesFromInput(newAmenityName).length;
  const parsedCustomAmenityNameCount = editingAmenityKey
    ? 0
    : parseAmenityNamesFromInput(newAmenityName).filter(
        (name) => !findPresetByName(name),
      ).length;
  const customProjectAmenities = projectAmenities.filter(
    (item) => !isPresetAmenityKey(item.key),
  );
  const amenityPresetSearchNormalized = amenityPresetSearch.trim().toLowerCase();
  const filteredAmenityPresets = PROJECT_AMENITY_PRESETS.filter(
    (preset) =>
      !amenityPresetSearchNormalized ||
      preset.name.toLowerCase().includes(amenityPresetSearchNormalized),
  );
  const selectedPresetCount = PROJECT_AMENITY_PRESETS.filter((preset) =>
    isPresetSelected(preset.key),
  ).length;
  const allFilteredPresetsSelected =
    filteredAmenityPresets.length > 0 &&
    filteredAmenityPresets.every((preset) => isPresetSelected(preset.key));
  const someFilteredPresetsSelected =
    filteredAmenityPresets.some((preset) => isPresetSelected(preset.key)) &&
    !allFilteredPresetsSelected;
  const selectAllPresetsRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllAmenitiesRef.current) {
      selectAllAmenitiesRef.current.indeterminate = someAmenitiesSelected;
    }
  }, [someAmenitiesSelected]);

  useEffect(() => {
    if (selectAllPresetsRef.current) {
      selectAllPresetsRef.current.indeterminate = someFilteredPresetsSelected;
    }
  }, [someFilteredPresetsSelected]);

  useEffect(() => {
    return () => {
      if (newAmenityPreviewRef.current) {
        URL.revokeObjectURL(newAmenityPreviewRef.current);
      }
    };
  }, []);

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
        contentClassName="space-y-3 px-3 py-3 md:px-4 md:py-3"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className={MEDIA_SLOT_SHELL_CLASS}>
            <div className="flex items-center justify-between gap-2">
              <span className={MEDIA_SLOT_LABEL_CLASS}>Logo</span>
              {hasLogoImage ? (
                <button
                  type="button"
                  onClick={removeLogoImage}
                  disabled={fileUploading.logo}
                  className={MEDIA_REMOVE_BUTTON_CLASS}
                >
                  Remove
                </button>
              ) : null}
            </div>

            <FileUploadField
              key={`logo-${String(existingProjectFiles.logoId)}`}
              id="project-logo"
              layout="inline"
              accept={ALLOWED_UPLOAD_IMAGE_ACCEPT}
              valueDisplay={
                fileUploading.logo
                  ? "Uploading…"
                  : form.logoFileName
                    ? truncateFileName(form.logoFileName, 36)
                    : undefined
              }
              inlinePlaceholder={`Choose logo · max ${formatMaxUploadSizeMb()}`}
              leadingContent={<IconUpload className="h-5 w-5" />}
              disabled={fileUploading.logo}
              dropzoneClassName={MEDIA_UPLOAD_DROPZONE_CLASS}
              inlineContentClassName="gap-2"
              className="w-full min-w-0"
              onChange={handleLogoFile}
              aria-label="Upload project logo"
            />

            {logoUploadError ? (
              <p className={MEDIA_UPLOAD_ERROR_CLASS}>{logoUploadError}</p>
            ) : null}
          </div>

          <div className={MEDIA_SLOT_SHELL_CLASS}>
            <div className="flex items-center justify-between gap-2">
              <span className={MEDIA_SLOT_LABEL_CLASS}>Banner Image</span>
              {hasBannerImage ? (
                <button
                  type="button"
                  onClick={removeBannerImage}
                  disabled={fileUploading.hero}
                  className={MEDIA_REMOVE_BUTTON_CLASS}
                >
                  Remove
                </button>
              ) : null}
            </div>

            <FileUploadField
              key={`hero-${String(existingProjectFiles.heroId)}`}
              id="project-hero"
              layout="inline"
              accept={ALLOWED_UPLOAD_IMAGE_ACCEPT}
              valueDisplay={
                fileUploading.hero
                  ? "Uploading…"
                  : form.heroImageName
                    ? truncateFileName(form.heroImageName, 36)
                    : undefined
              }
              inlinePlaceholder={`Choose banner · max ${formatMaxUploadSizeMb()}`}
              leadingContent={<IconUpload className="h-5 w-5" />}
              disabled={fileUploading.hero}
              dropzoneClassName={MEDIA_UPLOAD_DROPZONE_CLASS}
              inlineContentClassName="gap-2"
              className="w-full min-w-0"
              onChange={handleBannerFile}
              aria-label="Upload project banner"
            />

            {bannerUploadError ? (
              <p className={MEDIA_UPLOAD_ERROR_CLASS}>{bannerUploadError}</p>
            ) : null}
          </div>
        </div>

        <FormField
          label="Gallery Images"
          hint={`${filledGalleryImages}/${REQUIRED_GALLERY_IMAGES} uploaded · JPG or PNG, max ${formatMaxUploadSizeMb()} each · all ${REQUIRED_GALLERY_IMAGES} required`}
          className="space-y-2"
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {existingProjectFiles.gallerySlots.map((slot, slotIndex) => {
              const slotUploading = gallerySlotUploading[slotIndex];

              return (
                <div
                  key={`gallery-slot-${slotIndex}`}
                  className={MEDIA_SLOT_SHELL_CLASS}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={MEDIA_SLOT_LABEL_CLASS}>
                      Image {slotIndex + 1}
                    </span>
                    {slot.fileId ? (
                      <button
                        type="button"
                        onClick={() => removeGallerySlot(slotIndex)}
                        disabled={slotUploading}
                        className={MEDIA_REMOVE_BUTTON_CLASS}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>

                  <FileUploadField
                    key={`gallery-slot-${slotIndex}-${String(slot.fileId)}`}
                    id={`project-gallery-${slotIndex + 1}`}
                    layout="inline"
                    accept={ALLOWED_UPLOAD_IMAGE_ACCEPT}
                    valueDisplay={
                      slotUploading
                        ? "Uploading…"
                        : slot.fileName
                          ? truncateFileName(slot.fileName, 32)
                          : undefined
                    }
                    inlinePlaceholder="Choose image"
                    leadingContent={<IconUpload className="h-5 w-5" />}
                    disabled={slotUploading}
                    dropzoneClassName={MEDIA_UPLOAD_DROPZONE_CLASS}
                    inlineContentClassName="gap-2"
                    className="w-full min-w-0"
                    onChange={(event) =>
                      handleGallerySlotFile(slotIndex, event)
                    }
                    aria-label={`Upload gallery image ${slotIndex + 1}`}
                  />
                </div>
              );
            })}
          </div>
        </FormField>

        {galleryUploadError ? (
          <p className={MEDIA_UPLOAD_ERROR_CLASS}>{galleryUploadError}</p>
        ) : null}
      </SectionCard>

      <SectionCard
        icon={<IconInfoCircle className="h-7 w-7" />}
        title="Short Description"
      >
        <FormField
          label="Short description of property"
          htmlFor="project-description"
        >
          <TextArea
            id="project-description"
            value={form.description}
            onChange={(value) => updateField("description", value)}
            className="min-h-[140px]"
          />
        </FormField>
      </SectionCard>

      <SectionCard
        icon={<IconSparkles className="h-7 w-7" />}
        title="Project Amenities"
        contentClassName="space-y-3 px-3 py-3 md:px-4 md:py-3"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[0.88rem] font-semibold text-[#33425e]">
            {selectedPresetCount} of {PROJECT_AMENITY_PRESETS.length} standard
            amenities selected
            {customProjectAmenities.length > 0
              ? ` · ${customProjectAmenities.length} custom`
              : ""}
          </p>
          {totalAmenityCount > 0 ? (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-[#e7e4df] bg-[#fafafa] px-3 py-1.5 transition hover:border-[#e8d5cf]">
              <input
                ref={selectAllAmenitiesRef}
                type="checkbox"
                checked={allAmenitiesSelected}
                onChange={toggleAllAmenities}
                className="h-3.5 w-3.5 accent-[#f07c61]"
                aria-label="Include all added amenities in project"
              />
              <span className="text-[0.82rem] font-semibold text-[#33425e]">
                Include all ({selectedAmenityCount}/{totalAmenityCount})
              </span>
            </label>
          ) : null}
        </div>

        <div className="space-y-2 rounded-[14px] border border-[#ece7e1] bg-[#fafafa] p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.86rem] font-semibold text-[#33425e]">
              Standard amenities
            </p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-[#e7e4df] bg-white px-3 py-1.5 transition hover:border-[#e8d5cf]">
              <input
                ref={selectAllPresetsRef}
                type="checkbox"
                checked={allFilteredPresetsSelected}
                onChange={() => {
                  void toggleAllFilteredPresets(filteredAmenityPresets);
                }}
                disabled={uploadingPresetKeys.length > 0}
                className="h-3.5 w-3.5 accent-[#f07c61]"
                aria-label="Select all filtered amenities"
              />
              <span className="text-[0.82rem] font-semibold text-[#33425e]">
                Select all shown
              </span>
            </label>
          </div>

          <TextInput
            id="amenity-preset-search"
            value={amenityPresetSearch}
            onChange={setAmenityPresetSearch}
            placeholder="Search amenities…"
            className={AMENITY_COMPACT_INPUT_CLASS}
            aria-label="Search amenities"
          />

          <div
            className="max-h-[420px] overflow-y-auto rounded-[12px] border border-[#ece7e1] bg-white p-2"
            role="group"
            aria-label="Standard amenities"
          >
            {filteredAmenityPresets.length === 0 ? (
              <p className="px-2 py-3 text-[0.84rem] text-[#657188]">
                No amenities match your search.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredAmenityPresets.map((preset) => {
                  const selected = isPresetSelected(preset.key);
                  const uploading = isPresetUploading(preset.key);
                  const imageSrc = presetImageSrc(preset);
                  return (
                    <label
                      key={preset.key}
                      className={cn(
                        AMENITY_CARD_CLASS,
                        uploading ? "cursor-wait opacity-70" : "cursor-pointer",
                        selected
                          ? "border-[#f07c61] bg-[#fff8f5]"
                          : "border-[#ece7e1] bg-white hover:border-[#e8d5cf]",
                      )}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selected}
                        disabled={uploading}
                        onChange={() => {
                          void togglePresetAmenity(preset);
                        }}
                      />
                      <div className="flex min-w-0 flex-1 items-center gap-2 p-2">
                        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ece7e1]">
                          <Image
                            src={imageSrc}
                            alt=""
                            width={36}
                            height={36}
                            unoptimized
                            className="h-9 w-9 object-contain"
                          />
                        </div>
                        <span className="min-w-0 flex-1 text-left text-[0.86rem] font-medium leading-snug text-[#33425e]">
                          {preset.name}
                          {uploading ? (
                            <span className="mt-0.5 block text-[0.72rem] font-normal text-[#657188]">
                              Uploading…
                            </span>
                          ) : null}
                        </span>
                        {selected && !uploading ? (
                          <span className="shrink-0 text-[#f07c61]" aria-hidden>
                            <IconCheckSeal className="h-4 w-4" />
                          </span>
                        ) : null}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[0.86rem] font-semibold text-[#33425e]">
            {editingAmenityKey ? "Edit custom amenity" : "Custom amenities"}
          </p>
          <p className="text-[0.78rem] text-[#657188]">
            Optional. Paste comma-separated names for amenities not in the list
            above. Known names are matched to standard icons automatically.
          </p>
        </div>

        <div className={AMENITY_CUSTOM_PANEL_CLASS}>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_auto] lg:items-start">
            <div className="min-w-0">
              <label htmlFor="new-amenity-name" className={AMENITY_COMPACT_LABEL_CLASS}>
                {editingAmenityKey ? "Amenity name" : "Amenity names"}
              </label>
              {editingAmenityKey ? (
                <TextInput
                  id="new-amenity-name"
                  value={newAmenityName}
                  onChange={setNewAmenityName}
                  placeholder="Swimming Pool"
                  className={AMENITY_COMPACT_INPUT_CLASS}
                  disabled={isSavingAmenity}
                  required
                  aria-required="true"
                />
              ) : (
                <>
                  <textarea
                    id="new-amenity-name"
                    value={newAmenityName}
                    onChange={(event) => setNewAmenityName(event.target.value)}
                    placeholder="Grand Entrance Lobby, Gymnasium, Multipurpose Hall, Swimming Pool with Deck"
                    rows={4}
                    disabled={isSavingAmenity}
                    required
                    aria-required="true"
                    aria-describedby="new-amenity-names-hint"
                    className={[
                      "w-full border border-[#e0e4eb] bg-white text-[#44506a] outline-none transition focus:border-[#f09684]",
                      AMENITY_COMPACT_TEXTAREA_CLASS,
                    ].join(" ")}
                  />
                  <p
                    id="new-amenity-names-hint"
                    className="mt-1 text-[0.76rem] text-[#657188]"
                  >
                    Paste comma-separated names. Standard names use their own
                    icons; only custom names need the shared image below.
                    {parsedAmenityNameCount > 0 ? (
                      <span className="ml-1 font-semibold text-[#33425e]">
                        {parsedAmenityNameCount} detected
                        {parsedCustomAmenityNameCount > 0
                          ? ` (${parsedCustomAmenityNameCount} custom)`
                          : ""}
                        .
                      </span>
                    ) : null}
                  </p>
                </>
              )}
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="new-amenity-image" className={AMENITY_COMPACT_LABEL_CLASS}>
                  {editingAmenityKey ? "Amenity image" : "Shared amenity image"}
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={useLocalAmenityImage}
                    onChange={(event) =>
                      handleUseLocalAmenityImageChange(event.target.checked)
                    }
                    disabled={isSavingAmenity || isUploadingAmenityImage}
                    className="h-3.5 w-3.5 accent-[#f07c61]"
                    aria-label="Use local image"
                  />
                  <span className="text-[0.78rem] font-semibold text-[#657188]">
                    Use local image
                  </span>
                </label>
              </div>
              <FileUploadField
                id="new-amenity-image"
                layout="inline"
                accept={ALLOWED_UPLOAD_IMAGE_ACCEPT}
                onChange={handleNewAmenityFile}
                valueDisplay={
                  useLocalAmenityImage
                    ? `Local image (ID ${LOCAL_AMENITY_IMAGE_FILE_ID})`
                    : isUploadingAmenityImage
                      ? "Uploading…"
                      : newAmenityFileName
                        ? truncateFileName(newAmenityFileName, 28)
                        : undefined
                }
                inlinePlaceholder={
                  useLocalAmenityImage
                    ? undefined
                    : editingAmenity?.thumbnailSrc && !newAmenityUploadedFileId
                      ? "Replace image"
                      : "Choose image"
                }
                leadingContent={<IconUpload className="h-5 w-5" />}
                dropzoneClassName={MEDIA_UPLOAD_DROPZONE_CLASS}
                inlineContentClassName="gap-2"
                disabled={
                  isSavingAmenity ||
                  isUploadingAmenityImage ||
                  useLocalAmenityImage
                }
                aria-label="Upload amenity image"
              />
            </div>

            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch xl:flex-row xl:items-start">
              <button
                type="button"
                onClick={() => void saveAmenityFromForm()}
                disabled={
                  isSavingAmenity ||
                  isBlockingFileUpload ||
                  isUploadingAmenityImage ||
                  !canSaveAmenityDraft
                }
                className={cn(
                  BUTTON_PRIMARY_CLASS,
                  "h-[48px] shrink-0 px-5 text-[0.88rem] lg:w-auto",
                  (isSavingAmenity ||
                    isBlockingFileUpload ||
                    isUploadingAmenityImage ||
                    !canSaveAmenityDraft) &&
                    "cursor-not-allowed opacity-60",
                )}
              >
                <IconPlus className="h-4 w-4" />
                {isSavingAmenity
                  ? "Saving…"
                  : editingAmenityKey
                    ? "Save"
                    : "Add amenities"}
              </button>
              {editingAmenityKey ? (
                <button
                  type="button"
                  onClick={clearAmenityDraft}
                  disabled={isSavingAmenity}
                  className={cn(
                    BUTTON_OUTLINE_CLASS,
                    "h-[48px] shrink-0 px-4 text-[0.88rem] lg:w-auto",
                    isSavingAmenity && "cursor-not-allowed opacity-60",
                  )}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </div>

          {amenityDraftPreviewSrc || amenityDraftImageFileId || newAmenityError ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {amenityDraftPreviewSrc ? (
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#ece7e1]">
                  <Image
                    src={amenityDraftPreviewSrc}
                    alt="Amenity image preview"
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 object-contain"
                  />
                </div>
              ) : amenityDraftImageFileId ? (
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#ece7e1]">
                  <AmenityImageByFileId
                    imageFileId={amenityDraftImageFileId}
                    alt="Amenity image preview"
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 object-contain"
                  />
                </div>
              ) : null}
              {newAmenityError ? (
                <p className={MEDIA_UPLOAD_ERROR_CLASS}>{newAmenityError}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        {customProjectAmenities.length === 0 ? (
          <p className="text-[0.84rem] text-[#657188]">
            No custom amenities yet. Select standard amenities above or add
            custom names with a shared image.
          </p>
        ) : (
          <div
            className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="group"
            aria-label="Custom amenities"
          >
            {customProjectAmenities.map((opt) => {
              const selected = selectedAmenityKeys.includes(opt.key);
              const isEditing = editingAmenityKey === opt.key;
              return (
                <div
                  key={opt.key}
                  className={cn(
                    AMENITY_CARD_CLASS,
                    isEditing && "ring-2 ring-[#f07c61]/40",
                    selected
                      ? "border-[#f07c61] bg-[#fff8f5]"
                      : "border-[#ece7e1] bg-white hover:border-[#e8d5cf]",
                  )}
                >
                  <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 p-2">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selected}
                      onChange={() => toggleAmenityKey(opt.key)}
                    />
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ece7e1]">
                      {opt.imageFileId != null || opt.thumbnailSrc ? (
                        <AmenityImageByFileId
                          imageFileId={opt.imageFileId}
                          src={opt.thumbnailSrc || undefined}
                          alt=""
                          width={36}
                          height={36}
                          unoptimized
                          className="h-9 w-9 object-contain"
                        />
                      ) : (
                        <IconImageSquare className="h-4 w-4 text-[#657188]" />
                      )}
                    </div>
                    <span className="min-w-0 flex-1 text-left text-[0.86rem] font-medium leading-snug text-[#33425e]">
                      {opt.name}
                    </span>
                    {selected ? (
                      <span className="shrink-0 text-[#f07c61]" aria-hidden>
                        <IconCheckSeal className="h-4 w-4" />
                      </span>
                    ) : null}
                  </label>
                  <div className="mr-2 flex shrink-0 flex-col gap-1 self-center sm:flex-row">
                    <button
                      type="button"
                      onClick={() => startEditAmenity(opt.key)}
                      className="rounded-[8px] border border-[#d7dde6] bg-white px-2 py-0.5 text-[0.68rem] font-semibold text-[#33425e] transition hover:bg-[#fafafa]"
                      aria-label={`Edit ${opt.name}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProjectAmenity(opt.key)}
                      className="rounded-[8px] border border-[#f09684] bg-white px-2 py-0.5 text-[0.68rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                      aria-label={`Remove ${opt.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
              isBlockingFileUpload ||
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
