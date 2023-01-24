import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Skeleton } from 'ui';

const SkeletonResponsiveCardMyAds: FC = () => {
  return (
    <MainContainer>
      <Skeleton width={343} height={171} borderRadius={24} />
      <SecondaryBlock>
        <UpContainer>
          <LeftUpBlock>
            <Skeleton width={115} height={12} borderRadius={17} isSecondary />
          </LeftUpBlock>
          <RightUpBlock>
            <Skeleton width={70} height={16} borderRadius={22} isSecondary />
            <Skeleton width={49} height={10} borderRadius={15} isSecondary />
          </RightUpBlock>
        </UpContainer>
        <DownContainer>
          <FirstBlock>
            <Skeleton width={311} height={14} borderRadius={20} isSecondary />
            <Skeleton width={150} height={14} borderRadius={20} isSecondary />
          </FirstBlock>
          <Skeleton width={311} height={32} borderRadius={8} />
          <SecondBlock>
            <Skeleton width={155} height={12} borderRadius={17} isSecondary />
            <Skeleton width={44} height={24} borderRadius={44} isSecondary />
          </SecondBlock>
        </DownContainer>
      </SecondaryBlock>
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
  `}
`;

const SecondaryBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 343px;
  padding: 0 16px;
`;

const UpContainer = styled.div`
  display: flex;
  margin: 20px 0 22px;
  justify-content: space-between;
`;

const LeftUpBlock = styled.div`
  display: flex;
`;

const RightUpBlock = styled.div`
  display: flex;
  gap: 8px;
`;

const DownContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 25px;
`;

const SecondBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0 20px;
`;

export default SkeletonResponsiveCardMyAds;
