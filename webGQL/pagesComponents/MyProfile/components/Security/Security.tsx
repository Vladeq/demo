import { IdentityStatusType } from '__generated__/types';
import { ModalVerifyDocs } from 'components/ModalVerifyDocs';
import { FileCategory } from 'components/ModalVerifyDocs/types';
import { TWENTY_MB } from 'constains';
import { useSetIdentityDocuments } from 'graphql/mutations/User/__generated__/setIdentityDocuments.mutation';
import { useGetFullMe } from 'graphql/queries/User/__generated__/getFullMe.query';
import { useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { notify } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, BaseModal, LightButton } from 'ui';
import { LightButtonSize } from 'ui/LightButton/LightButton';

import { ModalEmail, VerifyMessage } from './components';
import { DataEnum, StatusVerifyEnum } from './components/VerifyMessage/VerifyMessage';

const Security: FC = () => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'security' });
  const { isOpened: isEmailOpened, open: openEmail, close: closeEmail } = useToggle(false);
  const { isOpened: isIdentifyOpened, open: openIdentify, close: closeIdentify } = useToggle(false);
  const { data } = useGetFullMe({ fetchPolicy: 'cache-and-network' });
  const [fetchIdentityDocs, { loading: IdentityDocsLoading }] = useSetIdentityDocuments();

  const user = data?.user__me;
  const hasEmail = !!user?.email;
  const identityStatus = user?.identityStatus || IdentityStatusType.NotConfirmed;

  const handleDeleteIdentityDocs = async () => {
    await fetchIdentityDocs({
      variables: {
        input: {
          identityDocuments: [] as string[],
        },
      },
      onCompleted: () => notify(t('identifyDocsDeleteNotification')),
      onError: () => notify(t('somethingError')),
    });
  };

  const IdentityStatusMessages = {
    [IdentityStatusType.Approved]: {
      status: t('personApproved'),
    },
    [IdentityStatusType.NotConfirmed]: {
      status: t('notConfirmed'),
    },
    [IdentityStatusType.Rejected]: {
      status: t('personReject'),
    },
    [IdentityStatusType.Processing]: {
      status: t('personProcessing'),
    },
  };

  const IdentityContentMessages = {
    [IdentityStatusType.Approved]: {
      content: t('personContent'),
    },
    [IdentityStatusType.NotConfirmed]: {
      content: t('personContent'),
    },
    [IdentityStatusType.Rejected]: {
      content: data?.user__me.identityRejectReason,
    },
    [IdentityStatusType.Processing]: {
      content: t('personContent'),
    },
  };

  const actions = {
    [IdentityStatusType.NotConfirmed]: (
      <StyledLightButton text={t('edit')} isUnderline size={LightButtonSize.NORMAL} onClick={openIdentify} />
    ),
    [IdentityStatusType.Rejected]: (
      <StyledLightButton text={t('edit')} isUnderline size={LightButtonSize.NORMAL} onClick={openIdentify} />
    ),
    [IdentityStatusType.Approved]: (
      <StyledLightButton
        text={t('delete')}
        isUnderline
        size={LightButtonSize.NORMAL}
        onClick={handleDeleteIdentityDocs}
        isLoading={IdentityDocsLoading}
      />
    ),
    [IdentityStatusType.Processing]: null,
  };

  return (
    <>
      <Root>
        <Section>
          <Title>{t('emailTitle')}</Title>
          <Row>
            <Info>
              {hasEmail ? (
                <>
                  <Data variant={TextVariants.SECONDARY}>{user?.email}</Data>
                  <VerifyMessage typeData={DataEnum.EMAIL} status={StatusVerifyEnum.NOT_CONFIRM} />
                </>
              ) : (
                <Data variant={TextVariants.SECONDARY}>{t('emailNoData')}</Data>
              )}
            </Info>
            <StyledLightButton text={t('edit')} isUnderline size={LightButtonSize.NORMAL} onClick={openEmail} />
          </Row>
        </Section>

        <Section>
          <Title>{t('phoneTitle')}</Title>
          <Data variant={TextVariants.SECONDARY}>{user?.phone}</Data>
          <Content hasMarginBottom>{t('phoneContent')}</Content>
          <VerifyMessage
            typeData={DataEnum.PHONE}
            status={user?.isPhoneApproved ? StatusVerifyEnum.CONFIRM : StatusVerifyEnum.NOT_CONFIRM}
          />
        </Section>
        <Section $hasBottomBorder={false}>
          <Title>{t('personTitle')}</Title>
          <NoConfirmRow>
            <Data variant={TextVariants.SECONDARY}>{IdentityStatusMessages[identityStatus].status}</Data>
            {actions[identityStatus]}
          </NoConfirmRow>
          <Content>{IdentityContentMessages[identityStatus].content}</Content>
        </Section>
      </Root>
      <ModalEmail isVisible={isEmailOpened} onClose={closeEmail} />
      <StyledVerifyIdentityModal
        onClose={closeIdentify}
        title={t('personTitle')}
        isVisible={isIdentifyOpened}
        isBottomMobile>
        <ModalVerifyDocsContainer>
          <ModalVerifyDocs
            maxSize={TWENTY_MB}
            maxFiles={3}
            onSaveClick={closeIdentify}
            content={t('identifyContent')}
            typeDocs={FileCategory.IDENTITY_DOCUMENTS}
          />
        </ModalVerifyDocsContainer>
      </StyledVerifyIdentityModal>
    </>
  );
};

export default Security;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  padding: 24px 16px 80px 16px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 848px;
    margin-top: 32px;
    margin-bottom: 80px;
    padding: 40px;
    border-radius: 21px;
  }
`;

const Section = styled.div<{ $hasBottomBorder?: boolean; $hasHover?: boolean }>`
  border-bottom: ${({ theme: { colors } }) => `1px solid ${colors.greyScale[30]}`};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    border-bottom: ${({ $hasBottomBorder = true, theme: { colors } }) =>
      $hasBottomBorder ? `1px solid ${colors.greyScale[30]}` : 'none'};
    cursor: ${({ $hasHover = false }) => ($hasHover ? 'pointer' : 'default')};

    &:hover {
      border-bottom: ${({ $hasBottomBorder = true, theme: { colors }, $hasHover = false }) =>
        $hasBottomBorder && $hasHover && `1px solid ${colors.greyScale[100]}`};
    }
  }
`;

const Title = styled.div`
  margin-bottom: 16px;
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
  ${({ theme: { typography } }) => typography.body_24_16_regular}
`;

const Data = styled(AppText)`
  margin-bottom: 8px;

  ${({ theme: { typography } }) => typography.body_24_16_medium};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 8px;
    ${({ theme: { typography } }) => typography.title_22_18_bold}
  }
`;

const Content = styled.p<{ hasMarginBottom?: boolean }>`
  margin-bottom: 12px;
  max-width: 641px;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  ${({ theme: { typography } }) => typography.body_20_14_regular};
  @media (min-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: ${({ hasMarginBottom = false }) => (hasMarginBottom ? '12px' : 0)};
    ${({ theme: { typography } }) => typography.body_24_16_regular}
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const NoConfirmRow = styled.div`
  max-height: 22px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLightButton = styled(LightButton)`
  margin-right: -10px;
  margin-top: -12px;
`;

const StyledVerifyIdentityModal = styled(BaseModal)`
  width: 100%;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 672px;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    .modal-header {
      border-bottom: unset;
    }
  }
`;

const ModalVerifyDocsContainer = styled.div`
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 8px;
  }
`;
