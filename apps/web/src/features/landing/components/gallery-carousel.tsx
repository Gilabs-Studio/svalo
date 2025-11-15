"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function GalleryCarousel() {
  const images = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {images.map((i) => (
          <CarouselItem key={i}>
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src="/image.webp"
                alt={`Gallery image ${i}`}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
