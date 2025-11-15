# Internationalization Module PRD

## Business Logic & Rules

**Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Overview

The Internationalization Module handles language detection, selection, translation management, language preference persistence, and content localization for the Savlo platform. It supports English (default) and Indonesian languages.

---

## 2. Language Configuration

### 2.1 Supported Languages

**Primary Language:**

- English (en) - Default language

**Secondary Language:**

- Indonesian (id) - Bahasa Indonesia

**Language Codes:**

- `en` - English
- `id` - Indonesian

### 2.2 Language Data Structure

```typescript
interface LanguageConfig {
  code: "en" | "id";
  name: string;
  nativeName: string;
  flag?: string; // Optional flag emoji or icon
  isDefault: boolean;
}

const languages: LanguageConfig[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    isDefault: true,
  },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    isDefault: false,
  },
];
```

---

## 3. Language Detection & Selection

### 3.1 Language Detection

**Detection Priority:**

1. User's saved preference (if logged in)
2. URL parameter (`/en/` or `/id/`)
3. Local storage (if not logged in)
4. Browser language (optional, suggest Indonesian if detected)
5. Default: English (en)

**Detection Function:**

```typescript
function detectLanguage(
  user: User | null,
  url: string,
  browserLang: string,
): "en" | "id" {
  // 1. Check user preference (if logged in)
  if (user?.languagePreference) {
    return user.languagePreference;
  }

  // 2. Check URL parameter
  const urlLang = extractLanguageFromUrl(url);
  if (urlLang) return urlLang;

  // 3. Check local storage
  const storedLang = localStorage.getItem("language");
  if (storedLang && ["en", "id"].includes(storedLang)) {
    return storedLang as "en" | "id";
  }

  // 4. Check browser language (optional)
  if (browserLang.startsWith("id")) {
    return "id"; // Suggest Indonesian
  }

  // 5. Default to English
  return "en";
}
```

### 3.2 Language Selection

**Language Switcher:**

- Display in header navigation
- Format: `EN | ID` or dropdown
- Current language highlighted/active
- Clicking switches language

**Selection Function:**

```typescript
function selectLanguage(lang: "en" | "id", user: User | null): void {
  // Update URL
  updateUrlLanguage(lang);

  // Save to local storage
  localStorage.setItem("language", lang);

  // Save to user profile (if logged in)
  if (user) {
    updateUserLanguagePreference(user.id, lang);
  }

  // Reload page or update content
  reloadWithLanguage(lang);
}
```

---

## 4. Language Persistence

### 4.1 Persistence Methods

**1. User Account (Primary - if logged in)**

- Stored in user profile: `languagePreference: 'en' | 'id'`
- Persists across devices
- Updated when user changes language

**2. Local Storage (Secondary - if not logged in)**

- Stored in browser: `localStorage.setItem('language', 'en' | 'id')`
- Persists in same browser
- Cleared when user logs in (use account preference)

**3. URL Parameter (Tertiary)**

- URL prefix: `/en/` or `/id/`
- Shareable links with language
- SEO-friendly

**4. Cookie (Fallback)**

- If local storage not available
- Same behavior as local storage

### 4.2 Persistence Priority

**When User Logged In:**

1. User account preference (primary)
2. URL parameter (for shareable links)
3. Local storage (ignored, use account)

**When User Not Logged In:**

1. URL parameter
2. Local storage
3. Cookie (fallback)
4. Browser language (suggestion)
5. Default: English

---

## 5. URL Structure

### 5.1 URL Prefix (Recommended)

**Structure:**

```
/en/                    - Landing page (English)
/id/                    - Landing page (Indonesian)
/en/login               - Login (English)
/id/login               - Login (Indonesian)
/en/apply/bpkb-financing - Application form (English)
/id/apply/bpkb-financing - Application form (Indonesian)
/en/my-applications     - Dashboard (English)
/id/my-applications     - Dashboard (Indonesian)
```

**Implementation:**

- Next.js App Router: `[locale]` dynamic segment
- Route structure: `app/[locale]/page.tsx`
- Language extracted from URL segment

### 5.2 URL Update on Language Change

**When User Changes Language:**

1. Extract current path
2. Replace language prefix
3. Navigate to new URL
4. Preserve query parameters

**Function:**

```typescript
function updateUrlLanguage(newLang: "en" | "id"): void {
  const currentPath = window.location.pathname;
  const pathWithoutLang = currentPath.replace(/^\/(en|id)/, "");
  const newPath = `/${newLang}${pathWithoutLang}`;

  window.location.href = newPath;
  // Or use Next.js router.push()
}
```

---

## 6. Translation Management

### 6.1 Translation File Structure

**Directory Structure:**

```
/locales
  /en
    common.json
    products.json
    forms.json
    applications.json
    help.json
    errors.json
    validation.json
  /id
    common.json
    products.json
    forms.json
    applications.json
    help.json
    errors.json
    validation.json
```

### 6.2 Translation Key Structure

**Naming Convention:**

```
namespace:key.subkey
```

**Examples:**

```
common:nav.home
common:nav.myApplications
common:button.submit
common:button.cancel

product:bpkb.title
product:bpkb.description
product:property.maxAmount

form:bpkb.step1.title
form:bpkb.step2.dataDiri
form:bpkb.step2.namaLengkap
form:bpkb.validation.required

application:status.submitted
application:status.underReview

help:faq.title
help:faq.general
```

### 6.3 Translation File Examples

**common.json (English):**

```json
{
  "nav": {
    "home": "Home",
    "myApplications": "My Applications",
    "helpCenter": "Help Center",
    "login": "Login",
    "register": "Register"
  },
  "button": {
    "submit": "Submit",
    "cancel": "Cancel",
    "next": "Next",
    "back": "Back",
    "save": "Save",
    "continue": "Continue"
  },
  "footer": {
    "copyright": "© Savlo 2024-2025. All rights reserved.",
    "terms": "Terms of Service",
    "privacy": "Privacy Policy"
  }
}
```

**common.json (Indonesian):**

```json
{
  "nav": {
    "home": "Beranda",
    "myApplications": "Aplikasi Saya",
    "helpCenter": "Pusat Bantuan",
    "login": "Masuk",
    "register": "Daftar"
  },
  "button": {
    "submit": "Kirim",
    "cancel": "Batal",
    "next": "Selanjutnya",
    "back": "Kembali",
    "save": "Simpan",
    "continue": "Lanjutkan"
  },
  "footer": {
    "copyright": "© Savlo 2024-2025. Hak cipta dilindungi.",
    "terms": "Ketentuan Layanan",
    "privacy": "Kebijakan Privasi"
  }
}
```

---

## 7. Content Localization Rules

### 7.1 What Gets Translated

**Translated Content:**

- Navigation menu
- Page titles and headings
- Button labels
- Form labels and placeholders
- Error messages
- Success messages
- Product descriptions
- Eligibility requirements
- Status labels
- Help center content
- FAQ content

### 7.2 What Doesn't Get Translated

**Not Translated (Language-Independent):**

- Application IDs (format: #[number])
- Currency (IDR - Indonesian Rupiah)
- Dates (format: DD/MM/YYYY - Indonesian format)
- User input data (stored as entered)
- Document names (as uploaded by user)
- Google Drive URLs

### 7.3 Indonesian-Specific Terms

**Terms That Stay in Indonesian:**

- KTP (Indonesian ID card) - with English explanation
- Kelurahan, Kecamatan (administrative divisions) - with English explanation
- SHM/SHGB (property certificates) - with English explanation
- BPKB (vehicle ownership document) - with English explanation
- NPWP (tax ID) - with English explanation

**Display Format:**

- English: "No. KTP (Indonesian ID Number)"
- Indonesian: "No. KTP"

---

## 8. Translation Usage

### 8.1 Translation Hook/Function

**React Hook (next-intl example):**

```typescript
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('common');

  return (
    <button>{t('button.submit')}</button>
  );
}
```

**Translation Function:**

```typescript
function translate(key: string, lang: "en" | "id"): string {
  const [namespace, ...keyParts] = key.split(":");
  const translationFile = require(`/locales/${lang}/${namespace}.json`);

  let value = translationFile;
  for (const part of keyParts) {
    value = value[part];
    if (!value) return key; // Fallback to key if not found
  }

  return value;
}
```

### 8.2 Translation in Components

**Example Usage:**

```typescript
// In component
const t = useTranslation();

<h1>{t('product:bpkb.title')}</h1>
<p>{t('product:bpkb.description')}</p>
<button>{t('common:button.submit')}</button>

// With parameters
<p>{t('form:bpkb.step2.namaLengkap', { required: '*' })}</p>
```

---

## 9. Business Rules

### 9.1 Language-Specific Rules

**Form Data:**

- User can input in any language
- Form labels always in selected language
- Validation messages in selected language
- Document names can be in any language

**Application Data:**

- Application data stored in original language (user input)
- Application display: Labels in selected language, data in original
- Application ID: Language-independent

**User Preferences:**

- Language preference saved per user
- If user changes language, preference updated
- Language preference persists across sessions

**Content Consistency:**

- All pages must support both languages
- No mixed languages on same page
- Consistent terminology across translations

### 9.2 Currency & Date Formatting

**Currency:**

- Always display IDR (Indonesian Rupiah)
- Format: `IDR 5,000,000,000` or `IDR 5B`
- Language-independent

**Dates:**

- Format: DD/MM/YYYY (Indonesian format)
- Or use locale-aware formatting
- Language-independent format

**Phone Numbers:**

- Indonesian format: +62 XXX XXXX XXXX
- Validation rules apply regardless of language

---

## 10. Implementation Requirements

### 10.1 Technical Implementation

**Recommended Libraries:**

- `next-intl` - Next.js internationalization
- `react-i18next` - React internationalization
- `next-i18next` - Next.js with react-i18next

**Setup:**

```typescript
// i18n configuration
import { NextIntlClientProvider } from 'next-intl';

export default function RootLayout({ children, params: { locale } }) {
  return (
    <NextIntlClientProvider locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
```

### 10.2 Language Switcher Component

```typescript
function LanguageSwitcher({ currentLang }: { currentLang: 'en' | 'id' }) {
  const router = useRouter();

  const switchLanguage = (lang: 'en' | 'id') => {
    const path = router.asPath.replace(/^\/(en|id)/, '');
    router.push(`/${lang}${path}`);
  };

  return (
    <div>
      <button
        onClick={() => switchLanguage('en')}
        className={currentLang === 'en' ? 'active' : ''}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('id')}
        className={currentLang === 'id' ? 'active' : ''}
      >
        ID
      </button>
    </div>
  );
}
```

---

## 11. Testing Requirements

**Test Cases:**

- [ ] Language detection works correctly
- [ ] Language switcher works on all pages
- [ ] Language preference persists after page refresh
- [ ] Language preference persists after login/logout
- [ ] URL updates correctly when language changes
- [ ] All pages display correctly in both languages
- [ ] Form validation messages in correct language
- [ ] Application data displays correctly
- [ ] No mixed languages on same page
- [ ] All text is translated (no hardcoded strings)
- [ ] Indonesian-specific terms properly handled
- [ ] Currency and dates display correctly

---

## Document History

| Version | Date       | Author  | Changes                                 |
| ------- | ---------- | ------- | --------------------------------------- |
| 1.0     | 2025-01-27 | Initial | Created Internationalization Module PRD |
