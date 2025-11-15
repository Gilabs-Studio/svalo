'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/i18n';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { AnimatedHeading } from '@/features/landing/components/animated-heading';
import { AnimatedText } from '@/features/landing/components/animated-text';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { getMessages } from '../lib/get-messages';
import Link from 'next/link';
import { FileText, Building2, Car, Home } from 'lucide-react';
import type { Application, ApplicationStatus, ProductType } from '../types';

interface DashboardPageProps {
  readonly locale: Locale;
}

export function DashboardPage({ locale }: DashboardPageProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const messages = getMessages(locale);
  const t = messages;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/auth/login`);
    }
  }, [isAuthenticated, locale, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Dummy application data
  const dummyApplications: Application[] = [
    // Draft applications
    {
      id: '1',
      applicationId: null,
      userId: user.id,
      productType: 'BPKB_FINANCING',
      status: 'DRAFT',
      submissionDate: null,
      currentStep: 2,
      amountRequested: 50000000,
      amountApproved: null,
      createdAt: new Date('2025-01-20'),
      updatedAt: new Date('2025-01-22'),
    },
    {
      id: '2',
      applicationId: null,
      userId: user.id,
      productType: 'PROPERTY_FINANCING',
      status: 'DRAFT',
      submissionDate: null,
      currentStep: 1,
      amountRequested: 200000000,
      amountApproved: null,
      createdAt: new Date('2025-01-25'),
      updatedAt: new Date('2025-01-25'),
    },
    // Under review applications
    {
      id: '3',
      applicationId: '#42',
      userId: user.id,
      productType: 'AP_INVOICE_FINANCING',
      status: 'UNDER_REVIEW',
      submissionDate: new Date('2025-01-15'),
      currentStep: 4,
      amountRequested: 750000000,
      amountApproved: null,
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-18'),
    },
    {
      id: '4',
      applicationId: '#41',
      userId: user.id,
      productType: 'AR_INVOICE_FINANCING',
      status: 'SUBMITTED',
      submissionDate: new Date('2025-01-20'),
      currentStep: 4,
      amountRequested: 1000000000,
      amountApproved: null,
      createdAt: new Date('2025-01-18'),
      updatedAt: new Date('2025-01-20'),
    },
    // Reviewed applications
    {
      id: '5',
      applicationId: '#38',
      userId: user.id,
      productType: 'BPKB_FINANCING',
      status: 'APPROVED',
      submissionDate: new Date('2024-12-10'),
      currentStep: 4,
      amountRequested: 30000000,
      amountApproved: 30000000,
      createdAt: new Date('2024-12-05'),
      updatedAt: new Date('2024-12-20'),
    },
    {
      id: '6',
      applicationId: '#35',
      userId: user.id,
      productType: 'PROPERTY_FINANCING',
      status: 'REJECTED',
      submissionDate: new Date('2024-11-15'),
      currentStep: 4,
      amountRequested: 500000000,
      amountApproved: null,
      createdAt: new Date('2024-11-10'),
      updatedAt: new Date('2024-11-25'),
    },
    {
      id: '7',
      applicationId: '#30',
      userId: user.id,
      productType: 'AP_INVOICE_FINANCING',
      status: 'APPROVED',
      submissionDate: new Date('2024-10-20'),
      currentStep: 4,
      amountRequested: 600000000,
      amountApproved: 600000000,
      createdAt: new Date('2024-10-15'),
      updatedAt: new Date('2024-11-05'),
    },
  ];

  const getProductName = (productType: ProductType): string => {
    switch (productType) {
      case 'BPKB_FINANCING':
        return t.bpkb.title;
      case 'PROPERTY_FINANCING':
        return t.property.title;
      case 'AP_INVOICE_FINANCING':
        return t.apInvoice.title;
      case 'AR_INVOICE_FINANCING':
        return t.arInvoice.title;
      default:
        return productType;
    }
  };

  const getProductRoute = (productType: ProductType): string => {
    switch (productType) {
      case 'BPKB_FINANCING':
        return 'bpkb-financing';
      case 'PROPERTY_FINANCING':
        return 'property-financing';
      case 'AP_INVOICE_FINANCING':
        return 'ap-invoice-financing';
      case 'AR_INVOICE_FINANCING':
        return 'ar-invoice-financing';
      default:
        return '';
    }
  };

  const getStatusBadgeVariant = (status: ApplicationStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'DRAFT':
        return 'outline';
      case 'SUBMITTED':
      case 'UNDER_REVIEW':
      case 'DOCUMENT_REQUEST':
        return 'secondary';
      case 'APPROVED':
      case 'DISBURSED':
      case 'CLOSED':
        return 'default';
      case 'REJECTED':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: ApplicationStatus): string => {
    switch (status) {
      case 'DRAFT':
        return t.myApplications.status.draft;
      case 'SUBMITTED':
        return t.myApplications.status.submitted;
      case 'UNDER_REVIEW':
        return t.myApplications.status.underReview;
      case 'DOCUMENT_REQUEST':
        return t.myApplications.status.documentRequest;
      case 'APPROVED':
        return t.myApplications.status.approved;
      case 'REJECTED':
        return t.myApplications.status.rejected;
      case 'DISBURSED':
        return t.myApplications.status.disbursed;
      case 'CLOSED':
        return t.myApplications.status.closed;
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const drafts = dummyApplications.filter((app) => app.status === 'DRAFT');
  const underReview = dummyApplications.filter(
    (app) => app.status === 'SUBMITTED' || app.status === 'UNDER_REVIEW' || app.status === 'DOCUMENT_REQUEST'
  );
  const reviewed = dummyApplications.filter(
    (app) => app.status === 'APPROVED' || app.status === 'REJECTED' || app.status === 'DISBURSED' || app.status === 'CLOSED'
  );

  const applications = [
    {
      id: 'bpkb',
      title: t.bpkb.title,
      description: t.bpkb.description,
      icon: Car,
      href: `/${locale}/dashboard/bpkb-financing`,
    },
    {
      id: 'property',
      title: t.property.title,
      description: t.property.description,
      icon: Home,
      href: `/${locale}/dashboard/property-financing`,
    },
    {
      id: 'ap-invoice',
      title: t.apInvoice.title,
      description: t.apInvoice.description,
      icon: Building2,
      href: `/${locale}/dashboard/ap-invoice-financing`,
    },
    {
      id: 'ar-invoice',
      title: t.arInvoice.title,
      description: t.arInvoice.description,
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
                  {t.title}
                </AnimatedHeading>
              </div>
              <div className="overflow-hidden">
                <AnimatedText
                  delay={0.1}
                  className="text-muted-foreground"
                >
                  {t.welcome.replace('{name}', user.fullName)}
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
                        {t.applications.startApplication}
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* My Applications Section */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h2"
                className="text-3xl md:text-4xl font-black tracking-tight"
              >
                {t.myApplications.title}
              </AnimatedHeading>
            </div>

            <Tabs defaultValue="drafts" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="drafts">
                  {t.myApplications.tabs.drafts}
                  {drafts.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {drafts.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="underReview">
                  {t.myApplications.tabs.underReview}
                  {underReview.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {underReview.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="reviewed">
                  {t.myApplications.tabs.reviewed}
                  {reviewed.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {reviewed.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Drafts Tab */}
              <TabsContent value="drafts" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{t.myApplications.drafts.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.myApplications.drafts.description}</p>
                </div>
                {drafts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drafts.map((app) => (
                      <Card key={app.id} className="border">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{getProductName(app.productType)}</CardTitle>
                              <CardDescription className="mt-1">
                                {app.amountRequested ? formatCurrency(app.amountRequested) : 'Amount not set'}
                              </CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(app.status)}>
                              {getStatusText(app.status)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              Step {app.currentStep} of 4 • {formatDate(app.updatedAt)}
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/${locale}/dashboard/${getProductRoute(app.productType)}`}>
                                {t.myApplications.drafts.continue}
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.myApplications.drafts.empty}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Under Review Tab */}
              <TabsContent value="underReview" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{t.myApplications.underReview.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.myApplications.underReview.description}</p>
                </div>
                {underReview.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {underReview.map((app) => (
                      <Card key={app.id} className="border">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{getProductName(app.productType)}</CardTitle>
                              <CardDescription className="mt-1">
                                {app.applicationId} • {app.amountRequested ? formatCurrency(app.amountRequested) : 'N/A'}
                              </CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(app.status)}>
                              {getStatusText(app.status)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {app.submissionDate ? `Submitted ${formatDate(app.submissionDate)}` : 'Not submitted'}
                            </div>
                            <Button variant="outline" size="sm">
                              {t.myApplications.underReview.viewDetails}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.myApplications.underReview.empty}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Reviewed Tab */}
              <TabsContent value="reviewed" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{t.myApplications.reviewed.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.myApplications.reviewed.description}</p>
                </div>
                {reviewed.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reviewed.map((app) => (
                      <Card key={app.id} className="border">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-lg">{getProductName(app.productType)}</CardTitle>
                              <CardDescription className="mt-1">
                                {app.applicationId} • {app.amountRequested ? formatCurrency(app.amountRequested) : 'N/A'}
                                {app.amountApproved && app.status === 'APPROVED' && (
                                  <span className="ml-2 text-green-600">
                                    • Approved: {formatCurrency(app.amountApproved)}
                                  </span>
                                )}
                              </CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(app.status)}>
                              {getStatusText(app.status)}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {app.submissionDate ? `Submitted ${formatDate(app.submissionDate)}` : 'Not submitted'}
                            </div>
                            <Button variant="outline" size="sm">
                              {t.myApplications.reviewed.viewDetails}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-8 text-center text-muted-foreground">
                      {t.myApplications.reviewed.empty}
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

        </div>
      </div>
    </div>
  );
}


