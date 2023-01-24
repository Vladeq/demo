import { Routes } from 'constains';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { LinkTo } from 'ui';

import { LivinLogoText } from '../../../../../public/svg/components';
import { Cities, Cooperate, Questions } from './components';

const Footer = () => {
  const { t } = useTranslation('ui', { keyPrefix: 'footer' });
  return (
    <Root>
      <Wrapper>
        <Container>
          <LogoContainer>
            <LivinLogoText />
            <StyledLinkTo href={Routes.home} text={t('support')} />
          </LogoContainer>
          <Cities />
          <Questions />
        </Container>
        <Cooperate />
      </Wrapper>
    </Root>
  );
};

export default Footer;

const Root = styled.footer`
  display: flex;
  width: 100%;

  justify-content: center;

  background-color: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;

  padding: 40px 72px 0;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 48px;
  }

  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 24px 16px;
  }
`;

const StyledLinkTo = styled(LinkTo)`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[0]};
    ${typography.body_20_14_regular}
  `}
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;

  padding-bottom: 41px;
`;

const LogoContainer = styled.div`
  display: grid;
  grid-gap: 27px;
`;
