import { timeOptions } from 'constains';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { OptionType } from 'types';
import { DropdownDefault } from 'ui';

type FieldType = {
  control: Control<any>;
};

const DepartureTimes: FC<FieldType> = ({ control }) => {
  const { t } = useTranslation('listApartmentsPage');
  return (
    <>
      <Controller
        name="departyreStart"
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            <StyledDropdownDefault
              menuPlacement="bottom"
              maxMenuHeight={165}
              isSearchable={false}
              defaultValue={value}
              options={timeOptions}
              onChange={onChange}
              placeholder={t('modalFilters.startTime')}
            />
          </InputContainer>
        )}
      />
      <HelperBlock />
      <Controller
        name="departyreEnd"
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            <StyledDropdownDefault
              menuPlacement="bottom"
              maxMenuHeight={165}
              isSearchable={false}
              defaultValue={value as OptionType}
              options={timeOptions}
              onChange={onChange}
              placeholder={t('modalFilters.endTime')}
            />
          </InputContainer>
        )}
      />
    </>
  );
};

export default DepartureTimes;

const InputContainer = styled.div`
  width: 288px;
`;

const HelperBlock = styled.div`
  margin: 0 16px;
  width: 16px;
  height: 1px;
  background: ${({ theme: { colors } }) => colors.greyScale[40]};
`;

const StyledDropdownDefault = styled(DropdownDefault)`
  div {
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 14px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme: { colors } }) => colors.greyScale[30]};
      background-clip: content-box;
      border: 5px solid transparent;
      border-radius: 18px;
    }
    .dropdown__placeholder {
      color: ${({ theme: { colors } }) => colors.greyScale[60]};
    }
  }
`;
