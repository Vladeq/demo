import { Routes } from 'constains';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Avatar, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { ApartmentRentPeriodType } from '../../../../__generated__/types';
import { usegetActiveContractById } from '../../../../graphql/queries/Contracts/__generated__/getActiveContractById.query';
import { RentDetails, Slider } from '../index';

const RentInfo: FC = () => {
  const { t } = useTranslation('activeRentPage', { keyPrefix: 'rentInfo' });

  const { query, push } = useRouter();
  const { id } = query;

  const contractId = String(id);

  const { data } = usegetActiveContractById({
    variables: {
      input: {
        id: contractId,
      },
    },
  });

  const contract = data?.contract__tenant_find;

  const advert = contract?.apartmentAd;
  const type = contract?.apartmentRentPeriodType;

  const photos = advert ? advert?.photos.map((photo) => photo.fileKey) : [];

  const tenant = contract?.tenant;

  const isShortRent = contract?.apartmentRentPeriodType === ApartmentRentPeriodType.ShortTerm;

  const idForFetchAdvert = isShortRent
    ? contract?.apartmentAd?.shortTermRent?.id
    : contract?.apartmentAd?.longTermRent?.id;

  const city = advert?.address?.city ? `${advert?.address?.city}, ` : '';
  const street = advert?.address?.street ? `ул. ${advert?.address?.street}, ` : '';
  const houseNumber = advert?.address?.houseNumber ? `${advert?.address?.houseNumber}` : '';
  const address = `${city}${street}${houseNumber}`;

  return (
    <MainContainer>
      <TitleText variant={TextVariants.SECONDARY}>{t('title')}</TitleText>
      <Slider images={photos} />
      <HouseInfo>
        <Owner>
          <Avatar avatar={tenant?.avatarKey || ''} />
          <Info>
            <OwnerName variant={TextVariants.SECONDARY}>
              {`${tenant?.firstName || ''} ${tenant?.lastName || ''}`}
            </OwnerName>
          </Info>
        </Owner>
        <AddressInfo>
          <AddressTitle variant={TextVariants.SECONDARY}>{t('address')}</AddressTitle>
          <Address variant={TextVariants.SECONDARY}>{address}</Address>
          <ToMapText variant={TextVariants.SECONDARY}>{t('onMap')}</ToMapText>
        </AddressInfo>
      </HouseInfo>
      <ButtonsContainer>
        <StyledButton variant={ButtonVariant.PRIMARY} size={ButtonSize.LONG_TEXT} text={t('btnWithSeller')} />
        <StyledButton
          onClick={() => push({ pathname: Routes.apartment, query: { id: idForFetchAdvert, type } })}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.LONG_TEXT}
          text={t('btnOpenAd')}
        />
      </ButtonsContainer>
      <RentDetails contractId={contractId} />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 624px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    width: 343px;
  }
`;

const TitleText = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_22_18_bold};
`;

const HouseInfo = styled.div`
  display: flex;
  gap: 48px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    gap: 18px;
  }
`;

const Owner = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 6px;
  }
`;

const AddressInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const OwnerName = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_22_18_bold};

  @media (max-width: ${BreakpointsEnum.s}px) {
    ${({ theme: { typography } }) => typography.body_20_14_medium};
  }
`;

const AddressTitle = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_22_18_bold};

  @media (max-width: ${BreakpointsEnum.s}px) {
    display: none;
  }
`;

const Address = styled(AppText)`
  ${({ theme: { typography } }) => typography.body_20_14_regular};
  max-width: 270px;
`;

const ToMapText = styled(AppText)`
  display: none;
  text-decoration: underline;
  ${({ theme: { typography } }) => typography.body_24_14_medium};

  @media (max-width: ${BreakpointsEnum.s}px) {
    display: block;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    gap: 8px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;

  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 16px 0;
  }
`;

export default RentInfo;
