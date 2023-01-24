import { useContext, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { useInterval } from 'shared/hooks';

import { LocationSdkContext, positionVar, useLocation } from '../model';

const DELAY = 3000;

const UpdateLocation = () => {
  const [appState, setAppState] = useState<AppStateStatus>();

  const { getPosition } = useLocation();
  const { isBackgroundReady, LocationsSdkService } = useContext(LocationSdkContext);

  const getBackgroundLocation = async () => {
    const locationData = await BackgroundGeolocation.getCurrentPosition({
      maximumAge: 3000,
      desiredAccuracy: 10,
      persist: true,
    });
    const location = {
      lat: locationData.coords.latitude,
      long: locationData.coords.longitude,
    };
    positionVar(location);
    LocationsSdkService?.updateLocation(location.lat, location.long);
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', async (state) => {
      setAppState(state);
    });
    return () => {
      appStateListener.remove();
    };
  }, []);

  useEffect(() => {
    const subscriptionHeartbeat = BackgroundGeolocation.onHeartbeat(() => {
      isBackgroundReady && getBackgroundLocation();
    });

    return () => {
      subscriptionHeartbeat.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBackgroundReady]);

  useInterval(() => {
    appState !== 'background' && getPosition();
  }, DELAY);

  return null;
};

export default UpdateLocation;
