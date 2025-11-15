"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Locale } from "@/i18n";

interface RegisterPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function RegisterPage({ params }: RegisterPageProps) {
  const router = useRouter();

  useEffect(() => {
    params.then((p) => {
      router.replace(`/${p.locale}/auth?mode=register`);
    });
  }, [params, router]);

  return null;
}
