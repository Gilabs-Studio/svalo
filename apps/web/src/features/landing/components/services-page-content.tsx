"use client";

import { type Locale } from "@/i18n";
import { getMessages } from "../lib/get-messages";
import { AnimatedHeading } from "./animated-heading";
import { AnimatedText } from "./animated-text";
import TiltedCard from "./tilted-card";
import { iconMap } from "../lib/icon-map";

interface ServicesPageContentProps {
  readonly locale: Locale;
}

export function ServicesPageContent({ locale }: ServicesPageContentProps) {
  const messages = getMessages(locale);
  const t = messages.services;

  return (
    <section className="min-h-[90vh] flex items-center py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Header / Intro */}
          <div className="space-y-8 text-center">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h1"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
              >
                {t.heading}
              </AnimatedHeading>
            </div>
            <div className="space-y-4">
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.2}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold"
                >
                  {t.subtext}
                </AnimatedText>
              </div>
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.3}
                  className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto"
                >
                  {t.intro}
                </AnimatedText>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {t.items?.map(
              (
                service: {
                  title: string;
                  description: string;
                  cta: string;
                  image?: string;
                  icon?: string;
                  detail?: string;
                  smallLine?: string;
                },
                index: number,
              ) => (
                <div
                  key={`service-wrapper-${index}-${service.title}`}
                  className="space-y-6 flex flex-col items-center"
                >
                  <AnimatedText
                    key={`service-${index}-${service.title}`}
                    delay={index * 0.15 + 0.4}
                    className="w-full"
                  >
                    <div className="w-full space-y-6">
                      {/* TiltedCard Image */}
                      <TiltedCard
                        imageSrc={service.image}
                        altText={service.title}
                        captionText={service.title}
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

                      {/* Content */}
                      <div className="space-y-4 text-center">
                        <div className="space-y-2">
                          {service.icon &&
                            (() => {
                              const IconComponent =
                                iconMap[service.icon] || iconMap.scissors;
                              return (
                                <div className="flex justify-center">
                                  <div className="p-2 bg-primary/10 inline-flex">
                                    <IconComponent className="w-5 h-5 text-primary" />
                                  </div>
                                </div>
                              );
                            })()}
                          <h3 className="text-2xl md:text-3xl font-bold">
                            {service.title}
                          </h3>
                          <p className="text-base md:text-lg text-muted-foreground">
                            {service.description}
                          </p>
                          <p className="text-sm md:text-base font-medium">
                            {service.detail}
                          </p>
                        </div>
                        {service.smallLine && (
                          <p className="text-sm text-muted-foreground/70 pt-2 border-t border-border/50">
                            {service.smallLine}
                          </p>
                        )}
                      </div>
                    </div>
                  </AnimatedText>
                </div>
              ),
            )}
          </div>

          {/* Help Section */}
          {t.helpSection && (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
              <div className="overflow-hidden">
                <AnimatedHeading
                  as="h2"
                  className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-none"
                >
                  {t.helpSection.heading}
                </AnimatedHeading>
              </div>
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.2}
                  className="text-lg md:text-xl lg:text-2xl text-muted-foreground"
                >
                  {t.helpSection.body}
                </AnimatedText>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
