import { FC, InputHTMLAttributes, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled, { css, CSSProp } from 'styled-components';
import { DatePicker } from 'ui/DatePicker';
import { formatDateToRange, formatDateToRangeWithoutYear } from 'utils';

import { AppText } from '../AppText';

interface InputTypes {
  placeholder: string;
  title: string;
  name: string;
  defaultValue?: string;
}

type StyledInputProps = {
  $isError?: boolean;
  $isDisabled?: boolean;
  $CSS?: CSSProp;
  className?: string;
  $isInHeader?: boolean;
};

type SignedInputProps = {
  error?: string;
  control?: Control<any>;
  className?: string;
  rootCSS?: CSSProp;
  defaultsInputsVariables: Array<InputTypes>;
  isInHeader?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const MultipleSignedInput: FC<SignedInputProps> = ({
  error,
  disabled,
  control,
  rootCSS,
  className,
  defaultsInputsVariables = [],
  isInHeader,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  return (
    <Root>
      <Wrapper $isError={!!error} $isDisabled={disabled} $CSS={rootCSS} className={className} $isInHeader={isInHeader}>
        {defaultsInputsVariables.map((input, index) => (
          <InputContainer
            $isInHeader={isInHeader}
            $isError={!!error}
            disabled={disabled}
            key={index}
            id={String(index)}
            onClick={(e) => e.preventDefault()}>
            <Title font="caption_14_10_regular" $isDisabled={disabled}>
              {input.title}
            </Title>
            <Controller
              name={input.name}
              control={control}
              render={(field) => (
                <StyledInput
                  value={
                    isInHeader
                      ? formatDateToRangeWithoutYear(field.field.value || '')
                      : formatDateToRange(field.field.value || '')
                  }
                  placeholderText={input.placeholder}
                  onChange={(e) => field.field.onChange(e?.toString())}
                  customInput={
                    <input
                      inputMode="none"
                      disabled={disabled}
                      defaultValue={input.defaultValue || ''}
                      ref={(e: HTMLInputElement) => {
                        inputsRef.current[index] = e;
                      }}
                      {...field}
                    />
                  }
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

const Root = styled.div``;

const Wrapper = styled.div<StyledInputProps>`
  display: flex;
  background: ${({ theme: { colors }, $isInHeader }) => ($isInHeader ? `${colors.greyScale[10]}` : '')};
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'auto')};
  border-radius: 12px;
  max-width: ${({ $isInHeader }) => ($isInHeader ? '168px' : '252px')};
  width: fit-content;
  border: 1px solid ${({ theme: { colors }, $isError }) => ($isError ? colors.additional.red : colors.greyScale[30])};
  ${({ $CSS }) => $CSS};
`;

const Title = styled(AppText)<{ $isDisabled?: boolean }>`
  color: ${({ theme: { colors }, $isDisabled }) => ($isDisabled ? colors.greyScale[30] : colors.greyScale[100])};
  text-align: left;
`;

const InputContainer = styled.button<StyledInputProps>`
  display: flex;
  outline: none;
  background-color: transparent;
  border: none;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding: ${({ $isInHeader }) => ($isInHeader ? '6px 0px 10px 12px' : '4px 16px')};
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

const StyledInput = styled(DatePicker)`
  width: 100%;
  padding: 0;
  border: none;

  cursor: pointer;
  caret-color: transparent;

  ${({ theme: { typography } }) => typography.caption_16_12_regular}

  &:focus {
    outline: none;
    border: none;
  }

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[50]};
  }

  &:disabled {
    &::placeholder {
      color: ${({ theme: { colors } }) => colors.greyScale[30]};
    }
    cursor: not-allowed;
    background-color: transparent;
    color: ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const Error = styled(AppText)`
  margin-top: 2px;
  color: ${({ theme: { colors } }) => colors.additional.red};
`;
