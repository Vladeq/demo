import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

import { RequestItemSkeleton, ResponsiveRequestItemSkeleton } from '../index';

const RequestsSkeleton: FC = () => {
  return (
    <MainContainer>
      <Skeletons>
        <Skeleton width={175} height={16} borderRadius={22} />
        <RequestItemSkeleton />
        <RequestItemSkeleton />
        <RequestItemSkeleton />
      </Skeletons>
      <Skeletons>
        <Skeleton width={175} height={16} borderRadius={22} />
        <RequestItemSkeleton />
        <RequestItemSkeleton />
        <RequestItemSkeleton />
      </Skeletons>
      <ResponsiveSkeletons>
        <StyledSkeleton width={175} height={16} borderRadius={22} />
        <ResponsiveRequestItemSkeleton />
        <ResponsiveRequestItemSkeleton />
        <ResponsiveRequestItemSkeleton />
      </ResponsiveSkeletons>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 848px;
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
  `}
  padding: 0px 40px 40px;
  border-radius: 24px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0px 16px;
  }
`;

const Skeletons = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  gap: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const ResponsiveSkeletons = styled.div`
  display: none;
  flex-direction: column;
  padding-top: 30px;
  gap: 16px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
  }
`;

const StyledSkeleton = styled(Skeleton)`
  margin-bottom: 14px;
`;

export default RequestsSkeleton;
