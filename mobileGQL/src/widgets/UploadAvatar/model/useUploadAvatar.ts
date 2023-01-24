import { Toaster } from 'entities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RNFetchBlob from 'react-native-blob-util';
import { ActionSheetItemType } from 'shared/ui';

import { useGenerateUrl } from './__generated__/generateUrl.mutation';
import useGetPictureWithPermission from './useGetPictureWithPermission';

type UploadAvatarProps = {
  oldImageUrl?: string;
};

export const useUploadAvatar = ({ oldImageUrl = '' }: UploadAvatarProps) => {
  const [avatarImage, setAvatarImage] = useState(oldImageUrl);
  const [signedUrl, setSignedUrl] = useState(''); // Url for request to server
  const [isVisibleActionSheet, setIsVisibleActionSheet] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [generateUrl] = useGenerateUrl();

  const { getImage } = useGetPictureWithPermission();
  const { showToast } = Toaster.useCallToast();
  const { t } = useTranslation();

  // fix for sometimes lost cache data
  useEffect(() => {
    if (oldImageUrl) {
      setAvatarImage(oldImageUrl);
    }
  }, [oldImageUrl]);

  const onToggleModalVisible = () => {
    setIsVisibleActionSheet(!isVisibleActionSheet);
  };

  const onAddAvatar = async (isCamera?: boolean) => {
    try {
      setIsError(false);
      const image = await getImage(isCamera);

      if (image?.data) {
        setIsUploadingImage(true);
        setAvatarImage(image?.source.uri || '');
        const { data } = await generateUrl({ variables: { filename: image.filename } });
        if (data) {
          await RNFetchBlob.fetch(
            'PUT',
            data?.customerUploadPublicUrlGenerate.signedUrl,
            { 'Content-Type': 'application/octet-stream' },
            image.data.data,
          );
          setSignedUrl(data?.customerUploadPublicUrlGenerate.fileKey);
        }
      }
    } catch (error) {
      showToast(t('widgets.UploadAvatar.model.useGetPictureWithPermission.networkError'));
      setIsError(true);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const ACTION_SHEET_LIST: ActionSheetItemType[] = [
    { text: 'Take a photo', onPress: () => onAddAvatar(true) },
    { text: 'Open gallery', onPress: () => onAddAvatar(false) },
  ];

  const onDeleteAvatar = () => {
    setAvatarImage('');
    setSignedUrl('');
    setIsVisibleActionSheet(false);
  };

  return {
    avatarUrl: avatarImage,
    actionsModalList: ACTION_SHEET_LIST,
    isModalVisible: isVisibleActionSheet,
    onToggleModalVisible,
    onDeleteAvatar,
    signedUrl,
    isUploadingImage,
    isError,
  };
};

export default useUploadAvatar;
