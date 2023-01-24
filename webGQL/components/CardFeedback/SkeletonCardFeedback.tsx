import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Skeleton } from 'ui';

const SkeletonCardFeedback: FC = () => {
  return (
    <MainContainer>
      <Skeleton width={88} height={100} borderRadius={0} isSecondary />
      <SecondaryBlock>
        <Skeleton width={268} height={14} borderRadius={20} isSecondary />
        <DownBlock>
          <Skeleton width={224} height={12} borderRadius={17} isSecondary />
          <InnerBlock>
            <Skeleton width={69} height={12} borderRadius={17} isSecondary />
            <Skeleton width={69} height={12} borderRadius={17} isSecondary />
          </InnerBlock>
        </DownBlock>
      </SecondaryBlock>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 12px;
    width: 100%;
    max-width: 380px;
    overflow: hidden;
    gap: 8px;
  `}
`;

const SecondaryBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 282px;
  gap: 26px;
  padding: 12px 8px;
`;

const DownBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InnerBlock = styled.div`
  display: flex;
  gap: 16px;
`;

export default SkeletonCardFeedback;
