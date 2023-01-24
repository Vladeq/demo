import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';

import { ShortTermRentCancellationPolicyType } from '../../../../../../__generated__/types';

type TermsProps = {
  type: ShortTermRentCancellationPolicyType;
};

const Terms: FC<TermsProps> = ({ type }) => {
  const { t } = useTranslation('importantInfoPage', { keyPrefix: 'cancel' });

  const TermsMapping = useMemo(() => {
    return {
      [ShortTermRentCancellationPolicyType.Strict]: t('rules.strict'),
      [ShortTermRentCancellationPolicyType.Flexible]: t('rules.flexible'),
      [ShortTermRentCancellationPolicyType.Inflexible]: t('rules.inFlexible'),
      [ShortTermRentCancellationPolicyType.Moderate]: t('rules.moderate'),
    };
  }, [t]);
  return (
    <Root>
      <Title font="caption_16_12_medium" variant={TextVariants.SECONDARY}>
        {t('title')}
      </Title>
      <Description font="caption_16_12_regular">{TermsMapping[type]}</Description>
    </Root>
  );
};

export default Terms;

const Title = styled(AppText)``;

const Description = styled(AppText)<{ $isLongRent?: boolean }>`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px 24px;
  max-width: 483px;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
  border-radius: 12px;
  margin-top: 16px;
`;
