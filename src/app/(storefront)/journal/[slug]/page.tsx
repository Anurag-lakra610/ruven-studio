import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDevotionalBySlug, getProducts } from "@/lib/db";
import { JournalClientPage } from "@/components/storefront/JournalClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getDevotionalBySlug(slug);

  if (!article) {
    return {
      title: "Devotional Not Found | Ruven Journal",
      description: "The requested devotional publication could not be found.",
    };
  }

  return {
    title: `${article.title} | Ruven Journal`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [{ url: article.cover_image_url }],
    },
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getDevotionalBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch all products to pass as candidates for direct conversion callouts
  const products = await getProducts();

  // Curate related products (e.g. match by slug keywords)
  const related = products.filter(p => {
    if (slug.includes("armor") && p.slug.includes("armor")) return true;
    if (slug.includes("mind") && p.slug.includes("mind")) return true;
    return false;
  });

  // Fallback to first product if no match
  const candidates = related.length > 0 ? related : [products[0]];

  return <JournalClientPage article={article} relatedProducts={candidates} />;
}
