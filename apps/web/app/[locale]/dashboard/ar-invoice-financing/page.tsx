"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/i18n";
import { ARInvoiceFinancingForm } from "@/features/dashboard/components/ar-invoice-financing-form";

interface ARInvoiceFinancingPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function ARInvoiceFinancingPage({
  params,
}: ARInvoiceFinancingPageProps) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  return <ARInvoiceFinancingForm locale={locale} />;
}
