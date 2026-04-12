import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogHero } from "@/components/blog/BlogHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Blogs | The Guardians" },
  description:
    "Expert real estate insights, market analysis, and advisory perspectives from The Guardians.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogGrid />
    </>
  );
}
