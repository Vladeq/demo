import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Skeleton } from 'ui';

const ResponsiveSkeletonCard: FC = () => {
  return (
    <MainContainer>
      <Skeleton width={343} height={171} borderRadius={0} />
      <InnerContainer>
        <UpContainer>
          <Skeleton width={155} height={12} borderRadius={17} isSecondary />
          <UpInner>
            <Skeleton width={70} height={16} borderRadius={22} isSecondary />
            <Skeleton width={49} height={10} borderRadius={15} isSecondary />
          </UpInner>
        </UpContainer>
        <MiddleContainer>
          <FirstContainer>
            <Skeleton width={311} height={14} borderRadius={20} />
            <Skeleton width={155} height={12} borderRadius={17} />
          </FirstContainer>
          <SecondContainer>
            <InnerFirst>
              <Skeleton width={155} height={12} borderRadius={17} isSecondary />
              <Skeleton width={155} height={12} borderRadius={17} isSecondary />
            </InnerFirst>
            <InnerSecond>
              <Skeleton width={70} height={16} borderRadius={22} isSecondary />
              <Skeleton width={70} height={16} borderRadius={22} isSecondary />
            </InnerSecond>
          </SecondContainer>
        </MiddleContainer>
        <BottomContainer>
          <Skeleton width={311} height={32} borderRadius={8} />
          <Skeleton width={311} height={32} borderRadius={8} isSecondary />
        </BottomContainer>
      </InnerContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 24px;
    width: 100%;
    max-width: 343px;
    overflow: hidden;
  `}
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 16px 16px;
  gap: 16px;
`;

const UpContainer = styled.div`
  display: flex;
  gap: 29px;
`;

const UpInner = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding-top: 6px;
`;

const FirstContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SecondContainer = styled.div`
  display: flex;
  gap: 86px;
`;

const InnerFirst = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InnerSecond = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default ResponsiveSkeletonCard;
