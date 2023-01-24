import { FC } from 'react';
import styled from 'styled-components';
import { BaseMyAdsCardComponentProps } from 'types';

import { ButtonsForCard } from '../ButtonsForCard';
import { TooltipForCard } from '../TooltipForCard';

const EditComponent: FC<BaseMyAdsCardComponentProps> = ({
  id,
  status,
  rentType,
  confirmData,
  confirmPhone,
  confirmDocuments,
  confirmed,
  payMethod,
  rentBookingType,
  currentStep,
  declineReason,
}) => {
  return (
    <MainContainer>
      <ButtonsForCard
        id={id}
        status={status}
        rentType={rentType}
        confirmData={confirmData}
        confirmPhone={confirmPhone}
        confirmDocuments={confirmDocuments}
        confirmed={confirmed}
        payMethod={payMethod}
        currentStep={currentStep}
      />
      <TooltipForCard
        status={status}
        id={id}
        rentType={rentType}
        rentBookingType={rentBookingType}
        confirmData={confirmData}
        confirmPhone={confirmPhone}
        confirmDocuments={confirmDocuments}
        confirmed={confirmed}
        payMethod={payMethod}
        declineReason={declineReason}
      />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 24px;
`;

export default EditComponent;
