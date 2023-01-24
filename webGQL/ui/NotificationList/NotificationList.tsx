import { FC } from 'react';
import styled from 'styled-components';

import { TextVariants } from '../../types';
import { AppText } from '../AppText';
import { LightButton } from '../LightButton';
import { ModalDropDown } from '../ModalDropDown';
import { Notification } from '../Notification';

interface Notify {
  title: string;
  withButton?: boolean;
  description: string;
  date: string;
  isRead: boolean;
  id: string;
}

type NotificationListProps = {
  isOpen: boolean;
  hasUnreadMessage?: boolean;
  notifications: Array<Notify>;
};

const NotificationList: FC<NotificationListProps> = ({ isOpen, notifications, hasUnreadMessage }) => {
  const handleReadNotify = () => {
    console.log('мы все прочитали');
  };

  const hasNotifications = notifications?.length !== 0;

  return (
    <StyledModalDropDown isOpen={isOpen} isDisableScrollBody={false}>
      <HeadModal>
        <ModalTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
          Уведомления
        </ModalTitle>
        <StyledButton text="Отметить прочитанным" disabled={!hasUnreadMessage} isUnderline onClick={handleReadNotify} />
      </HeadModal>
      {hasNotifications ? (
        <ListContainer>
          {notifications?.map((elem) => (
            <Notification
              isRead={elem.isRead}
              withButton={elem.withButton}
              date={elem.date}
              title={elem.title}
              description={elem.description}
              key={elem.id}
            />
          ))}
        </ListContainer>
      ) : (
        <EmptyContainer>
          <EmptyTitle font="title_22_18_bold" variant={TextVariants.SECONDARY}>
            Уведомлений пока нет
          </EmptyTitle>
          <EmptyDescription font="body_24_16_regular">
            Здесь будут все важные напоминания о платежах и бронированиях.
          </EmptyDescription>
        </EmptyContainer>
      )}
    </StyledModalDropDown>
  );
};

export default NotificationList;

const HeadModal = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 24px 24px 16px 24px;
  align-items: center;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const StyledModalDropDown = styled(ModalDropDown)`
  width: 529px;

  top: auto;
  right: 0;
  bottom: auto;
  left: auto;

  margin-top: 8px;
  box-shadow: 0px 10px 33px rgba(175, 181, 192, 0.18);
`;

const ModalTitle = styled(AppText)``;

const StyledButton = styled(LightButton)`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  height: 40px;
`;

const ListContainer = styled.div`
  height: 440px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme: { colors } }) => colors.greyScale[30]};
    background-clip: content-box;
    border: 5px solid transparent;
    border-radius: 18px;
  }
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  height: 440px;
  width: 100%;
`;

const EmptyTitle = styled(AppText)``;

const EmptyDescription = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[80]};
  max-width: 309px;
  text-align: center;
`;
