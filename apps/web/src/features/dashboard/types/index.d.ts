// Dashboard feature types
// Only type declarations are allowed in .d.ts

export type ApplicationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "DOCUMENT_REQUEST"
  | "APPROVED"
  | "REJECTED"
  | "DISBURSED"
  | "CLOSED";

export type ProductType =
  | "BPKB_FINANCING"
  | "PROPERTY_FINANCING"
  | "AP_INVOICE_FINANCING"
  | "AR_INVOICE_FINANCING";

export interface Application {
  id: string;
  applicationId: string | null; // Format: #[number], null for drafts
  userId: string;
  productType: ProductType;
  status: ApplicationStatus;
  submissionDate: Date | null;
  currentStep: number;
  amountRequested: number | null;
  amountApproved: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMessages {
  title: string;
  welcome: string;
  applications: {
    title: string;
    description: string;
    startApplication: string;
  };
  bpkb: {
    title: string;
    description: string;
  };
  property: {
    title: string;
    description: string;
  };
  apInvoice: {
    title: string;
    description: string;
  };
  arInvoice: {
    title: string;
    description: string;
  };
  myApplications: {
    title: string;
    tabs: {
      all: string;
      drafts: string;
      underReview: string;
      reviewed: string;
    };
    drafts: {
      title: string;
      description: string;
      continue: string;
      empty: string;
    };
    underReview: {
      title: string;
      description: string;
      viewDetails: string;
      empty: string;
    };
    reviewed: {
      title: string;
      description: string;
      viewDetails: string;
      empty: string;
    };
    status: {
      draft: string;
      submitted: string;
      underReview: string;
      documentRequest: string;
      approved: string;
      rejected: string;
      disbursed: string;
      closed: string;
    };
  };
  forms: {
    steps: {
      registration: string;
      info: string;
      bpkbInfo: string;
      propertyInfo: string;
      documents: string;
      review: string;
    };
    common: {
      registration: {
        title: string;
        description: string;
      };
      documents: {
        title: string;
        method: {
          gdrive: string;
          manual: string;
        };
        gdrive: {
          label: string;
          placeholder: string;
          hint: string;
        };
        manual: {
          description: string;
          descriptionSingle: string;
          sections: {
            a: string;
            b: string;
            c: string;
            d: string;
            e: string;
          };
        };
      };
      review: {
        title: string;
        submit: string;
      };
      navigation: {
        previous: string;
        next: string;
      };
    };
    apInvoice: {
      title: string;
      subtitle: string;
      companyInfo: {
        title: string;
        description: string;
        namaPtCv: string;
        placeholder: string;
        eligibility: {
          title: string;
          items: string[];
        };
      };
      documents: {
        required: Array<{
          id: string;
          name: string;
          section: string;
        }>;
      };
      review: {
        companyInfo: string;
      };
    };
    arInvoice: {
      title: string;
      subtitle: string;
      companyInfo: {
        title: string;
        description: string;
        namaPtCv: string;
        placeholder: string;
        eligibility: {
          title: string;
          items: string[];
        };
      };
      documents: {
        required: Array<{
          id: string;
          name: string;
          section: string;
        }>;
      };
      review: {
        companyInfo: string;
      };
    };
    bpkb: {
      title: string;
      subtitle: string;
      bpkbInfo: {
        title: string;
        dataDiri: {
          title: string;
          namaLengkap: string;
          noKtp: string;
          noHp: string;
          usiaKonsumen: string;
          alamatSurvey: string;
          kelurahan: string;
          kecamatan: string;
        };
        dataKendaraan: {
          title: string;
          jenisKendaraan: string;
          merkKendaraan: string;
          tipeKendaraan: string;
          tahunKendaraan: string;
          noPlatKendaraan: string;
          atasNamaKendaraan: string;
          statusKendaraan: string;
          statusBpkb: string;
          statusPajak: string;
          asuransiKendaraan: string;
        };
        informasiPinjaman: {
          title: string;
          jumlahPinjaman: string;
          tenorPelunasan: string;
        };
      };
      documents: {
        required: Array<{
          id: string;
          name: string;
        }>;
      };
      review: {
        dataDiri: string;
        dataKendaraan: string;
      };
    };
    property: {
      title: string;
      subtitle: string;
      propertyInfo: {
        title: string;
        dataDiri: {
          title: string;
          namaKonsumen: string;
          noHp: string;
          alamatProperti: string;
          alamatLengkap: string;
          kecamatan: string;
          kota: string;
        };
        informasiProperti: {
          title: string;
          jenisSertifikat: string;
          danaDibutuhkan: string;
          kemampuanAngsuran: string;
          siapDisurvey: string;
          tanggalPengajuan: string;
          tanggalSubmission: string;
        };
      };
      documents: {
        required: Array<{
          id: string;
          name: string;
        }>;
      };
      review: {
        dataDiri: string;
        informasiProperti: string;
      };
    };
  };
}
