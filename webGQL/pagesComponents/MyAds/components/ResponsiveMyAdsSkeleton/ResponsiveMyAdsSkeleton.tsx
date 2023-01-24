import { SkeletonResponsiveCardMyAds } from 'components/ResponsiveCardMyAds';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

const ResponsiveMyAdsSkeleton: FC = () => {
  return (
    <MainContainer>
      <UpBlock>
        <StyledSkeleton width={220} height={20} borderRadius={12} isSecondary />
      </UpBlock>
      <SkeletonsBlock>
        <SkeletonResponsiveCardMyAds />
        <SkeletonResponsiveCardMyAds />
      </SkeletonsBlock>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 24px auto;
  gap: 24px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const UpBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-left: 16px;
`;

const StyledSkeleton = styled(Skeleton)`
  margin-top: 10px;
`;

const SkeletonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 343px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export default ResponsiveMyAdsSkeleton;
