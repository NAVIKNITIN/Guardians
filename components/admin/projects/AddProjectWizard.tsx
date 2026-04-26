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

type StepId = "basic" | "details" | "location";

type FormState = {
  projectName: string;
  reraNumber: string;
  logoFileName: string;
  heroImageName: string;
  galleryFileNames: string[];
  areaSqft: string;
  propertyType: string;
  configuration: string;
  startingPrice: string;
};

type Amenity = {
  id: number;
  name: string;
  imageFileName: string;
  existingImageId: number | null;
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
  price_min: number;
  price_max: number;
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
  type: string | null;
  rera_number: string | null;
  area: string | null;
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

function createEmptyAmenity(id = createLocalId()): Amenity {
  return {
    id,
    name: "",
    imageFileName: "",
    existingImageId: null,
  };
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

function parsePrice(value: string) {
  const normalized = value.replace(/[^0-9.]/g, "");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
}

function toTextValue(value: string | number | null | undefined) {
  return value == null ? "" : String(value);
}

function mapProjectLocationsToSections(
  locations: ProjectLocation[],
): LocationConnectivitySection[] {
  if (locations.length === 0) {
    return [createEmptyLocationSection(1)];
  }

  return locations.map((location) => {
    const shouldShowPlace = Boolean(
      location.walking_time ||
      location.driving_time ||
      (location.place_name && location.place_name !== location.city),
    );

    return {
      id: location.id,
      fullAddress: location.address ?? "",
      latitude: toTextValue(location.latitude),
      longitude: toTextValue(location.longitude),
      city: location.city ?? "",
      state: location.state ?? "",
      pincode: location.pincode ?? "",
      place: shouldShowPlace ? location.place_name ?? "" : "",
      walkingTime: location.walking_time ?? "",
      drivingTime: location.driving_time ?? "",
    };
  });
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
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
      <div className="flex items-center gap-4 border-b border-[#efede9] p-2 md:p-4">
        <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-[#fff3ed] text-[#f07c61]">
          {icon}
        </div>

        <h2 className="qs-reg text-[clamp(2.2rem,3vw,3.15rem)] leading-none text-[#081a43]">
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
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <input
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

  /** Set when an immediate file upload (logo/hero/gallery/amenity) is in progress. */
  const [fileUploading, setFileUploading] = useState<{
    logo: boolean;
    hero: boolean;
    gallery: boolean;
    amenityId: number | null;
  }>({
    logo: false,
    hero: false,
    gallery: false,
    amenityId: null,
  });

  const isAnyFileUploading =
    fileUploading.logo ||
    fileUploading.hero ||
    fileUploading.gallery ||
    fileUploading.amenityId != null;

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
    configuration: "",
    startingPrice: "",
  });

  const [amenities, setAmenities] = useState<Amenity[]>([createEmptyAmenity(1)]);

  const [locationSections, setLocationSections] = useState<
    LocationConnectivitySection[]
  >([createEmptyLocationSection(1)]);

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

        const primaryConfiguration = project.configurations[0] ?? null;

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
          configuration: primaryConfiguration?.bhk_type ?? "",
          startingPrice: primaryConfiguration
            ? String(primaryConfiguration.price_min)
            : "",
        });

        const mappedLocationSections = mapProjectLocationsToSections(
          project.locations,
        );

        setLocationSections(mappedLocationSections);

        setAmenities(
          project.amenities.length > 0
            ? project.amenities.map((item) => ({
              id: item.id,
              name: item.name,
              imageFileName: item.amenities_image_id
                ? "Existing image linked"
                : "",
              existingImageId: item.amenities_image_id,
            }))
            : [createEmptyAmenity(1)],
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
    setLocationSections((current) =>
      current.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  }

  function addLocationSection() {
    setLocationSections((current) => [...current, createEmptyLocationSection()]);
  }

  function removeLocationSection(id: number) {
    setLocationSections((current) => {
      if (current.length <= 1) return current;
      return current.filter((item) => item.id !== id);
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

  function addAmenity() {
    setAmenities((current) => [...current, createEmptyAmenity()]);
  }

  function updateAmenityName(id: number, value: string) {
    setAmenities((current) =>
      current.map((item) => (item.id === id ? { ...item, name: value } : item)),
    );
  }

  async function updateAmenityImage(
    amenityId: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setAmenities((current) =>
        current.map((item) =>
          item.id === amenityId
            ? { ...item, imageFileName: "", existingImageId: null }
            : item,
        ),
      );
      return;
    }
    setFileUploading((s) => ({ ...s, amenityId }));
    setErrorMessage("");
    try {
      const imageId = await uploadSingleAsset(file, "ICON");
      setAmenities((current) =>
        current.map((item) =>
          item.id === amenityId
            ? {
              ...item,
              imageFileName: file.name,
              existingImageId: imageId,
            }
            : item,
        ),
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Amenity image upload failed.",
      );
      setAmenities((current) =>
        current.map((item) =>
          item.id === amenityId
            ? { ...item, imageFileName: "", existingImageId: null }
            : item,
        ),
      );
    } finally {
      setFileUploading((s) => ({ ...s, amenityId: null }));
    }
  }

  function removeAmenity(id: number) {
    setAmenities((current) => {
      if (current.length <= 1) return current;
      return current.filter((item) => item.id !== id);
    });
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

  function getPreparedAmenities() {
    const activeAmenities = amenities.filter(
      (item) => item.name.trim() || item.existingImageId,
    );

    for (const amenity of activeAmenities) {
      if (!amenity.name.trim()) {
        throw new Error("Amenity name required for uploaded amenity image.");
      }

      if (!amenity.existingImageId) {
        throw new Error(`Amenity image required for "${amenity.name.trim()}".`);
      }
    }

    return activeAmenities;
  }

  function buildProjectPayload(
    projectFileIds: number[],
    amenityPayload: Array<{ name: string; amenities_image_id: number }>,
  ) {
    const configurationName = form.configuration.trim();
    const normalizedPrice = parsePrice(form.startingPrice);

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
        city: section.city.trim() || null,
        state: section.state.trim() || null,
        country: "India",
        address: section.fullAddress.trim() || null,
        pincode: section.pincode.trim() || null,
        latitude: section.latitude.trim() || null,
        longitude: section.longitude.trim() || null,
        walking_time: section.walkingTime.trim() || null,
        driving_time: section.drivingTime.trim() || null,
      }));

    return {
      name: form.projectName.trim(),
      type: form.propertyType.trim() || null,
      rera_number: form.reraNumber.trim() || null,
      description: null,
      area: form.areaSqft.trim() || null,
      completion_date: null,
      case_study_info: null,
      files: projectFileIds.map((file_id) => ({ file_id })),
      configurations:
        configurationName && normalizedPrice > 0
          ? [
            {
              bhk_type: configurationName,
              price_min: normalizedPrice,
              price_max: normalizedPrice,
            },
          ]
          : [],
      locations,
      amenities: amenityPayload,
    };
  }

  async function publishProject() {
    setErrorMessage("");

    const hasProjectName = Boolean(form.projectName.trim());
    const hasConfiguration = Boolean(form.configuration.trim());
    const hasStartingPrice = Boolean(form.startingPrice.trim());
    const normalizedPrice = parsePrice(form.startingPrice);

    if (!hasProjectName) {
      setErrorMessage("Project Name is required.");
      return;
    }

    if (hasConfiguration !== hasStartingPrice) {
      setErrorMessage("Configuration and Starting Price dono fields saath me bharo.");
      return;
    }

    if (hasStartingPrice && normalizedPrice <= 0) {
      setErrorMessage("Starting Price valid number me bharo.");
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
    key: "areaSqft" | "propertyType" | "configuration" | "startingPrice";
    placeholder: string;
  }> = [
      { key: "areaSqft", placeholder: "Area (sq.ft)" },
      { key: "propertyType", placeholder: "Property Type" },
      { key: "configuration", placeholder: "Configuration" },
      { key: "startingPrice", placeholder: "Starting Price" },
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
      { key: "walkingTime", placeholder: "Walking Time" },
      { key: "drivingTime", placeholder: "Driving Time" },
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
            <div className="space-y-4">
              {amenities.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-[24px] border border-[#ece7e1] bg-[#fffdfa] p-4"
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <TextInput
                      placeholder={
                        index === 0 ? "Amenity Name" : `Amenity Name ${index + 1}`
                      }
                      value={item.name}
                      onChange={(value) => updateAmenityName(item.id, value)}
                    />

                    <FileUploadField
                      key={`ament-${item.id}-${String(item.existingImageId)}`}
                      layout="inline"
                      id={`amenity-image-${item.id}`}
                      valueDisplay={
                        fileUploading.amenityId === item.id
                          ? "Uploading…"
                          : item.imageFileName
                      }
                      inlinePlaceholder="Upload Amenity Image"
                      leadingContent={<IconUpload className="h-5 w-5" />}
                      disabled={fileUploading.amenityId != null}
                      onChange={(event) => updateAmenityImage(item.id, event)}
                    />
                  </div>

                  {amenities.length > 1 ? (
                    <div className="mt-4 flex justify-end">
                      <RemoveItemButton
                        label="Remove Amenity"
                        onClick={() => removeAmenity(item.id)}
                      />
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="flex justify-end">
                <AddItemButton label="Add Amenity" onClick={addAmenity} />
              </div>
            </div>
          </SectionCard>
        </>
      ) : null}

      {step === "location" ? (
        <div className="space-y-4">
          {locationSections.map((section, index) => (
            <SectionCard
              key={section.id}
              icon={<IconMapPin className="h-7 w-7" />}
              title={
                index === 0
                  ? "Project Location & Connectivity"
                  : `Location & Connectivity ${index + 1}`
              }
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

                  <div>
                    <h3 className="text-[1.45rem] font-semibold text-[#33425e]">
                      Nearby Connectivity
                    </h3>
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
