import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const RadioButton: FC<InputHTMLAttributes<HTMLInputElement>> = ({ checked, disabled, ...inputProps }) => (
  <Root htmlFor="radio" isChecked={checked} aria-disabled={disabled}>
    {checked && <ActiveAction />}
    <HiddenInput type="radio" checked={checked} disabled={disabled} {...inputProps} id="radio" />
  </Root>
);

export default RadioButton;

const Root = styled.label<{ isChecked?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  cursor: not-allowed;
  border-radius: 50%;
  background-color: ${({ theme: { colors }, isChecked }) => (isChecked ? colors.greyScale[60] : colors.greyScale[20])};

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme: { colors } }) => colors.greyScale[50]};
  }

  &:not([aria-disabled]) {
    background-color: ${({ theme: { colors }, isChecked }) =>
      isChecked ? colors.greyScale[100] : colors.greyScale[30]};
    cursor: pointer;
  }

  &:hover:not([aria-disabled]) {
    background-color: ${({ theme: { colors }, isChecked }) =>
      isChecked ? colors.greyScale[90] : colors.greyScale[40]};
    transition: 0.2s;
  }
`;

const HiddenInput = styled.input<{ $isDisabled?: boolean }>`
  opacity: 0;
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;

  &:disabled {
    cursor: not-allowed;
  }
`;

const ActiveAction = styled.span`
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.greyScale[0]};
  width: 8px;
  height: 8px;
`;
