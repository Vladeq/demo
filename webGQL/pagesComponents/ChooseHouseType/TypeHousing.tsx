import { Routes } from 'constains';
import { AdvertLayout } from 'layouts/AdvertLayout';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { StepProps } from 'types/advert';
import { AppText, Button, Selector } from 'ui';
import { ButtonVariant } from 'ui/Button/Button';
import { SelectorSize } from 'ui/Selector/Selector';
import { getCookie, setCookie } from 'utils';

import { ApartHotel, Flat, GuestHouse, Hostel, House, MiniHotel, Room } from '../../../public/svg/components';
import { ApartmentType } from '../../__generated__/types';
import { SetHouseType, useSetHouseType } from '../../graphql/mutations/Advert/__generated__/setHouseType.mutation';
import { useGetSecondStep } from '../../graphql/queries/Advert/__generated__/getSecondStep.query';

const TypeHousing: FC<StepProps> = ({ step }) => {
  const { t } = useTranslation('typeHousingPage');
  const advertId = getCookie('advertId');
  const [isLoading, setIsLoading] = useState(false);

  const onCompleted = (data: SetHouseType) => {
    setCookie('advertId', data.apartmentAd__edit_type.apartmentAd.id);
  };

  const [fetchSetHouseType] = useSetHouseType({ onCompleted });
  const { data } = useGetSecondStep({ fetchPolicy: 'cache-and-network', variables: { input: { id: advertId! } } });

  const getArraySelectors = useMemo(() => {
    return [
      { icon: Flat, title: t('selectors.flat'), value: ApartmentType.Flat },
      { icon: Room, title: t('selectors.room'), value: ApartmentType.Room },
      { icon: House, title: t('selectors.house'), value: ApartmentType.Cottage },
      { icon: Hostel, title: t('selectors.hostel'), value: ApartmentType.Hostel },
      { icon: MiniHotel, title: t('selectors.miniHotel'), value: ApartmentType.MiniHotel },
      { icon: GuestHouse, title: t('selectors.guestHome'), value: ApartmentType.Guesthouse },
      { icon: ApartHotel, title: t('selectors.apart'), value: ApartmentType.Aparthotel },
    ];
  }, [t]);

  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      housingType: ApartmentType.Flat,
    },
  });

  const router = useRouter();

  const setHouseType = async () => {
    setIsLoading(true);
    const data = getValues();
    await fetchSetHouseType({
      variables: {
        input: {
          id: getCookie('advertId')!,
          apartmentType: data.housingType,
        },
      },
    });
    setIsLoading(false);
  };

  const setHouseTypeInDraft = async () => {
    const data = getValues();
    await fetchSetHouseType({
      variables: {
        input: {
          id: getCookie('advertId')!,
          apartmentType: data.housingType,
        },
      },
    });
  };

  const onSubmit = async () => {
    await setHouseType();
    await router.push(Routes.adCreateAboutHouse);
  };

  useEffect(() => {
    const type = data?.apartmentAd__myApartmentAd.apartmentType;
    reset({
      housingType: type,
    });
  }, [data]);

  return (
    <AdvertLayout step={step} onSaveDraft={setHouseTypeInDraft}>
      <Root onSubmit={handleSubmit(onSubmit)}>
        <Title variant={TextVariants.SECONDARY} font="title_36_26_bold">
          Выберите тип жилья
        </Title>
        <SelectorsContainer>
          {getArraySelectors.map((selector, index) => (
            <Controller
              name="housingType"
              control={control}
              key={index}
              render={({ field: { value, onChange } }) => (
                <StyledSelector
                  text={selector.title}
                  name={String(index)}
                  onChange={() => onChange(selector.value)}
                  checked={value === selector.value}
                  LeftIconComponent={selector.icon}
                  size={SelectorSize.LONG}
                />
              )}
            />
          ))}
        </SelectorsContainer>
        <ButtonsContainer>
          <StyledButton
            onClick={() => router.push(Routes.adCreate)}
            isFullWight
            type="button"
            text={t('buttons.secondary')}
            variant={ButtonVariant.SECONDARY}
          />
          <StyledButton isLoading={isLoading} type="submit" isFullWight text={t('buttons.primary')} />
        </ButtonsContainer>
      </Root>
    </AdvertLayout>
  );
};

export default TypeHousing;

const StyledSelector = styled(Selector)`
  max-width: 366px;
  max-height: 56px;

  h6 {
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 20px !important;
  }
`;

const SelectorsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 16px;
  }
`;

const Root = styled.form`
  padding: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 16px 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 283px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 167.5px;
  }
`;

const Title = styled(AppText)`
  margin-bottom: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;
