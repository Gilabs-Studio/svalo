import type { Metadata } from 'next';
import { type Locale } from '@/i18n';
import { getMessages } from '@/features/landing/lib/get-messages';
import { NavbarWrapper } from '@/features/landing/components/navbar-wrapper';
import { WhatsAppFab } from '@/features/landing/components/whatsapp-fab';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale as Locale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = locale as Locale;

  return (
    <>
      <NavbarWrapper locale={safeLocale} />
      <main className="min-h-screen">{children}</main>
      <WhatsAppFab />
      {/* No ContactSection footer for auth pages */}
    </>
  );
}

