import { type Locale } from '@/i18n';
import enServiceDetails from '../messages/service-details-en.json';
import idServiceDetails from '../messages/service-details-id.json';

type ServiceDetails = {
  headline: string;
  shortDescription: string;
  keyBenefits: string[];
  fundingDetails: Record<string, string>;
  requirements: string[];
  process: string[];
  bestFor: string[];
  cta: {
    heading: string;
    login: string;
    createAccount: string;
  };
};

const serviceDetails: Record<Locale, Record<string, ServiceDetails>> = {
  en: enServiceDetails as Record<string, ServiceDetails>,
  id: idServiceDetails as Record<string, ServiceDetails>,
};

export function getServiceDetails(locale: Locale, slug: string): ServiceDetails | null {
  return serviceDetails[locale]?.[slug] || null;
}

export type { ServiceDetails };

