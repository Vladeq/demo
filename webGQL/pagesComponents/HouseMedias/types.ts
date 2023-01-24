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
  isLoaded?: boolean;
}

export enum FileCategory {
  AVATARS = 'AVATARS',
  APARTMENT_AD_MEDIA = 'APARTMENT_AD_MEDIA',
  CHAT_MEDIA = 'CHAT_MEDIA',
  APARTMENT_AD_DOCUMENTS = 'APARTMENT_AD_DOCUMENTS',
  IDENTITY_DOCUMENTS = 'IDENTITY_DOCUMENTS',
}
