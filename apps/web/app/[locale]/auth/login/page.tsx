"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Locale } from "@/i18n";

interface LoginPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function LoginPage({ params }: LoginPageProps) {
  const router = useRouter();

  useEffect(() => {
    params.then((p) => {
      router.replace(`/${p.locale}/auth`);
    });
  }, [params, router]);

  return null;
}
