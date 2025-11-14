import { type Locale } from '@/i18n';
import { getMessages } from '@/features/landing/lib/get-messages';
import { GalleryCarousel } from '@/features/landing/components/gallery-carousel';
import Image from 'next/image';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';

interface GalleryPageProps {
  params: Promise<{ locale: string }>;
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale: localeParam } = await params;
  if (!locales.includes(localeParam as Locale)) {
    notFound();
  }
  const locale = localeParam as Locale;
  const messages = getMessages(locale);
  const t = messages.gallery;

  const images = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t.heading}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.body?.[0]}
          </p>
        </div>

        {/* Carousel Section */}
        <div className="mb-16">
          <GalleryCarousel />
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden group cursor-pointer"
            >
              <Image
                src="/image.webp"
                alt={`Gallery image ${i}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

