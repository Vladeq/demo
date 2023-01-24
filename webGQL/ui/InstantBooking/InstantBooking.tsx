import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui/AppText';

import { Flash } from '../../../public/svg/components';

const InstantBooking = () => {
  const { t } = useTranslation('ui', { keyPrefix: 'instantBooking' });

  return (
    <Root>
      <IconContainer>
        <Flash />
      </IconContainer>
      <TextContainer>
        <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
          {t('title')}
        </AppText>
        <AppText font="caption_16_12_regular">{t('text')}</AppText>
      </TextContainer>
    </Root>
  );
};

export default InstantBooking;

const TextContainer = styled.div`
  display: flex;
  max-width: 292px;
  flex-direction: column;
  gap: 4px;
  margin-left: 16px;
`;
const IconContainer = styled.div``;
const Root = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px 12px 28px;
  border-radius: 16px;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
`;
