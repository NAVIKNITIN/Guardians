"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/api";
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

type StepId = "basic" | "details" | "location";

type FormState = {
  projectName: string;
  reraNumber: string;
  logoFileName: string;
  heroImageName: string;
  galleryFileNames: string[];
  logoFile: File | null;
  heroImageFile: File | null;
  galleryFiles: File[];
  areaSqft: string;
  propertyType: string;
  configuration: string;
  startingPrice: string;
};

type Amenity = {
  id: number;
  name: string;
  imageFileName: string;
  imageFile: File | null;
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

function createLocalId() {
  return Date.now() + Math.floor(Math.random() * 1000);
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
      pincode: "",
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
    <section className="rounded-[30px] border border-[#e7e4df] bg-white shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
      <div className="flex items-center gap-4 border-b border-[#efede9] px-6 py-7 sm:px-9">
        <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-[#fff3ed] text-[#f07c61]">
          {icon}
        </div>

        <h2 className="qs-reg text-[clamp(2.2rem,3vw,3.15rem)] leading-none text-[#081a43]">
          {title}
        </h2>
      </div>

      <div className="space-y-6 px-6 py-7 sm:px-9 sm:py-8">{children}</div>
    </section>
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

function UploadField({
  id,
  label,
  title,
  helper,
  files,
  multiple = false,
  onChange,
}: {
  id: string;
  label: string;
  title: string;
  helper: string;
  files: string[];
  multiple?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[1.2rem] font-medium text-[#46536d]">{label}</p>

      <label
        htmlFor={id}
        className="group flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-[30px] border-2 border-dashed border-[#d7dde6] bg-white px-6 text-center transition hover:border-[#f09684]"
      >
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#fff3ed] text-[#f07c61]">
          <IconUpload className="h-8 w-8" />
        </div>

        <p className="mt-6 text-[1.9rem] font-medium text-[#33425e]">{title}</p>
        <p className="mt-2 text-[1.08rem] text-[#9ca6b8]">{helper}</p>

        <input
          id={id}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={onChange}
          className="hidden"
        />
      </label>

      {files.length > 0 ? (
        <div className="rounded-[18px] bg-[#fff8f5] px-5 py-4 text-[1rem] text-[#7a6a60]">
          {files.join(", ")}
        </div>
      ) : null}
    </div>
  );
}

function AmenityImageField({
  id,
  fileName,
  onChange,
}: {
  id: string;
  fileName: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex h-[74px] cursor-pointer items-center justify-center rounded-[20px] border-2 border-dashed border-[#d7dde6] bg-white px-5 text-center transition hover:border-[#f09684]"
    >
      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />

      <div className="flex items-center gap-3 text-[#f07c61]">
        <IconUpload className="h-5 w-5" />
        <span className="max-w-[180px] truncate text-[1rem] font-semibold">
          {fileName || "Upload Amenity Image"}
        </span>
      </div>
    </label>
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
    logoFile: null,
    heroImageFile: null,
    galleryFiles: [],
    areaSqft: "",
    propertyType: "",
    configuration: "",
    startingPrice: "",
  });

  const [amenities, setAmenities] = useState<Amenity[]>([
    {
      id: 1,
      name: "",
      imageFileName: "",
      imageFile: null,
      existingImageId: null,
    },
  ]);

  const [locationSections, setLocationSections] = useState<
    LocationConnectivitySection[]
  >([createEmptyLocationSection(1)]);

  const currentStepIndex = steps.findIndex((item) => item.id === step);
  const isLastStep = currentStepIndex === steps.length - 1;

  useEffect(() => {
    if (!projectId) {
      setIsLoadingProject(false);
      return;
    }

    let isMounted = true;

    async function loadProject() {
      try {
        setIsLoadingProject(true);
        setErrorMessage("");

        const result = await apiClient.get<ProjectDetailsResponse>(
          `/projects/${projectId}`,
        );

        if (!result.success) {
          throw new Error("Failed to load project details.");
        }

        if (!isMounted) return;

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
          logoFile: null,
          heroImageFile: null,
          galleryFiles: [],
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
                imageFile: null,
                existingImageId: item.amenities_image_id,
              }))
            : [
                {
                  id: 1,
                  name: "",
                  imageFileName: "",
                  imageFile: null,
                  existingImageId: null,
                },
              ],
        );
      } catch (error) {
        if (!isMounted) return;

        setErrorMessage(
          error instanceof Error ? error.message : "Something went wrong.",
        );
      } finally {
        if (isMounted) {
          setIsLoadingProject(false);
        }
      }
    }

    loadProject();

    return () => {
      isMounted = false;
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

  function handleSingleFile(
    nameKey: "logoFileName" | "heroImageName",
    fileKey: "logoFile" | "heroImageFile",
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0] ?? null;

    setForm((current) => ({
      ...current,
      [nameKey]: file ? file.name : "",
      [fileKey]: file,
    }));
  }

  function handleGalleryFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    setForm((current) => ({
      ...current,
      galleryFiles: files,
      galleryFileNames: files.map((file) => file.name),
    }));
  }

  function addAmenity() {
    setAmenities((current) => [
      ...current,
      {
        id: createLocalId(),
        name: "",
        imageFileName: "",
        imageFile: null,
        existingImageId: null,
      },
    ]);
  }

  function updateAmenityName(id: number, value: string) {
    setAmenities((current) =>
      current.map((item) => (item.id === id ? { ...item, name: value } : item)),
    );
  }

  function updateAmenityImage(id: number, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setAmenities((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              imageFileName: file ? file.name : "",
              imageFile: file,
            }
          : item,
      ),
    );
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

    const result = await apiClient.postForm<SingleFileUploadResponse>(
      "/files/upload",
      formData,
    );

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

    const result = await apiClient.postForm<MultiFileUploadResponse>(
      "/files/bulk-upload",
      formData,
    );

    if (!result.success) {
      throw new Error("Failed to upload gallery images.");
    }

    return result.data.map((item) => item.id);
  }

  function getPreparedAmenities() {
    const activeAmenities = amenities.filter(
      (item) => item.name.trim() || item.imageFile || item.existingImageId,
    );

    for (const amenity of activeAmenities) {
      if (!amenity.name.trim()) {
        throw new Error("Amenity name required for uploaded amenity image.");
      }

      if (!amenity.imageFile && !amenity.existingImageId) {
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
        address:
          [section.fullAddress.trim(), section.pincode.trim()]
            .filter(Boolean)
            .join(", ") || null,
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

      if (form.logoFile) {
        projectFileIds.push(await uploadSingleAsset(form.logoFile, "LOGO"));
      } else if (existingProjectFiles.logoId) {
        projectFileIds.push(existingProjectFiles.logoId);
      }

      if (form.heroImageFile) {
        projectFileIds.push(await uploadSingleAsset(form.heroImageFile, "HERO"));
      } else if (existingProjectFiles.heroId) {
        projectFileIds.push(existingProjectFiles.heroId);
      }

      if (existingProjectFiles.galleryIds.length > 0) {
        projectFileIds.push(...existingProjectFiles.galleryIds);
      }

      const newGalleryIds = await uploadGalleryAssets(form.galleryFiles);
      projectFileIds.push(...newGalleryIds);

      const uploadedAmenities: Array<{
        name: string;
        amenities_image_id: number;
      }> = [];

      for (const amenity of preparedAmenities) {
        let imageId = amenity.existingImageId;

        if (amenity.imageFile) {
          imageId = await uploadSingleAsset(amenity.imageFile, "ICON");
        }

        if (!imageId) {
          throw new Error(`Amenity image required for "${amenity.name.trim()}".`);
        }

        uploadedAmenities.push({
          name: amenity.name.trim(),
          amenities_image_id: imageId,
        });
      }

      const payload = buildProjectPayload(projectFileIds, uploadedAmenities);

      const result = isEditMode
        ? await apiClient.put<ProjectMutationResponse>(
            `/projects/${projectId}`,
            payload,
          )
        : await apiClient.post<ProjectMutationResponse>("/projects", payload);

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

  return (
    <section className="mx-auto max-w-[1420px] space-y-8">
      <div className="rounded-[24px] border border-[#f0e2dc] bg-[#fff8f5] px-6 py-4 text-[1rem] font-medium text-[#7a5a50] shadow-[0_4px_10px_rgba(22,20,19,0.03)]">
        {isEditMode
          ? "Update Mode: Existing project is loaded for editing."
          : "Create Mode: Add a new project."}
      </div>

      <div className="rounded-[28px] border border-[#e7e4df] bg-white p-3 shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
        <div className="grid gap-3 lg:grid-cols-3">
          {steps.map((item) => {
            const active = item.id === step;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStep(item.id)}
                className={[
                  "rounded-[20px] px-6 py-5 text-[1.15rem] font-semibold transition",
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

      {step === "basic" ? (
        <>
          <SectionCard
            icon={<IconInfoCircle className="h-7 w-7" />}
            title="Basic Information"
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <TextInput
                placeholder="Project Name"
                value={form.projectName}
                onChange={(value) => updateField("projectName", value)}
              />
              <TextInput
                placeholder="RERA Number"
                value={form.reraNumber}
                onChange={(value) => updateField("reraNumber", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            icon={<IconImageSquare className="h-7 w-7" />}
            title="Hero Section"
          >
            <UploadField
              id="project-logo"
              label="Logo Upload"
              title="Upload Logo"
              helper="Drag & drop or click to upload"
              files={form.logoFileName ? [form.logoFileName] : []}
              onChange={(event) =>
                handleSingleFile("logoFileName", "logoFile", event)
              }
            />

            <UploadField
              id="project-hero"
              label="Hero Image"
              title="Upload Hero Image"
              helper="Drag & drop or click to upload"
              files={form.heroImageName ? [form.heroImageName] : []}
              onChange={(event) =>
                handleSingleFile("heroImageName", "heroImageFile", event)
              }
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
                placeholder="Area (sq.ft)"
                value={form.areaSqft}
                onChange={(value) => updateField("areaSqft", value)}
              />
              <TextInput
                placeholder="Property Type"
                value={form.propertyType}
                onChange={(value) => updateField("propertyType", value)}
              />
              <TextInput
                placeholder="Configuration"
                value={form.configuration}
                onChange={(value) => updateField("configuration", value)}
              />
              <TextInput
                placeholder="Starting Price"
                value={form.startingPrice}
                onChange={(value) => updateField("startingPrice", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            icon={<IconImageSquare className="h-7 w-7" />}
            title="Project Gallery"
          >
            <UploadField
              id="project-gallery"
              label="Project Images"
              title="Upload Project Images"
              helper="Drag & drop or click to upload"
              files={form.galleryFileNames}
              multiple
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

                    <AmenityImageField
                      id={`amenity-image-${item.id}`}
                      fileName={item.imageFileName}
                      onChange={(event) => updateAmenityImage(item.id, event)}
                    />
                  </div>

                  {amenities.length > 1 ? (
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeAmenity(item.id)}
                        className="inline-flex h-[54px] items-center justify-center rounded-[16px] border border-[#f09684] px-6 text-[1rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                      >
                        Remove Amenity
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addAmenity}
                  className="inline-flex h-[58px] items-center justify-center gap-3 rounded-[18px] px-7 text-[1.1rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.22)]"
                >
                  <IconPlus className="h-5 w-5" />
                  Add Amenity
                </button>
              </div>
            </div>
          </SectionCard>
        </>
      ) : null}

      {step === "location" ? (
        <div className="space-y-6">
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
                <TextInput
                  placeholder="Latitude"
                  value={section.latitude}
                  onChange={(value) =>
                    updateLocationSection(section.id, "latitude", value)
                  }
                />
                <TextInput
                  placeholder="Longitude"
                  value={section.longitude}
                  onChange={(value) =>
                    updateLocationSection(section.id, "longitude", value)
                  }
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                <TextInput
                  placeholder="City"
                  value={section.city}
                  onChange={(value) =>
                    updateLocationSection(section.id, "city", value)
                  }
                />
                <TextInput
                  placeholder="State"
                  value={section.state}
                  onChange={(value) =>
                    updateLocationSection(section.id, "state", value)
                  }
                />
                <TextInput
                  placeholder="Pincode"
                  value={section.pincode}
                  onChange={(value) =>
                    updateLocationSection(section.id, "pincode", value)
                  }
                />
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
                    <p className="text-[1rem] text-[#8a94a8]">
                      Har Add Connectivity par poora naya location block add hoga.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  <TextInput
                    placeholder="Place / Landmark"
                    value={section.place}
                    onChange={(value) =>
                      updateLocationSection(section.id, "place", value)
                    }
                  />
                  <TextInput
                    placeholder="Walking Time"
                    value={section.walkingTime}
                    onChange={(value) =>
                      updateLocationSection(section.id, "walkingTime", value)
                    }
                  />
                  <TextInput
                    placeholder="Driving Time"
                    value={section.drivingTime}
                    onChange={(value) =>
                      updateLocationSection(section.id, "drivingTime", value)
                    }
                  />
                </div>
              </div>

              {locationSections.length > 1 ? (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeLocationSection(section.id)}
                    className="inline-flex h-[54px] items-center justify-center rounded-[16px] border border-[#f09684] px-6 text-[1rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                  >
                    Remove Full Section
                  </button>
                </div>
              ) : null}
            </SectionCard>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={addLocationSection}
              className="inline-flex h-[58px] items-center justify-center gap-3 rounded-[18px] px-7 text-[1.1rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.22)]"
            >
              <IconPlus className="h-5 w-5" />
              Add Connectivity
            </button>
          </div>
        </div>
      ) : null}

      <div className="space-y-4">
        {errorMessage ? (
          <p className="text-sm font-medium text-[#d05c43]">{errorMessage}</p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={goToNextStep}
            disabled={isSubmitting || isLoadingProject}
            className="inline-flex h-[60px] w-full items-center justify-center gap-3 rounded-[20px] px-8 text-[1.15rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.22)] transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
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
                    : "Uploading & Creating..."
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
