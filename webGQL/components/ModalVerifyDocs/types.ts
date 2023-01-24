export interface FileTypes extends File {
  url?: string;
}

export interface AttachmentTypes {
  id: string;
  file: FileTypes;
  isError: boolean;
  isLoading: boolean;
  category?: string;
  signedUrl?: string;
  fileKey?: string;
}

export enum FileCategory {
  APARTMENT_AD_DOCUMENTS = 'APARTMENT_AD_DOCUMENTS',
  IDENTITY_DOCUMENTS = 'IDENTITY_DOCUMENTS',
}
