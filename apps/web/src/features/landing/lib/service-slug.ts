/**
 * Utility functions for generating and matching service slugs
 */

const SERVICE_SLUG_MAP: Record<string, string> = {
  'BPKB-based Financing': 'bpkb-based-financing',
  'Pembiayaan Berbasis BPKB': 'bpkb-based-financing',
  'Property-based Financing': 'property-based-financing',
  'Pembiayaan Berbasis Properti': 'property-based-financing',
  'AP Invoice Financing': 'ap-invoice-financing',
  'Pembiayaan Invoice AP': 'ap-invoice-financing',
  'AR Invoice Financing': 'ar-invoice-financing',
  'Pembiayaan Invoice AR': 'ar-invoice-financing',
  'Ecosystem Banking Solutions': 'ecosystem-banking-solutions',
  'Solusi Banking Ekosistem': 'ecosystem-banking-solutions',
};

/**
 * Generate slug from service title
 */
export function getServiceSlug(title: string): string {
  return SERVICE_SLUG_MAP[title] || title.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Get service title from slug (for reverse lookup)
 */
export function getServiceTitleFromSlug(slug: string, locale: 'en' | 'id'): string {
  const titleMap: Record<string, Record<'en' | 'id', string>> = {
    'bpkb-based-financing': {
      en: 'BPKB-based Financing',
      id: 'Pembiayaan Berbasis BPKB',
    },
    'property-based-financing': {
      en: 'Property-based Financing',
      id: 'Pembiayaan Berbasis Properti',
    },
    'ap-invoice-financing': {
      en: 'AP Invoice Financing',
      id: 'Pembiayaan Invoice AP',
    },
    'ar-invoice-financing': {
      en: 'AR Invoice Financing',
      id: 'Pembiayaan Invoice AR',
    },
    'ecosystem-banking-solutions': {
      en: 'Ecosystem Banking Solutions',
      id: 'Solusi Banking Ekosistem',
    },
  };

  return titleMap[slug]?.[locale] || slug;
}

/**
 * Check if slug is valid
 */
export function isValidServiceSlug(slug: string): boolean {
  return [
    'bpkb-based-financing',
    'property-based-financing',
    'ap-invoice-financing',
    'ar-invoice-financing',
    'ecosystem-banking-solutions',
  ].includes(slug);
}

