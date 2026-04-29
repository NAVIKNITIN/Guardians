import {
  articleDateLabel,
  articleImage,
  normalizeArticleById,
  type PublicArticleItem,
} from "@/lib/mappers/publicArticles";
import { getArticleById } from "@/src/api/services/articleService";
import type { BlogDetailPost } from "@/components/blog/BlogDetail";

const TYPE_TO_LABEL: Record<string, string> = {
  BLOGS: "BLOG",
  BLOG: "BLOG",
  NEWS: "Newsroom",
  MAGAZINE: "Magazine",
  GAZETTE: "Gazette",
};

function articleBody(description: string | null | undefined): string[] {
  const text = (description ?? "").trim();
  if (!text) return ["No description available."];
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export async function fetchArticleDetailPost(
  id: string,
): Promise<BlogDetailPost | null> {
  try {
    const response = (await getArticleById(id)) as unknown;
    const item = normalizeArticleById(response as never);
    if (!item) return null;

    const normalizedType = String(item.type ?? "").toUpperCase();
    const fallbackType =
      normalizedType === "NEWS"
        ? "newsroom"
        : normalizedType === "MAGAZINE"
          ? "magazine"
          : normalizedType === "GAZETTE"
            ? "gazette"
            : "blog";

    return {
      category: TYPE_TO_LABEL[normalizedType] ?? "Article",
      date: articleDateLabel(item.created_at),
      title: item.title?.trim() || "Untitled",
      featuredImage: articleImage(item as PublicArticleItem, 0, fallbackType),
      featuredImageAlt: item.title?.trim() || "Article image",
      body: articleBody(item.description),
    };
  } catch {
    return null;
  }
}
