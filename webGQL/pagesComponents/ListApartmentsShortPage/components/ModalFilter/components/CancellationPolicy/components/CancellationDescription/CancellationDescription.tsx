import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';

const CancellationDescription: FC<{ cancellationText: string }> = ({ cancellationText }) => {
  const { t } = useTranslation('listApartmentsPage');
  return (
    <CancellationContainer>
      <AppText variant={TextVariants.SECONDARY} font="caption_16_12_medium">
        {t('modalFilters.termsCancellationPolicy')}
      </AppText>
      <CancellationText font="caption_16_12_regular">{cancellationText}</CancellationText>
    </CancellationContainer>
  );
};

export default CancellationDescription;

const CancellationText = styled(AppText)`
  margin-top: 8px;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
const CancellationContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  padding: 16px 24px;
  border-radius: 12px;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
`;
