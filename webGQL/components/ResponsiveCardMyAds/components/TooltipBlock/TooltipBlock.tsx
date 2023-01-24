import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize } from 'ui/Button/Button';

interface TooltipBlockProps {
  text: string;
  withButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const TooltipBlock: FC<TooltipBlockProps> = ({ text, withButton, buttonText, onButtonClick }) => {
  const isHaveButton = withButton && buttonText;

  return (
    <MainContainer>
      <AppText variant={TextVariants.PRIMARY} font="body_24_16_regular">
        {text}
      </AppText>
      {isHaveButton && <StyledButton text={buttonText} size={ButtonSize.LONG_TEXT} onClick={onButtonClick} />}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 16px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default TooltipBlock;
