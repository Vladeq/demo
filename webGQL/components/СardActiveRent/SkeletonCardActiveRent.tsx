import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Skeleton } from 'ui';

const SkeletonCardActiveRent: FC = () => {
  return (
    <MainContainer>
      <Skeleton width={203} height={204} borderRadius={0} isSecondary />
      <SecondaryBlock>
        <UpBlock>
          <Skeleton width={356} height={16} borderRadius={22} isSecondary />
          <Skeleton width={741} height={12} borderRadius={17} isSecondary />
        </UpBlock>
        <DownBlock>
          <Skeleton width={173} height={23} borderRadius={32} isSecondary />
          <InnerBlock>
            <Skeleton width={235} height={12} borderRadius={17} isSecondary />
            <Skeleton width={70} height={12} borderRadius={17} isSecondary />
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
    border-radius: 24px;
    width: 100%;
    max-width: 1213px;
    overflow: hidden;
  `}
`;

const SecondaryBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 986px;
  gap: 34px;
  padding: 24px;
`;

const UpBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DownBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 39px;
`;

const InnerBlock = styled.div`
  display: flex;
  gap: 8px;
`;

export default SkeletonCardActiveRent;
