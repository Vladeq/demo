import { FC } from 'react';
import styled from 'styled-components';
import { BaseMyAdsCardComponentProps } from 'types';

import { TooltipForCard } from '../TooltipForCard';

const EditComponent: FC<BaseMyAdsCardComponentProps> = ({
  status,
  rentType,
  confirmData,
  confirmPhone,
  confirmDocuments,
  confirmed,
  payMethod,
}) => {
  return (
    <MainContainer>
      <TooltipForCard
        status={status}
        rentType={rentType}
        confirmData={confirmData}
        confirmPhone={confirmPhone}
        confirmDocuments={confirmDocuments}
        confirmed={confirmed}
        payMethod={payMethod}
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
