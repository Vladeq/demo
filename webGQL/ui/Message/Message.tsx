import { MessageStatus } from '__generated__/types';
import { useOptimisticMessageSend } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { FC, ReactNode, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Avatar, LightButton } from 'ui';
import { AvatarSize } from 'ui/Avatar/Avatar';
import { LightButtonSize } from 'ui/LightButton/LightButton';
import { formatDate } from 'utils';

import { Clock, InfoCircleFilled } from '../../../public/svg/components';

type MessageProps = {
  avatar?: string;
  username: string;
  messageId: string;
  date: string;
  status?: MessageStatus;
  children: ReactNode;
};

const Message: FC<MessageProps> = ({ avatar, messageId, status = MessageStatus.Sent, username, date, children }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.message' });
  const formattedValue = formatDate(date, true);

  const isSent = status === MessageStatus.Sent;
  const isFailed = status === MessageStatus.Failed;

  const statusIconMapping = useMemo(
    () => ({
      [MessageStatus.Waiting]: <StyledClock />,
      [MessageStatus.Failed]: <StyledInfoCircleFilled />,
    }),
    [],
  );

  const { resendOptimisticMessage } = useOptimisticMessageSend();

  return (
    <Root>
      <Avatar size={AvatarSize.size40} avatar={avatar} />
      <Container>
        <Info>
          <Username variant={TextVariants.SECONDARY} font="body_20_14_medium">
            {username}
          </Username>
          {isSent ? <Date>{formattedValue}</Date> : <IconContainer>{statusIconMapping[status]}</IconContainer>}
        </Info>
        {children}
        {isFailed && (
          <StyledLightButton
            onClick={() => resendOptimisticMessage(messageId)}
            isUnderline
            text={t('reSend')}
            size={LightButtonSize.SMALL}
          />
        )}
      </Container>
    </Root>
  );
};

export default Message;

const Root = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  gap: 4px;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;

const IconContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Username = styled(AppText)``;

const Date = styled.p`
  ${({ theme: { colors, typography } }) => css`
    margin-bottom: 2px;
    color: ${colors.greyScale[70]};

    ${typography.caption_14_10_medium}
  `}
`;

const StyledClock = styled(Clock)`
  width: 12px;
  height: 12px;
  path {
    fill: ${({ theme: { colors } }) => colors.greyScale[70]};
  }
`;

const StyledInfoCircleFilled = styled(InfoCircleFilled)`
  width: 16px;
  height: 16px;
  path {
    fill: ${({ theme: { colors } }) => colors.additional.red};
  }
`;

const StyledLightButton = styled(LightButton)`
  margin-left: -10px;
  width: fit-content;
`;
