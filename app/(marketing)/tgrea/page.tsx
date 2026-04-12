import { Container } from "@/components/common/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TGREA",
  description: "The Guardians Real Estate Advisory.",
};

export default function TGREAPage() {
  return (
    <>
      <header className="border-b border-brand-border bg-brand-background-muted">
        <Container className="py-14 sm:py-16">
          <h1 className="font-qasbyne text-3xl font-normal uppercase tracking-[0.06em] text-brand-text-primary sm:text-4xl">
            TGREA
          </h1>
          <p className="mt-4 max-w-2xl text-brand-text-secondary">
            The Guardians Real Estate Advisory.
          </p>
        </Container>
      </header>
      <Container className="py-12">
        <p className="text-sm text-brand-text-secondary">
          The Guardians Real Estate Advisory.
        </p>
      </Container>
    </>
  );
}
