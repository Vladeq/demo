import { useTranslation } from 'react-i18next';
import { Alert, Platform } from 'react-native';
import ImagePicker, { Image, Options } from 'react-native-image-crop-picker';
import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions';

const RESIZED_IMAGE_WIDTH = 400;
const RESIZED_IMAGE_HEIGHT = 400;

const IOS_PERMISSIONS_PHOTO_LIBRARY = PERMISSIONS.IOS.PHOTO_LIBRARY;
const IOS_PERMISSIONS_CAMERA = PERMISSIONS.IOS.CAMERA;
const ANDROID_PERMISSIONS = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

const useGetPictureWithPermission = () => {
  // @ts-ignore
  const { t } = useTranslation('translation', {
    keyPrefix: 'widgets.UploadAvatar.model.useGetPictureWithPermission',
  });

  const permissionsRejection = () => {
    Alert.alert(
      t('alert.title'),
      t('alert.description'),
      [
        { text: t('alert.close') },
        {
          text: t('alert.settings'),
          onPress: openSettings,
        },
      ],
      { cancelable: false },
    );
  };

  const askPermissionForGettingImage = async (isCamera?: boolean) => {
    const permissions =
      Platform.OS === 'android'
        ? ANDROID_PERMISSIONS
        : isCamera
        ? IOS_PERMISSIONS_CAMERA
        : IOS_PERMISSIONS_PHOTO_LIBRARY;

    const permissionStatus = await check(permissions);
    switch (permissionStatus) {
      case RESULTS.DENIED:
        const res = await request(permissions);
        if (res === RESULTS.GRANTED) {
          return true;
        } else if (res === RESULTS.LIMITED) {
          return true;
        } else {
          console.log('Photo access blocked');
          return false;
        }
      case RESULTS.LIMITED:
      case RESULTS.GRANTED:
        return true;
      case RESULTS.BLOCKED:
        permissionsRejection();
        return false;
      default:
        return false;
    }
  };

  const getImage = async (isCamera?: boolean) => {
    const imagePickerOptions: Options = {
      width: RESIZED_IMAGE_WIDTH,
      height: RESIZED_IMAGE_HEIGHT,
      mediaType: 'photo',
      includeBase64: true,
      cropperToolbarTitle: t('cropperToolbarTitle'),
    };

    try {
      const permission = await askPermissionForGettingImage(isCamera);
      const { openCamera, openPicker } = ImagePicker;

      if (!permission) {
        return;
      }

      let image;
      if (Platform.OS === 'android') {
        const pickedImage = isCamera
          ? await openCamera({ ...imagePickerOptions })
          : await openPicker({ ...imagePickerOptions });

        image = await ImagePicker.openCropper({
          ...imagePickerOptions,
          path: pickedImage.path,
          includeBase64: true,
        });
      } else {
        const imageOptions = {
          ...imagePickerOptions,
          cropping: true,
          maxFiles: 1,
          includeBase64: true,
        };

        const setDelay = (onOpenImagePicker: () => any) => {
          let promise = new Promise<Image>((resolve) => {
            setTimeout(async () => {
              try {
                image = await onOpenImagePicker();
                resolve(image);
              } catch (e) {}
            }, 10);
          });
          return promise;
        };
        image = isCamera
          ? await setDelay(() => openCamera(imageOptions))
          : await setDelay(() => openPicker(imageOptions));
      }

      const splitedFilename = image.path.split('/');
      const filename = splitedFilename[splitedFilename.length - 1];
      if (filename && image) {
        const photo = { source: { uri: `data:${image.mime};base64,${image.data}` }, data: image, filename };
        return photo;
      }
      return null;
    } catch (error) {
      console.log('error', error);
    }
  };

  return { getImage };
};

export default useGetPictureWithPermission;
