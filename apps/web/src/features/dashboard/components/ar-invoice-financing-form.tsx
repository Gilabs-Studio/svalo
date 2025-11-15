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
import { getMessages } from '../lib/get-messages';
import { 
  Building2, 
  FileText, 
  CheckCircle2, 
  Upload, 
  Link as LinkIcon,
  X,
  Check
} from 'lucide-react';

interface ARInvoiceFinancingFormProps {
  readonly locale: Locale;
}

export function ARInvoiceFinancingForm({ locale }: ARInvoiceFinancingFormProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const messages = getMessages(locale);
  const t = messages.forms.arInvoice;
  const common = messages.forms.common;
  const stepsConfig = messages.forms.steps;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [documentMethod, setDocumentMethod] = useState<'gdrive' | 'manual'>('gdrive');
  const [manualDocuments, setManualDocuments] = useState<Record<string, File | null>>({});
  const [formData, setFormData] = useState({
    namaPtCv: '',
    googleDriveUrl: '',
  });

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

  const requiredDocuments = t.documents.required;
  const steps = [
    { number: 1, title: stepsConfig.info, icon: Building2 },
    { number: 2, title: stepsConfig.documents, icon: FileText },
    { number: 3, title: stepsConfig.review, icon: CheckCircle2 },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">{t.companyInfo.title}</h3>
              </div>
              <p className="text-muted-foreground">
                {t.companyInfo.description}
              </p>
              <div className="space-y-2">
                <Label htmlFor="namaPtCv">{t.companyInfo.namaPtCv}</Label>
                <Input
                  id="namaPtCv"
                  name="namaPtCv"
                  value={formData.namaPtCv}
                  onChange={handleInputChange}
                  placeholder={t.companyInfo.placeholder}
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold">{t.companyInfo.eligibility.title}</h3>
              </div>
              <ul className="space-y-3">
                {t.companyInfo.eligibility.items.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border/30 pb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">{common.documents.title}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={documentMethod === 'gdrive' ? 'default' : 'outline'}
                  onClick={() => setDocumentMethod('gdrive')}
                  className="flex-1"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  {common.documents.method.gdrive}
                </Button>
                <Button
                  type="button"
                  variant={documentMethod === 'manual' ? 'default' : 'outline'}
                  onClick={() => setDocumentMethod('manual')}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {common.documents.method.manual}
                </Button>
              </div>

              {documentMethod === 'gdrive' ? (
                <div className="space-y-2">
                  <Label htmlFor="googleDriveUrl">{common.documents.gdrive.label}</Label>
                  <Input
                    id="googleDriveUrl"
                    name="googleDriveUrl"
                    type="url"
                    value={formData.googleDriveUrl}
                    onChange={handleInputChange}
                    placeholder={common.documents.gdrive.placeholder}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {common.documents.gdrive.hint}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-sm text-muted-foreground">
                    {common.documents.manual.description}
                  </p>
                  
                  {['A', 'B', 'C', 'D', 'E'].map((section) => {
                    const sectionDocs = requiredDocuments.filter((doc) => doc.section === section);
                    if (sectionDocs.length === 0) return null;
                    
                    return (
                      <div key={section} className="space-y-3">
                        <h4 className="font-semibold text-sm">
                          {section === 'A' && common.documents.manual.sections.a}
                          {section === 'B' && common.documents.manual.sections.b}
                          {section === 'C' && common.documents.manual.sections.c}
                          {section === 'D' && common.documents.manual.sections.d}
                          {section === 'E' && common.documents.manual.sections.e}
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

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-border/30 pb-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">{common.review.title}</h3>
            </div>
            <div className="space-y-4 bg-muted/30 p-6 rounded-lg">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {t.review.companyInfo}
                </h4>
                <div className="text-sm text-muted-foreground">
                  <p>{t.companyInfo.namaPtCv}: {formData.namaPtCv}</p>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg">
              {common.review.submit}
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
          <div className="space-y-4">
            <div className="overflow-visible">
              <AnimatedHeading
                as="h1"
                className="text-4xl md:text-5xl font-black tracking-tight break-words"
              >
                {t.title}
              </AnimatedHeading>
            </div>
            <div className="overflow-visible">
              <AnimatedText
                delay={0.1}
                className="text-muted-foreground"
              >
                {t.subtitle}
              </AnimatedText>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 border-b border-border/30 pb-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 ${
                      isActive || isCompleted ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-primary text-primary-foreground scale-110'
                          : isCompleted
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted'
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
                        isCompleted ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm">
            {renderStepContent()}
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="min-w-[100px]"
            >
              {common.navigation.previous}
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
              disabled={currentStep === 3}
              className="min-w-[100px]"
            >
              {currentStep === 3 ? common.review.submit : common.navigation.next}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


