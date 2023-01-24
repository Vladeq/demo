import React, { FC, InputHTMLAttributes, SVGProps } from 'react';
import styled, { css } from 'styled-components';
import { typography } from 'styles/general/typography';
import { colors } from 'styles/themes/default/colors';

import { Radio } from '../../../public/svg/components';
import { TextVariants } from '../../types';
import { AppText } from '../AppText';

type SelectorProps = {
  text: string | number;
  disabled?: boolean;
  size?: SelectorSize;
  description?: string;
  LeftIconComponent?: FC<SVGProps<SVGSVGElement>>;
} & InputHTMLAttributes<HTMLInputElement>;

const Selector: FC<SelectorProps> = ({
  size = SelectorSize.NORMAL,
  disabled = false,
  text,
  LeftIconComponent,
  description,
  className,
  ...inputProps
}) => {
  const isLongVariant = size === SelectorSize.LONG;
  const checked = !!inputProps.value || inputProps.checked;

  return (
    <Root
      htmlFor={`selector-checkbox-${inputProps?.name || ''}`}
      $size={size}
      $isDescription={!!description}
      $disabled={!!disabled}
      $variant={checked ? SelectorVariant.PRIMARY : SelectorVariant.SECONDARY}
      className={className}>
      <Body>
        {LeftIconComponent && (
          <LeftIconComponentWrapper $disabled={!!disabled}>
            <LeftIconComponent />
          </LeftIconComponentWrapper>
        )}
        <InfoContainer>
          <Title
            $isSelected={checked}
            $hasDescription={!!description}
            forwardedAs="h6"
            font={description ? 'title_22_18_medium' : 'caption_16_12_regular'}
            variant={TextVariants.SECONDARY}>
            {text}
          </Title>
          {description && (
            <Description $isActive={checked} font="body_24_16_regular">
              {description}
            </Description>
          )}
        </InfoContainer>
      </Body>
      {isLongVariant &&
        (checked ? (
          <StyledRadio width={24} height={24} color={disabled ? colors.greyScale[60] : colors.greyScale[100]} />
        ) : (
          <Circle className="circle" />
        ))}
      <HiddenCheckbox
        type="checkbox"
        disabled={disabled}
        {...inputProps}
        checked={checked}
        id={`selector-checkbox-${inputProps?.name || ''}`}
      />
    </Root>
  );
};

export default Selector;

type RootProps = {
  $size: SelectorSize;
  $isDescription?: boolean;
  $variant: SelectorVariant;
  $disabled: boolean;
};

export enum SelectorSize {
  NORMAL,
  LONG,
}

export enum SelectorVariant {
  PRIMARY,
  SECONDARY,
}

const SelectorSizes = {
  [SelectorSize.NORMAL]: css`
    width: fit-content;
    min-width: 96px;
    height: 40px;

    justify-content: center;
    padding: 0 16px;
    border-radius: 12px;

    ${({ theme: { typography } }) => typography.caption_16_12_regular}
  `,
  [SelectorSize.LONG]: css`
    width: 100%;
    max-width: 100%;
    height: auto;

    justify-content: space-between;
    padding: 20px 24px;
    border-radius: 16px;

    ${({ theme: { typography } }) => typography.body_20_14_medium}
  `,
};

const SelectorVariants = {
  [SelectorVariant.PRIMARY]: ($disabled: boolean) =>
    $disabled
      ? css`
          background: ${colors.greyScale[30]};
          color: ${colors.greyScale[60]};

          ${typography.caption_16_12_medium}
        `
      : css`
          background: linear-gradient(${colors.gradient.default});
          font-weight: 500;

          :focus,
          :focus-visible,
          :focus-within {
            box-shadow: 0 0 0 4px ${colors.greyScale[50]};
          }

          :hover {
            background: linear-gradient(${colors.gradient.saturation});
          }
        `,
  [SelectorVariant.SECONDARY]: ($disabled: boolean, $isLong: boolean) => css`
    background-color: ${colors.greyScale[0]};
    border-color: ${colors.greyScale[30]};

    ${$disabled
      ? css`
          color: ${colors.greyScale[50]};
        `
      : css`
          :focus,
          :focus-visible,
          :focus-within {
            box-shadow: 0 0 0 4px ${colors.greyScale[30]};
            border-color: transparent;
          }
          :hover {
            background-color: ${$isLong ? colors.greyScale[0] : colors.greyScale[10]};

            .circle {
              background-color: ${colors.greyScale[40]};
            }
          }
        `}
  `,
};

const Root = styled.label<RootProps>`
  ${({ theme: { colors }, $size, $variant, $disabled, $isDescription }) => css`
    display: flex;
    align-items: ${$isDescription ? 'flex-start' : 'center'};

    padding: 20px 24px;

    border-width: 1px;
    border-style: solid;
    border-color: transparent;

    background-origin: border-box !important;
    background-repeat: no-repeat;

    cursor: ${$disabled ? 'not-allowed' : 'pointer'};

    color: ${colors.greyScale[100]};

    ${SelectorSizes[$size]};
    ${SelectorVariants[$variant]($disabled, $size === SelectorSize.LONG)};
  `}
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const Circle = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  padding: 10px;
  background-color: ${colors.greyScale[30]};
`;

const LeftIconComponentWrapper = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;

    path {
      fill: ${({ theme: { colors }, $disabled }) => ($disabled ? colors.greyScale[50] : colors.greyScale[100])};
    }
  }
`;

const StyledRadio = styled(Radio)`
  margin: -2px;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  display: none;
`;

const InfoContainer = styled.span`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const Title = styled(AppText)<{ $isSelected?: boolean; $hasDescription?: boolean }>`
  font-weight: ${({ $isSelected, $hasDescription }) => $isSelected && !$hasDescription && '500'};
`;

const Description = styled(AppText)<{ $isActive?: boolean }>`
  color: ${({ theme: { colors }, $isActive }) => ($isActive ? colors.greyScale[80] : colors.greyScale[60])};
`;
