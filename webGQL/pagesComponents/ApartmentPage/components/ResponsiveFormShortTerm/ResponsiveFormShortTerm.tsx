import { FEE_PERCENTS_SHORT_TERM, Routes } from 'constains';
import dayjs from 'dayjs';
import useAuthAction from 'hooks/useAuthAction';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Button, MultipleDatePicker, NumberInput, SignedInput } from 'ui';
import { getPercentOnRent, handleDivisionOnCategories, minDateForRequest, pluralHandler } from 'utils';

import { ArrowLeft } from '../../../../../public/svg/components';
import { PriceDetail } from './components';

type ResponsiveFormShortTermProps = {
  cost: number;
};

const ResponsiveFormShortTerm: FC<ResponsiveFormShortTermProps> = ({ cost }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'forms' });
  const [isShowGuestForm, setIsShowGuestForm] = useState(false);
  const [bookingDays, setBookingDays] = useState(0);
  const [isCorrectDate, setIsCorrectDate] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const { control, getValues, handleSubmit, watch } = useForm<DataType>({
    defaultValues: {
      dateStart: '',
      dateEnd: '',
      numberOfGuests: 1,
      numberOfChilds: 0,
      numberOfPets: 0,
    },
    mode: 'onChange',
  });

  const routeToBooking = (data: DataType) => {
    router.push({
      pathname: Routes.booking,
      query: {
        dateStartInitial: data.dateStart,
        dateEndInitial: data.dateEnd,
        numberOfGuests: data.numberOfGuests,
        numberOfChilds: data.numberOfChilds,
        numberOfPets: data.numberOfPets,
        nightsInitial: Number(bookingDays),
        id,
      },
    });
  };

  const { action } = useAuthAction(routeToBooking);

  const onSubmit = async (data: DataType) => {
    await action(data);
  };

  const serviceCommission = Math.round(getPercentOnRent(cost, FEE_PERCENTS_SHORT_TERM));
  const total = cost + serviceCommission;
  const showTotal = handleDivisionOnCategories(String(total));
  const parsedMinDate = Date.parse(minDateForRequest.toISOString());

  const validationDate = (value: DataType) => {
    const dateStart = dayjs(value.dateStart);
    const dateEnd = dayjs(value.dateEnd);
    const dateDifferenceInDays = dateEnd.diff(dateStart, 'day');
    setBookingDays(dateDifferenceInDays);
    if (dateDifferenceInDays > 0) setIsCorrectDate(true);
    if (dateDifferenceInDays <= 0) setIsCorrectDate(false);
    if (Date.parse(value.dateStart as string) < parsedMinDate) setIsCorrectDate(false);
  };

  const quantity = getValues(['numberOfGuests', 'numberOfChilds', 'numberOfPets']);
  const single = [t('singleGuest'), t('singleChild'), t('singlePet')];
  const plural = [t('pluralGuests'), t('pluralChilds'), t('pluralPets')];

  const propsForMultiInputs = [
    { title: t('formArrival'), placeholder: t('placeholderWhen'), name: 'dateStart' },
    { title: t('formDeparture'), placeholder: t('placeholderWhen'), name: 'dateEnd' },
  ];

  useEffect(() => {
    const subscription = watch((value) => validationDate(value as DataType));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <StyledApp variant={TextVariants.SECONDARY} font="title_22_18_bold">
          {t('booking')}
        </StyledApp>
        <StyledMultipleDatePicker control={control} defaultsInputsVariables={propsForMultiInputs} />
        <StyledGuestsInput
          title={t('formGuestNum')}
          value={pluralHandler(quantity, plural, single)}
          onClick={(e) => {
            e.preventDefault();
            setIsShowGuestForm(true);
          }}
        />
        <PriceDetail price={showTotal} nights={bookingDays} total={total} isCorrectDate={isCorrectDate} />
      </Content>
      <Button text={t('continue')} isFullWight disabled={!isCorrectDate} />
      {isShowGuestForm && (
        <GuestForm>
          <div>
            <HighContainer>
              <StyledArrowLeft onClick={() => setIsShowGuestForm(false)} />
              <StyledGuestsInput
                title=""
                value={pluralHandler(quantity, plural, single)}
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </HighContainer>
            <Container>
              <ModalInputWithBorder title={t('titleGuest')} name="numberOfGuests" initialValue={1} control={control} />
              <ModalInputWithBorder title={t('titleChilds')} name="numberOfChilds" initialValue={0} control={control} />
              <ModalInput title={t('titlePets')} name="numberOfPets" initialValue={0} control={control} />
            </Container>
          </div>
          <Button text={t('continue')} isFullWight onClick={() => setIsShowGuestForm(false)} />
        </GuestForm>
      )}
    </StyledForm>
  );
};

export default ResponsiveFormShortTerm;

type DataType = {
  dateStart: string;
  dateEnd: string;
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;
};

const StyledArrowLeft = styled(ArrowLeft)`
  margin-top: 16px;
`;

const HighContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 16px;
`;

const GuestForm = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  height: calc(100vh - 72px);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme: { colors } }) => colors.greyScale[0]}; ;
`;

const StyledMultipleDatePicker = styled(MultipleDatePicker)`
  margin-top: 32px;
  max-width: 100% !important;
  width: 100% !important;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
  button {
    font-weight: 500 !important;
    padding: 7px 0 1px 16px !important;
  }
`;

const StyledApp = styled(AppText)`
  margin-top: 10px;
  margin-left: 32px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 88px);
`;

const Content = styled.div``;

const Container = styled.div`
  margin-top: 17px;
  width: 100%;
`;

const StyledGuestsInput = styled(SignedInput)`
  width: 100%;
  margin-top: 16px;
  button {
    background: ${({ theme: { colors } }) => colors.greyScale[10]} !important;
    padding: 9px 16px 11px !important;
  }
`;

const ModalInput = styled(NumberInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  `}
`;

const ModalInputWithBorder = styled(NumberInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
  `}
`;
