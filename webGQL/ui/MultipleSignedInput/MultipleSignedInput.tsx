import { FC, InputHTMLAttributes, useEffect, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled, { css, CSSProp } from 'styled-components';

import { AppText } from '../AppText';

interface InputTypes {
  placeholder: string;
  title: string;
  name: string;
  defaultValue?: string;
}

type WrapperProps = {
  $isError?: boolean;
  $isDisabled?: boolean;
  $CSS?: CSSProp;
  className?: string;
};

type StyledInputProps = { $isInputsBlockedOnly: boolean; $isDisabled: boolean };

type SignedInputProps = {
  focusIndex?: number | null;
  error?: string;
  isDateInput?: boolean;
  control?: Control<any>;
  className?: string;
  buttonType?: 'button' | 'submit' | 'reset';
  rootCSS?: CSSProp;
  isInputsBlockedOnly?: boolean;
  defaultsInputsVariables: Array<InputTypes>;
} & InputHTMLAttributes<HTMLInputElement>;

const MultipleSignedInput: FC<SignedInputProps> = ({
  error,
  disabled,
  isInputsBlockedOnly,
  control,
  rootCSS,
  className,
  focusIndex,
  buttonType = 'submit',
  isDateInput = false,
  defaultsInputsVariables = [],
}) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  useEffect(() => {
    if (typeof focusIndex === 'number') {
      inputsRef.current[focusIndex].focus();
    }
  }, [focusIndex]);

  return (
    <Root>
      <Wrapper $isError={!!error} $isDisabled={disabled} $CSS={rootCSS} className={className}>
        {defaultsInputsVariables.map((input, index) => (
          <InputContainer
            $isError={!!error}
            disabled={disabled}
            key={index}
            type={buttonType}
            id={String(index)}
            onClick={() => inputsRef.current[index].focus()}>
            <Title font="caption_14_10_medium" $isDisabled={disabled} $isInputsBlockedOnly={isInputsBlockedOnly!}>
              {input.title}
            </Title>
            <Controller
              name={input.name}
              control={control}
              render={(field) => (
                <StyledInput
                  $isInputsBlockedOnly={isInputsBlockedOnly!}
                  value={field.field.value}
                  placeholder={input.placeholder}
                  $isDisabled={!!disabled}
                  disabled={disabled || isDateInput}
                  onChange={(e) => field.field.onChange(e.target.value)}
                  defaultValue={input.defaultValue || ''}
                  ref={(e: HTMLInputElement) => (inputsRef.current[index] = e)}
                  {...field}
                />
              )}
            />
          </InputContainer>
        ))}
      </Wrapper>
      {error && <Error font="caption_14_10_regular">{error}</Error>}
    </Root>
  );
};

export default MultipleSignedInput;

const Root = styled.div`
  width: 100%;
`;

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'auto')};
  border-radius: 12px;
  width: fit-content;
  border: 1px solid ${({ theme: { colors }, $isError }) => ($isError ? colors.additional.red : colors.greyScale[30])};
  ${({ $CSS }) => $CSS};
`;

const Title = styled(AppText)<{ $isDisabled?: boolean; $isInputsBlockedOnly: boolean }>`
  color: ${({ theme: { colors }, $isDisabled, $isInputsBlockedOnly }) =>
    $isDisabled && !$isInputsBlockedOnly ? colors.greyScale[30] : colors.greyScale[100]};
  text-align: left;
`;

const InputContainer = styled.button<WrapperProps>`
  display: flex;
  outline: none;
  background-color: transparent;
  border: none;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  position: relative;
  padding: 7px 16px;
  text-decoration: none;

  ${({ theme: { colors }, $isError }) => css`
    :not(:last-child):not(:first-child) {
      &:focus-within {
        border: 1px solid ${colors.greyScale[60]};
        margin: -1px;
      }
    }
    :first-child {
      &:focus-within {
        border-width: 1px 0 1px 1px;
        border-style: solid;
        border-radius: 12px 0 0 12px;
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        border-color: ${colors.greyScale[60]};
      }
    }

    :last-child {
      &:focus-within {
        border-radius: 0 12px 12px 0;
        border-width: 1px 1px 1px 0;
        border-style: solid;
        margin-right: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        border-color: ${colors.greyScale[60]};
      }
    }

    :not(:last-child) {
      &:before {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 32px;
        background-color: ${$isError ? colors.additional.red : colors.greyScale[30]};
      }
    }
  `}
`;

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  max-width: 60px;
  padding: 0;
  border: none;
  ${({ theme: { typography } }) => typography.caption_16_12_regular}

  &:focus {
    outline: none;
    border: none;
  }

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[50]};
  }

  ${({ $isDisabled, $isInputsBlockedOnly, theme: { colors } }) =>
    $isDisabled &&
    css`
      ${!$isInputsBlockedOnly
        ? `
        &::placeholder {
          color: ${colors.greyScale[30]};
        }
        cursor: not-allowed;
        background-color: transparent;
        color: ${colors.greyScale[30]};
        `
        : `color: ${colors.greyScale[100]};`}
    `};
`;

const Error = styled(AppText)`
  margin-top: 2px;
  color: ${({ theme: { colors } }) => colors.additional.red};
`;
