"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useState } from "react";
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
  areaSqft: string;
  propertyType: string;
  configuration: string;
  startingPrice: string;
  galleryFileNames: string[];
  fullAddress: string;
  latitude: string;
  longitude: string;
  city: string;
  state: string;
  pincode: string;
};

type Amenity = {
  id: number;
  name: string;
};

type Connectivity = {
  id: number;
  place: string;
  walkingTime: string;
  drivingTime: string;
};

const steps = [
  { id: "basic", label: "Basic Info & Hero" },
  { id: "details", label: "Details & Media" },
  { id: "location", label: "Location & Connectivity" },
] as const;

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

        <h2 className="font-qasbyne text-[clamp(2.2rem,3vw,3.15rem)] leading-none text-[#081a43]">
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

export function AddProjectWizard() {
  const [step, setStep] = useState<StepId>("basic");

  // Refresh par data clear ho, isliye sab kuch local component state me rakha gaya hai.
  const [form, setForm] = useState<FormState>({
    projectName: "",
    reraNumber: "",
    logoFileName: "",
    heroImageName: "",
    areaSqft: "",
    propertyType: "",
    configuration: "",
    startingPrice: "",
    galleryFileNames: [],
    fullAddress: "",
    latitude: "",
    longitude: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [amenities, setAmenities] = useState<Amenity[]>([{ id: 1, name: "" }]);
  const [connectivity, setConnectivity] = useState<Connectivity[]>([
    { id: 1, place: "", walkingTime: "", drivingTime: "" },
  ]);

  const currentStepIndex = steps.findIndex((item) => item.id === step);
  const isLastStep = currentStepIndex === steps.length - 1;

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSingleFile(
    key: "logoFileName" | "heroImageName",
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    updateField(key, file ? file.name : "");
  }

  function handleGalleryFiles(event: ChangeEvent<HTMLInputElement>) {
    const fileNames = Array.from(event.target.files ?? []).map(
      (file) => file.name,
    );
    updateField("galleryFileNames", fileNames);
  }

  function goToNextStep() {
    if (isLastStep) {
      console.log("Publish Project", {
        form,
        amenities,
        connectivity,
      });
      return;
    }

    setStep(steps[currentStepIndex + 1].id);
  }

  function addAmenity() {
    setAmenities((current) => [
      ...current,
      { id: current.length + 1, name: "" },
    ]);
  }

  function updateAmenity(id: number, value: string) {
    setAmenities((current) =>
      current.map((item) => (item.id === id ? { ...item, name: value } : item)),
    );
  }
  function removeAmenity(id: number) {
    setAmenities((current) => {
      if (current.length <= 1) return current;
      return current.filter((item) => item.id !== id);
    });
  }

  function addConnectivity() {
    setConnectivity((current) => [
      ...current,
      {
        id: current.length + 1,
        place: "",
        walkingTime: "",
        drivingTime: "",
      },
    ]);
  }

  function updateConnectivity(
    id: number,
    key: "place" | "walkingTime" | "drivingTime",
    value: string,
  ) {
    setConnectivity((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    );
  }
  function removeConnectivity(id: number) {
    setConnectivity((current) => {
      if (current.length <= 1) return current;
      return current.filter((item) => item.id !== id);
    });
  }

  return (
    <section className="mx-auto max-w-[1420px] space-y-8">
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
              onChange={(event) => handleSingleFile("logoFileName", event)}
            />

            <UploadField
              id="project-hero"
              label="Hero Image"
              title="Upload Hero Image"
              helper="Drag & drop or click to upload"
              files={form.heroImageName ? [form.heroImageName] : []}
              onChange={(event) => handleSingleFile("heroImageName", event)}
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
              Recommended: Upload high-quality images (minimum 1920×1080px)
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
                  className={[
                    "grid gap-4",
                    amenities.length > 1
                      ? "lg:grid-cols-[minmax(0,1fr)_180px]"
                      : "",
                  ].join(" ")}
                >
                  <TextInput
                    placeholder={
                      index === 0 ? "Amenity Name" : `Amenity Name ${index + 1}`
                    }
                    value={item.name}
                    onChange={(value) => updateAmenity(item.id, value)}
                  />

                  {amenities.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeAmenity(item.id)}
                      className="inline-flex h-[74px] items-center justify-center rounded-[20px] border border-[#f09684] px-6 text-[1.05rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                    >
                      Remove
                    </button>
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
        <>
          <SectionCard
            icon={<IconMapPin className="h-7 w-7" />}
            title="Project Location"
          >
            <TextArea
              placeholder="Full Address"
              value={form.fullAddress}
              onChange={(value) => updateField("fullAddress", value)}
              className="min-h-[150px]"
            />

            <div className="grid gap-5 lg:grid-cols-2">
              <TextInput
                placeholder="Latitude"
                value={form.latitude}
                onChange={(value) => updateField("latitude", value)}
              />
              <TextInput
                placeholder="Longitude"
                value={form.longitude}
                onChange={(value) => updateField("longitude", value)}
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <TextInput
                placeholder="City"
                value={form.city}
                onChange={(value) => updateField("city", value)}
              />
              <TextInput
                placeholder="State"
                value={form.state}
                onChange={(value) => updateField("state", value)}
              />
              <TextInput
                placeholder="Pincode"
                value={form.pincode}
                onChange={(value) => updateField("pincode", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            icon={<IconRoute className="h-7 w-7" />}
            title="Nearby Connectivity"
          >
            <div className="space-y-5">
              {connectivity.map((item, index) => (
                <div key={item.id} className="space-y-4">
                  <div className="grid gap-5 lg:grid-cols-3">
                    <TextInput
                      placeholder={
                        index === 0
                          ? "Place / Landmark"
                          : `Place / Landmark ${index + 1}`
                      }
                      value={item.place}
                      onChange={(value) =>
                        updateConnectivity(item.id, "place", value)
                      }
                    />
                    <TextInput
                      placeholder="Walking Time"
                      value={item.walkingTime}
                      onChange={(value) =>
                        updateConnectivity(item.id, "walkingTime", value)
                      }
                    />
                    <TextInput
                      placeholder="Driving Time"
                      value={item.drivingTime}
                      onChange={(value) =>
                        updateConnectivity(item.id, "drivingTime", value)
                      }
                    />
                  </div>

                  {connectivity.length > 1 ? (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeConnectivity(item.id)}
                        className="inline-flex h-[54px] items-center justify-center rounded-[16px] border border-[#f09684] px-6 text-[1rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
                      >
                        Remove Connectivity
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={addConnectivity}
                  className="inline-flex h-[58px] items-center justify-center gap-3 rounded-[18px] px-7 text-[1.1rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.22)]"
                >
                  <IconPlus className="h-5 w-5" />
                  Add Connectivity
                </button>
              </div>
            </div>
          </SectionCard>
        </>
      ) : null}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={goToNextStep}
          className="inline-flex h-[60px] w-full items-center justify-center gap-3 rounded-[20px] px-8 text-[1.15rem] font-semibold text-white btn-primary-gradient shadow-[0_18px_30px_rgba(240,150,132,0.22)] sm:w-auto"
        >
          {isLastStep ? (
            <IconCheckSeal className="h-5 w-5" />
          ) : (
            <IconSave className="h-5 w-5" />
          )}
          <span>{isLastStep ? "Finish" : "Next"}</span>
        </button>
      </div>
    </section>
  );
}
