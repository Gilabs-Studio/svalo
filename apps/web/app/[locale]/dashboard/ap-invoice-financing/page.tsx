'use client';

import { useState, useEffect } from 'react';
import { type Locale } from '@/i18n';
import { APInvoiceFinancingForm } from '@/features/dashboard/components/ap-invoice-financing-form';

interface APInvoiceFinancingPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function APInvoiceFinancingPage({ params }: APInvoiceFinancingPageProps) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  return <APInvoiceFinancingForm locale={locale} />;
}
