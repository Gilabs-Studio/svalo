'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ChoosePlanSectionProps {
  readonly locale: Locale;
}

export function ChoosePlanSection({ locale }: ChoosePlanSectionProps) {
  const messages = getMessages(locale);
  const t = messages.choosePlan;

  return (
    <section className="relative py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900"
              >
                {t.heading}
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText
                delay={0.1}
                className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
              >
                {t.subtext}
              </AnimatedText>
            </div>
          </div>

          {/* Plans Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Savlo Plan */}
            <div className="relative bg-gray-50 rounded-3xl p-8 lg:p-10 border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {t.savlo.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-700 mb-4">
                    {t.savlo.overview}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {t.savlo.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Eligibility
                    </h4>
                    <ul className="space-y-2">
                      {t.savlo.eligibility.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Financing Partners
                    </h4>
                    <p className="text-gray-700">{t.savlo.partners}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Value Propositions
                    </h4>
                    <ul className="space-y-2">
                      {t.savlo.valueProps.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-gray-900 shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={`/${locale}/auth/register`}>
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 font-semibold py-6 text-lg">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Savlo+ Plan */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-10 border-2 border-gray-900 hover:border-gray-700 transition-all duration-300 shadow-2xl">
              <div className="absolute top-6 right-6">
                <span className="px-4 py-1.5 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full">
                  {t.savloPlus.badge}
                </span>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {t.savloPlus.name}
                  </h3>
                  <p className="text-lg font-semibold text-white/90 mb-4">
                    {t.savloPlus.overview}
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {t.savloPlus.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                      Eligibility
                    </h4>
                    <ul className="space-y-2">
                      {t.savloPlus.eligibility.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-white shrink-0 mt-0.5" />
                          <span className="text-white/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                      Financing Partners
                    </h4>
                    <p className="text-white/90">{t.savloPlus.partners}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                      Value Propositions
                    </h4>
                    <ul className="space-y-2">
                      {t.savloPlus.valueProps.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-white shrink-0 mt-0.5" />
                          <span className="text-white/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={`/${locale}/contact`}>
                  <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold py-6 text-lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

