'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Check } from 'lucide-react';

interface WhyChooseSavloSectionProps {
  readonly locale: Locale;
}

export function WhyChooseSavloSection({ locale }: WhyChooseSavloSectionProps) {
  const messages = getMessages(locale);
  const t = messages.whyChooseSavlo;

  return (
    <section className="min-h-[60vh] flex items-center py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Heading */}
          <div className="text-center">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                {t.heading}
              </AnimatedHeading>
            </div>
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {t.items.map((item, index) => (
              <div
                key={`item-${index}`}
                className="flex items-start gap-4"
              >
                <div className="overflow-hidden">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="overflow-hidden flex-1">
                  <AnimatedText
                    delay={index * 0.1}
                    className="text-lg md:text-xl font-medium"
                  >
                    {item}
                  </AnimatedText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

