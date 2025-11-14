'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { iconMap } from '../lib/icon-map';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AboutWhySectionProps {
  readonly locale: Locale;
}

export function AboutWhySection({ locale }: AboutWhySectionProps) {
  const messages = getMessages(locale);
  const t = messages;

  if (!t.about || !t.whyPeopleComeBack) {
    return null;
  }

  return (
    <section className="min-h-[90vh] flex items-center py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 w-full overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16 lg:gap-24 w-full">
            {/* Left Column - About */}
            <div className="space-y-12 min-w-0 break-words">
              <div className="overflow-hidden">
                <AnimatedHeading 
                  as="h2"
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
                >
                  {t.about.heading}
                </AnimatedHeading>
              </div>
              <div className="space-y-6">
                {t.about.body.map((line: string, index: number) => (
                  <div key={`about-wrapper-${index}-${line.slice(0, 10)}`} className="overflow-hidden">
                    <AnimatedText
                      key={`about-${index}-${line.slice(0, 10)}`}
                      delay={index * 0.1}
                      className={cn(
                        "font-bold",
                        index === 0 && "text-2xl md:text-3xl lg:text-4xl",
                        index === 1 && "text-xl md:text-2xl lg:text-3xl",
                        index === 2 && "text-xl md:text-2xl lg:text-3xl",
                        index === 3 && "text-lg md:text-xl lg:text-2xl text-muted-foreground"
                      )}
                    >
                      {line}
                    </AnimatedText>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <Separator 
              orientation="vertical" 
              className="hidden lg:block h-full min-h-[400px] bg-border/50"
            />

            {/* Right Column - Why People Come Back */}
            <div className="space-y-12 min-w-0 break-words">
              <div className="overflow-hidden">
                <AnimatedHeading 
                  as="h2"
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
                >
                  {t.whyPeopleComeBack.heading}
                </AnimatedHeading>
              </div>
              <div className="space-y-8">
                {t.whyPeopleComeBack.items.map((item: { icon: string; text: string }, index: number) => {
                  const IconComponent = iconMap[item.icon] || iconMap.clock;
                  return (
                    <div key={`why-wrapper-${index}-${item.icon}`} className="overflow-hidden">
                      <AnimatedText
                        key={`why-${index}-${item.icon}`}
                        delay={index * 0.15}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10">
                            <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                          </div>
                          <p className="text-xl md:text-2xl lg:text-3xl font-bold break-words">
                            {item.text}
                          </p>
                        </div>
                      </AnimatedText>
                    </div>
                  );
                })}
              </div>
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.6}
                  className="text-lg md:text-xl lg:text-2xl font-bold text-muted-foreground"
                >
                  {t.whyPeopleComeBack.smallLine}
                </AnimatedText>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}

