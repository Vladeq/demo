import { MainLayout } from 'layouts';
import React from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

import { Advantages, Header, HowItWorks } from './components';

const HomePage = () => {
  return (
    <StyledMainLayout headTitle="homepage">
      <Header />
      <HowItWorks />
      <Advantages payPicSrc="/img/macbook.png" ownerPicSrc="/img/woman.png" />
    </StyledMainLayout>
  );
};

const StyledMainLayout = styled(MainLayout)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
  }
`;

export default HomePage;
