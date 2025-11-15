"use client";

import { type Locale } from "@/i18n";
import { getMessages } from "../lib/get-messages";
import { AnimatedHeading } from "./animated-heading";
import { cn } from "@/lib/utils";
import { Marquee } from "@/registry/magicui/marquee";

interface TestimonialsSectionProps {
  readonly locale: Locale;
}

const reviews = [
  {
    name: "Ridella Dela",
    username: "@pelanggan1",
    body: "Trust me! kang gunting rambut nya udah paham banget harus model apa and its works! verry nice, ga mahal juga. Ga dibayar yaaa reviewnya",
    img: "https://avatar.vercel.sh/pelanggan1",
    link: "https://maps.app.goo.gl/vYaqiX5Z6F5F5Fsu7",
  },
  {
    name: "Franky Hermansyah",
    username: "@pelanggan2",
    body: "Ratenya 11/10 absolutely worth it. Lebih murah dari barbershop brand yang viral, tapi kualitas ini jelas menang. Tempat rapih dan bersih, clipper nya detail abis, sesuai request dan peka, saya kucek mata otomatis pause motong sejenak, hasil potongan juga sesuai harapan. Biaya untuk haircut, hairwash, pijet kepala dan blow dry steal deal banget 👌",
    img: "https://avatar.vercel.sh/pelanggan2",
    link: "https://maps.app.goo.gl/Hz89dHLgiPmzy4iD6",
  },
  {
    name: "Dby Satya",
    username: "@pelanggan3",
    body: "Tempatnya bersih, rapi, parkiran mobil jg gampang, harganya mumer (very affordable) alias terjangkau bgt, hair stylishnya jago, hasil hair cut nya rapi, bagus, bersih. Yg diutamakan klo ke barber shop ato beauty salon itu adlh kebersihan tempat & alat²nya. Disini BERSIH.",
    img: "https://avatar.vercel.sh/pelanggan3",
    link: "https://maps.app.goo.gl/MowxM3o5wFd948SN6",
  },
  {
    name: "Feli",
    username: "@pelanggan4",
    body: 'benar" premium, cutnya fresh sama konsisten potongan selalu bagus setiap datang kesini. Barbernya 22 nya bagus, gada yang ga bagus. Ga seperti yang merah...',
    img: "https://avatar.vercel.sh/pelanggan4",
    link: "https://maps.app.goo.gl/7m3qNECnT8mhYj287",
  },
  {
    name: "Tyas Adityo",
    username: "@pelanggan6",
    body: "Barber profesional ramah2 free coffee dan tea ,,, auto langganan tetap 🙏🙏",
    img: "https://avatar.vercel.sh/pelanggan6",
    link: "https://maps.app.goo.gl/ExVrqhuNDT8q9Aj49",
  },
  {
    name: "Theodore Sebastian",
    username: "@pelanggan7",
    body: "Potong nya cepat dan rapih pula, ruangan nya sejuk dan ada lagu nya jugaa 😁😁",
    img: "https://avatar.vercel.sh/pelanggan7",
    link: "https://maps.app.goo.gl/a7Fvt2T981RzazCU8",
  },
  {
    name: "Studio 52",
    username: "@pelanggan10",
    body: "Nicee mantapp..cozy tempatnya.. gunting nya mantapp guys... gentlemen bget",
    img: "https://avatar.vercel.sh/pelanggan10",
    link: "https://maps.app.goo.gl/Htj8dbA8rMs4ZrRA9",
  },
  {
    name: "nur lailaa",
    username: "@pelanggan12",
    body: "Potongannya bagus sesuai dengan yang saya inginkan, orang yang potong friendly, tempatnya nyaman dan jg bersih😍😍next pasti Dateng lagi ke sini🥳🥳",
    img: "https://avatar.vercel.sh/pelanggan12",
    link: "https://maps.app.goo.gl/PG9YXg7mo4xajz3DA",
  },
  {
    name: "Randi Randi",
    username: "@pelanggan13",
    body: "Potongan hasilnya bagus tempatnya nyaman banget pokonya terbaik top gan barbershop",
    img: "https://avatar.vercel.sh/pelanggan13",
    link: "https://maps.app.goo.gl/2rYNSbfwvDeU8drc6",
  },
  {
    name: "henry macan",
    username: "@pelanggan15",
    body: "Barbershop langganan, service mantap, cepat, hemat dan bagus, tempat ok, gunting, cuci dan pijat masih Promo, mantab",
    img: "https://avatar.vercel.sh/pelanggan15",
    link: "https://maps.app.goo.gl/JbjXnbirBnhCKT3d9",
  },
  {
    name: "Runi Banyuresmi",
    username: "@pelanggan17",
    body: "Mantap saya suka cukur di gun barberhop. Potong nya keren tempat nya bersih🤗🤗🤗",
    img: "https://avatar.vercel.sh/pelanggan17",
    link: "https://maps.app.goo.gl/TL4iWU2k6DMdNCAJ9",
  },
  {
    name: "Reza Pahlevi",
    username: "@pelanggan20",
    body: "Di jamin puas potong disini gaka bakal nyesel pokonya 🤗🤗",
    img: "https://avatar.vercel.sh/pelanggan20",
    link: "https://maps.app.goo.gl/qYYd49kAnGTCwCdZ9",
  },
  {
    name: "Samuel Hidayat",
    username: "@pelanggan21",
    body: "Great place. Excellent ambience. Great services. Good result on haircut - especially for men.",
    img: "https://avatar.vercel.sh/pelanggan21",
    link: "https://maps.app.goo.gl/5Hf7CamXJGMFF1zi8",
  },
  {
    name: "Noona Mom",
    username: "@pelanggan27",
    body: "Very nice barber shop 👍🏻 My husband and son always go there to get their hair cut 👍🏻",
    img: "https://avatar.vercel.sh/pelanggan27",
    link: "https://maps.app.goo.gl/He42fBk6B2Qb1WdT9",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0]?.[0]?.toUpperCase() || "";
  const lastWord = words.at(-1);
  return (
    (words[0]?.[0]?.toUpperCase() || "") + (lastWord?.[0]?.toUpperCase() || "")
  );
};

const StarRating = () => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={`star-${i}`} className="text-yellow-500 text-xs">
          ★
        </span>
      ))}
    </div>
  );
};

const ReviewCard = ({
  name,
  body,
  link,
}: {
  name: string;
  body: string;
  link: string;
}) => {
  const initials = getInitials(name);

  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden border p-6",
        "bg-card border-border",
        "hover:shadow-lg transition-all duration-300 hover:scale-[1.02]",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-headline text-lg font-bold">
          {initials}
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-sm font-bold text-foreground">{name}</div>
          <StarRating />
        </div>
      </div>
      <blockquote className="text-sm leading-relaxed text-foreground">
        {body}
      </blockquote>
    </div>
  );
};

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const messages = getMessages(locale);
  const t = messages.testimonials;

  if (!t) {
    return null;
  }

  return (
    <section className="min-h-[90vh] flex items-center py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          <AnimatedHeading
            as="h2"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-center"
          >
            {t.heading}
          </AnimatedHeading>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard
                  key={review.link}
                  name={review.name}
                  body={review.body}
                  link={review.link}
                />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard
                  key={review.link}
                  name={review.name}
                  body={review.body}
                  link={review.link}
                />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
