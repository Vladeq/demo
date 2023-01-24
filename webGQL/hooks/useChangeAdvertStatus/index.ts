import { client } from 'libs';
import { CardStatusEnum } from 'types';

import {
  ApartmentAdLongTermRentModel,
  ApartmentAdShortTermRentModel,
  ApartmentAdStatusType,
  MyApartmentAdStatusCountResponse,
  RentPeriodType,
} from '../../__generated__/types';
import { getMyAdsStatusCountDocument } from '../../graphql/queries/MyAds/__generated__/getMyAdsStatusCount.query';
import { getMyApartmentAdsDocument } from '../../graphql/queries/MyAds/__generated__/getMyApartmentAds.query';

const useChangeAdvertStatus = (id: string, advertStatus: ApartmentAdStatusType, rentType: RentPeriodType) => {
  const mappingCountTypes = {
    [ApartmentAdStatusType.Published]: CardStatusEnum.PUBLISHED,
    [ApartmentAdStatusType.Paused]: CardStatusEnum.PAUSED,
    [ApartmentAdStatusType.Processing]: CardStatusEnum.PROCESSING,
    [ApartmentAdStatusType.Active]: CardStatusEnum.ACTIVE,
    [ApartmentAdStatusType.Draft]: CardStatusEnum.DRAFT,
  };

  const countType = mappingCountTypes[advertStatus];

  const readAllAdverts = async () => {
    const data = await client.readQuery({
      query: getMyApartmentAdsDocument,
      variables: { input: { status: advertStatus } },
    });
    const shortTermAds = data.apartmentAd__myApartmentAd_unionRentPeriods.apartmentAdShortTermRent;
    const longTermAds = data.apartmentAd__myApartmentAd_unionRentPeriods.apartmentAdLongTermRent;
    return {
      shortTermAds,
      longTermAds,
    };
  };

  const changePaymentMethod = async () => {
    const { shortTermAds, longTermAds } = await readAllAdverts();
    let newAds;
    let currentAdvert: ApartmentAdShortTermRentModel;

    if (rentType === RentPeriodType.ShortTerm) {
      currentAdvert = shortTermAds.find((ad: ApartmentAdShortTermRentModel) => ad.apartmentAdId === id);
      currentAdvert = { ...currentAdvert, apartmentAd: { ...currentAdvert.apartmentAd, innopayCardId: 'true' } };
      newAds = {
        apartmentAdLongTermRent: longTermAds,
        apartmentAdShortTermRent: shortTermAds.map((elem: ApartmentAdShortTermRentModel) => {
          if (elem.apartmentAdId === id) {
            elem = currentAdvert;
          }
          return elem;
        }),
      };
    } else {
      currentAdvert = longTermAds.find((ad: ApartmentAdShortTermRentModel) => ad.apartmentAdId === id);
      currentAdvert = { ...currentAdvert, apartmentAd: { ...currentAdvert.apartmentAd, innopayCardId: 'true' } };
      newAds = {
        apartmentAdLongTermRent: longTermAds.map((elem: ApartmentAdShortTermRentModel) => {
          if (elem.apartmentAdId === id) {
            elem = currentAdvert;
          }
          return elem;
        }),
        apartmentAdShortTermRent: shortTermAds,
      };
    }

    await client.writeQuery({
      query: getMyApartmentAdsDocument,
      variables: { input: { status: advertStatus } },
      data: {
        apartmentAd__myApartmentAd_unionRentPeriods: {
          ...newAds,
        },
      },
    });

    return currentAdvert;
  };

  const deleteAdvertFromCache = async () => {
    const { shortTermAds, longTermAds } = await readAllAdverts();
    let newAds;
    let currentAdvert;

    if (rentType === RentPeriodType.ShortTerm) {
      currentAdvert = shortTermAds.find((ad: ApartmentAdShortTermRentModel) => ad.apartmentAdId === id);
      newAds = {
        apartmentAdLongTermRent: longTermAds,
        apartmentAdShortTermRent: shortTermAds.filter(
          (elem: ApartmentAdShortTermRentModel) => elem.apartmentAdId !== id,
        ),
      };
    } else {
      currentAdvert = longTermAds.find((ad: ApartmentAdShortTermRentModel) => ad.apartmentAdId === id);
      newAds = {
        apartmentAdLongTermRent: longTermAds.filter((elem: ApartmentAdLongTermRentModel) => elem.apartmentAdId !== id),
        apartmentAdShortTermRent: shortTermAds,
      };
    }

    await client.writeQuery({
      query: getMyApartmentAdsDocument,
      variables: { input: { status: advertStatus } },
      data: {
        apartmentAd__myApartmentAd_unionRentPeriods: {
          ...newAds,
        },
      },
    });

    return currentAdvert;
  };

  const getCountAds = () => {
    return client.readQuery({
      query: getMyAdsStatusCountDocument,
    }).apartmentAd__myApartmentAd_statusCount as MyApartmentAdStatusCountResponse;
  };

  const decrementCount = () => {
    const count = getCountAds();
    const currentCount = Number(count[countType]);
    client.writeQuery({
      query: getMyAdsStatusCountDocument,
      data: {
        apartmentAd__myApartmentAd_statusCount: {
          ...count,
          [countType]: currentCount - 1,
        },
      },
    });
  };
  const incrementCount = () => {
    const count = getCountAds();
    const currentCount = Number(count[countType]);
    client.writeQuery({
      query: getMyAdsStatusCountDocument,
      data: {
        apartmentAd__myApartmentAd_statusCount: {
          ...count,
          [countType]: currentCount + 1,
        },
      },
    });
  };

  const addAdvertFromCache = async (advert: ApartmentAdShortTermRentModel) => {
    const { shortTermAds, longTermAds } = await readAllAdverts();

    let newAds;

    if (rentType === RentPeriodType.ShortTerm) {
      newAds = {
        apartmentAdLongTermRent: longTermAds,
        apartmentAdShortTermRent: [advert, ...shortTermAds],
      };
    } else {
      newAds = {
        apartmentAdLongTermRent: [advert, ...longTermAds],
        apartmentAdShortTermRent: shortTermAds,
      };
    }

    await client.writeQuery({
      query: getMyApartmentAdsDocument,
      variables: { input: { status: ApartmentAdStatusType.Published } },
      data: {
        apartmentAd__myApartmentAd_unionRentPeriods: {
          ...newAds,
        },
      },
    });
  };

  return { decrementCount, incrementCount, deleteAdvertFromCache, addAdvertFromCache, changePaymentMethod };
};

export default useChangeAdvertStatus;
