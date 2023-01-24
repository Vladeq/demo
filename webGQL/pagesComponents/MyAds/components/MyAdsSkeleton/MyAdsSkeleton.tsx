import { SkeletonCardMyAds } from 'components/CardMyAds';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

const MyAdsSkeleton: FC = () => {
  return (
    <MainContainer>
      <UpBlock>
        <StyledSkeleton width={220} height={20} borderRadius={12} isSecondary />
      </UpBlock>
      <SkeletonCardMyAds />
      <SkeletonCardMyAds />
      <StyledSkeleton width={220} height={20} borderRadius={12} isSecondary />
      <SkeletonCardMyAds />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: none;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 912px;
    padding-top: 40px;
  }
`;

const UpBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSkeleton = styled(Skeleton)`
  margin-top: 10px;
`;

export default MyAdsSkeleton;
