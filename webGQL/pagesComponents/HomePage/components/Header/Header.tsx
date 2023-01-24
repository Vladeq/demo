import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { dayjs } from 'services';
import GoogleMapService from 'services/google-maps';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { TabsValueType, TabType } from 'types/tabs';
import { AppText, Button, DatePicker, DefaultAsyncSelect, Tabs } from 'ui';
import { ButtonSize } from 'ui/Button/Button';
import { DatePickerInputEnum } from 'ui/DatePicker/DatePicker';
import { v4 as uuid } from 'uuid';

import { BASE_COORDINATE } from '../../../../components/Map/Map';
import { Routes } from '../../../../constains';
import { GuestField } from './components';

interface InputData {
  location: string;
  dateStart: string;
  dateEnd: string;
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;
}

const DEFAULT_CITY = 'Алматы';

const Header: FC = () => {
  const { t } = useTranslation('ui');

  const tabs = [
    { title: t('tabs.shortTerm'), value: TabsValueType.SHORT, id: uuid() },
    { title: t('tabs.longTerm'), value: TabsValueType.LONG, id: uuid() },
  ];

  const [actualTab, setActualTab] = useState(tabs[0]);
  const [dates, setDates] = useState<Date[]>([]);
  const router = useRouter();

  const onSubmit: SubmitHandler<InputData> = async (data) => {
    const placeId = data?.location;

    let location;

    if (placeId) {
      const coordinates = await GoogleMapService.getPlacesDetails(placeId as unknown as string);
      location = {
        lat: coordinates?.location?.lat,
        lng: coordinates?.location?.lng,
        label: coordinates.city,
      };
    }

    const queries = {
      location: window.btoa(unescape(encodeURIComponent(JSON.stringify(location)))),
      startDate: dates[0] ? dayjs(dates[0]).format('YYYY-MM-DD') : null,
      lat: location?.lat || BASE_COORDINATE.lat,
      lng: location?.lng || BASE_COORDINATE.lng,
      label: location?.label || DEFAULT_CITY,
      endDate: dates[1] ? dayjs(dates[1]).format('YYYY-MM-DD') : null,
      numberOfAdults: data?.numberOfGuests,
      numberOfChild: data?.numberOfChilds,
      numberOfPets: data?.numberOfPets,
    };

    const nextRoute = actualTab.value === TabsValueType.LONG ? Routes.listApartmentsLong : Routes.listApartmentsShort;

    await router.push({ pathname: nextRoute, query: queries });
  };

  const form = useForm<InputData>({
    defaultValues: {
      location: '',
      dateStart: '',
      dateEnd: '',
      numberOfGuests: 1,
      numberOfChilds: 0,
      numberOfPets: 0,
    },
    mode: 'onChange',
  });

  const { handleSubmit, control, getValues } = form;

  const changeTab = (actualTab: TabType) => () => {
    tabs.map((tab) => {
      if (tab.value === actualTab.value) {
        setActualTab(actualTab);
      }
      return tab;
    });
  };

  const loadOptions = async (value: string) => {
    const res = await GoogleMapService.getPlaces(value);
    return res;
  };

  const isShortRentType = actualTab.value === TabsValueType.SHORT;

  return (
    <Root>
      <Content>
        <Title variant={TextVariants.SECONDARY} font="title_72_64_medium">
          Найди жилье своей мечты всего в пару кликов
        </Title>
        <RequestContainer>
          <TabsContainer>
            <Tabs tabs={tabs} activeTab={actualTab} handleChangeActiveTab={changeTab} />
          </TabsContainer>
          <FormContainer>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
              <PlaceContainer>
                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <StyledDropdown
                      loadOptions={loadOptions}
                      label={t('forms.formLocation')}
                      placeholder={t('forms.placeholderChooseCity')}
                      {...field}
                    />
                  )}
                />
              </PlaceContainer>
              {isShortRentType && (
                <DatepickerContainer>
                  <FormProvider {...form}>
                    <DatePicker
                      selectsRange
                      areTwoMonth
                      onChange={(date) => setDates(date as Date[])}
                      inputType={DatePickerInputEnum.multiple}
                    />
                  </FormProvider>
                </DatepickerContainer>
              )}
              <GuestField control={control} getValues={getValues} />
              <StyledButton type="submit" text={t('buttons.btnFindHome')} size={ButtonSize.NORMAL} />
            </StyledForm>
          </FormContainer>
        </RequestContainer>
      </Content>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  width: 100%;
  height: 600px;
  background: linear-gradient(103.36deg, #e4f0f6 51.07%, #f3f6e4 100%);
  border: none;
  border-radius: 32px;

  @media (max-width: ${BreakpointsEnum.md}px) {
    height: auto;
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    height: 552px;
    border-radius: 0;
  }
`;

const Content = styled.div`
  margin: 104px 112px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 56px 16px 0;
  }
`;

const Title = styled(AppText)`
  text-align: center;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_32_24_medium}
  }
`;

const TabsContainer = styled.div`
  width: 100%;
  max-width: 285px;
  height: 48px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 343px;
  }
`;

const RequestContainer = styled.div`
  margin: 72px 0 52px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 48px 16px 0;
  }
`;

const DatepickerContainer = styled.div`
  width: 100%;
  max-width: 277px;
  @media (max-width: ${BreakpointsEnum.md}px) {
    max-width: 100%;
  }
`;

const FormContainer = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${BreakpointsEnum.md}px) {
    align-items: center;
  }
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 1056px;
  @media (max-width: ${BreakpointsEnum.md}px) {
    max-width: 343px;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 176px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 100%;
  }
`;

const StyledDropdown = styled(DefaultAsyncSelect)`
  min-width: 277px;
  width: 100%;
  max-width: 348px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 100%;
  }
`;

const PlaceContainer = styled.div`
  width: 100%;
  max-width: 348px;
`;

export default Header;
