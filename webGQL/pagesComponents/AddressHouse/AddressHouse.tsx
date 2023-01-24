import { Routes } from 'constains';
import { AdvertLayout } from 'layouts/AdvertLayout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import GoogleMapService from 'services/google-maps';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { getCookie } from 'utils';

import { useSetAddressHouse } from '../../graphql/mutations/Advert/__generated__/SetAddressHouse.mutation';
import { useGetFourth } from '../../graphql/queries/Advert/__generated__/getAdverеFourth.query';
import { AddressType, Coords, StepProps } from '../../types/advert';
import { ButtonVariant } from '../../ui/Button/Button';
import { Map } from './components/Map';
import { MapInput } from './components/MapInput';

interface FormValues {
  location: string;
}
const BASE_COORDINATE = { lat: 51.1801, lng: 71.446 };

const AddressHouse: FC<StepProps> = ({ step }) => {
  const advertId = getCookie('advertId');

  const [center, setCenter] = useState(BASE_COORDINATE);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMarker, setCurrentMarker] = useState<Coords | null>();
  const [address, setAddress] = useState<AddressType>();
  const [error, setError] = useState('');

  const router = useRouter();
  const { t } = useTranslation('addressPage');

  const [fetchSetAddress] = useSetAddressHouse();
  const { data, loading: getDefaultValueLoading } = useGetFourth({ variables: { input: { id: advertId! } } });
  const defaultAddress = data?.apartmentAd__myApartmentAd.address;

  const { control, handleSubmit } = useForm<FormValues>();
  const collectedAddress = `${defaultAddress?.street}  ${defaultAddress?.houseNumber},  ${defaultAddress?.city},  Казахстан`;
  const isDirty =
    !error && address && defaultAddress?.lat !== currentMarker?.lat && defaultAddress?.lng !== currentMarker?.lng;

  const setAddressToDraft = async () => {
    if (address) {
      await fetchSetAddress({
        variables: {
          input: {
            lat: address.location.lat,
            lng: address.location.lng,
            street: address.street,
            houseNumber: address.houseNumber,
            city: address.city,
            country: address.country,
            id: advertId!,
          },
        },
      });
    }
  };

  const onSubmit = async () => {
    if (isDirty) {
      setIsLoading(true);
      await fetchSetAddress({
        variables: {
          input: {
            lat: address.location.lat,
            lng: address.location.lng,
            street: address.street,
            houseNumber: address.houseNumber,
            city: address.city,
            country: address.country,
            id: advertId!,
          },
        },
      });
      setIsLoading(false);
    }
    await router.push(Routes.adCreateHouseMedia);
  };

  const loadPlaces = async (value: string) => {
    const res = await GoogleMapService.getPlaces(value);
    return res;
  };

  const setPositionBeforeDragableMarker = (coord: { lat: number; lng: number }) => {
    setAddress((prevState) => {
      return {
        ...prevState!,
        location: {
          lat: coord.lat,
          lng: coord.lng,
        },
      };
    });
    setCurrentMarker((prevState) => {
      return {
        ...prevState,
        lat: coord.lat,
        lng: coord.lng,
      };
    });
  };

  const setDefaultAddress = () => {
    const defaultAddress = data?.apartmentAd__myApartmentAd.address;
    if (defaultAddress) {
      setCurrentMarker({
        lat: data.apartmentAd__myApartmentAd.address?.lat!,
        lng: data.apartmentAd__myApartmentAd.address?.lng!,
      });
      setCenter({
        lat: data.apartmentAd__myApartmentAd.address?.lat!,
        lng: data.apartmentAd__myApartmentAd.address?.lng!,
      });
      setAddress({
        location: { lat: defaultAddress.lat, lng: defaultAddress.lng },
        street: defaultAddress.street,
        houseNumber: defaultAddress.houseNumber,
        city: defaultAddress.city,
        country: defaultAddress.country,
      });
    }
  };

  useEffect(() => {
    setDefaultAddress();
  }, [data]);

  return (
    <AdvertLayout step={step} onSaveDraft={setAddressToDraft}>
      <Root onSubmit={handleSubmit(onSubmit)}>
        <div>
          <HeadTitle variant={TextVariants.SECONDARY} font="title_36_26_bold">
            {t('title')}
          </HeadTitle>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <>
                {!getDefaultValueLoading && (
                  <MapInput
                    {...field}
                    defaultValue={defaultAddress ? collectedAddress : ''}
                    setAddress={setAddress}
                    error={error}
                    setError={setError}
                    onLoadOptions={loadPlaces}
                    setCurrentMarker={setCurrentMarker}
                    setCenter={setCenter}
                  />
                )}
              </>
            )}
          />
          <Map
            onChangeCoordsToDrag={setPositionBeforeDragableMarker}
            currentMarker={currentMarker!}
            center={center}
            setCenter={setCenter}
          />
        </div>
        <ButtonsContainer>
          <StyledButton
            onClick={() => router.push(Routes.adCreateAboutHouse)}
            isFullWight
            type="button"
            text={t('buttons.secondary')}
            variant={ButtonVariant.SECONDARY}
          />
          <StyledButton
            type="submit"
            isLoading={isLoading}
            disabled={!address && !defaultAddress}
            isFullWight
            text={t('buttons.primary')}
          />
        </ButtonsContainer>
      </Root>
    </AdvertLayout>
  );
};
export default AddressHouse;

const Root = styled.form`
  padding: 40px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
    flex-direction: column;
    padding: 24px 16px 16px;
    height: 616px;
    justify-content: space-between;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 283px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    min-width: 167px;
  }
`;

const HeadTitle = styled(AppText)`
  margin-bottom: 32px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;
