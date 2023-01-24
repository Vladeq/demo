import { Routes } from 'constains';
import { authRoute, loginModalVar, logout as logoutCache } from 'libs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { OptionType } from 'types';
import { AppText, Avatar, LinkTo } from 'ui';
import { AvatarSize } from 'ui/Avatar/Avatar';

import { setCookie } from '../../../../utils';

type BurgerMenuProps = {
  username?: string;
  avatar?: string;
  isOpen: boolean;
  isAuthorized: boolean;
  close: () => void;
  authorizedLinks: Array<OptionType>;
};

const BurgerMenu: FC<BurgerMenuProps> = ({ isOpen, authorizedLinks, isAuthorized, close, avatar, username }) => {
  const router = useRouter();
  const { t } = useTranslation('ui', { keyPrefix: 'header.userDropDown' });

  const routeToCreateAdPage = () => {
    if (isAuthorized) {
      loginModalVar({ isAuthModalOpen: false });
      setCookie('advertId', '');
      router.push(Routes.adCreate);
    } else {
      authRoute(Routes.adCreate);
      loginModalVar({ isAuthModalOpen: true });
    }
    close();
  };

  const routeToCreateMyProfilePage = () => {
    router.push(Routes.myProfile);
    close();
  };

  const logout = () => {
    logoutCache();
    close();
  };

  const login = () => {
    loginModalVar({ isAuthModalOpen: true });
    authRoute('');
    close();
  };

  const AuthorizedLinks = useMemo(
    () => (
      <List>
        {authorizedLinks.map((link, index) => (
          <ListItem key={index}>
            <StyledLinkTo text={link.label} href={link.value} />
          </ListItem>
        ))}
        <button onClick={logout}>
          <ListItem>{t('logout')}</ListItem>
        </button>
      </List>
    ),
    [],
  );

  const UnauthorizedLinks = useMemo(
    () => (
      <List>
        <button onClick={login}>
          <ListItem>{t('login')}</ListItem>
          <ListItem>{t('links.rentOutHousing')}</ListItem>
        </button>
      </List>
    ),
    [],
  );
  return (
    <Root $isOpen={isOpen}>
      <UserContainer onClick={routeToCreateMyProfilePage}>
        <Avatar avatar={avatar} size={AvatarSize.size48} />
        <AppText font="body_20_14_medium">{username || t('profile')}</AppText>
      </UserContainer>
      <LinkButton onClick={routeToCreateAdPage}>{t('links.becomeAnOwner')}</LinkButton>
      {isAuthorized ? AuthorizedLinks : UnauthorizedLinks}
    </Root>
  );
};

export default BurgerMenu;

const Root = styled.div<{ $isOpen: boolean }>`
  ${({ theme: { colors }, $isOpen }) => css`
    position: fixed;
    display: flex;

    width: 100%;
    height: calc(100vh - 72px);

    top: 0;
    right: -100%;
    margin-top: 72px;
    z-index: 10000;

    flex-direction: column;
    padding: 8px 16px;
    gap: 28px;

    transform: translateX(${$isOpen ? '-100%' : 0});
    transition: transform 0.2s linear;

    background-color: ${colors.greyScale[0]};
  `}
`;

const UserContainer = styled.button`
  display: flex;

  gap: 16px;
  align-items: center;
`;

const LinkButton = styled.button`
  ${({ theme: { colors, typography } }) => css`
    padding-left: 2px;
    text-align: start;

    color: ${colors.greyScale[100]};
    ${typography.body_24_16_medium}
  `}
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  width: 100%;
  padding: 14px 0;
  cursor: pointer;

  :last-child {
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }

  color: ${({ theme: { colors } }) => colors.greyScale[100]};
  ${({ theme: { typography } }) => typography.body_20_14_regular};
`;

const StyledLinkTo = styled(LinkTo)`
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
  ${({ theme: { typography } }) => typography.body_20_14_regular};
`;
