import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { RequestStatusEnum } from 'types/card';
import { AppText } from 'ui';

interface NotifyContainerProps {
  type: RequestStatusEnum;
  middleRequest?: string;
}

const NotifyContainer: FC<NotifyContainerProps> = ({ type, middleRequest }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });

  const RequestStatusMapping = {
    [RequestStatusEnum.INIT]: (
      <AppText variant={TextVariants.PRIMARY} font="body_24_16_regular">
        {middleRequest}
      </AppText>
    ),
    [RequestStatusEnum.PAUSED]: (
      <AppText variant={TextVariants.PRIMARY} font="body_24_16_regular">
        {middleRequest}
      </AppText>
    ),
    [RequestStatusEnum.SENDED]: (
      <>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
          {t('infoSendRequest')}
        </AppText>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
          {t('sellerWaiting')}
        </AppText>
      </>
    ),
    [RequestStatusEnum.APPROVED]: (
      <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
        {t('requestApproved')}
      </AppText>
    ),
  };

  return <Container>{RequestStatusMapping[type]}</Container>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 24px;
  align-items: center;
`;

export default NotifyContainer;
