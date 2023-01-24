import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { BaseCardProps } from 'types/card';
import { AppText } from 'ui';

interface CardOnMapProps extends BaseCardProps {
  rentType?: string;
}

const CardOnMap: FC<CardOnMapProps> = ({ rentType, pictureSrc, title, price }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={pictureSrc} alt="apartment picture" width={300} height={200} objectFit="cover" />
      </ImageContainer>
      <DescriptionContainer>
        <RentTypeContainer>
          <RentTypeText>{rentType}</RentTypeText>
        </RentTypeContainer>
        <TitleContainer>
          <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {title}
          </AppText>
        </TitleContainer>
        <PriceContainer>
          <AppText variant={TextVariants.SECONDARY} font="title_22_18_bold">
            {price} ₸{' '}
          </AppText>
          <PricePeriod>{t('pricePeriod')}</PricePeriod>
        </PriceContainer>
      </DescriptionContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  position: absolute;
  z-index: 999;
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 16px;
    overflow: hidden;
    width: 288px;
    max-height: 275px;
  `}
`;

const ImageContainer = styled.div`
  display: flex;
  max-height: 131px;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

const RentTypeContainer = styled.div`
  display: flex;
`;

const RentTypeText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.body_20_14_regular}
  `}
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 18px;
`;

const PricePeriod = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    ${theme.typography.caption_16_12_regular}
  `}
  margin-left: 5px;
`;

export default CardOnMap;
