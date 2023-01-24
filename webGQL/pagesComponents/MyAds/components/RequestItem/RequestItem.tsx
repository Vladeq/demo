import { RentPeriodType } from '__generated__/types';
import { adultsPlural, childsPlural, petsPlural } from 'constains';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Avatar, Tooltip } from 'ui';
import { AvatarSize } from 'ui/Avatar/Avatar';
import { TooltipHorizontalPositionEnum, TooltipPositionEnum } from 'ui/Tooltip/Tooltip';
import { handleWordsDeclination } from 'utils';

import { Messages, Tick } from '../../../../../public/svg/components';

interface RequestItemProps {
  avatar: string;
  name: string;
  verifiedUser: boolean;
  message?: string;
  apartmentsName: string;
  dateStart?: string;
  dateEnd?: string;
  numberOfAdults?: number | null;
  numberOfChilds?: number | null;
  numberOfPets?: number | null;
  rentType: RentPeriodType;
  isToModal?: boolean;
}

const RequestItem: FC<RequestItemProps> = ({
  avatar,
  name,
  verifiedUser,
  message,
  apartmentsName,
  dateStart,
  dateEnd,
  numberOfAdults,
  numberOfChilds,
  numberOfPets,
  rentType,
  isToModal,
}) => {
  const { t } = useTranslation('myAdsPage', { keyPrefix: 'requests' });

  const numberOfAdultsString = numberOfAdults && handleWordsDeclination(numberOfAdults, adultsPlural);
  const numberOfChildsString = numberOfChilds && handleWordsDeclination(numberOfChilds, childsPlural);
  const numberOfPetsString = numberOfPets && handleWordsDeclination(numberOfPets, petsPlural);

  const isShortTerm = rentType === RentPeriodType.ShortTerm;

  const hasRules = numberOfAdults || numberOfChilds || numberOfPets;

  const formatDate = (date: string) => dayjs(date).format('DD MMMM YYYY');

  const formattedDateStart = formatDate(dateStart || '');
  const formattedDateEnd = formatDate(dateEnd || '');

  return (
    <MainContainer>
      <Avatar avatar={avatar} size={isToModal ? AvatarSize.size40 : AvatarSize.size64} />
      <InfoContainer>
        <Title>
          <AppText variant={TextVariants.SECONDARY} font={isToModal ? 'body_20_14_medium' : 'title_22_18_bold'}>
            {name}
          </AppText>
          {verifiedUser && <Tick />}
          {message && (
            <>
              <StyledTooltip
                text={t('tooltip')}
                horizontalPosition={TooltipHorizontalPositionEnum.CENTER}
                position={TooltipPositionEnum.TOP}>
                <Messages />
              </StyledTooltip>
            </>
          )}
        </Title>
        <Description>
          <DescriptionText
            variant={TextVariants.SECONDARY}
            font={isToModal ? 'caption_16_12_regular' : 'body_20_14_regular'}>
            {apartmentsName}
          </DescriptionText>
          {isShortTerm && (
            <DescriptionText
              variant={TextVariants.SECONDARY}
              font={isToModal ? 'caption_16_12_regular' : 'body_20_14_regular'}>
              {formattedDateStart} - {formattedDateEnd}
            </DescriptionText>
          )}
          {hasRules && (
            <Numbers $isToModal={isToModal!}>
              {`${numberOfAdults || ''} ${numberOfAdultsString || ''}`}
              {numberOfChilds && (
                <>
                  <Dot />
                  {`${numberOfChilds || ''} ${numberOfChildsString || ''}`}
                </>
              )}
              {numberOfPets && (
                <>
                  <Dot />
                  {`${numberOfPets || ''} ${numberOfPetsString || ''}`}
                </>
              )}
            </Numbers>
          )}
        </Description>
      </InfoContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  align-items: flex-start;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DescriptionText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
  `}
`;

const Numbers = styled.p<{ $isToModal: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme: { colors, typography }, $isToModal }) => css`
    color: ${colors.greyScale[60]};
    ${$isToModal ? typography.caption_16_12_regular : typography.body_20_14_regular}
  `}
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const StyledTooltip = styled(Tooltip)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;
export default RequestItem;
