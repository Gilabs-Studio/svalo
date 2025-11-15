# Application Management Module PRD

## Business Logic & Rules

**Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Overview

The Application Management Module handles the complete lifecycle of financing applications, from creation through submission to tracking. It manages multi-step form state, application status transitions, routing to partners, and application tracking.

---

## 2. Application Entity Model

### 2.1 Application Data Structure

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
  currentStep: number; // 1-4 or 1-5, for multi-step forms
  formData: Record<string, any>; // Product-specific form data
  documentUrl: string | null; // Google Drive URL
  amountRequested: number | null;
  amountApproved: number | null;
  partnerId: string | null; // Financing partner handling application
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 Application ID Generation

**Format:** `#[number]` (e.g., #36, #35, #34)

**Business Rules:**

- Sequential numbering (global, not per user)
- Unique across all applications
- Generated upon first submission (not on draft creation)
- Format: `#` + sequential number

**Implementation:**

```typescript
function generateApplicationId(): string {
  const lastApplication = getLastApplication();
  const nextNumber = (lastApplication?.number || 0) + 1;
  return `#${nextNumber}`;
}
```

---

## 3. Multi-Step Form Management

### 3.1 Form Steps Structure

**All Products Follow Same Step Pattern:**

**Step 1: Registration**

- Auto-completed if user is logged in
- If not logged in, redirect to login/register
- After login, return to form

**Step 2: Product-Specific Information**

- BPKB: BPKB Info (Data Diri, Data Kendaraan, Informasi Pinjaman)
- Property: Property Info (Data Diri, Informasi Properti & Pinjaman)
- AP Invoice: Company Info
- AR Invoice: Company Info
- Ecosystem Banking: Business Assessment

**Step 3: Documents**

- Google Drive URL input
- Required documents checklist
- Tips/instructions

**Step 4: Review**

- Display all entered information
- Allow edit before submission
- Submit button

**Step 5: (Ecosystem Banking Only) Consultation Request**

- Preferred consultation method
- Preferred date/time
- Additional notes

### 3.2 Form State Management

**State Structure:**

```typescript
interface FormState {
  currentStep: number;
  completedSteps: number[];
  formData: {
    step1?: RegistrationData;
    step2?: ProductSpecificData;
    step3?: DocumentData;
    step4?: ReviewData;
    step5?: ConsultationData; // Ecosystem Banking only
  };
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
}
```

**Business Rules:**

- Form data auto-saved after each step
- User can navigate back to previous steps
- User can leave and return to continue later
- Validation occurs on step transition
- Cannot proceed to next step if current step invalid

### 3.3 Auto-Save Logic

**Auto-Save Triggers:**

1. On step completion (moving to next step)
2. On field blur (after user finishes editing)
3. On page unload (before user leaves)
4. Periodically (every 30 seconds while editing)

**Auto-Save Implementation:**

```typescript
function autoSaveForm(applicationId: string, formData: FormData): void {
  // Save to database as DRAFT status
  updateApplication(applicationId, {
    status: "DRAFT",
    formData: formData,
    currentStep: currentStep,
    updatedAt: new Date(),
  });
}
```

**Business Rules:**

- Draft applications saved with status `DRAFT`
- User can resume from last completed step
- Draft applications visible in "My Applications" with "Continue" button

---

## 4. Application Submission Process

### 4.1 Submission Workflow

**Step-by-Step Process:**

1. **Validation Check**
   - Validate all required fields
   - Validate Google Drive URL format
   - Validate document checklist completion
   - If validation fails, show errors and prevent submission

2. **Generate Application ID**
   - Generate unique sequential Application ID
   - Format: `#[number]`

3. **Create Application Record**
   - Set status to `SUBMITTED`
   - Record submission timestamp
   - Store all form data
   - Store document URL
   - Link to user account

4. **Route to Partner**
   - Determine appropriate financing partner
   - Assign partner to application
   - Send notification to partner (if applicable)

5. **User Confirmation**
   - Show success message
   - Display Application ID
   - Redirect to "My Applications" page
   - Send confirmation (if applicable)

### 4.2 Submission Validation

**Required Validations:**

**All Products:**

- User must be logged in
- All required fields must be filled
- Google Drive URL must be valid format
- Google Drive URL must have viewing permissions
- All required documents must be checked

**Product-Specific Validations:**

- See Form Validation Module for detailed rules

**Business Rules:**

- Cannot submit if any validation fails
- Show specific error messages for each validation failure
- Highlight fields with errors

---

## 5. Application Status Lifecycle

### 5.1 Status Definitions

**Status Enum:**

- `DRAFT` - Form started but not submitted
- `SUBMITTED` - Application received, pending review
- `UNDER_REVIEW` - Application being assessed by partner
- `DOCUMENT_REQUEST` - Additional documents required
- `APPROVED` - Application approved, awaiting disbursement
- `REJECTED` - Application not approved
- `DISBURSED` - Funds released to applicant
- `CLOSED` - Application process completed

### 5.2 Status Transition Rules

**Valid Transitions:**

```
DRAFT → SUBMITTED (on form submission)
SUBMITTED → UNDER_REVIEW (partner picks up application)
UNDER_REVIEW → DOCUMENT_REQUEST (if docs missing)
UNDER_REVIEW → APPROVED (if approved)
UNDER_REVIEW → REJECTED (if rejected)
DOCUMENT_REQUEST → UNDER_REVIEW (after doc submission)
APPROVED → DISBURSED (funds released)
DISBURSED → CLOSED (process complete)
REJECTED → (Final - cannot change)
CLOSED → (Final - cannot change)
```

**Business Rules:**

- Status can only move forward (no backward changes)
- Once "Rejected" or "Closed", status cannot change
- "Disbursed" is final status for successful applications
- User can view status but cannot modify
- Status changes triggered by partner/admin actions

### 5.3 Status Display Logic

**Status Badge Colors:**

- `DRAFT`: Gray - "Draft"
- `SUBMITTED`: Blue - "Submitted"
- `UNDER_REVIEW`: Yellow - "Under Review"
- `DOCUMENT_REQUEST`: Orange - "Document Request"
- `APPROVED`: Green - "Approved"
- `REJECTED`: Red - "Rejected"
- `DISBURSED`: Green - "Disbursed"
- `CLOSED`: Gray - "Closed"

---

## 6. Application Tracking

### 6.1 My Applications Dashboard

**Display Logic:**

- Show all user's applications
- Sort by: Most recent first (default)
- Filter by: Product type, Status
- Search by: Application ID

**Application Card Display:**

- Application ID (format: #[number])
- Product Type (e.g., "BPKB-based Financing")
- Submission Date
- Status (with badge)
- "View Details" button
- "Continue" button (if status is DRAFT)

### 6.2 Application Details View

**Information Display:**

- Application ID
- Product Type
- Status
- Submission Date
- All form data (read-only)
- Document URL (link)
- Amount Requested
- Amount Approved (if available)
- Partner Name (if assigned)
- Status History (if available)

**Actions Available:**

- View details (always)
- Continue application (if DRAFT)
- Download/View documents (if submitted)
- Contact support (if needed)

---

## 7. Application Routing to Partners

### 7.1 Partner Selection Logic

**Routing Rules:**

**For Savlo (Free Tier) Products:**

- BPKB Financing → Multi-finance institutions
- Property Financing → Multi-finance institutions
- AP Invoice Financing → Fintech lenders
- AR Invoice Financing → Fintech lenders

**For Savlo+ (Premium Tier) Products:**

- Ecosystem Banking → Secret Financial Institutions

**Business Rules:**

- Partner assigned upon submission
- Partner selection based on:
  - Product type
  - User account type (Savlo vs Savlo+)
  - Partner availability
  - Partner capacity

### 7.2 Partner Assignment

**Assignment Process:**

1. Determine product category
2. Filter available partners for product
3. Filter by account type (Savlo vs Savlo+)
4. Select partner (round-robin or based on capacity)
5. Assign partner to application
6. Update application with partner ID

---

## 8. Application Data Persistence

### 8.1 Draft Management

**Draft Storage:**

- Drafts stored in database with status `DRAFT`
- Drafts associated with user account
- Drafts can be resumed anytime
- Drafts expire after 30 days of inactivity (optional)

**Draft Retrieval:**

- User can see drafts in "My Applications"
- Drafts marked with "Continue" button
- Clicking "Continue" resumes from last completed step

### 8.2 Submitted Application Storage

**Storage Rules:**

- All form data stored as JSON
- Document URL stored separately
- Application ID generated and stored
- Submission timestamp recorded
- Status set to `SUBMITTED`
- Data immutable after submission (read-only)

---

## 9. Application Form Product-Specific Logic

### 9.1 BPKB Financing Form

**Step 2: BPKB Info**

**Data Diri (Personal Data):**

- Nama Lengkap (Full Name) - Required, text
- No. KTP (ID Number) - Required, format: 16 digits
- No. HP (Phone Number) - Required, format: +62 XXX XXXX XXXX
- Usia Konsumen (Age) - Required, numeric, >= 21
- Alamat Survey (Survey Address) - Required, text
- Kelurahan (Sub-district) - Required, text
- Kecamatan (District) - Required, text

**Data Kendaraan (Vehicle Data):**

- Jenis Kendaraan (Vehicle Type) - Required, dropdown: Motor | Mobil
- Merk Kendaraan (Brand) - Required, text
- Tipe Kendaraan (Model) - Required, text
- Tahun Kendaraan (Year) - Required, numeric, >= 2000, <= current year
- No. Plat Kendaraan (License Plate) - Required, format validation
- Atas Nama Kendaraan (Registered Owner) - Required, text
- Status Kendaraan (Vehicle Status) - Required, dropdown: Pribadi | Perusahaan
- Status BPKB (BPKB Status) - Required, dropdown: Asli | Copy
- Status Pajak (Tax Status) - Required, dropdown: Lunas | Belum Lunas
- Asuransi Kendaraan (Insurance) - Required, dropdown: Ada | Tidak Ada

**Informasi Pinjaman (Loan Information):**

- Jumlah Pinjaman (Loan Amount) - Required, numeric, min: 10,000,000
- Tenor Pelunasan (Repayment Tenor) - Required, dropdown: 12 | 24 | 36 | 48 | 60 months

**Step 3: Documents**

- Google Drive URL - Required, URL validation
- Required Documents:
  - Foto KTP
  - Foto BPKB
  - Foto STNK
  - Foto Kendaraan (Depan)
  - Foto Kendaraan (Belakang)
  - Foto Kendaraan (Kanan)
  - Foto Kendaraan (Kiri)

### 9.2 Property Financing Form

**Step 2: Property Info**

**Data Diri (Personal Data):**

- Nama Konsumen (Consumer Name) - Required, text
- No. HP (Phone Number) - Required, format: +62 XXX XXXX XXXX
- Alamat Properti (Property Address) - Required, text
- Alamat Lengkap (Full Address) - Required, text
- Kecamatan (District) - Required, text
- Kota (City) - Required, text

**Informasi Properti & Pinjaman:**

- Jenis Sertifikat (Certificate Type) - Required, dropdown: SHM | SHGB
- Dana Dibutuhkan (Funds Needed) - Required, numeric, max: 5,000,000,000
- Kemampuan Angsuran / Bulan (Monthly Payment Capacity) - Required, numeric
- Siap Di-survey? (Ready for Survey) - Required, dropdown: Ya | Tidak
- Tanggal Pengajuan (Application Date) - Auto-filled, current date
- Tanggal Submission (Submission Date) - Auto-filled on submit

**Step 3: Documents**

- Google Drive URL - Required, URL validation
- Required Documents:
  - Foto KTP
  - Sertifikat Properti (SHM/SHGB)
  - IMB (Izin Mendirikan Bangunan)
  - PBB (Pajak Bumi dan Bangunan) Terbaru
  - Bukti Rekening Listrik/Air

### 9.3 AP Invoice Financing Form

**Step 2: Company Info**

- Nama PT/CV (Company Name) - Required, text
- Eligibility Requirements Display (read-only)

**Step 3: Documents**

- Google Drive URL - Required, URL validation
- Required Documents (5 sections):
  - A. Perusahaan (Company documents)
  - B. Keuangan (Financial documents)
  - C. Dokumen PO & Invoice
  - D. Personal Guarantee
  - E. Lain-lain (Others)

### 9.4 AR Invoice Financing Form

**Step 2: Company Info**

- Nama PT/CV (Company Name) - Required, text
- Eligibility Requirements Display (read-only)

**Step 3: Documents**

- Google Drive URL - Required, URL validation
- Required Documents (same as AP Invoice - 5 sections)

### 9.5 Ecosystem Banking Form

**Step 2: Business Assessment**

- Company Information fields
- Business Challenge fields
- Current Financial Status fields

**Step 3: Documents**

- Google Drive URL - Required, URL validation
- Required Documents (comprehensive list)

**Step 5: Consultation Request**

- Preferred consultation method - Required, dropdown: Online | Offline
- Preferred consultation date/time - Optional
- Additional notes - Optional, text area

---

## 10. Error Handling

### 10.1 Form Validation Errors

**Error Display:**

- Show errors below each field
- Highlight fields with errors
- Prevent step progression if errors exist
- Show summary of errors on review step

### 10.2 Submission Errors

**Error Scenarios:**

- Network error → Retry submission
- Validation error → Return to form with errors
- Server error → Show error message, allow retry

### 10.3 Application Not Found

**Scenario:** User tries to access non-existent application

**Response:**

- Show error: "Application not found"
- Redirect to "My Applications"

---

## 11. Business Rules Summary

### 11.1 Application Creation Rules

1. User must be logged in
2. Product must be available for user
3. User must meet eligibility requirements
4. One application per product type at a time (optional rule)

### 11.2 Application Submission Rules

1. All required fields must be filled
2. All validations must pass
3. Google Drive URL must be valid
4. All required documents must be checked
5. Application ID generated on submission

### 11.3 Application Viewing Rules

1. User can only view their own applications
2. Application data is read-only after submission
3. Draft applications can be edited
4. Submitted applications cannot be modified

---

## 12. Testing Requirements

**Test Cases:**

- [ ] Draft creation and auto-save works
- [ ] Form step navigation works correctly
- [ ] Validation prevents invalid submissions
- [ ] Application ID generated correctly
- [ ] Status transitions work as expected
- [ ] Application routing to partners works
- [ ] "My Applications" displays correctly
- [ ] Application details view works
- [ ] Draft resume functionality works
- [ ] Error handling works for all scenarios

---

## Document History

| Version | Date       | Author  | Changes                                   |
| ------- | ---------- | ------- | ----------------------------------------- |
| 1.0     | 2025-01-27 | Initial | Created Application Management Module PRD |
