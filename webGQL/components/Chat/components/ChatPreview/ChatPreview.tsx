import { ApartmentRentPeriodType, ChatModel, MessageModel, MessageType } from '__generated__/types';
import { useGetLightMe } from 'graphql/queries/User/__generated__/getLightMe.query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import SystemMessage from 'services/systemMessage';
import styled, { css } from 'styled-components';
import { hideText } from 'styles/components/text';
import { TextVariants } from 'types';
import { AppText, Avatar } from 'ui';
import { getQueryFromUrl, numberCircumcision, patterns } from 'utils';

import { Tick } from '../../../../../public/svg/components';

type ChatPreviewProps = {
  chat: ChatModel;
  isLandlord: boolean;
};

const ChatPreview: FC<ChatPreviewProps> = ({ chat, isLandlord }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat' });
  const { asPath, ...router } = useRouter();
  const { data } = useGetLightMe({ fetchPolicy: 'cache-only' });
  const myId = data?.user__me.id;

  const query = getQueryFromUrl(asPath);

  const periodMapping = useMemo(
    () => ({
      [ApartmentRentPeriodType.LongTerm]: t('longTerm'),
      [ApartmentRentPeriodType.ShortTerm]: t('shortTerm'),
    }),
    [t],
  );

  const isActive = query.chatId === chat.id;
  const captionText = `${periodMapping[chat.contract.apartmentRentPeriodType]} · ${
    chat.contract.baseApartmentAdData.title
  }`;
  const companion = chat.members.find((user) => user.id !== myId)!;
  const isUnreadMessageCount = !!chat.unreadMessageCount;

  const selectChat = () => {
    router.push(router.pathname, { query: { ...query, chatId: chat.id } }, { shallow: true });
  };

  const renderLastMessage = () => {
    if (chat.lastMessage?.type === MessageType.Text) {
      return renderMessageWithSender(chat.lastMessage, chat.lastMessage?.text || '');
    }
    if (chat.lastMessage?.type === MessageType.Media) {
      return renderLastMediaMessage(chat.lastMessage);
    }
    if (chat.lastMessage?.type === MessageType.System) {
      return renderSystemMessage(chat.lastMessage, myId, isLandlord);
    }
  };

  const renderLastMediaMessage = (lastMessage: MessageModel): string => {
    const mediaUrl = lastMessage?.mediaUrl?.split('?')[0] || '';
    const isImage = !!mediaUrl?.match(patterns.image);

    if (isImage) {
      return renderMessageWithSender(lastMessage, t('lastMessage.photo'));
    }
    return renderMessageWithSender(lastMessage, t('lastMessage.document'));
  };

  const renderMessageWithSender = (lastMessage: MessageModel, message: string): string => {
    const isMyMessage = lastMessage?.sender?.id === myId;
    const lastMessageText = isMyMessage ? `${t('lastMessage.you')} ${message}` : message;

    return lastMessageText;
  };

  const renderSystemMessage = (message: MessageModel, myId?: string, isLandlord?: boolean) => {
    const systemMessage = new SystemMessage({ message, myId, isLandlord }).getSystemMessage();
    const [title] = systemMessage.split('/');

    return title;
  };

  const lastMessage = renderLastMessage();

  return (
    <Root onClick={selectChat} $isActive={isActive}>
      <Avatar avatar={companion.avatarKey || undefined} />
      <InfoContainer>
        <UsernameContainer>
          <Username font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {companion.firstName}
          </Username>
          {companion.isIdentityApproved && <StyledTick />}
        </UsernameContainer>
        <Message font="body_20_14_regular">{lastMessage}</Message>
        <Caption>{captionText}</Caption>
      </InfoContainer>
      {isUnreadMessageCount && <MessageLabel>{numberCircumcision(chat.unreadMessageCount)}</MessageLabel>}
    </Root>
  );
};

export default ChatPreview;

const Root = styled.button<{ $isActive: boolean }>`
  ${({ theme: { colors }, $isActive }) => css`
    display: flex;
    width: 100%;
    min-height: 122px;
    position: relative;

    padding: 16px 24px;
    gap: 16px;
    align-items: flex-start;

    border-bottom: 1px solid ${colors.greyScale[30]};
    background: ${$isActive ? `linear-gradient(${colors.gradient.default})` : colors.greyScale[0]};

    :hover {
      background: ${colors.greyScale[30]};
    }
  `}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
`;

const Username = styled(AppText)`
  text-align: start;
`;

const UsernameContainer = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
  max-width: 200px;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledTick = styled(Tick)`
  width: 12px;
  min-width: 12px;
  height: 12px;
  min-height: 12px;

  margin: 6px 0;
`;

const MessageLabel = styled.span`
  ${({ theme: { colors, typography } }) => css`
    display: flex;
    position: absolute;
    height: 20px;
    top: 18px;
    right: 24px;

    padding: 0 8px;
    justify-content: center;
    align-items: center;

    border-radius: 32px;

    background-color: ${colors.greyScale[100]};
    color: ${colors.greyScale[0]};
    ${typography.body_20_14_medium};
  `}
`;

const Message = styled(AppText)`
  margin-bottom: 4px;
  min-height: 40px;

  text-align: start;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  ${hideText(2)}
`;

const Caption = styled.p`
  ${({ theme: { colors, typography } }) => css`
    text-align: start;

    ${hideText(1)}
    color: ${colors.greyScale[60]};
    ${typography.caption_14_10_regular};
  `}
`;
