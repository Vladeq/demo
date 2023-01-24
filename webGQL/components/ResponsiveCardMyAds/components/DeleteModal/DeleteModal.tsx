import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BaseModalProps } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { ApartmentAdStatusType, RentPeriodType } from '../../../../__generated__/types';
import useDeleteAd from '../../../../hooks/useDeleteAdvert/useDeleteAd';

type DeleteModalProps = {
  id: string;
  advertType: ApartmentAdStatusType;
  rentType: RentPeriodType;
  close: () => void;
} & BaseModalProps;

const DeleteModal: FC<DeleteModalProps> = ({ close, id, advertType, rentType }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard.deleteModal' });
  const { deleteAdvertWithSideEffects, loading } = useDeleteAd(id!, advertType, rentType);

  const deleteAdvert = async () => {
    await deleteAdvertWithSideEffects();
    close();
  };
  return (
    <MainContainer>
      <TextContainer>
        <Text font="body_24_16_regular">{t('modalText')}</Text>
      </TextContainer>
      <ButtonContainer>
        <StyledButton
          text={t('leftBtn')}
          size={ButtonSize.LONG_TEXT}
          variant={ButtonVariant.SECONDARY}
          onClick={close}
        />
        <StyledButton
          onClick={deleteAdvert}
          isLoading={loading}
          text={t('rightBtn')}
          size={ButtonSize.LONG_TEXT}
          variant={ButtonVariant.PRIMARY}
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

const Text = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[80]};
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 50%;
`;

export default DeleteModal;
