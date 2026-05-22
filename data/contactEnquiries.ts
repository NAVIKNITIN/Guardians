/** Shared enquiry blocks — contact page panel + footer “Have queries?” accordion. */
export type ContactPhone = {
  display: string;
  telHref: string;
};

export type ContactEnquiry = {
  /** Short label in footer accordion header. */
  label: string;
  title: string;
  email?: string;
  phones: readonly ContactPhone[];
};

export const CONTACT_ENQUIRIES: readonly ContactEnquiry[] = [
  {
    label: "Business",
    title: "Business Related Enquiries",
    email: "business@theguardiansindia.com",
    phones: [
      { display: "+91 22 4890 3333", telHref: "tel:+912248903333" },
      { display: "+91 86579 10503", telHref: "tel:+918657910503" },
    ],
  },
  {
    label: "Channel Partner",
    title: "Channel Partner Related Enquiries",
    email: "channelpartner@theguardiansindia.com",
    phones: [
      { display: "+91 86579 10503", telHref: "tel:+918657910503" },
      { display: "+91 22 4890 3333", telHref: "tel:+912248903333" },
    ],
  },
  {
    label: "HR",
    title: "HR Related Enquiries",
    email: "hr@theguardiansindia.com",
    phones: [
      { display: "+91 22 4890 3333", telHref: "tel:+912248903333" },
    ],
  },
] as const;
