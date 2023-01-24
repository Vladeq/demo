import { MessageStatus, MessageType } from '__generated__/types';
import { useApolloClient } from '@apollo/client';
import { useMessageSend } from 'graphql/mutations/Message/__generated__/messageSend';
import {
  GetChatMessages,
  GetChatMessagesDocument,
  GetChatMessagesVariables,
} from 'graphql/queries/Message/__generated__/getChatMessages';
import { useGetFullMe } from 'graphql/queries/User/__generated__/getFullMe.query';
import { useRouter } from 'next/router';
import { FileCategory } from 'pagesComponents/HouseMedias/types';
import aws from 'services/aws';
import { getQueryFromUrl } from 'utils';
import { v4 } from 'uuid';

type ChatMessagesType = NonNullable<GetChatMessages['chat__messages']['data']>;
type ChatMessageType = ChatMessagesType['0'];

type CreateOptimisticMessageDto = {
  text?: string;
  mediaName?: string;
  mediaUrl?: string;
  type: MessageType;
  mediaWeight?: number;
};

const useOptimisticMessageSend = () => {
  const { cache } = useApolloClient();

  const { asPath } = useRouter();
  const query = getQueryFromUrl(asPath);
  const { chatId } = query;

  const { data } = useGetFullMe();
  const [sendMessage] = useMessageSend();

  const sendOptimisticMessage = async (message: string, scrollToInitialPosition?: () => void) => {
    const optimisticMessage = createOptimisticMessage({ text: message, type: MessageType.Text });

    addOptimisticMessageInCache(optimisticMessage);

    setTimeout(() => scrollToInitialPosition?.(), 0);

    await sendMessageRequest(optimisticMessage);
  };

  const sendOptimisticMediaMessage = async (file: File, scrollToInitialPosition?: () => void) => {
    const mediaUrl = await aws.getSignedUrl({ fileName: file.name, fileCategory: FileCategory.CHAT_MEDIA, chatId });

    const optimisticMessage = createOptimisticMessage({
      mediaUrl,
      mediaName: file.name,
      mediaWeight: file.size,
      type: MessageType.Media,
    });
    addOptimisticMessageInCache(optimisticMessage);

    setTimeout(() => scrollToInitialPosition?.(), 500);

    await aws.loadToBucket(mediaUrl, file);

    sendMessageRequest(optimisticMessage);
  };

  const resendOptimisticMessage = async (messageId: string) => {
    const optimisticMessage = getMessageFromCache(messageId);

    if (optimisticMessage) {
      addOptimisticMessageInCache(optimisticMessage);

      await sendMessageRequest(optimisticMessage);
    }
  };

  const createOptimisticMessage = ({ mediaUrl, text, type, mediaName, mediaWeight }: CreateOptimisticMessageDto) => {
    const messageId = v4();

    const optimisticMessage = {
      id: messageId,
      createdAt: new Date().toString(),
      sender: {
        firstName: data?.user__me.firstName || '',
        id: data?.user__me.id || '',
        avatarKey: data?.user__me.avatarKey,
        __typename: 'UserModel',
      },
      contractData: null,
      systemMessageType: null,
      mediaUrl: mediaUrl || null,
      chatId,
      mediaWeight: mediaWeight || null,
      text: text || null,
      type,
      mediaName: mediaName || null,
      status: MessageStatus.Waiting,
      __typename: 'MessageModel',
    };

    return optimisticMessage as ChatMessageType;
  };

  const addOptimisticMessageInCache = (optimisticMessage: ChatMessageType, status?: MessageStatus) => {
    const messagesExisting = cache.readQuery<GetChatMessages, GetChatMessagesVariables>({
      query: GetChatMessagesDocument,
      variables: { input: { chatId } },
    });

    const messagesExistingData = messagesExisting?.chat__messages.data || [];
    const isMessage = !!messagesExistingData.find((message) => message.id === optimisticMessage.id);

    if (isMessage) {
      changeMessageStatusInCache(optimisticMessage.id, status || MessageStatus.Waiting);
    } else {
      const incomingData = [...messagesExistingData, optimisticMessage].reverse();

      updateMessagesInCache(messagesExisting, incomingData);
    }
  };

  const sendMessageRequest = async (optimisticMessage: ChatMessageType) => {
    try {
      const { data } = await sendMessage({
        variables: {
          input: {
            chatId: optimisticMessage.chatId,
            id: optimisticMessage.id,
            type: optimisticMessage.type,
            text: optimisticMessage.text,
            mediaUrl: optimisticMessage.mediaUrl,
            mediaWeight: optimisticMessage.mediaWeight,
            mediaName: optimisticMessage.mediaName,
          },
        },
      });

      changeMessageStatusInCache(
        optimisticMessage.id,
        MessageStatus.Sent,
        data?.message__send?.message?.mediaUrl || '',
      );
    } catch (error) {
      changeMessageStatusInCache(optimisticMessage.id, MessageStatus.Failed);
    }
  };

  const changeMessageStatusInCache = (messageId: string, status: MessageStatus, mediaUrl?: string) => {
    const messagesExisting = cache.readQuery<GetChatMessages, GetChatMessagesVariables>({
      query: GetChatMessagesDocument,
      variables: { input: { chatId } },
    });

    const incomingData = (
      messagesExisting?.chat__messages.data?.map((message) =>
        message.id === messageId ? { ...message, status, mediaUrl } : message,
      ) || []
    ).reverse();

    updateMessagesInCache(messagesExisting, incomingData);
  };

  const updateMessagesInCache = (messagesExisting: GetChatMessages | null, incomingData: ChatMessagesType) => {
    cache.writeQuery<GetChatMessages, GetChatMessagesVariables>({
      query: GetChatMessagesDocument,
      variables: { input: { chatId } },
      data: {
        ...messagesExisting,
        chat__messages: {
          ...messagesExisting?.chat__messages,
          data: incomingData,
          pageInfo: {
            count: 1,
            perPage: 0,
            beforeCursor: null,
            ...messagesExisting?.chat__messages.pageInfo,
            __typename: 'PageBeforeCursorInfo',
          },
          __typename: 'MessagePayload',
        },
        __typename: 'Query',
      },
      overwrite: true,
    });
  };

  const getMessageFromCache = (messageId: string) => {
    const messagesExisting = cache.readQuery<GetChatMessages, GetChatMessagesVariables>({
      query: GetChatMessagesDocument,
      variables: { input: { chatId } },
    });

    const message = messagesExisting?.chat__messages.data?.find((message) => message.id === messageId) || null;

    return message;
  };

  return { sendOptimisticMessage, sendOptimisticMediaMessage, resendOptimisticMessage, addOptimisticMessageInCache };
};

export default useOptimisticMessageSend;
