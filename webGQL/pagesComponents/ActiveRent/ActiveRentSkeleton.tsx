import { useClientSize, useSkeletonLoading } from 'hooks';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

import { MapPin } from '../../../public/svg/components';

const ActiveRentSkeleton = () => {
  useSkeletonLoading();

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  return (
    <Root>
      <Content>
        <Heading>
          <HeadingSection>
            <Skeleton width={192} height={16} borderRadius={22} isSecondary />
          </HeadingSection>
        </Heading>
        <Slider>
          <Skeleton width="100%" height={239} borderRadius={22} isSecondary />
        </Slider>
        <Info>
          <User>
            <Skeleton width={64} height={64} borderRadius="50%" isSecondary />
            <UserDetails>
              <Skeleton width={177} height={16} borderRadius={22} isSecondary />
              <Skeleton width={208} height={12} borderRadius={18} isSecondary />
            </UserDetails>
          </User>
          <Address>
            <Skeleton width={isMobile ? 62 : 133} height={isMobile ? 12 : 16} borderRadius={22} isSecondary />
            <Skeleton width={isMobile ? 179 : 288} height={12} borderRadius={18} isSecondary />
          </Address>
        </Info>
        <Buttons>
          <Skeleton width="100%" height={48} borderRadius={12} isSecondary />
          <Skeleton width="100%" height={48} borderRadius={12} isSecondary />
        </Buttons>
        <Heading>
          <Skeleton width={192} height={16} borderRadius={22} isSecondary />
        </Heading>
        <Buttons>
          <Skeleton width="100%" height={48} borderRadius={12} isSecondary />
          <Skeleton width="100%" height={48} borderRadius={12} isSecondary />
        </Buttons>
        <Actions>
          <Action>
            <Skeleton width={231} height={14} borderRadius={20} isSecondary />
            <Skeleton width={24} height={24} borderRadius={4} isSecondary />
          </Action>
          <Action>
            <Skeleton width={231} height={14} borderRadius={20} isSecondary />
            <Skeleton width={24} height={24} borderRadius={4} isSecondary />
          </Action>
        </Actions>
        <Payment>
          <PaymentHeading>
            <Skeleton width={67} height={16} borderRadius={22} isSecondary />
            <Skeleton width={136} height={32} borderRadius={8} isSecondary />
          </PaymentHeading>
          <PaymentDetails>
            <Skeleton width="100%" height={64} borderRadius={20} isSecondary />
            <Skeleton width="100%" height={64} borderRadius={20} isSecondary />
          </PaymentDetails>
        </Payment>
        <Heading>
          <Skeleton width={104} height={16} borderRadius={22} isSecondary />
        </Heading>
        <Actions>
          <Action>
            <Skeleton width={231} height={14} borderRadius={20} isSecondary />
            <Skeleton width={24} height={24} borderRadius={4} isSecondary />
          </Action>
          <Action>
            <Skeleton width={231} height={14} borderRadius={20} isSecondary />
            <Skeleton width={24} height={24} borderRadius={4} isSecondary />
          </Action>
        </Actions>
      </Content>
      <MapContainer>
        <Map>
          <Skeleton width="100%" height={700} borderRadius={0} isSecondary />
          <Marker />
        </Map>
      </MapContainer>
    </Root>
  );
};

export default ActiveRentSkeleton;

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 56px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  margin-bottom: 30px;
`;

const HeadingSection = styled.div`
  padding-top: 32px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding-top: 0;
  }
`;

const Slider = styled.div`
  margin-bottom: 24px;
`;

const Info = styled.div`
  display: flex;
  column-gap: 48px;
  margin-bottom: 24px;
  flex-direction: column;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    flex-direction: row;
  }
`;

const User = styled.div`
  display: flex;
  column-gap: 16px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  justify-content: center;
`;

const Address = styled.div`
  display: flex;
  row-gap: 8px;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-top: 18px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    justify-content: center;
    margin-top: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  margin-bottom: 24px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyScale[10]};
  margin-bottom: 24px;
`;

const Payment = styled.div`
  margin-bottom: 24px;
`;

const PaymentHeading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const MapContainer = styled.div`
  display: none;
  width: 100%;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Map = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Marker = styled(MapPin)`
  position: absolute;
`;
