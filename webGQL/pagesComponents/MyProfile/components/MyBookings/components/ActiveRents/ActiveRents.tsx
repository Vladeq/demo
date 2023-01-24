import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { ContractRentStatus } from '../../../../../../__generated__/types';
import useTenantRentsList from '../../hooks/useTenantLongRentsList';
import useTenantShortRentsList from '../../hooks/useTenantShortRentsList';
import { List } from '../List';

const ActiveRents: FC = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'myBookings' });
  const {
    activeLongRents,
    afterCursorForLongRents,
    loadMoreLongRents,
    isLoading: isLongTermLoading,
  } = useTenantRentsList(ContractRentStatus.Concluded, 1);

  const {
    activeShortRents,
    loadMoreShortRents,
    afterCursorForShortRents,
    isLoading: isShortTermLoading,
  } = useTenantShortRentsList(ContractRentStatus.Concluded, 1);

  const isBookingsEmpty = activeShortRents?.length === 0 && activeLongRents?.length === 0;

  return (
    <MainContainer>
      {isBookingsEmpty ? (
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t('noActiveRents')}
        </AppText>
      ) : (
        <>
          {activeShortRents && (
            <Content>
              <TitleContent variant={TextVariants.SECONDARY}>{t('shortTerm')}</TitleContent>
              <List rents={activeShortRents} />
              <StyledButton
                isLoading={isShortTermLoading}
                disabled={!afterCursorForShortRents}
                onClick={loadMoreShortRents}
                text={t('btnMore')}
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.LONG_TEXT}
              />
            </Content>
          )}
          {activeLongRents && (
            <Content>
              <TitleContent variant={TextVariants.SECONDARY}>{t('longTerm')}</TitleContent>
              <List rents={activeLongRents} />
              <StyledButton
                onClick={loadMoreLongRents}
                isLoading={isLongTermLoading}
                disabled={!afterCursorForLongRents}
                text={t('btnMore')}
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.LONG_TEXT}
              />
            </Content>
          )}
        </>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  margin: 8px 0;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 8px;
  }
`;

const TitleContent = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_22_18_medium}
`;

const StyledButton = styled(Button)`
  width: 232px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;

export default ActiveRents;
