# User Management Module PRD

## Business Logic & Rules

**Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Overview

The User Management Module handles user registration, authentication, session management, account type management, and user profile management. It ensures secure access control and proper user data management.

---

## 2. User Entity Model

### 2.1 User Data Structure

```typescript
interface User {
  id: string; // UUID
  email: string; // Unique, login credential
  password: string; // Hashed, never plain text
  fullName: string;
  phoneNumber: string; // Unique
  userType: "INDIVIDUAL" | "BUSINESS";
  accountType: "SAVLO" | "SAVLO_PLUS";
  languagePreference: "en" | "id"; // Default: 'en'
  registrationDate: Date;
  lastLogin: Date;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 User Session Structure

```typescript
interface UserSession {
  userId: string;
  sessionToken: string; // JWT or session ID
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}
```

---

## 3. User Registration

### 3.1 Registration Process

**Step 1: Registration Form**

**Required Fields:**

- Email - Required, unique, valid email format
- Password - Required, min 8 characters, must contain letter and number
- Confirm Password - Required, must match password
- Full Name - Required, min 3 characters
- Phone Number - Required, unique, Indonesian format
- User Type - Required, dropdown: Individual | Business
- Account Type - Required, dropdown: Savlo | Savlo+
- Language Preference - Optional, default: English (en)
- Terms & Conditions - Required checkbox

**Validation Rules:**

**Email:**

- Must be valid email format
- Must be unique (check against database)
- Error: "Email sudah terdaftar" / "Email already registered"

**Password:**

- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number
- Error: "Password minimal 8 karakter, harus mengandung huruf dan angka"

**Phone Number:**

- Indonesian format: +62 or 08XX
- Must be unique
- Error: "Nomor HP sudah terdaftar" / "Phone number already registered"

**User Type:**

- Must select Individual or Business
- Determines available products

**Account Type:**

- Savlo (Free) - Default
- Savlo+ (Premium) - Requires payment/upgrade (if applicable)

### 3.2 Registration Business Rules

**Business Rules:**

1. Email must be unique across all users
2. Phone number must be unique across all users
3. Password must be hashed before storage (never store plain text)
4. User type cannot be changed after registration
5. Account type can be upgraded (Savlo → Savlo+)
6. Language preference saved to user profile
7. Registration date recorded
8. User status set to `isActive: true` on registration

**Registration Flow:**

```
1. User fills registration form
   ↓
2. Validate all fields
   ↓
3. Check email uniqueness
   ↓
4. Check phone number uniqueness
   ↓
5. Hash password
   ↓
6. Create user record
   ↓
7. Set default values
   ↓
8. Send verification email (if required)
   ↓
9. Auto-login user (optional)
   ↓
10. Redirect to dashboard/landing page
```

---

## 4. User Authentication

### 4.1 Login Process

**Login Form Fields:**

- Email - Required
- Password - Required
- Remember Me - Optional checkbox

**Validation:**

- Email must exist in database
- Password must match (compare hashed)
- User must be active (`isActive: true`)

**Login Flow:**

```
1. User enters email and password
   ↓
2. Validate email format
   ↓
3. Find user by email
   ↓
4. Check if user exists
   ↓
5. Check if user is active
   ↓
6. Verify password (compare hashed)
   ↓
7. Create session
   ↓
8. Update lastLogin timestamp
   ↓
9. Set session cookie/token
   ↓
10. Redirect to dashboard or return URL
```

### 4.2 Authentication Business Rules

**Security Rules:**

1. Passwords must be hashed (bcrypt, argon2, etc.)
2. Never store plain text passwords
3. Session tokens must be secure (JWT with expiration)
4. Implement rate limiting for login attempts
5. Lock account after X failed attempts (optional)
6. Use HTTPS only for authentication

**Session Management:**

- Session expires after inactivity (e.g., 30 minutes)
- "Remember Me" extends session (e.g., 30 days)
- Session stored in secure HTTP-only cookie
- Session token validated on each request

---

## 5. Session Management

### 5.1 Session Creation

**On Login:**

- Generate secure session token (JWT)
- Set expiration time
- Store session in database (optional)
- Set HTTP-only cookie

**Session Token Structure:**

```typescript
interface JWTPayload {
  userId: string;
  email: string;
  userType: string;
  accountType: string;
  iat: number; // Issued at
  exp: number; // Expiration
}
```

### 5.2 Session Validation

**On Each Request:**

- Extract session token from cookie/header
- Validate token signature
- Check token expiration
- Verify user still exists and is active
- Refresh session if needed

### 5.3 Session Termination

**Logout:**

- Invalidate session token
- Clear session cookie
- Clear session from database (if stored)
- Redirect to login page

**Automatic Logout:**

- On session expiration
- On password change
- On account deactivation

---

## 6. Account Type Management

### 6.1 Account Types

**Savlo (Free Tier):**

- Default account type
- Access to: BPKB, Property, AP Invoice, AR Invoice
- Standard eligibility requirements
- Free consultation (limited)

**Savlo+ (Premium Tier):**

- Premium account type
- Access to: All products including Ecosystem Banking
- Flexible eligibility
- Unlimited consultation
- Priority access

### 6.2 Account Upgrade

**Upgrade Process:**

- User can upgrade from Savlo to Savlo+
- Upgrade may require payment (if applicable)
- Upgrade unlocks Ecosystem Banking product
- Account type updated in user profile

**Upgrade Business Rules:**

- Can upgrade anytime
- Cannot downgrade (once Savlo+, always Savlo+)
- Upgrade date recorded
- Access to premium features immediately

---

## 7. User Profile Management

### 7.1 Profile Information

**Editable Fields:**

- Full Name
- Phone Number (with verification)
- Language Preference
- Password (change password)

**Non-Editable Fields:**

- Email (cannot change)
- User Type (cannot change)
- Registration Date
- User ID

### 7.2 Profile Update Rules

**Business Rules:**

1. Full name can be updated
2. Phone number can be updated (must verify uniqueness)
3. Language preference can be updated
4. Password can be changed (requires current password)
5. Email cannot be changed (security reason)
6. User type cannot be changed (business rule)

---

## 8. Password Management

### 8.1 Password Change

**Change Password Form:**

- Current Password - Required
- New Password - Required, min 8 chars, letter + number
- Confirm New Password - Required, must match

**Validation:**

- Current password must be correct
- New password must meet requirements
- New password must be different from current

**Business Rules:**

- Password must be hashed before storage
- Invalidate all sessions on password change (security)
- Require re-login after password change

### 8.2 Password Reset

**Reset Password Flow:**

1. User requests password reset
2. System sends reset link to email
3. User clicks link (valid for 1 hour)
4. User enters new password
5. Password updated
6. All sessions invalidated

**Business Rules:**

- Reset link expires after 1 hour
- Reset link can only be used once
- Reset link invalidated after use

---

## 9. User Type Management

### 9.1 User Types

**Individual:**

- For personal financing needs
- Can access: BPKB, Property products
- Requires personal documents (KTP, etc.)

**Business:**

- For business financing needs
- Can access: AP Invoice, AR Invoice, Ecosystem Banking
- Requires business documents (NPWP, Akta, etc.)

### 9.2 User Type Rules

**Business Rules:**

1. User type selected during registration
2. User type cannot be changed after registration
3. User type determines available products
4. User type determines required documents

---

## 10. Language Preference Management

### 10.1 Language Preference

**Supported Languages:**

- English (en) - Default
- Indonesian (id)

**Storage:**

- Saved in user profile
- Default: English (en)
- Can be changed anytime

**Usage:**

- Used for all UI text
- Used for error messages
- Used for email notifications (if applicable)

### 10.2 Language Preference Rules

**Business Rules:**

1. Default language is English
2. Language preference saved to user profile
3. Language preference persists across sessions
4. Language can be changed without affecting data

---

## 11. Access Control

### 11.1 Protected Routes

**Routes Requiring Authentication:**

- `/my-applications` - User dashboard
- `/apply/*` - All application forms
- `/profile` - User profile
- `/settings` - User settings

**Access Control:**

- Check if user is authenticated
- If not authenticated, redirect to login
- After login, return to original URL

### 11.2 Role-Based Access

**Product Access:**

- Individual users: BPKB, Property
- Business users: AP Invoice, AR Invoice, Ecosystem Banking
- Savlo+ users: All products

**Access Check:**

```typescript
function canAccessProduct(user: User, product: Product): boolean {
  // Check user type
  if (
    product.targetUserType !== "BOTH" &&
    product.targetUserType !== user.userType
  ) {
    return false;
  }

  // Check account type
  if (
    product.accountTypeRequired === "SAVLO_PLUS" &&
    user.accountType !== "SAVLO_PLUS"
  ) {
    return false;
  }

  return true;
}
```

---

## 12. Error Handling

### 12.1 Registration Errors

**Error Scenarios:**

- Email already exists → "Email sudah terdaftar"
- Phone already exists → "Nomor HP sudah terdaftar"
- Invalid email format → "Format email tidak valid"
- Weak password → "Password terlalu lemah"
- Terms not accepted → "Anda harus menyetujui syarat dan ketentuan"

### 12.2 Login Errors

**Error Scenarios:**

- Email not found → "Email tidak terdaftar"
- Wrong password → "Password salah"
- Account inactive → "Akun tidak aktif"
- Too many attempts → "Terlalu banyak percobaan. Coba lagi nanti"

### 12.3 Session Errors

**Error Scenarios:**

- Session expired → Redirect to login
- Invalid token → Redirect to login
- User not found → Redirect to login

---

## 13. Business Rules Summary

### 13.1 Registration Rules

1. Email must be unique
2. Phone number must be unique
3. Password must be hashed
4. User type selected during registration
5. Account type default is Savlo
6. Language preference default is English

### 13.2 Authentication Rules

1. Passwords must be hashed
2. Sessions must be secure
3. Sessions expire after inactivity
4. Failed login attempts limited
5. HTTPS only for authentication

### 13.3 Account Management Rules

1. User type cannot be changed
2. Account type can be upgraded
3. Email cannot be changed
4. Password can be changed
5. Language preference can be changed

---

## 14. Testing Requirements

**Test Cases:**

- [ ] User registration works correctly
- [ ] Email uniqueness validation works
- [ ] Phone number uniqueness validation works
- [ ] Password hashing works
- [ ] Login works correctly
- [ ] Session management works
- [ ] Logout works correctly
- [ ] Password change works
- [ ] Account upgrade works
- [ ] Protected routes require authentication
- [ ] Access control works for products
- [ ] Language preference persists

---

## Document History

| Version | Date       | Author  | Changes                            |
| ------- | ---------- | ------- | ---------------------------------- |
| 1.0     | 2025-01-27 | Initial | Created User Management Module PRD |
