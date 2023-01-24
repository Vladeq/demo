import fileSize from 'filesize';
import { useLoadFile } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FileCategory } from 'pagesComponents/HouseMedias/types';
import { FC, useEffect } from 'react';
import { Oval as Loader } from 'react-loader-spinner';
import styled, { css, useTheme } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, LightButton } from 'ui';
import { LightButtonSize } from 'ui/LightButton/LightButton';

import { Document, InfoCircle } from '../../../../../public/svg/components';
import { AttachmentTypes, FileTypes } from '../../types';

type AttachmentProps = {
  id: string;
  advertId: string;
  fileCategory: FileCategory;
  hasNeedLoad: boolean;
  file: FileTypes;
  changeFile: (e: AttachmentTypes) => void;
  handleDeleteAttachment: (id: string) => void;
  onSetFiles: (e: Array<AttachmentTypes>) => void;
};

export const Attachment: FC<AttachmentProps> = ({
  id,
  advertId,
  hasNeedLoad,
  file,
  changeFile,
  handleDeleteAttachment,
  fileCategory,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation('profilePage', { keyPrefix: 'security' });
  const { load, attachment, toggleLoadingForAttachment, deleteAttachment } = useLoadFile(fileCategory);
  const controller = new AbortController();
  const size = fileSize.partial({ base: 2, standard: 'jedec' });

  const handleReloadFile = async (id: string, file: File) => {
    toggleLoadingForAttachment();
    await loadFile(file, fileCategory, id, controller.signal, advertId);
  };

  const renderDocumentIcon = () => {
    return <>{attachment?.isError ? <StyledInfoCircle /> : <StyledDocument />}</>;
  };

  const deleteFileFromBucket = async () => {
    controller.abort();
    handleDeleteAttachment(id);
    if (attachment?.fileKey) {
      await deleteAttachment(attachment?.fileKey!);
    }
  };

  const loadFile = async (
    file: File,
    fileCategory: FileCategory,
    id: string,
    signal = {} as AbortSignal,
    advertId: string = '',
  ) => {
    try {
      toggleLoadingForAttachment();
      const res = await load(file, fileCategory, id, signal, advertId);
      changeFile(res);
    } catch (e) {
      console.log(e, 'error');
    }
  };

  useEffect(() => {
    if (hasNeedLoad) {
      loadFile(file, fileCategory, id, controller.signal, advertId);
    }
  }, []);

  const hasLoader = hasNeedLoad && (!attachment || attachment?.isLoading);
  const hasError = !attachment?.isLoading && attachment?.isError;

  return (
    <Root>
      <Container>
        <AttachmentContainer $isError={attachment?.isError && !attachment?.isLoading}>
          {hasLoader ? (
            <Loader
              width={22}
              height={22}
              strokeWidth={2}
              strokeWidthSecondary={2}
              color={colors.greyScale[60]}
              secondaryColor={colors.greyScale[40]}
            />
          ) : (
            renderDocumentIcon()
          )}
        </AttachmentContainer>
        <Info>
          <Filename font="body_20_14_medium" variant={TextVariants.SECONDARY}>
            {file.name}
          </Filename>
          {hasError ? (
            <Error font="caption_16_12_regular">{t('identifyLoadError')}</Error>
          ) : (
            <Caption>{size(file.size)}</Caption>
          )}
        </Info>
      </Container>
      {hasLoader && (
        <Buttons>
          <StyledLightButton
            text={t('identifyCancel')}
            isUnderline
            size={LightButtonSize.NORMAL}
            onClick={deleteFileFromBucket}
          />
        </Buttons>
      )}
      {!hasLoader && (
        <Buttons>
          {hasError && (
            <StyledLightButton
              text={t('identifyReloadFile')}
              isUnderline
              size={LightButtonSize.NORMAL}
              onClick={() => handleReloadFile(attachment.id, file)}
            />
          )}
          <StyledLightButton
            text={t('identifyDeleteFile')}
            isUnderline
            size={LightButtonSize.NORMAL}
            onClick={deleteFileFromBucket}
          />
        </Buttons>
      )}
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.div`
  flex-direction: row;
  column-gap: 16px;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;
  align-items: center;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    column-gap: 0;
  }
`;

const AttachmentContainer = styled.div<{ $isError?: boolean }>`
  display: flex;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  background: ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 12px;
  border: ${({ theme: { colors }, $isError }) => ($isError ? `1px solid ${colors.additional.red}` : 'none')};
  @media (min-width: ${BreakpointsEnum.sm}px) {
    width: 67px;
    height: 67px;
  }
`;

const StyledDocument = styled(Document)`
  width: 24px;
  height: 24px;
  path {
    fill: ${({ theme: { colors } }) => colors.greyScale[60]};
  }
`;

const Info = styled.div`
  height: fit-content;
  display: flex;
  flex-flow: column;
  row-gap: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 5px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    row-gap: 8px;
    margin-right: 0;
  }
`;

const Filename = styled(AppText)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Caption = styled.p`
  ${({ theme: { colors, typography } }) =>
    css`
      color: ${colors.greyScale[60]};
      ${typography.caption_14_10_regular}
    `};
  white-space: normal;
  word-break: break-all;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.caption_16_12_regular};
  }
`;

const StyledLightButton = styled(LightButton)`
  ${({ theme: { typography } }) => typography.body_24_14_medium}
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
    :hover {
      background: none;
    }
  }
`;

const Error = styled(AppText)`
  white-space: normal;
  ${({ theme: { colors, typography } }) =>
    css`
      color: ${colors.additional.red};
      ${typography.caption_14_10_regular}
    `};
  @media (min-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.caption_16_12_regular};
  }
`;

const StyledInfoCircle = styled(InfoCircle)`
  transform: scale(1.5);
  path {
    fill: ${({ theme: { colors } }) => colors.additional.red};
  }
`;
