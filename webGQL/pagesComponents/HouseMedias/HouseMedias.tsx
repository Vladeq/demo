import { Accepts } from 'constains/input';
import { Routes } from 'constains/routes';
import { useClientSize } from 'hooks';
import { AdvertLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { StepProps } from 'types/advert';
import { AppText, Button, Dropzone } from 'ui';
import { getCookie } from 'utils';
import { v4 } from 'uuid';

import { useSetHousesPhoto } from '../../graphql/mutations/Advert/__generated__/SetHousesMedia.mutation';
import { useGetFifthStep } from '../../graphql/queries/Advert/__generated__/getFifthStep.query';
import { ButtonVariant } from '../../ui/Button/Button';
import { Attachment } from './components';
import { AttachmentTypes } from './types';

const MAX_SIZE = 51;
const MAX_IMAGE_COUNT = 5;

const HouseMedias: FC<StepProps> = ({ step }) => {
  const router = useRouter();
  const [attachments, setAttachments] = useState<Array<AttachmentTypes>>([]);
  const [fetchHousesPhoto] = useSetHousesPhoto();
  const { getIsBreakpoint } = useClientSize();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('houseMediasPage', { keyPrefix: 'page' });

  const advertId = getCookie('advertId');

  const { data } = useGetFifthStep({ variables: { input: { id: advertId! } } });
  const photos = data?.apartmentAd__myApartmentAd.photos;

  const hasFiles = attachments?.length > 0;

  const isValid = attachments.find((elem) => elem?.isLoading || elem.isError);

  const handleCheckUniqueses = () => {
    const defaultUrls = photos?.map((el) => el.fileKey);
    const actualUrls = attachments.map((el) => el.file.url);
    return JSON.stringify(defaultUrls) === JSON.stringify(actualUrls);
  };

  const setMediasInDraft = () => {
    if (attachments?.length >= 5 && !isValid) {
      setMedias();
    }
  };

  const setMedias = async () => {
    if (!handleCheckUniqueses()) {
      const urls = attachments.map((attachment) => {
        return attachment.signedUrl!;
      });
      await fetchHousesPhoto({
        variables: {
          input: {
            id: advertId!,
            photos: urls,
          },
        },
      });
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    await setMedias();
    setIsLoading(false);
    await router.push(Routes.adDescriptionHouse);
  };

  const handleSetFiles = (newFiles: Array<AttachmentTypes>) => {
    setAttachments((state) => [...state, ...newFiles]);
  };

  const handleDeleteAttachment = (id: string) => {
    const filteredFiles = attachments.filter((attachment) => attachment.id !== id);
    setAttachments(filteredFiles);
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

  useEffect(() => {
    const photos = data?.apartmentAd__myApartmentAd.photos;
    if (photos) {
      const newFiles = photos?.map((file) => {
        return {
          id: v4(),
          file: {
            url: file.fileKey,
          },
          signedUrl: file.fileKey,
          isLoaded: true,
        };
      });
      setAttachments([...newFiles] as unknown as AttachmentTypes[]);
    }
  }, [data]);

  const isWidthSm = getIsBreakpoint('sm');
  const isHiddenDropzone = isWidthSm && hasFiles;
  const buttonText = isWidthSm ? t('longMediaChoice') : t('shortMediaChoice');
  const isDisabledSubmitButton = attachments?.length < MAX_IMAGE_COUNT || !!isValid;

  return (
    <AdvertLayout step={step} onSaveDraft={setMediasInDraft}>
      <Root>
        {!isWidthSm && (
          <Title variant={TextVariants.SECONDARY} font="title_36_26_bold">
            {t('titleText')}
          </Title>
        )}
        <SubTitle font="body_24_16_regular" variant={TextVariants.SECONDARY} $hasFiles={hasFiles}>
          {t('subtitleText')}
        </SubTitle>

        {hasFiles && (
          <AttachmentsContainer>
            {attachments.map((attachment) => (
              <Attachment
                key={`${attachment.id}`}
                file={attachment.file}
                url={attachment.file.url!}
                onSetFiles={handleSetFiles}
                changeFile={handleChangesFile}
                deleteAttachment={handleDeleteAttachment}
                fileKey={attachment.fileKey || ''}
                category={attachment.category || ''}
                id={attachment.id}
                isLoaded={attachment?.isLoaded!}
              />
            ))}
            {isWidthSm && (
              <StyledResponsiveDropzone
                accept={{
                  [`${Accepts.image}`]: ['.jpeg', '.png'],
                }}
                maxFiles={MAX_SIZE - attachments.length}
                isDisabled={attachments.length === MAX_SIZE}
                $hasFiles={hasFiles}
                hasFiles={hasFiles}
                buttonText={buttonText}
                onFilesRead={handleSetFiles}
                isPlusIcon={isWidthSm}
              />
            )}
          </AttachmentsContainer>
        )}

        {!isHiddenDropzone && (
          <DropzoneContainer>
            <StyledDropzone
              accept={{
                [`${Accepts.image}`]: ['.jpeg', '.png'],
              }}
              maxFiles={MAX_SIZE - attachments.length}
              isDisabled={attachments.length === MAX_SIZE}
              $hasFiles={hasFiles}
              hasFiles={hasFiles}
              buttonText={buttonText}
              onFilesRead={handleSetFiles}
              isPlusIcon={isWidthSm}
            />
          </DropzoneContainer>
        )}

        <ButtonsContainer $hasFiles={hasFiles}>
          <StyledButton
            onClick={() => router.push(Routes.adCreateAddress)}
            isFullWight
            text={t('back')}
            type="button"
            variant={ButtonVariant.SECONDARY}
          />
          <StyledButton
            type="submit"
            onClick={onSubmit}
            isLoading={isLoading}
            disabled={isDisabledSubmitButton}
            isFullWight
            text={t('continue')}
          />
        </ButtonsContainer>
      </Root>
    </AdvertLayout>
  );
};

export default HouseMedias;

const Root = styled.div`
  padding: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 16px 16px;
  }
`;

const Title = styled(AppText)`
  margin-bottom: 16px;
`;

const SubTitle = styled(AppText)<{ $hasFiles: boolean }>`
  margin-bottom: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ $hasFiles }) =>
      $hasFiles &&
      css`
        margin-bottom: 18px;
      `}
  }
`;

const ButtonsContainer = styled.div<{ $hasFiles: boolean }>`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
    margin-top: 104px;

    ${({ $hasFiles }) =>
      $hasFiles &&
      css`
        margin-top: 24px;
      `}
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 283px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 167px;
  }
`;

const AttachmentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 36px;
  margin-bottom: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
    margin-bottom: 0;
  }
`;

const DropzoneContainer = styled.div`
  margin: 2px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    min-height: 344px;
    div {
      width: 100%;
      min-width: 24px;
    }
  }
`;

const StyledDropzone = styled(Dropzone)<{ $hasFiles?: boolean }>`
  min-height: ${({ $hasFiles }) => ($hasFiles ? '174px' : '362px')};
`;

const StyledResponsiveDropzone = styled(StyledDropzone)`
  min-width: 167px;
  min-height: 155px;
`;
