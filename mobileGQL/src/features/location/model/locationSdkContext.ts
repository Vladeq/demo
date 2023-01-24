import { LocationsSdk } from 'locations-sdk';
import { createContext } from 'react';
import { LocationUsersType } from 'shared/types';
interface DefaultValuesInterface {
  LocationsSdkService: LocationsSdk | null | undefined;
  locationUsers: LocationUsersType[] | null;
  usersIds: string[] | null;
  isHasPermissions: boolean | null;
  setIsHasPermissions: (isHasPermissions: boolean) => void;
  isNotCanBeInitiatedUserIds: string[];
  setInitiateByCustomerId: (customerId: string) => void;
  isBackgroundReady: boolean;
}

const contextDefaultValues: DefaultValuesInterface = {
  LocationsSdkService: null,
  locationUsers: null,
  usersIds: null,
  isHasPermissions: null,
  setIsHasPermissions: () => {},
  isNotCanBeInitiatedUserIds: [],
  setInitiateByCustomerId: () => {},
  isBackgroundReady: false,
};

const LocationSdkContext = createContext(contextDefaultValues);

export default LocationSdkContext;

// TODO: refactor LocationSdkProvider from main-tab-nav to here, but need permissions-location-provider отделить в отдельный контекст, так как циклическая зависимость появляется
// interface LocationSdkProviderProps {
//   children?: ReactNode;
// }

// export const LocationSdkProvider: FC<LocationSdkProviderProps> = ({ children }) => {
//   const {
//     locationUsers,
//     LocationsSdkService,
//     usersIds,
//     isNotCanBeInitiatedUserIds,
//     setInitiateByCustomerId,
//   } = useLocationSDK();
// const [isHasPermissions, setIsHasPermissions] = useState(false);

// const { getPermissions } = useLocation();

// useEffect(() => {
//   const initLocationPermissions = async () => {
//     const permissionResult = await getPermissions();
//     setIsHasPermissions(Boolean(permissionResult));
//   };
//   initLocationPermissions();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

//   return (
//     <LocationSdkContext.Provider
//       value={{
//         LocationsSdkService,
//         locationUsers,
//         usersIds,
//         isHasPermissions,
//         setIsHasPermissions,
//         isNotCanBeInitiatedUserIds,
//         setInitiateByCustomerId,
//       }}>
//       {children}
//     </LocationSdkContext.Provider>
//   );
// };
