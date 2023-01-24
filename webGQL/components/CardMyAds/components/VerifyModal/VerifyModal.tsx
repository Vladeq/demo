import { RentPeriodType } from '__generated__/types';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { TickCircle } from '../../../../../public/svg/components';

interface VerifyModalProps {
  rentType: RentPeriodType;
  confirmData: boolean;
  confirmPhone: boolean;
  confirmDocuments: boolean;
  payMethod: boolean;
  openOwnershipDocsModal: () => void;
  closeVerifyModal: () => void;
  openIdentityModal: () => void;
  openAddBankCardModal: () => void;
}

const VerifyModal: FC<VerifyModalProps> = ({
  rentType,
  confirmData,
  confirmPhone,
  confirmDocuments,
  payMethod,
  openOwnershipDocsModal,
  closeVerifyModal,
  openIdentityModal,
  openAddBankCardModal,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard.verifyModal' });

  const isLongTerm = rentType === RentPeriodType.LongTerm;

  console.log(payMethod, 'payMethod');

  const confirmIdentityData = () => {
    openIdentityModal();
    closeVerifyModal();
  };

  const confirmOwnershipDocs = () => {
    openOwnershipDocsModal();
    closeVerifyModal();
  };

  const confirmPayments = () => {
    openAddBankCardModal();
    closeVerifyModal();
  };

  return (
    <MainContainer>
      <TextContainer>
        <AppText variant={TextVariants.PRIMARY} font="body_24_16_regular">
          {t('mainText')}
        </AppText>
      </TextContainer>
      <ContainerWithBorder>
        <TextContainer>
          <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('dataTitle')}
          </AppText>
          <Text font="body_20_14_regular">{t('dataText')}</Text>
        </TextContainer>
        {!confirmData ? (
          <StyledButton
            text={t('confirmBtn')}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.SECONDARY}
            onClick={confirmIdentityData}
          />
        ) : (
          <SuccessContainer>
            <TickCircle color={colors.additional.green} />
            <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
              {t('finish')}
            </AppText>
          </SuccessContainer>
        )}
      </ContainerWithBorder>
      <ContainerWithBorder>
        <TextContainer>
          <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('numberTitle')}
          </AppText>
          <Text font="body_20_14_regular">{t('numberText')}</Text>
        </TextContainer>
        {!confirmPhone ? (
          <StyledButton text={t('confirmBtn')} size={ButtonSize.SMALL} variant={ButtonVariant.SECONDARY} />
        ) : (
          <SuccessContainer>
            <TickCircle color={colors.additional.green} />
            <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
              {t('finish')}
            </AppText>
          </SuccessContainer>
        )}
      </ContainerWithBorder>
      {isLongTerm && (
        <ContainerWithBorder>
          <TextContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {t('documentTitle')}
            </AppText>
            <Text font="body_20_14_regular">{t('documentText')}</Text>
          </TextContainer>
          {!confirmDocuments ? (
            <StyledButton
              text={t('provideBtn')}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.SECONDARY}
              onClick={confirmOwnershipDocs}
            />
          ) : (
            <SuccessContainer>
              <TickCircle color={colors.additional.green} />
              <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
                {t('finish')}
              </AppText>
            </SuccessContainer>
          )}
        </ContainerWithBorder>
      )}
      <Container>
        <TextContainer>
          <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('payTitle')}
          </AppText>
          <Text font="body_20_14_regular">{t('payText')}</Text>
        </TextContainer>
        {!payMethod ? (
          <StyledButton
            text={t('pointBtn')}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.SECONDARY}
            onClick={confirmPayments}
          />
        ) : (
          <SuccessContainer>
            <TickCircle color={colors.additional.green} />
            <AppText variant={TextVariants.SECONDARY} font="body_20_14_medium">
              {t('finish')}
            </AppText>
          </SuccessContainer>
        )}
      </Container>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 8px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ContainerWithBorder = styled.div`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
  `}
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 16px;
`;

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  justify-content: space-between;
`;

const Text = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
  `}
`;

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 9px;
`;

const StyledButton = styled(Button)`
  max-width: 136px;
  width: 100%;
`;

export default VerifyModal;
