// Auth feature types
// Only type declarations are allowed in .d.ts

export interface AuthMessages {
  login: {
    title: string;
    subtitle: string;
    email: string;
    password: string;
    rememberMe: string;
    forgotPassword: string;
    signIn: string;
    signingIn: string;
    error: string;
    demoCredentials: string;
  };
  register: {
    title: string;
    subtitle: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    userType: string;
    accountType: string;
    password: string;
    confirmPassword: string;
    passwordHint: string;
    terms: string;
    termsLink: string;
    privacyLink: string;
    createAccount: string;
    creatingAccount: string;
    errors: {
      passwordMismatch: string;
      passwordTooShort: string;
    };
  };
  layout: {
    welcomeBack: string;
    welcomeBackDescription: string;
    startJourney: string;
    startJourneyDescription: string;
    features: {
      secure: string;
      tracking: string;
      trusted: string;
    };
    switchToRegister: string;
    switchToLogin: string;
  };
  demoCredentials: {
    title: string;
    individual: string;
    business: string;
    password: string;
  };
}


