import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { Card, cardTypeEnum } from './components/Card/Card';

const BankCards: FC = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'payments' });

  const { getIsBreakpoint } = useClientSize();
  const isWidthSm = getIsBreakpoint('sm');

  const handleAddNewCardClick = () => {};

  return (
    <Root>
      <CardsContainer>
        <Card hasCard={false} cardLastFourDigits="1234" cardType={cardTypeEnum.MASTERCARD} />
        <Card cardLastFourDigits="1234" cardType={cardTypeEnum.VISA} />
        <Card cardLastFourDigits="1224" cardType={cardTypeEnum.MASTERCARD} />
        <Card cardLastFourDigits="9999" cardType={cardTypeEnum.MASTERCARD} />
        <Card cardLastFourDigits="1234" cardType={cardTypeEnum.MASTERCARD} />
      </CardsContainer>
      <StyledButton
        isFullWight={isWidthSm}
        text={t('buttonAddNewCard')}
        size={ButtonSize.SMALL}
        variant={ButtonVariant.SECONDARY}
        onClick={handleAddNewCardClick}
      />
    </Root>
  );
};

export default BankCards;

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 36px;
  row-gap: 16px;
  margin-bottom: 24px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 24px;
    margin-bottom: 16px;
  }
`;

const StyledButton = styled(Button)`
  margin-bottom: 32px;
  ${({ theme: { typography } }) => typography.caption_16_12_medium}
`;
