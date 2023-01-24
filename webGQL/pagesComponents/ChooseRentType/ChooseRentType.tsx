import { APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT, Routes } from 'constains';
import { AdvertLayout } from 'layouts/AdvertLayout';
import { AdvertId } from 'libs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Commission from 'pagesComponents/ChooseRentType/components/Commission/Commission';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { StepProps } from 'types/advert';
import { AppText, Button, MoneyInput, Selector } from 'ui';
import { SelectorSize } from 'ui/Selector/Selector';

import { RentPeriodType } from '../../__generated__/types';
import { CreateAdvert, useCreateAdvert } from '../../graphql/mutations/Advert/__generated__/createAdvert.mutation';
import { useEditFirstStep } from '../../graphql/mutations/Advert/__generated__/editFirstStep.mutation';
import { useGetFirstStepAdvertLazyQuery } from '../../graphql/queries/Advert/__generated__/getFirstStep.query';
import { getCookie, handleDivisionOnCategories, setCookie } from '../../utils';
import { getInput } from './util';

interface FormValues {
  rent: RentPeriodType;
  countForShortRent: string;
  countForLongRent: string;
}
const MAX_PRICE_SHORT = 4999;

const MAX_PRICE_LONG = 49999;

const ChooseRentType: FC<StepProps> = ({ step }) => {
  const [isLoadedInfo, setIsLoadedInfo] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('formatPage');
  const [getDefaultsValues] = useGetFirstStepAdvertLazyQuery();
  const advertId = getCookie('advertId');
  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm({
    defaultValues: {
      countForShortRent: '',
      rent: RentPeriodType.LongTerm,
      countForLongRent: '',
    },
    mode: 'onChange',
  });

  const onCompleted = (data: CreateAdvert) => {
    AdvertId(data.apartmentAd__create.apartmentAd.id);
    setCookie('advertId', data.apartmentAd__create.apartmentAd.id);
  };

  const [fetchCreateAdvert, { loading: isCreateLoading }] = useCreateAdvert({ onCompleted });
  const [fetchEditAdvert, { loading: isEditLoading }] = useEditFirstStep();

  const countForLongRent = watch('countForLongRent');

  const countForShortRent = watch('countForShortRent');
  const rent = watch('rent');

  useEffect(() => {
    if (rent === RentPeriodType.LongTerm) {
      clearErrors('countForShortRent');
    }
    if (rent === RentPeriodType.ShortTerm) {
      clearErrors('countForLongRent');
    }
  }, [rent]);

  const onSubmit = async (data: FormValues) => {
    const input = getInput(data);
    if (advertId) {
      await fetchEditAdvert({
        variables: {
          input: {
            id: advertId,
            ...input,
          },
        },
      });
    } else {
      await fetchCreateAdvert({
        variables: {
          input: {
            ...input,
          },
        },
      });
    }
    await router.push(Routes.adCreateHouseType);
  };

  useEffect(() => {
    if (advertId) {
      getDefaultsValues({
        variables: {
          input: {
            id: advertId,
          },
        },
      }).then((res) => {
        const data = res.data?.apartmentAd__myApartmentAd;
        const shortCost = String(data?.shortTermRent?.cost);
        const longCost = String(data?.longTermRent?.cost);
        reset({
          rent: data?.rentPeriodType,
          countForShortRent: handleDivisionOnCategories(shortCost.substring(0, shortCost.length - 2)) || '0',
          countForLongRent: handleDivisionOnCategories(longCost.substring(0, longCost.length - 2)) || '0',
        });
        setIsLoadedInfo(true);
      });
    }
  }, []);

  const renderPriceBox = {
    [RentPeriodType.All]: (
      <>
        <ContentSubTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
          {t('subtitles.price')}
        </ContentSubTitle>
        <PricesContainer>
          <PriceContainer>
            <MoneyContainer>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (+value.replaceAll(' ', '') < MAX_PRICE_LONG) {
                      return `Сумма должна быть не менее ${MAX_PRICE_LONG}`;
                    }
                  },
                }}
                name="countForLongRent"
                render={({ field }) => (
                  <MoneyInput
                    title={t('price.long.input.title')}
                    error={errors.countForLongRent?.message}
                    placeholder={t('price.long.input.placeholder')}
                    {...field}
                  />
                )}
              />
            </MoneyContainer>
            {countForLongRent && <Commission rentType={RentPeriodType.LongTerm} price={countForLongRent} percent={7} />}
          </PriceContainer>
          <PriceContainer>
            <MoneyContainer>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => {
                    if (+value.replaceAll(' ', '') < MAX_PRICE_SHORT) {
                      return `Сумма должна быть не менее ${MAX_PRICE_SHORT}`;
                    }
                  },
                }}
                name="countForShortRent"
                render={({ field }) => (
                  <MoneyInput
                    error={errors.countForShortRent?.message}
                    title={t('price.short.input.title')}
                    placeholder={t('price.short.input.placeholder')}
                    {...field}
                  />
                )}
              />
            </MoneyContainer>
            {countForShortRent && (
              <Commission rentType={RentPeriodType.ShortTerm} price={countForShortRent} percent={12} />
            )}
          </PriceContainer>
        </PricesContainer>
      </>
    ),
    [RentPeriodType.ShortTerm]: (
      <div>
        <ContentSubTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
          {t('subtitles.price')}
        </ContentSubTitle>
        <MoneyContainer key={RentPeriodType.ShortTerm}>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                if (+value.replaceAll(' ', '') < MAX_PRICE_SHORT) {
                  return `Сумма должна быть не менее ${APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT}`;
                }
              },
            }}
            name="countForShortRent"
            render={({ field }) => (
              <MoneyInput
                error={errors.countForShortRent?.message}
                placeholder={t('price.short.input.placeholder')}
                {...field}
              />
            )}
          />
        </MoneyContainer>
        {countForShortRent && <Commission rentType={RentPeriodType.ShortTerm} price={countForShortRent} percent={12} />}
      </div>
    ),
    [RentPeriodType.LongTerm]: (
      <div>
        <ContentSubTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
          {t('subtitles.price')}
        </ContentSubTitle>
        <MoneyContainer key={RentPeriodType.LongTerm}>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: (value) => {
                if (+value.replaceAll(' ', '') < MAX_PRICE_LONG) {
                  return 'Сумма должна быть не менее 50000';
                }
              },
            }}
            name="countForLongRent"
            render={({ field }) => (
              <MoneyInput
                error={errors.countForLongRent?.message}
                placeholder={t('price.long.input.placeholder')}
                {...field}
              />
            )}
          />
        </MoneyContainer>
        {countForLongRent && <Commission rentType={RentPeriodType.LongTerm} price={countForLongRent} percent={7} />}
      </div>
    ),
  };
  return (
    <AdvertLayout step={step}>
      <FirstStep>
        <ContentTitle variant={TextVariants.SECONDARY} font="title_36_26_bold">
          {t('title')}
        </ContentTitle>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <RentTypeSubTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
            {t('termRent.title')}
          </RentTypeSubTitle>
          <Controller
            control={control}
            name="rent"
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <SelectorsContainer>
                <StyledSelector
                  name="3"
                  onChange={() => onChange(RentPeriodType.LongTerm)}
                  description={t('termRent.long.description')}
                  checked={value === RentPeriodType.LongTerm}
                  size={SelectorSize.LONG}
                  text={t('termRent.long.title')}
                />
                <Selector
                  name="2"
                  onChange={() => onChange(RentPeriodType.ShortTerm)}
                  description={t('termRent.short.description')}
                  checked={value === RentPeriodType.ShortTerm}
                  size={SelectorSize.LONG}
                  text={t('termRent.short.title')}
                />
                <Selector
                  name="1"
                  description={t('termRent.all.description')}
                  checked={value === RentPeriodType.All}
                  onChange={() => onChange(RentPeriodType.All)}
                  size={SelectorSize.LONG}
                  text={t('termRent.all.title')}
                />
              </SelectorsContainer>
            )}
          />
          {renderPriceBox[rent]}
          <StyledButton
            text={t('buttons.primary')}
            isLoading={isCreateLoading || isEditLoading}
            disabled={(!isDirty && !isLoadedInfo) || !isValid}
          />
        </StyledForm>
      </FirstStep>
    </AdvertLayout>
  );
};

export default ChooseRentType;

const StyledButton = styled(Button)`
  margin-top: 32px;
  width: 100%;
  max-width: 283px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 100%;
    margin-top: 25px;
  }
`;

const FirstStep = styled.div`
  padding: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 16px 16px;
  }
`;

const ContentTitle = styled(AppText)`
  margin-bottom: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const ContentSubTitle = styled(AppText)`
  margin-bottom: 24px;
`;

const RentTypeSubTitle = styled(AppText)`
  margin-bottom: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 19px;
  }
`;

const StyledForm = styled.form``;

const SelectorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

const MoneyContainer = styled.div``;

const PricesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const PriceContainer = styled.div`
  width: 100%;
  max-width: 366px;
`;

const StyledSelector = styled(Selector)`
  p {
    margin-right: -5px;
  }
`;
