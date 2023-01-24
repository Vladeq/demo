import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import SvgCheck from '../../../public/svg/components/Check';

const CheckBox: FC<InputHTMLAttributes<HTMLInputElement>> = ({ checked, disabled, ...inputProps }) => {
  return (
    <Root htmlFor={`checkbox-${inputProps.name}`}>
      <InputContainer>
        <StyledCheckBox isChecked={!!checked} isDisabled={disabled} aria-disabled={disabled}>
          {checked && <SvgCheck />}
        </StyledCheckBox>
      </InputContainer>
      <HiddenCheckbox type="checkbox" {...inputProps} checked={checked} id={`checkbox-${inputProps.name}`} />
    </Root>
  );
};

export default CheckBox;

type StyledCheckBoxProps = {
  isChecked: boolean;
  isDisabled?: boolean;
};

const Root = styled.label`
  position: relative;
  display: flex;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const InputContainer = styled.div`
  width: 18px;
  height: 18px;
`;

const StyledCheckBox = styled.div<StyledCheckBoxProps>`
  width: 18px;
  display: flex;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: { colors }, isChecked }) => (isChecked ? colors.greyScale[60] : colors.greyScale[20])};
  height: 18px;
  border-radius: 4px;

  &:not([aria-disabled]):hover {
    background-color: ${({ theme: { colors }, isChecked }) =>
      isChecked ? colors.greyScale[90] : colors.greyScale[40]};
    transition: 0.2s;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.greyScale[50]};
  }

  &:not([aria-disabled]) {
    background-color: ${({ theme: { colors }, isChecked }) =>
      isChecked ? colors.greyScale[100] : colors.greyScale[30]};
  }
`;
