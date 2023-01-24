import { CardFeedback } from 'components/CardFeedback';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { dayjs } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { ContractRentStatus } from '../../../../../../../../__generated__/types';
import useTenantLongRentsList from '../../../../hooks/useTenantLongRentsList';

const LongTermTab: FC = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'myBookings' });

  const { activeLongRents, loadMoreLongRents, afterCursorForLongRents, isLoading } = useTenantLongRentsList(
    ContractRentStatus.Completed,
    1,
  );

  const isNoBookings = activeLongRents?.length === 0;

  return (
    <>
      {isNoBookings ? (
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t('noCompletedRents')}
        </AppText>
      ) : (
        <Root>
          {activeLongRents?.map((item, index) => {
            const dateStart = dayjs(item.arrivalDate).format('DD.MM.YYYY');
            const dateEnd = dayjs(item.departureDate).format('DD.MM.YYYY');
            return (
              <CardFeedback
                id={item?.id}
                key={index}
                pictureSrc={item.apartmentAd?.photos[0].fileKey || ''}
                title={item.apartmentAd?.description?.description || ''}
                seller={item.landlord?.firstName || ''}
                dateStart={dateStart || ''}
                dateEnd={dateEnd || ''}
              />
            );
          })}
          <StyledButton
            isLoading={isLoading}
            disabled={!afterCursorForLongRents}
            onClick={loadMoreLongRents}
            text={t('btnMore')}
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.LONG_TEXT}
          />
        </Root>
      )}
    </>
  );
};

export default LongTermTab;

const Root = styled.div`
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
