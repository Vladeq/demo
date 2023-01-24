import { ApartmentType } from '__generated__/types';
import { ResponsiveFilterModal } from 'components';
import { roomsPlural, Routes } from 'constains';
import { useClientSize, useToggle, useWindowScroll } from 'hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import GoogleMapService from 'services/google-maps';
import styled from 'styled-components';
import { BreakpointsEnum, OptionType } from 'types';
import {
  AppText,
  BaseInput,
  BaseModal,
  CustomOptionWithCheckbox,
  DefaultAsyncSelect,
  DoubleInput,
  DropdownDefault,
  FiltersButton,
  ResponsiveModal,
  Selector,
  SmallFiltersButton,
} from 'ui';
import { handleWordsDeclination, pluralHandler } from 'utils';
import { removeQueryParam } from 'utils/urlHelpers';

import { ArrowLeft } from '../../../../../public/svg/components';
import { GuestFieldInModal } from '../GuestFieldInModal';

const FilterModal = dynamic(() => import('../ModalFilter/ModalFilter'));

const NUMBER_FOR_MORE = '3';
const EMPTY_VALUE = 'no';

const BottomFilters: FC = () => {
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'bottomFilters' });
  const { getIsBreakpoint } = useClientSize();
  const router = useRouter();
  const { t: tUi } = useTranslation('ui', { keyPrefix: 'forms' });
  const { scrollY } = useWindowScroll();

  const { isOpened, open, close } = useToggle();
  const { isOpened: isOpenedLocation, open: openLocation, close: closeLocation } = useToggle();
  const { isOpened: isOpenedModal, open: openModal, close: closeModal } = useToggle();

  const values = [+router.query.numberOfAdults!, +router.query.numberOfChild!, +router.query.numberOfPets!];

  const options = useMemo(() => {
    return [
      { label: t('all'), value: '' },
      { label: t('flats'), value: ApartmentType.Flat },
      { label: t('rooms'), value: ApartmentType.Room },
      { label: t('cottages'), value: ApartmentType.Cottage },
      { label: t('hostels'), value: ApartmentType.Hostel },
      { label: t('miniHotels'), value: ApartmentType.MiniHotel },
      { label: t('guestHouses'), value: ApartmentType.Guesthouse },
      { label: t('apartHotels'), value: ApartmentType.Aparthotel },
    ];
  }, [t]);

  const typesFromQuery = router?.query?.apartmentTypes ? [...[router!.query.apartmentTypes]] : []; // вынесу в отдельную функцию в мре на краткосрок пока не придумал как лучше

  const defaultTypes = options.filter(
    (elem) => typesFromQuery.flat().find((item) => elem.value === item) && elem?.value,
  );

  const filteredTypes = defaultTypes.filter((elem) => elem?.value);

  const form = useForm();
  const { control, getValues, reset } = useForm<InputDataFiltersLong>({
    defaultValues: {
      dateStart: '',
      dateEnd: '',
      price: '',
      location: { value: '', label: '' },
      typeHousing: filteredTypes,
      numberOfGuests: Number(router.query.numberOfGuests) || 1,
      numberOfChilds: Number(router.query.numberOfChild) || 0,
      numberOfPets: Number(router.query.numberOfPets) || 0,
      numberOfRooms: [],
      rooms: { label: t('stydio'), value: '0' },
    },
    mode: 'onChange',
  });

  const roomsArray = useMemo(() => {
    return [
      { label: t('stydio'), value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3+', value: '3' },
    ];
  }, [t]);

  const single = [tUi('singleGuest'), tUi('singleChild'), tUi('singlePet')];
  const plural = [tUi('pluralGuests'), tUi('pluralChilds'), tUi('pluralPets')];

  const pluralValues = pluralHandler(values, plural, single);

  const roomOptions = useMemo(() => {
    return [
      { label: t('noMatter'), value: '' },
      { label: t('stydio'), value: '0' },
      { label: `1 ${handleWordsDeclination(1, roomsPlural)}`, value: '1' },
      { label: `2 ${handleWordsDeclination(2, roomsPlural)}`, value: '2' },
      { label: `3 ${handleWordsDeclination(3, roomsPlural)}`, value: '3' },
      { label: `4 ${handleWordsDeclination(4, roomsPlural)}`, value: '4' },
      { label: `5 ${handleWordsDeclination(5, roomsPlural)}`, value: '5' },
      { label: `6 ${handleWordsDeclination(6, roomsPlural)}`, value: '6' },
      { label: `7 ${handleWordsDeclination(7, roomsPlural)}`, value: '7' },
      { label: `+8 ${handleWordsDeclination(8, roomsPlural)}`, value: '8' },
    ];
  }, [t]);

  const isWidthLgm = getIsBreakpoint('lgm');
  const isWidthSm = getIsBreakpoint('sm');

  const loadPlaces = async (value: string) => {
    const res = await GoogleMapService.getPlaces(value);
    return res;
  };

  const setValeusFromQueryInForm = () => {
    const roomsFromQuery = router?.query?.numberOfRooms ? [...router!.query.numberOfRooms] : [];
    const typesFromQuery = router?.query?.apartmentTypes ? [router!.query.apartmentTypes] : [];

    const defaultOptionForMobileRooms = roomOptions.filter(
      (elem) => roomsFromQuery.flat().find((item) => elem.value === item) && elem?.value,
    );
    const defaultTypes = options.filter(
      (elem) => typesFromQuery.flat().find((item) => elem.value === item) && elem?.value,
    );

    const filteredTypes = defaultTypes.filter((elem) => elem?.value);
    const filteredRooms = defaultOptionForMobileRooms.filter((elem) => elem?.value);

    reset({
      // @ts-ignore
      numberOfRoomsMobile: filteredRooms,
      numberOfRooms: roomsFromQuery,
      typeHousing: filteredTypes?.length === 0 ? options[0] : filteredTypes,
    });
  };

  useEffect(() => {
    setValeusFromQueryInForm();
  }, [router.query]);

  const handleOnChangeForRooms = async (value: Array<OptionType>) => {
    let isCheck;
    if (value?.length === 0) {
      removeQueryParam('numberOfRooms', router);
    } else {
      isCheck = value.includes(options[0]);
    }
    if (value?.length && !isCheck) {
      const queryValues = value?.map((elem: OptionType) => elem.value).filter((elem: string) => elem);
      await router.push({ query: { ...router.query, numberOfRooms: queryValues } }, undefined, {
        shallow: true,
      });
    } else {
      removeQueryParam('numberOfRooms', router);
    }
  };

  const handleOnChangeForTypeHousing = async (value: Array<OptionType>) => {
    let isCheck;
    if (value?.length === 0) {
      removeQueryParam('apartmentTypes', router);
    } else {
      isCheck = value.includes(options[0]);
    }
    if (value?.length && !isCheck) {
      const queryValues = value?.map((elem: OptionType) => elem.value).filter((elem: string) => elem);
      await router.push({ query: { ...router.query, apartmentTypes: queryValues } }, undefined, {
        shallow: true,
      });
    } else {
      removeQueryParam('apartmentTypes', router);
    }
  };

  const updateRoomsInQuery = async (newValues: string[]) => {
    await router.push(
      {
        pathname: Routes.listApartmentsLong,
        query: { ...router.query, numberOfRooms: newValues },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const handleChangeRooms = async (
    value: Array<string>,
    onChange: { (...event: any[]): void; (arg0: string[]): void },
    selectorValue: string,
  ) => {
    const isEmptyValue = selectorValue === EMPTY_VALUE;
    const hasSelectorValue = value.includes(selectorValue);
    let newValues: string[];

    if (!hasSelectorValue) {
      newValues = isEmptyValue ? [EMPTY_VALUE] : [...value, selectorValue].filter((elem) => elem !== EMPTY_VALUE);
    } else {
      newValues = value.filter((elem) => elem !== selectorValue);
    }

    onChange(newValues);
    await updateRoomsInQuery(newValues);
  };

  const handleOnChangeForRoomsMore = async (
    value: Array<string>,
    onChange: { (...event: any[]): void; (arg0: string[]): void },
    selectorValue: string,
  ) => {
    let newValues = [...value, '3', '4', '5', '6', '7', '8'];
    if (Math.max(...(value as unknown as Array<number>)) >= +selectorValue) {
      newValues = value.filter((elem) => elem < selectorValue);
    }
    await updateRoomsInQuery(newValues);
  };

  const isScroll = scrollY > 0;

  return (
    <Root $isScroll={isScroll}>
      <StyledForm>
        <FormHighContainer>
          {isWidthLgm && (
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <AsyncContainer>
                  {isOpenedLocation && <StyledArrowLeft onClick={closeLocation} />}
                  <AsyncInnerContainer>
                    <DefaultAsyncSelect
                      {...field}
                      loadOptions={loadPlaces}
                      label={t('location')}
                      placeholder={t('placeholder')}
                      menuIsOpen={isOpenedLocation}
                      onMenuOpen={openLocation}
                      onMenuClose={closeLocation}
                      isSecondary
                    />
                  </AsyncInnerContainer>
                </AsyncContainer>
              )}
            />
          )}
        </FormHighContainer>
        <FormLowContainer>
          {!isWidthLgm && (
            <>
              <Controller
                control={control}
                name="price"
                render={({ field }) => (
                  <DoubleInputContainer>
                    <StyledAppText font="caption_14_10_regular">{t('price')}</StyledAppText>
                    <DoubleInput {...field} />
                  </DoubleInputContainer>
                )}
              />
              <Controller
                control={control}
                name="typeHousing"
                render={({ field }) => (
                  <DropdownContainer>
                    <StyledAppText font="caption_14_10_regular">{t('typeHousing')}</StyledAppText>
                    <InnerContainer>
                      <DropdownDefault
                        isMulti
                        maxMenuHeight={212}
                        closeMenuOnSelect={false}
                        isClearable={false}
                        isSearchable={false}
                        options={options}
                        selected={field.value as OptionType}
                        customOptionWithCheckbox={CustomOptionWithCheckbox}
                        onChange={handleOnChangeForTypeHousing}
                      />
                    </InnerContainer>
                  </DropdownContainer>
                )}
              />
            </>
          )}
          <ResponsiveBlock>
            {isWidthLgm ? (
              <ResponseContainer>
                <Controller
                  control={control}
                  // @ts-ignore
                  name="numberOfRoomsMobile"
                  render={({ field }) => (
                    <DropdownContainer>
                      <DropdownDefault
                        isMulti
                        maxMenuHeight={212}
                        closeMenuOnSelect={false}
                        isClearable={false}
                        isSearchable={false}
                        selected={field.value as OptionType}
                        options={roomOptions}
                        customOptionWithCheckbox={CustomOptionWithCheckbox}
                        onChange={handleOnChangeForRooms}
                      />
                    </DropdownContainer>
                  )}
                />
                <ContainerGuest onClick={open}>
                  <BaseInput
                    title={tUi('formGuestNum')}
                    value={pluralValues}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                </ContainerGuest>
                <ResponsiveModal onClose={close} isVisible={isOpened}>
                  <GuestFieldInModal onClose={close} control={control} getValues={getValues} />
                </ResponsiveModal>
              </ResponseContainer>
            ) : (
              <FormProvider {...form}>
                <div>
                  <StyledAppText font="caption_14_10_regular">{t('countRooms')}</StyledAppText>
                  <Controller
                    name="numberOfRooms"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <RoomsContainer>
                        {roomsArray.map((selector, index) =>
                          index ? (
                            <StyledSelector
                              name={selector.label}
                              text={selector.label}
                              onChange={() =>
                                selector.value !== NUMBER_FOR_MORE
                                  ? handleChangeRooms(value, onChange, selector.value)
                                  : handleOnChangeForRoomsMore(value, onChange, selector.value)
                              }
                              checked={
                                selector.value === NUMBER_FOR_MORE
                                  ? Math.max(...(value as unknown as Array<number>)) >= +selector.value
                                  : value.includes(selector.value)
                              }
                              key={index}
                            />
                          ) : (
                            <BigSelector
                              name={selector.label}
                              text={selector.label}
                              onChange={() => handleChangeRooms(value, onChange, selector.value)}
                              checked={value.includes(selector.value)}
                              key={index}
                            />
                          ),
                        )}
                      </RoomsContainer>
                    )}
                  />
                </div>
              </FormProvider>
            )}
          </ResponsiveBlock>
          {isWidthSm && (
            <>
              <HelperContainer />
              <Wrapper onClick={openModal}>
                <SmallFiltersButton filtersCount={3} />
              </Wrapper>
            </>
          )}
        </FormLowContainer>
      </StyledForm>
      <FiltersButtonContainer onClick={openModal}>
        {!isWidthSm && <FiltersButton filtersCount={3} />}
      </FiltersButtonContainer>
      <StyledBaseModal
        onClose={closeModal}
        title={t('filters')}
        isVisible={!isWidthSm && isOpenedModal}
        isDropZoneModal
        isStickyHeader>
        <FilterModal />
      </StyledBaseModal>
      <ResponsiveFilterModal onClose={closeModal} isVisible={isWidthSm && isOpenedModal}>
        <FilterModal onClose={closeModal} />
      </ResponsiveFilterModal>
    </Root>
  );
};

export default BottomFilters;

export type InputDataFiltersLong = {
  dateStart: string;
  dateEnd: string;
  typeHousing: Array<OptionType> | OptionType;
  price: string;
  numberOfRooms: Array<string>;
  rooms: OptionType;
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
const RoomsContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const BigSelector = styled(Selector)`
  width: 72px;
  min-width: unset;
`;
const StyledSelector = styled(Selector)`
  width: 40px;
  min-width: unset;
  padding: 0;
  p {
    ${({ theme: { typography } }) => typography.caption_16_12_regular}
  }
`;
const StyledArrowLeft = styled(ArrowLeft)`
  margin-right: 18px;
  cursor: pointer;
`;
const AsyncContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const AsyncInnerContainer = styled.div`
  width: 100%;
`;
const ContainerGuest = styled.div`
  max-width: 144px;
`;
const ResponseContainer = styled.div`
  display: flex;
  gap: 8px;
`;
const Wrapper = styled.div`
  margin-left: 8px;
`;
const HelperContainer = styled.div`
  flex: 1;
`;
const FiltersButtonContainer = styled.div`
  margin-top: 58px;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    margin-top: 16px;
  }
`;
const FormLowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 8px;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    margin-top: 0;
  }
`;
const FormHighContainer = styled.div``;
const ResponsiveBlock = styled.div`
  @media (min-width: ${BreakpointsEnum.lgm}px) {
    margin-left: 24px;
  }
`;
const InnerContainer = styled.div`
  padding-right: 24px;
  min-width: 167px;
  border-right: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;
const DoubleInputContainer = styled.div`
  margin-right: 16px;
`;
const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
`;
const DropdownContainer = styled.div``;
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
