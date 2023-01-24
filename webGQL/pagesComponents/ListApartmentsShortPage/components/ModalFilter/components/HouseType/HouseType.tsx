import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Selector } from 'ui';
import { SelectorSize } from 'ui/Selector/Selector';

import { typeHouseArray } from '../../../../options';

type FieldType = {
  control: Control<any>;
};

const EMPTY_VALUE = 'no';

const HouseType: FC<FieldType> = ({ control }) => {
  const handleChange = (value: Array<string>, onChange: (...event: any[]) => void, selectorValue: string) => {
    const hasSelectorValue = !value.includes(selectorValue);
    const isEmptyValue = selectorValue === EMPTY_VALUE;
    let newValues: string[];
    if (hasSelectorValue) {
      newValues = isEmptyValue ? [EMPTY_VALUE] : [...value, selectorValue].filter((elem) => elem !== EMPTY_VALUE);
    } else {
      newValues = value.filter((elem) => elem !== selectorValue);
    }
    onChange(newValues);
  };

  return (
    <InnerContainer>
      {typeHouseArray.map((selector, index) => (
        <Controller
          name="housingType"
          control={control}
          key={index}
          render={({ field: { value, onChange } }) => (
            <StyledSelector
              text={selector.title}
              name={selector.title}
              onChange={() => handleChange(value, onChange, selector.value)}
              checked={selector.value === 'no' ? value.length === 0 : value.includes(selector.value)}
              size={SelectorSize.NORMAL}
            />
          )}
        />
      ))}
    </InnerContainer>
  );
};

export default HouseType;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledSelector = styled(Selector)`
  padding: 12px 16px !important;
  min-width: unset;
  p {
    ${({ theme: { typography } }) => typography.caption_16_12_regular}
  }
`;
