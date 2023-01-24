import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

const TableCaptions = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'payments' });

  return (
    <Root>
      <Caption variant={TextVariants.SECONDARY}>{t('date')}</Caption>
      <Caption variant={TextVariants.SECONDARY}>{t('card')}</Caption>
      <Caption variant={TextVariants.SECONDARY}>{t('housing')}</Caption>
      <Caption variant={TextVariants.SECONDARY}>{t('total')}</Caption>
    </Root>
  );
};

export default TableCaptions;

const Root = styled.div`
  display: grid;
  grid-template-columns: 60px 60px auto 64px;
  column-gap: 32px;
  padding: 0 24px;
  margin-bottom: 8px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const Caption = styled(AppText)`
  display: flex;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  ${({ theme: { typography } }) => typography.caption_14_10_medium}
  &:last-child {
    justify-content: flex-end;
  }
`;
