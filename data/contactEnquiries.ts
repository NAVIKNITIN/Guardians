/** Shared enquiry blocks — contact page panel + footer “Have queries?” accordion. */
export type ContactEnquiry = {
  /** Short label in footer accordion header. */
  label: string;
  title: string;
  email?: string;
  phone?: string;
  telHref: string;
};

export const CONTACT_ENQUIRIES: readonly ContactEnquiry[] = [
  {
    label: "Business",
    title: "Business Related Enquiries",
    email: "enquiry@theguardiansindia.com",
    phone: "9152420242",
    telHref: "tel:+919152420242",
  },
  {
    label: "Channel Partner",
    title: "Channel Partner Related Enquiries",
    email: "partnertalk@theguardiansindia.com",
    phone: "022-69750000",
    telHref: "tel:+912269750000",
  },
  {
    label: "HR",
    title: "HR Related Enquiries",
    email: "hr@theguardiansindia.com",
    phone: "022-68770076 / 022-6877005",
    telHref: "tel:+912268770076",
  },
] as const;
