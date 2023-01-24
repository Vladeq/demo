import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { DatePicker } from 'ui';

import { dayjs } from '../../../../../../services';

type FieldType = {
  control: Control<any>;
};

const Dates: FC<FieldType> = ({ control }) => {
  const { t } = useTranslation('listApartmentsPage');
  return (
    <>
      <Controller
        name="dateStart"
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            <StyledDatePicker
              startDate={dayjs(value).isValid() ? dayjs(value).toDate() : null}
              placeholderText={t('bottomFilters.arrival')}
              onChange={onChange}
            />
          </InputContainer>
        )}
      />
      <HelperBlock />
      <Controller
        name="dateEnd"
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            <StyledDatePicker
              startDate={dayjs(value).isValid() ? dayjs(value).toDate() : null}
              placeholderText={t('bottomFilters.departure')}
              onChange={onChange}
            />
          </InputContainer>
        )}
      />
    </>
  );
};

export default Dates;

const InputContainer = styled.div`
  width: 288px;
`;

const StyledDatePicker = styled(DatePicker)`
  max-width: 100% !important;
  background: #fff !important;
`;

const HelperBlock = styled.div`
  margin: 0 16px;
  width: 16px;
  height: 1px;
  background: ${({ theme: { colors } }) => colors.greyScale[40]};
`;
