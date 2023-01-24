import { Toaster } from 'entities';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Platform } from 'react-native';
import Location from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, check, openSettings, request } from 'react-native-permissions';

import LocationSdkContext from './locationSdkContext';
import positionVar from './positionVar';

const IOS_PERMISSIONS_LOCATION = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
const ANDROID_PERMISSIONS_LOCATION = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
const ANDROID_PERMISSIONS_BACKGROUND_LOCATION = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;

const useLocation = () => {
  const { LocationsSdkService } = useContext(LocationSdkContext);

  // @ts-ignore
  const { t } = useTranslation('translation', {
    keyPrefix: 'features.location',
  });
  const { showToast } = Toaster.useCallToast();

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

  const askLocationPermissions = async (isNotRequest?: boolean) => {
    const permissions = Platform.OS === 'android' ? ANDROID_PERMISSIONS_LOCATION : IOS_PERMISSIONS_LOCATION;
    const permissionStatus = await check(permissions);
    switch (permissionStatus) {
      case RESULTS.DENIED:
        if (isNotRequest) {
          return false;
        } else {
          const res = await request(permissions);
          if (res === RESULTS.GRANTED || res === RESULTS.LIMITED) {
            return true;
          } else {
            return false;
          }
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

  const askBackgroundLocationPermission = async (isNotRequest?: boolean) => {
    const permissionStatus = await check(ANDROID_PERMISSIONS_BACKGROUND_LOCATION);
    switch (permissionStatus) {
      case RESULTS.DENIED:
        if (isNotRequest) {
          return false;
        } else {
          Alert.alert('Need background permission', 'Check "Allow all the time" for app work in background', [
            {
              text: 'OK',
              onPress: async () => {
                const res = await request(ANDROID_PERMISSIONS_BACKGROUND_LOCATION);
                console.log('res', res);
                if (res === RESULTS.GRANTED || res === RESULTS.LIMITED) {
                  return true;
                } else {
                  return false;
                }
              },
            },
          ]);
        }
        break;

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

  const getPermissions = async (isNotRequest?: boolean) => {
    try {
      const permission = await askLocationPermissions(isNotRequest);
      return permission;
    } catch (error) {
      // TODO: remove console.log
      console.log('error', error);
    }
  };

  const getCurrentPosition = () => {
    Location.getCurrentPosition(
      ({ coords }) => {
        const location = {
          lat: coords.latitude,
          long: coords.longitude,
        };
        positionVar(location);
        LocationsSdkService?.updateLocation(location.lat, location.long);
      },
      (error) => {
        console.log('error on get POSITION', error.code, error.message);
        showToast(error.message);
      },
      {
        enableHighAccuracy: true,
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        maximumAge: 3000,
      },
    );
  };

  return {
    getPermissions,
    askBackgroundLocationPermission,
    getPosition: getCurrentPosition,
  };
};

export default useLocation;
