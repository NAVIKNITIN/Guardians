import { ArticleDetailPageContent } from "@/components/admin/articles/ArticleDetailPageContent";

export default async function ViewArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ArticleDetailPageContent articleId={id} mode="view" />;
}
