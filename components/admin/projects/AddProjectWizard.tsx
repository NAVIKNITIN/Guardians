"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FileUploadField } from "@/components/common/FileUploadField";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent, ComponentProps, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  uploadFile as uploadFileRequest,
  uploadFilesBulk,
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
  IconMapPin,
  IconPlus,
  IconRoute,
  IconSave,
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
  getUploadErrorMessage,
  MAX_BULK_UPLOAD_FILE_BYTES,
  formatMaxBulkUploadSizeMb,
} from "@/src/utils/uploadErrorMessage";

type StepId = "basic" | "details" | "location";

type FormState = {
  projectName: string;
  reraNumber: string;
  logoFileName: string;
  heroImageName: string;
  galleryFileNames: string[];
  areaSqft: string;
  propertyType: string;
  description: string;
  /** ISO date `YYYY-MM-DD` for API `completion_date` */
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

type MultiFileUploadResponse = {
  success: boolean;
  message: string;
  data: UploadedFile[];
};

type ProjectMutationResponse = {
  success: boolean;
  data: {
    id: number;
    name: string;
  };
};

type ExistingProjectFiles = {
  logoId: number | null;
  heroId: number | null;
  galleryIds: number[];
};

const steps = [
  { id: "basic", label: "Basic Info & Hero" },
  { id: "details", label: "Details & Media" },
  { id: "location", label: "Location & Connectivity" },
] as const;

/** Gallery SEQUENCE files — exactly this many required on create/update. */
const REQUIRED_GALLERY_IMAGES = 6;

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
  return Boolean(
    section.location.trim() ||
      section.bhkType.trim() ||
      section.priceMin.trim() ||
      section.priceMax.trim(),
  );
}

function buildConfigurationApiPayload(
  section: ConfigurationSection,
): ProjectConfigurationPayload | null {
  if (!configurationSectionHasData(section)) {
    return null;
  }

  const locationText = section.location.trim();

  const row: ProjectConfigurationPayload = {
    bhk_type: section.bhkType.trim(),
    price_min: parsePrice(section.priceMin),
    price_max: parsePrice(section.priceMax),
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

/** `YYYY-MM-DD` for `<input type="date" />` from API string or ISO. */
function toInputDateValue(raw: string | null | undefined): string {
  if (raw == null || raw === "") return "";
  const s = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    return s.slice(0, 10);
  }
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  return d.toISOString().slice(0, 10);
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

type TextInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
} & Omit<
  ComponentProps<"input">,
  "value" | "defaultValue" | "onChange" | "placeholder" | "className"
>;

function TextInput({
  placeholder,
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
      placeholder={placeholder}
      className={[
        "h-[74px] w-full rounded-[20px] border border-[#e0e4eb] bg-white px-7 text-[1.15rem] text-[#44506a] outline-none transition placeholder:text-[#a3acbb] focus:border-[#f09684]",
        className ?? "",
      ].join(" ")}
      {...rest}
    />
  );
}

function TextArea({
  placeholder,
  value,
  onChange,
  className,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <textarea
      rows={4}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={[
        "w-full rounded-[20px] border border-[#e0e4eb] bg-white px-7 py-6 text-[1.15rem] text-[#44506a] outline-none transition placeholder:text-[#a3acbb] focus:border-[#f09684]",
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

function RemoveItemButton({
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
      className={`${BUTTON_OUTLINE_CLASS} h-[54px]`}
    >
      {label}
    </button>
  );
}

export function AddProjectWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");
  const isEditMode = Boolean(projectId);

  const [step, setStep] = useState<StepId>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(isEditMode);
  const [errorMessage, setErrorMessage] = useState("");
  const [galleryLimitNotice, setGalleryLimitNotice] = useState<string | null>(
    null,
  );
  const [galleryUploadError, setGalleryUploadError] = useState<string | null>(
    null,
  );
  const galleryUploadInFlightRef = useRef(0);

  /** Set when an immediate file upload (logo/hero/gallery) is in progress. */
  const [fileUploading, setFileUploading] = useState<{
    logo: boolean;
    hero: boolean;
    gallery: boolean;
  }>({
    logo: false,
    hero: false,
    gallery: false,
  });

  const isAnyFileUploading =
    fileUploading.logo || fileUploading.hero || fileUploading.gallery;

  const [existingProjectFiles, setExistingProjectFiles] =
    useState<ExistingProjectFiles>({
      logoId: null,
      heroId: null,
      galleryIds: [],
    });

  const [form, setForm] = useState<FormState>({
    projectName: "",
    reraNumber: "",
    logoFileName: "",
    heroImageName: "",
    galleryFileNames: [],
    areaSqft: "",
    propertyType: "",
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

  const currentStepIndex = steps.findIndex((item) => item.id === step);
  const isLastStep = currentStepIndex === steps.length - 1;

  /** Bumps each time the load effect re-runs so stale async work never applies state. */
  const projectLoadTokenRef = useRef(0);

  function beginGalleryUpload() {
    galleryUploadInFlightRef.current += 1;
    setFileUploading((s) => ({ ...s, gallery: true }));
  }

  function endGalleryUpload() {
    galleryUploadInFlightRef.current = Math.max(
      0,
      galleryUploadInFlightRef.current - 1,
    );
    if (galleryUploadInFlightRef.current === 0) {
      setFileUploading((s) => ({ ...s, gallery: false }));
    }
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
        const galleryFiles = project.files
          .filter((file) => file.file_type === "SEQUENCE")
          .sort((first, second) => {
            const firstSeq = first.sequence_no ?? 0;
            const secondSeq = second.sequence_no ?? 0;
            return firstSeq - secondSeq;
          });

        setExistingProjectFiles({
          logoId: logoFile?.id ?? null,
          heroId: heroFile?.id ?? null,
          galleryIds: galleryFiles
            .map((file) => file.id)
            .slice(0, REQUIRED_GALLERY_IMAGES),
        });

        setForm({
          projectName: project.name ?? "",
          reraNumber: project.rera_number ?? "",
          logoFileName: logoFile?.file_name ?? "",
          heroImageName: heroFile?.file_name ?? "",
          galleryFileNames: galleryFiles
            .map((file) => file.file_name)
            .slice(0, REQUIRED_GALLERY_IMAGES),
          areaSqft: stripLeadingNumeric(project.area),
          propertyType: project.type ?? "",
          description: project.description ?? "",
          completionDate: toInputDateValue(project.completion_date),
          caseStudyInfo: project.case_study_info ?? "",
          isCompleted: Boolean(
            project.isCompleted ?? (project.status === false),
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

  async function handleLogoFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setForm((current) => ({ ...current, logoFileName: "" }));
      setExistingProjectFiles((f) => ({ ...f, logoId: null }));
      return;
    }
    setFileUploading((s) => ({ ...s, logo: true }));
    setErrorMessage("");
    try {
      const id = await uploadSingleAsset(file, "LOGO");
      setForm((current) => ({ ...current, logoFileName: file.name }));
      setExistingProjectFiles((f) => ({ ...f, logoId: id }));
    } catch (error) {
      setErrorMessage(getUploadErrorMessage(error, "Logo upload failed."));
      setForm((current) => ({ ...current, logoFileName: "" }));
    } finally {
      setFileUploading((s) => ({ ...s, logo: false }));
    }
  }

  async function handleHeroFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setForm((current) => ({ ...current, heroImageName: "" }));
      setExistingProjectFiles((f) => ({ ...f, heroId: null }));
      return;
    }
    setFileUploading((s) => ({ ...s, hero: true }));
    setErrorMessage("");
    try {
      const id = await uploadSingleAsset(file, "HERO");
      setForm((current) => ({ ...current, heroImageName: file.name }));
      setExistingProjectFiles((f) => ({ ...f, heroId: id }));
    } catch (error) {
      setErrorMessage(
        getUploadErrorMessage(error, "Hero image upload failed."),
      );
      setForm((current) => ({ ...current, heroImageName: "" }));
    } finally {
      setFileUploading((s) => ({ ...s, hero: false }));
    }
  }

  function clearGallerySelection() {
    setForm((current) => ({ ...current, galleryFileNames: [] }));
    setExistingProjectFiles((f) => ({ ...f, galleryIds: [] }));
    setGalleryLimitNotice(null);
    setGalleryUploadError(null);
    setErrorMessage("");
  }

  async function handleGalleryFiles(event: ChangeEvent<HTMLInputElement>) {
    const rawFiles = Array.from(event.target.files ?? []);
    const input = event.target;

    if (rawFiles.length === 0) {
      clearGallerySelection();
      input.value = "";
      return;
    }

    const currentCount = existingProjectFiles.galleryIds.length;
    const remaining = REQUIRED_GALLERY_IMAGES - currentCount;

    if (remaining <= 0) {
      setErrorMessage(
        `Gallery already has ${REQUIRED_GALLERY_IMAGES} images. Use “Clear gallery” to replace them.`,
      );
      input.value = "";
      return;
    }

    const filesToUpload =
      rawFiles.length > remaining ? rawFiles.slice(0, remaining) : rawFiles;

    setGalleryLimitNotice(
      rawFiles.length > remaining
        ? `Only ${remaining} more image(s) were added (${REQUIRED_GALLERY_IMAGES} required total). Extra files were not uploaded.`
        : null,
    );

    const oversized = filesToUpload.find(
      (file) => file.size > MAX_BULK_UPLOAD_FILE_BYTES,
    );
    if (oversized) {
      setGalleryUploadError(
        `"${oversized.name}" is over ${formatMaxBulkUploadSizeMb()}. Use smaller images before uploading.`,
      );
      input.value = "";
      return;
    }

    beginGalleryUpload();
    setGalleryUploadError(null);
    setErrorMessage("");
    try {
      const newIds = await uploadGalleryAssets(
        filesToUpload,
        currentCount + 1,
      );
      setForm((current) => ({
        ...current,
        galleryFileNames: [
          ...current.galleryFileNames,
          ...filesToUpload.map((file) => file.name),
        ],
      }));
      setExistingProjectFiles((prev) => ({
        ...prev,
        galleryIds: [...prev.galleryIds, ...newIds],
      }));
    } catch (error) {
      setGalleryLimitNotice(null);
      setGalleryUploadError(
        getUploadErrorMessage(
          error,
          "Gallery image upload failed.",
          MAX_BULK_UPLOAD_FILE_BYTES,
        ),
      );
    } finally {
      endGalleryUpload();
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

  async function uploadSingleAsset(
    file: File,
    fileType: "LOGO" | "HERO" | "ICON",
  ): Promise<number> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_type", fileType);

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

  /** `sequenceStart` is 1-based index of the first file in this batch (for API `sequence_no`). */
  async function uploadGalleryAssets(
    files: File[],
    sequenceStart: number,
  ): Promise<number[]> {
    if (!files.length) return [];

    const formData = new FormData();
    formData.append("file_type", "SEQUENCE");

    files.forEach((file, index) => {
      formData.append("files[]", file);
      formData.append("sequence_no[]", String(sequenceStart + index));
    });

    const result = (await uploadFilesBulk(
      formData,
    )) as MultiFileUploadResponse;

    if (!result.success) {
      throw new Error(
        result.message?.trim() || "Failed to upload gallery images.",
      );
    }

    if (!Array.isArray(result.data)) {
      throw new Error("Invalid response from gallery upload.");
    }

    return result.data.map((item) => item.id);
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

    return {
      name: form.projectName.trim(),
      type: form.propertyType.trim() || null,
      rera_number: form.reraNumber.trim() || null,
      description: form.description.trim() || null,
      area:
        form.areaSqft.trim() === ""
          ? null
          : String(parseOptionalNonNegativeFloat(form.areaSqft) ?? form.areaSqft.trim()),
      completion_date: form.completionDate.trim() || null,
      case_study_info: form.caseStudyInfo.trim() || null,
      isCompleted: form.isCompleted,
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

    if (existingProjectFiles.galleryIds.length !== REQUIRED_GALLERY_IMAGES) {
      setErrorMessage(
        `Exactly ${REQUIRED_GALLERY_IMAGES} gallery images are required (currently ${existingProjectFiles.galleryIds.length}).`,
      );
      return;
    }

    if (configurationSectionHasData(configuration)) {
      if (!configuration.bhkType.trim()) {
        setErrorMessage("Configuration BHK type is required when configuration has data.");
        return;
      }
      if (
        parsePrice(configuration.priceMin) <= 0 ||
        parsePrice(configuration.priceMax) <= 0
      ) {
        setErrorMessage("Configuration price min/max must be valid numbers.");
        return;
      }
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
      if (existingProjectFiles.galleryIds.length > 0) {
        projectFileIds.push(
          ...existingProjectFiles.galleryIds.slice(0, REQUIRED_GALLERY_IMAGES),
        );
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

  async function goToNextStep() {
    if (isLastStep) {
      await publishProject();
      return;
    }

    setStep(steps[currentStepIndex + 1].id);
  }

  const basicFields: Array<{
    key: "projectName" | "reraNumber";
    placeholder: string;
  }> = [
      { key: "projectName", placeholder: "Project Name" },
      { key: "reraNumber", placeholder: "RERA Number" },
    ];

  const locationCoordinateFields: Array<{
    key: "latitude" | "longitude";
    placeholder: string;
  }> = [
      { key: "latitude", placeholder: "Latitude" },
      { key: "longitude", placeholder: "Longitude" },
    ];

  const locationAddressFields: Array<{
    key: "city" | "state";
    placeholder: string;
  }> = [
      { key: "city", placeholder: "City" },
      { key: "state", placeholder: "State" },
    ];

  const locationConnectivityFields: Array<{
    key: "place" | "walkingTime" | "drivingTime";
    placeholder: string;
  }> = [
      { key: "place", placeholder: "Place / Landmark" },
      { key: "walkingTime", placeholder: "Walk (minutes)" },
      { key: "drivingTime", placeholder: "Drive (minutes)" },
    ];

  return (
    <section className="w-full space-y-5">
      <ScrollReveal direction="up" delay={0.04} distance={18}>
        <div className="rounded-[22px] border border-[#e7e4df] bg-white p-2.5 shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
          <div className="grid gap-2.5 lg:grid-cols-3">
            {steps.map((item) => {
              const active = item.id === step;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={[
                    "rounded-[14px] cursor-pointer px-2.5 py-1.5 text-[0.98rem] font-semibold transition md:px-5 md:py-3.5",
                    active
                      ? "btn-primary-gradient text-white shadow-[0_18px_30px_rgba(240,150,132,0.22)]"
                      : "text-[#556179] hover:bg-[#faf6f3]",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {step === "basic" ? (
        <>
          <SectionCard
            icon={<IconInfoCircle className="h-7 w-7" />}
            title="Basic Information"
          >
            <div className="grid gap-2.5 md:gap-5 lg:grid-cols-2">
              {basicFields.map((field) => (
                <TextInput
                  key={field.key}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(value) => updateField(field.key, value)}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            icon={<IconImageSquare className="h-7 w-7" />}
            title="Hero Section"
          >
            <FileUploadField
              key={`logo-${String(existingProjectFiles.logoId)}`}
              id="project-logo"
              label="Logo Upload"
              title="Upload Logo"
              helperText={
                fileUploading.logo
                  ? "Uploading…"
                  : "Select a file to upload. It uploads as soon as you choose it."
              }
              selectedFileNames={
                form.logoFileName ? [form.logoFileName] : []
              }
              leadingContent={<IconUpload className="h-8 w-8" />}
              disabled={fileUploading.logo}
              onChange={handleLogoFile}
            />

            <FileUploadField
              key={`hero-${String(existingProjectFiles.heroId)}`}
              id="project-hero"
              label="Hero Image"
              title="Upload Hero Image"
              helperText={
                fileUploading.hero
                  ? "Uploading…"
                  : "Select a file to upload. It uploads as soon as you choose it."
              }
              selectedFileNames={
                form.heroImageName ? [form.heroImageName] : []
              }
              leadingContent={<IconUpload className="h-8 w-8" />}
              disabled={fileUploading.hero}
              onChange={handleHeroFile}
            />
          </SectionCard>
        </>
      ) : null}

      {step === "details" ? (
        <>
          <SectionCard
            icon={<IconSparkles className="h-7 w-7" />}
            title="Project Highlights"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextInput
                type="number"
                inputMode="decimal"
                min={0}
                step={1}
                placeholder="Area (sq.ft)"
                value={form.areaSqft}
                onChange={(value) => updateField("areaSqft", value)}
              />
              <TextInput
                placeholder="Property Type"
                value={form.propertyType}
                onChange={(value) => updateField("propertyType", value)}
              />
            </div>
            <div className="mt-5 rounded-[16px] border border-[#f1d4cc] bg-[#fff8f5] p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isCompleted}
                  onChange={(event) =>
                    updateField("isCompleted", event.target.checked)
                  }
                  className="h-4 w-4 accent-[#f07c61]"
                />
                <span className="text-[0.96rem] font-semibold text-[#6a3c2f]">
                  Mark this project as completed
                </span>
              </label>
            </div>
          </SectionCard>

          <SectionCard
            icon={<IconSparkles className="h-7 w-7" />}
            title="Configuration"
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <TextInput
                placeholder="Location (shown on project detail & book a visit)"
                value={configuration.location}
                onChange={(value) => updateConfigurationField("location", value)}
                className="lg:col-span-3"
              />
              <TextInput
                placeholder="BHK Type (e.g. 2 BHK)"
                value={configuration.bhkType}
                onChange={(value) => updateConfigurationField("bhkType", value)}
              />
              <TextInput
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                placeholder="Price Min"
                value={configuration.priceMin}
                onChange={(value) => updateConfigurationField("priceMin", value)}
              />
              <TextInput
                type="number"
                inputMode="decimal"
                min={0}
                step={0.01}
                placeholder="Price Max"
                value={configuration.priceMax}
                onChange={(value) => updateConfigurationField("priceMax", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            icon={<IconInfoCircle className="h-7 w-7" />}
            title="Description & case study"
          >
            <div className="space-y-4">
              <p className="text-[1.2rem] font-medium text-[#46536d]">
                Project description
              </p>
              <TextArea
                placeholder="Short description (shown in listings / detail if supported)"
                value={form.description}
                onChange={(value) => updateField("description", value)}
                className="min-h-[120px]"
              />
              <p className="text-[1.2rem] font-medium text-[#46536d]">
                Case study / highlights
              </p>
              <TextArea
                placeholder="Case study, ROI, or other long-form copy"
                value={form.caseStudyInfo}
                onChange={(value) => updateField("caseStudyInfo", value)}
                className="min-h-[120px]"
              />
              <p className="text-[1.2rem] font-medium text-[#46536d]">
                Expected completion
              </p>
              <TextInput
                type="date"
                placeholder="Completion date"
                value={form.completionDate}
                onChange={(value) => updateField("completionDate", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            icon={<IconImageSquare className="h-7 w-7" />}
            title="Project Gallery"
          >
            <FileUploadField
              key={`gallery-${existingProjectFiles.galleryIds.join("-") || "0"}`}
              id="project-gallery"
              label="Project Images"
              title="Upload Project Images"
              helperText={
                fileUploading.gallery
                  ? "Uploading…"
                  : `${existingProjectFiles.galleryIds.length} / ${REQUIRED_GALLERY_IMAGES} images — add more until complete (batch uploads append). Max ${formatMaxBulkUploadSizeMb()} per image.`
              }
              errorText={galleryUploadError ?? undefined}
              selectedFileNames={form.galleryFileNames}
              multiple
              leadingContent={<IconUpload className="h-8 w-8" />}
              disabled={
                fileUploading.gallery ||
                existingProjectFiles.galleryIds.length >= REQUIRED_GALLERY_IMAGES
              }
              onChange={handleGalleryFiles}
            />

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={clearGallerySelection}
                disabled={
                  fileUploading.gallery ||
                  existingProjectFiles.galleryIds.length === 0
                }
                className="inline-flex h-11 cursor-pointer items-center justify-center rounded-[12px] border border-[#f09684] px-5 text-[0.88rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear gallery
              </button>
            </div>

            {galleryLimitNotice ? (
              <p className="mt-2 text-[0.95rem] font-medium text-[#b45309]">
                {galleryLimitNotice}
              </p>
            ) : null}

            <p className="text-[1rem] text-[#657188]">
              Required: exactly {REQUIRED_GALLERY_IMAGES} gallery images to create or
              update a project. Recommended: high-quality images (minimum 1920×1080px).
            </p>
          </SectionCard>

          <SectionCard
            icon={<IconSparkles className="h-7 w-7" />}
            title="Amenities & Features"
          >
            <p className="text-[0.98rem] leading-relaxed text-[#657188]">
              Select one or more amenities. Name and image file ids are sent in the
              project payload, same as before — images are taken from the preset
              catalog (update{" "}
              <code className="rounded bg-[#f0f4f8] px-1 text-[0.85rem]">
                lib/admin/amenityCatalog.ts
              </code>{" "}
              if your file ids differ).
            </p>
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
        </>
      ) : null}

      {step === "location" ? (
        <div className="space-y-4">
          <div className="rounded-[20px] border border-[#e5ebf3] bg-[#f8fafc] px-5 py-4 text-[0.95rem] leading-relaxed text-[#4a5568]">
            <p className="font-semibold text-[#0d1e46]">How multiple locations are saved</p>
            <p className="mt-1.5">
              The top card is <code className="text-[0.88rem]">locations[0]</code> in
              the API, the next is <code className="text-[0.88rem]">locations[1]</code>
              , and so on. Data you enter in the second block only updates the second
              item — it does not fill the first. To make your main address the first
              entry, edit the first card or remove an unused card with
              &quot;Remove full section&quot; (when two or more are shown).
            </p>
          </div>
          {locationSections.map((section, index) => (
            <SectionCard
              key={`loc-${String(section.id)}-${index}`}
              icon={<IconMapPin className="h-7 w-7" />}
              title={`Location & Connectivity — ${index + 1} of ${locationSections.length} `}
              titleClassName="font-nexa text-[clamp(1.5rem,2.4vw,2.75rem)] font-bold leading-tight text-[#081a43] sm:leading-none"
            >
              <TextArea
                placeholder="Full Address"
                value={section.fullAddress}
                onChange={(value) =>
                  updateLocationSection(section.id, "fullAddress", value)
                }
                className="min-h-[150px]"
              />

              <div className="grid gap-5 lg:grid-cols-2">
                {locationCoordinateFields.map((field) => (
                  <TextInput
                    key={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    placeholder={field.placeholder}
                    value={section[field.key]}
                    onChange={(value) =>
                      updateLocationSection(section.id, field.key, value)
                    }
                  />
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {locationAddressFields.map((field) => (
                  <TextInput
                    key={field.key}
                    placeholder={field.placeholder}
                    value={section[field.key]}
                    onChange={(value) =>
                      updateLocationSection(section.id, field.key, value)
                    }
                  />
                ))}
                {/* Pincode — disabled in admin (not sent on create/update).
                <TextInput
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={10}
                  placeholder="Pincode"
                  value={section.pincode}
                  onChange={(value) =>
                    updateLocationSection(section.id, "pincode", value)
                  }
                />
                */}
              </div>

              <div className="border-t border-[#efede9] pt-6">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-[#fff3ed] text-[#f07c61]">
                    <IconRoute className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-nexa text-[1.35rem] font-bold leading-tight text-[#33425e] sm:text-[1.45rem]">
                      Nearby connectivity
                    </h3>
                    <p className="mt-1 n-reg text-[0.8rem] text-[#6b7a90] sm:text-sm">
                      Walk and drive times are stored and shown in minutes.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {locationConnectivityFields.map((field) => (
                    <TextInput
                      key={field.key}
                      type={
                        field.key === "place" ? "text" : "number"
                      }
                      inputMode={
                        field.key === "place" ? undefined : "decimal"
                      }
                      min={field.key === "place" ? undefined : 0}
                      step={field.key === "place" ? undefined : 1}
                      placeholder={field.placeholder}
                      value={section[field.key]}
                      onChange={(value) =>
                        updateLocationSection(section.id, field.key, value)
                      }
                    />
                  ))}
                </div>
              </div>

              {locationSections.length > 1 ? (
                <div className="flex justify-end">
                  <RemoveItemButton
                    label="Remove Full Section"
                    onClick={() => removeLocationSection(section.id)}
                  />
                </div>
              ) : null}
            </SectionCard>
          ))}

          <div className="flex justify-end">
            <AddItemButton label="Add Connectivity" onClick={addLocationSection} />
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {errorMessage ? (
          <p className="text-sm font-medium text-[#d05c43]">{errorMessage}</p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={goToNextStep}
            disabled={
              isSubmitting ||
              isLoadingProject ||
              isAnyFileUploading ||
              (isLastStep &&
                existingProjectFiles.galleryIds.length !==
                  REQUIRED_GALLERY_IMAGES)
            }
            className={`${BUTTON_PRIMARY_CLASS} h-[52px] w-full px-7 text-[0.98rem] transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto`}
          >
            {isLastStep ? (
              <IconCheckSeal className="h-5 w-5" />
            ) : (
              <IconSave className="h-5 w-5" />
            )}
            <span>
              {isLoadingProject
                ? "Loading..."
                : isSubmitting
                  ? isEditMode
                    ? "Updating..."
                    : "Creating…"
                  : isLastStep
                    ? isEditMode
                      ? "Update Project"
                      : "Create Project"
                    : "Next"}
            </span>
          </button>
        </div>

        {isLastStep &&
        existingProjectFiles.galleryIds.length !== REQUIRED_GALLERY_IMAGES ? (
          <p className="text-end text-[0.88rem] font-medium text-[#657188]">
            Add {REQUIRED_GALLERY_IMAGES - existingProjectFiles.galleryIds.length}{" "}
            more gallery image
            {REQUIRED_GALLERY_IMAGES - existingProjectFiles.galleryIds.length === 1
              ? ""
              : "s"}{" "}
            on the Details step ({existingProjectFiles.galleryIds.length}/
            {REQUIRED_GALLERY_IMAGES}).
          </p>
        ) : null}
      </div>
    </section>
  );
}
