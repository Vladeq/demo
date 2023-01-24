import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText } from 'ui';

export enum TransactionVariant {
  PROFIT = 'PROFIT',
  LOSS = 'LOSS',
}

type TransactionProps = {
  variant?: TransactionVariant;
};

const Transaction: FC<TransactionProps> = ({ variant = TransactionVariant.LOSS }) => {
  return (
    <Root>
      <Date>12.05.2021</Date>
      <CardData>•••• 5424</CardData>
      <Housing>Апартаменты в центре Нур-Султана</Housing>
      <Total $variant={variant}>- 120 000 〒</Total>
    </Root>
  );
};

export default Transaction;

const Root = styled.div`
  display: grid;
  grid-template-areas:
    'housing total'
    'date card';
  row-gap: 4px;
  column-gap: 16px;
  padding: 8px 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 0 0 1px ${({ theme: { colors } }) => colors.greyScale[30]};
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  align-items: center;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    grid-template-areas: 'date card housing total';
    grid-template-columns: 60px 60px auto max-content;
    column-gap: 32px;
    padding: 10px 24px;
    &:hover {
      cursor: pointer;
      background: ${({ theme: { colors } }) => colors.greyScale[10]};
    }
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  grid-area: date;
  max-width: 60px;
  ${({ theme: { typography } }) => typography.caption_16_12_regular}
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const CardData = styled(AppText)`
  display: flex;
  grid-area: card;
  white-space: nowrap;
  justify-content: end;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  ${({ theme: { typography } }) => typography.caption_16_12_regular}
  @media (min-width: ${BreakpointsEnum.sm}px) {
    justify-content: start;
    color: ${({ theme: { colors } }) => colors.greyScale[100]};
    ${({ theme: { typography } }) => typography.body_20_14_regular}
  }
`;

const Housing = styled(AppText)`
  grid-area: housing;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
  height: 24px;
  ${({ theme: { typography } }) => typography.body_20_14_medium}
  @media (min-width: ${BreakpointsEnum.sm}px) {
    height: fit-content;
    ${({ theme: { typography } }) => typography.body_20_14_regular}
  }
`;

type RenderCardColorProps = {
  $variant: TransactionVariant;
};

const renderCardColor = css<RenderCardColorProps>`
  ${({ $variant }) => {
    switch ($variant) {
      case TransactionVariant.PROFIT: {
        return css`
          color: ${({ theme: { colors } }) => colors.additional.green};
        `;
      }
      case TransactionVariant.LOSS: {
        return css`
          color: ${({ theme: { colors } }) => colors.greyScale[100]};
        `;
      }
      default: {
        return css``;
      }
    }
  }}
`;

const Total = styled.div<{ $variant: TransactionVariant }>`
  display: flex;
  grid-area: total;
  justify-content: end;
  white-space: nowrap;
  align-self: end;
  ${renderCardColor}
  ${({ theme: { typography } }) => typography.body_20_14_regular}
  @media (min-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.body_20_14_medium}
  }
`;
