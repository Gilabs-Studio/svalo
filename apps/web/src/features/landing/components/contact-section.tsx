"use client";

import { type Locale } from "@/i18n";
import { getMessages } from "../lib/get-messages";
import { AnimatedHeading } from "./animated-heading";
import { AnimatedText } from "./animated-text";
import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

interface ContactSectionProps {
  readonly locale: Locale;
}

export function ContactSection({ locale }: ContactSectionProps) {
  const messages = getMessages(locale);
  const t = messages.contact;

  return (
    <footer className="relative py-20 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="overflow-hidden">
                <AnimatedHeading
                  as="h3"
                  className="text-2xl font-bold text-gray-900"
                >
                  Savlo
                </AnimatedHeading>
              </div>
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.1}
                  className="text-gray-600 leading-relaxed"
                >
                  {t.tagline}
                </AnimatedText>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.1}
                  className="text-sm font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </AnimatedText>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <AnimatedText delay={0.2}>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                      <p className="text-gray-700 leading-relaxed">
                        {t.address}
                      </p>
                    </div>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.3}>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                      <p className="text-gray-700 leading-relaxed">{t.hours}</p>
                    </div>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.4}>
                    <Link
                      href={`tel:${t.phone.replaceAll(/\s/g, "")}`}
                      className="flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                      <span>{t.phone}</span>
                    </Link>
                  </AnimatedText>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.1}
                  className="text-sm font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Quick Links
                </AnimatedText>
              </div>
              <nav className="space-y-3">
                <div className="overflow-hidden">
                  <AnimatedText delay={0.2}>
                    <Link
                      href={`/${locale}/how-it-works`}
                      className="block text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      How It Works
                    </Link>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.25}>
                    <Link
                      href={`/${locale}/products`}
                      className="block text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Products
                    </Link>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.3}>
                    <Link
                      href={`/${locale}/pricing`}
                      className="block text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Pricing
                    </Link>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.35}>
                    <Link
                      href={`/${locale}/contact`}
                      className="block text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Contact
                    </Link>
                  </AnimatedText>
                </div>
              </nav>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.1}
                  className="text-sm font-semibold text-gray-500 uppercase tracking-wider"
                >
                  Follow Us
                </AnimatedText>
              </div>
              <div className="flex items-center gap-3">
                <div className="overflow-hidden">
                  <AnimatedText delay={0.2}>
                    <Link
                      href="https://www.instagram.com/savlo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t.social.instagram}
                    >
                      <svg
                        className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </Link>
                  </AnimatedText>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="overflow-hidden">
                <AnimatedText delay={0.5} className="text-gray-600 text-sm">
                  {t.copyright}
                </AnimatedText>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="overflow-hidden">
                  <AnimatedText delay={0.55}>
                    <Link
                      href={`/${locale}/privacy`}
                      className="hover:text-gray-900 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.6}>
                    <Link
                      href={`/${locale}/terms`}
                      className="hover:text-gray-900 transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </AnimatedText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
