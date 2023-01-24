import React, { ButtonHTMLAttributes, FC, SVGProps } from 'react';
import styled, { css, useTheme } from 'styled-components';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  IconComponent: FC<SVGProps<SVGSVGElement>>;
  SecondIconComponent?: FC<SVGProps<SVGSVGElement>>;
  isSecond?: boolean;
  size?: IconButtonSize;
};

const IconButton: FC<IconButtonProps> = ({
  size = IconButtonSize.NORMAL,
  isSecond = false,
  disabled,
  IconComponent,
  SecondIconComponent,
  ...props
}) => {
  const { colors } = useTheme();

  const returnIconSize = {
    [IconButtonSize.NORMAL]: 24,
    [IconButtonSize.SMALL]: 20,
  };

  const buttonSize = returnIconSize[size];

  return (
    <Root disabled={disabled} $disabled={!!disabled} $size={size} {...props}>
      <div>
        {IconComponent &&
          (isSecond && SecondIconComponent ? (
            <SecondIconComponent color={colors.greyScale[disabled ? 40 : 100]} width={buttonSize} height={buttonSize} />
          ) : (
            <IconComponent color={colors.greyScale[disabled ? 40 : 100]} width={buttonSize} height={buttonSize} />
          ))}
      </div>
    </Root>
  );
};

export default IconButton;

type RootProps = {
  $size: IconButtonSize;
  $disabled: boolean;
};

export enum IconButtonSize {
  NORMAL,
  SMALL,
}

const renderButtonSize = css<{ $size: IconButtonSize; $disabled: boolean }>`
  ${({ $size, theme: { colors }, $disabled }) => {
    switch ($size) {
      case IconButtonSize.NORMAL: {
        return css`
          padding: 8px;
          border-radius: 12px;

          ${!$disabled &&
          css`
            :focus,
            :focus-visible {
              box-shadow: 0 0 0 4px ${colors.greyScale[40]};
            }
          `}
        `;
      }
      case IconButtonSize.SMALL: {
        return css`
          padding: 6px;
          border-radius: 8px;

          ${!$disabled &&
          css`
            :focus,
            :focus-visible {
              box-shadow: 0 0 0 2px ${colors.greyScale[40]};
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

const Root = styled.button<RootProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: fit-content;

  cursor: pointer;

  ${({ theme: { colors }, $disabled }) => css`
    box-shadow: 0 0 0 1px ${colors.greyScale[30]};
    background-color: ${colors.greyScale[0]};

    ${!$disabled &&
    css`
      :hover {
        background-color: ${colors.greyScale[20]};
      }
    `}
  `}

  ${renderButtonSize}
`;
