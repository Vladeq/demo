import { guestPlural, Routes } from 'constains';
import { useClientSize } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { BaseCardProps } from 'types/card';
import { AppText } from 'ui';
import { handleDivisionOnCategories } from 'utils';
import { handleWordsDeclination } from 'utils/textHelpers';

import { ApartmentType } from '../../../../__generated__/types';
import { InSearchContainer } from '../../../CardInSearch/styled';

interface CardInSearchProps extends BaseCardProps {
  rentType?: string;
  guestsNum?: string;
  bedNum?: string;
  bathNum?: string;
  apartmentType?: ApartmentType;
  onSetFocusOnCard: (id: string) => void;
  onDeleteFocusOnCard: (id: string) => void;
  isBooking?: boolean;
  id: string;
}

const AdsCard: FC<CardInSearchProps> = ({
  pictureSrc,
  title,
  address,
  id,
  price,
  guestsNum,
  onDeleteFocusOnCard,
  apartmentType,
  onSetFocusOnCard,
  isBooking = false,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });
  const { getIsBreakpoint } = useClientSize();
  const { pathname } = useRouter();

  const typeHousingMapping = {
    [ApartmentType.Flat]: t('flat'),
    [ApartmentType.Room]: t('room'),
    [ApartmentType.Cottage]: t('house'),
    [ApartmentType.Hostel]: t('hostel'),
    [ApartmentType.MiniHotel]: t('miniHotel'),
    [ApartmentType.Guesthouse]: t('guestHome'),
    [ApartmentType.Aparthotel]: t('apart'),
  };

  const isShortRent = pathname === Routes.listApartmentsShort;

  const currentPricePeriod = isShortRent ? t('pricePeriod') : t('pricePeriodMonth');

  const guestSubtitle = `${guestsNum} ${handleWordsDeclination(Number(guestsNum), guestPlural)}`;

  const priceSubtitle = `${handleDivisionOnCategories(String(price || ''))} ₸ `;

  const isWidthSm = getIsBreakpoint('sm');
  return (
    <StyledInSearchContainer
      $isBooking={isBooking}
      onMouseEnter={() => onSetFocusOnCard(id)}
      onMouseLeave={() => onDeleteFocusOnCard(id)}>
      <ImageContainer $isBooking={isBooking} $src={pictureSrc} />
      <DescriptionContainer $isBooking={isBooking}>
        <RentTypeContainer>
          <RentTypeText>{typeHousingMapping[apartmentType!]}</RentTypeText>
        </RentTypeContainer>
        <TitleContainer $isBooking={isBooking}>
          <TitleText variant={TextVariants.SECONDARY} font={isWidthSm ? 'caption_16_12_medium' : 'title_22_18_medium'}>
            {title}
          </TitleText>
          {!isWidthSm && (
            <FeatureContainer>
              <Features>{guestSubtitle}</Features>
            </FeatureContainer>
          )}
        </TitleContainer>
        <FooterContainer $isBooking={isBooking}>
          {!isWidthSm && (
            <AddressContainer>
              <Address>{address}</Address>
            </AddressContainer>
          )}
          <PriceContainer $isBooking={isBooking}>
            <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_24_16_medium' : 'title_22_18_bold'}>
              {priceSubtitle}
            </AppText>
            <PricePeriod $isBooking={isBooking}>{currentPricePeriod}</PricePeriod>
          </PriceContainer>
        </FooterContainer>
      </DescriptionContainer>
    </StyledInSearchContainer>
  );
};

const StyledInSearchContainer = styled(InSearchContainer)<{ $isBooking: boolean }>`
  flex-direction: row;
  width: 100%;
  max-width: 650px;
  z-index: 99999999999;
  ${({ theme, $isBooking }) =>
    $isBooking &&
    css`
      max-width: 100%;
      border: none;
      background-color: ${theme.colors.greyScale[10]};
      &:hover {
        box-shadow: none;
      }
    `}
`;
const ImageContainer = styled.div<{ $isBooking: boolean; $src: string }>`
  display: flex;
  justify-content: flex-end;
  width: 203px;
  min-width: 203px;
  height: 204px;
  ${({ $src }) => css`
    background: url(${$src});
    background-size: cover;
    background-position: center;
  `}
  ${({ $isBooking }) =>
    $isBooking &&
    css`
      min-width: 100px;
      max-width: 100px;
      max-height: 120px;

      @media (min-width: ${BreakpointsEnum.sm}px) {
        min-width: 203px;
        min-height: 204px;
      }
    `}
`;

const DescriptionContainer = styled.div<{ $isBooking: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 24px;
  max-width: 373px;
  ${({ $isBooking }) =>
    $isBooking &&
    css`
      width: 100%;
      margin: 8px;
      justify-content: space-between;
      gap: 16px;
      max-width: 100%;

      @media (min-width: ${BreakpointsEnum.sm}px) {
        margin: 22px 24px;
        justify-content: flex-start;
        gap: 0;
        max-width: 100%;
        width: 100%;
      }
    `}
`;

const RentTypeContainer = styled.div`
  display: flex;
`;

const RentTypeText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.caption_16_12_regular};

    @media (min-width: ${BreakpointsEnum.sm}px) {
      ${theme.typography.body_20_14_regular}
    }
  `}
`;

const TitleContainer = styled.div<{ $isBooking: boolean }>`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 8px;
  margin-top: 24px;
  ${({ $isBooking }) =>
    $isBooking &&
    css`
      margin-top: 0;

      @media (min-width: ${BreakpointsEnum.sm}px) {
        gap: 8px;
        margin-top: 16px;
      }
    `}
`;

const TitleText = styled(AppText)`
  overflow-x: hidden;
  text-overflow: ellipsis;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    white-space: nowrap;
  }
`;

const FeatureContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Features = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.body_20_14_regular}
  `}
  margin-left: 4px;
`;

const FooterContainer = styled.div<{ $isBooking: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 32px;
  ${({ $isBooking }) =>
    $isBooking &&
    css`
      margin-top: 0;

      @media (min-width: ${BreakpointsEnum.sm}px) {
        margin-top: 54px;
      }
    `}
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Address = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.body_20_14_regular}
  `}
`;

const PriceContainer = styled.div<{ $isBooking: boolean }>`
  display: flex;
  align-items: flex-end;
  width: 57%;
  ${({ $isBooking }) =>
    $isBooking &&
    css`
      width: auto;
    `}
`;

const PricePeriod = styled(AppText)<{ $isBooking: boolean }>`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.caption_14_10_regular};

    @media (min-width: ${BreakpointsEnum.sm}px) {
      ${theme.typography.caption_16_12_regular}
    }
  `}
  margin-left: 5px;
  ${({ $isBooking }) =>
    $isBooking &&
    css`
      margin-left: 8px;
    `}
`;

export default AdsCard;
