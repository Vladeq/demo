import React, { ButtonHTMLAttributes, FC } from 'react';
import styled, { css } from 'styled-components';

import { Loader } from '../Loader';

type LightButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  isLoading?: boolean;
  isUnderline?: boolean;
  size?: LightButtonSize;
};

const LightButton: FC<LightButtonProps> = ({
  size = LightButtonSize.NORMAL,
  isLoading = false,
  isUnderline = false,
  text,
  disabled,
  ...props
}) => {
  return (
    <Root $disabled={!!disabled} disabled={isLoading || disabled} $size={size} {...props}>
      {isLoading && <StyledLoader variant="SECONDARY" />}
      <Body $isLoading={isLoading} $isUnderline={isUnderline}>
        {text}
      </Body>
    </Root>
  );
};

export default LightButton;

type RootProps = {
  $size: LightButtonSize;
  $disabled: boolean;
};

type BodyProps = {
  $isLoading: boolean;
  $isUnderline: boolean;
};

export enum LightButtonSize {
  NORMAL,
  SMALL,
}

const renderLightButtonSize = css<{ $size: LightButtonSize; $disabled: boolean }>`
  ${({ $size, theme: { colors }, $disabled }) => {
    switch ($size) {
      case LightButtonSize.NORMAL: {
        return css`
          height: 48px;
          padding: 0 10px;

          border-radius: 15px;

          ${!$disabled &&
          css`
            :focus,
            :focus-visible {
              box-shadow: 0 0 0 4px ${colors.greyScale[40]};
            }
          `}

          ${({ theme: { typography } }) => typography.body_24_16_medium}
        `;
      }
      case LightButtonSize.SMALL: {
        return css`
          height: 32px;
          padding: 0 10px;

          border-radius: 10px;

          ${!$disabled &&
          css`
            :focus,
            :focus-visible {
              box-shadow: 0 0 0 2px ${colors.greyScale[40]};
            }
          `}
          ${({ theme: { typography } }) => typography.body_24_14_medium}
        `;
      }
      default: {
        return css``;
      }
    }
  }}
`;

const Root = styled.button<RootProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  ${({ theme: { colors }, $disabled }) => css`
    background-color: ${colors.greyScale[0]};
    color: ${colors.greyScale[100]};

    ${$disabled
      ? css`
          background-color: ${colors.greyScale[0]};
          color: ${colors.greyScale[60]};
          cursor: not-allowed;
        `
      : css`
          :hover {
            background-color: ${colors.greyScale[20]};
          }
        `}
  `}

  ${renderLightButtonSize}
`;

const StyledLoader = styled(Loader)`
  position: absolute;
`;

const Body = styled.div<BodyProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-underline-offset: 4px;

  opacity: ${({ $isLoading }) => +!$isLoading};
  text-decoration: ${({ $isUnderline }) => ($isUnderline ? 'underline' : 'none')};
`;
