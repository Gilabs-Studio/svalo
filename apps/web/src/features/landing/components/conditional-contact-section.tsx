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
  const isDashboardRoute = pathname.includes('/dashboard');
  const isServiceDetailRoute = pathname.includes('/services/');

  if (isAuthRoute || isDashboardRoute || isServiceDetailRoute) {
    return null;
  }

  return <ContactSection locale={locale} />;
}

