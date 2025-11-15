import { type Locale } from "@/i18n";
import { Hero } from "@/features/landing/components/hero";
import { TrustSection } from "@/features/landing/components/trust-section";
import { HowItWorksSection } from "@/features/landing/components/how-it-works-section";
import { ServicesSection } from "@/features/landing/components/services-section";
import { WhyChooseSavloSection } from "@/features/landing/components/why-choose-savlo-section";
import { ChoosePlanSection } from "@/features/landing/components/choose-plan-section";
import { locales } from "@/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }
  const locale = localeParam as Locale;

  return (
    <div>
      {/* 1. Hero - Introduction & Value Proposition */}
      <Hero locale={locale} />

      {/* 2. Trust - Build Credibility Early (Social Proof) */}
      <TrustSection locale={locale} />

      {/* 3. How It Works - Explain the Process */}
      <HowItWorksSection locale={locale} />

      {/* 4. Services - Show What You Offer */}
      <ServicesSection locale={locale} />

      {/* 5. Why Choose - Benefits & Features */}
      <WhyChooseSavloSection locale={locale} />

      {/* 6. Pricing - Plans & Options */}
      <ChoosePlanSection locale={locale} />
    </div>
  );
}
