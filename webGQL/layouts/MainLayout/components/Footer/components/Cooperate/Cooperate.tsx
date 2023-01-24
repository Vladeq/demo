import { Routes } from 'constains';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { LinkTo } from 'ui';

import { Facebook, Instagram, Linkedin } from '../../../../../../../public/svg/components';

const Cooperate = () => {
  const { t } = useTranslation('ui', { keyPrefix: 'footer' });

  const { getIsBreakpoint } = useClientSize();

  const isSBreakpoint = getIsBreakpoint('s');

  const cooperateLinks = useMemo(
    () => [
      { text: t('cooperates.termOfUse'), href: Routes.home },
      { text: t('cooperates.privacy'), href: Routes.home },
    ],
    [],
  );

  const socialLinks = useMemo(
    () => [
      {
        icon: Facebook,
        href: 'https://facebook.com',
      },
      {
        icon: Instagram,
        href: 'https://www.instagram.com',
      },
      {
        icon: Linkedin,
        href: 'https://linkedin.com',
      },
    ],
    [],
  );

  return (
    <Root>
      <LinksContainer>
        <Text>{t('cooperates.livin')}</Text>
        {cooperateLinks.map((link, index) => (
          <LinkContainer key={index}>
            {!!index && isSBreakpoint && <Text>·</Text>}
            <Link {...link} />
          </LinkContainer>
        ))}
      </LinksContainer>
      <SocialLinksContainer>
        {socialLinks.map((link, index) => (
          <a key={index} href={link.href} target="blank">
            <link.icon />
          </a>
        ))}
      </SocialLinksContainer>
    </Root>
  );
};

export default Cooperate;

const Root = styled.div`
  display: flex;
  padding: 26px 0;

  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 32px;

  border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[80]};
`;

const Text = styled.p`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[50]};
    ${typography.body_20_14_regular}
  `}
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 8px;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
`;

const SocialLinksContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 32px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    gap: 24px;
  }
`;

const Link = styled(LinkTo)`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[50]};
    ${typography.body_20_14_regular}
  `}
`;
