import { FC, ReactNode, TextareaHTMLAttributes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

type LightTextareaProps = {
  minRows?: number;
  maxRows?: number;
  isError?: boolean;
  RightIconComponent?: ReactNode;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const LightTextarea: FC<LightTextareaProps> = ({ style: _, isError, RightIconComponent, className, ...inputProps }) => (
  <Root className={className}>
    <StyledTextarea isError={isError} {...inputProps} />
    {RightIconComponent}
  </Root>
);

export default LightTextarea;

const Root = styled.div``;

const StyledTextarea = styled(TextareaAutosize)<{ isError?: boolean }>`
  padding: ${({ isError }) => (isError ? '15px 15px' : '16px 16px')};
  resize: none;
  background-color: ${({ theme: { colors } }) => colors.greyScale[10]};
  border: ${({ theme: { colors }, isError }) => (isError ? `1px solid ${colors.additional.red}` : 'none')};
  border-radius: 15px;
  outline: none;
  width: 100%;
  min-height: 140px;
  max-width: 335px;

  &::placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  &:focus {
    border: 1px solid ${({ theme: { colors } }) => colors.greyScale[60]} !important;
    padding: 15px 15px;
  }

  &:disabled {
    color: ${({ theme: { colors } }) => colors.greyScale[40]};
  }

  ${({ theme: { typography } }) => typography.body_20_14_regular}
`;
