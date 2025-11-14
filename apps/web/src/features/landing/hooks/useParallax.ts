import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

interface UseParallaxOptions {
  /**
   * Speed of parallax effect when scrolling (0.5 = moves at half scroll speed)
   * @default 0.5
   */
  scrollSpeed?: number;
  /**
   * Intensity of mouse parallax effect in pixels
   * @default 15
   */
  mouseIntensity?: number;
  /**
   * Enable scroll parallax effect
   * @default true
   */
  enableScroll?: boolean;
  /**
   * Enable mouse parallax effect
   * @default true
   */
  enableMouse?: boolean;
  /**
   * Animation duration for GSAP
   * @default 0.1
   */
  duration?: number;
  /**
   * Animation easing for GSAP
   * @default 'none'
   */
  ease?: string;
  /**
   * Initial Y offset in pixels (useful when element is below viewport)
   * @default 0
   */
  initialOffsetY?: number;
}

/**
 * Custom hook for parallax effect on elements
 * Combines scroll and mouse movement parallax effects
 * 
 * @param ref - React ref to the element that will have parallax effect
 * @param options - Configuration options for parallax behavior
 * 
 * @example
 * ```tsx
 * const imageRef = useRef<HTMLDivElement>(null);
 * useParallax(imageRef, { scrollSpeed: 0.5, mouseIntensity: 20 });
 * ```
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  options: UseParallaxOptions = {}
): void {
  const {
    scrollSpeed = 0.5,
    mouseIntensity = 15,
    enableScroll = true,
    enableMouse = true,
    duration = 0.1,
    ease = 'none',
    initialOffsetY = 0,
  } = options;

  useEffect(() => {
    if (!ref.current) return;

    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const updateParallax = () => {
      if (!ref.current) return;

      const scrollOffset = enableScroll ? scrollY * scrollSpeed : 0;
      const mouseOffsetX = enableMouse ? mouseX * mouseIntensity : 0;
      const mouseOffsetY = enableMouse ? mouseY * mouseIntensity : 0;

      gsap.to(ref.current, {
        x: mouseOffsetX,
        y: initialOffsetY + scrollOffset + mouseOffsetY,
        duration,
        ease,
      });
    };

    const handleScroll = () => {
      if (!enableScroll) return;
      scrollY = window.scrollY;
      updateParallax();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouse) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Normalize to -0.5 to 0.5 range
      mouseX = clientX / innerWidth - 0.5;
      mouseY = clientY / innerHeight - 0.5;

      updateParallax();
    };

    // Initial update
    updateParallax();

    if (enableScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    if (enableMouse) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (enableScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (enableMouse) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [ref, scrollSpeed, mouseIntensity, enableScroll, enableMouse, duration, ease, initialOffsetY]);
}