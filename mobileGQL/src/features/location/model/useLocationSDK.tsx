import { useReactiveVar } from '@apollo/client';
import tokenVar from 'app/apollo/tokenVar';
import { isShowMeInAppVar } from 'entities/settings/models/useShowMeInApp';
import { LocationsSdk } from 'locations-sdk';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInterval } from 'shared/hooks';
import { LocationUsersType } from 'shared/types';

import { useGetLocationsServers } from './__generated__/getLocationsServers.query';

const useLocationSDK = () => {
  const [locationUsers, setLocationUsers] = useState<LocationUsersType[]>([]);
  const [usersIds, setUsersIds] = useState<string[]>([]);
  const [isNotCanBeInitiatedUserIds, setIsNotCanBeInitiatedUserIds] = useState<string[]>([]);

  const locationUsersRef = useRef<LocationUsersType[]>([]);
  const usersIdsRef = useRef<string[]>([]);

  const { data: params } = useGetLocationsServers();
  const token = useReactiveVar(tokenVar);
  const showMeOnMap = useReactiveVar(isShowMeInAppVar);

  useInterval(() => {
    setIsNotCanBeInitiatedUserIds((prev) => prev.filter((id) => usersIdsRef.current.includes(id)));
    setUsersIds([...usersIdsRef.current]);
    setLocationUsers([...locationUsersRef.current]);
  }, 3000);

  const setInitiateByCustomerId = useCallback((customerId: string) => {
    setIsNotCanBeInitiatedUserIds((prev) => [...prev, customerId]);
  }, []);

  const LocationsSdkService = useMemo(() => {
    if (params && token) {
      console.log('params', params);
      return new LocationsSdk({
        locationsServers: params.getLocationsServers,

        onMapChange(customers) {
          const customersIds = customers.map((customer) => customer.id);
          locationUsersRef.current = customers;
          usersIdsRef.current = customersIds;
        },

        onPreloadCustomers() {
          // console.log(Platform.OS, 'customerIds', customerIds);
        },

        // TODO: remove comments
        // onMovements({ movements }) {
        //   // TODO: remove log
        //   console.log('movements', movements);
        //   const movementIds = movements.map((movement) => movement.id);
        //   const otherUsers = locationUsersRef.current.filter((user) => !movementIds.includes(user.id));

        //   locationUsersRef.current = otherUsers.concat(movements);
        //   // setLocationUsers([...otherUsers, ...movements]);

        //   movementIds.forEach((id) => {
        //     if (!usersIdsRef.current.includes(id)) {
        //       // setUsersIds([...usersIdsRef.current, id]);
        //       usersIdsRef.current.push(id);
        //     }
        //   });
        // },

        // onMoveouts(customerIds) {
        //   // TODO: remove log
        //   console.log('move-outs', customerIds);
        //   const actualLocationUsers = locationUsersRef.current.filter(
        //     (user) => !customerIds.includes(user.id),
        //   );
        //   locationUsersRef.current = actualLocationUsers;
        //   // setLocationUsers(actualLocationUsers);

        //   const actualUsesIds = usersIdsRef.current.filter((id) => !customerIds.includes(id));
        //   usersIdsRef.current = actualUsesIds;
        //   // setUsersIds(actualUsesIds);

        //   setIsNotCanBeInitiatedUserIds((prev) => {
        //     const current = { ...prev };
        //     let isNeedToUpdate = false;
        //     customerIds.forEach((id) => {
        //       if (current[id]) {
        //         current[id] = false;
        //         isNeedToUpdate = true;
        //       }
        //     });
        //     return isNeedToUpdate ? current : prev;
        //   });
        // },

        showMeOnMap: showMeOnMap ?? true,

        token,
      });
    }
  }, [token, params, showMeOnMap]);

  useEffect(() => {
    return () => LocationsSdkService?.destroyConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, params, showMeOnMap]);

  return {
    LocationsSdkService,
    locationUsers,
    usersIds,
    isNotCanBeInitiatedUserIds,
    setInitiateByCustomerId,
  };
};

export default useLocationSDK;
