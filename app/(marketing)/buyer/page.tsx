import { AudienceMarketingPage } from "@/components/marketing/AudienceMarketingPage";
import { BUYER_MARKETING_PAGE } from "@/data/audience-marketing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Buyer | The Guardians" },
  description:
    "Buyer-focused guidance — discovery, diligence, and confident property decisions.",
};

export default function BuyerPage() {
  return <AudienceMarketingPage content={BUYER_MARKETING_PAGE} />;
}
