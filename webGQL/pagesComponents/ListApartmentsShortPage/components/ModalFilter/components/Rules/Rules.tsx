import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Selector } from 'ui';

import { rulesArray, RulesEnum } from '../../../../options';

type FieldType = {
  control: Control<any>;
};

const EMPTY_VALUE = RulesEnum.NoRules;

const Rules: FC<FieldType> = ({ control }) => {
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
    <Root>
      <InnerContainer>
        <Controller
          control={control}
          name="rules"
          render={({ field: { onChange, value } }) => (
            <>
              {rulesArray.map((selector, index) => (
                <StyledSelector
                  name={selector.name}
                  key={index}
                  text={selector.text}
                  onChange={() => {
                    handleChange(value, onChange, selector.name);
                  }}
                  checked={selector.name === RulesEnum.NoRules ? value.length === 0 : value.includes(selector.name)}
                />
              ))}
            </>
          )}
        />
      </InnerContainer>
    </Root>
  );
};

export default Rules;

const Root = styled.div``;

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
