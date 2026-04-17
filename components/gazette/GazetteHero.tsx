import { LOCAL_IMAGES } from "@/lib/local-images";
import { PublicationHero } from "@/components/publications/PublicationHero";

export function GazetteHero() {
  return (
    <PublicationHero
      title="Gazette"
      headingId="gazette-hero-heading"
      imageSrc={LOCAL_IMAGES.gazette}
    />
  );
}
