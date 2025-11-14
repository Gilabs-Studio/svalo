'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from '@/features/landing/components/animated-heading';
import { AnimatedText } from '@/features/landing/components/animated-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { FAQCategory, FAQItem } from '../types';

interface FAQContentProps {
  readonly locale: Locale;
}

export function FAQContent({ locale }: FAQContentProps) {
  const messages = getMessages(locale);
  const t = messages;
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>('');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Scroll spy untuk tracking kategori aktif
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const [categoryTitle, element] of Object.entries(categoryRefs.current)) {
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(categoryTitle);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [t.categories]);

  // Scroll to category
  const scrollToCategory = (categoryTitle: string) => {
    const element = categoryRefs.current[categoryTitle];
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Minimalist */}
      <section className="flex items-center py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight"
              >
                {t.heading}
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText
                delay={0.1}
                className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light"
              >
                {t.subtext}
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 md:px-6 pb-32">
        <div className="flex gap-12 lg:gap-16">
          {/* Mini Sidebar - Categories Navigation */}
          <aside className="hidden lg:block shrink-0 w-48">
            <div className="sticky top-24 pt-4">
              <nav className="space-y-1">
                {t.categories.map((category: FAQCategory) => {
                  const isActive = activeCategory === category.title;
                  return (
                    <button
                      key={category.title}
                      onClick={() => scrollToCategory(category.title)}
                      className={cn(
                        'w-full text-left px-3 py-2 text-sm font-normal transition-colors rounded-md',
                        isActive
                          ? 'text-foreground bg-muted/50'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      )}
                    >
                      {category.title}
                    </button>
                  );
                })}
                {t.howToApply && (
                  <button
                    onClick={() => {
                      const element = document.getElementById('how-to-apply');
                      if (element) {
                        const offset = 100;
                        const elementPosition = element.offsetTop - offset;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors rounded-md mt-4 pt-4 border-t border-border/50"
                  >
                    {t.howToApply.heading}
                  </button>
                )}
              </nav>
            </div>
          </aside>

          {/* FAQ Content - Clean Single Column */}
          <div className="flex-1 max-w-4xl space-y-20">
            {/* FAQ Categories */}
            {t.categories.map((category: FAQCategory, categoryIndex: number) => (
              <section
                key={categoryIndex}
                ref={(el) => {
                  categoryRefs.current[category.title] = el;
                }}
                className="space-y-8"
              >
                <div className="overflow-hidden">
                  <AnimatedHeading
                    as="h2"
                    className="text-2xl md:text-3xl font-light tracking-tight text-foreground"
                  >
                    {category.title}
                  </AnimatedHeading>
                </div>
                
                <div className="space-y-1">
                  {category.items.map((item: FAQItem, itemIndex: number) => {
                    const key = `${categoryIndex}-${itemIndex}`;
                    const isOpen = openItems[key] || false;
                    return (
                      <div
                        key={itemIndex}
                        className="border-b border-border/50 last:border-b-0"
                      >
                        <button
                          onClick={() => toggleItem(categoryIndex, itemIndex)}
                          className="w-full py-6 flex items-start justify-between gap-6 text-left group hover:opacity-70 transition-opacity"
                        >
                          <span className="text-base md:text-lg font-normal text-foreground pr-4 flex-1 leading-relaxed">
                            {item.question}
                          </span>
                          <div className={cn(
                            "shrink-0 pt-1 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}>
                            <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="pb-6 pl-0">
                            <AnimatedText
                              delay={0.05}
                              className="text-base text-muted-foreground leading-relaxed max-w-none"
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

            {/* How to Apply Section - Simplified */}
            {t.howToApply && (
              <section
                id="how-to-apply"
                className="space-y-8 pt-16 border-t border-border/50"
              >
                <div className="overflow-hidden">
                  <AnimatedHeading
                    as="h2"
                    className="text-2xl md:text-3xl font-light tracking-tight"
                  >
                    {t.howToApply.heading}
                  </AnimatedHeading>
                </div>
                <div className="space-y-6">
                  {t.howToApply.steps.map((step, index: number) => (
                    <div
                      key={index}
                      className="overflow-hidden"
                    >
                      <AnimatedText delay={index * 0.05}>
                        <div className="flex gap-4">
                          <div className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center mt-1">
                            <span className="text-xs font-normal text-foreground">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="text-base font-normal text-foreground">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </AnimatedText>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact CTA Section - Minimalist */}
            {t.contactCta && (
              <section className="space-y-8 pt-16 border-t border-border/50 text-center">
                <div className="overflow-hidden">
                  <AnimatedHeading
                    as="h2"
                    className="text-2xl md:text-3xl font-light tracking-tight"
                  >
                    {t.contactCta.heading}
                  </AnimatedHeading>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText
                    delay={0.1}
                    className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto font-light"
                  >
                    {t.contactCta.subtext}
                  </AnimatedText>
                </div>
                <div className="overflow-hidden pt-4">
                  <Link href={t.contactCta.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-base px-8 py-6 font-normal border-2 hover:bg-foreground hover:text-background transition-all duration-200"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t.contactCta.buttonText}
                    </Button>
                  </Link>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
