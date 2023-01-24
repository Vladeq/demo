import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

const RequestItemSkeleton: FC = () => {
  return (
    <MainContainer>
      <Skeleton width={65} height={65} borderRadius="50%" />
      <MiddleContainer>
        <Skeleton width={177} height={16} borderRadius={22} />
        <InnerContainer>
          <Skeleton width={514} height={12} borderRadius={18} isSecondary />
          <Skeleton width={450} height={12} borderRadius={18} isSecondary />
          <Skeleton width={348} height={12} borderRadius={18} isSecondary />
        </InnerContainer>
      </MiddleContainer>
      <Container>
        <Skeleton width={154} height={14} borderRadius={20} />
      </Container>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  align-items: flex-start;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 37px;
`;

export default RequestItemSkeleton;
