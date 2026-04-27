"use client";

export function AppPageSkeleton() {
  return (
    <main className="min-h-[60vh] bg-white pt-[88px]">
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="h-[180px] animate-pulse bg-linear-to-r from-[#d8d9dc] via-[#ececef] to-[#d8d9dc] sm:h-[260px] lg:h-[340px]" />
      </section>

      <section className="mx-auto mt-8 grid w-full max-w-[1400px] grid-cols-1 gap-6 px-4 sm:mt-10 sm:grid-cols-2 sm:gap-8 sm:px-6 lg:grid-cols-3 lg:gap-10 lg:px-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`app-skeleton-card-${index}`}
            className="overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          >
            <div className="aspect-16/10 animate-pulse bg-[#dfe1e4]" />
            <div className="space-y-3 bg-[#ecebeb] px-4 py-4 sm:px-5 sm:py-5">
              <div className="h-6 w-3/4 animate-pulse rounded bg-[#cfd1d5]" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-[#d9dbde]" />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
