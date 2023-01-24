import { useState } from 'react';

import { AttachmentTypes, FileCategory } from '../../pagesComponents/HouseMedias/types';
import Aws from '../../services/aws';

const useLoadFile = (fileCategory: FileCategory) => {
  const [attachment, setAttachment] = useState<AttachmentTypes>();

  const toggleLoadingForAttachment = () => {
    if (attachment) {
      setAttachment({
        ...attachment,
        isLoading: !attachment.isLoading,
      });
    }
  };

  const loadFile = async (
    file: File,
    fileCategory: string,
    id: string,
    signal = {} as AbortSignal,
    advertId: string = '',
  ): Promise<AttachmentTypes> => {
    let attachment;
    try {
      const signedUrl = await Aws.getSignedUrl({ fileName: file.name, fileCategory, signal, advertId });
      const { pathname } = new URL(signedUrl);
      await Aws.loadToBucket(signedUrl, file, signal);
      attachment = {
        id,
        fileKey: pathname,
        file,
        signedUrl,
        category: fileCategory,
        isLoading: false,
        isError: false,
      };
    } catch (e) {
      attachment = {
        id,
        file,
        category: fileCategory,
        isLoading: false,
        isError: true,
      };
    }

    setAttachment(attachment);
    return attachment;
  };

  const deleteAttachment = async (fileKey: string) => {
    try {
      await Aws.deleteFromBucket(fileKey, fileCategory);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  return {
    load: loadFile,
    attachment,
    toggleLoadingForAttachment,
    deleteAttachment,
  };
};

export default useLoadFile;
