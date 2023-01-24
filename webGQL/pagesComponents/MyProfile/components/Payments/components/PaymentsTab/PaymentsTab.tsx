import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { Alert, TableCaptions, Transaction } from '..';
import { TransactionVariant } from '../Transaction/Transaction';

type PaymentsTabProps = {};

const PaymentsTab: FC<PaymentsTabProps> = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'payments' });
  const isEmpty = false;

  const handleShowMoreClick = () => {};

  return (
    <Root>
      {isEmpty ? (
        <Empty>{t('noPayments')}</Empty>
      ) : (
        <Content>
          <Alerts>
            <Alert price="120 000 〒" paymentDate="12 июня 2022" />
            <Alert hasButton={false} price="120 000 〒" paymentDate="22 июня 2022" />
          </Alerts>
          <TableCaptions />
          <Transaction />
          <Transaction variant={TransactionVariant.PROFIT} />
          <Transaction />
          <Transaction />
          <Transaction />
          <StyledButton
            isFullWight
            text={t('showMore')}
            size={ButtonSize.NORMAL}
            variant={ButtonVariant.SECONDARY}
            onClick={handleShowMoreClick}
          />
        </Content>
      )}
    </Root>
  );
};

export default PaymentsTab;

const Root = styled.div``;

const Alerts = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-bottom: 24px;
`;

const Content = styled.div``;

const Empty = styled(AppText)`
  ${({ theme: { typography } }) => typography.body_24_16_regular}
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
  ${({ theme: { typography } }) => typography.caption_16_12_medium}
  @media (min-width: ${BreakpointsEnum.sm}px) {
    margin-top: 32px;
    max-width: 232px;
  }
`;
