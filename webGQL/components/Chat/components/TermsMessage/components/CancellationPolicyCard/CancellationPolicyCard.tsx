import { ShortTermRentCancellationPolicyType } from '__generated__/types';
import { rentCancellationPolicyMapping } from 'constains';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';

type CancellationPolicyCardProps = {
  type: ShortTermRentCancellationPolicyType;
};

const CancellationPolicyCard: FC<CancellationPolicyCardProps> = ({ type }) => {
  const rentCancellationPolicy = rentCancellationPolicyMapping[type];

  return (
    <Root>
      <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
        {rentCancellationPolicy.label}
      </AppText>
      <Description>{rentCancellationPolicy.text}</Description>
    </Root>
  );
};

export default CancellationPolicyCard;

const Root = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  padding: 16px;
  gap: 8px;
  border-radius: 16px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.greyScale[0]};
    border: 1px solid ${colors.greyScale[30]};
  `};
`;

const Description = styled.p`
  ${({ theme: { typography, colors } }) => css`
    color: ${colors.greyScale[60]};
    ${typography.body_20_14_regular}
  `};
`;
