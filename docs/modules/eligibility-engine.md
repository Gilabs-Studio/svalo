# Eligibility Engine Module PRD

## Business Logic & Rules

**Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Overview

The Eligibility Engine Module determines whether a user is eligible for a specific financing product. It checks user type, account type, location, business requirements, and product-specific eligibility criteria.

---

## 2. Eligibility Check Structure

### 2.1 Eligibility Check Flow

```
1. Check User Authentication
   ↓
2. Check Product Availability
   ↓
3. Check User Type Match
   ↓
4. Check Account Type Requirement
   ↓
5. Check Location Requirements
   ↓
6. Check Product-Specific Eligibility
   ↓
7. Return Eligibility Result
```

---

## 3. Eligibility Rules by Product

### 3.1 BPKB-based Financing Eligibility

**User Type:** `INDIVIDUAL` only

**Account Type:** `SAVLO` or `SAVLO_PLUS` (both allowed)

**Location:** No restriction

**Product-Specific Requirements:**

- Must own vehicle with valid BPKB
- BPKB must be in applicant's name
- Vehicle must be fully paid (no existing financing)
- Vehicle must have valid STNK
- Vehicle must have insurance (recommended, not mandatory)

**Eligibility Check:**

```typescript
function checkBPKBEligibility(
  user: User,
  formData: BPKBFormData,
): EligibilityResult {
  // Check user type
  if (user.userType !== "INDIVIDUAL") {
    return { eligible: false, reason: "BPKB financing hanya untuk individu" };
  }

  // Check BPKB ownership (from form data)
  if (!formData.bpkbInName) {
    return { eligible: false, reason: "BPKB harus atas nama pemohon" };
  }

  // Check vehicle status
  if (formData.vehicleStatus === "Masih Kredit") {
    return { eligible: false, reason: "Kendaraan harus sudah lunas" };
  }

  return { eligible: true };
}
```

---

### 3.2 Property-based Financing Eligibility

**User Type:** `INDIVIDUAL` only

**Account Type:** `SAVLO` or `SAVLO_PLUS` (both allowed)

**Location:** Jabodetabek only

**Product-Specific Requirements:**

- Must own property with valid certificate (SHM or SHGB)
- Property must be in Jabodetabek area
- Property must have valid IMB
- Property must have valid PBB
- Property must have utility bills (electricity/water)

**Eligibility Check:**

```typescript
function checkPropertyEligibility(
  user: User,
  location: string,
  formData: PropertyFormData,
): EligibilityResult {
  // Check user type
  if (user.userType !== "INDIVIDUAL") {
    return {
      eligible: false,
      reason: "Property financing hanya untuk individu",
    };
  }

  // Check location
  if (!isJabodetabek(location)) {
    return {
      eligible: false,
      reason: "Property harus berada di area Jabodetabek",
    };
  }

  // Check certificate type
  if (!["SHM", "SHGB"].includes(formData.certificateType)) {
    return { eligible: false, reason: "Sertifikat harus SHM atau SHGB" };
  }

  return { eligible: true };
}
```

**Location Check:**

```typescript
function isJabodetabek(location: string): boolean {
  const jabodetabekCities = [
    "Jakarta",
    "Jakarta Pusat",
    "Jakarta Utara",
    "Jakarta Selatan",
    "Jakarta Barat",
    "Jakarta Timur",
    "Bogor",
    "Depok",
    "Tangerang",
    "Bekasi",
    "South Tangerang",
    "Tangerang Selatan",
  ];

  return jabodetabekCities.some((city) =>
    location.toLowerCase().includes(city.toLowerCase()),
  );
}
```

---

### 3.3 AP Invoice Financing Eligibility

**User Type:** `BUSINESS` only

**Account Type:** `SAVLO` or `SAVLO_PLUS` (both allowed)

**Location:** Jabodetabek only

**Product-Specific Requirements:**

- Must be corporate entity (PT or CV)
- Must be based in Jabodetabek
- Minimum 2 years in operation
- Must have positive financial report
- Financing range: IDR 500M – IDR 2B

**Eligibility Check:**

```typescript
function checkAPInvoiceEligibility(
  user: User,
  location: string,
  companyData: CompanyData,
): EligibilityResult {
  // Check user type
  if (user.userType !== "BUSINESS") {
    return {
      eligible: false,
      reason: "AP Invoice financing hanya untuk perusahaan",
    };
  }

  // Check company type
  if (!isCorporateEntity(companyData.companyName)) {
    return {
      eligible: false,
      reason: "Harus perusahaan berbadan hukum (PT/CV)",
    };
  }

  // Check location
  if (!isJabodetabek(location)) {
    return {
      eligible: false,
      reason: "Perusahaan harus berada di area Jabodetabek",
    };
  }

  // Check years in operation
  if (companyData.yearsInOperation < 2) {
    return {
      eligible: false,
      reason: "Perusahaan harus beroperasi minimal 2 tahun",
    };
  }

  // Check financial report
  if (companyData.financialReportStatus !== "POSITIF") {
    return { eligible: false, reason: "Laporan keuangan harus positif" };
  }

  // Check financing range
  if (
    companyData.requestedAmount < 500000000 ||
    companyData.requestedAmount > 2000000000
  ) {
    return {
      eligible: false,
      reason: "Jumlah pembiayaan harus antara IDR 500M - IDR 2B",
    };
  }

  return { eligible: true };
}
```

**Company Type Check:**

```typescript
function isCorporateEntity(companyName: string): boolean {
  const name = companyName.toUpperCase();
  return name.includes("PT") || name.includes("CV");
}
```

---

### 3.4 AR Invoice Financing Eligibility

**User Type:** `BUSINESS` only

**Account Type:** `SAVLO` or `SAVLO_PLUS` (both allowed)

**Location:** Jabodetabek, Surabaya, or Bali

**Product-Specific Requirements:**

- Must be corporate entity (PT or CV)
- Must be based in Jabodetabek, Surabaya, or Bali
- Minimum 2 years in operation
- Must have positive financial report
- Financing range: IDR 300M – IDR 5B

**Eligibility Check:**

```typescript
function checkARInvoiceEligibility(
  user: User,
  location: string,
  companyData: CompanyData,
): EligibilityResult {
  // Check user type
  if (user.userType !== "BUSINESS") {
    return {
      eligible: false,
      reason: "AR Invoice financing hanya untuk perusahaan",
    };
  }

  // Check company type
  if (!isCorporateEntity(companyData.companyName)) {
    return {
      eligible: false,
      reason: "Harus perusahaan berbadan hukum (PT/CV)",
    };
  }

  // Check location
  if (!isAllowedLocation(location)) {
    return {
      eligible: false,
      reason: "Perusahaan harus berada di Jabodetabek, Surabaya, atau Bali",
    };
  }

  // Check years in operation
  if (companyData.yearsInOperation < 2) {
    return {
      eligible: false,
      reason: "Perusahaan harus beroperasi minimal 2 tahun",
    };
  }

  // Check financial report
  if (companyData.financialReportStatus !== "POSITIF") {
    return { eligible: false, reason: "Laporan keuangan harus positif" };
  }

  // Check financing range
  if (
    companyData.requestedAmount < 300000000 ||
    companyData.requestedAmount > 5000000000
  ) {
    return {
      eligible: false,
      reason: "Jumlah pembiayaan harus antara IDR 300M - IDR 5B",
    };
  }

  return { eligible: true };
}
```

**Location Check:**

```typescript
function isAllowedLocation(location: string): boolean {
  const allowedLocations = [
    // Jabodetabek
    "Jakarta",
    "Bogor",
    "Depok",
    "Tangerang",
    "Bekasi",
    // Surabaya
    "Surabaya",
    // Bali
    "Bali",
    "Denpasar",
  ];

  return allowedLocations.some((city) =>
    location.toLowerCase().includes(city.toLowerCase()),
  );
}
```

---

### 3.5 Ecosystem Banking Solutions Eligibility

**User Type:** `BUSINESS` only

**Account Type:** `SAVLO_PLUS` only (premium required)

**Location:** No restriction

**Product-Specific Requirements:**

- Must be corporate entity (PT or CV)
- Must have Savlo+ membership
- Flexible eligibility (case-by-case assessment)
- Designed for businesses that don't meet standard requirements

**Eligibility Check:**

```typescript
function checkEcosystemBankingEligibility(
  user: User,
  companyData: CompanyData,
): EligibilityResult {
  // Check user type
  if (user.userType !== "BUSINESS") {
    return {
      eligible: false,
      reason: "Ecosystem Banking hanya untuk perusahaan",
    };
  }

  // Check account type (MANDATORY)
  if (user.accountType !== "SAVLO_PLUS") {
    return {
      eligible: false,
      reason: "Ecosystem Banking memerlukan keanggotaan Savlo+",
      action: "UPGRADE_TO_SAVLO_PLUS",
    };
  }

  // Check company type
  if (!isCorporateEntity(companyData.companyName)) {
    return {
      eligible: false,
      reason: "Harus perusahaan berbadan hukum (PT/CV)",
    };
  }

  // Flexible eligibility - no strict requirements
  // Assessment will be done by Savlo+ team
  return { eligible: true, requiresAssessment: true };
}
```

---

## 4. Eligibility Check Functions

### 4.1 Main Eligibility Check Function

```typescript
function checkEligibility(
  productCode: ProductCode,
  user: User,
  location: string,
  formData: any,
): EligibilityResult {
  switch (productCode) {
    case "BPKB_FINANCING":
      return checkBPKBEligibility(user, formData);

    case "PROPERTY_FINANCING":
      return checkPropertyEligibility(user, location, formData);

    case "AP_INVOICE_FINANCING":
      return checkAPInvoiceEligibility(user, location, formData);

    case "AR_INVOICE_FINANCING":
      return checkARInvoiceEligibility(user, location, formData);

    case "ECOSYSTEM_BANKING":
      return checkEcosystemBankingEligibility(user, formData);

    default:
      return { eligible: false, reason: "Product tidak ditemukan" };
  }
}
```

### 4.2 Eligibility Result Structure

```typescript
interface EligibilityResult {
  eligible: boolean;
  reason?: string; // Error message if not eligible
  action?: string; // Suggested action (e.g., 'UPGRADE_TO_SAVLO_PLUS')
  requiresAssessment?: boolean; // For Ecosystem Banking
  missingRequirements?: string[]; // List of missing requirements
}
```

---

## 5. Location Validation

### 5.1 Location Check Functions

**Jabodetabek Check:**

```typescript
function isJabodetabek(location: string): boolean {
  const jabodetabek = [
    "Jakarta",
    "Jakarta Pusat",
    "Jakarta Utara",
    "Jakarta Selatan",
    "Jakarta Barat",
    "Jakarta Timur",
    "Bogor",
    "Depok",
    "Tangerang",
    "Bekasi",
    "South Tangerang",
    "Tangerang Selatan",
    "Tangerang Selatan",
  ];

  const locationLower = location.toLowerCase();
  return jabodetabek.some((city) => locationLower.includes(city.toLowerCase()));
}
```

**Jabodetabek, Surabaya, or Bali Check:**

```typescript
function isAllowedLocation(location: string): boolean {
  const allowed = [
    // Jabodetabek
    "Jakarta",
    "Bogor",
    "Depok",
    "Tangerang",
    "Bekasi",
    // Surabaya
    "Surabaya",
    // Bali
    "Bali",
    "Denpasar",
    "Badung",
    "Gianyar",
    "Tabanan",
  ];

  const locationLower = location.toLowerCase();
  return allowed.some((city) => locationLower.includes(city.toLowerCase()));
}
```

---

## 6. Business Rules

### 6.1 User Type Rules

**Individual Users Can Access:**

- BPKB-based Financing
- Property-based Financing

**Business Users Can Access:**

- AP Invoice Financing
- AR Invoice Financing
- Ecosystem Banking Solutions (if Savlo+)

### 6.2 Account Type Rules

**Savlo (Free Tier) Users:**

- Can access: BPKB, Property, AP Invoice, AR Invoice
- Cannot access: Ecosystem Banking

**Savlo+ (Premium Tier) Users:**

- Can access: All products including Ecosystem Banking

### 6.3 Location Rules

**No Location Restriction:**

- BPKB-based Financing
- Ecosystem Banking Solutions

**Jabodetabek Only:**

- Property-based Financing
- AP Invoice Financing

**Jabodetabek, Surabaya, or Bali:**

- AR Invoice Financing

---

## 7. Eligibility Display Logic

### 7.1 Eligibility Requirements Display

**For Each Product, Show:**

- User type requirement
- Account type requirement
- Location requirement
- Product-specific requirements
- Financing range (if applicable)

**Example Display (AP Invoice):**

```
Eligibility Requirements:
✅ Based in Jabodetabek
✅ Corporate only (PT/CV)
✅ Minimum 2 years in operation
✅ Financing Range: IDR 500M – IDR 2B
✅ Must have positive financial report
```

### 7.2 Eligibility Error Messages

**Error Message Structure:**

- Clear and specific
- In user's selected language (EN/ID)
- Actionable (tell user what to do)
- Suggest alternatives if applicable

**Error Message Examples:**

- "BPKB financing hanya untuk individu" / "BPKB financing is only for individuals"
- "Ecosystem Banking memerlukan keanggotaan Savlo+" / "Ecosystem Banking requires Savlo+ membership"
- "Perusahaan harus berada di area Jabodetabek" / "Company must be located in Jabodetabek area"

---

## 8. Eligibility Check Timing

### 8.1 Pre-Application Check

**When:** Before user can access application form

**Checks:**

- User authentication
- User type match
- Account type requirement
- Location requirement (if known)

**Action if Not Eligible:**

- Show error message
- Show eligibility requirements
- Suggest alternatives
- Offer upgrade to Savlo+ (if applicable)

### 8.2 During Application Check

**When:** During form completion

**Checks:**

- Product-specific requirements
- Form data validation
- Location validation (from form)

**Action if Not Eligible:**

- Show error message
- Highlight missing requirements
- Prevent form submission

### 8.3 Post-Submission Check

**When:** After application submission

**Checks:**

- Final eligibility verification
- Document verification
- Partner eligibility

**Action if Not Eligible:**

- Application may be rejected
- User notified with reason

---

## 9. Business Rules Summary

### 9.1 Eligibility Priority

1. **User Authentication** - Must be logged in
2. **User Type** - Must match product requirement
3. **Account Type** - Must meet product requirement (for Ecosystem Banking)
4. **Location** - Must meet location requirement (if applicable)
5. **Product-Specific** - Must meet all product requirements

### 9.2 Flexible Eligibility

**Ecosystem Banking Only:**

- No strict eligibility requirements
- Case-by-case assessment
- Savlo+ team evaluates
- Personalized solution

---

## 10. Testing Requirements

**Test Cases:**

- [ ] Individual users can access BPKB and Property products
- [ ] Business users can access Invoice products
- [ ] Savlo+ users can access Ecosystem Banking
- [ ] Location restrictions work correctly
- [ ] Eligibility error messages display correctly
- [ ] Eligibility requirements display correctly
- [ ] Upgrade prompts work for Ecosystem Banking
- [ ] All eligibility checks work for each product

---

## Document History

| Version | Date       | Author  | Changes                               |
| ------- | ---------- | ------- | ------------------------------------- |
| 1.0     | 2025-01-27 | Initial | Created Eligibility Engine Module PRD |
