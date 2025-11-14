import { type Locale } from '@/i18n';
import enMessages from '../messages/en.json';
import idMessages from '../messages/id.json';
import type { Messages } from '../types/messages';

const messages: Record<Locale, Messages> = {
  en: enMessages as Messages,
  id: idMessages as Messages,
} as Record<Locale, Messages>;

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

export type { Messages };

