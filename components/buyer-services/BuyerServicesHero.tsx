import Image from "next/image";

export function BuyerServicesHero() {
  return (
    <section
      className="relative overflow-hidden mb-4 lg:mb-[80px]"
      style={{ height: "clamp(320px, 36vw, 513px)" }}
      aria-labelledby="buyer-services-heading"
    >
      {/* Single background image (no blend layer, unlike Developer's Services) */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/Buyer/services/hero.svg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Centered text */}
      <div className="relative z-10 flex h-full flex-col items-center justify-start mt-10 lg:mt-[100px] gap-4 px-4 text-center font-qasbyne ">
        <h1
          id="buyer-services-heading"
          className="font-qasbyne font-normal uppercase text-[#202225] text-[clamp(2rem,6.5vw,4.375rem)] leading-none tracking-[0.05em]"
        >
          Buyer&apos;s Services
        </h1>
        <p className="font-nexa text-base font-normal text-black sm:text-lg max-w-2xl">
          We are one of the fastest growing Real Estate consulting company in India.
        </p>
      </div>
    </section>
  );
}
