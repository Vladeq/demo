import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';

import { Keys } from '../../../public/svg/components';

const OwnershipConfirmed: FC = () => {
  const { t } = useTranslation('ui', { keyPrefix: 'ownership' });

  return (
    <Root>
      <StyledKeys />
      <TextContainer>
        <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
          {t('title')}
        </AppText>
        <StyledAppText font="caption_16_12_regular">{t('text')}</StyledAppText>
      </TextContainer>
    </Root>
  );
};

export default OwnershipConfirmed;

const StyledAppText = styled(AppText)`
  margin-top: 4px;
`;
const TextContainer = styled.div`
  display: flex;
  max-width: 400px;
  flex-direction: column;
`;
const StyledKeys = styled(Keys)`
  flex-shrink: 0;
  margin-right: 16px;
`;
const Root = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(${({ theme: { colors } }) => colors.gradient.saturation});
`;
