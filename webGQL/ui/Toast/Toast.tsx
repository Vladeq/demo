import { FC } from 'react';
import styled from 'styled-components';
import { AppText } from 'ui/AppText';

import { Close } from '../../../public/svg/components';
import { LightButton } from '../LightButton';
import { LightButtonSize } from '../LightButton/LightButton';

type ToastProps = {
  title: string;
  text?: string;
  action?: () => void;
};

const Toast: FC<ToastProps> = ({ title, text, action }) => {
  return (
    <Root>
      <Container>
        <TextContainer>
          <StyledAppText font="body_20_14_medium">{title}</StyledAppText>
          <Close />
        </TextContainer>
        {text && <Text font="caption_16_12_regular">{text}</Text>}
      </Container>
      {action && (
        <ButtonContainer>
          <StyledLightButton onClick={action} text="Отменить" size={LightButtonSize.NORMAL} isUnderline />
        </ButtonContainer>
      )}
    </Root>
  );
};

export default Toast;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[0]};
  overflow: hidden;
  word-break: break-word;
`;

const Container = styled.div`
  background: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const Text = styled(StyledAppText)`
  margin-top: 8px;
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Root = styled.div`
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 10px 15px rgba(175, 181, 192, 0.18);
  background: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const StyledLightButton = styled(LightButton)`
  background: ${({ theme: { colors } }) => colors.greyScale[100]};
  color: ${({ theme: { colors } }) => colors.greyScale[0]};
  ${({ theme: { typography } }) => typography.body_24_14_medium};

  &:focus {
    box-shadow: none;
  }

  &:hover {
    background: ${({ theme: { colors } }) => colors.greyScale[100]};
    color: ${({ theme: { colors } }) => colors.greyScale[0]};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
