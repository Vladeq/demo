import { ApartmentAdStatusType, ApartmentRentPeriodType, RentPeriodType } from '../../__generated__/types';
import { useStopAdvert } from '../../graphql/mutations/Advert/__generated__/stopAdvert.mutation.gql';
import useChangeAdvertStatus from '../useChangeAdvertStatus';

const usePauseAdvert = (periodType: RentPeriodType, id: string) => {
  const [stopAdvertAsync, { loading }] = useStopAdvert();

  const { incrementCount, decrementCount, deleteAdvertFromCache, addAdvertFromCache } = useChangeAdvertStatus(
    id,
    ApartmentAdStatusType.Published,
    periodType,
  );

  const changeAdvertStatus = async () => {
    await stopAdvertAsync({
      variables: {
        input: {
          id,
          periodType: periodType as unknown as ApartmentRentPeriodType,
        },
      },
    });
  };

  return { changeAdvertStatus, deleteAdvertFromCache, addAdvertFromCache, decrementCount, incrementCount, loading };
};
export default usePauseAdvert;
