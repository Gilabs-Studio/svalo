'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from '@/features/landing/components/animated-heading';
import { AnimatedText } from '@/features/landing/components/animated-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronDown, ChevronUp, MessageCircle, HelpCircle, FileText, Building2, Receipt, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { FAQCategory, FAQItem } from '../types';

interface FAQContentProps {
  readonly locale: Locale;
}

const categoryIcons = {
  'General Questions': HelpCircle,
  'Pertanyaan Umum': HelpCircle,
  'Savlo+': Sparkles,
  'BPKB-based Financing': FileText,
  'Pembiayaan Berbasis BPKB': FileText,
  'Property-based Financing': Building2,
  'Pembiayaan Berbasis Properti': Building2,
  'Invoice Financing': Receipt,
  'Pembiayaan Invoice': Receipt,
};

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

  // Handle scroll spy for active category
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

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
      const offset = 120; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Fixed Sidebar Navigation */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40 pt-24 pb-8 px-6 overflow-y-auto">
        <div className="sticky top-24 space-y-2">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Categories
            </h3>
          </div>
          {t.categories.map((category: FAQCategory) => {
            const Icon = categoryIcons[category.title as keyof typeof categoryIcons] || HelpCircle;
            const isActive = activeCategory === category.title;
            return (
              <button
                key={category.title}
                onClick={() => scrollToCategory(category.title)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 group',
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
              >
                <Icon className={cn(
                  'w-4 h-4 shrink-0 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )} />
                <span className="text-sm font-medium">{category.title}</span>
              </button>
            );
          })}
          <div className="pt-8 mt-8 border-t border-border">
            <Link
              href={t.contactCta.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] transition-colors group"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Contact Support</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
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

        {/* Bento Grid FAQ Content */}
        <div className="container mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
              {t.categories.map((category: FAQCategory, categoryIndex: number) => {
                const Icon = categoryIcons[category.title as keyof typeof categoryIcons] || HelpCircle;
                const isLarge = categoryIndex === 0 || categoryIndex === 2;
                const isTall = categoryIndex === 1 || categoryIndex === 4;

                return (
                  <div
                    key={categoryIndex}
                    ref={(el) => {
                      categoryRefs.current[category.title] = el;
                    }}
                    id={`category-${categoryIndex}`}
                    className={cn(
                      'bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300',
                      isLarge && 'md:col-span-2',
                      isTall && 'md:row-span-2'
                    )}
                  >
                    {/* Category Header */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="p-2.5 bg-primary/10 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <AnimatedHeading
                        as="h2"
                        className="text-2xl md:text-3xl font-bold tracking-tight"
                      >
                        {category.title}
                      </AnimatedHeading>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3">
                      {category.items.map((item: FAQItem, itemIndex: number) => {
                        const key = `${categoryIndex}-${itemIndex}`;
                        const isOpen = openItems[key] || false;
                        return (
                          <div
                            key={itemIndex}
                            className="border border-border/50 rounded-xl overflow-hidden bg-muted/20 hover:bg-muted/40 transition-colors"
                          >
                            <button
                              onClick={() => toggleItem(categoryIndex, itemIndex)}
                              className="w-full px-4 py-3.5 flex items-start justify-between gap-4 text-left group"
                            >
                              <span className="font-semibold text-sm md:text-base pr-2 flex-1 group-hover:text-primary transition-colors">
                                {item.question}
                              </span>
                              <div className="shrink-0 pt-1">
                                {isOpen ? (
                                  <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                )}
                              </div>
                            </button>
                            {isOpen && (
                              <div className="px-4 pb-4">
                                <AnimatedText
                                  delay={0.05}
                                  className="text-sm md:text-base text-muted-foreground leading-relaxed"
                                >
                                  {item.answer}
                                </AnimatedText>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* How to Apply - Large Bento Card */}
              <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 md:p-10 shadow-sm">
                <div className="mb-8">
                  <AnimatedHeading
                    as="h2"
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
                  >
                    {t.howToApply.heading}
                  </AnimatedHeading>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {t.howToApply.steps.map((step, index: number) => (
                    <div
                      key={index}
                      className="overflow-hidden"
                    >
                      <AnimatedText delay={index * 0.1}>
                        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-5 h-full space-y-3 border border-border/50 hover:border-primary/50 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="text-lg font-bold text-primary">
                                {index + 1}
                              </span>
                            </div>
                            <h3 className="text-base md:text-lg font-bold">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </AnimatedText>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact CTA - Full Width Bento Card */}
              <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-[#25D366]/10 via-[#25D366]/5 to-[#25D366]/10 border-2 border-[#25D366]/20 rounded-2xl p-8 md:p-12 text-center space-y-6">
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
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
                  >
                    {t.contactCta.subtext}
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <Link href={t.contactCta.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 font-semibold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg hover:shadow-xl transition-all"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {t.contactCta.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Navigation */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <div className="bg-card border border-border rounded-full shadow-lg p-2">
          <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
            {t.categories.map((category: FAQCategory) => {
              const Icon = categoryIcons[category.title as keyof typeof categoryIcons] || HelpCircle;
              const isActive = activeCategory === category.title;
              return (
                <button
                  key={category.title}
                  onClick={() => scrollToCategory(category.title)}
                  className={cn(
                    'p-3 rounded-full transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-foreground'
                  )}
                  title={category.title}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
