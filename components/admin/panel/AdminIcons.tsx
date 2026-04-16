type IconProps = {
  className?: string;
};

export function IconFolderStack({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 0 1 6 5.25h4.19c.597 0 1.169.237 1.591.659l.621.621c.422.422.994.659 1.591.659H18A2.25 2.25 0 0 1 20.25 9.5v7A2.25 2.25 0 0 1 18 18.75H6A2.25 2.25 0 0 1 3.75 16.5v-9Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 10.5h10.5M6.75 14.25h6" />
    </svg>
  );
}

export function IconPlus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25v13.5M18.75 12H5.25" />
    </svg>
  );
}

export function IconUserCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function IconInfoCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v5.25M12 7.5h.008" />
    </svg>
  );
}

export function IconImageSquare({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <rect x="4.5" y="4.5" width="15" height="15" rx="2.25" />
      <circle cx="9" cy="9" r="1.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 15-4.114-4.114a1.5 1.5 0 0 0-2.122 0L7.5 16.65" />
    </svg>
  );
}

export function IconSparkles({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 3 1.35 4.65L18 9l-4.65 1.35L12 15l-1.35-4.65L6 9l4.65-1.35L12 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 3.75.45 1.55 1.55.45-1.55.45-.45 1.55-.45-1.55-1.55-.45 1.55-.45.45-1.55ZM5.25 15.75l.45 1.55 1.55.45-1.55.45-.45 1.55-.45-1.55-1.55-.45 1.55-.45.45-1.55Z" />
    </svg>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s6-5.336 6-11.25a6 6 0 1 0-12 0C6 15.664 12 21 12 21Z" />
      <circle cx="12" cy="9.75" r="2.25" />
    </svg>
  );
}

export function IconRoute({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15M8.25 4.5H19.5v11.25" />
    </svg>
  );
}

export function IconUpload({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V4.5M7.5 9 12 4.5 16.5 9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75v1.5A2.25 2.25 0 0 0 6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25v-1.5" />
    </svg>
  );
}

export function IconSave({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 4.5h11.379c.398 0 .779.158 1.061.439l1.371 1.371c.281.282.439.663.439 1.061V18a1.5 1.5 0 0 1-1.5 1.5H6.75A1.5 1.5 0 0 1 5.25 18V4.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5v4.5h7.5V4.5M9 19.5v-6h6v6" />
    </svg>
  );
}

export function IconCheckSeal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 12.375 2.25 2.25 5.25-5.25" />
    </svg>
  );
}
