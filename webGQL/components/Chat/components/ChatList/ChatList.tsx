import { ChatModel, UserChatRole } from '__generated__/types';
import { useGetMyChatsLazyQuery } from 'graphql/queries/Chat/__generated__/getMyChats';
import { useDebounce, useInfinityScroll } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { AppText, SearchInput } from 'ui';

import { ChatPreview } from '../ChatPreview';
import { SkeletonChatList } from './components';

type ChatListProps = {
  searchValue: string;
  setSearchValue: (newSearchValue: string) => void;
  chatRole: UserChatRole;
};

const ChatList: FC<ChatListProps> = ({ chatRole, searchValue, setSearchValue }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.chatList' });
  const debounceSearchValue = useDebounce(searchValue);

  useEffect(() => {
    getChats();
  }, [debounceSearchValue]);

  const [getMyChats, { data: chatsData, loading: isLoadingChats }] = useGetMyChatsLazyQuery();

  const chats = chatsData?.chat__myChats.data || [];
  const afterCursor = chatsData?.chat__myChats.pageInfo?.afterCursor;

  const isEmptyChats = !chatsData?.chat__myChats.data?.length;
  const isSearchEmptySearch = isEmptyChats && !!searchValue;
  const isShowSkeleton = isLoadingChats && isEmptyChats;
  const isLandlord = chatRole === UserChatRole.Landlord;

  const { handleScroll, listRef } = useInfinityScroll({
    getAfterData: () => {
      if (afterCursor) {
        getChats(afterCursor);
      }
    },
    hasAfterMore: !!afterCursor,
    isLoading: isLoadingChats,
  });

  const getChats = (afterCursor?: string) => {
    getMyChats({
      variables: { input: { afterCursor, role: chatRole, filter: searchValue } },
      fetchPolicy: 'cache-and-network',
    });
  };

  const Content = useMemo(
    () =>
      isSearchEmptySearch ? (
        <Wrapper>
          <AppText font="body_20_14_regular">{t('nothingFound')}</AppText>
        </Wrapper>
      ) : (
        <List ref={listRef} onScroll={handleScroll}>
          {chats.map((chat) => (
            <ChatPreview key={chat.id} chat={chat as ChatModel} isLandlord={isLandlord} />
          ))}
        </List>
      ),
    [isSearchEmptySearch, chats],
  );

  return (
    <Root>
      <Header>
        <StyledSearchInput
          placeholder={t('chatInput')}
          isLong
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClearInput={() => setSearchValue('')}
        />
      </Header>
      {isShowSkeleton ? <SkeletonChatList /> : Content}
    </Root>
  );
};

export default ChatList;

const Root = styled.div`
  width: 100%;
  min-height: 480px;
  height: inherit;

  display: flex;
  flex-direction: column;
  align-content: flex-start;

  border-right: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const Header = styled.div`
  width: 100%;
  height: 72px;
  min-height: 72px;

  padding: 0 24px;
  display: flex;
  align-items: center;

  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const List = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  display: grid;
  align-content: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledSearchInput = styled(SearchInput)`
  max-width: 100%;
  height: 40px;
`;
