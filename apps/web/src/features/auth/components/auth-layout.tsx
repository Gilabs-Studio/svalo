'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { type Locale } from '@/i18n';
import { cn } from '@/lib/utils';
import { useParallax } from '@/features/landing/hooks/useParallax';
import gsap from 'gsap';
import { AnimatedHeading } from '@/features/landing/components/animated-heading';
import { AnimatedText } from '@/features/landing/components/animated-text';

interface AuthLayoutProps {
  readonly locale: Locale;
  readonly children: React.ReactNode;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: React.ReactNode;
  readonly mode: 'login' | 'register';
  readonly onModeChange: (mode: 'login' | 'register') => void;
}

export function AuthLayout({ locale, children, title, subtitle, icon, mode, onModeChange }: AuthLayoutProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const loginContentRef = useRef<HTMLDivElement>(null);
  const registerContentRef = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevModeRef = useRef<'login' | 'register'>(mode);
  const [displayMode, setDisplayMode] = useState<'login' | 'register'>(mode);
  
  // Store form content separately to prevent content change during fade out
  const [formContent, setFormContent] = useState({
    title,
    subtitle,
    icon,
    children,
  });

  // Freeze content during animation to prevent React from re-rendering
  const frozenContentRef = useRef(formContent);
  
  // Use frozen content during animation, current content otherwise
  const displayContent = isAnimating ? frozenContentRef.current : formContent;

  const isLogin = displayMode === 'login';

  useParallax(imageRef, {
    scrollSpeed: 0.2,
    mouseIntensity: 15,
    enableScroll: true,
    enableMouse: true,
  });

  // Sync formContent with props when not animating
  useEffect(() => {
    if (!isAnimating) {
      setFormContent({ title, subtitle, icon, children });
      setDisplayMode(mode);
    }
  }, [title, subtitle, icon, children, mode, isAnimating]);

  // Handle mode change with smooth animation - form container slides
  useEffect(() => {
    const prevMode = prevModeRef.current;
    
    if (prevMode !== mode && !isAnimating) {
      // Freeze current content before animation starts
      frozenContentRef.current = formContent;
      setIsAnimating(true);
      
      const formWrapper = formWrapperRef.current;
      const formContainer = formContainerRef.current;

      if (formWrapper && formContainer) {
        const timeline = gsap.timeline({
          onComplete: () => {
            setIsAnimating(false);
            prevModeRef.current = mode;
          },
        });

        if (mode === 'login') {
          // To Login: Form container slides from left to right (x: -50vw to x: 0)
          // Step 1: Fade out form with old content
          timeline
            .to(formContainer, {
              opacity: 0,
              scale: 0.95,
              y: 10,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                // Hide form content to prevent React from rendering new content
                if (formContainer.current) {
                  gsap.set(formContainer.current, { display: 'none' });
                }
              },
            })
            // Step 2: Slide form wrapper to new position (wait for fade out to complete)
            .to(
              formWrapper,
              {
                x: 0,
                duration: 0.8,
                ease: 'power2.inOut',
              },
              '+=0.1' // Start after fade out completes
            )
            // Step 3: Update content AFTER slide completes (form is in position)
            .call(() => {
              // Update content while form is invisible and in position
              const newContent = { title, subtitle, icon, children };
              // Update frozen content immediately so fade in uses new content
              frozenContentRef.current = newContent;
              requestAnimationFrame(() => {
                setFormContent(newContent);
                setDisplayMode(mode);
                // Show form content again
                if (formContainer.current) {
                  gsap.set(formContainer.current, { display: 'block' });
                }
              });
            })
            // Step 4: Fade in form with new content (after content is updated)
            .to(formContainer, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: 'power3.out',
            }, '+=0.2'); // Delay to ensure React has re-rendered with new content
        } else {
          // To Register: Form container slides from right to left (x: 0 to x: -50vw)
          // Step 1: Fade out form with old content
          timeline
            .to(formContainer, {
              opacity: 0,
              scale: 0.95,
              y: 10,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => {
                // Hide form content to prevent React from rendering new content
                if (formContainer.current) {
                  gsap.set(formContainer.current, { display: 'none' });
                }
              },
            })
            // Step 2: Slide form wrapper to new position (wait for fade out to complete)
            .to(
              formWrapper,
              {
                x: '-50vw',
                duration: 0.8,
                ease: 'power2.inOut',
              },
              '+=0.1' // Start after fade out completes
            )
            // Step 3: Update content AFTER slide completes (form is in position)
            .call(() => {
              // Update content while form is invisible and in position
              const newContent = { title, subtitle, icon, children };
              // Update frozen content immediately so fade in uses new content
              frozenContentRef.current = newContent;
              requestAnimationFrame(() => {
                setFormContent(newContent);
                setDisplayMode(mode);
                // Show form content again
                if (formContainer.current) {
                  gsap.set(formContainer.current, { display: 'block' });
                }
              });
            })
            // Step 4: Fade in form with new content (after content is updated)
            .to(formContainer, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              ease: 'power3.out',
            }, '+=0.2'); // Delay to ensure React has re-rendered with new content
        }
      }
    }
  }, [mode, isAnimating, title, subtitle, icon, children, formContent]);

  // Initial load animation
  useEffect(() => {
    if (formWrapperRef.current && formContainerRef.current && !isAnimating) {
      // Set initial position for form wrapper
      // Login: right side (x: 0), Register: left side (x: -50vw)
      gsap.set(formWrapperRef.current, {
        x: isLogin ? 0 : '-50vw',
      });
      
      // Animate form fade in with smooth morph
      gsap.fromTo(
        formContainerRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Fixed Background Image - Always visible, creates depth */}
      <div
        ref={imageRef}
        className="hidden lg:block fixed inset-0 w-full h-full z-0"
      >
        <Image
          src="/image/hero.webp"
          alt="Auth background"
          fill
          className="object-cover"
          priority
          quality={90}
          style={{
            objectPosition: 'center',
          }}
        />
      </div>

      {/* Login Content Overlay - Fixed position on left, always visible */}
      <div
        ref={loginContentRef}
        className="hidden lg:flex fixed inset-y-0 left-0 w-1/2 z-10 flex-col justify-center items-start px-12 xl:px-16 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        <div className="relative z-10 max-w-lg space-y-8">
          <div className="overflow-hidden">
            <AnimatedHeading
              as="h1"
              className="text-5xl md:text-6xl font-black leading-tight text-white"
            >
              Welcome Back
            </AnimatedHeading>
          </div>
          <div className="overflow-hidden">
            <AnimatedText
              delay={0.1}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              Sign in to access your dashboard and manage your financing applications with ease.
            </AnimatedText>
          </div>
          
          {/* Features List */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-lg">Secure & Fast Processing</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-lg">Real-time Application Tracking</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-lg">Trusted by 1000+ Businesses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Register Content Overlay - Fixed position on right, always visible */}
      <div
        ref={registerContentRef}
        className="hidden lg:flex fixed inset-y-0 right-0 w-1/2 z-10 flex-col justify-center items-start px-12 xl:px-16 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        <div className="relative z-10 max-w-lg space-y-8">
          <div className="overflow-hidden">
            <AnimatedHeading
              as="h1"
              className="text-5xl md:text-6xl font-black leading-tight text-white"
            >
              Start Your Journey
            </AnimatedHeading>
          </div>
          <div className="overflow-hidden">
            <AnimatedText
              delay={0.1}
              className="text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              Join thousands of businesses using Savlo to unlock financing solutions tailored for growth.
            </AnimatedText>
          </div>
          
          {/* Features List */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-lg">Secure & Fast Processing</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-lg">Real-time Application Tracking</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-lg">Trusted by 1000+ Businesses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Container Wrapper - Slides to create image movement effect */}
      {/* Login: right section (x: 0), Register: left section (x: 50vw) */}
      <div
        ref={formWrapperRef}
        className="w-full lg:w-1/2 fixed inset-y-0 right-0 z-20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{
          willChange: 'transform',
        }}
      >
        {/* Solid background - 100% opaque */}
        <div className="absolute inset-0 bg-background" />
        
        <div
          ref={formContainerRef}
          key={isAnimating ? prevModeRef.current : displayMode}
          className={cn(
            'relative z-10 w-full max-w-md space-y-8',
            isAnimating && 'pointer-events-none'
          )}
          style={{
            willChange: 'transform, opacity',
          }}
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <div className="relative p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20">
                  {displayContent.icon}
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h1"
                className="text-4xl md:text-5xl font-black tracking-tight break-words"
              >
                {displayContent.title}
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText delay={0.1} className="text-muted-foreground">
                {displayContent.subtitle}
              </AnimatedText>
            </div>
          </div>

          {/* Form Content */}
          {displayContent.children}

          {/* Switch Link */}
          <div className="text-center text-sm">
            {isLogin ? (
              <>
                <span className="text-muted-foreground">Don&apos;t have an account? </span>
                <button
                  type="button"
                  onClick={() => onModeChange('register')}
                  disabled={isAnimating}
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1 group transition-colors disabled:opacity-50"
                >
                  Create account
                  <svg
                    className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <span className="text-muted-foreground">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => onModeChange('login')}
                  disabled={isAnimating}
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1 group transition-colors disabled:opacity-50"
                >
                  Sign in
                  <svg
                    className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

