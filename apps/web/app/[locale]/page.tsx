import { type Locale } from '@/i18n';
import { Hero } from '@/features/landing/components/hero';
import { HowItWorksSection } from '@/features/landing/components/how-it-works-section';
import { ProductsSection } from '@/features/landing/components/products-section';
import { WhyChooseSavloSection } from '@/features/landing/components/why-choose-savlo-section';
import { PricingPreviewSection } from '@/features/landing/components/pricing-preview-section';
import { TrustSection } from '@/features/landing/components/trust-section';
import { FooterCtaSection } from '@/features/landing/components/footer-cta-section';
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
      <ProductsSection locale={locale} />
      <WhyChooseSavloSection locale={locale} />
      <PricingPreviewSection locale={locale} />
      <TrustSection locale={locale} />
      <FooterCtaSection locale={locale} />
    </div>
  );
}
