'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface UseNavbarScrollReturn {
  readonly isInHero: boolean;
  readonly isVisible: boolean;
  readonly scrollDirection: 'up' | 'down';
}

export function useNavbarScroll(): UseNavbarScrollReturn {
  const [isInHero, setIsInHero] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Reset state when pathname changes (navigation)
    setIsInHero(true);
    setIsVisible(true);
    lastScrollY.current = 0;
    
    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // Find hero section element with multiple retry strategies
    const findHeroSection = (): HTMLElement | null => {
      return document.getElementById('hero-section');
    };

    // Intersection Observer for hero section
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setIsInHero(entry.isIntersecting);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of hero is visible
        rootMargin: '-64px 0px 0px 0px', // Account for navbar height
      }
    );
    
    observerRef.current = observer;

    // Try to find hero element with multiple retry attempts
    let retryCount = 0;
    const maxRetries = 20; // Try for ~2 seconds (20 * 100ms)
    
    const tryFindAndObserve = () => {
      const heroElement = findHeroSection();
      
      if (heroElement) {
        heroRef.current = heroElement;
        observer.observe(heroElement);
        // Immediately check if element is in viewport
        const rect = heroElement.getBoundingClientRect();
        const isVisible = rect.top < globalThis.innerHeight && rect.bottom > 0;
        setIsInHero(isVisible);
        return true;
      }
      
      retryCount++;
      if (retryCount < maxRetries) {
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          setTimeout(tryFindAndObserve, 50);
        });
      }
      
      return false;
    };

    // Start trying immediately
    tryFindAndObserve();

    // Scroll direction detection
    const handleScroll = () => {
      const currentScrollY = globalThis.scrollY || globalThis.pageYOffset || 0;

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
        // Hide navbar on scroll down (except at top)
        if (currentScrollY > 100) {
          setIsVisible(false);
        }
      } else {
        setScrollDirection('up');
        // Show navbar on scroll up
        setIsVisible(true);
      }

      // Always show navbar at top
      if (currentScrollY < 100) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    globalThis.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      globalThis.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [pathname]); // Re-run when pathname changes

  return {
    isInHero,
    isVisible,
    scrollDirection,
  };
}

