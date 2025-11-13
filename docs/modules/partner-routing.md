# Partner Routing Module PRD
## Business Logic & Rules

**Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Overview

The Partner Routing Module handles the assignment of financing applications to appropriate financing partners. It manages partner selection logic, application distribution rules, and partner availability based on product type and user account type.

---

## 2. Partner Entity Model

### 2.1 Partner Data Structure

```typescript
interface Partner {
  id: string; // UUID
  name: string;
  type: 'MULTI_FINANCE' | 'FINTECH' | 'SECRET_INSTITUTION';
  availableFor: 'SAVLO' | 'SAVLO_PLUS' | 'BOTH';
  products: ProductCode[]; // Products this partner handles
  capacity: number; // Maximum applications per period
  currentLoad: number; // Current applications in queue
  isActive: boolean;
  logoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 Partner Types

**Multi-Finance Institutions:**
- Traditional non-bank financing companies
- Handle: BPKB, Property financing
- Available for: Savlo (free tier)

**Fintech Lenders:**
- Technology-based lending platforms
- Handle: AP Invoice, AR Invoice financing
- Available for: Savlo (free tier)

**Secret Financial Institutions:**
- Exclusive financial institutions
- Handle: Ecosystem Banking Solutions
- Available for: Savlo+ (premium tier) only

---

## 3. Partner-Product Mapping

### 3.1 Product to Partner Mapping

**BPKB-based Financing:**
- Partner Type: Multi-Finance
- Available for: Savlo
- Partners: Multi-finance institutions

**Property-based Financing:**
- Partner Type: Multi-Finance
- Available for: Savlo
- Partners: Multi-finance institutions

**AP Invoice Financing:**
- Partner Type: Fintech
- Available for: Savlo
- Partners: Fintech lenders

**AR Invoice Financing:**
- Partner Type: Fintech
- Available for: Savlo
- Partners: Fintech lenders

**Ecosystem Banking Solutions:**
- Partner Type: Secret Institution
- Available for: Savlo+ only
- Partners: Secret Financial Institutions

### 3.2 Partner Selection Rules

**Selection Criteria:**
1. Partner must be active
2. Partner must handle the product type
3. Partner must be available for user's account type
4. Partner must have capacity (if capacity limits apply)
5. Partner selection algorithm (round-robin, load-based, etc.)

---

## 4. Partner Routing Logic

### 4.1 Routing Algorithm

**Basic Routing Flow:**
```
1. Application submitted
   ↓
2. Determine product type
   ↓
3. Filter partners by:
   - Product type
   - Account type (Savlo vs Savlo+)
   - Active status
   ↓
4. Select partner (round-robin or load-based)
   ↓
5. Assign partner to application
   ↓
6. Update partner load
   ↓
7. Notify partner (if applicable)
```

### 4.2 Round-Robin Routing

**Algorithm:**
- Distribute applications evenly across available partners
- Track last assigned partner per product
- Assign to next partner in rotation

**Implementation:**
```typescript
function roundRobinRouting(
  productCode: ProductCode,
  accountType: AccountType
): Partner {
  const availablePartners = getAvailablePartners(productCode, accountType);
  
  if (availablePartners.length === 0) {
    throw new Error('No partners available');
  }
  
  const lastPartnerId = getLastAssignedPartner(productCode);
  const lastIndex = availablePartners.findIndex(p => p.id === lastPartnerId);
  const nextIndex = (lastIndex + 1) % availablePartners.length;
  
  return availablePartners[nextIndex];
}
```

### 4.3 Load-Based Routing

**Algorithm:**
- Assign to partner with lowest current load
- Consider partner capacity
- Balance load across partners

**Implementation:**
```typescript
function loadBasedRouting(
  productCode: ProductCode,
  accountType: AccountType
): Partner {
  const availablePartners = getAvailablePartners(productCode, accountType)
    .filter(p => p.currentLoad < p.capacity);
  
  if (availablePartners.length === 0) {
    // Fallback to any available partner
    return getAvailablePartners(productCode, accountType)[0];
  }
  
  // Select partner with lowest load
  return availablePartners.reduce((min, partner) => 
    partner.currentLoad < min.currentLoad ? partner : min
  );
}
```

---

## 5. Partner Availability Rules

### 5.1 Availability Check

**Partner is Available if:**
1. Partner is active (`isActive: true`)
2. Partner handles the product type
3. Partner is available for user's account type
4. Partner has capacity (if capacity limits apply)

**Availability Function:**
```typescript
function isPartnerAvailable(
  partner: Partner,
  productCode: ProductCode,
  accountType: AccountType
): boolean {
  // Check if partner is active
  if (!partner.isActive) return false;
  
  // Check if partner handles this product
  if (!partner.products.includes(productCode)) return false;
  
  // Check account type availability
  if (partner.availableFor !== 'BOTH' && 
      partner.availableFor !== accountType) {
    return false;
  }
  
  // Check capacity (if applicable)
  if (partner.capacity > 0 && partner.currentLoad >= partner.capacity) {
    return false;
  }
  
  return true;
}
```

### 5.2 Get Available Partners

```typescript
function getAvailablePartners(
  productCode: ProductCode,
  accountType: AccountType
): Partner[] {
  return allPartners.filter(partner => 
    isPartnerAvailable(partner, productCode, accountType)
  );
}
```

---

## 6. Partner Assignment

### 6.1 Assignment Process

**On Application Submission:**

1. **Determine Product and Account Type**
   - Get product code from application
   - Get account type from user

2. **Get Available Partners**
   - Filter partners by product and account type
   - Filter by active status
   - Filter by capacity (if applicable)

3. **Select Partner**
   - Use routing algorithm (round-robin or load-based)
   - Select one partner

4. **Assign Partner**
   - Update application with partner ID
   - Update partner current load
   - Record assignment timestamp

5. **Notify Partner** (if applicable)
   - Send notification to partner
   - Include application details

### 6.2 Assignment Business Rules

**Business Rules:**
1. Partner assigned immediately upon submission
2. Partner assignment cannot be changed (unless special case)
3. Partner load updated on assignment
4. Application status set to "SUBMITTED" after assignment
5. Partner notified of new application (if applicable)

---

## 7. Partner Capacity Management

### 7.1 Capacity Tracking

**Capacity Fields:**
- `capacity`: Maximum applications per period (0 = unlimited)
- `currentLoad`: Current number of applications in queue

**Load Calculation:**
- Count applications with status: SUBMITTED, UNDER_REVIEW, DOCUMENT_REQUEST
- Exclude: APPROVED, REJECTED, DISBURSED, CLOSED

**Update Load:**
```typescript
function updatePartnerLoad(partnerId: string): void {
  const activeApplications = getActiveApplications(partnerId);
  const load = activeApplications.length;
  
  updatePartner(partnerId, { currentLoad: load });
}
```

### 7.2 Capacity Limits

**Business Rules:**
- If `capacity = 0`: Unlimited capacity
- If `capacity > 0`: Enforce capacity limit
- If partner at capacity: Skip in routing (or use fallback)
- Load recalculated periodically or on status change

---

## 8. Partner-Product Specific Rules

### 8.1 BPKB & Property Financing

**Partner Type:** Multi-Finance Institutions

**Routing Rules:**
- Available for Savlo users
- Round-robin or load-based routing
- Multiple partners can handle same product

**Business Rules:**
- Partner must be multi-finance institution
- Partner must be active
- Partner must have capacity (if limited)

### 8.2 AP & AR Invoice Financing

**Partner Type:** Fintech Lenders

**Routing Rules:**
- Available for Savlo users
- Round-robin or load-based routing
- Multiple partners can handle same product

**Business Rules:**
- Partner must be fintech lender
- Partner must be active
- Partner must have capacity (if limited)

### 8.3 Ecosystem Banking Solutions

**Partner Type:** Secret Financial Institutions

**Routing Rules:**
- Available for Savlo+ users only
- Exclusive partners
- May have different routing algorithm

**Business Rules:**
- Partner must be secret institution
- Partner must be available for Savlo+
- User must have Savlo+ account
- May have special routing logic

---

## 9. Partner Notification

### 9.1 Notification Triggers

**When to Notify:**
- New application assigned
- Application status changed (if partner needs to know)
- Document request (if partner initiated)

### 9.2 Notification Content

**New Application Notification:**
- Application ID
- Product type
- User information (if applicable)
- Submission date
- Link to application details

---

## 10. Fallback Logic

### 10.1 No Partners Available

**Scenario:** No partners available for product/account type

**Fallback Options:**
1. Queue application for later assignment
2. Assign to default partner (if exists)
3. Show error to user
4. Escalate to admin

**Business Rules:**
- Application status: SUBMITTED (waiting for partner)
- User notified of delay
- Admin notified for manual assignment

### 10.2 Partner Capacity Full

**Scenario:** All partners at capacity

**Fallback Options:**
1. Queue application
2. Assign to partner with least load (even if at capacity)
3. Wait for capacity to free up

---

## 11. Partner Management

### 11.1 Partner Activation/Deactivation

**Activate Partner:**
- Set `isActive: true`
- Partner becomes available for routing

**Deactivate Partner:**
- Set `isActive: false`
- Partner no longer receives new applications
- Existing applications continue processing

**Business Rules:**
- Cannot deactivate partner with active applications (or handle gracefully)
- Deactivation affects new applications only
- Can reactivate anytime

### 11.2 Partner Product Assignment

**Add Product to Partner:**
- Add product code to partner's products array
- Partner becomes available for that product

**Remove Product from Partner:**
- Remove product code from partner's products array
- Partner no longer receives that product type

---

## 12. Business Rules Summary

### 12.1 Routing Rules

1. Partner must be active
2. Partner must handle product type
3. Partner must be available for account type
4. Partner must have capacity (if limited)
5. Partner assigned immediately on submission

### 12.2 Assignment Rules

1. One partner per application
2. Assignment cannot be changed (unless special case)
3. Partner load updated on assignment
4. Partner notified of new application

### 12.3 Capacity Rules

1. Capacity 0 = unlimited
2. Capacity > 0 = enforced limit
3. Load calculated from active applications
4. Load updated on status changes

---

## 13. Testing Requirements

**Test Cases:**
- [ ] Partner routing works for each product type
- [ ] Round-robin routing distributes evenly
- [ ] Load-based routing balances load
- [ ] Partner availability check works
- [ ] Capacity limits enforced correctly
- [ ] Partner assignment works
- [ ] Fallback logic works when no partners available
- [ ] Partner activation/deactivation works
- [ ] Savlo+ users routed to secret institutions

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-27 | Initial | Created Partner Routing Module PRD |

