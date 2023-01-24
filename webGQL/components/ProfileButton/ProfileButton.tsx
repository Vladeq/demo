import { useClickOutside, useToggle } from 'hooks';
import { authRoute, loginModalVar, logout as logoutCache } from 'libs';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { OptionType } from 'types';
import { Button, LinkTo, ModalDropDown } from 'ui';

import { Avatar as AvatarIcon } from '../../../public/svg/components';
import { Routes } from '../../constains';

type ProfileButtonProps = {
  username?: string;
  avatar?: string | null;
  isAuthorized: boolean;
  authorizedLinks: Array<OptionType>;
};

const ProfileButton = ({ avatar, isAuthorized, authorizedLinks, username }: ProfileButtonProps) => {
  const { t } = useTranslation('ui', { keyPrefix: 'header.userDropDown' });
  const inputsRef = useRef<HTMLDivElement>(null);

  const { close, isOpened, toggle } = useToggle();
  useClickOutside(inputsRef, close);

  const logout = () => {
    logoutCache();
    close();
  };

  const login = () => {
    loginModalVar({ isAuthModalOpen: true });
    close();
  };

  const loginWithRedirect = () => {
    authRoute(Routes.adCreate);
    loginModalVar({ isAuthModalOpen: true });
    close();
  };

  const AuthorizedLinks = useMemo(
    () => (
      <List>
        {authorizedLinks?.map((link, index) => (
          <ListItem key={index}>
            <StyledLinkTo text={link.label} href={link.value} />
          </ListItem>
        ))}
        <button onClick={logout}>
          <ListItem>{t('logout')}</ListItem>
        </button>
      </List>
    ),
    [t],
  );

  const UnauthorizedLinks = useMemo(
    () => (
      <List>
        <ListItem onClick={login}>{t('login')}</ListItem>
        <ListItem onClick={loginWithRedirect}>{t('links.rentOutHousing')}</ListItem>
      </List>
    ),
    [t],
  );

  return (
    <Root ref={inputsRef}>
      <StyledButton
        $isOpen={isOpened}
        onClick={toggle}
        LeftIconComponent={avatar ? <Avatar width={20} height={20} src={avatar} /> : <StyledAvatarIcon />}
        text={username || t('profile')}
      />
      <StyledModalDropDown isDisableScrollBody={false} isOpen={isOpened}>
        {isAuthorized ? AuthorizedLinks : UnauthorizedLinks}
      </StyledModalDropDown>
    </Root>
  );
};

export default ProfileButton;

const Root = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)<{ $isOpen: boolean }>`
  height: 36px !important;
  padding: 0 24px;

  ${({ theme: { colors }, $isOpen }) =>
    $isOpen &&
    css`
      box-shadow: 0 0 0 4px ${colors.greyScale[50]};
    `}
`;

const StyledModalDropDown = styled(ModalDropDown)`
  width: 241px;

  top: auto;
  right: 0;
  bottom: auto;
  left: auto;

  margin-top: 8px;
  border-radius: 20px;
  box-shadow: 0px 10px 33px rgba(175, 181, 192, 0.18);
`;

const Avatar = styled(Image)`
  overflow: hidden;
  object-fit: cover;
  object-position: center;

  border-radius: 50%;
`;

const StyledAvatarIcon = styled(AvatarIcon)`
  width: 20px;
  height: 20px;

  path {
    fill: ${({ theme: { colors } }) => colors.greyScale[0]};
  }
`;

const List = styled.ul`
  display: grid;
  width: 100%;
  padding: 8px 16px;
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
