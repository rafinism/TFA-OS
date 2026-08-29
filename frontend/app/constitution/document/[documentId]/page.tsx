import { notFound } from "next/navigation";
import ConstitutionDocumentReader from "@/components/constitution/ConstitutionDocumentReader";
import {
  constitutionClosingRecords,
  constitutionFrontMatter,
} from "@/lib/constitution";

type DocumentItem = {
  id: string;
  title: string;
  paragraphs: readonly string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const documents: DocumentItem[] = [
  ...constitutionFrontMatter.map((item) => ({
    id: item.id,
    title: item.title,
    paragraphs: item.paragraphs,
  })),

  ...constitutionClosingRecords.map((record) => ({
    id: slugify(record.title),
    title: record.title,
    paragraphs: record.paragraphs,
  })),
];

export function generateStaticParams() {
  return documents.map((document) => ({
    documentId: document.id,
  }));
}

export default async function ConstitutionDocumentPage({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await params;

  const document = documents.find(
    (item) => item.id.toLowerCase() === documentId.toLowerCase(),
  );

  if (!document) {
    notFound();
  }

  return <ConstitutionDocumentReader document={document} />;
}