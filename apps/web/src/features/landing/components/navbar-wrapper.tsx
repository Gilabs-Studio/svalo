'use client';

import { type Locale } from '@/i18n';
import { Navbar } from './navbar';
import { useNavbarScroll } from '../hooks/use-navbar-scroll';

interface NavbarWrapperProps {
  readonly locale: Locale;
}

export function NavbarWrapper({ locale }: NavbarWrapperProps) {
  const { isInHero, isVisible } = useNavbarScroll();

  return <Navbar locale={locale} isInHero={isInHero} isVisible={isVisible} />;
}

