import { useClientSize, useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, BaseModal } from 'ui';

import { loginModalVar } from '../../libs/apollo-client/react-variables';
import { Registration, SendCode, VerifyCode } from './components';

export enum SendCodeStepsEnum {
  FIRST,
  SECOND,
  THIRD,
}

const Auth: FC = () => {
  const { t } = useTranslation('authPage');
  const [actualCodeStep, setActualCodeStep] = useState<SendCodeStepsEnum>(SendCodeStepsEnum.FIRST);
  const [phone, setPhone] = useState('');
  const { isOpened, close } = useToggle(true);
  const { isOpened: isLogin, toggle: toggleIsLogin } = useToggle(true);
  const { getIsBreakpoint } = useClientSize();

  const handleChangeStep = (step: SendCodeStepsEnum) => {
    setActualCodeStep(step);
  };

  const handleOnClose = () => {
    loginModalVar({ isAuthModalOpen: false });
  };

  const SendCodeStepsMapping = {
    [SendCodeStepsEnum.FIRST]: (
      <SendCode onToggle={toggleIsLogin} isLogin={isLogin} onSetPhone={setPhone} onChangeStep={handleChangeStep} />
    ),
    [SendCodeStepsEnum.SECOND]: <VerifyCode phone={phone} onCloseModal={close} onChangeStep={handleChangeStep} />,
    [SendCodeStepsEnum.THIRD]: <Registration onCloseModal={close} />,
  };

  const ModalTitleMapping = {
    [SendCodeStepsEnum.FIRST]: isLogin ? `${t('login.title')}` : `${t('registration.headTitle')}`,
    [SendCodeStepsEnum.SECOND]: `${t('confirm.title')}`,
    [SendCodeStepsEnum.THIRD]: `${t('registration.title')}`,
  };

  const renderCodeStep = (step: SendCodeStepsEnum) => {
    return SendCodeStepsMapping[step];
  };

  const goToFirstStep = () => {
    setActualCodeStep(SendCodeStepsEnum.FIRST);
  };

  const renderModalTitle = (step: SendCodeStepsEnum) => {
    return ModalTitleMapping[step];
  };

  const isMobileTitle = getIsBreakpoint('s') && actualCodeStep === SendCodeStepsEnum.FIRST;

  return (
    <StyledBaseModal
      onClose={handleOnClose}
      title={renderModalTitle(actualCodeStep)}
      withStandartTitle={isMobileTitle}
      isVisible={isOpened}
      onGoBack={goToFirstStep}
      withBackOption={actualCodeStep === SendCodeStepsEnum.SECOND}>
      <InnerModal>
        {isMobileTitle && (
          <TitleText font="title_33_24_bold" variant={TextVariants.SECONDARY}>
            {renderModalTitle(actualCodeStep)}
          </TitleText>
        )}
        {renderCodeStep(actualCodeStep)}
      </InnerModal>
    </StyledBaseModal>
  );
};

export default Auth;

const StyledBaseModal = styled(BaseModal)`
  max-width: 448px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    max-width: 100%;
    height: 100%;
    border-radius: 0;

    .modal-header {
      padding: 16px;
    }
  }
`;

const TitleText = styled(AppText)`
  margin-top: 8px;
`;
const InnerModal = styled.div`
  @media (max-width: ${BreakpointsEnum.s}px) {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;
