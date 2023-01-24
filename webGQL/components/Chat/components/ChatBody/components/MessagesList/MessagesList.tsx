import { ContractStatus, MessageModel, MessageType, SystemMessageType, UserChatRole } from '__generated__/types';
import {
  DocumentMessage,
  ImageMessage,
  OfferTermsModal,
  SystemMessage,
  TermsMessage,
  TextMessage,
} from 'components/Chat/components';
import { InitialSystemMessage } from 'components/Chat/components/InitialSystemMessage';
import { useMessageMarkAsRead } from 'graphql/mutations/Message/__generated__/MessageMarkAsRead';
import { useGetChatById } from 'graphql/queries/Chat/__generated__/getChatById';
import { useGetChatMessages } from 'graphql/queries/Message/__generated__/getChatMessages';
import { useGetLightMe } from 'graphql/queries/User/__generated__/getLightMe.query';
import { useInfinityScroll, useToggle } from 'hooks';
import { InitialScrollPosition } from 'hooks/useInfinityScroll';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Button } from 'ui';
import { ButtonSize } from 'ui/Button/Button';
import { getQueryFromUrl, patterns } from 'utils';

type MessageListProps = {
  isIncomingMessage: boolean;
  chatRole: UserChatRole;
  setScrollToInitialPosition: (value: { scrollToInitialPosition?: () => void }) => void;
};

const MessagesList: FC<MessageListProps> = ({ setScrollToInitialPosition, chatRole, isIncomingMessage }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.messageList' });
  const { close, open, isOpened } = useToggle();

  const { asPath } = useRouter();
  const query = getQueryFromUrl(asPath);

  const {
    data,
    loading: isLoadingMessages,
    fetchMore,
  } = useGetChatMessages({ variables: { input: { chatId: query.chatId } }, fetchPolicy: 'cache-and-network' });
  const { data: chatData, updateQuery } = useGetChatById({ variables: { input: { id: query.chatId } } });
  const { data: meData } = useGetLightMe();

  const myId = meData?.user__me.id;

  const messages = data?.chat__messages?.data as Array<MessageModel>;
  const beforeCursor = data?.chat__messages?.pageInfo?.beforeCursor;
  const lastMessageId = chatData?.chat__byId.lastMessage?.id;
  const lastMessageSenderId = chatData?.chat__byId?.lastMessage?.sender?.id;
  const advertId = chatData?.chat__byId?.contract.id || '';

  const isContractStatusCreated = chatData?.chat__byId.contract.status === ContractStatus.Created;
  const isContractStatusOffering = chatData?.chat__byId.contract.status === ContractStatus.Offering;
  const isLandlord = chatRole === UserChatRole.Landlord;
  const isShowOfferSendButton = isLandlord && isContractStatusCreated;

  const [markMessageAsReadFetch] = useMessageMarkAsRead();

  const { handleScroll, scrollToInitialPosition, listRef } = useInfinityScroll({
    getBeforeData: () => {
      if (beforeCursor) {
        getMessages(beforeCursor);
      }
    },
    initialScrollPosition: InitialScrollPosition.BOTTOM,
    hasBeforeMore: !!beforeCursor,
    isLoading: isLoadingMessages,
  });

  useEffect(() => {
    setScrollToInitialPosition({ scrollToInitialPosition });
  }, []);

  useEffect(() => {
    markMessageAsRead(lastMessageId, lastMessageSenderId);
  }, [lastMessageId]);

  useEffect(() => {
    scrollToInitialPosition();
  }, [query.chatId]);

  useEffect(() => {
    if (isIncomingMessage) {
      handleCameMessage();
    }
  }, [isIncomingMessage]);

  const updateReadMessages = () => {
    updateQuery((data) => ({ ...data, chat__byId: { ...data.chat__byId, unreadMessageCount: 0 } }));
  };

  const markMessageAsRead = useCallback((lastMessageId?: string, lastMessageSenderId?: string) => {
    const isMyMessage = lastMessageSenderId === myId;

    if (lastMessageId && !isMyMessage) {
      markMessageAsReadFetch({ variables: { input: { id: lastMessageId } } });
      updateReadMessages();
    }
  }, []);

  const handleCameMessage = () => {
    const clientHeight = listRef.current?.clientHeight || 0;
    const scrollHeight = listRef.current?.scrollHeight || 0;
    const scrollTop = listRef.current?.scrollTop || 0;
    if (scrollTop + clientHeight >= scrollHeight - clientHeight) {
      scrollToInitialPosition();
    }
  };

  const getMessages = (beforeCursor?: string) => {
    fetchMore({
      variables: { input: { beforeCursor, chatId: query.chatId } },
    });
  };

  const renderTextMessage = useCallback(
    (message: MessageModel) => (
      <TextMessage
        key={message.id}
        messageId={message.id}
        username={message.sender?.firstName || ''}
        avatar={message.sender?.avatarKey || ''}
        date={message.createdAt}
        text={message.text!}
        status={message.status}
      />
    ),
    [],
  );

  const renderMediaMessage = useCallback((message: MessageModel) => {
    if (message.mediaUrl) {
      const mediaUrl = message.mediaUrl?.split('?')[0] || '';
      const isImage = !!mediaUrl?.match(patterns.image);

      if (isImage) {
        return (
          <ImageMessage
            key={message.id}
            messageId={message.id}
            username={message.sender?.firstName || ''}
            avatar={message.sender?.avatarKey || ''}
            date={message.createdAt}
            status={message.status}
            image={message.mediaUrl}
          />
        );
      }

      return (
        <DocumentMessage
          key={message.id}
          messageId={message.id}
          username={message.sender?.firstName || ''}
          fileWeight={message.mediaWeight || undefined}
          avatar={message.sender?.avatarKey || ''}
          date={message.createdAt}
          status={message.status}
          mediaUrl={message.mediaUrl}
          fileName={message.mediaName || ''}
        />
      );
    }
    return null;
  }, []);

  const renderSystemMessage = useCallback(
    (message: MessageModel, isLastMessage: boolean) => {
      switch (message.systemMessageType) {
        case SystemMessageType.BookingCreated: {
          return <InitialSystemMessage message={message} />;
        }
        case SystemMessageType.OfferSending: {
          return (
            <TermsMessage
              isContractStatusOffering={isContractStatusOffering}
              isLastMessage={isLastMessage}
              myId={myId}
              isLandlord={isLandlord}
              message={message}
              advertId={advertId}
            />
          );
        }
        default: {
          return <SystemMessage myId={myId} isLandlord={isLandlord} message={message} />;
        }
      }
    },
    [myId, isContractStatusOffering, advertId],
  );

  const messageMapping = useMemo(
    () => ({
      [MessageType.Text]: renderTextMessage,
      [MessageType.Media]: renderMediaMessage,
      [MessageType.System]: renderSystemMessage,
    }),
    [advertId],
  );

  const messagesList = useMemo(() => {
    return messages?.map((message, index, messages) => {
      if (message.type) {
        const isLastMessage = index === messages.length - 1;

        return messageMapping[message.type](message, isLastMessage);
      }
      return null;
    });
  }, [messages, advertId]);

  return (
    <Root>
      <List ref={listRef} onScroll={handleScroll}>
        {messagesList}
      </List>
      {isShowOfferSendButton && <StyledButton onClick={open} size={ButtonSize.SMALL} text={t('sendOfferTerms')} />}
      {chatData && <OfferTermsModal chat={chatData?.chat__byId} isVisible={isOpened} onClose={close} isBottomMobile />}
    </Root>
  );
};

export default MessagesList;

const Root = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;

  padding: 0 24px;
  gap: 24px;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0 16px;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;

  padding: 24px 0;

  overflow-y: scroll;
  overflow-x: hidden;
  align-items: flex-start;
  gap: 21px;
`;

const StyledButton = styled(Button)`
  min-height: 32px;
  margin-bottom: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;
