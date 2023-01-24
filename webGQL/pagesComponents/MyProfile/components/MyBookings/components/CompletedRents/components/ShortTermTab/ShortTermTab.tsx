import { CardFeedback } from 'components/CardFeedback';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { dayjs } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { ContractRentStatus } from '../../../../../../../../__generated__/types';
import useTenantShortRentsList from '../../../../hooks/useTenantShortRentsList';

const ShortTermTab: FC = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'myBookings' });

  const { activeShortRents, loadMoreShortRents, afterCursorForShortRents, isLoading } = useTenantShortRentsList(
    ContractRentStatus.Completed,
    1,
  );

  const isNoBookings = activeShortRents?.length === 0;

  return (
    <>
      {isNoBookings ? (
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t('noCompletedRents')}
        </AppText>
      ) : (
        <Cards>
          {activeShortRents?.map((item, index) => {
            const dateStart = dayjs(item.arrivalDate).format('DD.MM.YYYY');
            const dateEnd = dayjs(item.departureDate).format('DD.MM.YYYY');
            return (
              <CardFeedback
                key={index}
                id={item?.id}
                pictureSrc={item.apartmentAd?.photos[0].fileKey || ''}
                title={item.apartmentAd?.description?.name || ''}
                seller={item.landlord?.firstName || ''}
                dateStart={dateStart || ''}
                dateEnd={dateEnd || ''}
              />
            );
          })}
          <StyledButton
            isLoading={isLoading}
            disabled={!afterCursorForShortRents}
            onClick={loadMoreShortRents}
            text={t('btnMore')}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.LONG_TEXT}
          />
        </Cards>
      )}
    </>
  );
};

export default ShortTermTab;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px 36px;
`;

const StyledButton = styled(Button)`
  width: 232px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;
