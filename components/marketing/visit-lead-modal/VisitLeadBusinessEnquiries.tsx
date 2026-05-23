import {
  ContactEnquiryEmailIcon,
  ContactEnquiryPhoneIcon,
} from "@/components/common/ContactEnquiryIcons";
import { CONTACT_ENQUIRIES } from "@/data/contactEnquiries";
import { cn } from "@/utils/cn";

const BUSINESS_ENQUIRY =
  CONTACT_ENQUIRIES.find((block) => block.label === "Business") ??
  CONTACT_ENQUIRIES[0]!;

const iconCls = "h-3 w-3 shrink-0 text-[#161616] dark:text-neutral-300";

const enquiryLinkCls =
  "inline-flex min-w-0 items-center gap-1 n-book text-[10px] leading-tight text-[#161616] transition-opacity hover:opacity-70 dark:text-neutral-300 sm:text-[11px]";

export function VisitLeadBusinessEnquiries({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const [phoneLeft, phoneRight] = BUSINESS_ENQUIRY.phones;

  return (
    <aside
      id={id}
      className={cn(
        "mt-5 border-t border-black/[0.08] pt-3.5 dark:border-white/[0.1]",
        className,
      )}
      aria-label={BUSINESS_ENQUIRY.title}
    >
      <p className="n-bold mb-2.5 text-center text-[10px] uppercase tracking-[0.08em] text-[#161616] dark:text-white sm:text-[11px]">
        For Business Queries
      </p>
      <div className="flex w-full items-center justify-between gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {BUSINESS_ENQUIRY.email ? (
          <a
            href={`mailto:${BUSINESS_ENQUIRY.email}`}
            className={cn(enquiryLinkCls, "min-w-0 shrink")}
          >
            <ContactEnquiryEmailIcon className={iconCls} />
            <span className="truncate sm:whitespace-nowrap">{BUSINESS_ENQUIRY.email}</span>
          </a>
        ) : (
          <span aria-hidden className="min-w-0 flex-1" />
        )}

        {phoneLeft ? (
          <a href={phoneLeft.telHref} className={cn(enquiryLinkCls, "shrink-0")}>
            <ContactEnquiryPhoneIcon className={iconCls} />
            <span className="whitespace-nowrap">{phoneLeft.display}</span>
          </a>
        ) : null}

        {phoneRight ? (
          <a href={phoneRight.telHref} className={cn(enquiryLinkCls, "shrink-0")}>
            <ContactEnquiryPhoneIcon className={iconCls} />
            <span className="whitespace-nowrap">{phoneRight.display}</span>
          </a>
        ) : null}
      </div>
    </aside>
  );
}
