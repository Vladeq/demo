import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { CardActiveRent } from '../../../../../../components/СardActiveRent';
import { getActiveTenantShortTerms } from '../../../../../../graphql/queries/Contracts/__generated__/getTenantShortTerms.query';

type ListProps = {
  rents: getActiveTenantShortTerms['contract__tenant_shortTermRents']['data'];
};

const List: FC<ListProps> = ({ rents }) => {
  const renderRents = useMemo(() => {
    return rents?.map((item, index) => {
      const address = item.apartmentAd?.address!;
      const formattedAddress = `${address.region || ''} ${address.city || ''} ${address.street || ''} ${
        address.houseNumber || ''
      }`;
      return (
        <CardActiveRent
          key={index}
          id={item.id}
          pictureSrc={item.apartmentAd?.photos[0]?.fileKey || ''}
          title={item.apartmentAd?.description?.name || ''}
          address={formattedAddress || ''}
          price={item.cost}
          paymentDate="wait backend"
          rentType={item.apartmentAd?.rentPeriodType!}
        />
      );
    });
  }, [rents]);

  return <Root>{renderRents}</Root>;
};

export default List;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;
