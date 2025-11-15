# Form Validation Module PRD

## Business Logic & Rules

**Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Draft

---

## 1. Overview

The Form Validation Module handles all field-level and form-level validation rules for each financing product. It ensures data integrity, format correctness, and business rule compliance before application submission.

---

## 2. Validation Rules by Product

### 2.1 BPKB-based Financing Validation

#### Step 2: BPKB Info - Data Diri

**Nama Lengkap (Full Name)**

- Type: Text input
- Required: Yes
- Min Length: 3 characters
- Max Length: 100 characters
- Pattern: Letters, spaces, and common name characters only
- Error Messages:
  - Required: "Nama lengkap wajib diisi"
  - Min Length: "Nama lengkap minimal 3 karakter"
  - Invalid Pattern: "Nama lengkap hanya boleh mengandung huruf dan spasi"

**No. KTP (ID Number)**

- Type: Text input (numeric)
- Required: Yes
- Length: Exactly 16 digits
- Pattern: `^[0-9]{16}$`
- Validation: Must be valid Indonesian KTP format
- Error Messages:
  - Required: "Nomor KTP wajib diisi"
  - Length: "Nomor KTP harus 16 digit"
  - Invalid: "Nomor KTP tidak valid"

**No. HP (Phone Number)**

- Type: Text input
- Required: Yes
- Pattern: Indonesian phone number format
- Formats Accepted:
  - `+62XXXXXXXXXXX` (with country code)
  - `08XXXXXXXXXX` (without country code)
  - `62XXXXXXXXXXX` (without +)
- Min Length: 10 digits (after country code)
- Max Length: 13 digits (after country code)
- Error Messages:
  - Required: "Nomor HP wajib diisi"
  - Invalid Format: "Format nomor HP tidak valid. Gunakan format: 08XX atau +62XX"

**Usia Konsumen (Age)**

- Type: Number input
- Required: Yes
- Min Value: 21
- Max Value: 70
- Validation: Must be valid age
- Error Messages:
  - Required: "Usia wajib diisi"
  - Min Value: "Usia minimal 21 tahun"
  - Max Value: "Usia maksimal 70 tahun"

**Alamat Survey (Survey Address)**

- Type: Textarea
- Required: Yes
- Min Length: 10 characters
- Max Length: 500 characters
- Error Messages:
  - Required: "Alamat survey wajib diisi"
  - Min Length: "Alamat survey minimal 10 karakter"

**Kelurahan (Sub-district)**

- Type: Text input
- Required: Yes
- Min Length: 3 characters
- Max Length: 100 characters
- Error Messages:
  - Required: "Kelurahan wajib diisi"

**Kecamatan (District)**

- Type: Text input
- Required: Yes
- Min Length: 3 characters
- Max Length: 100 characters
- Error Messages:
  - Required: "Kecamatan wajib diisi"

#### Step 2: BPKB Info - Data Kendaraan

**Jenis Kendaraan (Vehicle Type)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Motor", "Mobil"]
- Error Messages:
  - Required: "Jenis kendaraan wajib dipilih"

**Merk Kendaraan (Brand)**

- Type: Text input
- Required: Yes
- Min Length: 2 characters
- Max Length: 50 characters
- Error Messages:
  - Required: "Merk kendaraan wajib diisi"

**Tipe Kendaraan (Model)**

- Type: Text input
- Required: Yes
- Min Length: 2 characters
- Max Length: 50 characters
- Error Messages:
  - Required: "Tipe kendaraan wajib diisi"

**Tahun Kendaraan (Year)**

- Type: Number input
- Required: Yes
- Min Value: 2000
- Max Value: Current year + 1
- Validation: Must be valid year
- Error Messages:
  - Required: "Tahun kendaraan wajib diisi"
  - Min Value: "Tahun kendaraan minimal 2000"
  - Max Value: "Tahun kendaraan tidak boleh melebihi tahun saat ini"

**No. Plat Kendaraan (License Plate)**

- Type: Text input
- Required: Yes
- Pattern: Indonesian license plate format
- Formats Accepted:
  - `B 1234 ABC` (with spaces)
  - `B1234ABC` (without spaces)
- Min Length: 7 characters
- Max Length: 12 characters
- Error Messages:
  - Required: "Nomor plat kendaraan wajib diisi"
  - Invalid Format: "Format nomor plat tidak valid"

**Atas Nama Kendaraan (Registered Owner)**

- Type: Text input
- Required: Yes
- Min Length: 3 characters
- Max Length: 100 characters
- Error Messages:
  - Required: "Atas nama kendaraan wajib diisi"

**Status Kendaraan (Vehicle Status)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Pribadi", "Perusahaan"]
- Error Messages:
  - Required: "Status kendaraan wajib dipilih"

**Status BPKB (BPKB Status)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Asli", "Copy"]
- Error Messages:
  - Required: "Status BPKB wajib dipilih"

**Status Pajak (Tax Status)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Lunas", "Belum Lunas"]
- Business Rule: If "Belum Lunas", show warning but allow
- Error Messages:
  - Required: "Status pajak wajib dipilih"

**Asuransi Kendaraan (Insurance)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Ada", "Tidak Ada"]
- Business Rule: If "Tidak Ada", show recommendation but allow
- Error Messages:
  - Required: "Asuransi kendaraan wajib dipilih"

#### Step 2: BPKB Info - Informasi Pinjaman

**Jumlah Pinjaman (Loan Amount)**

- Type: Number input (currency)
- Required: Yes
- Min Value: 10,000,000 (IDR 10 million)
- Max Value: No limit (partner-dependent)
- Format: Display as IDR with thousand separators
- Error Messages:
  - Required: "Jumlah pinjaman wajib diisi"
  - Min Value: "Jumlah pinjaman minimal IDR 10.000.000"

**Tenor Pelunasan (Repayment Tenor)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["12", "24", "36", "48", "60"] (months)
- Error Messages:
  - Required: "Tenor pelunasan wajib dipilih"

#### Step 3: Documents

**Google Drive URL**

- Type: URL input
- Required: Yes
- Pattern: Valid Google Drive URL
- Formats Accepted:
  - `https://drive.google.com/drive/folders/...`
  - `https://drive.google.com/file/d/...`
- Validation:
  - Must be valid URL format
  - Must be Google Drive domain
  - Must have viewing permissions (check if possible)
- Error Messages:
  - Required: "Google Drive URL wajib diisi"
  - Invalid URL: "URL tidak valid"
  - Not Google Drive: "URL harus dari Google Drive"
  - No Permission: "Pastikan link memiliki izin viewing (Siapa saja yang memiliki link)"

**Required Documents Checklist**

- Type: Checkbox list
- Required: All must be checked
- Documents:
  - ✅ Foto KTP
  - ✅ Foto BPKB
  - ✅ Foto STNK
  - ✅ Foto Kendaraan (Depan)
  - ✅ Foto Kendaraan (Belakang)
  - ✅ Foto Kendaraan (Kanan)
  - ✅ Foto Kendaraan (Kiri)
- Error Messages:
  - Not All Checked: "Semua dokumen wajib diunggah"

---

### 2.2 Property-based Financing Validation

#### Step 2: Property Info - Data Diri

**Nama Konsumen (Consumer Name)**

- Same validation as BPKB "Nama Lengkap"

**No. HP (Phone Number)**

- Same validation as BPKB

**Alamat Properti (Property Address)**

- Type: Text input
- Required: Yes
- Min Length: 10 characters
- Max Length: 200 characters
- Error Messages:
  - Required: "Alamat properti wajib diisi"

**Alamat Lengkap (Full Address)**

- Type: Textarea
- Required: Yes
- Min Length: 10 characters
- Max Length: 500 characters
- Error Messages:
  - Required: "Alamat lengkap wajib diisi"

**Kecamatan (District)**

- Same validation as BPKB

**Kota (City)**

- Type: Text input
- Required: Yes
- Min Length: 3 characters
- Max Length: 100 characters
- Error Messages:
  - Required: "Kota wajib diisi"

#### Step 2: Property Info - Informasi Properti & Pinjaman

**Jenis Sertifikat (Certificate Type)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["SHM", "SHGB"]
- Error Messages:
  - Required: "Jenis sertifikat wajib dipilih"

**Dana Dibutuhkan (Funds Needed)**

- Type: Number input (currency)
- Required: Yes
- Min Value: 100,000,000 (IDR 100 million)
- Max Value: 5,000,000,000 (IDR 5 billion)
- Format: Display as IDR with thousand separators
- Error Messages:
  - Required: "Dana dibutuhkan wajib diisi"
  - Min Value: "Dana dibutuhkan minimal IDR 100.000.000"
  - Max Value: "Dana dibutuhkan maksimal IDR 5.000.000.000"

**Kemampuan Angsuran / Bulan (Monthly Payment Capacity)**

- Type: Number input (currency)
- Required: Yes
- Min Value: 1,000,000 (IDR 1 million)
- Format: Display as IDR with thousand separators
- Business Rule: Should be reasonable compared to loan amount
- Error Messages:
  - Required: "Kemampuan angsuran wajib diisi"
  - Min Value: "Kemampuan angsuran minimal IDR 1.000.000"

**Siap Di-survey? (Ready for Survey)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Ya", "Tidak"]
- Error Messages:
  - Required: "Kesiapan survey wajib dipilih"

**Tanggal Pengajuan (Application Date)**

- Type: Date input (read-only)
- Auto-filled: Current date
- Format: DD/MM/YYYY

**Tanggal Submission (Submission Date)**

- Type: Date input (read-only)
- Auto-filled: On submission
- Format: DD/MM/YYYY

#### Step 3: Documents

**Google Drive URL**

- Same validation as BPKB

**Required Documents Checklist**

- Type: Checkbox list
- Required: All must be checked
- Documents:
  - ✅ Foto KTP
  - ✅ Sertifikat Properti (SHM/SHGB)
  - ✅ IMB (Izin Mendirikan Bangunan)
  - ✅ PBB (Pajak Bumi dan Bangunan) Terbaru
  - ✅ Bukti Rekening Listrik/Air
- Error Messages:
  - Not All Checked: "Semua dokumen wajib diunggah"

---

### 2.3 AP Invoice Financing Validation

#### Step 2: Company Info

**Nama PT/CV (Company Name)**

- Type: Text input
- Required: Yes
- Min Length: 3 characters
- Max Length: 200 characters
- Pattern: Must contain "PT" or "CV" (case-insensitive)
- Validation: Verify company name format
- Error Messages:
  - Required: "Nama PT/CV wajib diisi"
  - Invalid Format: "Nama harus mengandung PT atau CV"
  - Min Length: "Nama PT/CV minimal 3 karakter"

**Eligibility Requirements Display**

- Type: Read-only display
- Shows eligibility checklist (all must be met):
  - ✅ Based in Jabodetabek
  - ✅ Corporate only (PT/CV)
  - ✅ Minimum 2 years in operation
  - ✅ Financing Range: IDR 500M – IDR 2B
  - ✅ Must have positive financial report

#### Step 3: Documents

**Google Drive URL**

- Same validation as BPKB

**Required Documents Checklist**

- Type: Checkbox list
- Required: All sections must have documents
- Sections:
  - **A. Perusahaan:**
    - ✅ Akta Pendirian & Perubahan
    - ✅ SK Menkumham, NPWP PT
    - ✅ KTP & NPWP Pengurus
    - ✅ NIB & izin pendukung
    - ✅ Company Profile
  - **B. Keuangan:**
    - ✅ Laporan Keuangan 2 Tahun + YTD
    - ✅ Mutasi Rekening 6 Bulan
  - **C. Dokumen PO & Invoice:**
    - ✅ PO Customer (3 sample)
    - ✅ Invoice Customer (3 sample)
    - ✅ History invoice paid (3 sample)
  - **D. Personal Guarantee:**
    - ✅ KTP + KTP Pasangan, KK
    - ✅ Akta Nikah
  - **E. Lain-lain:**
    - ✅ List Supplier & Customer
    - ✅ Kontak Person (Email, No HP, PIC)
- Error Messages:
  - Not All Checked: "Semua dokumen wajib diunggah"

---

### 2.4 AR Invoice Financing Validation

#### Step 2: Company Info

**Nama PT/CV (Company Name)**

- Same validation as AP Invoice

**Eligibility Requirements Display**

- Type: Read-only display
- Shows eligibility checklist (all must be met):
  - ✅ Based in Jabodetabek, Surabaya, or Bali
  - ✅ Corporate only (PT/CV)
  - ✅ Minimum 2 years in operation
  - ✅ Financing Range: IDR 300M – IDR 5B
  - ✅ Must have positive financial report

#### Step 3: Documents

**Google Drive URL**

- Same validation as BPKB

**Required Documents Checklist**

- Same as AP Invoice Financing (5 sections)

---

### 2.5 Ecosystem Banking Solutions Validation

#### Step 2: Business Assessment

**Company Information:**

**Nama PT/CV (Company Name)**

- Same validation as AP/AR Invoice

**Tahun Berdiri (Year Established)**

- Type: Number input
- Required: Yes
- Min Value: 1900
- Max Value: Current year
- Error Messages:
  - Required: "Tahun berdiri wajib diisi"
  - Invalid: "Tahun berdiri tidak valid"

**Lokasi (Location)**

- Type: Text input
- Required: Yes
- Min Length: 3 characters
- Max Length: 200 characters
- Error Messages:
  - Required: "Lokasi wajib diisi"

**Industri (Industry)**

- Type: Dropdown/Select
- Required: Yes
- Options: [List of industries]
- Error Messages:
  - Required: "Industri wajib dipilih"

**Jumlah Karyawan (Number of Employees)**

- Type: Number input
- Required: Yes
- Min Value: 1
- Error Messages:
  - Required: "Jumlah karyawan wajib diisi"
  - Min Value: "Jumlah karyawan minimal 1"

**Business Challenge:**

**Alasan tidak memenuhi syarat standar (Reason)**

- Type: Textarea
- Required: Yes
- Min Length: 20 characters
- Max Length: 1000 characters
- Error Messages:
  - Required: "Alasan wajib diisi"
  - Min Length: "Alasan minimal 20 karakter"

**Jenis pembiayaan yang dibutuhkan (Financing Type Needed)**

- Type: Dropdown/Select
- Required: Yes
- Options: [List of financing types]
- Error Messages:
  - Required: "Jenis pembiayaan wajib dipilih"

**Jumlah dana yang dibutuhkan (Amount Needed)**

- Type: Number input (currency)
- Required: Yes
- Min Value: 100,000,000 (IDR 100 million)
- Format: Display as IDR with thousand separators
- Error Messages:
  - Required: "Jumlah dana wajib diisi"
  - Min Value: "Jumlah dana minimal IDR 100.000.000"

**Tujuan penggunaan dana (Purpose of Funds)**

- Type: Textarea
- Required: Yes
- Min Length: 20 characters
- Max Length: 1000 characters
- Error Messages:
  - Required: "Tujuan penggunaan dana wajib diisi"
  - Min Length: "Tujuan minimal 20 karakter"

**Current Financial Status:**

**Status laporan keuangan (Financial Report Status)**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Positif", "Negatif", "Tidak Ada"]
- Error Messages:
  - Required: "Status laporan keuangan wajib dipilih"

**Penjelasan kondisi keuangan (Financial Condition Explanation)**

- Type: Textarea
- Required: Yes
- Min Length: 20 characters
- Max Length: 1000 characters
- Error Messages:
  - Required: "Penjelasan kondisi keuangan wajib diisi"
  - Min Length: "Penjelasan minimal 20 karakter"

#### Step 3: Documents

**Google Drive URL**

- Same validation as BPKB

**Required Documents Checklist**

- Type: Checkbox list
- Required: All must be checked
- Documents:
  - ✅ Akta Pendirian & Perubahan
  - ✅ SK Menkumham, NPWP PT
  - ✅ KTP & NPWP Pengurus
  - ✅ Laporan Keuangan (jika ada)
  - ✅ Company Profile
  - ✅ Business Plan / Proposal
  - ✅ Dokumen pendukung lainnya (jika ada)

#### Step 5: Consultation Request

**Preferred consultation method**

- Type: Dropdown/Select
- Required: Yes
- Options: ["Online", "Offline"]
- Error Messages:
  - Required: "Metode konsultasi wajib dipilih"

**Preferred consultation date/time**

- Type: DateTime input
- Required: No (optional)
- Validation: Must be future date
- Error Messages:
  - Past Date: "Tanggal konsultasi harus di masa depan"

**Additional notes**

- Type: Textarea
- Required: No (optional)
- Max Length: 500 characters

---

## 3. Cross-Product Validation Rules

### 3.1 Common Validations

**All Products:**

- User must be logged in
- All required fields must be filled
- Google Drive URL must be valid
- All required documents must be checked

**All Text Fields:**

- No special characters (unless specified)
- No HTML tags
- Trim whitespace

**All Number Fields:**

- Must be numeric
- No negative values (unless specified)
- Proper decimal handling (if applicable)

**All Date Fields:**

- Valid date format
- No future dates (unless specified)
- No dates too far in past (unless specified)

### 3.2 Google Drive URL Validation

**Universal Rules:**

- Must be valid URL format
- Must be from Google Drive domain
- Must be folder or file link
- Should have viewing permissions

**Validation Function:**

```typescript
function validateGoogleDriveUrl(url: string): ValidationResult {
  // Check URL format
  if (!isValidUrl(url)) {
    return { valid: false, error: "URL tidak valid" };
  }

  // Check Google Drive domain
  if (!url.includes("drive.google.com")) {
    return { valid: false, error: "URL harus dari Google Drive" };
  }

  // Check if it's folder or file link
  if (!url.includes("/folders/") && !url.includes("/file/d/")) {
    return {
      valid: false,
      error: "URL harus link folder atau file Google Drive",
    };
  }

  return { valid: true };
}
```

---

## 4. Validation Error Handling

### 4.1 Error Display

**Field-Level Errors:**

- Show error message below field
- Highlight field with error (red border)
- Show error icon
- Error message in selected language (EN/ID)

**Form-Level Errors:**

- Show error summary at top of form
- List all fields with errors
- Allow quick navigation to error fields

### 4.2 Error Messages

**Message Structure:**

- Clear and specific
- In user's selected language
- Actionable (tell user what to fix)
- Consistent terminology

**Message Examples:**

- Required: "[Field name] wajib diisi" / "[Field name] is required"
- Invalid Format: "Format [field name] tidak valid" / "[Field name] format is invalid"
- Min/Max: "[Field name] minimal/maksimal [value]" / "[Field name] minimum/maximum [value]"

---

## 5. Validation Timing

### 5.1 Real-Time Validation

**Triggered On:**

- Field blur (when user leaves field)
- Field change (for format validation)
- Step navigation (before moving to next step)

### 5.2 Submission Validation

**Triggered On:**

- Form submission attempt
- Review step completion
- Final submit button click

**Validation Process:**

1. Validate all fields
2. Check all required documents
3. Validate Google Drive URL
4. If any errors, prevent submission and show errors
5. If all valid, allow submission

---

## 6. Business Rules

### 6.1 Conditional Validation

**Examples:**

- If "Status Pajak" is "Belum Lunas", show warning but allow
- If "Asuransi" is "Tidak Ada", show recommendation but allow
- If "Siap Di-survey?" is "Tidak", show message but allow

### 6.2 Cross-Field Validation

**Examples:**

- Loan amount should be reasonable compared to collateral value
- Monthly payment capacity should be reasonable compared to loan amount
- Age should match ID number (if possible to validate)

---

## 7. Testing Requirements

**Test Cases:**

- [ ] All required field validations work
- [ ] Format validations work correctly
- [ ] Min/max value validations work
- [ ] Google Drive URL validation works
- [ ] Document checklist validation works
- [ ] Error messages display correctly
- [ ] Error messages in correct language
- [ ] Real-time validation works
- [ ] Submission validation prevents invalid submissions
- [ ] Conditional validations work

---

## Document History

| Version | Date       | Author  | Changes                            |
| ------- | ---------- | ------- | ---------------------------------- |
| 1.0     | 2025-01-27 | Initial | Created Form Validation Module PRD |
