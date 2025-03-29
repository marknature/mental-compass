import { notFound } from "next/navigation";
import { mockArticles } from "@/lib/mock-articles";
import { ArticleDetail } from "@/app/_components/article-detail";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = mockArticles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}
