import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

import { ContractRentStatus } from '../../../../__generated__/types';
import { ActiveRents, CompletedRents, SkeletonMyBookings } from './components';
import useTenantLongRentsList from './hooks/useTenantLongRentsList';
import useTenantShortRentsList from './hooks/useTenantShortRentsList';

const MyBookings: FC = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'myBookings' });

  const { defaultLoading: defaultLoadingLongRent } = useTenantLongRentsList(ContractRentStatus.Concluded, 1);

  const { defaultLoading: defaultLoadingShortRent } = useTenantShortRentsList(ContractRentStatus.Concluded, 1);

  const { defaultLoading: defaultLoadingShortRentCompleted } = useTenantShortRentsList(ContractRentStatus.Completed, 1);

  const isLoading = defaultLoadingShortRent || defaultLoadingLongRent || defaultLoadingShortRentCompleted;

  if (isLoading) {
    return <SkeletonMyBookings />;
  }

  return (
    <MainContainer>
      <Content>
        <TitleRent variant={TextVariants.SECONDARY}>{t('titleActive')}</TitleRent>
      </Content>
      <ActiveRents />
      <Content>
        <TitleRent variant={TextVariants.SECONDARY}>{t('titleComplete')}</TitleRent>
      </Content>
      <CompletedRents />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
  `}
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1296px;
  margin: 32px auto;
  padding: 40px;
  gap: 24px;
  border-radius: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: none;
    padding: 24px 16px;
    border-radius: 0;
    margin: 0 auto;
  }
`;

const TitleRent = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_36_26_bold};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_22_18_bold}
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

export default MyBookings;
