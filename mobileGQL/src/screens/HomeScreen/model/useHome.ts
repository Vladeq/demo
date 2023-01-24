import { Toaster } from 'entities';
import { Location, SwitchHomeTabs } from 'features';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState } from 'react-native';
import { useCustomerGetByIdsLazyQuery } from 'shared/qraphql/mututions/__generated__/customerGetByIds.query';

const useHome = () => {
  const [isRefreshUsers, setIsRefreshUsers] = useState(false);

  const { activeTab, onToggleTab } = SwitchHomeTabs.useSwitchHomeTabs();
  const { getPermissions } = Location.useLocation();

  const IsMapTab = activeTab === SwitchHomeTabs.HomeTabsEnum.MAP_TAB;

  const { locationUsers, usersIds, isHasPermissions, setIsHasPermissions } = useContext(
    Location.LocationSdkContext,
  );

  const [customerGetByIds, { data: users, previousData: previousUsers }] = useCustomerGetByIdsLazyQuery({
    variables: { customerIds: usersIds },
    onError: ({ networkError, message }) => {
      setIsRefreshUsers(false);
      if (networkError) {
        showToast(t('screens.Home.networkError'));
      } else {
        showToast(message); //Todo change text
      }
    },
    onCompleted: () => setIsRefreshUsers(false),
  });

  // // reload users every 3 seconds for actual info about users
  // useEffect(() => {
  //   customerGetByIds({ variables: { customerIds: usersIds } });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [usersIds]);

  const usersAsPins = locationUsers?.map((locationUserItem) => {
    const userAvatar = users?.customerGetByIds?.find(
      (userItem) => locationUserItem.id === userItem.id,
    )?.avatar;
    const previousAvatar = previousUsers?.customerGetByIds.find(
      (prevUserItem) => locationUserItem.id === prevUserItem.id,
    )?.avatar;
    return { ...locationUserItem, ...{ avatarImage: userAvatar?.imageUrl || previousAvatar?.imageUrl } };
  });

  const { t } = useTranslation();
  const { showToast } = Toaster.useCallToast();

  const onGetUsers = () => {
    setIsRefreshUsers(true);
    customerGetByIds();
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', async (state) => {
      if (state === 'active') {
        const permissionResult = await getPermissions(true);
        setIsHasPermissions(Boolean(permissionResult));
      }
    });
    return () => appStateListener.remove();
  }, [getPermissions, setIsHasPermissions]);

  useEffect(() => {
    if (isHasPermissions) {
      onGetUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHasPermissions]);

  return {
    activeTab,
    onToggleTab,
    isHasPermissions,
    IsMapTab,
    isRefreshUsers,
    usersAsPins,
    users: users ? users.customerGetByIds : previousUsers?.customerGetByIds,
    onGetUsers,
  };
};

export default useHome;
