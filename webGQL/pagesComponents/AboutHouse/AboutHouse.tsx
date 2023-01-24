import { AdvertLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button, NumberInput, Selector } from 'ui';
import { getCookie } from 'utils';

import { Routes } from '../../constains';
import { useSetDetailsHouse } from '../../graphql/mutations/Advert/__generated__/setDetailsHouse.mutation';
import { useGetThirdStep } from '../../graphql/queries/Advert/__generated__/getThirdStep.query';
import { StepProps } from '../../types/advert';
import { ButtonVariant } from '../../ui/Button/Button';
import { IconButtonSize } from '../../ui/IconButton/IconButton';

interface FormValues {
  numberOfRooms: string;
  numberOfGuests: string;
}

const AboutHouse: FC<StepProps> = ({ step }) => {
  const { t } = useTranslation('aboutHousePage');
  const advertId = getCookie('advertId');
  const [fetchSetDetails] = useSetDetailsHouse();
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading: loadingForDefaultValues } = useGetThirdStep({
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        id: advertId!,
      },
    },
  });

  const guests = data?.apartmentAd__myApartmentAd?.details?.numberOfGuests;

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      numberOfRooms: '',
      numberOfGuests: '',
    },
    mode: 'onChange',
  });

  const setDetails = async () => {
    setIsLoading(true);
    const data = getValues();
    await fetchSetDetails({
      variables: {
        input: {
          id: getCookie('advertId')!,
          numberOfGuests: Number(data.numberOfGuests),
          numberOfRooms: Number(data.numberOfRooms),
        },
      },
    });
    setIsLoading(false);
  };

  const setDetailsInDraft = async () => {
    if (isDirty && isValid) {
      const data = getValues();
      await fetchSetDetails({
        variables: {
          input: {
            id: getCookie('advertId')!,
            numberOfGuests: Number(data.numberOfGuests),
            numberOfRooms: Number(data.numberOfRooms),
          },
        },
      });
    }
  };

  const onSubmit = async () => {
    if (isDirty) {
      await setDetails();
    }
    await router.push(Routes.adCreateAddress);
  };

  const selectorsArray = useMemo(() => {
    return [
      { title: t('rooms.studio'), value: '0' },
      { title: '1', value: '1' },
      { title: '2', value: '2' },
      { title: '3', value: '3' },
      { title: '4', value: '4' },
      { title: '5', value: '5' },
      { title: '6', value: '6' },
      { title: '7', value: '7' },
      { title: '8+', value: '8' },
    ];
  }, [t]);

  const router = useRouter();

  const LinkingToNextStep = () => (event: ChangeEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(Routes.adCreateHouseType);
  };

  useEffect(() => {
    const details = data?.apartmentAd__myApartmentAd.details;
    if (details) {
      reset({
        numberOfGuests: String(details?.numberOfGuests) || '0',
        numberOfRooms: String(details?.numberOfRooms) || '0',
      });
    }
  }, [data]);

  const isDisabled = (!isDirty && !data) || !isValid;

  return (
    <AdvertLayout step={step} onSaveDraft={setDetailsInDraft}>
      <Root onSubmit={handleSubmit(onSubmit)}>
        <Title variant={TextVariants.SECONDARY} font="title_36_26_bold">
          Подробнее о жилье
        </Title>
        <InfoContainer>
          <CountRooms>
            <ContentSubTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {t('rooms.title')}
            </ContentSubTitle>
            <Controller
              name="numberOfRooms"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <RoomsSelectorsContainer>
                  {selectorsArray.map((selector, index) =>
                    index ? (
                      <StyledSelector
                        name={selector.title}
                        text={selector.title}
                        onChange={() => onChange(selector.value)}
                        checked={value === selector.value}
                        key={index}
                      />
                    ) : (
                      <StyledBigSelector
                        name={selector.title}
                        text={selector.title}
                        onChange={() => onChange(selector.value)}
                        checked={value === selector.value}
                        key={index}
                      />
                    ),
                  )}
                </RoomsSelectorsContainer>
              )}
            />
          </CountRooms>
          <GuestsCountContainer>
            <ContentSubTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {t('guests.title')}
            </ContentSubTitle>
            {!loadingForDefaultValues && (
              <StyledNumberInput
                buttonSize={IconButtonSize.NORMAL}
                isRequired
                name="numberOfGuests"
                initialValue={guests || 0}
                control={control}
              />
            )}
          </GuestsCountContainer>
        </InfoContainer>
        <ButtonsContainer>
          <StyledButton
            onClick={() => router.push(Routes.adCreateHouseType)}
            isFullWight
            type="button"
            text={t('buttons.secondary')}
            variant={ButtonVariant.SECONDARY}
          />
          <StyledButton
            type="submit"
            isFullWight
            text={t('buttons.primary')}
            isLoading={isLoading}
            disabled={isDisabled}
            onClick={LinkingToNextStep}
          />
        </ButtonsContainer>
      </Root>
    </AdvertLayout>
  );
};

export default AboutHouse;

const Root = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 0 16px 16px;
    height: 70vh;
    justify-content: space-between;
  }
`;

const Title = styled(AppText)`
  margin-bottom: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const ContentSubTitle = styled(AppText)`
  margin-bottom: 24px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 16px;
  }
`;
const InfoContainer = styled.div``;
const CountRooms = styled.div``;

const RoomsSelectorsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    overflow: scroll;
    margin-bottom: 22px;
    padding-bottom: 10px;
    padding-right: 16px;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledBigSelector = styled(Selector)`
  width: 74px !important;
  min-width: 74px;
  padding: 0;
  p {
    ${({ theme: { typography } }) => typography.caption_16_12_regular}
  }
`;

const StyledSelector = styled(Selector)`
  width: 40px !important;
  height: 40px !important;
  padding: 0;
  min-width: 40px;

  justify-content: center;
  align-items: center;
  h6 {
    ${({ theme: { typography } }) => typography.caption_16_12_regular}
  }
`;

const GuestsCountContainer = styled.div``;

const StyledNumberInput = styled(NumberInput)`
  padding: 0;
  div {
    padding: 0;
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
    width: 167.5px;
  }
`;
