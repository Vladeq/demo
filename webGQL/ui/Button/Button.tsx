import React, { ButtonHTMLAttributes, FC, ReactNode, SVGProps } from 'react';
import styled, { css } from 'styled-components';

import { Loader } from '../Loader';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  isFullWight?: boolean;
  LeftIconComponent?: ReactNode;
  RightIconComponent?: FC<SVGProps<SVGSVGElement>>;
  isLoading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const Button: FC<ButtonProps> = ({
  size = ButtonSize.NORMAL,
  variant = ButtonVariant.PRIMARY,
  isLoading = false,
  isFullWight = false,
  text,
  disabled,
  RightIconComponent,
  LeftIconComponent,
  ...props
}) => {
  return (
    <Root
      $isFullWight={isFullWight}
      $disabled={!!disabled}
      disabled={isLoading || disabled}
      $variant={variant}
      $size={size}
      {...props}>
      {isLoading && <StyledLoader variant={variant} />}

      <Body $isLoading={isLoading}>
        {LeftIconComponent && <LeftIconComponentWrapper>{LeftIconComponent}</LeftIconComponentWrapper>}
        {text}
        {RightIconComponent && (
          <RightIconComponentWrapper>
            <RightIconComponent />
          </RightIconComponentWrapper>
        )}
      </Body>
    </Root>
  );
};

export default Button;

type RootProps = {
  $size: ButtonSize;
  $variant: ButtonVariant;
  $disabled: boolean;
  $isFullWight: boolean;
};

type RenderButtonColorProps = {
  $variant: ButtonVariant;
  $disabled: boolean;
};

export enum ButtonSize {
  NORMAL,
  SMALL,
  LONG_TEXT,
  CARDS,
}

export enum ButtonVariant {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

const renderButtonColor = css<RenderButtonColorProps>`
  ${({ $variant, $disabled, theme: { colors } }) => {
    switch ($variant) {
      case ButtonVariant.PRIMARY: {
        return css`
          background-color: ${colors.greyScale[100]};
          color: ${colors.greyScale[0]};

          ${$disabled
            ? css`
                background-color: ${colors.greyScale[60]};
                color: ${colors.effects.white};
              `
            : css`
                :focus,
                :focus-visible {
                  box-shadow: 0 0 0 4px ${colors.greyScale[50]};
                }
                :hover {
                  background-color: ${colors.greyScale[90]};
                }
              `}
        `;
      }
      case ButtonVariant.SECONDARY: {
        return css`
          background-color: ${colors.greyScale[30]};
          color: ${colors.greyScale[100]};

          ${$disabled
            ? css`
                background-color: ${colors.greyScale[20]};
                color: ${colors.greyScale[50]};
              `
            : css`
                :focus,
                :focus-visible {
                  box-shadow: 0 0 0 4px ${colors.greyScale[40]};
                }
                :hover {
                  background-color: ${colors.greyScale[40]};
                }
              `}
        `;
      }
      default: {
        return css``;
      }
    }
  }}
`;

const renderButtonSize = css<{ $size: ButtonSize }>`
  ${({ $size }) => {
    switch ($size) {
      case ButtonSize.NORMAL: {
        return css`
          height: 48px;
          padding: 0 49.5px;

          border-radius: 12px;
        `;
      }
      case ButtonSize.SMALL: {
        return css`
          height: 32px;
          padding: 0 36.5px;

          border-radius: 8px;
        `;
      }
      case ButtonSize.LONG_TEXT: {
        return css`
          height: 48px;
          padding: 16px 60px;

          border-radius: 12px;
        `;
      }
      case ButtonSize.CARDS: {
        return css`
          height: 40px;
          padding: 16px 24px;

          border-radius: 12px;
        `;
      }
      default: {
        return css``;
      }
    }
  }}
`;

const Root = styled.button<RootProps>`
  width: ${({ $isFullWight }) => ($isFullWight ? '100%' : 'fit-content')};
  display: flex;
  align-items: center;
  justify-content: center;

  border-width: 0;
  border-style: solid;

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  ${({ theme: { typography } }) => typography.caption_16_12_regular}

  ${renderButtonColor}
  ${renderButtonSize}
`;

const StyledLoader = styled(Loader)`
  position: absolute;
`;

const Body = styled.div<{ $isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${({ $isLoading }) => +!$isLoading};
`;

const IconComponentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LeftIconComponentWrapper = styled(IconComponentWrapper)`
  margin-right: 16px;
`;

const RightIconComponentWrapper = styled(IconComponentWrapper)`
  margin-left: 8px;
`;
