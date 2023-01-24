import { ApartmentRentPeriodType, ShortTermRentPaymentType } from '__generated__/types';
import { FEE_PERCENTS_SHORT_TERM } from 'constains';
import dayjs from 'dayjs';
import { useSendContractRequest } from 'graphql/mutations/Advert/__generated__/sendContractRequest.mutation';
import { useGetShortTermApartment } from 'graphql/queries/Apartments/__generated__/getShortTermApartment.gql';
import { useGetCards } from 'graphql/queries/User/__generated__/getCards.query';
import { useClientSize } from 'hooks';
import { MainLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { GuestField } from 'pagesComponents/HomePage/components/Header/components';
import { FC, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { notify } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button, DatePicker, IconButton, RadioButton, Switch, Textarea, Tooltip } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { DatePickerInputEnum } from 'ui/DatePicker/DatePicker';
import { IconButtonSize } from 'ui/IconButton/IconButton';
import { TooltipHorizontalPositionEnum, TooltipPositionEnum } from 'ui/Tooltip/Tooltip';
import { getPercentOnRent, handleDivisionOnCategories, minDateForRequest } from 'utils';

import { Add, InfoCircleFilled, Mastercard, Visa } from '../../../public/svg/components';
import { HeaderBooking, PaymentFormat, PriceDetail, SelectedHousing } from './components';
import CancellationRules from './components/CancellationRules/CancellationRules';

const BookingPage: FC = () => {
  const { t } = useTranslation('bookingPage', { keyPrefix: 'page' });

  const [isFullPayment, setIsFullPayment] = useState(false);
  const [isBusinessTrip, setIsBusinessTrip] = useState(false);
  const [isCorrectDate, setIsCorrectDate] = useState(true);
  const { getIsBreakpoint } = useClientSize();
  const router = useRouter();

  const { dateStartInitial, dateEndInitial, numberOfGuests, numberOfChilds, id, nightsInitial, numberOfPets } =
    router.query;

  const [bookingDays, setBookingDays] = useState<number | undefined>(Number(nightsInitial));
  const [dates, setDates] = useState<Date[] | string[]>([dateStartInitial as string, dateEndInitial as string]);

  const [sendContractRequest, { loading }] = useSendContractRequest();

  const { data: cardData } = useGetCards();
  const cards = cardData?.innopay__myCards;
  const defaultPayment = cards?.[0]?.id;

  const { data } = useGetShortTermApartment({
    variables: {
      id: { id: id as string },
    },
    fetchPolicy: 'cache-and-network',
  });

  const form = useForm<FormData>({
    defaultValues: {
      dateStart: dayjs(dateStartInitial as string).format('DD MMMM YYYY') || '',
      dateEnd: dayjs(dateEndInitial as string).format('DD MMMM YYYY') || '',
      comment: '',
      payment: defaultPayment,
      numberOfGuests: Number(numberOfGuests) || 1,
      numberOfChilds: Number(numberOfChilds) || 0,
      numberOfPets: Number(numberOfPets) || 0,
    },
    mode: 'onChange',
  });

  const { handleSubmit, control, getValues, watch } = form;

  const onSubmit = async (data: FormData) => {
    const rentPaymentType = isFullPayment ? ShortTermRentPaymentType.Full : ShortTermRentPaymentType.Partial;

    await sendContractRequest({
      variables: {
        input: {
          apartmentAdId: apartmentAdId!,
          apartmentRentPeriodType: ApartmentRentPeriodType.ShortTerm,
          arrivalDate: dayjs(dates[0]).format('YYYY-MM-DD'),
          departureDate: dayjs(dates[1]).format('YYYY-MM-DD'),
          rentPaymentType,
          comment: data.comment,
          rentBookingType,
          cardId: data.payment,
          guests: {
            numberOfAdult: data.numberOfGuests,
            numberOfChildren: data.numberOfChilds,
            numberOfPets: data.numberOfPets,
          },
        },
      },
      onCompleted: () => notify(t('requestSuccessful')),
      onError: () => notify(t('incorrectDates')),
    });
  };

  const validationDate = () => {
    const dateStart = dayjs(dates?.[0]);
    const dateEnd = dayjs(dates?.[1]);

    const dateDifferenceInDays = dateEnd.diff(dateStart, 'day');
    setBookingDays(dateDifferenceInDays);

    const parsedStartDate = Date.parse(String(dates[0]));

    const hasDateDifferenceInDays = dateDifferenceInDays > 0;
    const isDateMoreThanMinDate = parsedStartDate >= parsedMinDate;
    const isCorrectDate = isDateMoreThanMinDate && hasDateDifferenceInDays;

    setIsCorrectDate(isCorrectDate);
  };

  watch(validationDate);

  const apartment = data?.apartmentAd__find_shortTermRentAd?.data?.apartmentAd;
  const cost = Number(data?.apartmentAd__find_shortTermRentAd?.data?.cost || '');
  const apartmentAdId = data?.apartmentAd__find_shortTermRentAd?.data?.apartmentAdId;
  const rentBookingType = data?.apartmentAd__find_shortTermRentAd?.data?.rentBookingType;

  const title = apartment?.description?.name || '';
  const photo = apartment?.photos[0].fileKey || '';
  const region = apartment?.address?.region ? `${apartment?.address?.region}, ` : '';
  const city = apartment?.address?.city ? `${apartment?.address?.city}, ` : '';
  const street = apartment?.address?.street ? `ул. ${apartment?.address?.street}, ` : '';
  const houseNumber = apartment?.address?.houseNumber ? `${apartment?.address?.houseNumber}` : '';
  const address = `${region}${city}${street}${houseNumber}`;
  const numberOfGuestsForApartment = apartment?.details?.numberOfGuests;
  const apartmentType = apartment?.apartmentType || '';

  const serviceCommission = Math.round(getPercentOnRent(cost, FEE_PERCENTS_SHORT_TERM));
  const total = cost + serviceCommission;
  const showTotal = handleDivisionOnCategories(String(total));

  const isWidthLgm = getIsBreakpoint('lgm');
  const isWidthSm = getIsBreakpoint('sm');

  const parsedMinDate = Date.parse(minDateForRequest.toISOString());

  const isCards = cards?.length === 0;

  return (
    <MainLayout headTitle={t('headTitle')} childrenForHeader={<HeaderBooking />}>
      <Container>
        <MainColumn>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SelectedHousing
              address={address}
              guestsNum={`${numberOfGuestsForApartment} `}
              pictureSrc={photo}
              price={showTotal}
              rentType={apartmentType}
              title={title}
            />
            <Section>
              <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_medium' : 'title_22_18_bold'}>
                {t('yourBooking')}
              </AppText>
              <InputsContainer>
                <InputWrapper>
                  <FormProvider {...form}>
                    <DatePicker
                      selectsRange
                      areTwoMonth
                      onChange={(date) => setDates(date as Date[])}
                      inputType={DatePickerInputEnum.multiple}
                      isSecondaryMultipleDateInput
                    />
                  </FormProvider>
                </InputWrapper>
                <InputWrapper>
                  <StyledGuestField control={control} getValues={getValues} isFullWidth />
                </InputWrapper>
              </InputsContainer>
            </Section>
            <SwitchSection>
              <TooltipContainer>
                <StyledAppTextTooltip
                  variant={TextVariants.SECONDARY}
                  font={isWidthSm ? 'title_22_18_medium' : 'title_22_18_bold'}>
                  {t('businessTrip')}
                </StyledAppTextTooltip>
                <Tooltip
                  text={t('tooltipText')}
                  horizontalPosition={TooltipHorizontalPositionEnum.END}
                  position={TooltipPositionEnum.BOTTOM}>
                  <InfoCircleFilled />
                </Tooltip>
              </TooltipContainer>
              <SwitchContainer>
                <AppText variant={TextVariants.SECONDARY} font="body_20_14_regular">
                  {isBusinessTrip ? t('yes') : t('no')}
                </AppText>
                <Switch checked={isBusinessTrip} onChange={() => setIsBusinessTrip(!isBusinessTrip)} />
              </SwitchContainer>
            </SwitchSection>
            <PaymentFormat
              total={total * bookingDays!}
              isFullPayment={isFullPayment}
              setIsFullPayment={setIsFullPayment}
            />
            {isWidthLgm && (
              <PriceDetail price={showTotal} nights={bookingDays} total={total} isCorrectDate={isCorrectDate} />
            )}
            <PaymentMethodContainer>
              <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_medium' : 'title_22_18_bold'}>
                {t('titlePaymentMethod')}
              </AppText>
              {isCards ? (
                <NewCardContainer>
                  <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
                    {t('addNewCard')}
                  </AppText>
                  <IconButton IconComponent={Add} size={IconButtonSize.SMALL} />
                </NewCardContainer>
              ) : (
                <CardsContainer>
                  <form>
                    {cards?.map((card, index) => (
                      <Controller
                        key={index}
                        control={control}
                        defaultValue={defaultPayment || ''}
                        name="payment"
                        render={({ field: { value, onChange } }) => (
                          <Card key={index}>
                            <RadioButton
                              name={String(index)}
                              defaultChecked={index === 0}
                              checked={value === card.id}
                              onChange={() => {
                                onChange(card.id);
                              }}
                            />
                            <IconContainer>{card.cardType === 'VISA' ? <Visa /> : <Mastercard />}</IconContainer>
                            <CircleContainer>
                              <Circle />
                              <Circle />
                              <Circle />
                              <Circle />
                            </CircleContainer>
                            <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
                              {card.panMasked}
                            </AppText>
                          </Card>
                        )}
                      />
                    ))}
                  </form>
                </CardsContainer>
              )}
              <ButtonContainer>
                <Button
                  text={t('chooseAnotherPaymentMethod')}
                  variant={ButtonVariant.SECONDARY}
                  size={ButtonSize.SMALL}
                  isFullWight
                />
              </ButtonContainer>
            </PaymentMethodContainer>
            <CommentContainer>
              <AppText variant={TextVariants.SECONDARY} font={isWidthSm ? 'title_22_18_medium' : 'title_22_18_bold'}>
                {t('titleComment')}
              </AppText>
              <Controller
                control={control}
                name="comment"
                render={({ field }) => <StyledTextarea placeholder={t('placeholder')} {...field} />}
              />
            </CommentContainer>
            <CancellationRules />
            <StyledButton text={t('textButton')} type="submit" disabled={!isCorrectDate} isLoading={loading} />
          </form>
        </MainColumn>
        {!isWidthLgm && (
          <PriceDetail price={showTotal} nights={bookingDays} total={total} isCorrectDate={isCorrectDate} />
        )}
      </Container>
    </MainLayout>
  );
};

export default BookingPage;

type FormData = {
  comment: string;
  payment: string;
  dateStart: string;
  dateEnd: string;
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;
};

const SwitchSection = styled.div`
  display: flex;
  max-width: 400px;
  width: 100%;
  margin-top: 32px;
  justify-content: space-between;
`;

const SwitchContainer = styled.div`
  display: flex;
  gap: 14px;
`;

const StyledAppTextTooltip = styled(AppText)`
  margin-right: 10px;
`;

const TooltipContainer = styled.div`
  display: flex;
`;

const StyledGuestField = styled(GuestField)`
  button {
    border: none;
    padding: 7px 16px;
    gap: 4px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const InputsContainer = styled.div`
  display: flex;
  margin-top: 24px;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    flex-wrap: nowrap;
    gap: 48px;
  }
`;

const Section = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const StyledButton = styled(Button)`
  min-width: 288px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 64px;
    min-width: 343px;
  }
`;

const MainColumn = styled.div`
  width: 100%;
  flex: 1;

  @media (min-width: ${BreakpointsEnum.lgm}px) {
    width: 848px;
  }
`;

const Container = styled.div`
  display: flex;
  margin-top: -5px;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;

  @media (min-width: ${BreakpointsEnum.s}px) {
    margin-top: -21px;
  }
`;

const StyledTextarea = styled(Textarea)`
  margin-top: 24px;
  textarea {
    width: 100%;
    max-width: none;
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-top: 20px;
  }
`;

const ButtonContainer = styled.div`
  width: 288px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    width: 100%;
  }
`;

const IconContainer = styled.div`
  margin-left: 18px;
  margin-right: 8px;
`;

const CircleContainer = styled.div`
  display: flex;
  margin-right: 8px;
  align-items: center;
  gap: 3px;
`;

const Circle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const Card = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: 100%;
  padding: 15px 15px 15px 18px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  height: 64px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    width: 624px;
    padding: 19px 15px 19px 18px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 16px;
`;

const NewCardContainer = styled.div`
  display: flex;
  margin-top: 24px;
  width: 624px;
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const PaymentMethodContainer = styled.div`
  margin-top: 30px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-top: 15px;
  }
`;

const CommentContainer = styled.div`
  margin-top: 32px;
`;
