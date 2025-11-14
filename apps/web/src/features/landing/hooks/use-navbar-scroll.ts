'use client';

import { useEffect, useState, useRef } from 'react';

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

  useEffect(() => {
    // Find hero section element (with retry for client-side rendering)
    const findHeroSection = () => {
      heroRef.current = document.getElementById('hero-section');
      return heroRef.current;
    };

    // Intersection Observer for hero section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInHero(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of hero is visible
        rootMargin: '-64px 0px 0px 0px', // Account for navbar height
      }
    );

    // Try to find immediately, then retry after a short delay if not found
    let heroElement = findHeroSection();
    let timeoutId: NodeJS.Timeout | null = null;
    
    if (heroElement) {
      observer.observe(heroElement);
    } else {
      timeoutId = setTimeout(() => {
        heroElement = findHeroSection();
        if (heroElement) {
          observer.observe(heroElement);
        }
      }, 100);
    }

    // Scroll direction detection
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

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
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return {
    isInHero,
    isVisible,
    scrollDirection,
  };
}

