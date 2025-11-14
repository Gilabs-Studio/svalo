'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FooterCtaSectionProps {
  readonly locale: Locale;
}

export function FooterCtaSection({ locale }: FooterCtaSectionProps) {
  const messages = getMessages(locale);
  const t = messages.footerCta;

  return (
    <section className="min-h-[50vh] flex items-center py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="overflow-hidden">
            <AnimatedHeading
              as="h3"
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              {t.heading}
            </AnimatedHeading>
          </div>
          <div className="overflow-hidden">
            <AnimatedText
              delay={0.1}
              className="text-lg md:text-xl text-gray-300 mb-8"
            >
              {t.subtext}
            </AnimatedText>
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={`/${locale}/auth/register`}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 font-semibold bg-white text-black hover:bg-gray-100"
                >
                  {t.cta.startApplication}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 font-semibold border-white text-white hover:bg-white hover:text-black"
                >
                  {t.cta.contactSales}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

