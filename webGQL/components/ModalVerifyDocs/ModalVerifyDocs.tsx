import { useSetOwnershipDocs } from 'graphql/mutations/Advert/__generated__/setOwnershipDocs.mutation';
import { useSetIdentityDocuments } from 'graphql/mutations/User/__generated__/setIdentityDocuments.mutation';
import { useTranslation } from 'next-i18next';
import { FileCategory } from 'pagesComponents/HouseMedias/types';
import { FC, useCallback, useState } from 'react';
import { notify } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, Button, Dropzone } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { Attachment } from './components';
import { AttachmentTypes } from './types';

type ModalVerifyDocsProps = {
  typeDocs: FileCategory;
  apartmentAd?: string;
  content?: string;
  onSaveClick: () => void;
  maxSize?: number;
  maxFiles?: number;
};

export const ModalVerifyDocs: FC<ModalVerifyDocsProps> = ({
  apartmentAd,
  onSaveClick,
  content,
  typeDocs,
  maxSize,
  maxFiles,
}) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'security' });
  const { t: tDropZone } = useTranslation('ui', { keyPrefix: 'dropzone' });
  const [attachments, setAttachments] = useState<Array<AttachmentTypes>>([]);
  const [isDropzoneVisible, setIsDropzoneVisible] = useState(true);
  const [fetchOwnershipDocs, { loading: OwnershipDocsLoading }] = useSetOwnershipDocs();
  const [fetchIdentityDocs, { loading: IdentityDocsLoading }] = useSetIdentityDocuments();

  const handleSetFiles = (newFiles: Array<AttachmentTypes>) => {
    if (newFiles.length > 0) {
      setIsDropzoneVisible((prev) => !prev);
    }
    setAttachments((state) => [...state, ...newFiles]);
  };

  const handleDeleteAttachment = (id: string) => {
    const filteredFiles = attachments.filter((attachment) => attachment.id !== id);
    setAttachments(filteredFiles);
    setIsDropzoneVisible(filteredFiles.length === 0);
  };

  const handleLoadMore = () => {
    setIsDropzoneVisible((prev) => !prev);
  };

  const handleChangesFile = useCallback((newFile: AttachmentTypes) => {
    setAttachments((state) =>
      [...state].map((elem) => {
        if (elem.id === newFile.id) {
          elem = newFile;
        }
        return elem;
      }),
    );
  }, []);

  const handleSaveClick = async () => {
    const urls = attachments.map((attachment) => {
      return attachment.signedUrl!;
    });
    if (typeDocs === FileCategory.APARTMENT_AD_DOCUMENTS) {
      await fetchOwnershipDocs({
        variables: {
          input: {
            id: apartmentAd!,
            ownershipDocuments: urls,
          },
        },
        onCompleted: () => notify(t('ownershipDocsNotificationTitle')),
        onError: () => notify(t('somethingError')),
      });
    } else if (typeDocs === FileCategory.IDENTITY_DOCUMENTS) {
      await fetchIdentityDocs({
        variables: {
          input: {
            identityDocuments: urls,
          },
        },
        onCompleted: () => notify(t('identifyNotificationTitle'), t('identifyNotificationContent')),
        onError: () => notify(t('somethingError')),
      });
    }
    setAttachments([]);
    setIsDropzoneVisible(true);
    onSaveClick();
  };

  const isMaxFiles = typeof maxFiles === 'number';
  const isButtonDisabled = attachments.length === 0 || !attachments[0].fileKey;
  const isButtonLoading = OwnershipDocsLoading || IdentityDocsLoading;
  const isDisabledLoadMoreButton = isMaxFiles ? attachments.length >= maxFiles : false;

  const actualMaxFiles = isMaxFiles ? maxFiles - attachments.length || 0 : undefined;
  return (
    <>
      {content && <ModalContent>{content}</ModalContent>}
      <DropzoneContainer>
        {isDropzoneVisible ? (
          <StyledDropzone
            accept={{
              'image/*': ['.jpeg', '.png', '.jpg', '.pdf'],
            }}
            buttonText={tDropZone('buttons.file')}
            onFilesRead={handleSetFiles}
            maxFiles={actualMaxFiles}
            maxSize={maxSize}
          />
        ) : (
          attachments.length !== 0 && (
            <AttachmentsContainer>
              {attachments.map((attachment) => (
                <Attachment
                  key={attachment.id}
                  id={attachment.id}
                  advertId={apartmentAd || ''}
                  file={attachment.file}
                  changeFile={handleChangesFile}
                  onSetFiles={handleSetFiles}
                  fileCategory={typeDocs}
                  handleDeleteAttachment={handleDeleteAttachment}
                  hasNeedLoad={!attachment?.signedUrl}
                />
              ))}
              <StyledLoadMoreButton
                isFullWight
                text={t('identifyLoadMode')}
                size={ButtonSize.SMALL}
                variant={ButtonVariant.SECONDARY}
                onClick={handleLoadMore}
                disabled={isDisabledLoadMoreButton}
              />
            </AttachmentsContainer>
          )
        )}
      </DropzoneContainer>
      <Footer>
        <StyledButton
          isFullWight
          text={t('identifySubmit')}
          size={ButtonSize.CARDS}
          variant={ButtonVariant.PRIMARY}
          onClick={handleSaveClick}
          isLoading={isButtonLoading}
          disabled={isButtonDisabled}
        />
      </Footer>
    </>
  );
};

const ModalContent = styled(AppText)`
  margin-bottom: 24px;
  ${({ theme: { typography } }) => typography.body_24_16_regular}
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const DropzoneContainer = styled.div`
  @media (min-width: ${BreakpointsEnum.sm}px) {
    height: auto;
    overflow-y: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledDropzone = styled(Dropzone)`
  min-width: 100%;
  min-height: 186px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    margin-left: -24px;
    margin-right: -24px;
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const StyledButton = styled(Button)`
  max-width: 100%;
  margin-top: 24px;
  height: 48px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 240px;
    margin-top: 16px;
    margin-right: 24px;
    margin-bottom: -8px;
    height: 40px;
  }
`;

const AttachmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 672px;
    margin-bottom: 24px;
  }
`;

const StyledLoadMoreButton = styled(Button)`
  white-space: nowrap;
  ${({ theme: { typography } }) => typography.caption_16_12_medium};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 136px;
    ${({ theme: { typography } }) => typography.caption_16_12_regular}
  }
`;
