import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import styled, { css } from 'styled-components';
import { IconButton } from 'ui/IconButton';
import { v4 as uuid } from 'uuid';

import { Add } from '../../../public/svg/components';
import { AttachmentTypes, FileTypes } from '../../pagesComponents/HouseMedias/types';
import { colors } from '../../styles/themes/default/colors';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { ButtonSize, ButtonVariant } from '../Button/Button';

interface Accept {
  [key: string]: string[];
}

const getColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return css`
      border-color: ${colors.greyScale[100]};
      background-color: ${colors.greyScale[10]};
    `;
  }

  return css`
    border-color: ${colors.greyScale[40]};
    background-color: ${colors.greyScale[0]};
  `;
};

type DropzoneTypes = {
  maxFiles?: number;
  maxSize?: number;
  isDisabled?: boolean;
  loading?: boolean;
  className?: string;
  accept?: Accept;
  onChangeLoadedFile?: (file: AttachmentTypes) => void;
  buttonText: string;
  onFilesRead: (files: Array<AttachmentTypes>) => void;
  isPlusIcon?: boolean;
  hasFiles?: boolean;
};

const TEN_MB_IN_BYTE = 10485760;

const Dropzone: FC<DropzoneTypes> = ({
  maxFiles,
  maxSize = TEN_MB_IN_BYTE,
  accept = {},
  buttonText,
  isDisabled,
  onFilesRead,
  className,
  hasFiles = false,
  isPlusIcon = false,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'dropzone' });
  const { getIsBreakpoint } = useClientSize();

  const validateFileSize = (file: File) => {
    if (file.size > maxSize) {
      return {
        code: 'size-too-big',
        message: `Size is larger than ${maxSize} bytes`,
      };
    }
    return null;
  };

  const onDrop = useCallback((acceptedFiles: FileTypes[]) => {
    const readFiles = acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        file.url = reader.result as string;
      };
      reader.readAsDataURL(file);
      return {
        id: uuid(),
        file,
        isLoading: true,
        isError: false,
      };
    });
    onFilesRead(readFiles);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    maxFiles,
    disabled: isDisabled,
    accept,
    validator: validateFileSize,
  });

  const isWidthSm = getIsBreakpoint('sm');
  const isShowSmallButton = isPlusIcon && isWidthSm && hasFiles;
  const isShowBigButton = isPlusIcon && isWidthSm && !hasFiles;
  const isShowDefaultButton = !isPlusIcon;

  return (
    <Root {...getRootProps({ isFocused, isDragAccept, isDragReject })} className={className}>
      <input {...getInputProps()} />
      <ActionContainer>
        {isShowSmallButton && <IconButton IconComponent={Add} />}
        {isShowBigButton && (
          <StyledResponsiveButton
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            isFullWight
            text={buttonText}
          />
        )}
        {isShowDefaultButton && (
          <>
            <StyledButton variant={ButtonVariant.SECONDARY} size={ButtonSize.SMALL} isFullWight text={buttonText} />
            <Prompt font="caption_16_12_regular">{t('prompt')}</Prompt>
          </>
        )}
      </ActionContainer>
    </Root>
  );
};

const Root = styled.div<{ $isDragActive?: boolean }>`
  ${(props) => getColor(props)}
  min-width: 445px;
  min-height: 225px;
  border-width: 1px;
  border-style: dashed;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme: { colors } }) => colors.greyScale[100]};
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 280px;
  align-items: center;
  width: 100%;
`;

const Prompt = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[80]};
`;

const StyledButton = styled(Button)`
  &:focus {
    outline: none;
  }
`;

const StyledResponsiveButton = styled(StyledButton)`
  ${({ theme: { typography } }) => typography.caption_16_12_medium};
`;

export default Dropzone;
