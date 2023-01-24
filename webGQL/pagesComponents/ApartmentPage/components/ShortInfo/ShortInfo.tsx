import { ApartmentType } from '__generated__/types';
import { roomsPlural } from 'constains';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';
import { handleWordsDeclination } from 'utils';

type ShortInfoType = {
  typeofHousing?: string;
  countRoms?: number;
};

const ShortInfo: FC<ShortInfoType> = ({ typeofHousing, countRoms }) => {
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'shortInfo' });
  const { getIsBreakpoint } = useClientSize();

  const createTypeHousing = (data: string = t('noData')) => {
    if (data === ApartmentType.Flat) return t('flat');
    if (data === ApartmentType.Room) return t('room');
    if (data === ApartmentType.Cottage) return t('house');
    if (data === ApartmentType.Hostel) return t('hostel');
    if (data === ApartmentType.MiniHotel) return t('miniHotel');
    if (data === ApartmentType.Guesthouse) return t('guestHome');
    if (data === ApartmentType.Aparthotel) return t('apart');
  };

  const generateValue = (string: string, value?: number | string) => (value ? string : t('noData'));

  const informationArr = [
    {
      label: t('typeofHousing'),
      value: generateValue(`${createTypeHousing(typeofHousing)}`, createTypeHousing(typeofHousing)),
    },
    {
      label: t('countRoms'),
      value: generateValue(`${countRoms} ${handleWordsDeclination(Number(countRoms), roomsPlural)}`, countRoms),
    },
    // Todo: it'll be later
    // {
    //   label: t('numberOfBeds'),
    //   value: generateValue(`${numberOfBeds} ${handleWordsDeclination(Number(numberOfBeds), placesPlural)}`, countRoms),
    // },
    // {
    //   label: t('totalArea'),
    //   value: generateValue(`${totalArea} ${t('m2')}`, totalArea),
    // },
    // {
    //   label: t('kitchenArea'),
    //   value: generateValue(`${kitchenArea} ${t('m2')}`, kitchenArea),
    // },
    // {
    //   label: t('apartmentFloor'),
    //   value: generateValue(`${apartmentFloor} ${t('floor')}`, apartmentFloor),
    // },
  ];

  const isWidthS = getIsBreakpoint('s');

  return (
    <Root>
      <AppText variant={TextVariants.SECONDARY} font={isWidthS ? 'title_22_18_medium' : 'title_22_18_bold'}>
        {t('shortInformation')}
      </AppText>
      <StyledAppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
        {t('general')}
      </StyledAppText>
      <InformationWrapper>
        {informationArr?.map(
          (info, index) =>
            info.value && (
              <Item key={index}>
                <InforamtionAppText font="body_20_14_regular">{info.label}</InforamtionAppText>
                <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
                  {info.value}
                </AppText>
              </Item>
            ),
        )}
      </InformationWrapper>
    </Root>
  );
};

export default ShortInfo;

const InforamtionAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
const Item = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  width: 400px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    width: 100%;
  }
`;
const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
`;
const StyledAppText = styled(AppText)`
  margin-top: 32px;
`;
const Root = styled.div`
  width: 100%;
  margin-top: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;
