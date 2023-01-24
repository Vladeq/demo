import usePauseAdvert from 'hooks/usePauseAdvert';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { notify } from 'services';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { BaseModalProps } from 'types/card';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { RentPeriodType } from '../../../../__generated__/types';

type StopModalProps = {
  id: string;
  periodType: RentPeriodType;
} & BaseModalProps;

const StopModal: FC<StopModalProps> = ({ close, id, periodType }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard.stopModal' });
  const { changeAdvertStatus, deleteAdvertFromCache, addAdvertFromCache, decrementCount, incrementCount, loading } =
    usePauseAdvert(periodType, id);

  const stopAd = async () => {
    let isAbolition = true;
    const currentAdvert = await deleteAdvertFromCache();
    decrementCount();
    notify(t('toaster.title'), t('toaster.description'), () => {
      addAdvertFromCache(currentAdvert);
      incrementCount();
      isAbolition = false;
    });
    setTimeout(() => {
      if (isAbolition) {
        changeAdvertStatus();
      }
    }, 2000);
    close();
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
          onClick={stopAd}
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 192px;
`;

export default StopModal;
