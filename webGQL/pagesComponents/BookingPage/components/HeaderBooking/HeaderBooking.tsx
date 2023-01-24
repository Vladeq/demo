import { useClientSize } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, IconButton } from 'ui';
import { IconButtonSize } from 'ui/IconButton/IconButton';

import { ArrowLeft } from '../../../../../public/svg/components';

const HeaderBooking: FC = () => {
  const { t } = useTranslation('bookingPage', { keyPrefix: 'headerBooking' });
  const router = useRouter();
  const { getIsBreakpoint } = useClientSize();

  const isWidthSm = getIsBreakpoint('sm');
  return (
    <Root>
      {isWidthSm ? (
        <StyledArrowLeft onClick={router.back} />
      ) : (
        <IconButton IconComponent={ArrowLeft} size={IconButtonSize.SMALL} onClick={router.back} />
      )}
      <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_bold' : 'title_36_26_bold'}>
        {t('title')}
      </AppText>
    </Root>
  );
};

export default HeaderBooking;

const StyledArrowLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const Root = styled.div`
  width: 100%;
  display: flex;
  padding: 0 16px 16px;
  align-items: center;
  max-width: 1440px;
  gap: 16px;

  @media (min-width: ${BreakpointsEnum.s}px) {
    padding: 0 48px 16px;
  }

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 14px 72px 21px;
    gap: 32px;
  }
`;
