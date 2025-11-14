import { type Locale } from '@/i18n';
import { getMessages } from '@/features/landing/lib/get-messages';
import { ContactForm } from '@/features/landing/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }
  const locale = localeParam as Locale;
  const messages = getMessages(locale);
  const t = messages.contact;

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.heading}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm locale={locale} />
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {t.address}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {t.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2"> 
                  <Clock className="h-5 w-5" /> <span>Hours</span>
                </CardTitle> 
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">{t.hours}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

