import { ApartmentAdRulesModel, ApartmentRuleType } from '__generated__/types';
import { APARTMENT_MAX_PRICE_FOR_BOOKING, APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT, Routes, timeOptions } from 'constains';
import { useClientSize } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { dayjs } from 'services';
import styled, { useTheme } from 'styled-components';
import { BreakpointsEnum, OptionType, TextVariants } from 'types';
import { TabsValueType, TabType } from 'types/tabs';
import { AppText, Button, LightButton, Tabs } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { LightButtonSize } from 'ui/LightButton/LightButton';
import { handleDivisionOnCategories } from 'utils';

import SvgClose from '../../../../../public/svg/components/Close';
import { RulesEnum, rulesOptions, tabs } from '../../options';
import {
  ArriveTimes,
  CancellationPolicy,
  Dates,
  DepartureTimes,
  HouseType,
  Price,
  RentType,
  Rooms,
  Rules,
} from './components';

type FilterModalProps = {
  onClose: () => void;
};

interface OptionFilter extends OptionType {
  text?: string;
}

const FilterModal: FC<FilterModalProps> = ({ onClose }) => {
  const { t } = useTranslation('listApartmentsPage');

  const { getIsBreakpoint } = useClientSize();
  const isWidthSm = getIsBreakpoint('sm');

  const router = useRouter();
  const { colors } = useTheme();

  const findCurrentOption = (value: string, options: Array<OptionFilter>) => {
    return options.find((elem) => elem.value === value);
  };

  const typesFromQuery = router.query.apartmentTypes ? [...[router.query.apartmentTypes]] : [];
  const apartmentsTypesFromQuery = router.query.rules ? [...[router.query.rules]] : [];
  const roomsFromQuery = router?.query?.numberOfRooms ? [...router!.query.numberOfRooms] : [];

  const { control, reset, getValues } = useForm<FormType>({
    defaultValues: {
      minPrice:
        handleDivisionOnCategories(String(router.query.min) || '') ||
        handleDivisionOnCategories(APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT),
      maxPrice:
        handleDivisionOnCategories(String(router.query.max) || '') ||
        handleDivisionOnCategories(APARTMENT_MAX_PRICE_FOR_BOOKING),
      housingType: typesFromQuery.flat(),
      numberOfRooms: roomsFromQuery || ['no'],
      rentBookingType: '',
      entryStart: findCurrentOption(String(router.query.arrivalStart), timeOptions),
      entryEnd: findCurrentOption(String(router.query.arrivalEnd), timeOptions),
      departyreStart: findCurrentOption(String(router.query.departureStart), timeOptions),
      departyreEnd: findCurrentOption(String(router.query.departureEnd), timeOptions),
      cancellationPolicy: findCurrentOption(String(router.query.cancellationPolicy), rulesOptions),
      rules: apartmentsTypesFromQuery.flat() as Array<RulesEnum | ApartmentRuleType>,
      noRules: true,
      dateStart: dayjs(String(router.query.startDate)).isValid()
        ? dayjs(String(router.query.startDate)).toDate()
        : null,
      dateEnd: dayjs(String(router.query.endDate)).isValid() ? dayjs(String(router.query.endDate)).toDate() : null,
    },
    mode: 'onChange',
  });

  const showFilters = async () => {
    const {
      dateStart,
      dateEnd,
      numberOfRooms,
      housingType,
      rules,
      departyreEnd,
      departyreStart,
      entryStart,
      entryEnd,
      maxPrice,
      minPrice,
      rentBookingType,
      cancellationPolicy,
    } = getValues();
    console.log(dateEnd, dateStart, 'dates');
    await router.push(
      {
        pathname: Routes.listApartmentsShort,
        query: {
          ...router.query,
          min: minPrice,
          max: maxPrice,
          apartmentTypes: housingType,
          numberOfRooms: numberOfRooms.map((elem) => +elem),
          startDate: dateStart ? dayjs(dateStart).format('YYYY-MM-DD').toString() : null,
          endDate: dateEnd ? dayjs(dateEnd).format('YYYY-MM-DD').toString() : null,
          rules: rules.filter((elem) => elem !== RulesEnum.NoRules),
          departureEnd: departyreEnd?.value || null,
          departureStart: departyreStart?.value || null,
          arrivalEnd: entryEnd?.value || null,
          arrivalStart: entryStart?.value || null,
          rentBookingType: rentBookingType || null,
          cancellationPolicy: cancellationPolicy as unknown as string,
        },
      },
      undefined,
      { shallow: true },
    );
    onClose();
  };

  const [actualTab] = useState(tabs[0]);

  const changeTab = (actualTab: TabType) => () => {
    tabs.map((tab) => {
      if (actualTab.value === TabsValueType.LONG) {
        router.push(Routes.listApartmentsLong);
      }
      return tab;
    });
  };

  const setValuesInFormFromQuery = () => {
    const { query } = router;
    const roomsFromQuery = router?.query?.numberOfRooms ? [...router!.query.numberOfRooms] : [];
    reset({
      numberOfRooms: roomsFromQuery,
      rentBookingType: query.rentBookingType ? String(query.rentBookingType) : '',
      dateEnd: query?.endDate ? String(query.endDate) : null,
      dateStart: query?.startDate ? String(query.startDate) : null,
    });
  };

  useEffect(() => {
    setValuesInFormFromQuery();
  }, [router.query]);

  useEffect(() => {
    router.prefetch(Routes.listApartmentsLong);
  }, []);

  return (
    <Root>
      {isWidthSm && (
        <>
          <Header>
            <StyledLightButton
              size={LightButtonSize.SMALL}
              text={t('modalFilters.reset')}
              isUnderline
              onClick={() => reset()}
            />
            <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
              {t('modalFilters.filters')}
            </AppText>
            <IconContainer onClick={onClose}>
              <SvgClose color={colors.greyScale[100]} />
            </IconContainer>
          </Header>
          <TabsContainer>
            <Tabs tabs={tabs} activeTab={actualTab} handleChangeActiveTab={changeTab} isSmall />
          </TabsContainer>
        </>
      )}
      <StyledForm>
        <StyledAppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('bottomFilters.price')}
        </StyledAppText>
        <Section>
          <Price control={control} />
        </Section>
        <Title variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('bottomFilters.dates')}
        </Title>
        <DateSection>
          <Dates control={control} />
        </DateSection>
        <Title variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('bottomFilters.typeHousing')}
        </Title>
        <Section>
          <HouseType control={control} />
        </Section>
        <Title variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('bottomFilters.countRooms')}
        </Title>
        <Section>
          <Rooms control={control} />
        </Section>
        <Title variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('modalFilters.accommodation')}
        </Title>
        <Section>
          <Rules control={control} />
        </Section>
        <Title variant={TextVariants.SECONDARY} font="body_24_16_medium">
          {t('modalFilters.bookingType')}
        </Title>
        <SectionBookingType>
          <RentType control={control} />
        </SectionBookingType>
        <Title variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('modalFilters.arrivalTime')}
        </Title>
        <Section>
          <ArriveTimes control={control} />
        </Section>
        <Title variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('modalFilters.departureTime')}
        </Title>
        <Section>
          <DepartureTimes control={control} />
        </Section>
        <Title variant={TextVariants.SECONDARY} font={isWidthSm ? 'body_20_14_medium' : 'body_24_16_medium'}>
          {t('modalFilters.cancellationPolicyTitle')}
        </Title>
        <Subtitle font="body_20_14_regular">{t('modalFilters.cancellationPolicySubtitle')}</Subtitle>
        <CancellationPolicy control={control} />
      </StyledForm>
      {!isWidthSm ? (
        <Footer>
          <StyledButton
            text={t('modalFilters.resetFilters')}
            variant={ButtonVariant.SECONDARY}
            onClick={() => reset()}
          />
          <FooterButton onClick={showFilters} text={t('modalFilters.showVariants')} size={ButtonSize.LONG_TEXT} />
        </Footer>
      ) : (
        <ButtonContainer>
          <Button onClick={showFilters} text={t('modalFilters.showVariants')} isFullWight />
        </ButtonContainer>
      )}
    </Root>
  );
};

export default FilterModal;

type FormType = {
  minPrice: string;
  maxPrice: string;
  housingType: Array<string>;
  numberOfRooms: Array<string>;
  rentBookingType: string;
  dateStart: string | null | Date;
  dateEnd: string | null | Date;
  entryStart: OptionType;
  rules: Array<RulesEnum | ApartmentRuleType>;
  entryEnd: OptionType;
  departyreStart: OptionType;
  departyreEnd: OptionType;
  cancellationPolicy: OptionType;
  noRules: boolean;
} & ApartmentAdRulesModel;

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 16px;
  padding: 0 16px;
`;
const IconContainer = styled.button`
  background: transparent;
  display: flex;
  justify-content: flex-end;
  border: none;
  padding: 0;
  width: 75px;
  height: 20px;
  cursor: pointer;
`;
const TabsContainer = styled.div`
  padding: 16px;
`;
const StyledLightButton = styled(LightButton)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;
const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 25px 16px 6px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  z-index: 999;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;
const FooterButton = styled(Button)`
  height: 40px;
  padding: 16px 63px;
`;
const StyledButton = styled(Button)`
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  padding: 2px;
  ${({ theme: { typography } }) => typography.body_24_16_medium}
`;
const Footer = styled.div`
  position: sticky;
  display: flex;
  padding: 16px 24px;
  margin: -24px;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  z-index: 1;
`;
const Subtitle = styled(AppText)`
  margin-top: 16px;
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const DateSection = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionBookingType = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 18px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    flex-direction: row;
    gap: 0;
  }
`;

const Title = styled(AppText)`
  margin-top: 24px;
`;

const StyledAppText = styled(AppText)`
  margin-top: 8px;
`;
const Section = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  max-width: 100%;
  justify-content: space-between;
  width: 100%;
`;
const StyledForm = styled.form`
  padding: 0 16px 40px 16px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
    margin-bottom: 40px;
  }
`;
const Root = styled.div`
  padding: 0;
  ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0 8px;
  }
`;
