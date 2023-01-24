import { MessageStatus } from '__generated__/types';
import React, { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Message } from 'ui';

type TextMessageProps = {
  avatar?: string;
  username: string;
  status?: MessageStatus;
  text: string;
  captionText?: string;
  messageId: string;
  date: string;
};

const TextMessage: FC<TextMessageProps> = ({ text, captionText, ...props }) => {
  return (
    <Message {...props}>
      {captionText && (
        <CaptionText variant={TextVariants.SECONDARY} font="body_20_14_regular">
          {captionText}
        </CaptionText>
      )}
      <MessageText variant={TextVariants.SECONDARY} font="body_20_14_regular">
        {text}
      </MessageText>
    </Message>
  );
};

export default TextMessage;

const MessageText = styled(AppText)`
  max-width: 100%;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
`;

const CaptionText = styled(AppText)`
  max-width: 100%;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;

  margin-bottom: 4px;

  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
