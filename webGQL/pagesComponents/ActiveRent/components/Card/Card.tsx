import { FC } from 'react';
import styled from 'styled-components';
import { AppText } from 'ui';

import { Mastercard, Visa } from '../../../../../public/svg/components';

export enum cardTypeEnum {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
}

interface CardProps {
  cardLastFourDigits: string;
  cardType: cardTypeEnum;
}

const Card: FC<CardProps> = ({ cardType, cardLastFourDigits }) => {
  const renderCartTypeIcon = (cardType: cardTypeEnum) => {
    switch (cardType) {
      case cardTypeEnum.MASTERCARD: {
        return <Mastercard />;
      }
      case cardTypeEnum.VISA: {
        return <Visa />;
      }
      default: {
        // need default
      }
    }
  };

  return (
    <MainCotainer>
      <CardTypeIcon>{renderCartTypeIcon(cardType)}</CardTypeIcon>
      <CardNumber>•••• {cardLastFourDigits}</CardNumber>
    </MainCotainer>
  );
};

const MainCotainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 8px;
`;

const CardNumber = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
  ${({ theme: { typography } }) => typography.body_24_16_regular}
`;

const CardTypeIcon = styled.div`
  display: flex;
  width: 64px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

export default Card;
