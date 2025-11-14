'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type Locale, defaultLocale, locales } from '@/i18n';
import { Button } from '@/components/ui/button';
import { getMessages } from '@/features/landing/lib/get-messages';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

export default function NotFound() {
  const params = useParams();
  const localeParam = params?.locale as string | undefined;
  const locale: Locale = 
    localeParam && locales.includes(localeParam as Locale) 
      ? (localeParam as Locale) 
      : defaultLocale;
  const messages = getMessages(locale);
  const t = messages.notFound ?? {
    headline: '404',
    subtext: 'Page Not Found',
    description: "Looks like this page got a bad cut. Let's get you back on track.",
    cta: { home: 'Go Home' },
  };
  
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Animate headline
    if (headlineRef.current) {
      timeline.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.7,
          ease: 'power3.out',
        }
      );
    }

    // Animate subtext
    if (subtextRef.current) {
      timeline.fromTo(
        subtextRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }

    // Animate description
    if (descriptionRef.current) {
      timeline.fromTo(
        descriptionRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: 'power3.out',
        },
        '-=0.2'
      );
    }

    // Animate button
    if (buttonRef.current) {
      timeline.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(1.2)',
        },
        '-=0.1'
      );
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/image.webp"
          alt="Top Gun Barber Shop"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/70" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="space-y-8 max-w-5xl mx-auto">
          <h1 
            ref={headlineRef}
            className="text-8xl md:text-9xl lg:text-[12rem] font-black leading-none will-change-transform"
          >
            {t.headline}
          </h1>
          <p 
            ref={subtextRef}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-200 will-change-transform"
          >
            {t.subtext}
          </p>
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto text-gray-300 font-medium will-change-transform"
          >
            {t.description}
          </p>
          <div ref={buttonRef} className="flex justify-center will-change-transform">
            <Link href={`/${locale}`}>
              <Button 
                size="lg" 
                className={cn(
                  "text-xl md:text-2xl px-12 py-8 text-black hover:text-white hover:border",
                  "bg-white hover:bg-black/0",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-300",
                  "font-bold"
                )}
              >
                {t.cta.home}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

