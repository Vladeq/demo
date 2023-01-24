import React from 'react';
import ReactSwitch, { ReactSwitchProps } from 'react-switch';
import styled, { css } from 'styled-components';
import { colors } from 'styles/themes/default/colors';
import { AppText } from 'ui/AppText';

type SwitchProps = { label?: string } & ReactSwitchProps;

const Switch = ({ label, disabled = false, ...props }: SwitchProps) => {
  return (
    <Root>
      {!!label && (
        <StyledAppText $disabled={disabled} font="body_20_14_regular">
          {label}
        </StyledAppText>
      )}
      <StyledReactSwitch
        className="switch"
        width={44}
        height={24}
        handleDiameter={20}
        borderRadius={44}
        uncheckedIcon={false}
        checkedIcon={false}
        disabled={disabled}
        $disabled={disabled}
        boxShadow="none"
        activeBoxShadow="none"
        onColor={colors.greyScale[100]}
        offColor={colors.greyScale[30]}
        onHandleColor={colors.greyScale[0]}
        offHandleColor={colors.greyScale[0]}
        {...props}
      />
    </Root>
  );
};

export default Switch;

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledReactSwitch = styled(ReactSwitch)<{ $disabled: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  ${({ $disabled, checked, theme: { colors } }) =>
    !$disabled &&
    css`
      :hover {
        .react-switch-bg {
          background: ${checked ? colors.greyScale[90] : colors.greyScale[40]} !important;
        }
      }
      &:focus-within {
        .react-switch-bg {
          box-shadow: 0 0 0 2px ${checked ? colors.greyScale[90] : colors.greyScale[40]};
        }
      }
    `};
`;

const StyledAppText = styled(AppText)<{ $disabled: boolean }>`
  ${({ $disabled, theme: { colors } }) =>
    $disabled &&
    css`
      color: ${colors.greyScale[20]};
    `}
`;
