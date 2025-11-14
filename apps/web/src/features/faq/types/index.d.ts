// FAQ feature types

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export interface HowToApplyStep {
  title: string;
  description: string;
}

export interface FAQMessages {
  metadata: {
    title: string;
    description: string;
  };
  heading: string;
  subtext: string;
  categories: FAQCategory[];
  howToApply: {
    heading: string;
    steps: HowToApplyStep[];
  };
  contactCta: {
    heading: string;
    subtext: string;
    buttonText: string;
    whatsappUrl: string;
  };
}

