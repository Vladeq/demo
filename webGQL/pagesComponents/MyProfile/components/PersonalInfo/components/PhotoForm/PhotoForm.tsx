import { useEditAvatar } from 'graphql/mutations/User/__generated__/editAvatar.mutation';
import { useLoadFile } from 'hooks';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { FileCategory } from 'pagesComponents/HouseMedias/types';
import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { notify } from 'services';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { parseFileKeyFromUrl } from 'utils';

import { Avatar, Camera, GalleryAdd, Trash } from '../../../../../../../public/svg/components';

type PhotoFormProps = {
  close: () => void;
  userId: string;
  avatar: string;
};

const TEN_MB = 10485760;

const PhotoForm: FC<PhotoFormProps> = ({ close, userId, avatar }) => {
  const [isOpenPhotoMenu, setIsOpenPhotoMenu] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<ArrayBuffer | null | string>(null);
  const [isRestLoading, setIsRestLoading] = useState(false);

  const { t } = useTranslation('profilePage', { keyPrefix: 'personalInformation' });
  const { register } = useForm();

  const [fetchEditAvatar, { loading }] = useEditAvatar();

  const { load, deleteAttachment } = useLoadFile(FileCategory.AVATARS);

  const controller = new AbortController();

  const loadFile = async (file: File, fileCategory: string, id: string, signal = {} as AbortSignal) => {
    try {
      setIsRestLoading(true);
      const res = await load(file, FileCategory.AVATARS, id, signal);
      await fetchEditAvatar({
        variables: {
          input: {
            avatar: parseFileKeyFromUrl(res.signedUrl!),
          },
        },
        onCompleted: () => notify(t('photoAdded')),
        onError: () => notify(t('somethingError')),
      });
    } catch (e) {
      notify(t('somethingError'));
    } finally {
      setIsRestLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setAvatarUrl(fileReader.result);
    };
    if (e.target.files !== null && e.target.files[0]) {
      if (e.target.files[0].size > TEN_MB) {
        notify(t('limitSize'));
        return null;
      }
      if (!e.target.files[0].type.match('image/jpeg|image/png|image/jpg')) {
        notify(t('imageFormat'));
        return null;
      }
      const file = e.target.files[0];
      setAvatarFile(file);
      fileReader.readAsDataURL(file);
    }
    setIsOpenPhotoMenu(false);
  };

  const onDeleteClickHandler = () => {
    deleteAttachment(avatar);
    setAvatarFile(null);
    setAvatarUrl(null);
    setIsOpenPhotoMenu(false);
  };

  const openPhotoMenu = () => {
    setIsOpenPhotoMenu(true);
  };

  const closePhotoMenu = () => {
    setIsOpenPhotoMenu(false);
  };

  const handleSaveClick = async () => {
    if (avatarFile !== null) {
      await loadFile(avatarFile, FileCategory.AVATARS, userId, controller.signal);
    }
    close();
  };

  const showAvatar = avatarUrl && typeof avatarUrl === 'string' ? avatarUrl : avatar;
  return (
    <Root>
      <ContainerAvatar>
        {avatarUrl || avatar ? (
          <NewAvatar layout="fill" src={showAvatar} alt="avatar" />
        ) : (
          <Avatar width={24} height={24} />
        )}
        {isOpenPhotoMenu ? (
          <ButtonAddAvatarActive>
            <Camera onClick={closePhotoMenu} />
          </ButtonAddAvatarActive>
        ) : (
          <ButtonAddAvatar>
            <Camera onClick={openPhotoMenu} />
          </ButtonAddAvatar>
        )}
      </ContainerAvatar>
      {isOpenPhotoMenu && (
        <DropDownContainer>
          <DropDownItem>
            <GalleryAdd />
            <StyledLabel>
              {t('download')}
              <StyledInput {...register('picture')} id="avatar" type="file" onChange={handleChange} />
            </StyledLabel>
          </DropDownItem>
          <Line />
          <DropDownItem onClick={onDeleteClickHandler}>
            <Trash width={24} height={24} />
            <DropDownText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
              {t('delete')}
            </DropDownText>
          </DropDownItem>
        </DropDownContainer>
      )}
      <StyledButton text={t('save')} isFullWight onClick={handleSaveClick} isLoading={loading || isRestLoading} />
    </Root>
  );
};

export default PhotoForm;

const StyledButton = styled(Button)`
  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: 100px;
  }
`;
const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContainerAvatar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  margin-bottom: 24px;
  background: ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 50%;
`;
const ButtonAddAvatar = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  ${({ theme: { colors } }) => css`
    background: ${colors.greyScale[50]};
    border: 3px solid ${colors.greyScale[0]};
  `}
  border-radius: 50%;
  cursor: pointer;
`;
const ButtonAddAvatarActive = styled(ButtonAddAvatar)`
  ${({ theme: { colors } }) => css`
    background: ${colors.greyScale[60]};
    border: 3px solid ${colors.greyScale[40]};
  `}
`;
const NewAvatar = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;
const StyledInput = styled.input`
  display: none;
`;
const DropDownContainer = styled.div`
  width: 135px;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  z-index: 10;
  bottom: -8px;
  left: 128px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  border-radius: 16px;
  box-shadow: 0 10px 33px rgba(175, 181, 192, 0.18);

  @media (max-width: ${BreakpointsEnum.s}px) {
    bottom: 91px;
    right: auto;
    left: auto;
    margin-right: 47px;
  }
`;
const DropDownItem = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale[30]};
`;
const StyledLabel = styled.label`
  margin-left: 10px;
  ${({ theme: { typography } }) => typography.caption_16_12_regular}
`;
const DropDownText = styled(AppText)`
  margin-left: 10px;
`;
