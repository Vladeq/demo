import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';

import { AppText, DoubleInput } from '../../../../../../ui';

type PriceFieldProps = {
  control: Control<any>;
};

const PriceField: FC<PriceFieldProps> = ({ control }) => {
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'bottomFilters' });
  return (
    <Controller
      control={control}
      name="price"
      render={({ field }) => (
        <DoubleInputContainer>
          <StyledAppText font="caption_14_10_regular">{t('price')}</StyledAppText>
          <DoubleInput {...field} />
        </DoubleInputContainer>
      )}
    />
  );
};

export default PriceField;

const DoubleInputContainer = styled.div`
  margin-right: 16px;
`;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
`;
