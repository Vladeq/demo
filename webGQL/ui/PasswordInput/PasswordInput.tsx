import { FC, InputHTMLAttributes, useState } from 'react';
import styled from 'styled-components';

import SvgEye from '../../../public/svg/components/Eye';
import SvgEyeSlash from '../../../public/svg/components/EyeSlash';
import { BaseInput } from '../../styles/components/input';
import { colors } from '../../styles/themes/default/colors';
import { AppText } from '../AppText';

export type BaseInputProps = {
  eventType?: EventTypeEnum;
  description?: string;
} & InputHTMLAttributes<HTMLInputElement>;

enum EventTypeEnum {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INIT = 'INIT',
}

const ColorDescriptionMapping = {
  [EventTypeEnum.INIT]: colors.greyScale[60],
  [EventTypeEnum.ERROR]: colors.additional.red,
  [EventTypeEnum.SUCCESS]: colors.additional.green,
};

const PasswordInput: FC<BaseInputProps> = ({ disabled, eventType, description, ...inputProps }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleIsShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <Root>
      <InputContainer>
        <StyledPasswordInput
          {...inputProps}
          disabled={disabled}
          type={isShowPassword ? 'text' : 'password'}
          isError={eventType === EventTypeEnum.ERROR}
        />
        {!disabled && (
          <IconContainer onClick={toggleIsShowPassword}>{isShowPassword ? <SvgEye /> : <SvgEyeSlash />}</IconContainer>
        )}
      </InputContainer>
      {description && (
        <Signature font="caption_14_10_regular" eventType={eventType!}>
          {description}
        </Signature>
      )}
    </Root>
  );
};

export default PasswordInput;

const Root = styled.div`
  max-width: 176px;
  position: relative;
`;

const StyledPasswordInput = styled(BaseInput)<{ isError?: boolean }>`
  padding: ${({ isError }) => (isError ? '11px 16px' : '12px 16px')};
  border: ${({ theme: { colors }, isError }) => (isError ? `1px solid ${colors.additional.red}` : 'none')};
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const Signature = styled(AppText)<{ eventType: EventTypeEnum }>`
  margin-top: 2px;
  color: ${({ eventType }) => ColorDescriptionMapping[eventType]};
`;

const IconContainer = styled.span`
  position: absolute;
  right: 16px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);

  svg {
    display: block;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;
