import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { BaseInput as StyledBaseInput, ErrorText, Label } from '../../styles/components/input';

export type BaseInputProps = {
  label?: string;
  isSuccess?: boolean;
  isLong?: boolean;
  error?: string;
  isFullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const BaseInput: ForwardRefRenderFunction<HTMLInputElement, BaseInputProps> = (
  { disabled, label, isLong = false, error, isSuccess, ...inputProps },
  ref,
) => (
  <Root $isLong={!!label || isLong}>
    <Label font="caption_14_10_regular" isDisabled={!!disabled}>
      {label}
    </Label>
    <StyledInput {...inputProps} ref={ref} $isError={!!error} $isSuccess={isSuccess} disabled={!!disabled} />
    {error && <ErrorText font="caption_14_10_regular">{error}</ErrorText>}
  </Root>
);

export default forwardRef<HTMLInputElement, BaseInputProps>(BaseInput);

const Root = styled.div<{ $isLong?: boolean }>`
  width: 100%;
  max-width: ${({ $isLong }) => ($isLong ? '100%' : '144px')};
`;

const StyledInput = styled(StyledBaseInput)<{ $isSuccess?: boolean; $isError?: boolean }>`
  border: ${({ theme: { colors }, $isError }) => ($isError ? `1px solid ${colors.additional.red}` : 'none')};
  padding: ${({ $isError }) => ($isError ? '11px 16px' : '12px 16px')};
  color: ${({ theme: { colors }, $isSuccess }) => ($isSuccess ? colors.additional.green : colors.greyScale[100])};

  &:disabled {
    color: ${({ theme: { colors } }) => colors.greyScale[40]};
    cursor: not-allowed;
  }

  &:focus {
    border: 1px solid ${({ theme: { colors } }) => colors.greyScale[60]};
    padding: 11px 15px;
  }

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.caption_16_12_regular}
`;
