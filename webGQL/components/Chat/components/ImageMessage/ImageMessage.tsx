import { MessageStatus } from '__generated__/types';
import Image from 'next/image';
import React, { FC } from 'react';
import { Oval as Loader } from 'react-loader-spinner';
import styled, { useTheme } from 'styled-components';
import { Message } from 'ui';

type ImageMessageProps = {
  avatar?: string;
  username: string;
  status?: MessageStatus;
  image?: string;
  messageId: string;
  date: string;
};

const ImageMessage: FC<ImageMessageProps> = ({ image, status, ...props }) => {
  const { colors } = useTheme();

  const isImageLoading = MessageStatus.Waiting === status;

  return (
    <Message status={status} {...props}>
      <ImageContainer>
        {isImageLoading ? (
          <Loader
            width={22}
            height={22}
            strokeWidth={2}
            strokeWidthSecondary={2}
            color={colors.greyScale[80]}
            secondaryColor={colors.greyScale[0]}
          />
        ) : (
          image && <MessageImage unoptimized layout="fill" src={image} />
        )}
      </ImageContainer>
    </Message>
  );
};

export default ImageMessage;

const ImageContainer = styled.div`
  position: relative;
  width: 232px;
  min-width: 232px;
  height: 155px;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  border-radius: 16px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const MessageImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;
