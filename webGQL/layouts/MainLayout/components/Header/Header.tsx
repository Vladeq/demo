import { useReactiveVar } from '@apollo/client';
import { NotifyButton, ProfileButton } from 'components';
import { Auth } from 'components/Auth';
import { Routes } from 'constains';
import { useGetLightMeLazyQuery } from 'graphql/queries/User/__generated__/getLightMe.query';
import { useClientSize, useToggle, useWindowScroll } from 'hooks';
import { authRoute, loginModalVar } from 'libs/apollo-client/react-variables';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { IconButton } from 'ui';
import { getCookie, setCookie } from 'utils';

import { Add, LogoLivin, Menu } from '../../../../../public/svg/components';
import { BurgerMenu } from '../BurgerMenu';

type HeaderProps = {
  isSecondary: boolean;
  children?: ReactNode;
  filters?: ReactNode;
};

const Header: FC<HeaderProps> = ({ isSecondary, children, filters }) => {
  const router = useRouter();
  const { t } = useTranslation('ui', { keyPrefix: 'header' });

  const { scrollY } = useWindowScroll();
  const { isAuthModalOpen } = useReactiveVar(loginModalVar);
  const { isOpened, toggle, close } = useToggle();
  const token = getCookie('token');

  const [getLightMe, { data }] = useGetLightMeLazyQuery();

  useEffect(() => {
    if (token) {
      getLightMe();
    }
  }, [token]);

  const user = data?.user__me;
  const isAuthorized = !!user?.id;

  const routeToCreateAdPage = () => {
    if (user?.id) {
      loginModalVar({ isAuthModalOpen: false });
      setCookie('advertId', '');
      router.push(Routes.adCreate);
    } else {
      authRoute(Routes.adCreate);
      loginModalVar({ isAuthModalOpen: true });
    }
  };

  const routeToHomePage = () => {
    router.push(Routes.home);
    close();
  };

  const { getIsBreakpoint } = useClientSize();

  const isSBreakpoint = getIsBreakpoint('s');

  const isBorder = scrollY > 0 && !isOpened;

  const isHiddenMainHeader = !!filters && scrollY > 0 && isSBreakpoint;

  useEffect(() => {
    if (!isSBreakpoint) close();
  }, [isSBreakpoint]);

  const authorizedLinks = useMemo(
    () => [
      { label: t('userDropDown.links.messages'), value: Routes.chat },
      { label: t('userDropDown.links.profile'), value: Routes.myProfile },
      { label: t('userDropDown.links.myApartmentAd'), value: Routes.myAds },
    ],
    [t],
  );

  return (
    <>
      <Root $isBorder={isBorder} $isSecondaryBackground={isSecondary}>
        <Wrapper $isHiddenMainHeader={isHiddenMainHeader}>
          <button onClick={routeToHomePage}>
            <LogoLivin />
          </button>
          <div>{filters}</div>
          <Navigation>
            {!isSBreakpoint && !filters && (
              <LinkButton onClick={routeToCreateAdPage}>{t('userDropDown.links.becomeAnOwner')}</LinkButton>
            )}
            {isAuthorized && <NotifyButton />}
            {isSBreakpoint ? (
              <BurgerButton
                $isOpen={isOpened}
                onClick={toggle}
                isSecond={isOpened}
                IconComponent={Menu}
                SecondIconComponent={Add}
              />
            ) : (
              <ProfileButton
                authorizedLinks={authorizedLinks}
                avatar={user?.avatarKey}
                username={user?.firstName}
                isAuthorized={isAuthorized}
              />
            )}
          </Navigation>
        </Wrapper>
        {children}
      </Root>
      {isSBreakpoint && (
        <BurgerMenu
          authorizedLinks={authorizedLinks}
          avatar={user?.avatarKey || ''}
          username={user?.firstName}
          close={close}
          isAuthorized={isAuthorized}
          isOpen={isOpened}
        />
      )}
      {isAuthModalOpen && <Auth />}
    </>
  );
};

export default Header;

type RootProps = { $isBorder: boolean; $isSecondaryBackground: boolean };

const Root = styled.header<RootProps>`
  ${({ theme: { colors }, $isSecondaryBackground, $isBorder }) => css`
    position: sticky;
    display: flex;
    flex-direction: column;

    width: 100%;
    z-index: 1001;
    top: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;

    background-color: ${$isSecondaryBackground ? colors.greyScale[10] : colors.greyScale[0]};

    border-bottom: 1px solid;
    border-color: ${$isBorder ? colors.greyScale[30] : 'transparent'};
  `}
`;

const Wrapper = styled.div<{ $isHiddenMainHeader: boolean }>`
  display: flex;

  width: 100%;
  max-width: 1440px;
  height: 100%;

  padding: 24px 72px;

  justify-content: space-between;
  align-items: center;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 48px;
  }

  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 16px;
    display: ${({ $isHiddenMainHeader }) => ($isHiddenMainHeader ? 'none' : 'flex')};
    height: ${({ $isHiddenMainHeader }) => ($isHiddenMainHeader ? '0' : '100%')};
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    gap: 24px;
  }
`;

const LinkButton = styled.button`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[100]};
    ${typography.body_24_16_medium}
  `}
`;

const BurgerButton = styled(IconButton)<{ $isOpen: boolean }>`
  div {
    transition: all 0.2s linear;
    transform: rotate(${({ $isOpen }) => ($isOpen ? 225 : 0)}deg);
  }

  :focus,
  :focus-visible {
    box-shadow: 0 0 0 1px ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;
