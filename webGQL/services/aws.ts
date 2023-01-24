import axios from 'axios';

import httpClient from './http';

type getSignedUrlProps = {
  fileName: string;
  fileCategory: string;
  signal?: AbortSignal;
  advertId?: string;
  chatId?: string;
};

class Aws {
  getSignedUrl = async ({ fileName, fileCategory, signal, advertId = '', chatId = '' }: getSignedUrlProps) => {
    const apartmentAdId = advertId !== '' ? `&apartmentAdId=${advertId}` : '';
    const chatIdQuery = chatId !== '' ? `&chatId=${chatId}` : '';
    const url = `aws/signed-url?fileName=${fileName}&fileCategory=${fileCategory}${apartmentAdId}${chatIdQuery}`;

    const res = await httpClient.get(url, { signal });

    return res.data;
  };

  loadToBucket = async (url: string, file: File, signal?: AbortSignal) => {
    return await axios.put(`${url}`, file, {
      signal,
    });
  };

  deleteFromBucket = async (fileKey: string, fileCategory: string) => {
    try {
      return await httpClient.delete(`aws/delete-s3-file?fileKey=${fileKey}&fileCategory=${fileCategory}`);
    } catch (e) {
      console.log(e, 'error from delete attachment');
    }
  };
}

export default new Aws();
