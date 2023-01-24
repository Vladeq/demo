import React from 'react';
import styled from 'styled-components';

const SkeletonChatPreview = () => {
  return (
    <Root>
      <Avatar />
      <Wrapper>
        <Title />
        <Description />
      </Wrapper>
    </Root>
  );
};

export default SkeletonChatPreview;

const Root = styled.div`
  height: 61px;
  max-width: 368px;
  width: 100%;

  padding: 0 38px 0 37px;
  display: flex;
  align-items: center;
  gap: 14px;

  border-radius: 12px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[20]};
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;

  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

const Title = styled.div`
  max-width: 162px;
  width: 100%;
  height: 10px;

  border-radius: 4px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const Description = styled.div`
  width: 100%;
  height: 10px;

  border-radius: 4px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[10]};
`;
