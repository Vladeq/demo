import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, LinkTo } from 'ui';

import { CircleCheck } from '../../../../../../../public/svg/components';

type LinkOnStepProps = {
  isCurrent?: boolean;
  link: string;
  title: string;
  isChecked: boolean;
  isDisabled: boolean;
};

const LinkOnStep: FC<LinkOnStepProps> = ({ isCurrent, link, title, isChecked, isDisabled }) => {
  return (
    <Root $isActive={isCurrent}>
      {isChecked ? <CircleCheck /> : <Indicator $isActive={isCurrent} />}
      {isDisabled ? (
        <DisabledText font="body_24_16_regular">{title}</DisabledText>
      ) : (
        <StyledLinkTo text={title} href={link} />
      )}
    </Root>
  );
};

export default LinkOnStep;

const Root = styled.div<{ $isActive?: boolean }>`
  display: flex;
  gap: 14px;
  align-items: center;

  @media (max-width: ${BreakpointsEnum.md}px) {
    ${({ $isActive, theme: { colors } }) =>
      $isActive &&
      css`
        ::before {
          position: absolute;
          content: '';

          height: 2px;
          width: 100%;
          bottom: 0px;

          background-color: ${colors.greyScale[100]};
        }
      `};

    gap: 10px;
    padding-bottom: 6px;
  }
`;

const DisabledText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  cursor: not-allowed;
`;

const Indicator = styled.div<{ $isActive?: boolean }>`
  height: 20px;
  width: 20px;
  min-width: 20px;
  border: ${({ $isActive }) => ($isActive ? '2px solid #AFB5C0' : 'none')};
  min-height: 20px;
  border-radius: 50%;
  background: ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const StyledLinkTo = styled(LinkTo)`
  ${({ theme: { typography } }) => typography.body_24_16_medium}
`;
