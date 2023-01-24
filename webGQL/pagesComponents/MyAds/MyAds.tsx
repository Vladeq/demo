import { MainLayout } from 'layouts';
import { FC } from 'react';
import styled from 'styled-components';

import { Header } from './components';

const MyAds: FC = () => {
  return (
    <StyledLayout headTitle="Мои объявления">
      <Header />
    </StyledLayout>
  );
};

const StyledLayout = styled(MainLayout)`
  max-width: 100%;
  padding: 0;
`;

export default MyAds;
