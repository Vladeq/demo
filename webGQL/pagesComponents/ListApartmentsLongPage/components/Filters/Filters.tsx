import { BASE_COORDINATE } from 'components/Map/Map';
import { Routes } from 'constains';
import { useClientSize } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { GuestField } from 'pagesComponents/HomePage/components/Header/components';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import GoogleMapService from 'services/google-maps';
import styled from 'styled-components';
import { OptionType } from 'types';
import { TabsValueType, TabType } from 'types/tabs';
import { DefaultAsyncSelect, Tabs } from 'ui';
import { v4 as uuid } from 'uuid';

const Filters: FC = () => {
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'filters' });
  const { getIsBreakpoint } = useClientSize();
  const router = useRouter();

  const tabs = [
    { title: t('shortTerm'), value: TabsValueType.SHORT, id: uuid() },
    { title: t('longTerm'), value: TabsValueType.LONG, id: uuid() },
  ];
  const [actualTab] = useState(tabs[1]);

  const { control, getValues } = useForm<InputData>({
    defaultValues: {
      numberOfGuests: Number(router.query.numberOfGuests) || 1,
      numberOfChilds: Number(router.query.numberOfChild) || 0,
      numberOfPets: Number(router.query.numberOfPets) || 0,
    },
    mode: 'onBlur',
  });

  const changeTab = (actualTab: TabType) => () => {
    tabs.map((tab) => {
      if (actualTab.value === TabsValueType.SHORT) {
        router.push({
          pathname: Routes.listApartmentsShort,
          query: {
            lat: BASE_COORDINATE.lat,
            lng: BASE_COORDINATE.lng,
            label: 'Алматы',
            numberOfAdults: 1,
          },
        });
      }
      return tab;
    });
  };

  const isWidthLgm = getIsBreakpoint('lgm');

  const loadPlaces = async (value: string) => {
    const res = await GoogleMapService.getPlaces(value);
    return res;
  };

  return (
    <Root>
      {!isWidthLgm && (
        <>
          <TabsContainer>
            <Tabs tabs={tabs} activeTab={actualTab} handleChangeActiveTab={changeTab} isSmall />
          </TabsContainer>

          <StyledForm>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <StyledDefaultAsyncSelect
                  loadOptions={loadPlaces}
                  label={t('location')}
                  defaultValue={field.value}
                  placeholder={t('placeholder')}
                  {...field}
                />
              )}
            />
            <GuestField control={control} getValues={getValues} />
          </StyledForm>
        </>
      )}
    </Root>
  );
};

export default Filters;

type InputData = {
  location: OptionType;
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;
};

const StyledDefaultAsyncSelect = styled(DefaultAsyncSelect)`
  margin-right: 16px;
  width: 176px;
`;
const StyledForm = styled.form`
  display: flex;
`;
const TabsContainer = styled.div`
  margin-right: 16px;
  width: 240px;
`;
const Root = styled.div`
  display: flex;
  margin-top: -8px;
  margin-left: 55px;
`;
