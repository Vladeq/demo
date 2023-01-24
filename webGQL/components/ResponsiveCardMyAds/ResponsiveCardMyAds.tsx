import { ApartmentAdStatusType, RentPeriodType } from '__generated__/types';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BaseCardProps } from 'types/card';

import { StatusStates, TooltipForCard } from './components';

interface CardMyAdsProps extends BaseCardProps {
  status: ApartmentAdStatusType;
  rentType: RentPeriodType;
  confirmData: boolean;
  confirmPhone: boolean;
  confirmDocuments: boolean;
  confirmed?: boolean;
  currentStep?: number;
  payMethod: boolean;
  className?: string;
  id?: string;
  declineReason?: string;
}

const ResponsiveCardMyAds: FC<CardMyAdsProps> = ({
  id,
  pictureSrc,
  title,
  price,
  status,
  rentType,
  confirmData,
  currentStep,
  confirmPhone,
  confirmDocuments,
  confirmed,
  payMethod,
  className,
  declineReason,
}) => {
  return (
    <StyledCardContainer className={className}>
      <StatusStates
        id={id}
        pictureSrc={pictureSrc}
        title={title}
        price={price}
        status={status}
        rentType={rentType}
        currentStep={currentStep}
        confirmData={confirmData}
        confirmPhone={confirmPhone}
        confirmDocuments={confirmDocuments}
        confirmed={confirmed}
        payMethod={payMethod}
      />

      <TooltipForCard
        status={status}
        rentType={rentType}
        confirmData={confirmData}
        confirmPhone={confirmPhone}
        confirmDocuments={confirmDocuments}
        confirmed={confirmed}
        payMethod={payMethod}
        declineReason={declineReason}
      />
    </StyledCardContainer>
  );
};

const StyledCardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    max-width: 343px;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 24px;
  `}
`;

export default ResponsiveCardMyAds;
