import React, { ReactNode, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'ui/Button';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

const Tooltip = ({
  children,
  position = TooltipPositionEnum.BOTTOM,
  buttonText,
  onButtonClick,
  className,
  horizontalPosition = TooltipHorizontalPositionEnum.CENTER,
  text,
}: TooltipProps) => {
  const [isVisibleTooltip, setIsVisibleTooltip] = useState(false);

  return (
    <Root onMouseLeave={() => setIsVisibleTooltip(false)} $horizontalPosition={horizontalPosition}>
      <Wrapper onMouseEnter={() => setIsVisibleTooltip(true)}>{children}</Wrapper>
      <TooltipWindow
        className={className}
        $horizontalPosition={horizontalPosition}
        $position={position}
        $isVisibleTooltip={isVisibleTooltip}>
        <Text>{text}</Text>
        {!!buttonText && (
          <Button
            size={ButtonSize.SMALL}
            variant={ButtonVariant.SECONDARY}
            isFullWight
            text={buttonText}
            onClick={onButtonClick}
          />
        )}
      </TooltipWindow>
    </Root>
  );
};

export default Tooltip;

type TooltipProps = {
  text: string;
  buttonText?: string;
  className?: string;
  onButtonClick?: () => void;
  position?: TooltipPositionEnum;
  horizontalPosition?: TooltipHorizontalPositionEnum;
  children: ReactNode;
};

type TooltipWindowProps = {
  $position: TooltipPositionEnum;
  $isVisibleTooltip: boolean;
  $horizontalPosition: TooltipHorizontalPositionEnum;
};

export enum TooltipPositionEnum {
  TOP,
  BOTTOM,
}

export enum TooltipHorizontalPositionEnum {
  START,
  CENTER,
  END,
}

const tooltipPositions = {
  [TooltipPositionEnum.TOP]: css`
    top: 0;
    transform: translateY(-100%);
  `,
  [TooltipPositionEnum.BOTTOM]: css`
    bottom: 0;
    transform: translateY(100%);
  `,
};

const tooltipHorizontalPositions = {
  [TooltipHorizontalPositionEnum.START]: css`
    justify-content: flex-start;
  `,
  [TooltipHorizontalPositionEnum.CENTER]: css`
    justify-content: center;
  `,
  [TooltipHorizontalPositionEnum.END]: css`
    justify-content: flex-end;
  `,
};

const tooltipTrianglePositions = {
  [TooltipPositionEnum.BOTTOM]: css`
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: ${({ theme: { colors } }) => colors.greyScale[100]};
    border-left-color: transparent;

    top: -16px;
    margin-top: 1px;
  `,
  [TooltipPositionEnum.TOP]: css`
    border-top-color: ${({ theme: { colors } }) => colors.greyScale[100]};
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;

    top: 100%;
    margin-top: -1px;
  `,
};

const tooltipTriangleHorizontalPositions = {
  [TooltipHorizontalPositionEnum.START]: css`
    left: 18px;
  `,
  [TooltipHorizontalPositionEnum.CENTER]: css`
    left: 50%;
    transform: translateX(-50%);
  `,
  [TooltipHorizontalPositionEnum.END]: css`
    right: 18px;
  `,
};

const Root = styled.div<{ $horizontalPosition: TooltipHorizontalPositionEnum }>`
  position: relative;
  display: flex;
  height: fit-content;

  &::after {
    content: ' ';
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    top: -12px;
    left: -12px;
    z-index: 1;

    position: absolute;
  }

  ${({ $horizontalPosition }) => tooltipHorizontalPositions[$horizontalPosition]}
`;

const Wrapper = styled.div`
  height: fit-content;
  z-index: 2;
`;

const Text = styled.span`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[0]};
    ${typography.caption_16_12_regular};
  `};
`;

const TooltipWindow = styled.div<TooltipWindowProps>`
  ${({ theme: { colors }, $position, $isVisibleTooltip, $horizontalPosition }) => css`
    position: absolute;
    display: grid;

    width: 222px;
    padding: 8px 12px;
    margin: -11px;
    z-index: 1;
    grid-gap: 8px;

    border-radius: 10px;
    background-color: ${colors.greyScale[100]};
    box-shadow: 0px 10px 15px rgba(175, 181, 192, 0.18);

    opacity: 0;
    transition: opacity 0.2s linear;
    pointer-events: none;

    ${$isVisibleTooltip &&
    css`
      z-index: 1000;
      opacity: 1;
      pointer-events: all;
    `}

    &::after {
      content: ' ';
      position: absolute;

      border-width: 8px;
      border-style: solid;

      ${tooltipTrianglePositions[$position]}
      ${tooltipTriangleHorizontalPositions[$horizontalPosition]}
    }

    ${tooltipPositions[$position]}
  `}
`;
