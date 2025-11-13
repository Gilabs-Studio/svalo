# Product Catalog Module PRD
## Business Logic & Rules

**Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Overview

The Product Catalog Module manages all financing products available on the Savlo platform. It handles product definitions, eligibility rules, availability logic, and product filtering based on user characteristics.

---

## 2. Product Definitions

### 2.1 BPKB-based Financing

**Product Code:** `BPKB_FINANCING`  
**Product Name:** "BPKB-based Financing"  
**Brand:** Savlo  
**Target User Type:** `INDIVIDUAL`  
**Account Type Required:** `SAVLO` (Free tier)  
**Product Status:** `ACTIVE`

**Description:**
"Secure financing using your vehicle's ownership document (BPKB) as collateral. Quick process for your urgent needs."

**Key Features:**
- Quick approval process
- Vehicle collateral-based
- For urgent financing needs

**Business Rules:**
- Only available to individuals (not businesses)
- Requires valid BPKB in applicant's name
- Vehicle must be fully paid
- No account type restriction (available to all Savlo users)

---

### 2.2 Property-based Financing

**Product Code:** `PROPERTY_FINANCING`  
**Product Name:** "Property-based Financing"  
**Brand:** Savlo  
**Target User Type:** `INDIVIDUAL`  
**Account Type Required:** `SAVLO` (Free tier)  
**Product Status:** `ACTIVE`

**Description:**
"Secure financing using your property certificate (SHM/SHGB) as collateral. Up to 65% of property value, max IDR 5B."

**Key Features:**
- Property collateral-based
- Up to 65% LTV (Loan-to-Value)
- Maximum amount: IDR 5 Billion

**Business Rules:**
- Only available to individuals (not businesses)
- Requires valid SHM or SHGB certificate
- Maximum financing: min(65% of property value, IDR 5B)
- Property must be in Jabodetabek area
- No account type restriction (available to all Savlo users)

---

### 2.3 AP Invoice Financing

**Product Code:** `AP_INVOICE_FINANCING`  
**Product Name:** "AP Invoice Financing"  
**Brand:** Savlo  
**Target User Type:** `BUSINESS`  
**Account Type Required:** `SAVLO` (Free tier)  
**Product Status:** `ACTIVE`

**Description:**
"Improve your cash flow by financing your accounts payable invoices up to IDR 2 Billion. Pay your suppliers on time."

**Key Features:**
- Accounts Payable invoice financing
- Maximum amount: IDR 2 Billion
- Minimum amount: IDR 500 Million
- Financing range: IDR 500M – IDR 2B

**Business Rules:**
- Only available to businesses (PT/CV)
- Must be based in Jabodetabek
- Minimum 2 years in operation
- Must have positive financial report
- Corporate entities only (PT/CV)
- No account type restriction (available to all Savlo users)

**Eligibility Requirements:**
- Based in Jabodetabek ✅
- Corporate only (PT/CV) ✅
- Minimum 2 years in operation ✅
- Financing Range: IDR 500M – IDR 2B ✅
- Must have positive financial report ✅

---

### 2.4 AR Invoice Financing

**Product Code:** `AR_INVOICE_FINANCING`  
**Product Name:** "AR Invoice Financing"  
**Brand:** Savlo  
**Target User Type:** `BUSINESS`  
**Account Type Required:** `SAVLO` (Free tier)  
**Product Status:** `ACTIVE`

**Description:**
"Unlock working capital tied up in your accounts receivable. Get access to funds up to IDR 5 Billion."

**Key Features:**
- Accounts Receivable invoice financing
- Maximum amount: IDR 5 Billion
- Minimum amount: IDR 300 Million
- Financing range: IDR 300M – IDR 5B

**Business Rules:**
- Only available to businesses (PT/CV)
- Must be based in Jabodetabek, Surabaya, or Bali
- Minimum 2 years in operation
- Must have positive financial report
- Corporate entities only (PT/CV)
- No account type restriction (available to all Savlo users)

**Eligibility Requirements:**
- Based in Jabodetabek, Surabaya, or Bali ✅
- Corporate only (PT/CV) ✅
- Minimum 2 years in operation ✅
- Financing Range: IDR 300M – IDR 5B ✅
- Must have positive financial report ✅

---

### 2.5 Ecosystem Banking Solutions

**Product Code:** `ECOSYSTEM_BANKING`  
**Product Name:** "Ecosystem Banking Solutions"  
**Brand:** Savlo+  
**Target User Type:** `BUSINESS`  
**Account Type Required:** `SAVLO_PLUS` (Premium tier)  
**Product Status:** `ACTIVE`

**Description:**
"For businesses that often find it difficult to meet standard financing requirement, this solution is designed for you."

**Key Features:**
- Flexible eligibility
- Personalized solutions
- Premium service
- Unlimited consultation

**Business Rules:**
- Only available to businesses (PT/CV)
- **REQUIRES Savlo+ membership** (premium account)
- Flexible eligibility (case-by-case assessment)
- Designed for businesses that don't meet standard requirements
- No standard eligibility requirements
- Access to secret financial institutions

**Eligibility Requirements:**
- Savlo+ membership required ✅
- Business entity (PT/CV) ✅
- Flexible eligibility (case-by-case) ✅

---

## 3. Product Availability Logic

### 3.1 Availability Rules

**Product is available if ALL conditions are met:**
1. Product status is `ACTIVE`
2. User type matches product target user type
3. User account type meets product requirement
4. User location meets product location requirement (if applicable)
5. User meets product-specific eligibility criteria

### 3.2 Product Filtering Logic

**Filter by User Type:**
```typescript
if (user.userType === 'INDIVIDUAL') {
  availableProducts = [
    BPKB_FINANCING,
    PROPERTY_FINANCING
  ];
} else if (user.userType === 'BUSINESS') {
  availableProducts = [
    AP_INVOICE_FINANCING,
    AR_INVOICE_FINANCING,
    ...(user.accountType === 'SAVLO_PLUS' ? [ECOSYSTEM_BANKING] : [])
  ];
}
```

**Filter by Account Type:**
- `SAVLO` users: Can access BPKB, Property, AP Invoice, AR Invoice
- `SAVLO_PLUS` users: Can access all products including Ecosystem Banking

**Filter by Location:**
- AP Invoice: Jabodetabek only
- AR Invoice: Jabodetabek, Surabaya, or Bali
- Property: Jabodetabek only
- BPKB: No location restriction
- Ecosystem Banking: No location restriction

### 3.3 Product Display Logic

**Landing Page Display:**
- Show all 5 products
- Mark Ecosystem Banking as "Savlo+" (premium)
- Mark others as "Savlo" (free tier)
- Show "Learn More" button for each product

**Product Card Information:**
- Product name
- Brand (Savlo or Savlo+)
- Description
- Key features/benefits
- "Learn More" CTA

---

## 4. Product Comparison Logic

### 4.1 Savlo vs Savlo+ Comparison

**Comparison Table Structure:**

| Feature | Savlo | Savlo+ |
|---------|-------|--------|
| Overview | Digital financing gateway | Premium ecosystem program |
| Eligibility | Standard requirements | Flexible eligibility |
| Financing Partners | Multi-finance & Fintech | Secret Financial Institutions |
| Value Propositions | Efficient access, free consultation | Personalized solution, unlimited consultation |
| Products Available | BPKB, Property, AP Invoice, AR Invoice | All + Ecosystem Banking |

**Business Rules:**
- Comparison table displayed on landing page
- Clear distinction between free and premium tiers
- Ecosystem Banking only visible to Savlo+ users

---

## 5. Product Data Model

```typescript
interface Product {
  id: string;
  code: 'BPKB_FINANCING' | 'PROPERTY_FINANCING' | 'AP_INVOICE_FINANCING' | 'AR_INVOICE_FINANCING' | 'ECOSYSTEM_BANKING';
  name: string;
  brand: 'Savlo' | 'Savlo+';
  description: string;
  targetUserType: 'INDIVIDUAL' | 'BUSINESS';
  accountTypeRequired: 'SAVLO' | 'SAVLO_PLUS' | 'BOTH';
  minAmount: number | null;
  maxAmount: number | null;
  eligibilityRequirements: string[];
  locationRestrictions: string[]; // ['Jabodetabek', 'Surabaya', 'Bali']
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 6. Business Logic Functions

### 6.1 Check Product Availability

```typescript
function isProductAvailable(
  product: Product,
  user: User,
  userLocation: string
): boolean {
  // Check product status
  if (product.status !== 'ACTIVE') return false;
  
  // Check user type
  if (product.targetUserType !== 'BOTH' && 
      product.targetUserType !== user.userType) {
    return false;
  }
  
  // Check account type
  if (product.accountTypeRequired === 'SAVLO_PLUS' && 
      user.accountType !== 'SAVLO_PLUS') {
    return false;
  }
  
  // Check location
  if (product.locationRestrictions.length > 0 &&
      !product.locationRestrictions.includes(userLocation)) {
    return false;
  }
  
  return true;
}
```

### 6.2 Get Available Products for User

```typescript
function getAvailableProducts(user: User, userLocation: string): Product[] {
  return allProducts.filter(product => 
    isProductAvailable(product, user, userLocation)
  );
}
```

### 6.3 Filter Products by Category

```typescript
function filterProductsByCategory(
  products: Product[],
  category: 'INDIVIDUAL' | 'BUSINESS' | 'ALL'
): Product[] {
  if (category === 'ALL') return products;
  
  return products.filter(product => 
    product.targetUserType === category || 
    product.targetUserType === 'BOTH'
  );
}
```

---

## 7. Product Routing Logic

### 7.1 Application Form Routes

**Route Mapping:**
- BPKB Financing → `/apply/bpkb-financing`
- Property Financing → `/apply/property-financing`
- AP Invoice Financing → `/apply/ap-invoice-financing`
- AR Invoice Financing → `/apply/ar-invoice-financing`
- Ecosystem Banking → `/apply/ecosystem-banking`

**Business Rules:**
- Route must check product availability before allowing access
- If product not available, redirect to landing page with error message
- If user not logged in, redirect to login (then return to form)

---

## 8. Product Display Rules

### 8.1 Landing Page Product Display

**Display Order:**
1. BPKB-based Financing
2. Property-based Financing
3. AP Invoice Financing
4. AR Invoice Financing
5. Ecosystem Banking Solutions (Savlo+)

**Visual Indicators:**
- Free tier products: "Savlo" badge
- Premium product: "Savlo+" badge
- "Learn More" button for each product

### 8.2 Product Detail Display

**Information to Display:**
- Product name
- Brand (Savlo/Savlo+)
- Description
- Key features
- Eligibility requirements
- Financing range (if applicable)
- "Apply Now" button (if eligible)

---

## 9. Validation Rules

### 9.1 Product Selection Validation

**Before allowing application:**
1. User must be logged in
2. Product must be available for user
3. User must meet eligibility requirements
4. User location must meet location requirements (if applicable)

### 9.2 Product Access Control

**Access Rules:**
- Public: Can view product information
- Authenticated: Can view and apply (if eligible)
- Premium: Can access Ecosystem Banking (Savlo+ only)

---

## 10. Error Handling

### 10.1 Product Not Available

**Scenario:** User tries to access unavailable product

**Response:**
- Show error message: "This product is not available for your account type"
- Redirect to landing page
- Suggest alternative products if available

### 10.2 Eligibility Not Met

**Scenario:** User doesn't meet eligibility requirements

**Response:**
- Show eligibility requirements
- Highlight missing requirements
- Suggest upgrade to Savlo+ (if applicable)
- Provide contact information for assistance

---

## 11. Testing Requirements

**Test Cases:**
- [ ] Individual users see only BPKB and Property products
- [ ] Business users see Invoice products
- [ ] Savlo+ users see all products including Ecosystem Banking
- [ ] Location restrictions work correctly
- [ ] Product availability logic works for all combinations
- [ ] Product comparison table displays correctly
- [ ] "Learn More" routes to correct application form
- [ ] Error messages display correctly for unavailable products

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-27 | Initial | Created Product Catalog Module PRD |

