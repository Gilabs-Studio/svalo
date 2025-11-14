'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
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
        'fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm transition-transform duration-300 ease-in-out',
        !isVisible && '-translate-y-full'
      )}
    >
      <div
        className={cn(
          'absolute inset-0',
          isInHero && isLandingRoute
            ? 'bg-gradient-to-b from-black via-black to-transparent'
            : 'bg-black'
        )}
        style={
          isInHero && isLandingRoute
            ? {
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              }
            : undefined
        }
      />
      <div className="relative container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">Savlo</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isActive(item.href)
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="h-4 w-px bg-gray-700 mx-2" />
          <Link
            href={`/${locale}/auth/login`}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
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
          <div className="relative inline-flex items-center gap-1">
            <Link
              href={getLocaleUrl('en')}
              className={cn(
                'relative flex items-center gap-1.5 px-2 py-1.5 transition-all duration-200',
                locale === 'en'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <FlagEN className="w-4 h-3 shrink-0" />
              <span className="text-xs font-medium">EN</span>
              {locale === 'en' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all duration-200" />
              )}
            </Link>
            <div className="h-4 w-px bg-gray-700" />
            <Link
              href={getLocaleUrl('id')}
              className={cn(
                'relative flex items-center gap-1.5 px-2 py-1.5 transition-all duration-200',
                locale === 'id'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              )}
            >
              <FlagID className="w-4 h-3 shrink-0" />
              <span className="text-xs font-medium">ID</span>
              {locale === 'id' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all duration-200" />
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-black border-gray-800">
            <SheetHeader>
              <SheetTitle className="text-white">Savlo</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-lg font-medium transition-colors',
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-4">
                <Link
                  href={`/${locale}/auth/login`}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-gray-400 hover:text-white transition-colors block"
                >
                  {t.signIn}
                </Link>
                <Link href={`/${locale}/auth/register`} onClick={() => setOpen(false)}>
                  <Button className="w-full bg-white text-black hover:bg-gray-100 font-medium">
                    {t.getStarted}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 w-full">
                <Link
                  href={getLocaleUrl('en')}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'relative flex items-center gap-2 px-4 py-2.5 flex-1 transition-all duration-200',
                    locale === 'en'
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  <FlagEN className="w-5 h-4 shrink-0" />
                  <span className="text-sm font-medium">English</span>
                  {locale === 'en' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all duration-200" />
                  )}
                </Link>
                <div className="h-6 w-px bg-gray-700" />
                <Link
                  href={getLocaleUrl('id')}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'relative flex items-center gap-2 px-4 py-2.5 flex-1 transition-all duration-200',
                    locale === 'id'
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  )}
                >
                  <FlagID className="w-5 h-4 shrink-0" />
                  <span className="text-sm font-medium">Indonesia</span>
                  {locale === 'id' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-all duration-200" />
                  )}
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

