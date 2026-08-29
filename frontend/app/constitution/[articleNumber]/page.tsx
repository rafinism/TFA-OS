import { notFound } from "next/navigation";
import ConstitutionArticleReader from "@/components/constitution/ConstitutionArticleReader";
import { constitutionArticles } from "@/lib/constitution";

export function generateStaticParams() {
  return constitutionArticles.map((article) => ({
    articleNumber: article.number,
  }));
}

export default async function ConstitutionArticlePage({
  params,
}: {
  params: Promise<{ articleNumber: string }>;
}) {
  const { articleNumber } = await params;

  const article = constitutionArticles.find(
    (item) => item.number.toLowerCase() === articleNumber.toLowerCase(),
  );

  if (!article) {
    notFound();
  }

  return <ConstitutionArticleReader article={article} />;
}