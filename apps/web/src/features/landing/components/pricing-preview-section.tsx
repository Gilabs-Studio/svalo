"use client";

import { type Locale } from "@/i18n";
import { getMessages } from "../lib/get-messages";
import { AnimatedHeading } from "./animated-heading";
import { AnimatedText } from "./animated-text";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingPreviewSectionProps {
  readonly locale: Locale;
}

export function PricingPreviewSection({ locale }: PricingPreviewSectionProps) {
  const messages = getMessages(locale);
  const t = messages.pricing;

  return (
    <section className="min-h-[50vh] flex items-center py-24 bg-muted/30">
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
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              {t.subtext}
            </AnimatedText>
          </div>
          <div className="overflow-hidden">
            <Link href={`/${locale}/pricing`}>
              <Button size="lg" className="text-lg px-8 py-6 font-semibold">
                {t.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
