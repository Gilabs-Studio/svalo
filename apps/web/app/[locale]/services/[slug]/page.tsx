import { type Locale } from "@/i18n";
import { ServiceDetailPage } from "@/features/landing/components/service-detail-page";
import { locales } from "@/i18n";
import { isValidServiceSlug } from "@/features/landing/lib/service-slug";
import { notFound } from "next/navigation";

export default async function ServiceDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;

  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }

  if (!isValidServiceSlug(slug)) {
    notFound();
  }

  const locale = localeParam as Locale;

  return <ServiceDetailPage locale={locale} slug={slug} />;
}
