// Message types for landing feature
// Only type declarations are allowed in .d.ts

export interface NotFoundMessages {
  headline: string;
  subtext: string;
  description: string;
  cta: {
    home: string;
  };
}

export interface ContactFormMessages {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  success: string;
}

export interface ContactMessages {
  heading: string;
  address: string;
  hours: string;
  phone: string;
  copyright: string;
  tagline: string;
  cta: {
    directions: string;
  };
  social: {
    instagram: string;
    threads: string;
  };
  form?: ContactFormMessages;
}

export interface HeroMessages {
  headline: string;
  subtext: string;
  description: string;
  cta: {
    startApplication: string;
    howItWorks: string;
  };
}

export interface HowItWorksStepMessages {
  title: string;
  description: string;
}

export interface HowItWorksMessages {
  heading: string;
  steps: HowItWorksStepMessages[];
  microcopy: string;
}

export interface ProductItemMessages {
  title: string;
  description: string;
  cta: string;
}

export interface ProductsMessages {
  heading: string;
  items: ProductItemMessages[];
}

export interface WhyChooseSavloMessages {
  heading: string;
  items: string[];
}

export interface PricingMessages {
  heading: string;
  subtext: string;
  cta: string;
}

export interface TrustMessages {
  heading: string;
  microcopy: string;
}

export interface FooterCtaMessages {
  heading: string;
  subtext: string;
  cta: {
    startApplication: string;
    contactSales: string;
  };
}

export interface AboutMessages {
  heading: string;
  body: string[];
  title?: string;
  subtitle?: string;
  story?: {
    heading: string;
    content: string;
  };
  values?: {
    heading: string;
    precision: {
      title: string;
      description: string;
    };
    excellence: {
      title: string;
      description: string;
    };
    tradition: {
      title: string;
      description: string;
    };
  };
}

export interface WhyPeopleComeBackMessages {
  heading: string;
  items: Array<{
    icon: string;
    text: string;
  }>;
  smallLine: string;
}

export interface GalleryMessages {
  heading: string;
  body: string[];
  social?: {
    instagram: string;
    threads: string;
  };
}

export interface ServicesProductMessages {
  title: string;
  brand: string;
  description: string;
  benefit: string;
  cta: string;
}

export interface ServicesMessages {
  heading: string;
  subtext: string;
  intro?: string;
  products: ServicesProductMessages[];
  items?: Array<{
    title: string;
    description: string;
    cta: string;
    image?: string;
    icon?: string;
    detail?: string;
    smallLine?: string;
  }>;
  helpSection?: {
    heading: string;
    body: string;
  };
}

export interface ChoosePlanSavloMessages {
  name: string;
  overview: string;
  description: string;
  eligibility: string[];
  partners: string;
  valueProps: string[];
}

export interface ChoosePlanSavloPlusMessages {
  name: string;
  badge: string;
  overview: string;
  description: string;
  eligibility: string[];
  partners: string;
  valueProps: string[];
}

export interface ChoosePlanMessages {
  heading: string;
  subtext: string;
  savlo: ChoosePlanSavloMessages;
  savloPlus: ChoosePlanSavloPlusMessages;
  trustedBy: string;
}

export interface TestimonialsMessages {
  heading: string;
}

export interface Messages {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    howItWorks: string;
    products: string;
    pricing: string;
    resources: string;
    contact: string;
    signIn: string;
    getStarted: string;
  };
  hero: HeroMessages;
  howItWorks: HowItWorksMessages;
  products: ProductsMessages;
  whyChooseSavlo: WhyChooseSavloMessages;
  pricing: PricingMessages;
  trust: TrustMessages;
  footerCta: FooterCtaMessages;
  contact: ContactMessages;
  services: ServicesMessages;
  choosePlan: ChoosePlanMessages;
  about: AboutMessages;
  whyPeopleComeBack: WhyPeopleComeBackMessages;
  gallery: GalleryMessages;
  testimonials: TestimonialsMessages;
  notFound?: NotFoundMessages;
}
