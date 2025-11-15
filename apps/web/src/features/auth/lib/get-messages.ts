import { type Locale } from '@/i18n';
import enMessages from '../messages/en.json';
import idMessages from '../messages/id.json';
import type { AuthMessages } from '../types';

const messages: Record<Locale, AuthMessages> = {
  en: enMessages as AuthMessages,
  id: idMessages as AuthMessages,
} as Record<Locale, AuthMessages>;

export function getMessages(locale: Locale): AuthMessages {
  return messages[locale];
}

export type { AuthMessages };


