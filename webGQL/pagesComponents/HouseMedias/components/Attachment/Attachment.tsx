import { useClientSize, useLoadFile } from 'hooks';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect } from 'react';
import { Oval as Loader } from 'react-loader-spinner';
import styled, { useTheme } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, Tooltip } from 'ui';
import { getCookie } from 'utils';

import { DeleteBig, InfoCircleError, RefreshCircle } from '../../../../../public/svg/components';
import { TooltipHorizontalPositionEnum, TooltipPositionEnum } from '../../../../ui/Tooltip/Tooltip';
import { AttachmentTypes, FileCategory, FileTypes } from '../../types';

type AttachmentTypesProps = {
  id: string;
  fileKey: string;
  changeFile: (e: AttachmentTypes) => void;
  category: string;
  onSetFiles: (e: Array<AttachmentTypes>) => void;
  deleteAttachment: (id: string) => void;
  file: FileTypes;
  isLoaded: boolean;
  url: string;
};

const Attachment: FC<AttachmentTypesProps> = ({
  file,
  id,
  changeFile,
  isLoaded = false,
  url,
  category,
  deleteAttachment: deleteFromArray,
}) => {
  const { load, attachment, toggleLoadingForAttachment, deleteAttachment } = useLoadFile(
    FileCategory.APARTMENT_AD_MEDIA,
  );
  const advertId = getCookie('advertId');
  const { colors } = useTheme();
  const controller = new AbortController();
  const { getIsBreakpoint } = useClientSize();
  const { t } = useTranslation('houseMediasPage', { keyPrefix: 'attachment' });

  const loadFile = async (
    file: File,
    fileCategory: string,
    id: string,
    signal = {} as AbortSignal,
    advertId: string = '',
  ) => {
    try {
      toggleLoadingForAttachment();
      const res = await load(file, FileCategory.APARTMENT_AD_MEDIA, id, signal, advertId);
      changeFile(res);
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const reloadFile = async (id: string, file: File) => {
    toggleLoadingForAttachment();
    await loadFile(file, FileCategory.APARTMENT_AD_MEDIA, id, controller.signal, advertId);
  };

  const deleteFileFromBucket = async () => {
    toggleLoadingForAttachment();
    controller.abort();
    deleteFromArray(id);
    if (attachment?.fileKey) {
      await deleteAttachment(attachment?.fileKey!);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      loadFile(file, category, id, controller.signal, advertId);
    }
  }, []);

  const isWidthSm = getIsBreakpoint('sm');
  const errorText = isWidthSm ? t('shortErrorText') : t('longErrorText');

  if (attachment?.isError) {
    return (
      <StyledAttachmentWrapper>
        <DocumentWrapper>
          <DocumentContainer $isError={attachment?.isError}>
            <InfoCircleError />
          </DocumentContainer>
        </DocumentWrapper>
        <IconContainer>
          <StyledTooltip
            text={t('repeatDownload')}
            horizontalPosition={TooltipHorizontalPositionEnum.END}
            position={TooltipPositionEnum.BOTTOM}>
            <StyledRefreshIcon onClick={() => reloadFile(attachment.id, attachment.file)} />
          </StyledTooltip>
          <StyledDeleteIcon onClick={deleteFileFromBucket} />
        </IconContainer>
        <Error font="caption_16_12_regular">{errorText}</Error>
      </StyledAttachmentWrapper>
    );
  }

  return (
    <AttachmentWrapper>
      {(!attachment || attachment?.isLoading) && !isLoaded ? (
        <DocumentWrapper>
          <DocumentContainer>
            <Loader
              width={22}
              height={22}
              strokeWidth={2}
              strokeWidthSecondary={2}
              color={colors.greyScale[60]}
              secondaryColor={colors.greyScale[40]}
            />
          </DocumentContainer>
        </DocumentWrapper>
      ) : (
        <ImageContainer>{url && <StyledImage src={url} layout="fill" />}</ImageContainer>
      )}
      <IconContainer>
        <StyledDeleteIcon onClick={deleteFileFromBucket} />
      </IconContainer>
    </AttachmentWrapper>
  );
};

export default Attachment;

const DocumentContainer = styled.div<{ $isError?: boolean }>`
  width: 232px;
  height: 155px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ theme: { colors }, $isError }) => ($isError ? `1px solid${colors.additional.red}` : 'none')};
  background: ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 12px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 167.5px;
  }
`;

const AttachmentWrapper = styled.div`
  position: relative;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 167px;
    height: 155px;
  }
`;

const StyledAttachmentWrapper = styled(AttachmentWrapper)`
  margin-bottom: 18px;
`;

const DocumentWrapper = styled.div``;

const ImageContainer = styled.div`
  width: 232px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 155px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 167px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
`;

const StyledDeleteIcon = styled(DeleteBig)`
  cursor: pointer;
`;

const StyledRefreshIcon = styled(RefreshCircle)`
  cursor: pointer;
`;

const Error = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.additional.red};
`;

const StyledTooltip = styled(Tooltip)`
  width: 139px;
  margin-bottom: -36px;
`;
