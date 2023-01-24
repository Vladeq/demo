import { MessageStatus, MessageType, UserChatRole } from '__generated__/types';
import { OnSubscriptionDataOptions, useApolloClient } from '@apollo/client';
import { useGetChatByIdLazyQuery } from 'graphql/queries/Chat/__generated__/getChatById';
import { GetMyChats, GetMyChatsDocument, GetMyChatsVariables } from 'graphql/queries/Chat/__generated__/getMyChats';
import { useGetFullMe } from 'graphql/queries/User/__generated__/getFullMe.query';
import { NewMessage, useNewMessage } from 'graphql/subscription/Message/__generated__/new-message';
import useOptimisticMessageSend from 'hooks/useOptimisticMessageSend';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQueryFromUrl } from 'utils';

type ChatsType = NonNullable<GetMyChats['chat__myChats']['data']>;

const useChatSubscription = (chatRole: UserChatRole) => {
  const [isIncomingMessage, setIsIncomingMessage] = useState(false);

  const { asPath } = useRouter();
  const { chatId } = getQueryFromUrl(asPath);

  const { cache } = useApolloClient();

  const { data: userData } = useGetFullMe();
  const [getChatById] = useGetChatByIdLazyQuery();
  const { addOptimisticMessageInCache } = useOptimisticMessageSend();

  const onCameMessage = () => {
    if (isIncomingMessage) {
      setIsIncomingMessage(false);
    }
  };
  const onComingMessage = () => {
    if (!isIncomingMessage) {
      setIsIncomingMessage(true);
    }
  };

  useEffect(onCameMessage, [isIncomingMessage]);

  const updateChatsInCache = (chatsExisting: GetMyChats | null, incomingData: ChatsType) => {
    cache.writeQuery<GetMyChats, GetMyChatsVariables>({
      query: GetMyChatsDocument,
      variables: { input: { role: chatRole, filter: '' } },
      data: {
        ...chatsExisting,
        chat__myChats: {
          ...chatsExisting?.chat__myChats,
          data: incomingData,
          isChatsExist: true,
          pageInfo: {
            count: 1,
            perPage: 0,
            afterCursor: null,
            ...chatsExisting?.chat__myChats.pageInfo,
            __typename: 'PageAfterCursorInfo',
          },
          __typename: 'ChatPaginationResponse',
        },
        __typename: 'Query',
      },
      overwrite: true,
    });
  };

  const addNewMessageToChatInCache = async (
    newMessage: NewMessage['newMessage'],
    isAddUnreadMessageCount?: boolean,
  ) => {
    const chatsExisting = cache.readQuery<GetMyChats, GetMyChatsVariables>({
      query: GetMyChatsDocument,
      variables: { input: { role: chatRole, filter: '' } },
    });

    const chatsExistingData = chatsExisting?.chat__myChats.data || [];

    const chat = chatsExistingData.find((chat) => chat.id === newMessage.chatId);

    const oldUnreadMessageCount = chat?.unreadMessageCount || 0;
    const unreadMessageCount = isAddUnreadMessageCount ? oldUnreadMessageCount + 1 : 0;

    if (chat) {
      const filteredChatsExistingData = chatsExistingData.filter((chat) => chat.id !== newMessage.chatId);
      const incomingData = [{ ...chat, lastMessage: newMessage, unreadMessageCount }, ...filteredChatsExistingData];

      updateChatsInCache(chatsExisting, incomingData);
    } else {
      const { data } = await getChatById({ variables: { input: { id: newMessage.chatId } } });

      const incomingData = [data?.chat__byId, ...chatsExistingData] as ChatsType;
      updateChatsInCache(chatsExisting, incomingData);
    }
  };

  const onSubscriptionData = ({ subscriptionData }: OnSubscriptionDataOptions<NewMessage>) => {
    const newMessage = subscriptionData.data?.newMessage;
    const isCurrentChat = chatId === newMessage?.chatId;
    const isSystemMessage = newMessage?.type === MessageType.System;
    const isMyMessage = userData?.user__me.id === newMessage?.sender?.id && !isSystemMessage;
    const canAddMessageToList = isCurrentChat && !isMyMessage && newMessage;
    const isAddUnreadMessageCount = !isCurrentChat && !isMyMessage;

    if (newMessage) {
      addNewMessageToChatInCache(newMessage, isAddUnreadMessageCount);
    }

    if (canAddMessageToList) {
      addOptimisticMessageInCache(newMessage, MessageStatus.Sent);
      setTimeout(onComingMessage, 0);
    }
  };

  useNewMessage({
    onSubscriptionData,
    variables: { userChatRole: chatRole },
  });

  return { isIncomingMessage };
};

export default useChatSubscription;
