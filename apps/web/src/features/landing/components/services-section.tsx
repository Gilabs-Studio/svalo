'use client';

import { useRef, useState, useEffect } from 'react';
import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { Button } from '@/components/ui/button';
import { useParallax } from '../hooks/useParallax';
import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';

interface ServicesSectionProps {
  readonly locale: Locale;
}

const iconMap: Record<string, string> = {
  'BPKB-based Financing': '/icon/BPKB-based-Financing.json',
  'Pembiayaan Berbasis BPKB': '/icon/BPKB-based-Financing.json',
  'Property-based Financing': '/icon/Property-based-Financing.json',
  'Pembiayaan Berbasis Properti': '/icon/Property-based-Financing.json',
  'AP Invoice Financing': '/icon/AP-Invoice-Financing.json',
  'Pembiayaan Invoice AP': '/icon/AP-Invoice-Financing.json',
  'AR Invoice Financing': '/icon/AR-Invoice-Financing.json',
  'Pembiayaan Invoice AR': '/icon/AR-Invoice-Financing.json',
  'Ecosystem Banking Solutions': '/icon/Ecosystem-Banking-Solutions.json',
  'Solusi Banking Ekosistem': '/icon/Ecosystem-Banking-Solutions.json',
};

// Lottie animation data type (simplified structure)
type LottieAnimationData = Record<string, unknown>;

// Lottie ref type - AnimationItem from lottie-react
type LottieRef = {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  goToAndPlay: (value: number, isFrame?: boolean) => void;
  setDirection: (direction: number) => void;
  playSegments: (segments: number[] | [number, number], forceFlag?: boolean) => void;
  setSubframe: (useSubFrames: boolean) => void;
  getDuration: (inFrames?: boolean) => number;
  destroy: () => void;
} | null;

interface LottieIconProps {
  readonly src: string;
  readonly className?: string;
  readonly isPlaying?: boolean;
}

function LottieIcon({ src, className, isPlaying = false }: LottieIconProps) {
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);
  const lottieRef = useRef<LottieRef>(null);

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Lottie animation:', err));
  }, [src]);

  useEffect(() => {
    if (lottieRef.current) {
      if (isPlaying) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (!animationData) {
    return <div className={className} />;
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop
      autoplay={false}
      className={className}
    />
  );
}

interface ProductCardProps {
  readonly product: {
    readonly title: string;
    readonly brand: string;
    readonly description: string;
    readonly benefit: string;
    readonly cta: string;
  };
  readonly iconPath: string | undefined;
  readonly locale: Locale;
}

function ProductCard({ product, iconPath, locale }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full space-y-6">
        {/* Icon */}
        <div className="h-24 w-24 flex items-center justify-center shrink-0">
          {iconPath ? (
            <LottieIcon 
              src={iconPath} 
              className="w-full h-full" 
              isPlaying={isHovered}
            />
          ) : (
            <div className="w-full h-full bg-white/10 rounded-lg" />
          )}
        </div>

        {/* Content */}
        <div className="space-y-3 grow">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
              {product.brand}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {product.title}
          </h3>
          <p className="text-white/80 leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-white/70 font-medium">
            {product.benefit}
          </p>
        </div>

        {/* CTA - Always at bottom */}
        <div className="mt-auto pt-4">
          <Link href={`/${locale}/products`} className="block">
            <Button
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 hover:border-white/40 bg-transparent"
            >
              {product.cta}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const messages = getMessages(locale);
  const t = messages.services;
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [initialOffsetY, setInitialOffsetY] = useState(0);

  // Calculate initial offset when section is below viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const calculateInitialOffset = () => {
      const sectionRect = sectionRef.current?.getBoundingClientRect();
      if (!sectionRect) return 0;

      // Get section's absolute position from top of document
      const sectionTop = sectionRect.top + window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // If section starts below viewport, calculate offset to move image up
      // The offset should compensate for the distance section is below viewport
      if (sectionTop > viewportHeight) {
        return -(sectionTop - viewportHeight) * 0.4;
      }
      
      return 0;
    };

    // Calculate and set initial offset
    const offset = calculateInitialOffset();
    setInitialOffsetY(offset);

    // Recalculate on resize
    const handleResize = () => {
      const offset = calculateInitialOffset();
      setInitialOffsetY(offset);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useParallax(imageRef, {
    scrollSpeed: 0.2,
    mouseIntensity: 15,
    enableScroll: true,
    enableMouse: true,
    initialOffsetY,
  });

  return (
    <section ref={sectionRef} className="relative min-h-screen py-24 overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/image/hero.webp"
            alt="Services background"
            fill
            className="object-cover scale-110"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight px-4"
              >
                {t.heading}
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText
                delay={0.1}
                className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4"
              >
                {t.subtext}
              </AnimatedText>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.products.map((product) => {
              const iconPath = iconMap[product.title];
              return (
                <ProductCard
                  key={product.title}
                  product={product}
                  iconPath={iconPath}
                  locale={locale}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
