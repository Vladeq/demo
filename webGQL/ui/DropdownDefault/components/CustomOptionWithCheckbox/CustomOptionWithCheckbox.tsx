import { components, OptionProps, SetValueAction } from 'react-select';
import styled from 'styled-components';
import { AppText, CheckBox } from 'ui';

type CustomOptionTypes = {
  label: string;
};

const RESET_LABEL = 'Любое';
const RESET_LABEL2 = 'Неважно';

const CustomOptionWithCheckbox = (props: OptionProps<CustomOptionTypes>) => {
  const option = props.data;

  const changeCheked = () => {
    const results = props.getValue();
    const isAll = results.find((item) => item.label === RESET_LABEL || item.label === RESET_LABEL2);
    if (isAll && results.length > 1) {
      props.setValue(isAll, 'clear' as SetValueAction);
    }
    return props.isSelected;
  };

  return (
    <components.Option {...props}>
      <StyledOption>
        <CheckboxContainer>
          <CheckBox checked={changeCheked()} key={props.label} />
        </CheckboxContainer>
        <Label font="caption_16_12_regular">{option.label}</Label>
      </StyledOption>
    </components.Option>
  );
};

export default CustomOptionWithCheckbox;

const Label = styled(AppText)`
  white-space: pre;
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckboxContainer = styled.div`
  min-width: 24px;
  min-height: 24px;
`;
