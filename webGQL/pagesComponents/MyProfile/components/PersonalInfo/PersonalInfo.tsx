import { GenderType, IdentityStatusType } from '__generated__/types';
import { useGetFullMe } from 'graphql/queries/User/__generated__/getFullMe.query';
import { useClientSize, useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, BaseModal, LightButton } from 'ui';
import { LightButtonSize } from 'ui/LightButton/LightButton';
import { reverseDate } from 'utils';

import SvgArrowRight from '../../../../../public/svg/components/ArrowRight';
import { BirthdateForm, EmergencyForm, GenderForm, NameForm, PhotoForm } from './components';

const PersonalInfo: FC = () => {
  const [currentForm, setCurrentForm] = useState<FormNameEnum>(FormNameEnum.BIRTHDATE_FORM);
  const [currentGuaranotrIndex, setCurrentGuarantorIndex] = useState(0);

  const { getIsBreakpoint } = useClientSize();
  const { t } = useTranslation('profilePage', { keyPrefix: 'personalInformation' });

  const { isOpened, open, close } = useToggle();

  const { data } = useGetFullMe({ fetchPolicy: 'cache-and-network' });
  const user = data?.user__me;
  const [isEditName] = useState(user?.identityStatus !== IdentityStatusType.Approved);

  const openPhotoModal = () => {
    setCurrentForm(FormNameEnum.PHOTO_FORM);
    open();
  };
  const openNameModal = () => {
    if (isEditName) {
      setCurrentForm(FormNameEnum.NAME_FORM);
      open();
    }
  };
  const openGenderModal = () => {
    if (isEditName) {
      setCurrentForm(FormNameEnum.GENDER_FORM);
      open();
    }
  };
  const openBirthdateModal = () => {
    if (isEditName) {
      setCurrentForm(FormNameEnum.BIRTHDATE_FORM);
      open();
    }
  };
  const openEmergencyModal = (index: number) => {
    setCurrentGuarantorIndex(index);
    setCurrentForm(FormNameEnum.EMERGENCY_FORM);
    open();
  };

  const firstUserGuarantorsFullName = user?.guarantors?.[0]
    ? `${user.guarantors[0].firstName} ${user.guarantors[0].lastName}`
    : t('noData');

  const manyGuarantors = user?.guarantors?.[1] ? user.guarantors : [];
  const guarantors = user?.guarantors?.[0] ? user.guarantors : [];

  const avatar = user?.avatarKey || '';
  const userId = user?.id || '';
  const firstName = user?.firstName || '';
  const middleName = user?.middleName || '';
  const lastName = user?.lastName || '';
  const fullName = user ? `${firstName} ${middleName} ${lastName}` : t('noName');
  const gender = user?.gender || GenderType.Male;
  const showGender = gender === GenderType.Male ? t('male') : t('female');
  const birthDate = user ? reverseDate(user?.birthDate) : '';

  const formsMapping = {
    [FormNameEnum.PHOTO_FORM]: {
      title: t('titlePhotoModal'),
      form: <PhotoForm close={close} userId={userId} avatar={avatar} />,
    },
    [FormNameEnum.NAME_FORM]: {
      title: t('fullName'),
      form: <NameForm close={close} firstName={firstName} lastName={lastName} middleName={middleName} />,
    },
    [FormNameEnum.GENDER_FORM]: {
      title: t('gender'),
      form: <GenderForm close={close} genderType={gender} />,
    },
    [FormNameEnum.BIRTHDATE_FORM]: {
      title: t('dateOfBirth'),
      form: <BirthdateForm close={close} birthDate={birthDate} />,
    },
    [FormNameEnum.EMERGENCY_FORM]: {
      title: t('faceOfEmergency'),
      form: <EmergencyForm close={close} index={currentGuaranotrIndex} guarantors={guarantors} />,
    },
  };

  const isWidthSm = getIsBreakpoint('sm');

  return (
    <>
      <Container>
        <Item onClick={openPhotoModal}>
          <Title variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('editPhoto')}
          </Title>
          <StyledSvgArrowRight />
        </Item>
        <Item onClick={openNameModal}>
          <InfoContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('fullName')}
            </AppText>
            <Information variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_24_16_medium' : 'title_22_18_bold'}>
              {fullName}
            </Information>
          </InfoContainer>
          {isEditName && <StyledLightButton text={t('edit')} size={LightButtonSize.NORMAL} isUnderline />}
        </Item>
        <Item onClick={openGenderModal}>
          <InfoContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('gender')}
            </AppText>
            <Information variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_24_16_medium' : 'title_22_18_bold'}>
              {showGender}
            </Information>
          </InfoContainer>
          {isEditName && <StyledLightButton text={t('edit')} size={LightButtonSize.NORMAL} isUnderline />}
        </Item>
        <Item onClick={openBirthdateModal}>
          <InfoContainer>
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
              {t('dateOfBirth')}
            </AppText>
            <Information variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_24_16_medium' : 'title_22_18_bold'}>
              {birthDate}
            </Information>
          </InfoContainer>
          {isEditName && <StyledLightButton text={t('edit')} size={LightButtonSize.NORMAL} isUnderline />}
        </Item>
        <WrapperStyledItem onClick={() => openEmergencyModal(0)}>
          <StyledItem>
            <InfoContainer>
              <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
                {t('faceOfEmergency')}
              </AppText>
              <LastInformation
                variant={TextVariants.SECONDARY}
                font={isWidthSm ? 'body_24_16_medium' : 'title_22_18_bold'}>
                {firstUserGuarantorsFullName}
              </LastInformation>
            </InfoContainer>
            <LastLightButton text={t('edit')} size={LightButtonSize.NORMAL} isUnderline />
          </StyledItem>
          <Annotation font={isWidthSm ? 'body_20_14_regular' : 'body_24_16_regular'}>{t('contactFace')}</Annotation>
        </WrapperStyledItem>

        {manyGuarantors?.map(
          (item, index) =>
            index !== 0 && (
              <StyledWrapper onClick={() => openEmergencyModal(index)} key={index}>
                <StyledItem>
                  <InfoContainer>
                    <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
                      {t('faceOfEmergency')}
                    </AppText>
                    <LastInformation
                      variant={TextVariants.SECONDARY}
                      font={isWidthSm ? 'body_24_16_medium' : 'title_22_18_bold'}>
                      {`${item.firstName} ${item.lastName}`}
                    </LastInformation>
                  </InfoContainer>
                  <LastLightButton text={t('edit')} size={LightButtonSize.NORMAL} isUnderline />
                </StyledItem>
                <Annotation font={isWidthSm ? 'body_20_14_regular' : 'body_24_16_regular'}>
                  {t('contactFace')}
                </Annotation>
              </StyledWrapper>
            ),
        )}
      </Container>
      <StyledBaseModal onClose={close} title={formsMapping[currentForm].title} isVisible={isOpened} isBottomMobile>
        {formsMapping[currentForm].form}
      </StyledBaseModal>
    </>
  );
};

export default PersonalInfo;

enum FormNameEnum {
  PHOTO_FORM = 'PHOTO_FORM',
  NAME_FORM = 'NAME_FORM',
  GENDER_FORM = 'GENDER_FORM',
  BIRTHDATE_FORM = 'BIRTHDATE_FORM',
  EMERGENCY_FORM = 'EMERGENCY_FORM',
}

const WrapperStyledItem = styled.div`
  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyScale[30]};

    &:hover {
      border-bottom: 1px solid ${colors.greyScale[100]};
      cursor: pointer;
    }
  `}
`;
const StyledWrapper = styled(WrapperStyledItem)`
  margin-top: 24px;
`;
const StyledBaseModal = styled(BaseModal)`
  max-width: 442px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    max-width: 100%;
    width: 100%;
  }
`;
const Container = styled.div`
  width: 848px;
  margin-top: 32px;
  margin-bottom: 80px;
  padding: 40px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  border-radius: 21px;

  @media (max-width: ${BreakpointsEnum.md}px) {
    width: 100%;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 0;
    border-radius: 0;
    padding: 24px 16px 80px 16px;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;
  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.greyScale[30]};

    &:hover {
      border-bottom: 1px solid ${colors.greyScale[100]};
      cursor: pointer;
    }
  `}
`;
const StyledItem = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const StyledLightButton = styled(LightButton)`
  font-size: 16px;
  margin-bottom: 7px;
  margin-right: -10px;
`;
const LastLightButton = styled(LightButton)`
  font-size: 16px;
  margin-right: -10px;
`;
const Title = styled(AppText)`
  margin-bottom: 16px;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Information = styled(AppText)`
  margin: 16px 0;
`;
const LastInformation = styled(AppText)`
  margin-top: 16px;
  margin-bottom: 8px;
`;
const StyledSvgArrowRight = styled(SvgArrowRight)`
  margin-bottom: 16px;
`;
const Annotation = styled(AppText)`
  padding-bottom: 16px;
  width: 100%;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
