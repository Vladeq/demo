import { AdComplaintType } from '__generated__/types';
import { ModalComplain } from 'components';
import { useSendApartmentAdComplaint } from 'graphql/mutations/Advert/__generated__/sendApartmentAdComplaint';
import { useClickOutside, useClientSize, useToggle, useWindowScroll } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Breadcrumbs, IconButton, LightButton } from 'ui';
import { IconButtonSize } from 'ui/IconButton/IconButton';
import { LightButtonSize } from 'ui/LightButton/LightButton';

import { ArrowLeft, Information, More } from '../../../../../public/svg/components';

type HeaderApartmentProps = {
  title: string;
  address: string;
  apartmentAdId: string;
  onScroll: () => void;
  isPaused: boolean;
};

const HeaderApartment: FC<HeaderApartmentProps> = ({ title, address, isPaused, apartmentAdId, onScroll }) => {
  const router = useRouter();

  const { t } = useTranslation('apartmentPage', { keyPrefix: 'header' });
  const { t: tAdComplains } = useTranslation('common', { keyPrefix: 'complains.ad' });

  const { close, isOpened, toggle } = useToggle();
  const { isOpened: isOpenComplainModal, open: openComplainModal, close: closeComplainModal } = useToggle();
  const { getIsBreakpoint } = useClientSize();
  const inputRef = useRef<HTMLDivElement>(null);
  const [isOwner] = useState(false);

  const { scrollY } = useWindowScroll();
  useClickOutside(inputRef, close);

  const [sendApartmentAdComplaint, { loading }] = useSendApartmentAdComplaint();

  const adComplains = useMemo(
    () => [
      { label: tAdComplains('thereIsAnErrorInTheAd'), value: AdComplaintType.ThereIsAnErrorInTheAd },
      { label: tAdComplains('thisPlaceDoesNotExist'), value: AdComplaintType.ThisPlaceDoesNotExist },
      { label: tAdComplains('thisIsAFraud'), value: AdComplaintType.ThisIsAFraud },
      { label: tAdComplains('obsceneContent'), value: AdComplaintType.ObsceneContent },
      { label: tAdComplains('other'), value: AdComplaintType.Other },
    ],
    [tAdComplains],
  );

  const sendAdComplaint = async (causes: string[], reason: string) => {
    await sendApartmentAdComplaint({
      variables: { input: { apartmentAdId, cause: causes as AdComplaintType[], reason } },
    });
  };

  const isScroll = scrollY > 0;
  const isWidthSm = getIsBreakpoint('sm');
  const isShowBreadcrumbs = !isScroll && !isWidthSm;

  return (
    <MainContainer $isScroll={isScroll}>
      <Container>
        {isShowBreadcrumbs && <Breadcrumbs title={title} />}
        <Root>
          <InformationBlock>
            {isWidthSm ? (
              <>
                <IconButton IconComponent={ArrowLeft} size={IconButtonSize.SMALL} onClick={router.back} />
                {isScroll && (
                  <MobileTitleContainer>
                    <AppText
                      variant={!isPaused ? TextVariants.SECONDARY : TextVariants.PRIMARY}
                      font="caption_16_12_medium">
                      {title}
                    </AppText>
                    <StyledAppText font="caption_14_10_regular">{address}</StyledAppText>
                  </MobileTitleContainer>
                )}
              </>
            ) : (
              <>
                <AppText
                  variant={!isPaused ? TextVariants.SECONDARY : TextVariants.PRIMARY}
                  font={isScroll ? 'title_22_18_bold' : 'title_36_26_bold'}>
                  {title}
                </AppText>
                <Address>
                  <StyledAppText font={isScroll ? 'body_20_14_medium' : 'body_24_16_medium'}>{address}</StyledAppText>
                  {!isScroll && (
                    <LightButton onClick={onScroll} text={t('onMap')} isUnderline size={LightButtonSize.SMALL} />
                  )}
                </Address>
              </>
            )}
          </InformationBlock>
          <ButtonContainer ref={inputRef}>
            <IconButton onClick={toggle} IconComponent={More} size={IconButtonSize.SMALL} />
            {isOpened && (
              <Menu>
                <MenuItem onClick={openComplainModal}>
                  <Information />
                  <AppText variant={TextVariants.SECONDARY} font="body_20_14_regular">
                    {t('complain')}
                  </AppText>
                </MenuItem>
              </Menu>
            )}
          </ButtonContainer>
        </Root>
        {isPaused && (
          <ErrorContainer>
            <AppText font="body_20_14_medium">{isOwner ? t('suspendedOwner') : t('suspended')}</AppText>
            <StyledLightButton
              text={isOwner ? t('activate') : t('showOther')}
              isUnderline
              size={LightButtonSize.SMALL}
            />
          </ErrorContainer>
        )}
      </Container>
      <ModalComplain
        isLoading={loading}
        complains={adComplains}
        submit={sendAdComplaint}
        close={closeComplainModal}
        isVisible={isOpenComplainModal}
      />
    </MainContainer>
  );
};

export default HeaderApartment;

const MobileTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  word-break: break-word;
  margin-right: 10px;
`;

const MainContainer = styled.div<{ $isScroll: boolean }>`
  ${({ theme: { colors }, $isScroll }) => css`
    width: 100%;
    align-items: center;
    background: ${$isScroll ? colors.greyScale[10] : colors.greyScale[0]};
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;
const Container = styled.div`
  width: 100%;
  padding: 0 72px 16px;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0 48px 8px;
  }
  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 0 16px 8px;
  }
`;
const Menu = styled.div`
  position: absolute;
  display: flex;
  width: 200px;
  top: -4px;
  right: 42px;
  gap: 8px;
  align-items: center;
  padding: 8px 8px;
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 10px 33px rgba(175, 181, 192, 0.18);
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  cursor: pointer;
`;

const MenuItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StyledLightButton = styled(LightButton)`
  background-color: ${({ theme: { colors } }) => colors.additional.redLight};
`;

const ErrorContainer = styled.div`
  display: flex;
  margin-top: 24px;
  padding: 6px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ theme: { colors } }) => colors.additional.redLight};
  border-radius: 16px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
  }
`;
const Root = styled.div`
  position: sticky;
  top: 84px;
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-top: 8px;
  }
`;
const InformationBlock = styled.div`
  word-break: break-all;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 2px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
const Address = styled.div`
  display: flex;
  margin-top: 9px;
  align-items: center;
`;
const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
const ButtonContainer = styled.div`
  position: relative;
  margin-top: 10px;
  margin-right: 1px;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 2px;
  }
`;
