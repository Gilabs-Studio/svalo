"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type Locale } from "@/i18n";
import { useAuthStore } from "@/features/auth/stores/useAuthStore";
import { AnimatedHeading } from "@/features/landing/components/animated-heading";
import { AnimatedText } from "@/features/landing/components/animated-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  User,
  CreditCard,
  Car,
  FileText,
  CheckCircle2,
  Upload,
  Link as LinkIcon,
  X,
} from "lucide-react";

interface BPKBFinancingPageProps {
  params: Promise<{ locale: Locale }>;
}

export default function BPKBFinancingPage({ params }: BPKBFinancingPageProps) {
  const [locale, setLocale] = useState<Locale>("en");
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [documentMethod, setDocumentMethod] = useState<"gdrive" | "manual">(
    "gdrive",
  );
  const [manualDocuments, setManualDocuments] = useState<
    Record<string, File | null>
  >({});
  const [formData, setFormData] = useState({
    // Data Diri
    namaLengkap: "",
    noKtp: "",
    noHp: "",
    usiaKonsumen: "",
    alamatSurvey: "",
    kelurahan: "",
    kecamatan: "",
    // Data Kendaraan
    jenisKendaraan: "",
    merkKendaraan: "",
    tipeKendaraan: "",
    tahunKendaraan: "",
    noPlatKendaraan: "",
    atasNamaKendaraan: "",
    statusKendaraan: "",
    statusBpkb: "",
    statusPajak: "",
    asuransiKendaraan: "",
    // Informasi Pinjaman
    jumlahPinjaman: "",
    tenorPelunasan: "",
    // Documents
    googleDriveUrl: "",
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    { id: "fotoKtp", name: "Foto KTP" },
    { id: "fotoBpkb", name: "Foto BPKB" },
    { id: "fotoStnk", name: "Foto STNK" },
    { id: "fotoKendaraanDepan", name: "Foto Kendaraan (Depan)" },
    { id: "fotoKendaraanBelakang", name: "Foto Kendaraan (Belakang)" },
    { id: "fotoKendaraanKanan", name: "Foto Kendaraan (Kanan)" },
    { id: "fotoKendaraanKiri", name: "Foto Kendaraan (Kiri)" },
  ];

  const steps = [
    { number: 1, title: "BPKB Info", icon: Car },
    { number: 2, title: "Documents", icon: FileText },
    { number: 3, title: "Review", icon: CheckCircle2 },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Data Diri */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Data Diri</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                  <Input
                    id="namaLengkap"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    placeholder="Contoh: John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noKtp">No. KTP</Label>
                  <Input
                    id="noKtp"
                    name="noKtp"
                    value={formData.noKtp}
                    onChange={handleInputChange}
                    placeholder="Contoh: 3201012345678901"
                    maxLength={16}
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
                  <Label htmlFor="usiaKonsumen">Usia Konsumen</Label>
                  <Input
                    id="usiaKonsumen"
                    name="usiaKonsumen"
                    type="number"
                    value={formData.usiaKonsumen}
                    onChange={handleInputChange}
                    placeholder="Contoh: 30"
                    min={21}
                    max={70}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="alamatSurvey">Alamat Survey</Label>
                  <Textarea
                    id="alamatSurvey"
                    name="alamatSurvey"
                    value={formData.alamatSurvey}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kelurahan">Kelurahan</Label>
                  <Input
                    id="kelurahan"
                    name="kelurahan"
                    value={formData.kelurahan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Menteng"
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
              </div>
            </div>

            {/* Data Kendaraan */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                <Car className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Data Kendaraan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jenisKendaraan">Jenis Kendaraan</Label>
                  <Select
                    id="jenisKendaraan"
                    name="jenisKendaraan"
                    value={formData.jenisKendaraan}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih jenis kendaraan...</option>
                    <option value="Motor">Motor</option>
                    <option value="Mobil">Mobil</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="merkKendaraan">Merk Kendaraan</Label>
                  <Input
                    id="merkKendaraan"
                    name="merkKendaraan"
                    value={formData.merkKendaraan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Honda, Toyota"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipeKendaraan">Tipe Kendaraan</Label>
                  <Input
                    id="tipeKendaraan"
                    name="tipeKendaraan"
                    value={formData.tipeKendaraan}
                    onChange={handleInputChange}
                    placeholder="Contoh: Civic, Avanza"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tahunKendaraan">Tahun Kendaraan</Label>
                  <Input
                    id="tahunKendaraan"
                    name="tahunKendaraan"
                    type="number"
                    value={formData.tahunKendaraan}
                    onChange={handleInputChange}
                    placeholder="Contoh: 2020"
                    min={2000}
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noPlatKendaraan">No. Plat Kendaraan</Label>
                  <Input
                    id="noPlatKendaraan"
                    name="noPlatKendaraan"
                    value={formData.noPlatKendaraan}
                    onChange={handleInputChange}
                    placeholder="Contoh: B 1234 ABC"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="atasNamaKendaraan">Atas Nama Kendaraan</Label>
                  <Input
                    id="atasNamaKendaraan"
                    name="atasNamaKendaraan"
                    value={formData.atasNamaKendaraan}
                    onChange={handleInputChange}
                    placeholder="Contoh: John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statusKendaraan">Status Kendaraan</Label>
                  <Select
                    id="statusKendaraan"
                    name="statusKendaraan"
                    value={formData.statusKendaraan}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih status...</option>
                    <option value="Pribadi">Pribadi</option>
                    <option value="Perusahaan">Perusahaan</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statusBpkb">Status BPKB</Label>
                  <Select
                    id="statusBpkb"
                    name="statusBpkb"
                    value={formData.statusBpkb}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih status...</option>
                    <option value="Asli">Asli</option>
                    <option value="Copy">Copy</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statusPajak">Status Pajak</Label>
                  <Select
                    id="statusPajak"
                    name="statusPajak"
                    value={formData.statusPajak}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih status...</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Belum Lunas">Belum Lunas</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="asuransiKendaraan">Asuransi Kendaraan</Label>
                  <Select
                    id="asuransiKendaraan"
                    name="asuransiKendaraan"
                    value={formData.asuransiKendaraan}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih status...</option>
                    <option value="Ada">Ada</option>
                    <option value="Tidak Ada">Tidak Ada</option>
                  </Select>
                </div>
              </div>
            </div>

            {/* Informasi Pinjaman */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">Informasi Pinjaman</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="jumlahPinjaman">Jumlah Pinjaman</Label>
                  <Input
                    id="jumlahPinjaman"
                    name="jumlahPinjaman"
                    type="number"
                    value={formData.jumlahPinjaman}
                    onChange={handleInputChange}
                    placeholder="Contoh: 50000000"
                    min={10000000}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenorPelunasan">Tenor Pelunasan</Label>
                  <Select
                    id="tenorPelunasan"
                    name="tenorPelunasan"
                    value={formData.tenorPelunasan}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih tenor...</option>
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border/30 pb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Documents</h3>
            </div>

            {/* Document Method Selection */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={documentMethod === "gdrive" ? "default" : "outline"}
                  onClick={() => setDocumentMethod("gdrive")}
                  className="flex-1"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Google Drive Link
                </Button>
                <Button
                  type="button"
                  variant={documentMethod === "manual" ? "default" : "outline"}
                  onClick={() => setDocumentMethod("manual")}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Manual
                </Button>
              </div>

              {documentMethod === "gdrive" ? (
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
                    Pastikan link memiliki izin viewing (Siapa saja yang
                    memiliki link)
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

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border/30 pb-3">
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
                  <p>Nama: {formData.namaLengkap}</p>
                  <p>KTP: {formData.noKtp}</p>
                  <p>HP: {formData.noHp}</p>
                  <p>Usia: {formData.usiaKonsumen}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  Data Kendaraan
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Jenis: {formData.jenisKendaraan}</p>
                  <p>Merk: {formData.merkKendaraan}</p>
                  <p>Tipe: {formData.tipeKendaraan}</p>
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
            <div className="overflow-visible">
              <AnimatedHeading
                as="h1"
                className="text-4xl md:text-5xl font-black tracking-tight break-words"
              >
                BPKB Financing Application
              </AnimatedHeading>
            </div>
            <div className="overflow-visible">
              <AnimatedText delay={0.1} className="text-muted-foreground">
                Follow the steps below to complete your application.
              </AnimatedText>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center gap-2 border-b border-border/30 pb-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 ${
                      isActive || isCompleted
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground scale-110"
                          : isCompleted
                            ? "bg-primary/20 text-primary"
                            : "bg-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium ml-2">
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-px w-12 sm:w-16 mx-2 transition-colors ${
                        isCompleted ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="min-w-[100px]"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              disabled={currentStep === 3}
              className="min-w-[100px]"
            >
              {currentStep === 3 ? "Submit Application" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
