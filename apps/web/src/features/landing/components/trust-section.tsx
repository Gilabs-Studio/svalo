'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from '@/components/ui/shadcn-io/marquee';

interface TrustSectionProps {
  readonly locale: Locale;
}

export function TrustSection({ locale }: TrustSectionProps) {
  const messages = getMessages(locale);
  const t = messages.trust;

  return (
    <section className="min-h-[40vh] flex items-center py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
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

          {/* Logo Marquee */}
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
            <Marquee pauseOnHover className="[--duration:30s]">
              <MarqueeFade 
                side="left" 
                className="w-1/4 bg-gradient-to-r from-background via-background/80 to-transparent"
              />
              <MarqueeFade 
                side="right" 
                className="w-1/4 bg-gradient-to-l from-background via-background/80 to-transparent"
              />
              <MarqueeContent>
                {Array.from({ length: 10 }, (_, index) => (
                  <MarqueeItem key={index} className="h-16 w-40 md:h-20 md:w-48 mx-6">
                    <div className="flex items-center justify-center h-full w-full">
                      <div className="h-full w-full bg-gray-50 rounded-md flex items-center justify-center border border-gray-100">
                        <span className="text-gray-400 text-sm font-medium">
                          Partner {index + 1}
                        </span>
                      </div>
                    </div>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

