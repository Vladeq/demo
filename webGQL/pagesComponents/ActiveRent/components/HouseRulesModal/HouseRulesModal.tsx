import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import {
  Children,
  NoChildren,
  NoParty,
  NoPets,
  NoSmoking,
  Party,
  Pets,
  Smoking,
} from '../../../../../public/svg/components';

interface HouseRulesProps {
  isParty: boolean;
  isSmoking: boolean;
  isPets: boolean;
  isChildren: boolean;
  onClose: () => void;
}

const HouseRulesModal: FC<HouseRulesProps> = ({ isParty, isSmoking, isPets, isChildren, onClose }) => {
  const { t } = useTranslation('activeRentPage', { keyPrefix: 'houseRulesModal' });

  return (
    <MainContainer>
      <TextContainer>
        {isPets ? (
          <IconContainer>
            <Pets />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('withPets')}
            </AppText>
          </IconContainer>
        ) : (
          <IconContainer>
            <NoPets />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('withPets')}
            </AppText>
          </IconContainer>
        )}
        {isSmoking ? (
          <IconContainer>
            <Smoking />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('noSmoking')}
            </AppText>
          </IconContainer>
        ) : (
          <IconContainer>
            <NoSmoking />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('withSmoking')}
            </AppText>
          </IconContainer>
        )}
        {isParty ? (
          <IconContainer>
            <Party />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('noParty')}
            </AppText>
          </IconContainer>
        ) : (
          <IconContainer>
            <NoParty />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('withParty')}
            </AppText>
          </IconContainer>
        )}
        {isChildren ? (
          <IconContainer>
            <Children />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('noChildren')}
            </AppText>
          </IconContainer>
        ) : (
          <IconContainer>
            <NoChildren />
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('withChildren')}
            </AppText>
          </IconContainer>
        )}
      </TextContainer>
      <StyledButton onClick={onClose} variant={ButtonVariant.PRIMARY} size={ButtonSize.LONG_TEXT} text="Ok" />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 2px 0;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

export default HouseRulesModal;
