'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type Locale } from '@/i18n';
import { Button } from '@/components/ui/button';
import { getMessages } from '../lib/get-messages';
import { cn } from '@/lib/utils';
import { useParallax } from '../hooks/useParallax';
import gsap from 'gsap';

interface HeroProps {
  readonly locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const messages = getMessages(locale);
  const t = messages.hero;
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useParallax(imageRef, {
    scrollSpeed: 0.3,
    mouseIntensity: 20,
    enableScroll: true,
    enableMouse: true,
  });

  useEffect(() => {
    const timeline = gsap.timeline();

    // Animate headline word by word
    if (headlineRef.current) {
      const words = t.headline.split(' ');
      const wordSpans = words
        .map((word) => `<span class="inline-block mr-2">${word}</span>`)
        .join('');
      
      headlineRef.current.innerHTML = wordSpans;

      const spans = headlineRef.current.querySelectorAll('span');
      timeline.fromTo(
        spans,
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
          stagger: 0.05,
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

    // Animate button - start earlier and faster
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
  }, [t.headline]);

  return (
    <section id="hero-section" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/image/hero.webp"
            alt="Hero background"
            fill
            className="object-cover scale-110"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-left text-white">
        <div className="space-y-8 max-w-5xl">
          <h1 
            ref={headlineRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight will-change-transform"
            aria-label={t.headline}
          >
            {t.headline}
          </h1>
          <p 
            ref={subtextRef}
            className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200 will-change-transform max-w-3xl"
          >
            {t.subtext}
          </p>
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl mb-12 max-w-2xl text-gray-300 font-medium will-change-transform"
          >
            {t.description}
          </p>
          <div ref={buttonRef} className="flex flex-wrap gap-4 justify-start will-change-transform">
            <Link href={`/${locale}/auth/register`}>
              <Button 
                size="lg" 
                variant="outline"
                className={cn(
                  "text-lg md:text-xl px-8 py-6 text-white border-white bg-transparent",
                  "hover:bg-white/10 hover:border-white",
                  "shadow-lg hover:shadow-xl",
                  "transition-all duration-300",
                  "font-bold"
                )}
              >
                {t.cta.startApplication}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

