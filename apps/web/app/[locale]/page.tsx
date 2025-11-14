import { type Locale } from '@/i18n';
import { Hero } from '@/features/landing/components/hero';
import { HowItWorksSection } from '@/features/landing/components/how-it-works-section';
import { ServicesSection } from '@/features/landing/components/services-section';
import { ChoosePlanSection } from '@/features/landing/components/choose-plan-section';
import { WhyChooseSavloSection } from '@/features/landing/components/why-choose-savlo-section';
import { TrustSection } from '@/features/landing/components/trust-section';
import { ContactSection } from '@/features/landing/components/contact-section';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';

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
      <Hero locale={locale} />
      <HowItWorksSection locale={locale} />
      <ServicesSection locale={locale} />
      <ChoosePlanSection locale={locale} />
      <WhyChooseSavloSection locale={locale} />
      <TrustSection locale={locale} />
    </div>
  );
}
