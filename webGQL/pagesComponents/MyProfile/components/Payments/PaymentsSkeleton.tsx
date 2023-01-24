import { useClientSize } from 'hooks';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Skeleton } from 'ui';

const PaymentsSkeleton = () => {
  return (
    <Root>
      <Title>
        <Skeleton width={220} height={20} borderRadius={12} isSecondary />
      </Title>
      <BankCard>
        <InfoCard>
          <Skeleton width={62} height={34} borderRadius={7} isSecondary />
          <Skeleton width={130} height={14} borderRadius={20} isSecondary />
        </InfoCard>
        <Skeleton width={32} height={32} borderRadius={7} isSecondary />
      </BankCard>
      <Button>
        <Skeleton width="100%" height={32} borderRadius={12} isSecondary />
      </Button>
      <Title>
        <Skeleton width={220} height={20} borderRadius={12} isSecondary />
      </Title>
      <Tabs>
        <Skeleton width="100%" height={16} borderRadius={12} isSecondary />
        <Skeleton width="100%" height={16} borderRadius={12} isSecondary />
      </Tabs>
      <Captions>
        <CaptionsRow>
          <Skeleton width={56} height={8.75} borderRadius={12} isSecondary />
          <Skeleton width={60} height={8.75} borderRadius={12} isSecondary />
          <Skeleton width={50} height={8.75} borderRadius={12} isSecondary />
        </CaptionsRow>
        <CaptionsRowRight>
          <Skeleton width={32} height={8.75} borderRadius={12} isSecondary />
          <Skeleton width={32} height={8.75} borderRadius={12} isSecondary />
        </CaptionsRowRight>
      </Captions>
      <Transactions>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </Transactions>
      <Button>
        <Skeleton width="100%" height={40} borderRadius={12} isSecondary />
      </Button>
    </Root>
  );
};

const Transaction = () => {
  const { getIsBreakpoint } = useClientSize();
  const isWidthSm = getIsBreakpoint('sm');
  return (
    <>
      {isWidthSm ? (
        <TransactionMobileContainer>
          <TransactionInfoContainer>
            <Skeleton width="100%" height={15} borderRadius={17.5} isSecondary />
            <Skeleton width={65} height={8} borderRadius={17.5} isSecondary />
          </TransactionInfoContainer>

          <StyledTransactionInfoContainer>
            <Skeleton width={69} height={15} borderRadius={17.5} isSecondary />
            <Skeleton width={51} height={8} borderRadius={17.5} isSecondary />
          </StyledTransactionInfoContainer>
          <Skeleton width={24} height={24} borderRadius={8} isSecondary />
        </TransactionMobileContainer>
      ) : (
        <TransactionContainer>
          <Skeleton width={56} height={10.5} borderRadius={15} isSecondary />
          <Skeleton width={60} height={10.5} borderRadius={15} isSecondary />
          <Skeleton width="100%" height={10.5} borderRadius={15} isSecondary />
          <Skeleton width={54} height={10.5} borderRadius={15} isSecondary />
          <Skeleton width={54} height={10.5} borderRadius={15} isSecondary />
        </TransactionContainer>
      )}
    </>
  );
};

export default PaymentsSkeleton;

const Root = styled.div`
  max-width: 848px;
  margin-top: 32px;
  margin-bottom: 80px;
  padding: 16px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  border-radius: 21px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 40px;
  }
`;

const Title = styled.div`
  margin-bottom: 24px;
`;

const Button = styled.div`
  max-width: 100%;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 232px;
  }
  :not(:last-child) {
    margin-bottom: 32px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 140px 140px;
  column-gap: 24px;
  margin-bottom: 24px;
`;

const BankCard = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 15px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  margin-bottom: 16px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 366px;
  }
`;

const InfoCard = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

const Captions = styled.div`
  display: none;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    margin-bottom: 13px;
  }
`;

const CaptionsRow = styled.div`
  display: flex;
  column-gap: 32px;
`;

const CaptionsRowRight = styled.div`
  display: flex;
  column-gap: 55px;
`;

const TransactionContainer = styled.div`
  display: grid;
  grid-template-columns: max-content max-content 1fr max-content max-content;
  column-gap: 32px;
  padding: 18.5px 24px;
  box-shadow: 0 0 0 1px ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 12px;
`;

const Transactions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  margin-bottom: 32px;
`;

const TransactionMobileContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  column-gap: 26px;
  align-items: center;
  padding: 17px 16px 16px 16px;
  box-shadow: 0 0 0 1px ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 12px;
`;

const TransactionInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const StyledTransactionInfoContainer = styled(TransactionInfoContainer)`
  align-items: flex-end;
`;
