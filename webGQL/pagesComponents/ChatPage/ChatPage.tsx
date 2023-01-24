import { UserChatRole } from '__generated__/types';
import { Chat } from 'components';
import { MainLayout } from 'layouts';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

const ChatPage = () => {
  const { t } = useTranslation('chatPage');

  return (
    <StyledMainLayout isSecondaryBackground isSecondaryHeader headTitle={t('headTitle')}>
      <StyledChat chatRole={UserChatRole.Tenant} />
    </StyledMainLayout>
  );
};

export default ChatPage;

const StyledMainLayout = styled(MainLayout)`
  padding: 40px 73px;
  padding-top: 0;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 0;
    padding-top: 0;
  }

  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 0 0 16px 0;
  }
`;

const StyledChat = styled(Chat)`
  height: calc(100vh - 80px - 40px);
`;
