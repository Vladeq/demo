import { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { handleDivisionOnCategories } from 'utils/divisionOnCategories';

import SvgTenge from '../../../public/svg/components/Tenge';
import { AppText } from '../AppText';

type MoneyInputProps = {
  title?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const MoneyInput: FC<MoneyInputProps> = ({ onChange, disabled, title, error, ...inputProps }) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = handleDivisionOnCategories(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <Root>
      {title && <Title font="caption_14_10_regular">{title}</Title>}
      <InputContainer $isError={!!error}>
        <StyledInput disabled={disabled} onChange={handleOnChange} {...inputProps} />
        <CurrencyContainer $isError={!!error}>
          <StyledIcon $isDisabled={disabled} />
        </CurrencyContainer>
      </InputContainer>
      {error && <ErrorText font="caption_14_10_regular">{error}</ErrorText>}
    </Root>
  );
};

export default MoneyInput;

const Root = styled.div``;

const Title = styled(AppText)`
  margin-bottom: 4px;
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
`;

const InputContainer = styled.div<{ $isError?: boolean }>`
  display: flex;
  align-items: center;
  max-width: 355px;
  height: 40px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid ${({ theme: { colors }, $isError }) => ($isError ? colors.additional.red : colors.greyScale[30])};
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  position: relative;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  padding: 12px 16px;
  max-width: 271px;

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[50]};
  }

  &:disabled {
    &::placeholder {
      color: ${({ theme: { colors } }) => colors.greyScale[40]};
    }
    cursor: not-allowed;
    background-color: transparent;
    color: ${({ theme: { colors } }) => colors.greyScale[30]};
  }
  &:-internal-autofill-selected {
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]} !important;
    color: ${({ theme: { colors } }) => colors.greyScale[100]} !important;
    background-image: none !important;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  ${({ theme: { typography } }) => typography.caption_16_12_regular};
`;

const CurrencyContainer = styled.div<{ $isError?: boolean }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 84px;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 40px;
    background-color: ${({ theme: { colors }, $isError }) => ($isError ? colors.additional.red : colors.greyScale[30])};
  }
`;

const StyledIcon = styled(SvgTenge)<{ $isDisabled?: boolean }>`
  path {
    fill: ${({ theme: { colors }, $isDisabled }) => ($isDisabled ? colors.greyScale[30] : colors.greyScale[60])};
  }
`;

export const ErrorText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.additional.red};
  margin-top: 2px;
`;
