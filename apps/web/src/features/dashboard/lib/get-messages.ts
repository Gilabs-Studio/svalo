import { type Locale } from "@/i18n";
import enMessages from "../messages/en.json";
import idMessages from "../messages/id.json";
import type { DashboardMessages } from "../types";

const messages: Record<Locale, DashboardMessages> = {
  en: enMessages as DashboardMessages,
  id: idMessages as DashboardMessages,
} as Record<Locale, DashboardMessages>;

export function getMessages(locale: Locale): DashboardMessages {
  return messages[locale];
}

export type { DashboardMessages };
