import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

const ResponsiveRequestItemSkeleton: FC = () => {
  return (
    <MainContainer>
      <Skeleton width={64} height={65} borderRadius="50%" />
      <MiddleContainer>
        <Skeleton width={177} height={16} borderRadius={22} />
        <InnerContainer>
          <Skeleton width={263} height={12} borderRadius={18} isSecondary />
          <Skeleton width={111} height={12} borderRadius={18} isSecondary />
          <Skeleton width={199} height={12} borderRadius={18} isSecondary />
          <Skeleton width={199} height={12} borderRadius={18} isSecondary />
        </InnerContainer>
        <Container>
          <Skeleton width={154} height={14} borderRadius={20} />
        </Container>
      </MiddleContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: none;
  width: 100%;
  gap: 16px;
  align-items: flex-start;
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
  `}
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
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
  padding: 19px 0 25px;
`;

export default ResponsiveRequestItemSkeleton;
