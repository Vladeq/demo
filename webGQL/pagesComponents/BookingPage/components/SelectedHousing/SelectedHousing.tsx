import { CardInSearch } from 'components/CardInSearch';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

type SelectedHousingProps = {
  pictureSrc: string;
  title: string;
  address: string;
  price: string;
  rentType: string;
  guestsNum: string;
  bedNum?: string;
  bathNum?: string;
};

const SelectedHousing: FC<SelectedHousingProps> = ({
  address,
  bathNum,
  bedNum,
  guestsNum,
  pictureSrc,
  price,
  rentType,
  title,
}) => {
  const { t } = useTranslation('bookingPage', { keyPrefix: 'selectedHousing' });
  const { getIsBreakpoint } = useClientSize();

  const isWidthSm = getIsBreakpoint('sm');
  return (
    <Root>
      <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_medium' : 'title_22_18_bold'}>
        {t('title')}
      </AppText>
      <CardInSearch
        pictureSrc={pictureSrc}
        title={title}
        address={address}
        price={price}
        rentType={rentType}
        guestsNum={guestsNum}
        bedNum={bedNum}
        bathNum={bathNum}
        isBooking
      />
    </Root>
  );
};

export default SelectedHousing;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 24px;
  }
`;
