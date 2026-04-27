"use client";

import { Container } from "@/components/common/Container";
import {
  BuyerProfileCardMobile,
  DeveloperProfileCardMobile,
} from "./DividerSectionCardsMobile";

/**
 * Below `lg` only — static stack (animations disabled for mobile).
 */
export function DividerSectionMobile() {
  return (
    <section className="relative bg-[#F2F2F2] py-8 sm:py-10">
      <Container className="relative w-full px-0 lg:min-h-0">
        <div className="relative z-10 grid min-h-0 min-w-0 grid-cols-1 grid-rows-2 items-stretch gap-[20px] overflow-hidden rounded-sm">
          <BuyerProfileCardMobile />
          <DeveloperProfileCardMobile />
        </div>
      </Container>
    </section>
  );
}
