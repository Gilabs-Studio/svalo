import { type Locale } from '@/i18n';
import { ServicesPageContent } from '@/features/landing/components/services-page-content';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }
  const locale = localeParam as Locale;

  return <ServicesPageContent locale={locale} />;
}

