import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, BaseModal, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

type ModalDeleteAccountProps = {
  onSubmut: () => void;
  onClose: () => void;
  isVisible: boolean;
  canDeleteAccount: boolean;
};

export const ModalDeleteAccount: FC<ModalDeleteAccountProps> = ({ onClose, isVisible, canDeleteAccount, onSubmut }) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'security' });

  return (
    <StyledModal
      onClose={onClose}
      title={canDeleteAccount ? t('personModalTitle') : t('personModalTitleCantDelete')}
      isVisible={isVisible}
      isBottomMobile>
      <ModalContent>{canDeleteAccount ? t('personModalContent') : t('personModalContentCantDelete')}</ModalContent>
      <Buttons>
        {canDeleteAccount ? (
          <>
            <Button
              isFullWight
              text={t('personModalCancel')}
              size={ButtonSize.NORMAL}
              variant={ButtonVariant.SECONDARY}
              onClick={onClose}
            />
            <Button
              isFullWight
              text={t('personModalConfirm')}
              size={ButtonSize.NORMAL}
              variant={ButtonVariant.PRIMARY}
              onClick={onSubmut}
            />
          </>
        ) : (
          <Button
            isFullWight
            text={t('personModalAgree')}
            size={ButtonSize.NORMAL}
            variant={ButtonVariant.PRIMARY}
            onClick={onClose}
          />
        )}
      </Buttons>
    </StyledModal>
  );
};

const StyledModal = styled(BaseModal)`
  max-width: 100%;
  @media (min-width: ${BreakpointsEnum.s}px) {
    max-width: 448px;
  }
`;

const ModalContent = styled(AppText)`
  margin-bottom: 24px;
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
  ${({ theme: { typography } }) => typography.body_24_16_regular}
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
`;
