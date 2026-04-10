import { Container } from "@/components/common/Container";
import Image from "next/image";

const BANNER_SRC = "/images/Home/Banner1.svg";
/** Intrinsic size from Banner1.svg */
const BANNER_WIDTH = 1196;
const BANNER_HEIGHT = 350;

export function DividerSection() {
  return (
    <section className="bg-brand-background " aria-hidden>
      <Container>
        <div className="relative w-full overflow-hidden rounded-sm">
          <Image
            src={BANNER_SRC}
            alt=""
            width={BANNER_WIDTH}
            height={BANNER_HEIGHT}
            className="h-auto w-full"
            sizes="(max-width: 1440px) 100vw, 90rem"
            unoptimized
            priority={false}
          />
        </div>
      </Container>
    </section>
  );
}
