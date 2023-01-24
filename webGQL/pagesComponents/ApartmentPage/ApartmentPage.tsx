import {
  ApartmentAdStatusType,
  ApartmentRentPeriodType,
  ContractRequestStatus,
  ContractStatus,
  ShortTermRentBookingType,
} from '__generated__/types';
import { BookingComponent } from 'components/BookingComponent';
import { CardRequest } from 'components/CardRequest';
import { daysPlural, hoursPlural, minutesPlural } from 'constains';
import { useGetLongTermApartment } from 'graphql/queries/Apartments/__generated__/GetLongTermApartment.gql';
import { useGetShortTermApartment } from 'graphql/queries/Apartments/__generated__/getShortTermApartment.gql';
import { useClientSize, useToggle } from 'hooks';
import { MainLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Slider } from 'pagesComponents/ActiveRent/components';
import {
  Description,
  FullViewSlider,
  HeaderApartment,
  ImportantInformation,
  Map,
  Owner,
  OwnerInformation,
  ResponsiveCardRequest,
  ShortInfo,
  SliderApartment,
  Title,
} from 'pagesComponents/ApartmentPage/components';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { RequestStatusEnum } from 'types/card';
import { AppText, BaseModal, InstantBooking, OwnershipConfirmed } from 'ui';
import { handleWordsDeclination } from 'utils';

import { ArrowLeft } from '../../../public/svg/components';
import { BASE_COORDINATE } from '../../components/Map/Map';
import ApartmentPageSkeleton from './ApartmentPageSkeleton';

const ApartmentPage: FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [typeRent, setTypeRent] = useState(ApartmentRentPeriodType.ShortTerm);
  const [currentContractRequest, setCurrentContractRequest] = useState(RequestStatusEnum.INIT);

  const { close, isOpened, open } = useToggle();
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'page' });
  const router = useRouter();
  const { getIsBreakpoint } = useClientSize();
  const { isOpened: isOpenFullMapModal, open: openFullMapModal, close: closeFullMapModal } = useToggle();

  const { id, type } = router.query;

  const { data: dataShort, loading } = useGetShortTermApartment({
    variables: {
      id: { id: id as string },
    },
    fetchPolicy: 'cache-and-network',
  });

  const scrollToMap = () => {
    mapRef?.current?.scrollIntoView({ block: 'center', inline: 'center', behavior: 'smooth' });
  };

  const { data: dataLong } = useGetLongTermApartment({
    variables: {
      id: { id: id as string },
    },
    fetchPolicy: 'cache-and-network',
  });

  const checkApartmentStatus = (status: ApartmentAdStatusType[] | undefined) => {
    const isApartmentStatusOnPaused = status && status?.[0] === ApartmentAdStatusType.Paused;
    if (isApartmentStatusOnPaused) {
      setIsPaused(true);
    }
  };

  const showRequestStatus = (contractRequests?: ContractRequestStatus) => {
    const isCompleted = contractStatus === ContractStatus.Completed || contractStatus === ContractStatus.Concluded;

    if (isPaused) setCurrentContractRequest(RequestStatusEnum.PAUSED);
    else if (contractRequests === ContractRequestStatus.Created) setCurrentContractRequest(RequestStatusEnum.SENDED);
    else if (contractRequests === ContractRequestStatus.Accepted && !isCompleted)
      setCurrentContractRequest(RequestStatusEnum.APPROVED);
    else setCurrentContractRequest(RequestStatusEnum.INIT);
  };

  const typeRentApartment =
    dataShort?.apartmentAd__find_shortTermRentAd?.data || dataLong?.apartmentAd__find_longTermRentAd?.data || undefined;
  const averageResponseOnRequest =
    dataShort?.apartmentAd__find_shortTermRentAd?.averageResponseOnRequest ||
    dataLong?.apartmentAd__find_longTermRentAd?.averageResponseOnRequest ||
    undefined;

  const lockedDates = dataShort?.apartmentAd__find_shortTermRentAd?.data?.lockedDates || [];

  const apartment = typeRentApartment?.apartmentAd;
  const apartmentAdId = typeRentApartment?.apartmentAdId;
  const landlord = typeRentApartment?.apartmentAd.landlord;
  const arrivalTime = dataShort ? dataShort?.apartmentAd__find_shortTermRentAd?.data.arrivalTime : '';
  const departureTime = dataShort ? dataShort?.apartmentAd__find_shortTermRentAd?.data.departureTime : '';
  const cancellationPolicy = dataShort
    ? dataShort?.apartmentAd__find_shortTermRentAd?.data?.cancellationPolicy
    : undefined;
  const isApproved = typeRentApartment?.isApproved;
  const status = typeRentApartment?.status;
  const cost = typeRentApartment?.cost || '';
  const isInstantBooking =
    dataShort?.apartmentAd__find_shortTermRentAd?.data?.rentBookingType === ShortTermRentBookingType.Instant;

  const region = apartment?.address?.region ? `${apartment?.address?.region}, ` : '';
  const city = apartment?.address?.city ? `${apartment?.address?.city}, ` : '';
  const street = apartment?.address?.street ? `ул. ${apartment?.address?.street}, ` : '';
  const houseNumber = apartment?.address?.houseNumber ? `${apartment?.address?.houseNumber}` : '';
  const address = `${region}${city}${street}${houseNumber}`;

  const title = apartment?.description?.name || '';
  const photos = apartment ? apartment?.photos.map((photo) => photo.fileKey) : [];
  const rules = apartment?.rules;

  const name = landlord?.firstName || '';
  const avatar = landlord?.avatarKey || undefined;
  const isIdentityApproved = landlord?.isIdentityApproved;
  const landlordCreateAd = landlord?.createdAt;
  const isPhoneApproved = landlord?.isPhoneApproved;
  const coords = {
    lat: apartment?.address?.lat || BASE_COORDINATE.lat,
    lng: apartment?.address?.lng || BASE_COORDINATE.lng,
  };

  const numberOfRooms = apartment?.details?.numberOfRooms;
  const description = apartment?.description || undefined;
  const apartmentType = apartment?.apartmentType;
  const contractRequestsStatus = apartment?.contractRequests?.[0].status;
  const contractStatus = apartment?.contractRequests?.[0].contract?.status;

  const isShortTermType = typeRent === ApartmentRentPeriodType.ShortTerm;
  const isWidthMd = getIsBreakpoint('md');
  const isWidthS = getIsBreakpoint('s');

  const { days, hours, minutes } = averageResponseOnRequest || {};

  const createMiddleRequest = useMemo(
    () => () => {
      if (days) return `${t('middleRequest')} ${days} ${handleWordsDeclination(days, daysPlural)}`;
      if (hours) return `${t('middleRequest')} ${hours} ${handleWordsDeclination(hours, hoursPlural)}`;
      if (minutes) return `${t('middleRequest')} ${minutes} ${handleWordsDeclination(minutes, minutesPlural)}`;
    },
    [t, averageResponseOnRequest],
  );

  useEffect(() => {
    setTypeRent(type as ApartmentRentPeriodType);
    checkApartmentStatus(status);
  }, [status, router]);

  useEffect(() => {
    showRequestStatus(contractRequestsStatus);
  }, [dataShort, dataLong]);

  return (
    <>
      {loading ? (
        <ApartmentPageSkeleton />
      ) : (
        <StyledMainLayout
          headTitle={t('headTitle')}
          childrenForHeader={
            <HeaderApartment
              title={title}
              address={address}
              onScroll={scrollToMap}
              isPaused={isPaused}
              apartmentAdId={typeRentApartment?.apartmentAd.id || ''}
            />
          }>
          <Container>
            <MainColumn>
              {isWidthS ? (
                <>
                  <SliderContainer onClick={open}>
                    <Slider images={photos} />
                  </SliderContainer>
                  <Title onScroll={scrollToMap} title={title} address={address} isPaused={isPaused} />
                </>
              ) : (
                <SliderApartment images={photos} open={open} />
              )}
              <OwnerInformation
                name={name}
                roomsCount={numberOfRooms}
                avatar={avatar!}
                isPhoneApproved={isPhoneApproved}
                isIdentityApproved={isIdentityApproved}
              />
              {isWidthMd && (
                <ResponsiveContainer>
                  {isApproved && <OwnershipConfirmed />}
                  {isInstantBooking && <InstantBooking />}
                </ResponsiveContainer>
              )}
              <Description description={description} />
              <ShortInfo typeofHousing={apartmentType} countRoms={numberOfRooms} />
              <MapContainer ref={mapRef}>
                <Map onOpenFullScreenMap={openFullMapModal} currentMarker={coords} center={coords} withResizeButton />
              </MapContainer>
              <Owner
                name={name}
                date={landlordCreateAd}
                isPhoneApproved={isPhoneApproved}
                isIdentityApproved={isIdentityApproved}
                avatar={avatar!}
              />
              <ImportantInformation
                rules={rules}
                arrivalTime={arrivalTime}
                cancellationPolicy={cancellationPolicy}
                departureTime={departureTime}
              />
            </MainColumn>
            {!isWidthMd && (
              <AsideColumn>
                {isShortTermType ? (
                  <StickyContainer $isPaused={isPaused} $isShortRent={isShortTermType}>
                    <BookingComponent
                      middleRequest={createMiddleRequest()}
                      cost={Number(cost)}
                      lockedDates={lockedDates}
                      period="perDay"
                      isPaused={isPaused}
                    />
                    <InstantWrapper>
                      {isInstantBooking && <InstantBooking />}
                      {isApproved && (
                        <Wrapper>
                          <OwnershipConfirmed />
                        </Wrapper>
                      )}
                    </InstantWrapper>
                  </StickyContainer>
                ) : (
                  <StickyContainer $isPaused={isPaused} $isShortRent={isShortTermType}>
                    <CardRequest
                      middleRequest={createMiddleRequest()}
                      cost={Number(cost)}
                      isMonthPeriod
                      cardStatus={currentContractRequest}
                      id={apartmentAdId}
                    />
                    {isApproved && (
                      <Wrapper>
                        <OwnershipConfirmed />
                      </Wrapper>
                    )}
                  </StickyContainer>
                )}
              </AsideColumn>
            )}
          </Container>
          {isOpened && <FullViewSlider images={photos} close={close} />}
          {isWidthMd && (
            <ResponsiveCardRequestContainer>
              <ResponsiveCardRequest
                cost={Number(cost)}
                cardStatus={currentContractRequest}
                id={apartmentAdId}
                isShortTermType={isShortTermType}
                isPaused={isPaused}
              />
            </ResponsiveCardRequestContainer>
          )}
        </StyledMainLayout>
      )}
      <FullScreenMapModal
        withBackOption
        title="Расположение"
        isVisible={isOpenFullMapModal}
        onClose={closeFullMapModal}
        onGoBack={closeFullMapModal}
        isBottomMobile={false}>
        <FullScreenMapModalContainer>
          <FullScreenMapModalHeader>
            <BackButton onClick={closeFullMapModal}>
              <ArrowLeft />
            </BackButton>
            <MapTitle variant={TextVariants.SECONDARY} font="body_24_16_medium">
              Расположение
            </MapTitle>
          </FullScreenMapModalHeader>
        </FullScreenMapModalContainer>
        <Map onOpenFullScreenMap={openFullMapModal} isFullWidth currentMarker={coords} center={coords} />
      </FullScreenMapModal>
    </>
  );
};

export default ApartmentPage;

const FullScreenMapModal = styled(BaseModal)`
  max-width: 100%;
  height: 100%;
  border-radius: 0;
  overflow: unset;
  padding: 0 !important;

  .modal-container {
    padding: 0;
  }

  .modal-header {
    display: none;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ResponsiveCardRequestContainer = styled.div`
  position: sticky;
  bottom: 0;
`;

const ResponsiveContainer = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
  }
`;
const StyledMainLayout = styled(MainLayout)`
  @media (max-width: ${BreakpointsEnum.lgm}px) {
    padding: 16px 24px;
  }
  @media (max-width: ${BreakpointsEnum.md}px) {
    padding: 16px 72px;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0 48px;
  }
  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 0 16px;
  }
`;

type StickyContainerProps = {
  $isPaused: boolean;
  $isShortRent: boolean;
};

const StickyContainer = styled.div<StickyContainerProps>`
  position: sticky;
  top: 192px;

  ${({ $isPaused, $isShortRent }) =>
    $isPaused &&
    $isShortRent &&
    css`
      top: 248px;
    `}
`;
const InstantWrapper = styled.div`
  margin-top: 32px;
`;
const Wrapper = styled.div`
  margin-top: 16px;
  max-width: 400px;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const AsideColumn = styled.div`
  margin-left: 48px;

  @media (max-width: ${BreakpointsEnum.lg}px) {
    margin-left: 24px;
  }
`;
const MainColumn = styled.div`
  width: 848px;
  flex: 1;

  @media (max-width: ${BreakpointsEnum.lg}px) {
    width: 630px;
  }
  @media (max-width: ${BreakpointsEnum.lgm}px) {
    width: 500px;
  }
`;

const FullScreenMapModalContainer = styled.div``;

const FullScreenMapModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
  position: relative;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  height: 20px;
  left: 16px;
  top: 20px;
  margin-right: 16px;
  cursor: pointer;
  position: absolute;
`;

const MapTitle = styled(AppText)``;

const MapContainer = styled.div``;
