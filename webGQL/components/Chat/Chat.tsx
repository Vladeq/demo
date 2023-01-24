import { UserChatRole } from '__generated__/types';
import { useGetMyChats } from 'graphql/queries/Chat/__generated__/getMyChats';
import { useChatSubscription, useClientSize, useContractSubscription } from 'hooks';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { getQueryFromUrl } from 'utils';

import { ChatBody, EmptyChatBody } from './components';
import { ChatList } from './components/ChatList';

type ChatProps = {
  className?: string;
  chatRole: UserChatRole;
};

const Chat: FC<ChatProps> = ({ className, chatRole }) => {
  const [searchValue, setSearchValue] = useState('');

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  useContractSubscription();
  const { isIncomingMessage } = useChatSubscription(chatRole);
  const { data, loading } = useGetMyChats({
    variables: { input: { role: chatRole, filter: '' } },
    fetchPolicy: 'cache-and-network',
  });

  const { asPath } = useRouter();
  const { chatId } = getQueryFromUrl(asPath);

  const isCurrentChat = !!chatId;
  const isEmptyChat =
    !loading && !data?.chat__myChats.data?.length && !searchValue && !data?.chat__myChats.isChatsExist;
  const isShowChatBody = isCurrentChat && !isEmptyChat;

  const isChatListMobile = !isEmptyChat && !isCurrentChat;
  const isChatBodyMobile = !isEmptyChat && isCurrentChat;

  return (
    <Root $isEmptyChat={isEmptyChat} className={className}>
      {isMobile ? (
        <>
          {isChatListMobile && (
            <ChatList searchValue={searchValue} setSearchValue={setSearchValue} chatRole={chatRole} />
          )}
          {isChatBodyMobile && <ChatBody chatRole={chatRole} isIncomingMessage={isIncomingMessage} chatId={chatId} />}
          {isEmptyChat && <EmptyChatBody isEmptyChat={isEmptyChat} />}
        </>
      ) : (
        <>
          {!isEmptyChat && <ChatList searchValue={searchValue} setSearchValue={setSearchValue} chatRole={chatRole} />}
          {isShowChatBody ? (
            <ChatBody chatRole={chatRole} isIncomingMessage={isIncomingMessage} chatId={chatId} />
          ) : (
            <EmptyChatBody isEmptyChat={isEmptyChat} />
          )}
        </>
      )}
    </Root>
  );
};

export default Chat;

const Root = styled.div<{ $isEmptyChat: boolean }>`
  display: grid;

  width: 100%;
  height: 100%;
  min-height: 480px;

  ${({ $isEmptyChat }) =>
    !$isEmptyChat &&
    css`
      grid-template-columns: 400px 1fr;
    `}
  overflow: hidden;

  border-radius: 32px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ $isEmptyChat }) =>
      !$isEmptyChat &&
      css`
        grid-template-columns: 1fr;
      `}
  }
`;
