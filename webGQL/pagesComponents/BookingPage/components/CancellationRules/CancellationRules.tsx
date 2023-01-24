import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';
import { formatDateToFutureRange } from 'utils';

const DAYS_TO_RETURN_WITH_DISCONT = 7;

const CancellationRules: FC = () => {
  const { t } = useTranslation('bookingPage', { keyPrefix: 'cancelledRules' });
  const { getIsBreakpoint } = useClientSize();

  const showedCancelattionText = `${t('cancellationTextFirstPart')}${formatDateToFutureRange(
    DAYS_TO_RETURN_WITH_DISCONT,
    'HH:00 DD MMMM',
  )}${t('cancellationTextTwoPart')}`;

  const isWidthSm = getIsBreakpoint('sm');
  return (
    <Root>
      <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_medium' : 'title_22_18_bold'}>
        {t('title')}
      </AppText>
      <StyledAppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
        {showedCancelattionText}
      </StyledAppText>
      <StyledAppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
        {t('bookingText')}
      </StyledAppText>
      <ConditionText font="caption_16_12_regular">{t('conditionText')}</ConditionText>
    </Root>
  );
};

export default CancellationRules;

const ConditionText = styled(AppText)`
  margin-top: 32px;
  max-width: 100%;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 510px;
  }
`;

const StyledAppText = styled(AppText)`
  margin-top: 24px;
  max-width: 100%;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 500px;
  }
`;

const Root = styled.div`
  margin-top: 32px;
  margin-bottom: 24px;
`;
