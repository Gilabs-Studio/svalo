'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
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

    // Animate buttons
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
          src="/image/hero.webp"
          alt="Error Background"
          fill
          className="object-cover scale-110"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="space-y-8 max-w-5xl mx-auto">
          <h1 
            ref={headlineRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-none will-change-transform"
          >
            Oops!
          </h1>
          <p 
            ref={subtextRef}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-200 will-change-transform"
          >
            Something went wrong
          </p>
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl lg:text-2xl mb-12 max-w-2xl mx-auto text-gray-300 font-medium will-change-transform"
          >
            We encountered an unexpected error. Don&apos;t worry, our team has been notified.
          </p>
          {error.digest && (
            <p className="text-sm text-gray-400 font-mono mb-4">
              Error ID: {error.digest}
            </p>
          )}
          <div ref={buttonRef} className="flex justify-center gap-4 flex-wrap will-change-transform">
            <Button 
              size="lg" 
              variant="outline"
              onClick={reset}
              className={cn(
                "text-lg md:text-xl px-8 py-6 text-white border-white bg-transparent",
                "hover:bg-white/10 hover:border-white",
                "shadow-lg hover:shadow-xl",
                "transition-all duration-300",
                "font-bold"
              )}
            >
              Try Again
            </Button>
            <Link href="/">
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
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

