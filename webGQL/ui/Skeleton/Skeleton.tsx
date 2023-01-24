import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

const DEFAULT_ANIMATION_SPEED = 3;

export type SkeletonProps = {
  width: number | string;
  maxWidth?: number | string;
  height: number | string;
  borderRadius: number | string;
  animationSpeed?: number;
  className?: string;
  isSecondary?: boolean;
};

const Skeleton: FC<SkeletonProps> = ({
  isSecondary = false,
  borderRadius,
  height,
  width,
  maxWidth,
  className,
  animationSpeed = DEFAULT_ANIMATION_SPEED,
}) => {
  return (
    <Root
      className={className}
      style={{ width, maxWidth, height, borderRadius }}
      $animationSpeed={animationSpeed}
      $isSecondary={isSecondary}
    />
  );
};

export default Skeleton;

type RootProps = {
  $animationSpeed: number;
  $isSecondary: boolean;
};

const renderBackgroundColor = css<RootProps>`
  ${({ theme: { colors }, $isSecondary }) =>
    $isSecondary
      ? css`
          background: linear-gradient(
            -45deg,
            ${colors.greyScale[10]},
            ${colors.greyScale[10]},
            ${colors.greyScale[5]},
            ${colors.greyScale[10]},
            ${colors.greyScale[10]}
          );
        `
      : css`
          background: linear-gradient(
            -45deg,
            ${colors.greyScale[30]},
            ${colors.greyScale[30]},
            ${colors.greyScale[10]},
            ${colors.greyScale[30]},
            ${colors.greyScale[30]}
          );
        `}
`;

const animateGradient = keyframes`
  0% {
    background-position: 100% 100%
  }
  100% {
    background-position: 0% 0%
  }
  
`;

const renderBackgroundAnimation = css<RootProps>`
  ${({ $animationSpeed }) => css`
    background-size: 400% 400%;

    -webkit-animation: ${animateGradient} ${$animationSpeed}s ease-in-out infinite;
    -moz-animation: ${animateGradient} ${$animationSpeed}s ease-in-out infinite;
    animation: ${animateGradient} ${$animationSpeed}s ease-in-out infinite;
  `}
`;

const Root = styled.div<RootProps>`
  ${renderBackgroundColor}
  ${renderBackgroundAnimation}
`;
