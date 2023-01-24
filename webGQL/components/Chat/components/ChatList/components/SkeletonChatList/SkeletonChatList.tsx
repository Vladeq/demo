import { SkeletonChatPreview } from 'components/Chat/components/ChatPreview';
import React from 'react';
import styled from 'styled-components';

const SkeletonChatList = () => {
  const chats = new Array(10).fill(null);

  return (
    <Root>
      {chats.map((_, index) => (
        <SkeletonChatPreview key={index} />
      ))}
    </Root>
  );
};

export default SkeletonChatList;

const Root = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  display: grid;
  align-items: flex-start;
`;
