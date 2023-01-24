import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { formatDate } from 'utils';

import { NotifyOff, NotifyOn } from '../../../public/svg/components';
import { dayjs } from '../../services';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { ButtonSize } from '../Button/Button';

type NotificationProps = {
  withButton?: boolean;
  date: string;
  isRead: boolean;
  title: string;
  description: string;
};

const Notification: FC<NotificationProps> = ({ withButton, date = dayjs().toString(), description, title, isRead }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'buttons' });

  return (
    <Root>
      <IconContainer>{isRead ? <NotifyOff /> : <NotifyOn />}</IconContainer>
      <InfoContainer>
        <Title font="body_24_16_medium">{title}</Title>
        <Description font="body_20_14_regular">{description}</Description>
        {withButton && (
          <StyledButton
            onClick={() => console.log('переходим на чаты урааааа')}
            text={t('notify')}
            size={ButtonSize.SMALL}
          />
        )}
        <DateText font="caption_16_12_regular">{formatDate(date)}</DateText>
      </InfoContainer>
    </Root>
  );
};

export default Notification;

const StyledButton = styled(Button)`
  padding: 0 47px;
`;

const Root = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 24px;
  min-width: 461px;
  width: 100%;
  max-height: 208px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]};
    transition: 0.3s;
  }
`;

const IconContainer = styled.div``;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const Description = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[80]};
`;

const DateText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
