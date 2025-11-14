'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { type Locale } from '@/i18n';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getMessages } from '../lib/get-messages';
import { cn } from '@/lib/utils';
import { getServiceSlug } from '../lib/service-slug';
import Lottie, { type LottieRef } from 'lottie-react';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

// Lottie animation data type
type LottieAnimationData = Record<string, unknown>;

interface LottieIconProps {
  readonly src: string;
  readonly className?: string;
  readonly onHover?: boolean;
}

function LottieIcon({ src, className, onHover = false }: LottieIconProps) {
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);
  const lottieRef = useRef(null) as LottieRef;

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => {
        // Silently fail
      });
  }, [src]);

  useEffect(() => {
    if (lottieRef.current && animationData) {
      if (onHover) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
        lottieRef.current.goToAndStop(0);
      }
    }
  }, [onHover, animationData]);

  if (!animationData) {
    return <div className={cn('w-5 h-5', className)} />;
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop
      autoplay={false}
      className={cn('w-5 h-5', className)}
    />
  );
}

// Service Dropdown Item Component
interface ServiceDropdownItemProps {
  readonly service: {
    readonly title: string;
    readonly description: string;
    readonly icon?: string;
    readonly iconDark?: string;
  };
  readonly locale: Locale;
  readonly pathname: string;
}

function ServiceDropdownItem({ service, locale, pathname }: ServiceDropdownItemProps) {
  const slug = getServiceSlug(service.title);
  const iconPath = service.iconDark || service.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <DropdownMenuItem asChild>
      <Link
        href={`/${locale}/services/${slug}`}
        className={cn(
          'flex items-center gap-3 cursor-pointer py-2.5 group',
          pathname === `/${locale}/services/${slug}` && 'bg-gray-100'
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {iconPath && (
          <div className="shrink-0">
            <LottieIcon src={iconPath} onHover={isHovered} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium block">{service.title}</span>
          <span className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {service.description}
          </span>
        </div>
      </Link>
    </DropdownMenuItem>
  );
}

// Flag SVG Components
const FlagEN = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 640 480"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path
      fill="#FFF"
      d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
    />
    <path
      fill="#C8102E"
      d="m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
    />
    <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
    <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
  </svg>
);

const FlagID = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 640 480"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#e70011" d="M0 0h640v240H0z" />
    <path fill="#fff" d="M0 240h640v240H0z" />
  </svg>
);

interface NavbarProps {
  readonly locale: Locale;
  readonly isInHero?: boolean;
  readonly isVisible?: boolean;
}

export function Navbar({ locale, isInHero = false, isVisible = true }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const messages = getMessages(locale);
  const t = messages.nav;
  const { user, isAuthenticated, logout } = useAuthStore();
  const isLandingRoute = pathname === `/${locale}`;
  const isServiceDetailRoute = pathname.startsWith(`/${locale}/services/`);
  const isTransparentNav = isInHero && (isLandingRoute || isServiceDetailRoute);

  const navItems = [
    { href: `/${locale}`, label: t.home },
  ];

  // Get services for Products dropdown
  const services = messages.services?.products || [];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname.startsWith(href);
  };

  const getNavItemClassName = (href: string) => {
    const active = isActive(href);
    if (isTransparentNav) {
      return active ? 'text-white' : 'text-white/70 hover:text-white';
    }
    return active ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900';
  };

  const getProductsButtonClassName = () => {
    if (isTransparentNav) {
      return isServiceDetailRoute ? 'text-white' : 'text-white/70 hover:text-white';
    }
    return isServiceDetailRoute ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900';
  };

  const getLocaleUrl = (targetLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    return `/${targetLocale}${pathWithoutLocale || ''}`;
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md transition-all duration-300 ease-in-out',
        !isVisible && '-translate-y-full'
      )}
    >
      <div
        className={cn(
          'absolute inset-0 border-b transition-all duration-300',
          isTransparentNav
            ? 'bg-white/0 border-white/0'
            : 'bg-white/95 border-gray-200/50 backdrop-blur-md'
        )}
      />
      <div className="relative container mx-auto flex h-12 items-center justify-between px-4 md:px-6">
        <Link href={`/${locale}`} className="flex items-center space-x-2 z-10">
          <span
            className={cn(
              'text-lg font-semibold tracking-tight transition-colors',
              isTransparentNav ? 'text-white' : 'text-gray-900'
            )}
          >
            Savlo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 z-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors relative',
                getNavItemClassName(item.href)
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 right-0 h-0.5 transition-all',
                    isTransparentNav ? 'bg-white' : 'bg-gray-900'
                  )}
                />
              )}
            </Link>
          ))}
          
          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'text-sm font-medium transition-colors relative flex items-center gap-1',
                  getProductsButtonClassName()
                )}
              >
                {t.products}
                <ChevronDown className="w-3 h-3 opacity-70" />
                {isServiceDetailRoute && (
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 right-0 h-0.5 transition-all',
                      isTransparentNav ? 'bg-white' : 'bg-gray-900'
                    )}
                  />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {services.map((service) => (
                <ServiceDropdownItem
                  key={service.title}
                  service={service}
                  locale={locale}
                  pathname={pathname}
                />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* FAQ Link */}
          <Link
            href={`/${locale}/faq`}
            className={cn(
              'text-sm font-medium transition-colors relative',
              getNavItemClassName(`/${locale}/faq`)
            )}
          >
            FAQ
            {isActive(`/${locale}/faq`) && (
              <span
                className={cn(
                  'absolute -bottom-1 left-0 right-0 h-0.5 transition-all',
                  isTransparentNav ? 'bg-white' : 'bg-gray-900'
                )}
              />
            )}
          </Link>
          
          <div
            className={cn(
              'h-4 w-px transition-colors',
              isTransparentNav ? 'bg-white/20' : 'bg-gray-300'
            )}
          />
          {isAuthenticated ? (
            <>
              <Link
                href={`/${locale}/dashboard`}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isTransparentNav
                    ? 'text-white/70 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                Dashboard
              </Link>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  logout();
                  window.location.href = `/${locale}`;
                }}
                className={cn(
                  'h-8 px-4 text-xs font-medium',
                  isTransparentNav
                    ? 'border-white/30 text-white hover:bg-white/10'
                    : 'border-gray-300'
                )}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href={`/${locale}/auth`}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isTransparentNav
                    ? 'text-white/70 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {t.signIn}
              </Link>
              <Link href={`/${locale}/auth`}>
                <Button
                  size="sm"
                  className="h-8 px-4 text-xs bg-white text-black hover:bg-gray-100 font-medium"
                >
                  {t.getStarted}
                </Button>
              </Link>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-md transition-all hover:bg-black/5',
                  isTransparentNav
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {locale === 'en' ? (
                  <FlagEN className="w-3.5 h-2.5 shrink-0" />
                ) : (
                  <FlagID className="w-3.5 h-2.5 shrink-0" />
                )}
                <span className="text-xs font-medium uppercase">{locale}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem asChild>
                <Link
                  href={getLocaleUrl('en')}
                  className={cn(
                    'flex items-center gap-2 cursor-pointer',
                    locale === 'en' && 'bg-gray-100'
                  )}
                >
                  <FlagEN className="w-4 h-3 shrink-0" />
                  <span className="text-sm">English</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={getLocaleUrl('id')}
                  className={cn(
                    'flex items-center gap-2 cursor-pointer',
                    locale === 'id' && 'bg-gray-100'
                  )}
                >
                  <FlagID className="w-4 h-3 shrink-0" />
                  <span className="text-sm">Indonesia</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden z-10">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'transition-colors',
                isTransparentNav
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-900 hover:bg-gray-100'
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-gray-200">
            <SheetHeader>
              <SheetTitle className="text-gray-900">Savlo</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-base font-medium transition-colors px-3 py-2 rounded-md',
                    isActive(item.href)
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Products Dropdown for Mobile */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-900 mb-2">{t.products}</div>
                <div className="flex flex-col space-y-1 ml-2">
                  {services.map((service) => {
                    const slug = getServiceSlug(service.title);
                    const serviceWithIcon = service as { icon?: string; iconDark?: string };
                    const iconPath = serviceWithIcon.iconDark || serviceWithIcon.icon;
                    return (
                      <Link
                        key={service.title}
                        href={`/${locale}/services/${slug}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center gap-2 text-sm transition-colors px-2 py-2 rounded-md',
                          pathname === `/${locale}/services/${slug}`
                            ? 'text-gray-900 bg-gray-100 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        )}
                      >
                        {iconPath && <LottieIcon src={iconPath} onHover={false} />}
                        <span className="flex-1">{service.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* FAQ Link for Mobile */}
              <Link
                href={`/${locale}/faq`}
                onClick={() => setOpen(false)}
                className={cn(
                  'text-base font-medium transition-colors px-3 py-2 rounded-md',
                  isActive(`/${locale}/faq`)
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                FAQ
              </Link>
              
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={`/${locale}/dashboard`}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors block px-3 py-2 rounded-md hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                    <Button
                      onClick={() => {
                        logout();
                        setOpen(false);
                        window.location.href = `/${locale}`;
                      }}
                      className="w-full bg-gray-900 text-white hover:bg-gray-800 font-medium"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/${locale}/auth`}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors block px-3 py-2 rounded-md hover:bg-gray-50"
                    >
                      {t.signIn}
                    </Link>
                    <Link href={`/${locale}/auth`} onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 font-medium">
                        {t.getStarted}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        {locale === 'en' ? (
                          <FlagEN className="w-5 h-4 shrink-0" />
                        ) : (
                          <FlagID className="w-5 h-4 shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {locale === 'en' ? 'English' : 'Indonesia'}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-full">
                    <DropdownMenuItem asChild>
                      <Link
                        href={getLocaleUrl('en')}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center gap-2 cursor-pointer',
                          locale === 'en' && 'bg-gray-100'
                        )}
                      >
                        <FlagEN className="w-5 h-4 shrink-0" />
                        <span className="text-sm">English</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href={getLocaleUrl('id')}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'flex items-center gap-2 cursor-pointer',
                          locale === 'id' && 'bg-gray-100'
                        )}
                      >
                        <FlagID className="w-5 h-4 shrink-0" />
                        <span className="text-sm">Indonesia</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

