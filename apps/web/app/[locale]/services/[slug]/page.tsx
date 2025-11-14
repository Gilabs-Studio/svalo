import { type Locale } from '@/i18n';
import { ServiceDetailPage } from '@/features/landing/components/service-detail-page';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { isValidServiceSlug } from '@/features/landing/lib/service-slug';
import { getServiceDetails } from '@/features/landing/lib/get-service-details';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  
  if (!locales.includes(localeParam as Locale) || !isValidServiceSlug(slug)) {
    return {
      title: 'Service Not Found',
    };
  }

  const locale = localeParam as Locale;
  const details = getServiceDetails(locale, slug);

  if (!details) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${details.headline} — Savlo`,
    description: details.shortDescription,
  };
}

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

