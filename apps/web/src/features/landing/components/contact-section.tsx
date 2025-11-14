'use client';

import { type Locale } from '@/i18n';
import { getMessages } from '../lib/get-messages';
import { AnimatedHeading } from './animated-heading';
import { AnimatedText } from './animated-text';
import { MapPin, Phone, Clock } from 'lucide-react';
import Link from 'next/link';

interface ContactSectionProps {
  readonly locale: Locale;
}

export function ContactSection({ locale }: ContactSectionProps) {
  const messages = getMessages(locale);
  const t = messages.contact;

  return (
    <footer className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 w-full">
        <div className="space-y-12">
          {/* Grid: Contact Info (Left) & Maps (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Contact Info */}
            <div className="space-y-8 min-w-0 wrap-break-word">
              <div className="overflow-hidden">
                <AnimatedHeading 
                  as="h2"
                  className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none"
                >
                  {t.heading}
                </AnimatedHeading>
              </div>
              <div className="space-y-6">
                <div className="overflow-hidden">
                  <AnimatedText delay={0.1}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 shrink-0">
                        <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold wrap-break-word">
                        {t.address}
                      </p>
                    </div>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.2}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 shrink-0">
                        <Clock className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <p className="text-xl md:text-2xl lg:text-3xl font-bold wrap-break-word">
                        {t.hours}
                      </p>
                    </div>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.3}>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 shrink-0">
                        <Phone className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <Link 
                        href={`tel:${t.phone.replaceAll(/\s/g, '')}`}
                        className="text-xl md:text-2xl lg:text-3xl font-bold wrap-break-word hover:text-gray-300 transition-colors"
                      >
                        {t.phone}
                      </Link>
                    </div>
                  </AnimatedText>
                </div>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <AnimatedText delay={0.4}>
                    <Link 
                      href="https://www.google.com/maps/place/Top+Gun+Barber+Shop/@-6.2715519,106.6232306,18.35z/data=!4m8!3m7!1s0x2e69fd000e223fed:0x626c5fe10067ee1d!8m2!3d-6.2696202!4d106.62423!9m1!1b1!16s%2Fg%2F11v_79yj9p?entry=ttu&g_ep=EgoyMDI1MTEwNS4wIKXMDSoASAFQAw%3D%3D" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400 hover:text-white transition-colors inline-block"
                    >
                      {t.cta.directions} →
                    </Link>
                  </AnimatedText>
                </div>
                <div className="overflow-hidden">
                  <AnimatedText delay={0.45}>
                    <div className="flex items-center gap-4">
                      <Link 
                        href="https://www.instagram.com/topgun_barbershop1/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 transition-colors group"
                      >
                        <svg 
                          className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" 
                          viewBox="0 0 16 16" 
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                        </svg>
                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                          {t.social.instagram}
                        </span>
                      </Link>
                      <Link 
                        href="https://www.threads.com/@topgun_barbershop1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/10 hover:bg-white/20 transition-colors group"
                      >
                        <svg 
                          className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" 
                          viewBox="0 0 192 192" 
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
                        </svg>
                        <span className="text-lg md:text-xl lg:text-2xl font-bold text-white">
                          {t.social.threads}
                        </span>
                      </Link>
                    </div>
                  </AnimatedText>
                </div>
              </div>
            </div>

            {/* Right Column - Google Maps */}
            <div className="w-full">
              <div className="overflow-hidden">
                <AnimatedText delay={0.5}>
                  <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden border border-white/20">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1234567890!2d106.62423!3d-6.2696202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fd000e223fed%3A0x626c5fe10067ee1d!2sTop%20Gun%20Barber%20Shop!5e0!3m2!1sen!2sid!4v1707123456789!5m2!1sen!2sid&q=Top+Gun+Barber+Shop+Ruko+Madison+Grande+K03+Semarang"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Top Gun Barber Shop Location"
                      className="w-full h-full"
                    />
                  </div>
                </AnimatedText>
              </div>
            </div>
          </div>

          {/* Footer Bottom - Copyright & Tagline */}
          <div className="border-t border-white/20 pt-8 mt-8">
            <AnimatedText delay={0.6} className="space-y-2">
              <p className="text-lg md:text-xl lg:text-2xl font-bold">
                {t.copyright}
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-400">
                {t.tagline}
              </p>
            </AnimatedText>
          </div>
        </div>
      </div>
    </footer>
  );
}

