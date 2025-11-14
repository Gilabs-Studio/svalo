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
  notFound?: NotFoundMessages;
}
