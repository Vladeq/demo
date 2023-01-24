import React, { FC } from 'react';
import styled, { css, CSSProp } from 'styled-components';
import { TextVariants, VariantTypography } from 'types/index';

type AppTextProps = {
  font?: VariantTypography;
  children: React.ReactNode;

  customStyles?: CSSProp;
  variant?: TextVariants;
  as?: React.ElementType;
  className?: string;
};

const AppText: FC<AppTextProps> = (props) => {
  const { font = 'body_20_14_medium', className, customStyles, children, variant = TextVariants.PRIMARY, as } = props;
  return (
    <Text className={className} $CSS={customStyles} $font={font} as={as} $variant={variant}>
      {children}
    </Text>
  );
};

export default AppText;

type TextProps = {
  $font: VariantTypography;
  $CSS?: CSSProp;
  $variant: TextVariants;
};

const getThemeStyles = ($variant: TextVariants) => {
  if ($variant === TextVariants.PRIMARY) {
    return css`
      color: ${({ theme: { colors } }) => colors.greyScale[80]};
    `;
  }
  return css`
    color: ${({ theme: { colors } }) => colors.greyScale[100]};
  `;
};

const Text = styled.p<TextProps>`
  margin: 0;
  padding: 0;

  ${({ theme: { typography }, $font }) => typography[$font]}

  ${({ $variant }) => getThemeStyles($variant)}

  ${({ $CSS }) => $CSS}
`;
