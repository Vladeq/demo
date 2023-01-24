import { List, SkeletonApartmentsList } from 'components';
import { BASE_COORDINATE } from 'components/Map/Map';
import { APARTMENT_MAX_PRICE_FOR_BOOKING, APARTMENT_MIN_PRICE_FOR_BOOKING_LONG } from 'constains';
import { useGetFilteredApartmentsForList } from 'graphql/queries/Apartments/__generated__/getLongApartmentsForList.query';
import { useGetFilteredApartmentsForMap } from 'graphql/queries/Apartments/__generated__/getLongApartmentsForMap.query';
import { MainLayout } from 'layouts';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { ApartmentAdInList } from 'types/advert';

import {
  ApartmentAdLongTermRentViewModel,
  ApartmentRentPeriodType,
  ApartmentRuleType,
  ApartmentType,
} from '../../__generated__/types';
import { usePagination } from '../../hooks';
import { BottomFilters, Filters } from './components';

const Map = dynamic(() => import('components/Map/Map'));

const DEFAULT_MAP_RADIUS = 30;

const ListApartmentsLong: FC = () => {
  const router = useRouter();
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'page' });
  const [mapRadius, setMapRadius] = useState(DEFAULT_MAP_RADIUS);

  const { page, handleSetPage, limit } = usePagination(15);

  const [ads, setAds] = useState<Array<ApartmentAdInList>>([]);
  const [markers, setMarkers] = useState<Array<ApartmentAdInList>>([]);

  const { query } = router;

  const [center, setCenter] = useState({
    lat: Number(query.lat) === 0 ? BASE_COORDINATE.lat : Number(query.lat),
    lng: Number(query.lng) === 0 ? BASE_COORDINATE.lng : Number(query.lng),
  });

  const numberOfRooms = router.query.numberOfRooms ? [...router.query.numberOfRooms].map((elem) => +elem) : null;

  const filters = {
    priceRange: {
      min: query?.min ? String(query?.min).replaceAll(' ', '') : APARTMENT_MIN_PRICE_FOR_BOOKING_LONG,
      max: query?.max ? String(query?.max).replaceAll(' ', '') : APARTMENT_MAX_PRICE_FOR_BOOKING,
    },
    apartmentTypes: (query.apartmentTypes as ApartmentType[]) || null,
    numberOfRooms: numberOfRooms || null,
    numberOfChild: Number(query.numberOfChild) === 0 ? null : Number(query.numberOfChild),
    numberOfPets: Number(query.numberOfPets) === 0 ? null : Number(query.numberOfPets),
    numberOfAdults: Number(query.numberOfAdults) || 1,
    rules: (query.rules as Array<ApartmentRuleType>) || null,
    location: {
      lat: Number(query.lat) || BASE_COORDINATE.lat,
      lng: Number(query.lng) || BASE_COORDINATE.lng,
      radiusInKm: Math.ceil(mapRadius),
    },
  };

  const { data, loading } = useGetFilteredApartmentsForList({
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const apartments = data.apartmentAd__find_longTermRentAds.data || [];
      const filteredApartments = handleNormalizeAds(apartments as Array<ApartmentAdLongTermRentViewModel>);
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

  useGetFilteredApartmentsForMap({
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const markers = data.apartmentAd__find_longTermRentAdsCluster.data;
      setMarkers(markers as unknown as Array<ApartmentAdInList>);
    },
    variables: {
      filter: {
        ...filters,
      },
    },
  });

  const apartments = data?.apartmentAd__find_longTermRentAds?.data;
  const pagesData = data?.apartmentAd__find_longTermRentAds.pageInfo;

  const handleNormalizeAds = useCallback(
    (ads: Array<ApartmentAdLongTermRentViewModel>) => {
      return ads?.map((ad) => {
        return {
          rentType: ad?.apartmentAd?.rentPeriodType,
          guestsNum: ad?.apartmentAd?.details?.numberOfGuests,
          location: {
            lat: ad?.apartmentAd?.address?.lat,
            lng: ad?.apartmentAd?.address?.lng,
          },
          apartmentType: ad?.apartmentAd?.apartmentType! || ApartmentType.Flat,
          pictureSrc: ad?.apartmentAd?.photos[0].fileKey,
          title: ad?.apartmentAd?.description?.name,
          price: String(ad.apartmentAd?.longTermRent?.cost),
          address: `${ad.apartmentAd?.address?.street || ''}  ${ad.apartmentAd?.address?.houseNumber || ''},  ${
            ad.apartmentAd?.address?.city || ''
          },  Казахстан`,
          id: ad.apartmentAd?.longTermRent?.id,
          type: ApartmentRentPeriodType.LongTerm,
        };
      });
    },
    [apartments],
  );

  const handleSetMapRadius = (radius: number) => {
    setMapRadius(radius);
  };

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
        {loading ? (
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
          isLoading={loading}
          markers={markers || []}
          onSetMapRadius={handleSetMapRadius}
        />
      </Container>
    </StyledMainLayout>
  );
};

export default ListApartmentsLong;

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
  @media (min-width: ${BreakpointsEnum.lg}px) {
    gap: 48px;
  }
`;
