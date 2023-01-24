import { MessageModel } from '__generated__/types';
import React, { FC } from 'react';
import SystemMessage from 'services/systemMessage';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

import { HomeRulesMessage } from '../HomeRulesMessage';
import { TextMessage } from '../TextMessage';

type InitialSystemMessageProps = {
  message: MessageModel;
};

const InitialSystemMessage: FC<InitialSystemMessageProps> = ({ message }) => {
  const systemMessage = new SystemMessage({ message }).getSystemMessage();

  return (
    <Root>
      <TextMessage
        messageId={message.id}
        username={message.sender?.firstName || ''}
        avatar={message.sender?.avatarKey || ''}
        date={message.createdAt}
        text={message.contractData?.comment || ''}
        captionText={systemMessage}
      />
      {message.contractData?.rules && <HomeRulesMessage rules={message.contractData?.rules} />}
    </Root>
  );
};

export default InitialSystemMessage;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;
