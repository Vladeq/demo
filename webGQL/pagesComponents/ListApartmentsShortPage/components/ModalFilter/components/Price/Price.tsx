import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { SignedInput } from 'ui';
import { handleDivisionOnCategories } from 'utils';

type FieldType = {
  control: Control<any>;
};

const Price: FC<FieldType> = ({ control }) => {
  const { t } = useTranslation('listApartmentsPage');
  return (
    <>
      <Controller
        name="minPrice"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputContainer>
            <SignedInput
              title={t('modalFilters.minPrice')}
              value={value}
              onChange={(event) => {
                event.target.value = handleDivisionOnCategories(event.target.value);
                onChange?.(event);
              }}
            />
          </InputContainer>
        )}
      />
      <HelperBlock />
      <Controller
        name="maxPrice"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputContainer>
            <SignedInput
              title={t('modalFilters.maxPrice')}
              value={value}
              onChange={(event) => {
                event.target.value = handleDivisionOnCategories(event.target.value);
                onChange?.(event);
              }}
            />
          </InputContainer>
        )}
      />
    </>
  );
};

export default Price;

const HelperBlock = styled.div`
  margin: 0 16px;
  width: 16px;
  height: 1px;
  background: ${({ theme: { colors } }) => colors.greyScale[40]};
`;

const InputContainer = styled.div`
  width: 288px;
`;
