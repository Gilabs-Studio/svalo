'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import TiltedCard from './tilted-card';

interface ServicesSectionProps {
  readonly locale: Locale;
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const messages = getMessages(locale);
  const t = messages.services;

  return (
    <section className="min-h-[90vh] flex items-center py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <AnimatedHeading 
            as="h2"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-center"
          >
            {t.heading}
          </AnimatedHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {t.items.map((item, index) => (
              <div
                key={`service-${index}-${item.title}`}
                className="space-y-4 flex flex-col items-center"
              >
                <TiltedCard
                  imageSrc={item.image}
                  altText={item.title}
                  captionText={item.title}
                  containerHeight="400px"
                  containerWidth="100%"
                  imageHeight="400px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.05}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={false}
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <AnimatedText delay={0.5}>
              <Link href={`/${locale}/contact`}>
                <Button 
                  size="lg" 
                  className={cn(
                    "text-xl md:text-2xl px-12 py-8",
                    "font-bold"
                  )}
                >
                  {t.cta.book}
                </Button>
              </Link>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
}

