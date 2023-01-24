import { MessageStatus } from '__generated__/types';
import React, { FC } from 'react';
import { Oval as Loader } from 'react-loader-spinner';
import styled, { css, useTheme } from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Message } from 'ui';
import { getFileWeight } from 'utils';

import { Document } from '../../../../../public/svg/components';

type DocumentMessageProps = {
  avatar?: string;
  username: string;
  date: string;
  fileName: string;
  fileWeight?: number;
  status?: MessageStatus;
  messageId: string;
  mediaUrl: string;
};

const DocumentMessage: FC<DocumentMessageProps> = ({ fileWeight, fileName, status, mediaUrl, ...props }) => {
  const { colors } = useTheme();

  const fileWeightString = fileWeight ? getFileWeight(fileWeight) : '';

  const isDocumentLoading = MessageStatus.Waiting === status;

  return (
    <Message status={status} {...props}>
      <Root>
        <DocumentContainer>
          {isDocumentLoading ? (
            <Loader
              width={22}
              height={22}
              strokeWidth={2}
              strokeWidthSecondary={2}
              color={colors.greyScale[60]}
              secondaryColor={colors.greyScale[40]}
            />
          ) : (
            <a href={mediaUrl}>
              <StyledDocument />
            </a>
          )}
        </DocumentContainer>
        <Info>
          <a href={mediaUrl}>
            <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
              {fileName}
            </AppText>
          </a>
          <Caption>{fileWeightString}</Caption>
        </Info>
      </Root>
    </Message>
  );
};

export default DocumentMessage;

const Root = styled.div`
  display: flex;

  align-items: center;
  gap: 16px;
`;

const DocumentContainer = styled.div`
  width: 67px;
  min-width: 67px;
  height: 67px;
  min-height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 12px;
`;

const StyledDocument = styled(Document)`
  width: 24px;
  height: 24px;

  path {
    fill: ${({ theme: { colors } }) => colors.greyScale[60]};
  }
`;

const Info = styled.div`
  width: 100%;
  overflow: hidden;

  height: fit-content;
  display: flex;
  flex-flow: column;
  gap: 8px;

  p {
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Caption = styled.p`
  ${({ theme: { colors, typography } }) =>
    css`
      color: ${colors.greyScale[60]};
      ${typography.caption_16_12_regular}
    `};
`;
