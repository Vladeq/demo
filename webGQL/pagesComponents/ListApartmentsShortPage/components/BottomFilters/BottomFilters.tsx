import { ResponsiveFilterModal } from 'components';
import { useClientSize, useToggle, useWindowScroll } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { GuestFieldInModal } from 'pagesComponents/ListApartmentsLongPage/components';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { dayjs } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum, OptionType } from 'types';
import {
  AppText,
  BaseInput,
  BaseModal,
  FiltersButton,
  MultipleDatePicker,
  ResponsiveModal,
  SmallFiltersButton,
} from 'ui';
import { pluralHandler } from 'utils';

import { houseTypeOptions, optionsMyltiple } from '../../../ListApartmentsLongPage/options';
import FilterModal from '../ModalFilter/ModalFilter';
import { HousingTypeField } from './components/HousingTypeField';
import { LocationField } from './components/LocationField';
import { PriceField } from './components/PriceField';

const BottomFilters: FC = () => {
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'bottomFilters' });
  const { t: tUi } = useTranslation('ui', { keyPrefix: 'forms' });
  const { getIsBreakpoint } = useClientSize();
  const router = useRouter();
  const { scrollY } = useWindowScroll();

  const defaultHouseOption = houseTypeOptions[0];

  const { isOpened: isOpenedGuest, open: openGuest, close: closeGuest } = useToggle();

  const { isOpened: isOpenedModal, open: openModal, close: closeModal } = useToggle();

  const { control, getValues, watch, reset } = useForm<InputDataFiltersShort>({
    defaultValues: {
      dateStart: dayjs(String(router.query.dateStart)).isValid() ? String(router.query.dateStart) : '',
      dateEnd: dayjs(String(router.query.dateEnd)).isValid() ? String(router.query.dateEnd) : '',
      price: '',
      numberOfGuests: Number(router.query.numberOfAdults) || 1,
      numberOfChilds: Number(router.query.numberOfChild) || 0,
      numberOfPets: Number(router.query.numberOfPets) || 0,
    },
    mode: 'onChange',
  });

  const single = [tUi('singleGuest'), tUi('singleChild'), tUi('singlePet')];
  const plural = [tUi('pluralGuests'), tUi('pluralChilds'), tUi('pluralPets')];

  const isWidthLgm = getIsBreakpoint('lgm');
  const isWidthSm = getIsBreakpoint('sm');

  const setDatesInQuery = (startDate: string, endDate: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          startDate: dayjs(String(startDate)).isValid() ? String(startDate) : '',
          endDate: dayjs(String(endDate)).isValid() ? String(endDate) : '',
        },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const resetFormByValuesFromQuery = () => {
    const typesFromQuery = router?.query?.apartmentTypes ? [router!.query.apartmentTypes] : [];

    const defaultTypes = houseTypeOptions.map((elem) => {
      if (typesFromQuery.flat().find((item) => elem.value === item)) {
        return elem;
      }
      return undefined;
    });

    const filteredTypes = defaultTypes.filter((elem) => elem?.value);

    reset({
      dateStart: dayjs(String(router.query.startDate)).isValid() ? String(router.query.startDate) : null,
      dateEnd: dayjs(String(router.query.endDate)).isValid() ? String(router.query.endDate) : null,
      typeHousing: filteredTypes?.length === 0 ? defaultHouseOption : filteredTypes,
    });
  };

  const values = [+router.query.numberOfAdults!, +router.query.numberOfChild!, +router.query.numberOfPets!];
  const pluralValues = pluralHandler(values, plural, single);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'dateStart' || (name === 'dateEnd' && type === 'change')) {
        setDatesInQuery(value.dateStart!, value.dateEnd!);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    resetFormByValuesFromQuery();
  }, [router.query]);

  const isScroll = scrollY > 0;

  return (
    <Root $isScroll={isScroll}>
      <StyledForm>
        <FormHighContainer>{isWidthLgm && <LocationField control={control} />}</FormHighContainer>
        <FormLowContainer>
          {!isWidthLgm && <PriceField control={control} />}
          {!isWidthLgm && <HousingTypeField control={control} />}
          <MutltipleContainer>
            {!isWidthLgm && <StyledAppText font="caption_14_10_regular">{t('dates')}</StyledAppText>}
            <StyledMultipleDataPicker control={control} defaultsInputsVariables={optionsMyltiple} isInHeader />
          </MutltipleContainer>
          {isWidthLgm && (
            <>
              <ContainerGuest onClick={openGuest}>
                <BaseInput
                  title={tUi('formGuestNum')}
                  value={pluralValues}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                />
              </ContainerGuest>
              <ResponsiveModal onClose={closeGuest} isVisible={isOpenedGuest}>
                <GuestFieldInModal onClose={closeGuest} control={control} getValues={getValues} />
              </ResponsiveModal>
            </>
          )}
          {isWidthSm && (
            <>
              <HelperContainer />
              <Wrapper onClick={openModal}>
                <SmallFiltersButton filtersCount={1} />
              </Wrapper>
            </>
          )}
        </FormLowContainer>
      </StyledForm>
      <FiltersButtonContainer onClick={openModal}>
        {!isWidthSm && <FiltersButton filtersCount={1} />}
      </FiltersButtonContainer>
      <StyledBaseModal
        onClose={closeModal}
        title={t('filters')}
        isVisible={!isWidthSm && isOpenedModal}
        isDropZoneModal
        isStickyHeader>
        <FilterModal onClose={closeModal} />
      </StyledBaseModal>
      <ResponsiveFilterModal onClose={closeModal} isVisible={isWidthSm && isOpenedModal}>
        <FilterModal onClose={closeModal} />
      </ResponsiveFilterModal>
    </Root>
  );
};

export default BottomFilters;

export type InputDataFiltersShort = {
  dateStart: string | null;
  dateEnd: string | null;
  maxPrice: string;
  typeHousing: OptionType | null | Array<OptionType>;
  price: string;
  rooms: string;
  location: OptionType;
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;
};

const StyledBaseModal = styled(BaseModal)`
  max-width: 672px;
  max-height: 619px;
  overflow-x: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Wrapper = styled.div`
  margin-left: 8px;
`;
const HelperContainer = styled.div`
  flex: 1;
`;

const FormHighContainer = styled.div``;
const FormLowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 8px;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    margin-top: 0;
  }
`;
const FiltersButtonContainer = styled.div`
  margin-top: 58px;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    margin-top: 16px;
  }
`;
const StyledMultipleDataPicker = styled(MultipleDatePicker)`
  padding: 0;
  margin: 0;
  max-height: 40px;

  & button {
    padding: 4px 0 10px 12px;
  }
`;
const MutltipleContainer = styled.div`
  margin-left: 0;
  margin-right: 8px;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    margin-left: 24px;
    margin-right: 0;
  }
`;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    width: 296px;
  }
  @media (min-width: ${BreakpointsEnum.lgm}px) {
    width: 100%;
  }
`;
const Root = styled.div<{ $isScroll: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  max-width: 1440px;
  justify-content: space-between;
  padding: ${({ $isScroll }) => ($isScroll ? '16px' : '0px 16px 16px')};
  transition: padding 0.5s;

  @media (min-width: ${BreakpointsEnum.s}px) {
    padding: 0 48px 24px;
  }

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0 72px 24px;
  }

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    padding: 8px 72px 24px;
  }
`;

const ContainerGuest = styled.div`
  max-width: 144px;
`;
