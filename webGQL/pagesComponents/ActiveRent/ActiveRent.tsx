import { MainLayout } from 'layouts';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

import { usegetActiveContractById } from '../../graphql/queries/Contracts/__generated__/getActiveContractById.query';
import ActiveRentSkeleton from './ActiveRentSkeleton';
import { Header, RentInfo } from './components';

const ActiveRent: FC = () => {
  const { query } = useRouter();
  const { id } = query;

  const contractId = String(id);

  const { data: contract, loading } = usegetActiveContractById({
    variables: {
      input: {
        id: contractId,
      },
    },
  });

  const baseApartmentAdData = contract?.contract__tenant_find?.baseApartmentAdData;

  const title = baseApartmentAdData?.title;

  return (
    <StyledMainLayout headTitle={title || ''} childrenForHeader={<Header title={title || ''} />}>
      {loading ? (
        <ActiveRentSkeleton />
      ) : (
        <Content>
          <RentInfo />
        </Content>
      )}
    </StyledMainLayout>
  );
};

const StyledMainLayout = styled(MainLayout)`
  @media (max-width: ${BreakpointsEnum.s}px) {
    padding-bottom: 80px;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 47px;
  width: 655px;
  justify-content: center;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export default ActiveRent;
