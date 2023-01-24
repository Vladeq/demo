import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { BaseModalProps } from 'types/card';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

interface CancelRentModalProps extends BaseModalProps {
  openNext: () => void;
}

const CancelRentModal: FC<CancelRentModalProps> = ({ close, openNext }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard.cancelRentModal' });

  const openCancelReasonModal = () => {
    close();
    openNext();
  };
  return (
    <MainContainer>
      <TextContainer>
        <AppText variant={TextVariants.PRIMARY} font="body_24_16_regular">
          {t('modalText')}
        </AppText>
      </TextContainer>
      <ButtonContainer>
        <StyledButton
          text={t('leftBtn')}
          size={ButtonSize.LONG_TEXT}
          variant={ButtonVariant.SECONDARY}
          onClick={close}
        />
        <StyledButton
          text={t('rightBtn')}
          size={ButtonSize.NORMAL}
          variant={ButtonVariant.PRIMARY}
          onClick={openCancelReasonModal}
        />
      </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const TextContainer = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 192px;
  padding: 0;
`;

export default CancelRentModal;
