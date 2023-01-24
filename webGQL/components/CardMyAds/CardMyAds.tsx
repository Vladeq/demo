import { ApartmentAdStatusType, RentPeriodType, ShortTermRentBookingType } from '__generated__/types';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { BaseCardProps } from 'types/card';
import { AppText } from 'ui';
import { handleDivisionOnCategories } from 'utils';

import { EditComponent } from './components/index';

interface CardMyAdsProps extends BaseCardProps {
  status: ApartmentAdStatusType;
  rentType: RentPeriodType;
  confirmData: boolean;
  confirmPhone: boolean;
  confirmDocuments: boolean;
  confirmed?: boolean;
  payMethod: boolean;
  className?: string;
  currentStep: number;
  rentBookingType?: ShortTermRentBookingType | undefined;
  id?: string;
  declineReason?: string;
}

const CardMyAds: FC<CardMyAdsProps> = ({
  id,
  pictureSrc,
  title,
  address,
  price,
  status,
  rentType,
  confirmData,
  rentBookingType,
  confirmPhone,
  confirmDocuments,
  confirmed,
  payMethod,
  currentStep,
  className,
  declineReason,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });
  const isStopped = status === ApartmentAdStatusType.Paused;

  return (
    <StyledCardContainer className={className}>
      <InfoContainer>
        <ImageContainer $isStopped={isStopped} $src={pictureSrc} />
        <DescriptionContainer>
          <TitleContainer>
            <TitleText variant={TextVariants.SECONDARY} font="title_22_18_medium">
              {title}
            </TitleText>
            <Address>{address}</Address>
          </TitleContainer>
          <PriceContainer>
            <AppText variant={TextVariants.SECONDARY} font="title_36_26_bold">
              {handleDivisionOnCategories(price)} ₸{' '}
            </AppText>
            <PricePeriod>
              {(rentType === RentPeriodType.LongTerm && t('perMonth')) ||
                (rentType === RentPeriodType.ShortTerm && t('perDay'))}
            </PricePeriod>
          </PriceContainer>
        </DescriptionContainer>
      </InfoContainer>
      <EditComponent
        id={id}
        rentBookingType={rentBookingType}
        status={status}
        rentType={rentType}
        confirmData={confirmData}
        confirmPhone={confirmPhone}
        confirmDocuments={confirmDocuments}
        confirmed={confirmed}
        payMethod={payMethod}
        currentStep={currentStep}
        declineReason={declineReason}
      />
    </StyledCardContainer>
  );
};

const StyledCardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 24px;
  `}
`;

const ImageContainer = styled.div<{ $isStopped: boolean; $src: string }>`
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
  ${({ $isStopped }) => css`
    filter: ${$isStopped && `grayscale(100%);`};
  `}
`;

const InfoContainer = styled.div`
  display: flex;
  border-radius: 24px;
  overflow: hidden;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 24px;
  min-width: 250px;
`;

const TitleText = styled(AppText)`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Address = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.body_20_14_regular}
  `}
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 24px;
`;

const PricePeriod = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.caption_16_12_regular}
  `}
  margin: 5px;
`;

export default CardMyAds;
