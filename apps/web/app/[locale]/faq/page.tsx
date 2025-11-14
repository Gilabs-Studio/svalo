import { type Locale } from '@/i18n';
import { FAQContent } from '@/features/faq/components/faq-content';
import { getMessages } from '@/features/faq/lib/get-messages';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) {
    return {};
  }
  const locale = localeParam as Locale;
  const messages = getMessages(locale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    openGraph: {
      title: messages.metadata.title,
      description: messages.metadata.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata.title,
      description: messages.metadata.description,
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }
  const locale = localeParam as Locale;

  return <FAQContent locale={locale} />;
}

