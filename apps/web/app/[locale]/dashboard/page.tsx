'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/i18n';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { AnimatedHeading } from '@/features/landing/components/animated-heading';
import { AnimatedText } from '@/features/landing/components/animated-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Building2, Car, Home } from 'lucide-react';

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const [locale, setLocale] = useState<Locale>('en');
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/auth/login`);
    }
  }, [isAuthenticated, locale, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const applications = [
    {
      id: 'bpkb',
      title: 'BPKB Financing',
      description: 'Vehicle-based financing application',
      icon: Car,
      href: `/${locale}/dashboard/bpkb-financing`,
    },
    {
      id: 'property',
      title: 'Property-Based Financing',
      description: 'Property certificate-based financing',
      icon: Home,
      href: `/${locale}/dashboard/property-financing`,
    },
    {
      id: 'ap-invoice',
      title: 'AP Invoice Financing',
      description: 'Accounts Payable invoice financing',
      icon: Building2,
      href: `/${locale}/dashboard/ap-invoice-financing`,
    },
    {
      id: 'ar-invoice',
      title: 'AR Invoice Financing',
      description: 'Accounts Receivable invoice financing',
      icon: FileText,
      href: `/${locale}/dashboard/ar-invoice-financing`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="overflow-hidden">
                <AnimatedHeading
                  as="h1"
                  className="text-4xl md:text-5xl font-black tracking-tight"
                >
                  Dashboard
                </AnimatedHeading>
              </div>
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.1}
                  className="text-muted-foreground"
                >
                  Welcome back, {user.fullName}
                </AnimatedText>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                logout();
                router.push(`/${locale}`);
              }}
            >
              Logout
            </Button>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, index) => {
              const Icon = app.icon;
              return (
                <Link key={app.id} href={app.href}>
                  <div className="group relative bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{app.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {app.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full group-hover:border-primary group-hover:text-primary"
                      >
                        Start Application
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

