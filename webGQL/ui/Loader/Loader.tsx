import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

export type LoaderProps = {
  variant?: LoaderVariant;
  speed?: number;
  dotsCount?: number;
};

const Loader: FC<LoaderProps> = ({ speed = 0.7, dotsCount = 4, variant = 'PRIMARY', ...props }) => {
  const dots = new Array(dotsCount).fill(null);

  const getRelativeTime = (speed: number, delay: number): string => `${(1 / speed) * delay}s`;

  const animationDuration = getRelativeTime(speed, 0.8);

  return (
    <Root style={{ animationDuration }} {...props}>
      {dots.map((_, index) => (
        <Dot $variant={variant} key={index} style={{ animationDelay: getRelativeTime(speed, (index + 1) * 0.1) }} />
      ))}
    </Root>
  );
};

export default Loader;

type LoaderVariant = 'PRIMARY' | 'SECONDARY';

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const renderDotColor = css<{ $variant: LoaderVariant }>`
  ${({ $variant, theme: { colors } }) => {
    switch ($variant) {
      case 'PRIMARY': {
        return css`
          background-color: ${colors.greyScale[0]};
        `;
      }
      case 'SECONDARY': {
        return css`
          background-color: ${colors.greyScale[100]};
        `;
      }
      default: {
        return css``;
      }
    }
  }}
`;

const animateDot = keyframes`
    0% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
`;

const Dot = styled.div<{ $variant: LoaderVariant }>`
  display: inline-block;
  width: 6px;
  height: 6px;

  border-radius: 100%;
  margin-right: 8px;

  animation-name: ${animateDot};
  animation-duration: inherit;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

  &:last-child {
    margin-right: 0;
  }

  ${renderDotColor}
`;
