import Image from "next/image";

export function DeveloperServicesHero() {
  return (
    <section
      className="relative mb-4 min-h-[min(88vh,520px)] overflow-hidden sm:min-h-[380px] lg:mb-[80px] lg:min-h-[513px]"
      aria-labelledby="dev-services-heading"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/Developer/services/hero.svg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start gap-4 px-4 pb-10 pt-16 text-center qs-regsm:pt-20 lg:mt-[100px] lg:pb-0">
        <h1
          id="dev-services-heading"
          className="max-w-[min(100%,22ch)] break-words qs-reg text-[clamp(1.75rem,6vw,4.375rem)]  uppercase leading-none tracking-[0.05em] text-[#202225] sm:max-w-none sm:text-[clamp(2rem,6.5vw,4.375rem)]"
        >
          Developer&apos;s Services
        </h1>
        <p className="n-reg  text-base  text-black sm:text-lg max-w-2xl">
          We are one of the fastest growing Real Estate consulting company in India.
        </p>
      </div>
    </section>
  );
}
