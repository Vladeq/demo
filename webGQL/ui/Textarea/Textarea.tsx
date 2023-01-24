import { FC, ReactNode, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { AppText } from 'ui/AppText';

type TextareaProps = {
  minRows?: number;
  maxRows?: number;
  error?: FieldError;
  maxLength?: number;
  hasCounter?: boolean;
  RightIconComponent?: ReactNode;
  className?: string;
  value: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const CHARACTER_EXCEEDING_ERROR = 'isLong';

const Textarea: FC<TextareaProps> = ({
  style: _,
  error,
  RightIconComponent,
  className,
  hasCounter,
  maxRows,
  maxLength,
  value,
  ...inputProps
}) => {
  return (
    <Root className={className} isError={Boolean(error)}>
      <StyledTextarea {...inputProps} maxRows={maxRows} value={value} />
      {RightIconComponent}
      {hasCounter && maxLength && (
        <CounterContainer>
          <Counter font="caption_16_12_regular" $isError={error?.message === CHARACTER_EXCEEDING_ERROR}>
            {maxLength - value.length}
          </Counter>
        </CounterContainer>
      )}
    </Root>
  );
};

export default Textarea;

const Root = styled.div<{ isError?: boolean }>`
  position: relative;
  display: flex;
  padding: ${({ isError }) => (isError ? '15px 15px' : '16px 16px')};
  background-color: ${({ theme: { colors } }) => colors.greyScale[10]};
  border-radius: 15px;
  padding-right: 4px !important;

  &:focus-within {
    border: 1px solid ${({ theme: { colors }, isError }) => (isError ? colors.additional.red : colors.greyScale[60])};
    padding: 15px 15px;
  }
  &:disabled {
    color: ${({ theme: { colors } }) => colors.greyScale[40]};
  }
`;

const StyledTextarea = styled(TextareaAutosize)<{ isError?: boolean }>`
  resize: none;
  outline: none;
  width: 100%;
  min-height: 140px;
  height: 100% !important;
  padding-right: 8px;

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.body_20_14_regular}
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 22px;
  position: absolute;
  bottom: 8px;
  right: 16px;
`;

const Counter = styled(AppText)<{ $isError?: boolean }>`
  color: ${({ $isError, theme: { colors } }) => ($isError ? colors.additional.red : colors.greyScale[40])};
  position: absolute;
`;
