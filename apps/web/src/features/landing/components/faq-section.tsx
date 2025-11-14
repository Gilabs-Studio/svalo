'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQSectionProps {
  readonly locale: Locale;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export function FAQSection({ locale }: FAQSectionProps) {
  const messages = getMessages(locale);
  const t = messages.faq;
  
  if (!t) {
    return null;
  }
  
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h1"
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
              >
                {t.heading}
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText
                delay={0.1}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              >
                {t.subtext}
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* FAQ Categories */}
          {t.categories.map((category: FAQCategory, categoryIndex: number) => (
            <section key={categoryIndex} className="space-y-6">
              <div className="overflow-hidden">
                <AnimatedHeading
                  as="h2"
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                  {category.title}
                </AnimatedHeading>
              </div>
              <Separator className="bg-border/50" />
              <div className="space-y-4">
                {category.items.map((item: FAQItem, itemIndex: number) => {
                  const key = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems[key] || false;
                  return (
                    <div
                      key={itemIndex}
                      className="border border-border rounded-lg overflow-hidden bg-card"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, itemIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-semibold text-lg pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <AnimatedText
                            delay={0.05}
                            className="text-muted-foreground leading-relaxed"
                          >
                            {item.answer}
                          </AnimatedText>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {/* How to Apply Section */}
          {t.howToApply && (
            <section className="space-y-8 pt-12 border-t border-border">
              <div className="overflow-hidden">
                <AnimatedHeading
                  as="h2"
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                  {t.howToApply.heading}
                </AnimatedHeading>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.howToApply.steps.map((step: { title: string; description: string }, index: number) => (
                <div
                  key={index}
                  className="overflow-hidden"
                >
                  <AnimatedText delay={index * 0.1}>
                    <div className="bg-muted/30 rounded-xl p-6 h-full space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xl font-bold text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </AnimatedText>
                </div>
              ))}
              </div>
            </section>
          )}

          {/* Contact CTA Section */}
          {t.contactCta && (
            <section className="space-y-8 pt-12 border-t border-border">
              <div className="text-center space-y-6">
                <div className="overflow-hidden">
                  <AnimatedHeading
                    as="h2"
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                  >
                    {t.contactCta.heading}
                  </AnimatedHeading>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText
                    delay={0.1}
                    className="text-lg md:text-xl text-muted-foreground"
                  >
                    {t.contactCta.subtext}
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <Link href={t.contactCta.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 font-semibold bg-[#25D366] hover:bg-[#20ba5a] text-white"
                    >
                      {t.contactCta.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

