import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Skeleton } from 'ui';

const SkeletonCardMyAds: FC = () => {
  return (
    <MainContainer>
      <Skeleton width={203} height={204} borderRadius={0} />
      <SecondaryBlock>
        <UpContainer>
          <LeftUpBlock>
            <Skeleton width={643} height={20} borderRadius={12} isSecondary />
            <Skeleton width={328} height={12} borderRadius={12} isSecondary />
          </LeftUpBlock>
          <RightUpBlock>
            <Skeleton width={212} height={40} borderRadius={12} isSecondary />
            <Skeleton width={40} height={40} borderRadius={12} isSecondary />
          </RightUpBlock>
        </UpContainer>
        <DownContainer>
          <LeftDownBlock>
            <Skeleton width={100} height={24} borderRadius={12} isSecondary />
            <Skeleton width={64} height={8} borderRadius={12} isSecondary />
          </LeftDownBlock>
          <RightDownBlock>
            <Skeleton width={166} height={8} borderRadius={12} isSecondary />
            <Skeleton width={56} height={24} borderRadius={12} isSecondary />
          </RightDownBlock>
        </DownContainer>
      </SecondaryBlock>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 24px;
    margin: 24px 0;
    overflow: hidden;
    width: 100%;
    max-width: 1216px;
  `}
`;

const SecondaryBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  width: 100%;
  max-width: 989px;
`;

const UpContainer = styled.div`
  display: flex;
  margin: 24px 0 80px 0;
  justify-content: space-between;
  width: 100%;
`;

const LeftUpBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RightUpBlock = styled.div`
  display: flex;
  gap: 8px;
`;

const DownContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const LeftDownBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightDownBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default SkeletonCardMyAds;
