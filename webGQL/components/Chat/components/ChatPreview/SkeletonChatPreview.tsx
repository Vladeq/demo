import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'ui';

const SkeletonChatPreview = () => {
  return (
    <Root>
      <Skeleton borderRadius={32} width={64} height={64} />
      <Container>
        <UsernameSkeleton borderRadius={20} width="100%" height={14} />
        <MessageContainer>
          <Skeleton borderRadius={17.5} width="100%" maxWidth={135} height={12} isSecondary />
          <Skeleton borderRadius={17.5} width="100%" maxWidth={272} height={12.25} isSecondary />
        </MessageContainer>
        <Skeleton borderRadius={12.5} width="100%" maxWidth={225} height={9} isSecondary />
      </Container>
    </Root>
  );
};

export default SkeletonChatPreview;

const Root = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  height: 122px;

  padding: 16px 24px;

  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

const UsernameSkeleton = styled(Skeleton)`
  margin-bottom: 14px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 5.5px;
  margin-bottom: 18.25px;
`;
