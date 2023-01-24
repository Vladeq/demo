import * as Apollo from '@apollo/client';
import { Toaster } from 'entities';
import { useState } from 'react';
import { InteractionManager } from 'react-native';
import { getUniqueId } from 'react-native-device-info';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';

import { logout } from '../models';
import { useCustomerSignOut } from '../models/__generated__/customerSignOut.mutation';

export const logoutWithNavigation = async () => {
  try {
    await logout();
    Apollo.resetCaches();
    InteractionManager.runAfterInteractions(() => {
      NavigationService.reset([{ name: AppRoutes.SignInScreen }]);
    });
  } catch (e) {
    // TODO: remove console.log
    console.log('error on logoutWithNav');
  }
};

const useLogout = () => {
  const [isVisibleLogoutModal, setIsVisibleLogoutModal] = useState(false);
  const [isPendingLogout, setIsPendingLogout] = useState(false);
  const { showToast } = Toaster.useCallToast();
  const [customerSignOutGQL] = useCustomerSignOut();

  const onLogOut = async () => {
    try {
      setIsPendingLogout(true);
      const deviceId = await getUniqueId();
      customerSignOutGQL({ variables: { deviceId } });
      await logout();
      setIsVisibleLogoutModal(false);
      setIsPendingLogout(false);
      Apollo.resetCaches();
      InteractionManager.runAfterInteractions(() => {
        NavigationService.reset([{ name: AppRoutes.SignInScreen }]);
      });
    } catch (err) {
      // TODO: remove console.log
      console.log('error in LOGOUT', err);
      setIsPendingLogout(false);
      setIsVisibleLogoutModal(false);
      InteractionManager.runAfterInteractions(() => {
        showToast();
      });
    }
  };

  const onOpenLogoutModal = () => setIsVisibleLogoutModal(true);
  const onCloseLogoutModal = () => setIsVisibleLogoutModal(false);

  return { isVisibleLogoutModal, isPendingLogout, onLogOut, onOpenLogoutModal, onCloseLogoutModal };
};

export default useLogout;
