import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

import { Routes } from '../../constains';

interface CardFeedbackProps {
  pictureSrc: string;
  title: string;
  seller: string;
  dateStart: string;
  dateEnd: string;
  id: string;
}

const CardFeedback: FC<CardFeedbackProps> = ({ pictureSrc, title, seller, dateStart, dateEnd, id }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });
  const { push } = useRouter();

  const redirectOnRentPage = () => {
    push({ pathname: Routes.activeRent, query: { id } });
  };

  return (
    <Card onClick={redirectOnRentPage}>
      <ImageContainer $src={pictureSrc} />
      <DescriptionContainer>
        <TitleText variant={TextVariants.SECONDARY} font="body_24_16_medium">
          {title}
        </TitleText>
        <InfoContainer>
          <InfoText>
            {t('seller')} {seller}
          </InfoText>
          <InfoText>
            {dateStart} - {dateEnd}
          </InfoText>
        </InfoContainer>
      </DescriptionContainer>
    </Card>
  );
};

export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 12px;
    overflow: hidden;
    max-width: 380px;
    height: 100px;
    width: 100%;

    &:hover {
      background-color: ${theme.colors.greyScale[10]};
    }
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 343px;
  }
`;

const ImageContainer = styled.div<{ $src: string }>`
  display: flex;
  justify-content: flex-end;
  max-width: 88px;
  width: 100%;
  height: 100px;

  ${({ $src }) => css`
    background: url(${$src});
    background-size: cover;
    background-position: center;
  `};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 120px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 8px 8px 16px;
  width: 100%;
  max-width: 284px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 215px;
  }
`;

const TitleText = styled(AppText)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  max-width: 268px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 4px;
`;

const InfoText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.body_20_14_regular}
  `}
`;

export default CardFeedback;
