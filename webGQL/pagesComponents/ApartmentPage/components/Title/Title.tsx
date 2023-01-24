import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, LightButton } from 'ui';
import { LightButtonSize } from 'ui/LightButton/LightButton';

type TitleProps = {
  isPaused: boolean;
  address: string;
  title: string;
  onScroll: () => void;
};

const Title: FC<TitleProps> = ({ title, isPaused, address, onScroll }) => {
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'header' });

  return (
    <Root>
      <StyledTitleText variant={!isPaused ? TextVariants.SECONDARY : TextVariants.PRIMARY} font="title_22_18_bold">
        {title}
      </StyledTitleText>
      <Address>
        <StyledAppText font="body_20_14_medium">{address}</StyledAppText>
        <LightButton onClick={onScroll} text={t('onMap')} isUnderline size={LightButtonSize.SMALL} />
      </Address>
    </Root>
  );
};

export default Title;

const StyledTitleText = styled(AppText)`
  word-break: normal;
`;
const Address = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  max-width: 250px;
`;

const Root = styled.div`
  width: 100%;
  margin-top: 16px;
  overflow: hidden;
`;
