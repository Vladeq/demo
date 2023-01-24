import { ApartmentAdStatusType, ApartmentRentPeriodType, RentPeriodType } from '../../__generated__/types';
import { usePublishAdvertAsync } from '../../graphql/mutations/Advert/__generated__/publishAd.mutation';
import useChangeAdvertStatus from '../useChangeAdvertStatus';

function usePublishAdvert(id: string, periodType: RentPeriodType) {
  const { decrementCount, deleteAdvertFromCache } = useChangeAdvertStatus(id, ApartmentAdStatusType.Paused, periodType);
  const { incrementCount } = useChangeAdvertStatus(id, ApartmentAdStatusType.Published, periodType);

  const [publishAdvertFetch, { loading }] = usePublishAdvertAsync({
    variables: {
      input: {
        id,
        periodType: periodType as unknown as ApartmentRentPeriodType,
      },
    },
  });

  const publishAdvert = async () => {
    await publishAdvertFetch();
    await deleteAdvertFromCache();
    decrementCount();
    incrementCount();
  };

  return { publishAdvert, loading };
}

export default usePublishAdvert;
