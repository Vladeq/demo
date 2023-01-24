import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, RadioButton } from 'ui';
import { formatDateToFutureRange, getPercentOnRent, handleDivisionOnCategories } from 'utils';

type PaymentFormatProps = {
  total: number;
  isFullPayment: boolean;
  setIsFullPayment: (isFullPayment: boolean) => void;
};

const PERCENTS = 60;
const DAYS_BEFORE_SECOND_PAYMENT = 14;

const PaymentFormat: FC<PaymentFormatProps> = ({ total, isFullPayment, setIsFullPayment }) => {
  const { t } = useTranslation('bookingPage', { keyPrefix: 'paymentFormat' });
  const { getIsBreakpoint } = useClientSize();

  const fullPrice = String(total).split(/\s+/).join('');
  const defferedPayment = Math.round(getPercentOnRent(Number(fullPrice), PERCENTS));
  const defferedPaymentString = handleDivisionOnCategories(String(defferedPayment));
  const initialPayment = Number(fullPrice) - defferedPayment;
  const initialPaymentSting = handleDivisionOnCategories(String(initialPayment));

  const showedSubtitle = `${t('paymentSubtitleFirstPart')}
                          ${initialPaymentSting}
                          ${t('paymentSubtitleSecondPart')}
                          ${defferedPaymentString}
                          ${t('paymentSubtitleThirdPart')}
                          ${formatDateToFutureRange(DAYS_BEFORE_SECOND_PAYMENT, 'DD MMMM YYYY')}
                          ${t('paymentSubtitleFourthPart')}`;

  const paymentData = [
    { title: t('fullPaymentTitle'), subtitle: t('fullPaymentSubtitle'), checked: isFullPayment, data: true },
    { title: t('paymentTitle'), subtitle: showedSubtitle, checked: !isFullPayment, data: false },
  ];

  const isWidthSm = getIsBreakpoint('sm');
  return (
    <Root>
      <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_medium' : 'title_22_18_bold'}>
        {t('title')}
      </AppText>
      <Container>
        {paymentData.map((payment, index) => (
          <Item key={index}>
            <InnerContainer>
              <RadioButtonContainer>
                <RadioButton checked={payment.checked} onClick={() => setIsFullPayment(payment.data)} />
              </RadioButtonContainer>
              <TextContainer>
                <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
                  {payment.title}
                </AppText>
                <StyledAppText font="body_20_14_regular">{payment.subtitle}</StyledAppText>
              </TextContainer>
            </InnerContainer>
            <PriceText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_medium' : 'body_24_16_medium'}>
              {`${handleDivisionOnCategories(String(total))} 〒`}
            </PriceText>
          </Item>
        ))}
      </Container>
    </Root>
  );
};

export default PaymentFormat;

const RadioButtonContainer = styled.div``;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceText = styled(AppText)`
  width: 150px;
  text-align: right;
  flex-shrink: 0;

  @media (max-width: ${BreakpointsEnum.s}px) {
    flex-shrink: 1;
  }
`;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  max-width: 170px;
  @media (min-width: ${BreakpointsEnum.s}px) {
    max-width: 400px;
  }

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 600px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  margin-left: 18px;
  max-width: 100%;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  min-width: 170px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 666px;
  }
`;

const Item = styled.div`
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 24px;
`;

const Root = styled.div`
  margin-top: 33px;
`;
