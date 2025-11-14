'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (globalThis.window !== undefined) {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly duration?: number;
  readonly stagger?: number;
  readonly split?: boolean;
}

export function AnimatedText({
  children,
  className = '',
  delay = 0,
  duration = 1,
  stagger = 0.1,
  split = false,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  // Set initial hidden state synchronously before paint to prevent flash
  useLayoutEffect(() => {
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0, y: 50 });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!textRef.current) return;

    const element = textRef.current;

    // Cleanup previous animations (this will also cleanup associated ScrollTriggers)
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Kill any remaining ScrollTriggers associated with this element
    for (const trigger of ScrollTrigger.getAll()) {
      if (trigger.vars?.trigger === element || trigger.trigger === element) {
        trigger.kill();
      }
    }

    // Use requestAnimationFrame to ensure layout is complete
    requestAnimationFrame(() => {
      // Force refresh ScrollTrigger to recalculate positions
      try {
        ScrollTrigger.refresh();
      } catch (_err) {
        // Ignore SecurityError or browser restrictions (e.g., cross-origin iframes)
      }
      
      // Check if element is already in viewport (visible without scrolling)
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // More accurate viewport detection - check if element is past the 80% trigger point
      const triggerPoint = viewportHeight * 0.8;
      const isPastTriggerPoint = rect.top < triggerPoint;
      const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
      const isAtBottomOfPage = documentHeight <= viewportHeight || (scrollTop + viewportHeight >= documentHeight - 50);
      // Check if element is near bottom (within 500px for better detection)
      const isNearBottom = rect.top < viewportHeight + 500;
      // Check if element is already visible in viewport (more lenient check)
      const isAlreadyVisible = rect.top < viewportHeight * 1.5 && rect.bottom > -200;
      // Check if element is in the last 20% of the page (footer area)
      const elementTop = rect.top + scrollTop;
      const pageBottom = documentHeight;
      const isInLastQuarter = elementTop > pageBottom * 0.75;
      
      // Determine if element should be shown immediately
      // For elements at bottom of page, be more lenient with detection
      const shouldShowImmediately = isInViewport || isAtBottomOfPage || isPastTriggerPoint || isNearBottom || isAlreadyVisible || isInLastQuarter;

      if (split && typeof children === 'string') {
        // Split text into words for word-by-word animation
        const words = children.split(' ').filter(Boolean);
        if (words.length === 0) return;

        element.innerHTML = words
          .map((word) => `<span class="inline-block">${word}</span>`)
          .join(' ');

        const wordSpans = element.querySelectorAll('span');

        // Set initial hidden state for word spans
        gsap.set(wordSpans, { opacity: 0, y: 50 });

        // If already in viewport or past trigger point, show immediately without animation
        if (shouldShowImmediately) {
          gsap.set(wordSpans, { opacity: 1, y: 0 });
        } else {
          const animation = gsap.to(
            wordSpans,
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              stagger,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true,
                refreshPriority: -1,
              },
            }
          );

          animationRef.current = animation;
        }
      } else {
        // Simple fade and slide animation
        // Don't manipulate children - they are React elements (SVG, Links, etc.)
        // Just animate the wrapper div
        // Initial state is already set to hidden above

        // If already in viewport or past trigger point, show immediately without animation
        if (shouldShowImmediately) {
          gsap.set(element, { opacity: 1, y: 0 });
          return;
        }

        // Create animation that will trigger on scroll
        // Use more lenient trigger point for elements at bottom of page
        const elementTop = rect.top + scrollTop;
        const pageBottom = documentHeight;
        const isInLastQuarter = elementTop > pageBottom * 0.75;
        const isNearPageBottom = rect.top > viewportHeight * 0.3 || isInLastQuarter;
        
        // For elements at bottom of page, use more aggressive trigger
        const startTrigger = isNearPageBottom ? 'top bottom' : 'top 80%';
        
        const animation = gsap.to(
          element,
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: startTrigger,
              toggleActions: 'play none none none',
              once: true,
              refreshPriority: -1,
              onEnter: () => {
                // Ensure animation plays when entering viewport
                animation?.play();
              },
              onEnterBack: () => {
                // Ensure animation plays when scrolling back up
                animation?.play();
              },
            },
          }
        );

        // Check if element is already past trigger point after animation setup
        // If so, manually trigger the animation immediately
        requestAnimationFrame(() => {
          try {
            ScrollTrigger.refresh();
          } catch (_err) {
            // Ignore SecurityError
          }
          const currentRect = element.getBoundingClientRect();
          const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const currentElementTop = currentRect.top + currentScrollTop;
          const currentPageBottom = document.documentElement.scrollHeight;
          
          // More aggressive check for bottom elements
          if (isInLastQuarter || currentElementTop > currentPageBottom * 0.75) {
            // Element is in last quarter, show immediately
            animation?.play();
          } else {
            // Check if past trigger point
            const currentTriggerPoint = isNearPageBottom ? viewportHeight : viewportHeight * 0.8;
            if (currentRect.top < currentTriggerPoint) {
              animation?.play();
            }
          }
        });

        animationRef.current = animation;
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      // Kill any remaining ScrollTriggers for this element
      for (const trigger of ScrollTrigger.getAll()) {
        if (trigger.vars?.trigger === element || trigger.trigger === element) {
          trigger.kill();
        }
      }
    };
  }, [children, delay, duration, stagger, split]);

  return (
    <div ref={textRef} className={className}>
      {!split && children}
    </div>
  );
}

