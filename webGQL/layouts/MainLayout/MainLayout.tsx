import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

import { Footer, Header } from './components';

type MainLayoutProps = {
  isSecondaryHeader?: boolean;
  isSecondaryBackground?: boolean;
  headTitle: string;
  childrenForHeader?: ReactNode;
  children: ReactNode;
  customHeader?: ReactNode;
  className?: string;
  filters?: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({
  isSecondaryHeader = false,
  isSecondaryBackground = false,
  headTitle,
  children,
  customHeader,
  className,
  childrenForHeader,
  filters,
}) => {
  return (
    <Root $isSecondaryBackground={isSecondaryBackground}>
      <Head>
        <title>{headTitle}</title>
      </Head>
      {customHeader || (
        <Header isSecondary={isSecondaryHeader} filters={filters}>
          {childrenForHeader}
        </Header>
      )}
      <Main className={className}>{children}</Main>
      <Footer />
    </Root>
  );
};

export default MainLayout;

const Root = styled.div<{ $isSecondaryBackground: boolean }>`
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-color: ${({ theme: { colors }, $isSecondaryBackground }) =>
    $isSecondaryBackground ? colors.greyScale[10] : colors.greyScale[0]};
`;

const Main = styled.main`
  width: 100%;
  max-width: 1440px;
  height: 100%;

  margin: 0 auto;
  padding: 32px 72px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 48px;
  }

  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 16px;
  }
`;
