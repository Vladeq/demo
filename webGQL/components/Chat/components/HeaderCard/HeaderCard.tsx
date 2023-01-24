import { ApartmentRentPeriodType } from '__generated__/types';
import { guestPlural, rentPeriodMapping, roomsPlural, Routes } from 'constains';
import { useClientSize } from 'hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, LinkTo } from 'ui';
import { handleWordsDeclination, locationToString } from 'utils';
import { handleDivisionOnCategories } from 'utils/divisionOnCategories';

type HeaderCardProps = {
  price?: string | null;
  numberOfGuests?: number;
  numberOfRooms?: number;
  image?: string;
  name?: string;
  rentPeriodType?: ApartmentRentPeriodType;
  city?: string;
  street?: string;
  houseNumber?: string;
  id: string;
  type: ApartmentRentPeriodType;
};

const HeaderCard: FC<HeaderCardProps> = ({
  name = '',
  price,
  image,
  rentPeriodType,
  numberOfGuests = 0,
  numberOfRooms,
  city,
  houseNumber,
  street,
  id,
  type,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.headerCard' });

  const isPrice = !!price;
  const isPeriodType = !!rentPeriodType;
  const numberOfGuestsString = handleWordsDeclination(numberOfGuests, guestPlural);
  const numberOfRoomsString = handleWordsDeclination(numberOfRooms || 0, roomsPlural);
  const location = locationToString({ city, street, houseNumber });
  const dividedPrice = isPrice && handleDivisionOnCategories(price);

  const isStudio = numberOfRooms === 0;
  const isShowNumberOfRooms = numberOfRooms && !isStudio;

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  return (
    <Root>
      <InfoContainer>
        <Link href={{ pathname: Routes.apartment, query: { id, type } }}>
          <a>
            <ImageContainer>{image && <PreviewImage width={80} height={80} src={image} />}</ImageContainer>
          </a>
        </Link>
        <InfoWrapper>
          {id ? (
            <StyledLinkTo text={name} href={{ pathname: Routes.apartment, query: { id, type } }} />
          ) : (
            <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {name}
            </AppText>
          )}
          <Description>
            {`${numberOfGuests} ${numberOfGuestsString}`}
            {isShowNumberOfRooms ? (
              <>
                <Dot />
                {`${numberOfRooms} ${numberOfRoomsString}`}
              </>
            ) : (
              t('studio')
            )}
          </Description>
          <Location>{location}</Location>
          {isMobile && (
            <PriceContainer>
              {isPrice && (
                <AppText variant={TextVariants.SECONDARY} font="body_24_14_medium">{`${dividedPrice} ₸`}</AppText>
              )}
              {isPeriodType && <StyledCaption>{`${t('per')} ${rentPeriodMapping[rentPeriodType]}`}</StyledCaption>}
            </PriceContainer>
          )}
        </InfoWrapper>
      </InfoContainer>
      {!isMobile && (
        <PriceContainer>
          {isPrice && <AppText variant={TextVariants.SECONDARY} font="title_36_26_bold">{`${dividedPrice} ₸`}</AppText>}
          {isPeriodType && <StyledCaption>{`${t('per')} ${rentPeriodMapping[rentPeriodType]}`}</StyledCaption>}
        </PriceContainer>
      )}
    </Root>
  );
};

export default HeaderCard;

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  padding: 16px 24px;
  justify-content: space-between;

  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const InfoContainer = styled.div`
  max-width: 500px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 80px 1fr;
`;

const PreviewImage = styled(Image)`
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  min-width: 80px;
  max-height: 80px;

  border-radius: 12px;
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-gap: 4px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
`;

const Caption = styled.p`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[60]};
    ${typography.caption_16_12_regular}
  `}
`;

const Location = styled(Caption)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const StyledCaption = styled(Caption)`
  margin-bottom: 4px;
`;

const Description = styled.p`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;

  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[60]};
    ${typography.body_20_14_regular}
  `}

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 0;
  }
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const StyledLinkTo = styled(LinkTo)`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[100]};
    ${typography.body_24_16_medium}
  `}

  @media (max-width: ${BreakpointsEnum.sm}px) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ImageContainer = styled.div`
  height: fit-content;
  max-height: 80px;
  border-radius: 12px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[60]};

  cursor: pointer;
`;

const PriceContainer = styled.div`
  display: flex;
  height: fit-content;
  align-items: flex-end;
  gap: 8px;
  p {
    white-space: nowrap;
  }
`;
