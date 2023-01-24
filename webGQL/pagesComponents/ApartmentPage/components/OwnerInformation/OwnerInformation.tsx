import { roomsPlural } from 'constains';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Avatar } from 'ui';
import { AvatarSize } from 'ui/Avatar/Avatar';
import { handleWordsDeclination } from 'utils';

import { TickCircle } from '../../../../../public/svg/components';

type ShortInformationProps = {
  name: string;
  roomsCount?: number;
  avatar?: string;
  isIdentityApproved?: boolean;
  isPhoneApproved?: boolean;
};

const OwnerInformation: FC<ShortInformationProps> = ({
  name,
  roomsCount,
  avatar,
  isIdentityApproved,
  isPhoneApproved,
}) => {
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'shortInformation' });
  const { getIsBreakpoint } = useClientSize();

  const isStudio = roomsCount === 0;

  const isWidthS = getIsBreakpoint('s');
  return (
    <Container>
      <Column>
        <AppText font={isWidthS ? 'body_20_14_medium' : 'title_22_18_medium'} variant={TextVariants.SECONDARY}>
          {`${t('apartmentRentalOwner')} ${name}`}
        </AppText>
        {!isStudio && roomsCount ? (
          <StyledAppText
            font={isWidthS ? 'caption_16_12_regular' : 'body_20_14_medium'}
            variant={TextVariants.SECONDARY}>
            {`${roomsCount} ${handleWordsDeclination(roomsCount, roomsPlural)}`}
          </StyledAppText>
        ) : (
          t('studio')
        )}
      </Column>
      <ColumnOwner>
        {!isWidthS && (
          <Confirmation>
            {isIdentityApproved && (
              <ConfirmationItem>
                <StyledTickCircle />
                <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
                  {t('identityVerified')}
                </AppText>
              </ConfirmationItem>
            )}
            {isPhoneApproved && (
              <ConfirmationItemWithMargin>
                <StyledTickCircle />
                <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
                  {t('numberVerified')}
                </AppText>
              </ConfirmationItemWithMargin>
            )}
          </Confirmation>
        )}

        <AvatarWrapper>
          <Avatar size={isWidthS ? AvatarSize.size40 : AvatarSize.size64} avatar={avatar} />
        </AvatarWrapper>
      </ColumnOwner>
    </Container>
  );
};

export default OwnerInformation;

const Container = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;
  justify-content: space-between;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: 24px;
  }
`;
const Column = styled.div`
  padding-top: 7px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    max-width: 200px;
  }
`;
const ColumnOwner = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${BreakpointsEnum.s}px) {
    align-items: flex-start;
  }
`;
const StyledAppText = styled(AppText)`
  margin-top: 8px;
`;
const Confirmation = styled.div`
  margin-right: 25px;
`;
const ConfirmationItem = styled.div`
  display: flex;
  align-items: center;
`;
const ConfirmationItemWithMargin = styled(ConfirmationItem)`
  margin-top: 18px;
`;
const StyledTickCircle = styled(TickCircle)`
  margin-right: 10px;
`;
const AvatarWrapper = styled.div``;
