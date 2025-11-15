"use client";

import { useEffect, useState } from "react";
import { type Locale } from "@/i18n";
import { DashboardPage as DashboardPageComponent } from "@/features/dashboard/components/dashboard-page";

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  return <DashboardPageComponent locale={locale} />;
}
