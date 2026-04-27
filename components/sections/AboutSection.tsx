import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

export function AboutSection() {
  return (
    <section
      id="about"
      className="bg-brand-background py-16 sm:py-20 lg:py-28"
      aria-labelledby="about-heading"
    >
      <Container>
        <StaggerContainer className="mx-auto max-w-[980px] text-center n-reg">
          <h2 id="about-heading" className="sr-only">
            About The Guardians
          </h2>
          <ScrollReveal direction="up" distance={40} duration={0.6}>
            <p className="text-xl font-semibold leading-[1.15] text-[#121212] sm:text-2xl md:text-3xl lg:text-4xl">
              We are one of the fastest growing Real Estate consulting company in
              India. It&apos;s growth, today,
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" distance={40} delay={0.15} duration={0.6}>
            <p className="mt-1 text-xl font-medium leading-[1.15] text-[#bdbdbd] sm:text-2xl md:text-3xl lg:text-4xl">
              has far outrun most of the other real estate advisory company across
              the country.
            </p>
          </ScrollReveal>
        </StaggerContainer>
      </Container>
    </section>
  );
}
