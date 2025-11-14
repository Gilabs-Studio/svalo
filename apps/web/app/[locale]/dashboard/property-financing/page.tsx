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
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Home, 
  FileText, 
  CheckCircle2, 
  Upload, 
  Link as LinkIcon,
  X,
  CreditCard
} from 'lucide-react';

interface PropertyFinancingPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function PropertyFinancingPage({ params }: PropertyFinancingPageProps) {
  const [locale, setLocale] = useState<Locale>('en');
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentMethod, setDocumentMethod] = useState<'gdrive' | 'manual'>('gdrive');
  const [manualDocuments, setManualDocuments] = useState<Record<string, File | null>>({});
  const [formData, setFormData] = useState({
    // Data Diri
    namaKonsumen: '',
    noHp: '',
    alamatProperti: '',
    alamatLengkap: '',
    kecamatan: '',
    kota: '',
    // Informasi Properti & Pinjaman
    jenisSertifikat: '',
    danaDibutuhkan: '',
    kemampuanAngsuran: '',
    siapDisurvey: '',
    tanggalPengajuan: new Date().toLocaleDateString('id-ID'),
    tanggalSubmission: '',
    // Documents
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    { id: 'fotoKtp', name: 'Foto KTP' },
    { id: 'sertifikatProperti', name: 'Sertifikat Properti (SHM/SHGB)' },
    { id: 'imb', name: 'IMB (Izin Mendirikan Bangunan)' },
    { id: 'pbb', name: 'PBB (Pajak Bumi dan Bangunan) Terbaru' },
    { id: 'buktiRekening', name: 'Bukti Rekening Listrik/Air' },
  ];

  const steps = [
    { number: 1, title: 'Registration', icon: User },
    { number: 2, title: 'Property Info', icon: Home },
    { number: 3, title: 'Documents', icon: FileText },
    { number: 4, title: 'Review', icon: CheckCircle2 },
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
                <Home className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">
                  Informasi Pengajuan Properti
                </h3>
              </div>
              <p className="text-muted-foreground">
                Lengkapi data diri, properti, dan pinjaman Anda.
              </p>
            </div>

            {/* Data Diri */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Data Diri</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="namaKonsumen">Nama Konsumen</Label>
                  <Input
                    id="namaKonsumen"
                    name="namaKonsumen"
                    value={formData.namaKonsumen}
                    onChange={handleInputChange}
                    placeholder="Contoh: John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noHp">No. HP</Label>
                  <Input
                    id="noHp"
                    name="noHp"
                    value={formData.noHp}
                    onChange={handleInputChange}
                    placeholder="Contoh: +6281234567890"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alamatProperti">Alamat Properti</Label>
                  <Input
                    id="alamatProperti"
                    name="alamatProperti"
                    value={formData.alamatProperti}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jl. Sudirman No. 123"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="alamatLengkap">Alamat Lengkap</Label>
                  <Textarea
                    id="alamatLengkap"
                    name="alamatLengkap"
                    value={formData.alamatLengkap}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kecamatan">Kecamatan</Label>
                  <Input
                    id="kecamatan"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Menteng"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kota">Kota</Label>
                  <Input
                    id="kota"
                    name="kota"
                    value={formData.kota}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jakarta Pusat"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Informasi Properti & Pinjaman */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b pb-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">
                  Informasi Properti & Pinjaman
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jenisSertifikat">Jenis Sertifikat</Label>
                  <Select
                    id="jenisSertifikat"
                    name="jenisSertifikat"
                    value={formData.jenisSertifikat}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih jenis sertifikat...</option>
                    <option value="SHM">SHM</option>
                    <option value="SHGB">SHGB</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="danaDibutuhkan">Dana Dibutuhkan</Label>
                  <Input
                    id="danaDibutuhkan"
                    name="danaDibutuhkan"
                    type="number"
                    value={formData.danaDibutuhkan}
                    onChange={handleInputChange}
                    placeholder="Contoh: 1000000000"
                    min={100000000}
                    max={5000000000}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kemampuanAngsuran">
                    Kemampuan Angsuran / Bulan
                  </Label>
                  <Input
                    id="kemampuanAngsuran"
                    name="kemampuanAngsuran"
                    type="number"
                    value={formData.kemampuanAngsuran}
                    onChange={handleInputChange}
                    placeholder="Contoh: 5000000"
                    min={1000000}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siapDisurvey">Siap Di-survey?</Label>
                  <Select
                    id="siapDisurvey"
                    name="siapDisurvey"
                    value={formData.siapDisurvey}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih...</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggalPengajuan">Tanggal Pengajuan</Label>
                  <Input
                    id="tanggalPengajuan"
                    name="tanggalPengajuan"
                    value={formData.tanggalPengajuan}
                    readOnly
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggalSubmission">Tanggal Submission</Label>
                  <Input
                    id="tanggalSubmission"
                    name="tanggalSubmission"
                    value={formData.tanggalSubmission}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>
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
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload dokumen satu per satu:
                  </p>
                  <div className="space-y-3">
                    {requiredDocuments.map((doc) => (
                      <div key={doc.id} className="space-y-2">
                        <Label htmlFor={doc.id}>{doc.name}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={doc.id}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileChange(doc.id, file);
                            }}
                            className="flex-1"
                          />
                          {manualDocuments[doc.id] && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                              <span className="truncate max-w-[150px]">
                                {manualDocuments[doc.id]?.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleFileChange(doc.id, null)}
                                className="text-destructive hover:text-destructive/80"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <User className="w-4 h-4" />
                  Data Diri
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Nama: {formData.namaKonsumen}</p>
                  <p>HP: {formData.noHp}</p>
                  <p>Alamat: {formData.alamatProperti}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Informasi Properti
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Jenis Sertifikat: {formData.jenisSertifikat}</p>
                  <p>Dana Dibutuhkan: {formData.danaDibutuhkan}</p>
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
                Property-Based Financing Application
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
