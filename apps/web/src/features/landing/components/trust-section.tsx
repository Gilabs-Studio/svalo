'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';

interface TrustSectionProps {
  readonly locale: Locale;
}

export function TrustSection({ locale }: TrustSectionProps) {
  const messages = getMessages(locale);
  const t = messages.trust;

  return (
    <section className="min-h-[40vh] flex items-center py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <div className="overflow-hidden">
            <AnimatedHeading
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              {t.heading}
            </AnimatedHeading>
          </div>
          <div className="overflow-hidden">
            <AnimatedText
              delay={0.1}
              className="text-lg md:text-xl text-muted-foreground"
            >
              {t.microcopy}
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}

