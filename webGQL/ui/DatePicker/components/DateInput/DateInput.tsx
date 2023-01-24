import React, { InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { BaseInput } from 'ui/BaseInput';
import { formatDateToRange } from 'utils';

import { ArrowBottom } from '../../../../../public/svg/components';

type DateInputProps = {
  isEmpty: boolean;
  label?: string;
  onToggleOpened: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const DateInput = ({
  disabled,
  className,
  value = '',
  isEmpty,
  onToggleOpened,
  onChange: _,
  ...props
}: DateInputProps) => {
  const formattedValue = formatDateToRange(value as string);

  const handleMouseDownCapture = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    onToggleOpened();
  };

  return (
    <Root>
      <StyledInput
        isLong
        inputMode="none"
        className={className}
        disabled={disabled}
        value={isEmpty ? '' : formattedValue}
        {...props}
      />
      <Arrow
        onMouseDownCapture={handleMouseDownCapture}
        className={`${className}-arrow`}
        $disabled={!!disabled}
        $isOpen={false}
      />
    </Root>
  );
};

export default DateInput;

type ArrowProps = {
  $isOpen: boolean;
  $disabled: boolean;
};

const Root = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: fit-content;
`;

const StyledInput = styled(BaseInput)`
  width: 100%;
  height: 40px;
  padding: 12px 40px 12px 16px !important;

  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme: { colors } }) => colors.greyScale[30]};
  color: ${({ theme: { colors } }) => colors.greyScale[100]};

  caret-color: transparent;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.caption_16_12_regular}
`;

const Arrow = styled(ArrowBottom)<ArrowProps>`
  ${({ theme: { colors }, $disabled }) => css`
    position: absolute;
    width: 20px;
    height: 20px;
    right: 12px;
    bottom: 10px;

    transition: all 0.2s ease-in-out;

    &.react-datepicker-ignore-onclickoutside-arrow {
      transform: rotate(180deg);
    }

    path {
      fill: ${$disabled ? colors.greyScale[40] : colors.greyScale[60]};
    }
  `}
`;
