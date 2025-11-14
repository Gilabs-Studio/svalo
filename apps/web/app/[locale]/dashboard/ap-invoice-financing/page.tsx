'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/i18n';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { AnimatedHeading } from '@/features/landing/components/animated-heading';
import { AnimatedText } from '@/features/landing/components/animated-text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Upload, 
  Link as LinkIcon,
  X,
  Check
} from 'lucide-react';

interface APInvoiceFinancingPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function APInvoiceFinancingPage({ params }: APInvoiceFinancingPageProps) {
  const [locale, setLocale] = useState<Locale>('en');
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentMethod, setDocumentMethod] = useState<'gdrive' | 'manual'>('gdrive');
  const [manualDocuments, setManualDocuments] = useState<Record<string, File | null>>({});
  const [formData, setFormData] = useState({
    namaPtCv: '',
    googleDriveUrl: '',
  });

  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/auth/login`);
    }
  }, [isAuthenticated, locale, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (docName: string, file: File | null) => {
    setManualDocuments({
      ...manualDocuments,
      [docName]: file,
    });
  };

  const requiredDocuments = [
    { id: 'aktaPendirian', name: 'Akta Pendirian & Perubahan', section: 'A' },
    { id: 'skMenkumham', name: 'SK Menkumham, NPWP PT', section: 'A' },
    { id: 'ktpNpwpPengurus', name: 'KTP & NPWP Pengurus', section: 'A' },
    { id: 'nibIzin', name: 'NIB & izin pendukung', section: 'A' },
    { id: 'companyProfile', name: 'Company Profile', section: 'A' },
    { id: 'laporanKeuangan', name: 'Laporan Keuangan 2 Tahun + YTD', section: 'B' },
    { id: 'mutasiRekening', name: 'Mutasi Rekening 6 Bulan', section: 'B' },
    { id: 'poCustomer', name: 'PO Customer (3 sample)', section: 'C' },
    { id: 'invoiceCustomer', name: 'Invoice Customer (3 sample)', section: 'C' },
    { id: 'historyInvoice', name: 'History invoice paid (3 sample)', section: 'C' },
    { id: 'ktpPasangan', name: 'KTP + KTP Pasangan, KK', section: 'D' },
    { id: 'aktaNikah', name: 'Akta Nikah', section: 'D' },
    { id: 'listSupplier', name: 'List Supplier & Customer', section: 'E' },
    { id: 'kontakPerson', name: 'Kontak Person (Email, No HP, PIC)', section: 'E' },
  ];

  const steps = [
    { number: 1, title: 'Registration', icon: User },
    { number: 2, title: 'Company Info', icon: Building2 },
    { number: 3, title: 'Documents', icon: FileText },
    { number: 4, title: 'Review', icon: CheckCircle2 },
  ];

  const eligibilityRequirements = [
    'Based in Jabodetabek',
    'Corporate only (PT/CV)',
    'Minimum 2 years in operation',
    'Financing Range: IDR 500M – IDR 2B',
    'Must have positive financial report',
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <User className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">Registration</h3>
              <p className="text-muted-foreground">
                You are logged in. Proceed to the next step.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Company Information</h3>
              </div>
              <p className="text-muted-foreground">
                Please provide your company's legal name.
              </p>
              <div className="space-y-2">
                <Label htmlFor="namaPtCv">Nama PT/CV</Label>
                <Input
                  id="namaPtCv"
                  name="namaPtCv"
                  value={formData.namaPtCv}
                  onChange={handleInputChange}
                  placeholder="Contoh: PT. Example Company"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Eligibility Requirements</h3>
              </div>
              <ul className="space-y-3">
                {eligibilityRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Documents</h3>
            </div>
            
            {/* Document Method Selection */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={documentMethod === 'gdrive' ? 'default' : 'outline'}
                  onClick={() => setDocumentMethod('gdrive')}
                  className="flex-1"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Google Drive Link
                </Button>
                <Button
                  type="button"
                  variant={documentMethod === 'manual' ? 'default' : 'outline'}
                  onClick={() => setDocumentMethod('manual')}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Manual
                </Button>
              </div>

              {documentMethod === 'gdrive' ? (
                <div className="space-y-2">
                  <Label htmlFor="googleDriveUrl">Google Drive URL</Label>
                  <Input
                    id="googleDriveUrl"
                    name="googleDriveUrl"
                    type="url"
                    value={formData.googleDriveUrl}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/drive/folders/..."
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Pastikan link memiliki izin viewing (Siapa saja yang memiliki link)
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    Upload dokumen sesuai kategori:
                  </p>
                  
                  {['A', 'B', 'C', 'D', 'E'].map((section) => {
                    const sectionDocs = requiredDocuments.filter((doc) => doc.section === section);
                    if (sectionDocs.length === 0) return null;
                    
                    return (
                      <div key={section} className="space-y-3">
                        <h4 className="font-semibold text-sm">
                          {section === 'A' && 'A. Perusahaan'}
                          {section === 'B' && 'B. Keuangan'}
                          {section === 'C' && 'C. Dokumen PO & Invoice'}
                          {section === 'D' && 'D. Personal Guarantee'}
                          {section === 'E' && 'E. Lain-lain'}
                        </h4>
                        <div className="space-y-3 ml-4">
                          {sectionDocs.map((doc) => (
                            <div key={doc.id} className="space-y-2">
                              <Label htmlFor={doc.id} className="text-sm">{doc.name}</Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id={doc.id}
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    handleFileChange(doc.id, file);
                                  }}
                                  className="flex-1 text-sm"
                                />
                                {manualDocuments[doc.id] && (
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                    <span className="truncate max-w-[120px]">
                                      {manualDocuments[doc.id]?.name}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleFileChange(doc.id, null)}
                                      className="text-destructive hover:text-destructive/80"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b pb-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Review</h3>
            </div>
            <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company Information
                </h4>
                <div className="text-sm text-muted-foreground">
                  <p>Nama PT/CV: {formData.namaPtCv}</p>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg">
              Submit Application
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="overflow-hidden">
              <AnimatedHeading
                as="h1"
                className="text-4xl md:text-5xl font-black tracking-tight break-words"
              >
                AP Invoice Financing Application
              </AnimatedHeading>
            </div>
            <div className="overflow-hidden">
              <AnimatedText
                delay={0.1}
                className="text-muted-foreground"
              >
                Follow the steps below to complete your application.
              </AnimatedText>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-between border-b pb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className={`flex items-center gap-2 ${
                    currentStep >= step.number ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step.number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className="hidden md:inline text-sm font-medium">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="bg-card border border-border rounded-lg p-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={currentStep === 4}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
