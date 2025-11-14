import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { NavbarWrapper } from '@/features/landing/components/navbar-wrapper';
import { getMessages } from '@/features/landing/lib/get-messages';
import { ContactSection } from '@/features/landing/components/contact-section';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = getMessages(locale as Locale);
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as Locale)) {
    notFound();
  }
  const safeLocale = locale as Locale;

  return (
    <>
      <NavbarWrapper locale={safeLocale} />
      <main className="min-h-screen">{children}</main>
      <ContactSection locale={safeLocale} />
    </>
  );
}

