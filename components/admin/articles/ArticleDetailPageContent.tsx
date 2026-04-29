"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddArticleModal } from "@/components/admin/articles/ArticlesPageContent";
import { getArticleById } from "@/src/api/services/articleService";

type DetailMode = "view" | "edit";
type ArticleType = "NEWS" | "BLOG" | "MAGAZINE" | "GAZETTE";
type ArticleStatus = "Published" | "Draft";

type ArticleApiItem = {
  id: number;
  title: string;
  type: ArticleType;
  description: string | null;
  active: boolean;
  created_at: string;
  file: {
    id: number;
    file_url: string;
    file_name: string;
  } | null;
  categories: string[];
};

type ArticleByIdResponse = {
  success?: boolean;
  data?: ArticleApiItem | null;
};

type InitialArticle = Parameters<typeof AddArticleModal>[0]["initialArticle"];

function mapInitialArticle(item: ArticleApiItem): NonNullable<InitialArticle> {
  return {
    id: item.id,
    title: item.title,
    type: String(item.type).toUpperCase() === "BLOGS" ? "BLOG" : item.type,
    categories: Array.isArray(item.categories) ? item.categories : [],
    createdDate: item.created_at ? item.created_at.slice(0, 10) : "",
    status: item.active ? "Published" : "Draft",
    description: item.description ?? "",
    fileId: item.file?.id ?? null,
    fileName: item.file?.file_name ?? null,
    fileUrl: item.file?.file_url ?? null,
  } satisfies {
    id: number;
    title: string;
    type: ArticleType;
    categories: string[];
    createdDate: string;
    status: ArticleStatus;
    description: string;
    fileId: number | null;
    fileName: string | null;
    fileUrl: string | null;
  };
}

export function ArticleDetailPageContent({
  articleId,
  mode,
}: {
  articleId: string;
  mode: DetailMode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialArticle, setInitialArticle] = useState<InitialArticle>(null);

  useEffect(() => {
    let mounted = true;

    async function loadArticle() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = (await getArticleById(articleId)) as ArticleByIdResponse;
        if (!mounted) return;

        if (!result?.data) {
          setErrorMessage("Article not found.");
          return;
        }

        setInitialArticle(mapInitialArticle(result.data));
      } catch (error) {
        if (!mounted) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load article.",
        );
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadArticle();
    return () => {
      mounted = false;
    };
  }, [articleId]);

  if (isLoading) {
    return (
      <section className="w-full rounded-[30px] border border-[#e7e4df] bg-white p-6 text-[1rem] text-[#6b7280] shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
        Loading article...
      </section>
    );
  }

  if (errorMessage || !initialArticle) {
    return (
      <section className="w-full space-y-4 rounded-[30px] border border-[#f3d3cb] bg-[#fff6f3] p-6 shadow-[0_8px_18px_rgba(22,20,19,0.06)]">
        <p className="text-[1rem] font-medium text-[#c25b45]">
          {errorMessage || "Article not found."}
        </p>
        <button
          type="button"
          onClick={() => router.push("/admin/articles")}
          className="inline-flex h-[46px] items-center justify-center rounded-[14px] border border-[#f09684] px-6 text-[0.95rem] font-semibold text-[#f07c61] transition hover:bg-[#fff5f1]"
        >
          Back to Articles
        </button>
      </section>
    );
  }

  return (
    <section className="w-full">
      <AddArticleModal
        open={true}
        inline
        mode={mode}
        initialArticle={initialArticle}
        onClose={() => router.push("/admin/articles")}
        onSaved={() => router.push("/admin/articles")}
      />
    </section>
  );
}
