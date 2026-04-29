import { BlogDetail, type BlogDetailPost } from "@/components/blog/BlogDetail";
import { fetchArticleDetailPost } from "@/lib/mappers/articleDetailPage";
import { LOCAL_IMAGES } from "@/lib/local-images";
import type { Metadata } from "next";

const FALLBACK_POST: BlogDetailPost = {
  category: "Magazine",
  date: "",
  title: "Magazine article",
  featuredImage: LOCAL_IMAGES.magazine,
  featuredImageAlt: "Magazine article image",
  body: ["No description available."],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apiPost = await fetchArticleDetailPost(slug);
  const activePost = apiPost ?? FALLBACK_POST;
  return {
    title: { absolute: `${activePost.title} | The Guardians` },
    description: activePost.body.join(" ").slice(0, 160),
    openGraph: {
      images: [activePost.featuredImage],
    },
  };
}

export default async function MagazineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const apiPost = await fetchArticleDetailPost(slug);
  return <BlogDetail post={apiPost ?? FALLBACK_POST} contentType="MAGAZINE" />;
}
