import { ApartmentRentPeriodType, UserChatRole } from '__generated__/types';
import { useGetChatById } from 'graphql/queries/Chat/__generated__/getChatById';
import { useGetLightMe } from 'graphql/queries/User/__generated__/getLightMe.query';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

import { ChatTextarea } from '../ChatTextarea';
import { HeaderCard } from '../HeaderCard';
import { ChatHeader, MessagesList } from './components';

type ChatBodyProps = {
  chatId: string;
  isIncomingMessage: boolean;
  chatRole: UserChatRole;
};

const ChatBody: FC<ChatBodyProps> = ({ chatId, chatRole, isIncomingMessage }) => {
  const [scrollToInitialPosition, setScrollToInitialPosition] = useState<{ scrollToInitialPosition?: () => void }>({});
  const { data, loading } = useGetChatById({ variables: { input: { id: chatId } } });
  const { data: meData } = useGetLightMe();

  const chat = data?.chat__byId;
  const apartmentAd = chat?.contract.apartmentAd;
  const isShowHeaderCard = !loading && apartmentAd;

  const myId = meData?.user__me.id;

  const { title, address } = chat?.contract?.baseApartmentAdData || {};

  const { numberOfAdult = 0, numberOfChildren = 0, numberOfPets = 0 } = chat?.contract.guests || {};
  const numberOfGuests = numberOfAdult + numberOfChildren + numberOfPets;

  const companion = chat?.members.find((member) => member.id !== myId);
  const isLongTerm = chat?.contract.apartmentRentPeriodType === ApartmentRentPeriodType.LongTerm;
  const id = isLongTerm ? chat?.apartmentAdIds.longTermRentId : chat?.apartmentAdIds.shortTermRentId;

  const isNotChatActive = chat && !chat?.isActive;
  const isChatDisabled = isNotChatActive;

  return (
    <Root>
      <ChatHeader username={companion?.firstName} companionId={companion?.id || ''} />
      {isShowHeaderCard && (
        <HeaderCard
          image={chat?.apartmentAdPhotos?.[0].fileKey}
          name={title}
          numberOfGuests={numberOfGuests}
          price={chat?.contract?.cost || ''}
          numberOfRooms={apartmentAd?.details?.numberOfRooms}
          rentPeriodType={chat.contract.apartmentRentPeriodType}
          city={address?.city}
          houseNumber={address?.houseNumber}
          street={address?.street}
          id={id || ''}
          type={chat.contract.apartmentRentPeriodType}
        />
      )}
      <MessagesList
        chatRole={chatRole}
        isIncomingMessage={isIncomingMessage}
        setScrollToInitialPosition={setScrollToInitialPosition}
      />
      <TextareaContainer>
        <ChatTextarea
          disabled={isChatDisabled}
          scrollToInitialPosition={scrollToInitialPosition.scrollToInitialPosition}
        />
      </TextareaContainer>
    </Root>
  );
};

export default ChatBody;

const Root = styled.div`
  width: 100%;
  height: inherit;
  min-height: 480px;

  display: grid;
  grid-template-rows: auto auto 1fr auto;
`;

const TextareaContainer = styled.div`
  width: 100%;
  height: fit-content;
  align-self: flex-end;

  padding: 16px 24px;
  border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 16px;
  }
`;
