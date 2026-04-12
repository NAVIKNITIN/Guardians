import { AudienceMarketingPage } from "@/components/marketing/AudienceMarketingPage";
import { DEVELOPER_MARKETING_PAGE } from "@/data/audience-marketing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Developer | The Guardians" },
  description:
    "Developer-focused advisory — strategy, market intelligence, and partnerships.",
};

export default function DeveloperDetailsPage() {
  return <AudienceMarketingPage content={DEVELOPER_MARKETING_PAGE} />;
}
