import { type Locale } from '@/i18n';
import enMessages from '../messages/en.json';
import idMessages from '../messages/id.json';
import type { FAQMessages } from '../types';

const messages: Record<Locale, FAQMessages> = {
  en: enMessages as FAQMessages,
  id: idMessages as FAQMessages,
} as Record<Locale, FAQMessages>;

export function getMessages(locale: Locale): FAQMessages {
  return messages[locale];
}

export type { FAQMessages };

