import { resolveApiAssetUrl } from "@/lib/api/resolveAssetUrl";
import { LOCAL_IMAGES, localImageByIndex } from "@/lib/local-images";

export type PublicArticleItem = {
  id: number | string;
  type?: string | null;
  title?: string | null;
  description?: string | null;
  created_at?: string | null;
  file?: {
    file_url?: string | null;
  } | null;
};

type ArticleByIdResponse = {
  success?: boolean;
  data?: PublicArticleItem | null;
};

type FilterArticlesResponse = {
  success?: boolean;
  data?: {
    data?: PublicArticleItem[];
  } | PublicArticleItem[];
};

export function normalizeFilteredArticles(
  response: FilterArticlesResponse,
): PublicArticleItem[] {
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (Array.isArray(response.data?.data)) {
    return response.data.data;
  }
  return [];
}

export function articleDateLabel(raw: string | null | undefined) {
  const s = String(raw ?? "").trim();
  if (!s) return "";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s.slice(0, 10);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function articleExcerpt(raw: string | null | undefined) {
  const s = (raw ?? "").trim();
  if (!s) return "No description available.";
  if (s.length <= 140) return s;
  return `${s.slice(0, 137)}...`;
}

export function articleImage(
  item: PublicArticleItem,
  fallbackIndex: number,
  fallbackType: "blog" | "newsroom" | "magazine" | "gazette",
) {
  const remote = resolveApiAssetUrl(item.file?.file_url);
  if (remote) return remote;
  if (fallbackType === "magazine") return LOCAL_IMAGES.magazine;
  if (fallbackType === "gazette") return LOCAL_IMAGES.gazette;
  return localImageByIndex(fallbackIndex);
}

export function normalizeArticleById(
  response: ArticleByIdResponse,
): PublicArticleItem | null {
  if (response && response.data && typeof response.data === "object") {
    return response.data;
  }
  return null;
}
