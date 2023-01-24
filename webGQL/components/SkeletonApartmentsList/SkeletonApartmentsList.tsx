import { useClientSize } from 'hooks';
import React from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

const cards = [1, 2, 3];

const SkeletonApartmentsList = () => {
  const { getIsBreakpoint } = useClientSize();

  const isWidthSm = getIsBreakpoint('sm');
  return (
    <Root>
      {!isWidthSm && (
        <>
          <Title />
          {cards.map((item) => (
            <CardContainer key={item}>
              <ImageContainer>
                <Skeleton width={203} height={204} borderRadius="24px 0 0 24px" />
              </ImageContainer>
              <TextContainer>
                <Skeleton width={129} height={20} borderRadius={20} isSecondary />
                <InnerContainer>
                  <Skeleton width={356} height={22} borderRadius={20} isSecondary />
                  <NestContainer>
                    <Skeleton width={47} height={16} borderRadius={20} isSecondary />
                    <Skeleton width={122} height={16} borderRadius={20} isSecondary />
                    <Skeleton width={58} height={16} borderRadius={20} isSecondary />
                  </NestContainer>
                </InnerContainer>
                <LowContainer>
                  <Skeleton width={231} height={16} borderRadius={20} isSecondary />
                  <Skeleton width={70} height={22} borderRadius={20} isSecondary />
                </LowContainer>
              </TextContainer>
            </CardContainer>
          ))}
        </>
      )}
      {isWidthSm && (
        <>
          <ResponsiveContainer>
            <HelperBlock />
            <TitleContainer>
              <Skeleton width={263} height={24} borderRadius={23} isSecondary />
            </TitleContainer>
            {cards.map((item) => (
              <ResponsiveCard key={item}>
                <Skeleton width={343} height={171} borderRadius="16px 16px 0 0" />
                <ResposiveTextContainer>
                  <Skeleton width={155} height={12} borderRadius={17.5} isSecondary />
                  <StyledSkeleton width={311} height={14} borderRadius={20} isSecondary />
                  <StyledSkeleton width={150} height={14} borderRadius={20} isSecondary />
                  <ResponsiveLowContainer>
                    <StyledSkeleton width={41} height={10.5} borderRadius={15} isSecondary />
                    <StyledSkeleton width={104} height={10.5} borderRadius={15} isSecondary />
                    <StyledSkeleton width={50} height={10.5} borderRadius={15} isSecondary />
                  </ResponsiveLowContainer>
                </ResposiveTextContainer>
              </ResponsiveCard>
            ))}
          </ResponsiveContainer>
        </>
      )}
    </Root>
  );
};

export default SkeletonApartmentsList;

const ResponsiveLowContainer = styled.div`
  display: flex;
  margin-top: 22px;
  gap: 24px;
`;
const StyledSkeleton = styled(Skeleton)`
  margin: 12px 0 6px;
`;
const ResposiveTextContainer = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
`;
const ResponsiveCard = styled.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: column;
  width: 343px;
  border-radius: 16px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[20]};
`;
const TitleContainer = styled.div`
  margin: 16px 0 24px;
`;
const HelperBlock = styled.div`
  margin-top: 8px;
  width: 50px;
  height: 6px;
  border-radius: 22px;
  background: ${({ theme: { colors } }) => colors.greyScale[30]};
`;
const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -24px;
  padding: 0 16px;
  border-radius: 24px 24px 0 0;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;
const LowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NestContainer = styled.div`
  display: flex;
  gap: 24px;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  margin-bottom: 56px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 22px 24px;
`;
const ImageContainer = styled.div``;
const CardContainer = styled.div`
  display: flex;
  margin-top: 24px;
  width: 624px;
  height: 203px;
  border-radius: 24px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;
const Title = styled.div`
  margin-top: 16px;
  width: 321px;
  height: 24px;
  border-radius: 20px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;
const Root = styled.div`
  width: 100%;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    width: 624px;
  }
`;
