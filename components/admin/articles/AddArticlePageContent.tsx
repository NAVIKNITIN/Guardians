"use client";

import { AddArticleModal } from "@/components/admin/articles/ArticlesPageContent";
import { useRouter } from "next/navigation";

export function AddArticlePageContent() {
  const router = useRouter();

  return (
    <section className="w-full">
      <AddArticleModal
        open={true}
        inline
        mode="create"
        initialArticle={null}
        onClose={() => router.push("/admin/articles")}
        onSaved={() => router.push("/admin/articles")}
      />
    </section>
  );
}
