'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ProductsSectionProps {
  readonly locale: Locale;
}

export function ProductsSection({ locale }: ProductsSectionProps) {
  const messages = getMessages(locale);
  const t = messages.products;

  return (
    <section className="min-h-[80vh] flex items-center py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-16">
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.items.map((product, index) => (
              <div
                key={`product-${index}`}
                className="group bg-background border p-6 md:p-8 space-y-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="overflow-hidden">
                  <AnimatedText
                    delay={index * 0.1}
                    className="text-xl md:text-2xl font-bold mb-2"
                  >
                    {product.title}
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText
                    delay={index * 0.1 + 0.05}
                    className="text-base text-muted-foreground mb-6"
                  >
                    {product.description}
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <Link href={`/${locale}/products#${product.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button
                      variant="ghost"
                      className="group-hover:text-primary transition-colors p-0 h-auto font-medium"
                    >
                      {product.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

