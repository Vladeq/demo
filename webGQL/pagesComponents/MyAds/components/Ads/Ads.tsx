import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {
  ApartmentAdLongTermRentModel,
  ApartmentAdStatusType,
  IdentityStatusType,
  RentPeriodType,
} from '__generated__/types';
import { CardMyAds } from 'components/CardMyAds';
import { ResponsiveCardMyAds } from 'components/ResponsiveCardMyAds';
import { usegetMyAdsStatusCount } from 'graphql/queries/MyAds/__generated__/getMyAdsStatusCount.query';
import { usegetMyApartmentAds } from 'graphql/queries/MyAds/__generated__/getMyApartmentAds.query';
import { useGetFullMe } from 'graphql/queries/User/__generated__/getFullMe.query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Selector } from 'ui';

import { useGetActiveContracts } from '../../../../graphql/queries/Contracts/__generated__/getActiveContracts.query';
import { useClientSize } from '../../../../hooks';
import { EmptyState } from '../EmptyState';
import MyAdsSkeleton from '../MyAdsSkeleton/MyAdsSkeleton';
import { ResponsiveMyAdsSkeleton } from '../ResponsiveMyAdsSkeleton';

const Ads: FC = () => {
  const { t } = useTranslation('myAdsPage', { keyPrefix: 'ads' });

  const { query } = useRouter();
  const { getIsBreakpoint } = useClientSize();
  const isWidthSm = getIsBreakpoint('sm');

  const [selectedIdx, setSelectedIdx] = useState(0);

  const { data } = usegetMyAdsStatusCount({ fetchPolicy: 'cache-and-network' });

  const contracts =
    useGetActiveContracts({ fetchPolicy: 'cache-and-network' }).data?.contract__landlord_activeRents || [];
  const adsCount = data?.apartmentAd__myApartmentAd_statusCount;

  const selectors = [
    { text: `${t('active')} (${adsCount?.ACTIVE || '0'})`, name: ApartmentAdStatusType.Active },
    { text: `${t('published')} (${adsCount?.PUBLISHED || '0'})`, name: ApartmentAdStatusType.Published },
    { text: `${t('inProcess')} (${adsCount?.PROCESSING || '0'})`, name: ApartmentAdStatusType.Processing },
    { text: `${t('stopped')} (${adsCount?.PAUSED || '0'})`, name: ApartmentAdStatusType.Paused },
    { text: `${t('draft')} (${adsCount?.DRAFT || '0'})`, name: ApartmentAdStatusType.Draft },
  ];

  const isContracts = selectors[selectedIdx].name === ApartmentAdStatusType.Active;

  const contractsFormatted = () => {
    const shortContracts: ApartmentAdLongTermRentModel[] = [];
    const longContracts: ApartmentAdLongTermRentModel[] = [];

    contracts.forEach((elem) => {
      const apartmentAd = {
        apartmentAd: {
          ...elem.apartmentAd,
          apartmentAdId: elem.apartmentAdId,
        },
        apartmentAdId: elem.apartmentAdId,
        status: [ApartmentAdStatusType.Active],
        cost: elem.cost,
      } as unknown as ApartmentAdLongTermRentModel;
      if (elem.apartmentRentPeriodType === 'SHORT_TERM') {
        shortContracts.push(apartmentAd);
      } else {
        longContracts.push(apartmentAd);
      }
    });

    return {
      apartmentAdShortTermRent: shortContracts,
      apartmentAdLongTermRent: longContracts,
    };
  };

  const ads = usegetMyApartmentAds({
    fetchPolicy: 'cache-and-network',
    onError: (e) => {
      console.log(e, 'error');
    },
    variables: { input: { status: selectors[selectedIdx].name } },
  }).data?.apartmentAd__myApartmentAd_unionRentPeriods;

  const { data: userData } = useGetFullMe({ fetchPolicy: 'cache-and-network' });
  const user = userData?.user__me;

  const shortTermAds = isContracts ? contractsFormatted().apartmentAdShortTermRent : ads?.apartmentAdShortTermRent;
  const longTermAds = isContracts ? contractsFormatted().apartmentAdLongTermRent : ads?.apartmentAdLongTermRent;

  const isStoppedStatus = selectors[selectedIdx].name === ApartmentAdStatusType.Paused;
  const isEmptyState = shortTermAds?.length === 0 && longTermAds?.length === 0;

  useEffect(() => {
    const beforeCreatedAdvert = !!query.advertId;
    setTimeout(() => {
      if (beforeCreatedAdvert) {
        setSelectedIdx(2);
      }
    }, 500);
  }, []);
  return (
    <MainContainer>
      <SelectorsContainer>
        {selectors.map((item, index) => {
          return (
            <Selector
              key={index}
              checked={index === selectedIdx}
              text={item.text}
              name={item.name}
              onChange={() => setSelectedIdx(index)}
            />
          );
        })}
      </SelectorsContainer>
      <StyledSwiper spaceBetween={16} slidesPerView="auto" loopedSlides={2}>
        {selectors.map((item, index) => {
          return (
            <SwiperSlide key={index} style={{ maxWidth: 'fit-content' }}>
              <Selector
                checked={index === selectedIdx}
                text={item.text}
                name={item.name}
                onChange={() => setSelectedIdx(index)}
              />
            </SwiperSlide>
          );
        })}
      </StyledSwiper>
      {!ads ? (
        <>
          <MyAdsSkeleton />
          <ResponsiveMyAdsSkeleton />
        </>
      ) : (
        <Content>
          {isEmptyState ? (
            <EmptyState status={selectors[selectedIdx].name} />
          ) : (
            <InnerContainer>
              {shortTermAds && (
                <CardsContainer>
                  {!isStoppedStatus && !!shortTermAds?.length && (
                    <AppText variant={TextVariants.SECONDARY} font="title_22_18_medium">
                      {t('shortTerm')}
                    </AppText>
                  )}
                  {shortTermAds?.map((item) => {
                    const address = item.apartmentAd.address?.city
                      ? `${item.apartmentAd.address?.city},${' '}${item.apartmentAd.address?.street},${' '}${
                          item.apartmentAd.address?.houseNumber
                        }`
                      : '';
                    return (
                      <>
                        {isWidthSm ? (
                          <StyledResponsiveAd
                            key={item.apartmentAdId}
                            id={item.apartmentAdId}
                            pictureSrc={item.apartmentAd?.photos[0]?.fileKey || '/img/apart.png'}
                            title={item.apartmentAd.description?.name || ''}
                            address={address}
                            price={`${item.apartmentAd.shortTermRent?.cost}`}
                            rentType={RentPeriodType.ShortTerm}
                            status={item.status[0]}
                            confirmData={
                              user?.identityStatus === IdentityStatusType.Processing ||
                              user?.identityStatus === IdentityStatusType.Approved
                            }
                            confirmPhone={item.apartmentAd.landlord.isPhoneApproved}
                            confirmDocuments
                            currentStep={item.apartmentAd.completeStep}
                            confirmed={item.apartmentAd?.shortTermRent?.isApproved}
                            payMethod={!!item.apartmentAd.innopayCardId}
                            declineReason={item.apartmentAd?.shortTermRent?.declineReason || ''}
                          />
                        ) : (
                          <StyledAd
                            key={item.apartmentAdId}
                            id={item.apartmentAdId}
                            rentBookingType={item.apartmentAd.shortTermRent?.rentBookingType}
                            pictureSrc={item.apartmentAd?.photos[0]?.fileKey || '/img/apart.png'}
                            title={item.apartmentAd.description?.name || ''}
                            address={address}
                            price={`${item.apartmentAd.shortTermRent?.cost}`}
                            rentType={RentPeriodType.ShortTerm}
                            status={item.status[0]}
                            confirmData={
                              user?.identityStatus === IdentityStatusType.Processing ||
                              user?.identityStatus === IdentityStatusType.Approved
                            }
                            confirmPhone={item.apartmentAd.landlord.isPhoneApproved}
                            confirmDocuments
                            confirmed={item.apartmentAd?.shortTermRent?.isApproved}
                            payMethod={!!item.apartmentAd.innopayCardId}
                            currentStep={item.apartmentAd.completeStep}
                            declineReason={item.apartmentAd?.shortTermRent?.declineReason || ''}
                          />
                        )}
                      </>
                    );
                  })}
                </CardsContainer>
              )}
              {longTermAds && (
                <CardsContainer>
                  {!isStoppedStatus && !!longTermAds?.length && (
                    <AppText variant={TextVariants.SECONDARY} font="title_22_18_medium">
                      {t('longTerm')}
                    </AppText>
                  )}
                  {longTermAds?.map((item) => {
                    const address = item.apartmentAd.address?.city
                      ? `${item.apartmentAd.address?.city},${' '}${item.apartmentAd.address?.street},${' '}${
                          item.apartmentAd.address?.houseNumber
                        }`
                      : '';
                    return (
                      <>
                        {isWidthSm ? (
                          <StyledResponsiveAd
                            key={item.apartmentAdId}
                            id={item.apartmentAdId}
                            pictureSrc={item.apartmentAd?.photos[0]?.fileKey || '/img/apart.png'}
                            title={item.apartmentAd.description?.name || ''}
                            address={address}
                            price={`${item.apartmentAd.longTermRent?.cost}`}
                            rentType={RentPeriodType.LongTerm}
                            status={item.status[0]}
                            confirmData={
                              user?.identityStatus === IdentityStatusType.Processing ||
                              user?.identityStatus === IdentityStatusType.Approved
                            }
                            confirmPhone={item.apartmentAd.landlord.isPhoneApproved}
                            confirmDocuments={!!item.apartmentAd.longTermRent?.ownershipDocuments?.length}
                            currentStep={item.apartmentAd.completeStep}
                            confirmed={item.apartmentAd?.longTermRent?.isApproved}
                            payMethod={!!item.apartmentAd.innopayCardId}
                            declineReason={item.apartmentAd?.longTermRent?.declineReason || ''}
                          />
                        ) : (
                          <StyledAd
                            key={item.apartmentAdId}
                            id={item.apartmentAdId}
                            pictureSrc={item.apartmentAd?.photos[0]?.fileKey || '/img/apart.png'}
                            title={item.apartmentAd.description?.name || ''}
                            address={address}
                            price={`${item.apartmentAd.longTermRent?.cost}`}
                            rentType={RentPeriodType.LongTerm}
                            status={item.status[0]}
                            confirmData={
                              user?.identityStatus === IdentityStatusType.Processing ||
                              user?.identityStatus === IdentityStatusType.Approved
                            }
                            confirmPhone={item.apartmentAd.landlord.isPhoneApproved}
                            confirmDocuments={!!item.apartmentAd.longTermRent?.ownershipDocuments?.length}
                            confirmed={item.apartmentAd?.longTermRent?.isApproved}
                            payMethod={!!item.apartmentAd.innopayCardId}
                            currentStep={item.apartmentAd.completeStep}
                            declineReason={item.apartmentAd?.longTermRent?.declineReason || ''}
                          />
                        )}
                      </>
                    );
                  })}
                </CardsContainer>
              )}
            </InnerContainer>
          )}
        </Content>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
  `}
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1296px;
  margin: auto;
  padding: 40px;
  border-radius: 24px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: none;
    padding: 24px 16px 80px;
    border-radius: 0;
  }
`;

const SelectorsContainer = styled.div`
  display: flex;
  gap: 16px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 24px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
`;

const StyledAd = styled(CardMyAds)`
  display: flex;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const StyledSwiper = styled(Swiper)`
  display: none;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
    width: 100%;
  }
`;

const StyledResponsiveAd = styled(ResponsiveCardMyAds)`
  display: none;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1216px;
  gap: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 16px;
  }
`;

export default Ads;
