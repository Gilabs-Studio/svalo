'use client';

import { usePathname } from 'next/navigation';
import { type Locale } from '@/i18n';
import { ContactSection } from './contact-section';

interface ConditionalContactSectionProps {
  readonly locale: Locale;
}

export function ConditionalContactSection({ locale }: ConditionalContactSectionProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname.includes('/auth');

  if (isAuthRoute) {
    return null;
  }

  return <ContactSection locale={locale} />;
}

