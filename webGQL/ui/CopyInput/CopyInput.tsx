import { FC, InputHTMLAttributes, useRef } from 'react';
import styled from 'styled-components';

import SvgCopy from '../../../public/svg/components/Copy';
import { BaseInput } from '../../styles/components/input';

const CopyInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ disabled, ...inputProps }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleCopyText = () => {
    if (disabled || !ref?.current) return;
    navigator.clipboard.writeText(ref.current.value);
  };

  return (
    <Root>
      <StyledCopyInput {...inputProps} disabled={disabled} ref={ref} />
      <IconContainer onClick={handleCopyText}>
        <StyledIcon isDisabled={disabled} />
      </IconContainer>
    </Root>
  );
};

export default CopyInput;

const Root = styled.div`
  position: relative;
  max-width: 394px;
`;

const IconContainer = styled.button`
  border: none;
  background: transparent;
  outline: none;
  padding: 0;
  position: absolute;
  height: 16px;
  top: 12px;
  right: 16px;
`;

const StyledCopyInput = styled(BaseInput)`
  width: 100%;
  outline: none;
  max-width: 394px;
  border: none;
  padding: 12px 40px 12px 16px;

  &:focus {
    border: ${({ theme: { colors } }) => `1px solid ${colors.greyScale[60]}`};
    padding: 11px 15px;
  }
`;

const StyledIcon = styled(SvgCopy)<{ isDisabled?: boolean }>`
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  path {
    fill: ${({ theme: { colors }, isDisabled }) => (isDisabled ? colors.greyScale[40] : colors.greyScale[100])};
  }
`;
