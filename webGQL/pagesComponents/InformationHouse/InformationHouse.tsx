import { useClientSize } from 'hooks';
import { AdvertLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { formatTime, getCookie, setCookie } from 'utils';

import {
  RentPeriodType,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
} from '../../__generated__/types';
import { Routes } from '../../constains';
import { useSendToApproveAdvert } from '../../graphql/mutations/Advert/__generated__/sendToApproveAdvert.mutation';
import { useSetImportantInfo } from '../../graphql/mutations/Advert/__generated__/setImportnantInfo.mutation';
import { useGetAdvertLazyQuery } from '../../graphql/queries/Advert/__generated__/getAdvert.query';
import { StepProps } from '../../types/advert';
import { ButtonVariant } from '../../ui/Button/Button';
import { Accommodation, CancelSection, RulesSection, TimeSection } from './components';

type FormValues = {
  allowedToSmoke: boolean;
  allowedWithChildren: boolean;
  allowedToHangingOut: boolean;
  allowedWithPets: boolean;
  rentBookingType: ShortTermRentBookingType;
  arrivalTime: string;
  departureTime: string;
  cancellationPolicy: ShortTermRentCancellationPolicyType;
};

const InformationHouse: FC<StepProps> = ({ step }) => {
  const router = useRouter();
  const advertId = getCookie('advertId');
  const { getIsBreakpoint } = useClientSize();
  const [isLoading, setIsLoading] = useState(false);
  const [datesError, setDatesError] = useState('');

  const { t } = useTranslation('importantInfoPage');

  const [getAdvert, { data, loading: loadingForDefaultValues }] = useGetAdvertLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [publishAdvert] = useSendToApproveAdvert();
  const [fetchSetInfo] = useSetImportantInfo();

  const isFullForm =
    data?.apartmentAd__myApartmentAd.rentPeriodType === RentPeriodType.ShortTerm ||
    data?.apartmentAd__myApartmentAd.rentPeriodType === RentPeriodType.All;
  const isAllRent = data?.apartmentAd__myApartmentAd.rentPeriodType === RentPeriodType.All;
  const stepState = data?.apartmentAd__myApartmentAd;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      allowedToSmoke: false,
      allowedWithChildren: false,
      allowedToHangingOut: false,
      allowedWithPets: false,
      rentBookingType: ShortTermRentBookingType.Request,
      arrivalTime: '',
      departureTime: '',
    },
    mode: 'onChange',
  });

  const isDisabled = isFullForm ? !isDirty || !isValid : false;

  const formValues = getValues();

  const hasDefaultValues = isFullForm && !loadingForDefaultValues;

  const setInDraft = async () => {
    if (!isDisabled) {
      await setImportantInfo();
    }
  };

  const setImportantInfo = async () => {
    if (isFullForm) {
      await fetchSetInfo({
        variables: {
          input: {
            id: advertId!,
            allowedToHangingOut: formValues.allowedToHangingOut,
            allowedWithChildren: formValues.allowedWithChildren,
            allowedWithPets: formValues.allowedWithPets,
            allowedToSmoke: formValues.allowedToSmoke,
            arrivalTime: formValues.arrivalTime,
            cancellationPolicy: formValues.cancellationPolicy,
            departureTime: formValues.departureTime,
            rentBookingType: formValues.rentBookingType,
          },
        },
      });
    } else {
      await fetchSetInfo({
        variables: {
          input: {
            id: advertId!,
            allowedToHangingOut: formValues.allowedToHangingOut,
            allowedWithChildren: formValues.allowedWithChildren,
            allowedWithPets: formValues.allowedWithPets,
            allowedToSmoke: formValues.allowedToSmoke,
          },
        },
      });
    }
  };

  const publishAdverAndRedirect = async () => {
    await publishAdvert({
      variables: {
        input: {
          id: advertId!,
        },
      },
    });
    setIsLoading(false);
    setCookie('advertId', '');
    await router.push({
      pathname: Routes.myAds,
      query: {
        advertId,
      },
    });
  };

  const onSubmit = async (data: FormValues) => {
    let isError;
    if (isFullForm) {
      isError = formatTime(data.arrivalTime, data.departureTime);
    }
    if (isError) {
      setDatesError(isError);
    } else {
      setDatesError('');
      setIsLoading(true);
      if (isFullForm) {
        await fetchSetInfo({
          variables: {
            input: {
              id: advertId!,
              allowedToHangingOut: data.allowedToHangingOut,
              allowedWithChildren: data.allowedWithChildren,
              allowedWithPets: data.allowedWithPets,
              allowedToSmoke: data.allowedToSmoke,
              arrivalTime: data.arrivalTime,
              cancellationPolicy: data.cancellationPolicy,
              departureTime: data.departureTime,
              rentBookingType: data.rentBookingType,
            },
          },
        });
      } else {
        await fetchSetInfo({
          variables: {
            input: {
              id: advertId!,
              allowedToHangingOut: data.allowedToHangingOut,
              allowedWithChildren: data.allowedWithChildren,
              allowedWithPets: data.allowedWithPets,
              allowedToSmoke: data.allowedToSmoke,
            },
          },
        });
      }
      await publishAdverAndRedirect();
    }
  };

  const fetchAdvert = async () => {
    await getAdvert({
      variables: {
        input: {
          id: advertId!,
        },
      },
    });
  };

  const setValuesInForm = () => {
    reset({
      allowedToSmoke: stepState?.rules?.allowedToSmoke || false,
      allowedWithChildren: stepState?.rules?.allowedWithChildren || false,
      allowedToHangingOut: stepState?.rules?.allowedToHangingOut || false,
      allowedWithPets: stepState?.rules?.allowedWithPets || false,
      rentBookingType: stepState?.shortTermRent?.rentBookingType || ShortTermRentBookingType.Request,
      arrivalTime: stepState?.shortTermRent?.arrivalTime || '',
      departureTime: stepState?.shortTermRent?.departureTime || '',
      cancellationPolicy: stepState?.shortTermRent?.cancellationPolicy!,
    });
  };

  useEffect(() => {
    fetchAdvert();
  }, []);

  useEffect(() => {
    setValuesInForm();
  }, [data]);

  const isWidthSm = getIsBreakpoint('sm');
  const buttonText = isWidthSm ? t('buttons.publish') : t('buttons.primary');
  return (
    <AdvertLayout onSaveDraft={setInDraft} step={step}>
      <Root onSubmit={handleSubmit(onSubmit)}>
        {!isWidthSm && (
          <Title variant={TextVariants.SECONDARY} font="title_36_26_bold">
            {t('title')}
          </Title>
        )}

        {hasDefaultValues && (
          <TimeSection
            defaultArrivalTime={stepState?.shortTermRent?.arrivalTime}
            defaultDepartureTime={stepState?.shortTermRent?.departureTime}
            control={control}
            error={datesError}
            isAllRent={isAllRent}
          />
        )}
        <RulesSection control={control} />
        {isFullForm && <Accommodation isAllRent={isAllRent} control={control} />}
        {hasDefaultValues && (
          <CancelSection
            isAllRent={isAllRent}
            defaultValue={stepState?.shortTermRent?.cancellationPolicy}
            control={control}
          />
        )}
        <ButtonsContainer>
          <StyledButton
            onClick={() => router.push(Routes.adDescriptionHouse)}
            isFullWight
            type="button"
            text={t('buttons.secondary')}
            variant={ButtonVariant.SECONDARY}
          />
          <StyledButton type="submit" disabled={isDisabled} isLoading={isLoading} isFullWight text={buttonText} />
        </ButtonsContainer>
      </Root>
    </AdvertLayout>
  );
};

export default InformationHouse;

const Root = styled.form`
  padding: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 16px 16px;
  }
`;

const Title = styled(AppText)`
  margin-bottom: 40px;
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
    width: 167px;
    padding: 0;
  }
`;
