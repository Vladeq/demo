import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Avatar } from 'ui';
import { AvatarSize } from 'ui/Avatar/Avatar';
import { formatDateToRange } from 'utils';

import { TickCircle } from '../../../../../public/svg/components';

type OwnerProps = {
  name: string;
  date?: string;
  avatar?: string;
  isIdentityApproved?: boolean;
  isPhoneApproved?: boolean;
};

const Owner: FC<OwnerProps> = ({ name, isIdentityApproved, isPhoneApproved, avatar, date = '' }) => {
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'owner' });

  const showDate = formatDateToRange(date).substring(3);
  return (
    <Root>
      <Container>
        <AvatarWrapper>
          <Avatar size={AvatarSize.size64} avatar={avatar} />
        </AvatarWrapper>
        <TextContainer>
          <AppText font="title_22_18_bold" variant={TextVariants.SECONDARY}>{`${t('ownerName')}${name}`}</AppText>
          {date && <StyledAppText font="body_20_14_regular">{`${t('presenceTime')}${showDate}`}</StyledAppText>}
        </TextContainer>
      </Container>
      <VerifiedContainer>
        {isIdentityApproved && (
          <ConfirmationItem>
            <StyledTickCircle />
            <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
              {t('identityVerified')}
            </AppText>
          </ConfirmationItem>
        )}
        {isPhoneApproved && (
          <ConfirmationItem>
            <StyledTickCircle />
            <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
              {t('numberVerified')}
            </AppText>
          </ConfirmationItem>
        )}
      </VerifiedContainer>
    </Root>
  );
};

export default Owner;

const StyledTickCircle = styled(TickCircle)`
  margin-right: 10px;
`;
const ConfirmationItem = styled.div`
  display: flex;
  margin-right: 18px;
  align-items: center;
`;
const VerifiedContainer = styled.div`
  display: flex;
  margin-top: 16px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    flex-direction: column;
    gap: 8px;
  }
`;
const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[50]};
  margin-top: 8px;
`;
const TextContainer = styled.div``;
const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;
const Root = styled.div`
  margin-top: 32px;
  width: 100%;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;
