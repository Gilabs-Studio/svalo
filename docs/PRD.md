# Product Requirements Document (PRD)

## Savlo - Your Financing Gateway

## Business Logic & Rules

**Version:** 2.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Executive Summary

### 1.1 Purpose

This PRD defines the business logic, rules, and processes for the Savlo financing gateway platform. It focuses on eligibility criteria, product specifications, application workflows, form structures, and business rules that govern the platform's operations.

### 1.2 Business Model

Savlo operates as a **financing gateway** connecting borrowers to lenders:

- **Free Tier (Savlo):** Gateway service connecting users to multi-finance institutions and fintech lenders
- **Premium Tier (Savlo+):** Premium ecosystem program with personalized solutions and exclusive access to secret financial institutions

### 1.3 Core Value Proposition

"Unlock Your Business Potential with Seamless Financing. Savlo is Your Financing Gateway, connecting you to the right funding solutions, quickly and securely."

### 1.4 Target Market

- **Primary:** SMEs with minimum 2 years operation + positive financial performance
- **Secondary:** Individuals with collaterals (BPKB, property certificates)
- **Tertiary:** Businesses that struggle with standard financing eligibility (Savlo+ target)

---

## 2. Authentication & User Management

### 2.1 Authentication Requirement

**YES, Login & Dashboard Required**

**Business Justification:**

1. **Application Tracking:** Users need to track multiple applications across different services
2. **Data Persistence:** Form data must be saved per user to allow multi-step form completion
3. **Document Management:** Each user has unique document requirements per application
4. **Application History:** Users need to view past applications (as shown in "My Applications" page)
5. **User Experience:** Multi-step forms require session management to prevent data loss

### 2.2 User Account Structure

**User Entity:**

- User ID (unique identifier)
- Username/Email (login credential)
- Password (hashed)
- Full Name
- Phone Number
- User Type: `INDIVIDUAL` | `BUSINESS`
- Account Type: `SAVLO` | `SAVLO_PLUS`
- Registration Date
- Last Login
- Session Token

**Business Rules:**

- One user can have multiple applications
- User type determines available products
- Savlo+ membership required for Ecosystem Banking Solutions
- Email must be unique
- Phone number must be unique

### 2.3 Dashboard Requirements

**"My Applications" Dashboard:**

- List all user's applications
- Display: Application ID, Financing Type, Submission Date, Status
- Filter by application type
- View application details
- Continue incomplete applications

---

## 3. Product Specifications & Business Rules

### 3.1 BPKB-based Financing

**Product Code:** `BPKB_FINANCING`  
**Target:** Individuals  
**Collateral:** Vehicle ownership document (BPKB)  
**Use Case:** Quick process for urgent needs

**Eligibility Rules:**

- Must be individual (not business)
- Must own vehicle with valid BPKB
- BPKB must be in applicant's name
- Vehicle must be fully paid (no existing financing)
- Vehicle must have valid STNK and insurance

**Application Form Structure (Multi-Step):**

**Step 1: Registration**

- User must be logged in
- If not logged in, redirect to login/register

**Step 2: BPKB Info**

- **Data Diri:**
  - Nama Lengkap (Full Name) - Required
  - No. KTP (ID Number) - Required, format validation
  - No. HP (Phone Number) - Required, format validation
  - Usia Konsumen (Age) - Required, must be >= 21
  - Alamat Survey (Survey Address) - Required
  - Kelurahan (Sub-district) - Required
  - Kecamatan (District) - Required

- **Data Kendaraan (Vehicle Data):**
  - Jenis Kendaraan (Vehicle Type) - Required, dropdown: Motor | Mobil
  - Merk Kendaraan (Brand) - Required
  - Tipe Kendaraan (Model) - Required
  - Tahun Kendaraan (Year) - Required, numeric, >= 2000
  - No. Plat Kendaraan (License Plate) - Required, format validation
  - Atas Nama Kendaraan (Registered Owner) - Required
  - Status Kendaraan (Vehicle Status) - Required, dropdown: Pribadi | Perusahaan
  - Status BPKB (BPKB Status) - Required, dropdown: Asli | Copy
  - Status Pajak (Tax Status) - Required, dropdown: Lunas | Belum Lunas
  - Asuransi Kendaraan (Insurance) - Required, dropdown: Ada | Tidak Ada

- **Informasi Pinjaman (Loan Information):**
  - Jumlah Pinjaman (Loan Amount) - Required, numeric, min: 10,000,000
  - Tenor Pelunasan (Repayment Tenor) - Required, dropdown: 12 | 24 | 36 | 48 | 60 months

**Step 3: Documents**

- Google Drive URL - Required
- URL validation: must be valid Google Drive link
- Link must have viewing permissions enabled
- Required Documents Checklist:
  - ✅ Foto KTP
  - ✅ Foto BPKB
  - ✅ Foto STNK
  - ✅ Foto Kendaraan (Depan)
  - ✅ Foto Kendaraan (Belakang)
  - ✅ Foto Kendaraan (Kanan)
  - ✅ Foto Kendaraan (Kiri)

**Step 4: Review**

- Display all entered information
- Allow edit before submission
- Submit button creates application

**Business Rules:**

- Form data saved per step (auto-save)
- User can return to continue incomplete application
- Application ID generated upon submission
- Status set to "Submitted" after submission

---

### 3.2 Property-based Financing

**Product Code:** `PROPERTY_FINANCING`  
**Target:** Individuals  
**Collateral:** Property certificate (SHM/SHGB)  
**Loan-to-Value (LTV):** Up to 65% of property value  
**Maximum Amount:** IDR 5 Billion

**Eligibility Rules:**

- Must be individual (not business)
- Must own property with valid certificate (SHM or SHGB)
- Property must be in Jabodetabek area
- Property must have valid IMB and PBB

**Application Form Structure (Multi-Step):**

**Step 1: Registration**

- User must be logged in

**Step 2: Property Info**

- **Data Diri:**
  - Nama Konsumen (Consumer Name) - Required
  - No. HP (Phone Number) - Required
  - Alamat Properti (Property Address) - Required
  - Alamat Lengkap (Full Address) - Required
  - Kecamatan (District) - Required
  - Kota (City) - Required

- **Informasi Properti & Pinjaman:**
  - Jenis Sertifikat (Certificate Type) - Required, dropdown: SHM | SHGB
  - Dana Dibutuhkan (Funds Needed) - Required, numeric, max: 5,000,000,000
  - Kemampuan Angsuran / Bulan (Monthly Payment Capacity) - Required, numeric
  - Siap Di-survey? (Ready for Survey) - Required, dropdown: Ya | Tidak
  - Tanggal Pengajuan (Application Date) - Auto-filled, current date
  - Tanggal Submission (Submission Date) - Auto-filled on submit

**Step 3: Documents**

- Google Drive URL - Required
- Required Documents Checklist:
  - ✅ Foto KTP
  - ✅ Sertifikat Properti (SHM/SHGB)
  - ✅ IMB (Izin Mendirikan Bangunan)
  - ✅ PBB (Pajak Bumi dan Bangunan) Terbaru
  - ✅ Bukti Rekening Listrik/Air

**Step 4: Review**

- Display all entered information
- Allow edit before submission

**Business Rules:**

- Maximum financing = min(65% of property value, IDR 5B)
- Property valuation required (post-submission)
- Form data saved per step

---

### 3.3 AP Invoice Financing

**Product Code:** `AP_INVOICE_FINANCING`  
**Target:** Businesses (Corporate only)  
**Purpose:** Improve cash flow by financing accounts payable invoices  
**Financing Range:** IDR 500M – IDR 2B

**Eligibility Rules:**

- **MANDATORY:**
  - Based in Jabodetabek
  - Corporate only (PT/CV)
  - Minimum 2 years in operation
  - Must have positive financial report
  - Financing Range: IDR 500M – IDR 2B

**Application Form Structure (Multi-Step):**

**Step 1: Registration**

- User must be logged in
- User type must be BUSINESS

**Step 2: Company Info**

- **Company Information:**
  - Nama PT/CV (Company Name) - Required
  - Auto-validate: must be registered PT/CV

- **Eligibility Requirements Display:**
  - Based in Jabodetabek ✅
  - Corporate only (PT/CV) ✅
  - Minimum 2 years in operation ✅
  - Financing Range: IDR 500M – IDR 2B ✅
  - Must have positive financial report ✅

**Step 3: Documents**

- Google Drive URL - Required
- Required Documents Checklist:

  **A. Perusahaan:**
  - ✅ Akta Pendirian & Perubahan
  - ✅ SK Menkumham, NPWP PT
  - ✅ KTP & NPWP Pengurus
  - ✅ NIB & izin pendukung
  - ✅ Company Profile

  **B. Keuangan:**
  - ✅ Laporan Keuangan 2 Tahun + YTD
  - ✅ Mutasi Rekening 6 Bulan

  **C. Dokumen PO & Invoice:**
  - ✅ PO Customer (3 sample)
  - ✅ Invoice Customer (3 sample)
  - ✅ History invoice paid (3 sample)

  **D. Personal Guarantee:**
  - ✅ KTP + KTP Pasangan, KK
  - ✅ Akta Nikah

  **E. Lain-lain:**
  - ✅ List Supplier & Customer
  - ✅ Kontak Person (Email, No HP, PIC)

**Step 4: Review**

- Display all entered information
- Allow edit before submission

**Business Rules:**

- Only businesses can apply
- Must verify company registration
- Financial reports must be positive
- Minimum financing: IDR 500M
- Maximum financing: IDR 2B

---

### 3.4 AR Invoice Financing

**Product Code:** `AR_INVOICE_FINANCING`  
**Target:** Businesses (Corporate only)  
**Purpose:** Unlock working capital tied in accounts receivable  
**Financing Range:** IDR 300M – IDR 5B

**Eligibility Rules:**

- **MANDATORY:**
  - Based in Jabodetabek, Surabaya, or Bali
  - Corporate only (PT/CV)
  - Minimum 2 years in operation
  - Must have positive financial report
  - Financing Range: IDR 300M – IDR 5B

**Application Form Structure (Multi-Step):**

**Step 1: Registration**

- User must be logged in
- User type must be BUSINESS

**Step 2: Company Info**

- **Company Information:**
  - Nama PT/CV (Company Name) - Required

- **Eligibility Requirements Display:**
  - Based in Jabodetabek, Surabaya, or Bali ✅
  - Corporate only (PT/CV) ✅
  - Minimum 2 years in operation ✅
  - Financing Range: IDR 300M – IDR 5B ✅
  - Must have positive financial report ✅

**Step 3: Documents**

- Google Drive URL - Required
- Required Documents Checklist:
  - Same as AP Invoice Financing (A, B, C, D, E sections)

**Step 4: Review**

- Display all entered information
- Allow edit before submission

**Business Rules:**

- Only businesses can apply
- Location must be Jabodetabek, Surabaya, or Bali
- Minimum financing: IDR 300M
- Maximum financing: IDR 5B

---

### 3.5 Ecosystem Banking Solutions (Savlo+)

**Product Code:** `ECOSYSTEM_BANKING`  
**Target:** Businesses that struggle with standard financing eligibility  
**Account Type Required:** Savlo+ (Premium)

**Eligibility Rules:**

- **MANDATORY:**
  - Savlo+ membership required
  - Business entity (PT/CV)
  - Flexible eligibility (case-by-case assessment)
  - Typically for businesses that don't meet standard requirements

**RECOMMENDED Application Form Structure (Multi-Step):**

**Step 1: Registration**

- User must be logged in
- User must have Savlo+ account
- If not Savlo+, show upgrade prompt

**Step 2: Business Assessment**

- **Company Information:**
  - Nama PT/CV (Company Name) - Required
  - Tahun Berdiri (Year Established) - Required
  - Lokasi (Location) - Required
  - Industri (Industry) - Required, dropdown
  - Jumlah Karyawan (Number of Employees) - Required

- **Business Challenge:**
  - Alasan tidak memenuhi syarat standar (Reason for not meeting standard requirements) - Required, text area
  - Jenis pembiayaan yang dibutuhkan (Type of financing needed) - Required, dropdown
  - Jumlah dana yang dibutuhkan (Amount needed) - Required, numeric
  - Tujuan penggunaan dana (Purpose of funds) - Required, text area

- **Current Financial Status:**
  - Status laporan keuangan (Financial report status) - Required, dropdown: Positif | Negatif | Tidak Ada
  - Penjelasan kondisi keuangan (Financial condition explanation) - Required, text area

**Step 3: Documents**

- Google Drive URL - Required
- Required Documents Checklist:
  - ✅ Akta Pendirian & Perubahan
  - ✅ SK Menkumham, NPWP PT
  - ✅ KTP & NPWP Pengurus
  - ✅ Laporan Keuangan (jika ada)
  - ✅ Company Profile
  - ✅ Business Plan / Proposal
  - ✅ Dokumen pendukung lainnya (jika ada)

**Step 4: Consultation Request**

- Preferred consultation method - Required, dropdown: Online | Offline
- Preferred consultation date/time - Optional
- Additional notes - Optional, text area

**Step 5: Review**

- Display all entered information
- Show note: "Application will be reviewed by Savlo+ team for personalized solution"
- Submit button

**Business Rules:**

- Only Savlo+ members can apply
- Application triggers consultation request
- Personalized assessment by Savlo+ team
- No standard eligibility requirements (flexible)
- Unlimited consultation included

---

## 4. Application Workflow & Business Process

### 4.1 Application Submission Process

**Universal Flow (All Services):**

1. **User Authentication**
   - User must be logged in
   - If not logged in → redirect to login/register
   - After login → return to application form

2. **Eligibility Check**
   - System checks user eligibility for selected product
   - If not eligible → show error message with requirements
   - If eligible → proceed to form

3. **Multi-Step Form Completion**
   - Step 1: Registration (auto-completed if logged in)
   - Step 2: Product-specific information
   - Step 3: Document upload (Google Drive link)
   - Step 4: Review & Submit
   - **Auto-save:** Form data saved after each step
   - **Resume:** User can return to continue incomplete application

4. **Application Submission**
   - Generate unique Application ID (format: #[number])
   - Record submission timestamp
   - Set status to "Submitted"
   - Route to appropriate financing partner
   - Send confirmation to user

5. **Application Tracking**
   - User can view in "My Applications" dashboard
   - Status updates visible
   - Application details accessible

### 4.2 Application Status Lifecycle

**Status Enum:**

- `DRAFT` - Form started but not submitted
- `SUBMITTED` - Application received, pending review
- `UNDER_REVIEW` - Application being assessed by partner
- `DOCUMENT_REQUEST` - Additional documents required
- `APPROVED` - Application approved, awaiting disbursement
- `REJECTED` - Application not approved
- `DISBURSED` - Funds released to applicant
- `CLOSED` - Application process completed

**Status Transition Rules:**

- `DRAFT` → `SUBMITTED` (on form submission)
- `SUBMITTED` → `UNDER_REVIEW` (partner picks up application)
- `UNDER_REVIEW` → `DOCUMENT_REQUEST` (if docs missing)
- `UNDER_REVIEW` → `APPROVED` (if approved)
- `UNDER_REVIEW` → `REJECTED` (if rejected)
- `DOCUMENT_REQUEST` → `UNDER_REVIEW` (after doc submission)
- `APPROVED` → `DISBURSED` (funds released)
- `DISBURSED` → `CLOSED` (process complete)
- `REJECTED` → Final (cannot change)
- `CLOSED` → Final (cannot change)

**Business Rules:**

- Status can only move forward (no backward changes)
- Once "Rejected" or "Closed", status cannot change
- "Disbursed" is final status for successful applications
- User can view status but cannot modify

---

## 5. Data Models & Business Entities

### 5.1 User Entity

```typescript
interface User {
  id: string; // UUID
  email: string; // Unique, login credential
  password: string; // Hashed
  fullName: string;
  phoneNumber: string; // Unique
  userType: "INDIVIDUAL" | "BUSINESS";
  accountType: "SAVLO" | "SAVLO_PLUS";
  registrationDate: Date;
  lastLogin: Date;
  isActive: boolean;
}
```

**Business Rules:**

- Email must be unique
- Phone number must be unique
- Password must be hashed (never store plain text)
- Account type determines available products

### 5.2 Application Entity

```typescript
interface Application {
  id: string; // UUID
  applicationId: string; // Format: #[number], sequential, unique
  userId: string; // Foreign key to User
  productType:
    | "BPKB_FINANCING"
    | "PROPERTY_FINANCING"
    | "AP_INVOICE_FINANCING"
    | "AR_INVOICE_FINANCING"
    | "ECOSYSTEM_BANKING";
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "UNDER_REVIEW"
    | "DOCUMENT_REQUEST"
    | "APPROVED"
    | "REJECTED"
    | "DISBURSED"
    | "CLOSED";
  submissionDate: Date | null;
  currentStep: number; // 1-4, for multi-step forms
  formData: Record<string, any>; // Product-specific form data
  documentUrl: string | null; // Google Drive URL
  amountRequested: number | null;
  amountApproved: number | null;
  partnerId: string | null; // Financing partner handling application
  createdAt: Date;
  updatedAt: Date;
}
```

**Business Rules:**

- Application ID is sequential and unique (format: #1, #2, #3, ...)
- One application = one product type
- Application belongs to one user
- Form data stored as JSON for flexibility
- Document URL validated as Google Drive link

### 5.3 Product Entity

```typescript
interface Product {
  id: string;
  code: string; // BPKB_FINANCING, PROPERTY_FINANCING, etc.
  name: string;
  description: string;
  targetUserType: "INDIVIDUAL" | "BUSINESS" | "BOTH";
  accountTypeRequired: "SAVLO" | "SAVLO_PLUS" | "BOTH";
  minAmount: number | null;
  maxAmount: number | null;
  eligibilityRequirements: string[];
  requiredDocuments: string[];
  isActive: boolean;
}
```

### 5.4 Partner Entity

```typescript
interface Partner {
  id: string;
  name: string;
  type: "MULTI_FINANCE" | "FINTECH" | "SECRET_INSTITUTION";
  availableFor: "SAVLO" | "SAVLO_PLUS" | "BOTH";
  logoUrl: string | null;
  isActive: boolean;
}
```

---

## 6. Business Logic Modules

The application consists of the following business logic modules:

1. **Product Catalog Module** (`/docs/modules/product-catalog.md`)
   - Product eligibility rules
   - Product availability logic
   - Product filtering by user type

2. **Application Management Module** (`/docs/modules/application-management.md`)
   - Application creation rules
   - Multi-step form state management
   - Status transition logic
   - Application routing to partners
   - Application tracking

3. **User Management Module** (`/docs/modules/user-management.md`)
   - User registration rules
   - Authentication logic
   - Eligibility validation
   - Account type management
   - Session management

4. **Eligibility Engine Module** (`/docs/modules/eligibility-engine.md`)
   - Eligibility checking logic
   - Business vs Individual rules
   - Savlo vs Savlo+ rules
   - Product-specific eligibility validation
   - Location-based eligibility (Jabodetabek, Surabaya, Bali)

5. **Form Validation Module** (`/docs/modules/form-validation.md`)
   - Field validation rules per product
   - Google Drive URL validation
   - Document checklist validation
   - Data format validation

6. **Partner Routing Module** (`/docs/modules/partner-routing.md`)
   - Partner selection logic
   - Application distribution rules
   - Partner availability rules
   - Savlo vs Savlo+ partner routing

7. **Internationalization Module** (`/docs/modules/internationalization.md`)
   - Language detection and selection
   - Translation management
   - Language preference persistence
   - Content localization rules

---

## 7. Document Management

### 7.1 Document Upload Method

**Current Implementation:** Google Drive Link

**Business Rules:**

- User provides Google Drive folder link
- Link must have viewing permissions enabled ("Anyone with the link")
- System validates link format
- Documents stored externally (not in Savlo system)
- Each application has one document link

**Required Documents per Product:**

- See product specifications above

### 7.2 Document Validation

**Validation Rules:**

- Google Drive URL format validation
- Link accessibility check (if possible)
- Document checklist completion
- User must confirm all documents uploaded

---

## 8. Navigation & Page Structure

### 8.1 Required Pages

1. **Landing Page** (`/`)
   - Hero section
   - 5 services showcase
   - Plan comparison (Savlo vs Savlo+)
   - Trusted partners

2. **Login Page** (`/login`)
   - Email/Password login
   - Link to register

3. **Register Page** (`/register`)
   - User registration form
   - User type selection (Individual/Business)
   - Account type selection (Savlo/Savlo+)

4. **My Applications** (`/my-applications`)
   - Protected route (requires login)
   - List of user's applications
   - Application status
   - Continue incomplete applications

5. **Application Forms** (5 separate pages):
   - `/apply/bpkb-financing`
   - `/apply/property-financing`
   - `/apply/ap-invoice-financing`
   - `/apply/ar-invoice-financing`
   - `/apply/ecosystem-banking`
   - All protected routes (require login)

6. **Help Center** (`/help-center`)
   - FAQ sections
   - Application guide
   - Contact support

### 8.2 Navigation Structure

**Header Navigation:**

- Home
- My Applications (shown if logged in)
- Help Center
- Login (shown if not logged in)
- Register (shown if not logged in)
- Language Switcher (EN | ID)
- User Menu (shown if logged in):
  - Welcome, [username]!
  - Logout

**Footer:**

- © Savlo 2024-2025. All rights reserved.
- Terms of Service
- Privacy Policy

---

## 9. Internationalization (i18n) & Bilingual Support

### 9.1 Language Configuration

**Supported Languages:**

- **Default Language:** English (en)
- **Secondary Language:** Indonesian (id)

**Language Codes:**

- `en` - English
- `id` - Indonesian (Bahasa Indonesia)

### 9.2 Language Selection & Persistence

**Language Switcher:**

- Language selector in header navigation
- Dropdown or toggle button: `EN` | `ID`
- Current language highlighted/active

**Language Persistence:**

- Store language preference in:
  1. **User Account** (if logged in) - saved to user profile
  2. **Local Storage** (if not logged in) - browser local storage
  3. **URL Parameter** (optional) - `/en/` or `/id/` prefix
  4. **Cookie** (fallback) - if local storage not available

**Default Behavior:**

- First visit: Default to English (en)
- If user has saved preference: Use saved preference
- If browser language is Indonesian: Suggest Indonesian (optional)

### 9.3 URL Structure

**Option 1: URL Prefix (Recommended)**

```
/en/                    - Landing page (English)
/id/                    - Landing page (Indonesian)
/en/login               - Login (English)
/id/login               - Login (Indonesian)
/en/apply/bpkb-financing - Application form (English)
/id/apply/bpkb-financing - Application form (Indonesian)
```

**Option 2: Query Parameter**

```
/?lang=en
/?lang=id
/login?lang=en
```

**Recommendation:** Use URL prefix for better SEO and user experience

### 9.4 Content Translation Requirements

**All Content Must Be Translated:**

1. **Static Content:**
   - Navigation menu items
   - Page titles and headings
   - Button labels
   - Form labels and placeholders
   - Error messages
   - Success messages
   - Footer content

2. **Dynamic Content:**
   - Product descriptions
   - Eligibility requirements
   - Form field labels
   - Status messages
   - Application status labels
   - Help center content
   - FAQ content

3. **Form-Specific Content:**
   - All form fields and labels
   - Validation messages
   - Document checklist items
   - Tips and instructions
   - Step indicators

4. **User Interface:**
   - Welcome messages
   - Dashboard labels
   - Application list headers
   - Status badges

### 9.5 Translation Keys Structure

**Naming Convention:**

```
namespace:key
```

**Examples:**

```
common:nav.home
common:nav.myApplications
common:nav.helpCenter
common:button.submit
common:button.cancel
common:button.next
common:button.back

product:bpkb.title
product:bpkb.description
product:property.title
product:property.description

form:bpkb.step1.title
form:bpkb.step2.dataDiri
form:bpkb.step2.namaLengkap
form:bpkb.step2.noKtp
form:bpkb.validation.required
form:bpkb.validation.invalidFormat

application:status.submitted
application:status.underReview
application:status.approved
application:status.rejected

help:faq.title
help:faq.general
help:faq.bpkb
```

### 9.6 Business Rules for Bilingual Support

**Language-Specific Rules:**

1. **Form Data:**
   - Form input values: User can input in any language
   - Form labels: Always in selected language
   - Validation messages: In selected language
   - Document names: Can be in any language

2. **Application Data:**
   - Application data stored in original language (user input)
   - Application display: Labels in selected language, data in original
   - Application ID: Language-independent (format: #[number])

3. **User Preferences:**
   - Language preference saved per user
   - If user changes language, preference updated
   - Language preference persists across sessions

4. **Content Consistency:**
   - All pages must support both languages
   - No mixed languages on same page
   - Consistent terminology across translations

### 9.7 Special Considerations

**Indonesian-Specific Content:**

1. **Form Fields:**
   - Some fields are inherently Indonesian:
     - No. KTP (Indonesian ID number)
     - Kelurahan, Kecamatan (Indonesian administrative divisions)
     - SHM/SHGB (Indonesian property certificates)
   - These terms should remain in Indonesian even in English version
   - Add English explanation/translation in parentheses

2. **Currency:**
   - Always display IDR (Indonesian Rupiah)
   - Format: IDR 5,000,000,000 or IDR 5B
   - Language-independent

3. **Dates:**
   - Format: DD/MM/YYYY (Indonesian format)
   - Or use locale-aware formatting

4. **Phone Numbers:**
   - Indonesian format: +62 XXX XXXX XXXX
   - Validation rules apply regardless of language

### 9.8 Translation File Structure

**Recommended Structure:**

```
/locales
  /en
    common.json
    products.json
    forms.json
    applications.json
    help.json
    errors.json
  /id
    common.json
    products.json
    forms.json
    applications.json
    help.json
    errors.json
```

**Example Translation File (common.json):**

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

**Indonesian Version (common.json):**

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

### 9.9 Implementation Requirements

**Technical Implementation:**

- Use i18n library (e.g., next-intl, react-i18next, or next-i18next)
- Language context/provider for app-wide language state
- Language switcher component
- Translation hook/function for components
- Language detection on first visit
- Language persistence mechanism

**Component Structure:**

```typescript
// Language switcher component
<LanguageSwitcher />

// Usage in components
const t = useTranslation();
<h1>{t('common:nav.home')}</h1>
```

### 9.10 Testing Requirements

**Bilingual Testing Checklist:**

- [ ] All pages display correctly in both languages
- [ ] Language switcher works on all pages
- [ ] Language preference persists after page refresh
- [ ] Language preference persists after login/logout
- [ ] Form validation messages in correct language
- [ ] Application data displays correctly
- [ ] URLs update correctly when language changes
- [ ] No mixed languages on same page
- [ ] All text is translated (no hardcoded strings)
- [ ] Indonesian-specific terms properly handled

---

## 10. Recommendations

### 10.1 Ecosystem Banking Solutions Form

**Recommendation:** Implement comprehensive assessment form as outlined in Section 3.5

**Rationale:**

- Savlo+ is premium service, needs detailed assessment
- Flexible eligibility requires more information
- Consultation request integrated in form
- Personalized solution requires comprehensive data

### 10.2 Dashboard Enhancement

**Current:** Basic application list  
**Recommended:** Add filters, search, and status badges

### 10.3 Form Auto-Save

**Critical:** Implement auto-save for multi-step forms to prevent data loss

### 10.4 Application ID Format

**Format:** `#[number]` (e.g., #36, #35, #34)  
**Implementation:** Sequential, unique, per user or global (recommend global for uniqueness)

---

## 11. Out of Scope

The following features are explicitly **NOT** included:

- Payment processing
- Real-time chat
- Email notifications (backend)
- Document storage (uses Google Drive)
- Backend API integration (frontend recreation only)
- Mobile applications (iOS/Android)

---

## Document History

| Version | Date       | Author  | Changes                                                           |
| ------- | ---------- | ------- | ----------------------------------------------------------------- |
| 2.1     | 2025-01-27 | Update  | Added bilingual support (EN/ID) with i18n requirements            |
| 2.0     | 2025-01-27 | Initial | Complete rewrite with detailed form structures and business logic |
| 1.0     | 2025-01-27 | Initial | Initial PRD                                                       |
