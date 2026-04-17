import { LOCAL_IMAGES } from "@/lib/local-images";
import { PublicationHero } from "@/components/publications/PublicationHero";

export function MagazineHero() {
  return (
    <PublicationHero
      title="Magazine"
      headingId="magazine-hero-heading"
      imageSrc={LOCAL_IMAGES.magazine}
    />
  );
}
