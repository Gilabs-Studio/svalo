'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { cn } from '@/lib/utils';

interface HowItWorksSectionProps {
  readonly locale: Locale;
}

export function HowItWorksSection({ locale }: HowItWorksSectionProps) {
  const messages = getMessages(locale);
  const t = messages.howItWorks;

  return (
    <section className="min-h-[80vh] flex items-center py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Heading */}
          <div className="text-center space-y-4">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                {t.heading}
              </AnimatedHeading>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {t.steps.map((step, index) => (
              <div
                key={`step-${index}`}
                className="space-y-4 text-center"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText
                    delay={index * 0.1}
                    className="text-xl md:text-2xl font-bold mb-2"
                  >
                    {step.title}
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText
                    delay={index * 0.1 + 0.1}
                    className="text-base md:text-lg text-muted-foreground"
                  >
                    {step.description}
                  </AnimatedText>
                </div>
              </div>
            ))}
          </div>

          {/* Microcopy */}
          <div className="text-center pt-8">
            <div className="overflow-hidden">
              <AnimatedText
                delay={0.4}
                className="text-lg md:text-xl text-muted-foreground font-medium"
              >
                {t.microcopy}
              </AnimatedText>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


