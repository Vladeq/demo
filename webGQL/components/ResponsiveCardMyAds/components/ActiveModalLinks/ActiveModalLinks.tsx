import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BaseModalProps, TextVariants } from 'types';
import { AppText } from 'ui';

interface ActiveModalProps extends BaseModalProps {
  openNext: () => void;
  openAvailableModal: () => void;
}

const ActiveModalLinks: FC<ActiveModalProps> = ({ close, openNext, openAvailableModal }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'myAdsCard' });

  const openModal = () => {
    close();
    openNext();
  };

  return (
    <>
      <MainContainer>
        <TextContainerWithBorder>
          <ModalText variant={TextVariants.SECONDARY} font="body_20_14_regular">
            {t('dropDownLinks.paymentWay')}
          </ModalText>
        </TextContainerWithBorder>
        <TextContainerWithBorder onClick={openAvailableModal}>
          <ModalText variant={TextVariants.SECONDARY} font="body_20_14_regular">
            {t('dropDownLinks.setAvailable')}
          </ModalText>
        </TextContainerWithBorder>
        <TextContainer onClick={openModal}>
          <ModalRedText font="body_20_14_regular">{t('dropDownLinks.cancelRent')}</ModalRedText>
        </TextContainer>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextContainerWithBorder = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
    &:hover {
      cursor: pointer;
    }
  `}
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const ModalText = styled(AppText)`
  padding: 12px 0;
`;

const ModalRedText = styled(AppText)`
  ${({ theme }) => css`
    padding: 12px 0;
    color: ${theme.colors.additional.red};
  `}
`;

export default ActiveModalLinks;
