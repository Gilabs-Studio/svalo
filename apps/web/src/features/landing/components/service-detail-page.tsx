'use client';

import { type Locale } from '@/i18n';
import { getServiceDetails } from '../lib/get-service-details';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { useParallax } from '../hooks/useParallax';
import Image from 'next/image';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

interface ServiceDetailPageProps {
  readonly locale: Locale;
  readonly slug: string;
}

function getDashboardRoute(slug: string, locale: Locale): string {
  const routeMap: Record<string, string> = {
    'bpkb-based-financing': `/${locale}/dashboard/bpkb-financing`,
    'property-based-financing': `/${locale}/dashboard/property-financing`,
    'ap-invoice-financing': `/${locale}/dashboard/ap-invoice-financing`,
    'ar-invoice-financing': `/${locale}/dashboard/ar-invoice-financing`,
    'ecosystem-banking-solutions': `/${locale}/dashboard`,
  };
  return routeMap[slug] || `/${locale}/dashboard`;
}

export function ServiceDetailPage({ locale, slug }: ServiceDetailPageProps) {
  const details = getServiceDetails(locale, slug);
  const imageRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();
  const dashboardRoute = getDashboardRoute(slug, locale);

  useParallax(imageRef, {
    scrollSpeed: 0.15,
    mouseIntensity: 10,
    enableScroll: true,
    enableMouse: true,
  });

  if (!details) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero-section" className="relative min-h-[60vh] flex items-center py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            ref={imageRef}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/image/service.webp"
              alt="Service background"
              fill
              className="object-cover scale-110"
              priority
              quality={90}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h1"
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight"
              >
                {details.headline}
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText
                delay={0.1}
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
              >
                {details.shortDescription}
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto space-y-24">
          {/* Key Benefits */}
          <section className="space-y-8">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl font-black tracking-tight"
              >
                Key Benefits
              </AnimatedHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.keyBenefits.map((benefit, index) => (
                <div key={index} className="overflow-hidden">
                  <AnimatedText
                    delay={index * 0.1}
                    className="flex items-start gap-4"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-lg font-medium leading-relaxed">
                      {benefit}
                    </p>
                  </AnimatedText>
                </div>
              ))}
            </div>
          </section>

          {/* Funding Details */}
          <section className="space-y-8">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl font-black tracking-tight"
              >
                Funding Details
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText delay={0.1}>
                <div className="bg-muted/50 rounded-2xl p-8 space-y-4">
                  {Object.entries(details.fundingDetails).map(([key, value], index) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider min-w-[140px]">
                        {key === 'collateral' ? 'Collateral' :
                         key === 'amount' ? 'Amount' :
                         key === 'maxLimit' ? 'Max Limit' :
                         key === 'limit' ? 'Limit' :
                         key === 'tenor' ? 'Tenor' :
                         key === 'interest' ? 'Interest Rate' :
                         key === 'invoiceType' ? 'Invoice Type' :
                         key === 'products' ? 'Products' :
                         key === 'process' ? 'Process' :
                         key}
                      </span>
                      <span className="text-lg font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </AnimatedText>
            </div>
          </section>

          {/* Requirements */}
          <section className="space-y-8">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl font-black tracking-tight"
              >
                Requirements
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText delay={0.1}>
                <div className="space-y-4">
                  {details.requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-lg leading-relaxed">{req}</p>
                    </div>
                  ))}
                </div>
              </AnimatedText>
            </div>
          </section>

          {/* Process Steps */}
          <section className="space-y-8">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl font-black tracking-tight"
              >
                Process
              </AnimatedHeading>
            </div>
            <div className="space-y-6">
              {details.process.map((step, index) => (
                <div key={index} className="overflow-hidden">
                  <AnimatedText delay={index * 0.1}>
                    <div className="flex items-start gap-6">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="text-lg font-medium leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  </AnimatedText>
                </div>
              ))}
            </div>
          </section>

          {/* Best For */}
          <section className="space-y-8">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl font-black tracking-tight"
              >
                Who Is This For
              </AnimatedHeading>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {details.bestFor.map((item, index) => (
                <div key={index} className="overflow-hidden">
                  <AnimatedText
                    delay={index * 0.1}
                    className="bg-muted/30 rounded-xl p-6 h-full"
                  >
                    <p className="text-base font-medium leading-relaxed text-center">
                      {item}
                    </p>
                  </AnimatedText>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="space-y-8 pt-12 border-t border-border">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-3xl md:text-4xl font-black tracking-tight text-center"
              >
                {details.cta.heading}
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText delay={0.1}>
                {isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={dashboardRoute}>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto text-lg px-8 py-6 font-semibold"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href={`/${locale}/auth/login`}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto text-lg px-8 py-6 font-semibold"
                      >
                        {details.cta.login}
                      </Button>
                    </Link>
                    <Link href={`/${locale}/auth/register`}>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto text-lg px-8 py-6 font-semibold"
                      >
                        {details.cta.createAccount}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                )}
              </AnimatedText>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

