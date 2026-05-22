"use client";

import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  submitBookVisit,
  type CreateBookVisitPayload,
} from "@/src/api/services/visitService";
import { showError, showSuccess } from "@/src/utils/toast";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { BookVisitFormField, BookVisitMessageField } from "./BookVisitFormFields";
import { markVisitFormSubmitted } from "./visitLeadModalStorage";

export type VisitLeadCaptureFormProps = {
  onSuccess: () => void;
};

export function VisitLeadCaptureForm({ onSuccess }: VisitLeadCaptureFormProps) {
  const formId = useId();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.firstName.trim()) {
      showError("First name is required.");
      return;
    }

    if (!form.email.trim()) {
      showError("Email is required.");
      return;
    }

    if (!form.phone.trim()) {
      showError("Phone number is required.");
      return;
    }

    const payload: CreateBookVisitPayload = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim() || null,
      email: form.email.trim(),
      phone_no: form.phone.trim(),
      location: null,
      upload_cv_file_id: null,
      message: form.message.trim() || null,
    };

    try {
      setIsSubmitting(true);
      await submitBookVisit(payload);

      markVisitFormSubmitted();
      showSuccess("Book visit submitted successfully.");
      onSuccess();
    } catch (error) {
      showError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="book-visit-form w-full text-left"
      noValidate
      aria-busy={isSubmitting}
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <BookVisitFormField
            label="First Name"
            name="firstName"
            placeholder="Enter your first name"
            value={form.firstName}
            onChange={handleChange}
            id={`${formId}-firstName`}
            required
          />
          <BookVisitFormField
            label="Last Name"
            name="lastName"
            placeholder="Enter your last name"
            value={form.lastName}
            onChange={handleChange}
            id={`${formId}-lastName`}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <BookVisitFormField
            label="Email Address"
            name="email"
            placeholder="Enter your email address"
            value={form.email}
            onChange={handleChange}
            type="email"
            id={`${formId}-email`}
            required
          />
          <BookVisitFormField
            label="Phone Number"
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            id={`${formId}-phone`}
            required
          />
        </div>

        <BookVisitMessageField
          name="message"
          value={form.message}
          onChange={handleChange}
          id={`${formId}-message`}
        />

        <div className="mt-1 flex justify-center">
          <OutlineArrowButton
            type="submit"
            form={formId}
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="h-[52px] w-full max-w-full uppercase disabled:cursor-not-allowed disabled:opacity-70 sm:h-[55px] sm:text-base"
            iconClassName="h-[13px] w-[13px]"
            iconAlt=""
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </OutlineArrowButton>
        </div>
      </div>
    </form>
  );
}
