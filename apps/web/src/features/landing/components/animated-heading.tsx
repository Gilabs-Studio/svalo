"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof globalThis.window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
  duration?: number;
}

export function AnimatedHeading({
  children,
  className = "",
  as: Component = "h2",
  delay = 0,
  duration = 1.2,
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(
    null,
  );

  useEffect(() => {
    if (!headingRef.current) return;
    if (typeof window === "undefined") return;

    const element = headingRef.current;
    let isMounted = true;

    // Cleanup previous animations (this will also cleanup associated ScrollTriggers)
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Kill any remaining ScrollTriggers associated with this element
    try {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger === element || trigger.trigger === element) {
          trigger.kill();
        }
      });
    } catch (_err) {
      // Ignore SecurityError
    }

    // Reset element to original content
    const text =
      typeof children === "string" ? children : element.textContent || "";
    const words = text.split(" ").filter(Boolean);

    if (words.length === 0) return;

    // Split into spans
    element.innerHTML = words
      .map(
        (word, i) =>
          `<span class="inline-block">${word}${i < words.length - 1 ? "&nbsp;" : ""}</span>`,
      )
      .join("");

    const wordSpans = element.querySelectorAll("span");

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      if (!isMounted || !element) return;

      // Check if element is already in viewport
      let rect: DOMRect;
      try {
        rect = element.getBoundingClientRect();
      } catch (_err) {
        // SecurityError fallback: show immediately
        gsap.set(wordSpans, { opacity: 1, y: 0, rotationX: 0 });
        return;
      }

      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.85;
      const isAlreadyVisible = rect.top < triggerPoint && rect.bottom > 0;

      // If already visible, show immediately without ScrollTrigger
      if (isAlreadyVisible) {
        gsap.set(wordSpans, { opacity: 1, y: 0, rotationX: 0 });
        return;
      }

      // Create animation with ScrollTrigger
      try {
        const timeline = gsap.fromTo(
          wordSpans,
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration,
            delay,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        animationRef.current = timeline;
      } catch (_err) {
        // SecurityError fallback: show immediately
        gsap.set(wordSpans, { opacity: 1, y: 0, rotationX: 0 });
      }
    });

    return () => {
      isMounted = false;
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      // Kill any remaining ScrollTriggers for this element
      try {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.vars?.trigger === element ||
            trigger.trigger === element
          ) {
            trigger.kill();
          }
        });
      } catch (_err) {
        // Ignore SecurityError during cleanup
      }
    };
  }, [children, delay, duration]);

  return (
    <Component
      ref={headingRef}
      className={cn("will-change-transform", className)}
    >
      {children}
    </Component>
  );
}
