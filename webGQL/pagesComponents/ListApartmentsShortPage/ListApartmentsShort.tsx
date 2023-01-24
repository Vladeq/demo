import { List, Map, SkeletonApartmentsList } from 'components';
import { APARTMENT_MAX_PRICE_FOR_BOOKING, APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT } from 'constains';
import { useGetShortApartmentsForList } from 'graphql/queries/Apartments/__generated__/getShortApartmentsForList.query';
import { useGetShortApartmentsForMap } from 'graphql/queries/Apartments/__generated__/getShortApartmentsForMap.query';
import { usePagination } from 'hooks';
import { MainLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import { dayjs } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { ApartmentAdInList } from 'types/advert';

import {
  ApartmentAdShortTermRentViewModel,
  ApartmentRentPeriodType,
  ApartmentType,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
} from '../../__generated__/types';
import { BASE_COORDINATE } from '../../components/Map/Map';
import { BottomFilters, Filters } from './components';

const DEFAULT_MAP_RADIUS = 30;

const ListApartments: FC = () => {
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'page' });
  const { query } = useRouter();
  const [mapRadius, setMapRadius] = useState(DEFAULT_MAP_RADIUS);
  const { page, handleSetPage, limit } = usePagination(15);
  const [ads, setAds] = useState<Array<ApartmentAdInList>>([]);
  const [markers, setMarkers] = useState<Array<ApartmentAdInList>>([]);

  const [center, setCenter] = useState({
    lat: Number(query.lat) === 0 ? BASE_COORDINATE.lat : Number(query.lat),
    lng: Number(query.lng) === 0 ? BASE_COORDINATE.lng : Number(query.lng),
  });

  const numberOfRooms = query.numberOfRooms ? [...query.numberOfRooms].map((elem) => +elem) : null;

  const handleSetMapRadius = (radius: number) => {
    setMapRadius(radius);
  };

  const filters = {
    priceRange: {
      min: query?.min ? String(query?.min) : APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT,
      max: query?.max ? String(query?.max) : APARTMENT_MAX_PRICE_FOR_BOOKING,
    },
    dateRange: {
      startDate: query.startDate
        ? dayjs(query.startDate as string)
            .format('YYYY-MM-DD')
            .toString()
        : null,
      endDate: query.endDate
        ? dayjs(query.endDate as string)
            .format('YYYY-MM-DD')
            .toString()
        : null,
    },
    apartmentTypes: query.apartmentTypes as ApartmentType[],
    numberOfRooms: numberOfRooms || null,
    numberOfChild: Number(query.numberOfChild) === 0 ? null : Number(query.numberOfChild),
    numberOfPets: Number(query.numberOfPets) === 0 ? null : Number(query.numberOfPets),
    numberOfAdults: Number(query.numberOfAdults) || 1,
    departureTimeEnd: query.departureEnd ? String(query.departureEnd) : null,
    departureTimeStart: query.departureStart ? String(query.departureStart) : null,
    rentBookingType: (query.rentBookingType as ShortTermRentBookingType) || null,
    cancellationPolicyType: (query.cancellationPolicy as ShortTermRentCancellationPolicyType) || null,
    arrivalTimeEnd: query.arrivalEnd ? String(query.arrivalEnd) : null,
    arrivalTimeStart: query.arrivalStart ? String(query.arrivalStart) : null,
    location: {
      lat: Number(query.lat) || BASE_COORDINATE.lat,
      lng: Number(query.lng) || BASE_COORDINATE.lng,
      radiusInKm: Math.ceil(mapRadius),
    },
  };

  const { data, loading: loadingForList } = useGetShortApartmentsForList({
    fetchPolicy: 'cache-and-network',
    onError: () => {
      setAds([]);
    },
    onCompleted: (data) => {
      const apartments = data.apartmentAd__find_shortTermRentAds.data || [];
      const filteredApartments = handleNormalizeAds(apartments as Array<ApartmentAdShortTermRentViewModel>);
      setAds(filteredApartments as Array<ApartmentAdInList>);
    },
    variables: {
      filter: {
        ...filters,
      },
      pagination: {
        page: page + 1,
        limit,
      },
    },
  });
  const apartments = data?.apartmentAd__find_shortTermRentAds.data;
  const pagesData = data?.apartmentAd__find_shortTermRentAds.pageInfo;

  const handleNormalizeAds = useCallback(
    (ads: Array<ApartmentAdShortTermRentViewModel>) => {
      return ads?.map((ad) => {
        return {
          rentType: ad.apartmentAd.rentPeriodType,
          guestsNum: ad.apartmentAd.details?.numberOfGuests,
          bedNum: '1',
          bathNum: '1',
          location: {
            lat: ad.apartmentAd.address?.lat,
            lng: ad.apartmentAd.address?.lng,
          },
          apartmentType: ad.apartmentAd.apartmentType,
          pictureSrc: ad.apartmentAd.photos[0].fileKey,
          title: ad.apartmentAd.description?.name,
          price: ad.apartmentAd.shortTermRent?.cost,
          address: `${ad.apartmentAd.address?.street || ''}  ${ad.apartmentAd.address?.houseNumber || ''},  ${
            ad.apartmentAd.address?.city || ''
          },  Казахстан`,
          id: ad.apartmentAd.shortTermRent?.id,
          type: ApartmentRentPeriodType.ShortTerm,
        };
      });
    },
    [apartments],
  );

  const handleSetFocusOnCard = (id: string) => {
    const currentAd = markers.map((ad) => {
      if (ad.id === id) {
        ad = {
          ...ad,
          isFocus: true,
        };
      } else {
        ad = {
          ...ad,
          isFocus: false,
        };
      }
      return ad;
    });
    setMarkers(currentAd);
  };

  const handleDeleteFocusOnCard = (id: string) => {
    const currentAd = markers.map((ad) => {
      if (ad.id === id) {
        ad = {
          ...ad,
          isFocus: false,
        };
      }
      return ad;
    });
    setMarkers(currentAd);
  };

  const { loading: loadingForMap } = useGetShortApartmentsForMap({
    fetchPolicy: 'cache-and-network',
    onError: () => {
      setMarkers([]);
    },
    onCompleted: (data) => {
      const markers = data.apartmentAd__find_shortTermRentAdsCluster.data;
      setMarkers(markers as unknown as Array<ApartmentAdInList>);
    },
    variables: {
      filter: {
        ...filters,
      },
    },
  });

  useEffect(() => {
    setCenter({ lat: +query.lat! || 0, lng: +query.lng! || 0 });
  }, [query.lat]);

  return (
    <StyledMainLayout
      headTitle={t('headTitle')}
      filters={<Filters />}
      childrenForHeader={<BottomFilters />}
      isSecondaryBackground>
      <Container>
        {loadingForList ? (
          <SkeletonApartmentsList />
        ) : (
          <List
            page={page}
            onSetFocusOnCard={handleSetFocusOnCard}
            onDeleteFocusOnCard={handleDeleteFocusOnCard}
            onSetPage={handleSetPage}
            totalPages={pagesData?.totalPages || 0}
            ads={ads || []}
            totalItems={pagesData?.totalItems || 0}
          />
        )}
        <Map
          setCenter={setCenter}
          center={center}
          isLoading={loadingForMap}
          markers={markers || []}
          onSetMapRadius={handleSetMapRadius}
        />
      </Container>
    </StyledMainLayout>
  );
};

export default ListApartments;

const StyledMainLayout = styled(MainLayout)`
  padding: 0;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding-right: 0;
    padding-left: 48px;
  }
  @media (min-width: ${BreakpointsEnum.md}px) {
    padding-left: 72px;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    flex-direction: row;
    gap: 16px;
  }
`;
