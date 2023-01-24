import { ApartmentAdRulesModel, ApartmentRuleType } from '__generated__/types';
import { APARTMENT_MAX_PRICE_FOR_BOOKING, APARTMENT_MIN_PRICE_FOR_BOOKING_LONG, Routes } from 'constains';
import { useClientSize } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { useTheme } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { TabsValueType, TabType } from 'types/tabs';
import { AppText, Button, LightButton, Tabs } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { LightButtonSize } from 'ui/LightButton/LightButton';
import { handleDivisionOnCategories } from 'utils';

import SvgClose from '../../../../../public/svg/components/Close';
import { HouseType, Price, Rooms, Rules } from '../../../ListApartmentsShortPage/components/ModalFilter/components';

type FilterModalProps = {
  onClose?: () => void;
};

const FilterModal: FC<FilterModalProps> = ({ onClose }) => {
  const { t } = useTranslation('listApartmentsPage');
  const { getIsBreakpoint } = useClientSize();
  const router = useRouter();
  const { colors } = useTheme();

  const { control, reset, getValues } = useForm<FormType>({
    defaultValues: {
      minPrice:
        handleDivisionOnCategories(String(router.query.min) || '') ||
        handleDivisionOnCategories(APARTMENT_MIN_PRICE_FOR_BOOKING_LONG),
      maxPrice:
        handleDivisionOnCategories(String(router.query.max) || '') ||
        handleDivisionOnCategories(APARTMENT_MAX_PRICE_FOR_BOOKING),
      housingType: [],
      numberOfRooms: ['no'],
      noRules: true,
      rules: [RulesEnum.NoRules],
      allowedWithPets: false,
      allowedWithChildren: false,
      allowedToHangingOut: false,
      allowedToSmoke: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async () => {
    const values = getValues();
    await router.push(
      {
        pathname: Routes.listApartmentsLong,
        query: {
          ...router.query,
          numberOfRooms: values.numberOfRooms.map((elem) => +elem),
          rules: values.rules.filter((elem) => elem !== RulesEnum.NoRules),
          max: values.maxPrice.replaceAll(' ', ''),
          min: values.minPrice,
          apartmentTypes: values.housingType,
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const tabs = [
    { title: t('filters.shortTerm'), value: TabsValueType.SHORT, id: '0' },
    { title: t('filters.longTerm'), value: TabsValueType.LONG, id: '1' },
  ];

  const [actualTab] = useState(tabs[1]);

  const changeTab = (actualTab: TabType) => () => {
    tabs.map((tab) => {
      if (actualTab.value === TabsValueType.SHORT) {
        router.push(Routes.listApartmentsShort);
      }
      return tab;
    });
  };

  const isWidthSm = getIsBreakpoint('sm');

  const setValuesInFormFromQuery = () => {
    const roomsFromQuery = router?.query?.numberOfRooms ? [...router!.query.numberOfRooms] : [];
    const typesFromQuery = router.query.apartmentTypes ? [...[router.query.apartmentTypes]] : [];
    const apartmentsTypesFromQuery = router.query.rules ? [...[router.query.rules]] : [];

    reset({
      numberOfRooms: roomsFromQuery,
      housingType: typesFromQuery.flat(),
      maxPrice:
        handleDivisionOnCategories(String(router.query.max) || '') ||
        handleDivisionOnCategories(APARTMENT_MAX_PRICE_FOR_BOOKING),
      minPrice:
        handleDivisionOnCategories(String(router.query.min) || '') ||
        handleDivisionOnCategories(APARTMENT_MIN_PRICE_FOR_BOOKING_LONG),
      rules: apartmentsTypesFromQuery.flat() as Array<RulesEnum | ApartmentRuleType>,
    });
  };

  useEffect(() => {
    setValuesInFormFromQuery();
  }, [router.query]);

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
      </StyledForm>
      {!isWidthSm ? (
        <Footer>
          <StyledButton
            text={t('modalFilters.resetFilters')}
            variant={ButtonVariant.SECONDARY}
            onClick={() => reset()}
          />
          <FooterButton onClick={onSubmit} text={t('modalFilters.showVariants')} size={ButtonSize.LONG_TEXT} />
        </Footer>
      ) : (
        <ButtonContainer>
          <Button onClick={onSubmit} text={t('modalFilters.showVariants')} isFullWight />
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
  rules: Array<RulesEnum | ApartmentRuleType>;
  numberOfRooms: Array<string>;
  noRules: boolean;
} & ApartmentAdRulesModel;

enum RulesEnum {
  SMOKE = 'allowedToSmoke',
  CHILDREN = 'allowedWithChildren',
  PARTY = 'allowedToHangingOut',
  PETS = 'allowedWithPets',
  NoRules = 'noRules',
}

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 16px;
  padding: 0 16px;
`;
const TabsContainer = styled.div`
  padding: 16px;
`;
const StyledLightButton = styled(LightButton)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
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
    margin-bottom: 46px;
  }
`;
const Root = styled.div`
  padding: 0;
  ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0 8px;
  }
`;
