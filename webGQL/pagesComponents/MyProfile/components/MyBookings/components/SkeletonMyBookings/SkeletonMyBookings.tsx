import { SkeletonCardFeedback } from 'components/CardFeedback';
import { ResponsiveSkeletonCard, SkeletonCardActiveRent } from 'components/СardActiveRent';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

const SkeletonMyBookings: FC = () => {
  return (
    <>
      <BigContainer>
        <Skeleton width={220} height={20} borderRadius={12} isSecondary />
        <Skeleton width={274} height={16} borderRadius={22} isSecondary />
        <SkeletonCardActiveRent />
        <InnerContainer>
          <Skeleton width={220} height={20} borderRadius={12} isSecondary />
          <SecondaryContainer>
            <Skeleton width={140} height={16} borderRadius={22} isSecondary />
            <Skeleton width={140} height={16} borderRadius={22} isSecondary />
          </SecondaryContainer>
          <SkeletonsContainer>
            <SkeletonCardFeedback />
            <SkeletonCardFeedback />
            <SkeletonCardFeedback />
            <SkeletonCardFeedback />
            <SkeletonCardFeedback />
            <SkeletonCardFeedback />
          </SkeletonsContainer>
        </InnerContainer>
      </BigContainer>
      <SmallContainer>
        <Skeleton width={220} height={20} borderRadius={12} />
        <Skeleton width={176} height={20} borderRadius={12} isSecondary />
        <ResponsiveSkeletonCard />
        <BottomContainer>
          <Skeleton width={220} height={20} borderRadius={12} />
        </BottomContainer>
      </SmallContainer>
    </>
  );
};

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  gap: 24px;
`;

const SecondaryContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 24px;
`;

const SkeletonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px 36px;
`;

const SmallContainer = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;
  gap: 26px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  padding-top: 6px;
`;

export default SkeletonMyBookings;
