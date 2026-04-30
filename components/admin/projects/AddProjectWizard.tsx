"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { FileUploadField } from "@/components/common/FileUploadField";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent, ReactNode } from "react";
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
  /** API compatibility: `false` = completed, `true` = ongoing/active. */
  isCompleted: boolean;
};

type ConfigurationSection = {
  id: number;
  bhkType: string;
  priceMin: string;
  priceMax: string;
  carpetArea: string;
  builtupArea: string;
  totalUnits: string;
  availableUnits: string;
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
  bhk_type: string;
  price_min: number | string | null;
  price_max: number | string | null;
  carpet_area?: string | null;
  builtup_area?: string | null;
  total_units?: number | string | null;
  available_units?: number | string | null;
};

type ProjectLocation = {
  id: number;
  place_name: string;
  city: string | null;
  state: string | null;
  country: string | null;
  address: string | null;
  pincode: string | null;
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
    pincode: "",
    place: "",
    walkingTime: "",
    drivingTime: "",
  };
}

function createEmptyConfigurationSection(id = createLocalId()): ConfigurationSection {
  return {
    id,
    bhkType: "",
    priceMin: "",
    priceMax: "",
    carpetArea: "",
    builtupArea: "",
    totalUnits: "",
    availableUnits: "",
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
    pincode: trimSectionValue(location.pincode),
    // Always map API `place_name` to the "Place / Landmark" field (was dropped when
    // place_name === city and no walk/drive times, which killed round-trips to the API).
    place: trimSectionValue(location.place_name),
    walkingTime: trimSectionValue(location.walking_time),
    drivingTime: trimSectionValue(location.driving_time),
  }));
}

function mapProjectConfigurationsToSections(
  configurations: ProjectConfiguration[],
): ConfigurationSection[] {
  if (configurations.length === 0) {
    return [createEmptyConfigurationSection()];
  }

  return configurations.map((configuration) => ({
    id: toSectionId(configuration.id),
    bhkType: trimSectionValue(configuration.bhk_type),
    priceMin: trimSectionValue(configuration.price_min),
    priceMax: trimSectionValue(configuration.price_max),
    carpetArea: trimSectionValue(configuration.carpet_area),
    builtupArea: trimSectionValue(configuration.builtup_area),
    totalUnits: trimSectionValue(configuration.total_units),
    availableUnits: trimSectionValue(configuration.available_units),
  }));
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

function TextInput({
  placeholder,
  value,
  onChange,
  className,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: string;
}) {
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
  const [configurationSections, setConfigurationSections] = useState<
    ConfigurationSection[]
  >([createEmptyConfigurationSection()]);

  const [locationSections, setLocationSections] = useState<
    LocationConnectivitySection[]
  >([createEmptyLocationSection()]);

  const currentStepIndex = steps.findIndex((item) => item.id === step);
  const isLastStep = currentStepIndex === steps.length - 1;

  /** Bumps each time the load effect re-runs so stale async work never applies state. */
  const projectLoadTokenRef = useRef(0);

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
          galleryIds: galleryFiles.map((file) => file.id),
        });

        setForm({
          projectName: project.name ?? "",
          reraNumber: project.rera_number ?? "",
          logoFileName: logoFile?.file_name ?? "",
          heroImageName: heroFile?.file_name ?? "",
          galleryFileNames: galleryFiles.map((file) => file.file_name),
          areaSqft: project.area ?? "",
          propertyType: project.type ?? "",
          description: project.description ?? "",
          completionDate: toInputDateValue(project.completion_date),
          caseStudyInfo: project.case_study_info ?? "",
          isCompleted: project.status === false,
        });

        setConfigurationSections(
          mapProjectConfigurationsToSections(project.configurations),
        );

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

  function updateConfigurationSection<
    Key extends keyof Omit<ConfigurationSection, "id">,
  >(id: number, key: Key, value: ConfigurationSection[Key]) {
    const rowId = Number(id);
    setConfigurationSections((current) =>
      current.map((item) =>
        Number(item.id) === rowId ? { ...item, [key]: value } : item,
      ),
    );
  }

  function addConfigurationSection() {
    setConfigurationSections((current) => [
      ...current,
      createEmptyConfigurationSection(),
    ]);
  }

  function removeConfigurationSection(id: number) {
    const rowId = Number(id);
    setConfigurationSections((current) => {
      if (current.length <= 1) return current;
      return current.filter((item) => Number(item.id) !== rowId);
    });
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
      setErrorMessage(
        error instanceof Error ? error.message : "Logo upload failed.",
      );
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
        error instanceof Error ? error.message : "Hero image upload failed.",
      );
      setForm((current) => ({ ...current, heroImageName: "" }));
    } finally {
      setFileUploading((s) => ({ ...s, hero: false }));
    }
  }

  async function handleGalleryFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) {
      setForm((current) => ({ ...current, galleryFileNames: [] }));
      setExistingProjectFiles((f) => ({ ...f, galleryIds: [] }));
      return;
    }
    setFileUploading((s) => ({ ...s, gallery: true }));
    setErrorMessage("");
    try {
      const ids = await uploadGalleryAssets(files);
      setForm((current) => ({
        ...current,
        galleryFileNames: files.map((f) => f.name),
      }));
      setExistingProjectFiles((f) => ({ ...f, galleryIds: ids }));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Gallery image upload failed.",
      );
      setForm((current) => ({ ...current, galleryFileNames: [] }));
      setExistingProjectFiles((f) => ({ ...f, galleryIds: [] }));
    } finally {
      setFileUploading((s) => ({ ...s, gallery: false }));
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
      throw new Error(`Failed to upload ${fileType.toLowerCase()} file.`);
    }

    return result.data.id;
  }

  async function uploadGalleryAssets(files: File[]): Promise<number[]> {
    if (!files.length) return [];

    const formData = new FormData();
    formData.append("file_type", "SEQUENCE");

    files.forEach((file, index) => {
      formData.append("files[]", file);
      formData.append("sequence_no[]", String(index + 1));
    });

    const result = (await uploadFilesBulk(
      formData,
    )) as MultiFileUploadResponse;

    if (!result.success) {
      throw new Error("Failed to upload gallery images.");
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
    const configurations = configurationSections
      .filter((section) =>
        Boolean(
          section.bhkType.trim() ||
            section.priceMin.trim() ||
            section.priceMax.trim() ||
            section.carpetArea.trim() ||
            section.builtupArea.trim() ||
            section.totalUnits.trim() ||
            section.availableUnits.trim(),
        ),
      )
      .map((section) => ({
        bhk_type: section.bhkType.trim(),
        price_min: parsePrice(section.priceMin),
        price_max: parsePrice(section.priceMax),
        carpet_area: section.carpetArea.trim() || null,
        builtup_area: section.builtupArea.trim() || null,
        total_units: parseInteger(section.totalUnits),
        available_units: parseInteger(section.availableUnits),
      }));

    const locations = locationSections
      .filter((section) =>
        Boolean(
          section.fullAddress.trim() ||
          section.latitude.trim() ||
          section.longitude.trim() ||
          section.city.trim() ||
          section.state.trim() ||
          section.pincode.trim() ||
          section.place.trim() ||
          section.walkingTime.trim() ||
          section.drivingTime.trim(),
        ),
      )
      .map((section) => ({
        place_name:
          section.place.trim() ||
          section.city.trim() ||
          form.projectName.trim() ||
          "Project Location",
        country: "India",
        city: toLaravelLocationString(section.city),
        state: toLaravelLocationString(section.state),
        address: toLaravelLocationString(section.fullAddress),
        pincode: toLaravelLocationString(section.pincode),
        latitude: toLaravelLocationString(section.latitude),
        longitude: toLaravelLocationString(section.longitude),
        walking_time: toLaravelLocationString(section.walkingTime),
        driving_time: toLaravelLocationString(section.drivingTime),
      }));

    return {
      name: form.projectName.trim(),
      type: form.propertyType.trim() || null,
      rera_number: form.reraNumber.trim() || null,
      description: form.description.trim() || null,
      area: form.areaSqft.trim() || null,
      completion_date: form.completionDate.trim() || null,
      case_study_info: form.caseStudyInfo.trim() || null,
      status: form.isCompleted ? false : true,
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

    for (const section of configurationSections) {
      const hasAny =
        Boolean(section.bhkType.trim()) ||
        Boolean(section.priceMin.trim()) ||
        Boolean(section.priceMax.trim()) ||
        Boolean(section.carpetArea.trim()) ||
        Boolean(section.builtupArea.trim()) ||
        Boolean(section.totalUnits.trim()) ||
        Boolean(section.availableUnits.trim());
      if (!hasAny) continue;
      if (!section.bhkType.trim()) {
        setErrorMessage("Configuration BHK type is required when row has data.");
        return;
      }
      if (parsePrice(section.priceMin) <= 0 || parsePrice(section.priceMax) <= 0) {
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
        projectFileIds.push(...existingProjectFiles.galleryIds);
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

  const detailsFields: Array<{
    key: "areaSqft" | "propertyType";
    placeholder: string;
  }> = [
      { key: "areaSqft", placeholder: "Area (sq.ft)" },
      { key: "propertyType", placeholder: "Property Type" },
    ];

  const locationCoordinateFields: Array<{
    key: "latitude" | "longitude";
    placeholder: string;
  }> = [
      { key: "latitude", placeholder: "Latitude" },
      { key: "longitude", placeholder: "Longitude" },
    ];

  const locationAddressFields: Array<{
    key: "city" | "state" | "pincode";
    placeholder: string;
  }> = [
      { key: "city", placeholder: "City" },
      { key: "state", placeholder: "State" },
      { key: "pincode", placeholder: "Pincode" },
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
              {detailsFields.map((field) => (
                <TextInput
                  key={field.key}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(value) => updateField(field.key, value)}
                />
              ))}
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
            title="Configurations"
          >
            <div className="space-y-4">
              {configurationSections.map((section, index) => (
                <div
                  key={`cfg-${String(section.id)}-${index}`}
                  className="space-y-4 rounded-[18px] border border-[#ece7e1] bg-[#fcfcfb] p-4"
                >
                  <p className="text-[0.95rem] font-semibold text-[#44506a]">
                    Configuration {index + 1}
                  </p>
                  <div className="grid gap-4 lg:grid-cols-3">
                    <TextInput
                      placeholder="BHK Type (e.g. 2 BHK)"
                      value={section.bhkType}
                      onChange={(value) =>
                        updateConfigurationSection(section.id, "bhkType", value)
                      }
                    />
                    <TextInput
                      placeholder="Price Min"
                      value={section.priceMin}
                      onChange={(value) =>
                        updateConfigurationSection(section.id, "priceMin", value)
                      }
                    />
                    <TextInput
                      placeholder="Price Max"
                      value={section.priceMax}
                      onChange={(value) =>
                        updateConfigurationSection(section.id, "priceMax", value)
                      }
                    />
                    <TextInput
                      placeholder="Carpet Area"
                      value={section.carpetArea}
                      onChange={(value) =>
                        updateConfigurationSection(section.id, "carpetArea", value)
                      }
                    />
                    <TextInput
                      placeholder="Built-up Area"
                      value={section.builtupArea}
                      onChange={(value) =>
                        updateConfigurationSection(section.id, "builtupArea", value)
                      }
                    />
                    <TextInput
                      placeholder="Total Units"
                      value={section.totalUnits}
                      onChange={(value) =>
                        updateConfigurationSection(section.id, "totalUnits", value)
                      }
                    />
                    <TextInput
                      placeholder="Available Units"
                      value={section.availableUnits}
                      onChange={(value) =>
                        updateConfigurationSection(section.id, "availableUnits", value)
                      }
                    />
                  </div>
                  {configurationSections.length > 1 ? (
                    <div className="flex justify-end">
                      <RemoveItemButton
                        label="Remove Configuration"
                        onClick={() => removeConfigurationSection(section.id)}
                      />
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="flex justify-end">
                <AddItemButton
                  label="Add Configuration"
                  onClick={addConfigurationSection}
                />
              </div>
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
                  : "Select images; they upload as soon as you confirm your selection."
              }
              selectedFileNames={form.galleryFileNames}
              multiple
              leadingContent={<IconUpload className="h-8 w-8" />}
              disabled={fileUploading.gallery}
              onChange={handleGalleryFiles}
            />

            <p className="text-[1rem] text-[#657188]">
              Recommended: Upload high-quality images (minimum 1920x1080px)
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
                    placeholder={field.placeholder}
                    value={section[field.key]}
                    onChange={(value) =>
                      updateLocationSection(section.id, field.key, value)
                    }
                  />
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
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
            disabled={isSubmitting || isLoadingProject || isAnyFileUploading}
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
      </div>
    </section>
  );
}
