import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import {
  LongTermRentCancellationPolicyType,
  ShortTermRentCancellationPolicyType,
} from '../../../../__generated__/types';

type CancelRulesModalProps = {
  cancelationPolicy: ShortTermRentCancellationPolicyType | LongTermRentCancellationPolicyType;
  onClose: () => void;
};

const CancelRulesModal: FC<CancelRulesModalProps> = ({ cancelationPolicy, onClose }) => {
  const { t } = useTranslation('activeRentPage', { keyPrefix: 'cancelRulesModal' });
  const { t: tPolicy } = useTranslation('importantInfoPage', { keyPrefix: 'cancel' });

  const rulesOptions = useMemo(
    () => [
      { label: 'Гибкие', value: ShortTermRentCancellationPolicyType.Flexible },
      { label: 'Умеренные', value: ShortTermRentCancellationPolicyType.Moderate },
      { label: 'Негибкие', value: ShortTermRentCancellationPolicyType.Inflexible },
      { label: 'Строгие', value: ShortTermRentCancellationPolicyType.Strict },
      { label: '', value: LongTermRentCancellationPolicyType.Forfeit },
    ],
    [t],
  );

  const filterOptionIndex = rulesOptions.findIndex((option) => option.value === cancelationPolicy);

  console.log(filterOptionIndex, 'option');

  const TermsMapping = useMemo(() => {
    return {
      [ShortTermRentCancellationPolicyType.Strict]: tPolicy('rules.strict'),
      [ShortTermRentCancellationPolicyType.Flexible]: tPolicy('rules.flexible'),
      [ShortTermRentCancellationPolicyType.Inflexible]: tPolicy('rules.inFlexible'),
      [ShortTermRentCancellationPolicyType.Moderate]: tPolicy('rules.moderate'),
      [LongTermRentCancellationPolicyType.Forfeit]: tPolicy('rules.forfeit'),
    };
  }, [tPolicy]);

  return (
    <MainContainer>
      <TextContainer>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
          <>{rulesOptions[filterOptionIndex].label}</>
        </AppText>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          <>{TermsMapping[cancelationPolicy]}</>
        </AppText>
      </TextContainer>
      <StyledButton onClick={onClose} variant={ButtonVariant.PRIMARY} size={ButtonSize.LONG_TEXT} text={t('ok')} />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default CancelRulesModal;
