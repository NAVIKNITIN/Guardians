"use client";

import {
  useCallback,
  useId,
  useRef,
  type ChangeEvent,
  type MutableRefObject,
  type ReactNode,
  type DragEvent,
  forwardRef,
} from "react";

export type FileUploadFieldLayout = "card" | "inline";

export type FileUploadFieldProps = {
  id: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  /** Renders above the control (not used for `inline` if `label` omitted). */
  label?: string;
  /** Main heading in `card` layout. */
  title?: string;
  /** Secondary / hint line in `card` layout. */
  helperText?: string;
  /** `accept` attribute on the file input, e.g. `image/*` or `.pdf`. */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Passed through to the native input (camera on mobile, etc.). */
  capture?: boolean | "user" | "environment";
  /**
   * File name(s) selected by the user — used for the `card` summary strip.
   * For `inline` layout you can set `valueDisplay` instead, or the first name here.
   */
  selectedFileNames?: string[];
  /** Hide the file-name summary under the `card` dropzone. @default true when names exist */
  showFileSummary?: boolean;
  /** Shown in `inline` when there is no `valueDisplay` (and no usable `selectedFileNames`). */
  inlinePlaceholder?: string;
  /**
   * Primary text in `inline` layout (e.g. current file name). When empty, `inlinePlaceholder` shows.
   */
  valueDisplay?: string;
  errorText?: string;
  /** Large dashed area vs compact row. @default "card" */
  layout?: FileUploadFieldLayout;
  className?: string;
  labelClassName?: string;
  dropzoneClassName?: string;
  /**
   * `layout="inline"`: class on the inner row (icon + file name) inside the dropzone/ link.
   */
  inlineContentClassName?: string;
  /**
   * `layout="inline"`: class on the file name/placeholder span.
   */
  inlineValueClassName?: string;
  /** Visual above the title in `card` layout (e.g. an existing icon component). */
  leadingContent?: ReactNode;
  /** Merged with the file input; `type`, `onChange`, `id` are controlled by the component. */
  inputProps?: Omit<
    React.ComponentProps<"input">,
    "type" | "onChange" | "id" | "children"
  >;
  "aria-label"?: string;
  "aria-describedby"?: string;
  /**
   * Called with the `FileList` after any user selection (change or drop).
   * Use together with or instead of parsing `onChange` when wiring uploads.
   */
  onFilesSelected?: (files: FileList | null) => void;
  /** @default true for `card` */
  enableDragAndDrop?: boolean;
  /**
   * `layout="inline"`: same visuals as the inline dropzone, but as a link (no file input).
   * For admin read-only rows, e.g. download an already-uploaded CV.
   */
  downloadHref?: string;
};

const CARD_DROPZONE =
  "group flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-[30px] border-2 border-dashed border-[#d7dde6] bg-white px-6 text-center transition hover:border-[#f09684]";

const INLINE_DROPZONE =
  "flex h-[74px] cursor-pointer items-center justify-center rounded-[20px] border-2 border-dashed border-[#d7dde6] bg-white px-5 text-center transition hover:border-[#f09684]";

function assignFilesToInputAndNotify(
  input: HTMLInputElement,
  files: FileList | null,
  onFileInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
) {
  if (!files || files.length === 0) {
    return;
  }

  const data = new DataTransfer();
  for (let i = 0; i < files.length; i += 1) {
    const file = files.item(i);
    if (file) {
      data.items.add(file);
    }
  }
  const inputWithSetter = input as HTMLInputElement & { files: FileList };
  inputWithSetter.files = data.files;

  onFileInputChange({
    target: inputWithSetter,
    currentTarget: inputWithSetter,
  } as unknown as ChangeEvent<HTMLInputElement>);

  inputWithSetter.dispatchEvent(new Event("input", { bubbles: true }));
}

/**
 * Reusable file upload: large “card” dropzone or compact “inline” row.
 * Styling matches admin project forms; pass `leadingContent` for a project icon.
 */
export const FileUploadField = forwardRef<HTMLInputElement, FileUploadFieldProps>(
  function FileUploadField(
    {
      id,
      onChange,
      name,
      label,
      title,
      helperText,
      accept = "image/*",
      multiple = false,
      disabled = false,
      capture,
      selectedFileNames = [],
      showFileSummary = true,
      inlinePlaceholder = "Choose file",
      valueDisplay: valueDisplayProp,
      errorText,
      layout = "card",
      className = "",
      labelClassName = "",
      dropzoneClassName = "",
      leadingContent = null,
      inputProps = {},
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      onFilesSelected,
      enableDragAndDrop = true,
      downloadHref,
      inlineContentClassName = "",
      inlineValueClassName = "",
    },
    forwardedRef,
  ) {
    const { className: inputClassName, ...fileInputRest } = inputProps;
    const localRef = useRef<HTMLInputElement | null>(null);
    const errorId = useId();
    const describedBy = [ariaDescribedBy, errorText ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

    const setRefs = (node: HTMLInputElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    const inlineText =
      valueDisplayProp != null
        ? valueDisplayProp || inlinePlaceholder
        : selectedFileNames[0] || inlinePlaceholder;

    const handleFileChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        onFilesSelected?.(event.currentTarget.files);
      },
      [onChange, onFilesSelected],
    );

    const handleDrop = useCallback(
      (event: DragEvent) => {
        if (!enableDragAndDrop || disabled) return;
        event.preventDefault();
        event.stopPropagation();
        const input = localRef.current;
        if (!input) return;
        const files = event.dataTransfer?.files ?? null;
        if (!files?.length) return;
        if (!multiple && files.length > 1) {
          const one = new DataTransfer();
          one.items.add(files[0]!);
          assignFilesToInputAndNotify(input, one.files, handleFileChange);
          return;
        }
        assignFilesToInputAndNotify(input, files, handleFileChange);
      },
      [enableDragAndDrop, disabled, multiple, handleFileChange],
    );

    const handleDragOver = useCallback(
      (event: DragEvent) => {
        if (!enableDragAndDrop || disabled) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      },
      [enableDragAndDrop, disabled],
    );

    const dropHandlers =
      enableDragAndDrop && !disabled
        ? { onDrop: handleDrop, onDragOver: handleDragOver }
        : {};

    const inputEl = (
      <input
        ref={setRefs}
        {...fileInputRest}
        id={id}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        {...(capture != null ? { capture } : {})}
        onChange={handleFileChange}
        className={["hidden", inputClassName].filter(Boolean).join(" ")}
        aria-label={ariaLabel}
        aria-invalid={errorText ? true : undefined}
        aria-describedby={describedBy}
        aria-errormessage={errorText ? errorId : undefined}
      />
    );

    if (layout === "inline" && downloadHref) {
      return (
        <div className={["w-full", className].filter(Boolean).join(" ")}>
          {label ? (
            <p
              className={[
                "mb-2 text-[1.05rem] font-medium text-[#46536d]",
                labelClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </p>
          ) : null}
          <a
            href={downloadHref}
            id={id}
            download
            target="_blank"
            rel="noreferrer"
            className={[
              INLINE_DROPZONE,
              errorText ? "border-[#d05c43]" : "",
              dropzoneClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
          >
            <div
              className={[
                "flex items-center justify-center gap-3 text-[#f07c61]",
                inlineContentClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {leadingContent}
              <span
                className={[
                  "max-w-[min(100%,220px)] truncate text-[1rem] font-semibold text-[#f07c61]",
                  inlineValueClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {inlineText}
              </span>
            </div>
          </a>
          {errorText ? (
            <p id={errorId} className="mt-2 text-sm font-medium text-[#d05c43]" role="alert">
              {errorText}
            </p>
          ) : null}
        </div>
      );
    }

    if (layout === "inline") {
      return (
        <div className={["w-full", className].filter(Boolean).join(" ")}>
          {label ? (
            <p
              className={[
                "mb-2 text-[1.05rem] font-medium text-[#46536d]",
                labelClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </p>
          ) : null}
          <label
            htmlFor={id}
            className={[
              INLINE_DROPZONE,
              errorText ? "border-[#d05c43]" : "",
              dropzoneClassName,
              disabled ? "cursor-not-allowed opacity-60" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            {...(disabled ? {} : dropHandlers)}
          >
            {inputEl}
            <div
              className={[
                "flex items-center justify-center gap-3 text-[#f07c61]",
                inlineContentClassName,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {leadingContent}
              <span
                className={[
                  "max-w-[min(100%,180px)] truncate text-[1rem] font-semibold",
                  disabled ? "text-[#a0a9b8]" : "text-[#f07c61]",
                  inlineValueClassName,
                  disabled ? "!text-[#a0a9b8]" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {inlineText}
              </span>
            </div>
          </label>
          {errorText ? (
            <p id={errorId} className="mt-2 text-sm font-medium text-[#d05c43]" role="alert">
              {errorText}
            </p>
          ) : null}
        </div>
      );
    }

    return (
      <div className={className}>
        {label ? (
          <p
            className={[
              "mb-3 text-[1.2rem] font-medium text-[#46536d]",
              labelClassName,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </p>
        ) : null}

        <label
          htmlFor={id}
          className={[
            CARD_DROPZONE,
            errorText ? "border-[#d05c43]" : "",
            dropzoneClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...dropHandlers}
        >
          {inputEl}

          {leadingContent ? (
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#fff3ed] text-[#f07c61]">
              {leadingContent}
            </div>
          ) : null}

          {title ? (
            <p className="mt-6 text-[1.9rem] font-medium text-[#33425e]">{title}</p>
          ) : null}
          {helperText ? (
            <p className="mt-2 text-[1.08rem] text-[#9ca6b8]">{helperText}</p>
          ) : null}
        </label>

        {showFileSummary && selectedFileNames.length > 0 ? (
          <div className="mt-3 rounded-[18px] bg-[#fff8f5] px-5 py-4 text-[1rem] text-[#7a6a60]">
            {selectedFileNames.join(", ")}
          </div>
        ) : null}

        {errorText ? (
          <p id={errorId} className="mt-2 text-sm font-medium text-[#d05c43]" role="alert">
            {errorText}
          </p>
        ) : null}
      </div>
    );
  },
);
