'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
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
  const isLandingRoute = pathname === `/${locale}`;

  const navItems = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/how-it-works`, label: t.howItWorks },
    { href: `/${locale}/products`, label: t.products },
    { href: `/${locale}/pricing`, label: t.pricing },
    { href: `/${locale}/resources`, label: t.resources },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname.startsWith(href);
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
          isInHero && isLandingRoute
            ? 'bg-white/0 border-white/0'
            : 'bg-white/95 border-gray-200/50 backdrop-blur-md'
        )}
      />
      <div className="relative container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href={`/${locale}`} className="flex items-center space-x-2 z-10">
          <span
            className={cn(
              'text-lg font-semibold tracking-tight transition-colors',
              isInHero && isLandingRoute ? 'text-white' : 'text-gray-900'
            )}
          >
            Savlo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 z-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors relative',
                isInHero && isLandingRoute
                  ? isActive(item.href)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                  : isActive(item.href)
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 right-0 h-0.5 transition-all',
                    isInHero && isLandingRoute ? 'bg-white' : 'bg-gray-900'
                  )}
                />
              )}
            </Link>
          ))}
          <div
            className={cn(
              'h-4 w-px transition-colors',
              isInHero && isLandingRoute ? 'bg-white/20' : 'bg-gray-300'
            )}
          />
          <Link
            href={`/${locale}/auth/login`}
            className={cn(
              'text-sm font-medium transition-colors',
              isInHero && isLandingRoute
                ? 'text-white/70 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {t.signIn}
          </Link>
          <Link href={`/${locale}/auth/register`}>
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-100 font-medium"
            >
              {t.getStarted}
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-all hover:bg-black/5',
                  isInHero && isLandingRoute
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {locale === 'en' ? (
                  <FlagEN className="w-4 h-3 shrink-0" />
                ) : (
                  <FlagID className="w-4 h-3 shrink-0" />
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
                isInHero && isLandingRoute
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
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                <Link
                  href={`/${locale}/auth/login`}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors block px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  {t.signIn}
                </Link>
                <Link href={`/${locale}/auth/register`} onClick={() => setOpen(false)}>
                  <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 font-medium">
                    {t.getStarted}
                  </Button>
                </Link>
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

