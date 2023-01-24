import { monthOptions } from 'constains';
import { client } from 'libs';
import { useTranslation } from 'next-i18next';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { dayjs } from 'services';
import styled, { css } from 'styled-components';
import { OptionType, TextVariants } from 'types';
import { AppText, Button, DatePicker, DropdownDefault, Tooltip } from 'ui';
import { TooltipHorizontalPositionEnum, TooltipPositionEnum } from 'ui/Tooltip/Tooltip';
import { areIntersected, formatDateToRange } from 'utils';
import { v4 } from 'uuid';

import { InfoCircleFilled } from '../../../../../public/svg/components';
import { ApartmentAdStatusType } from '../../../../__generated__/types';
import { useSetAvailableSettings } from '../../../../graphql/mutations/Advert/__generated__/setAvailableSettings.mutation';
import { getMyApartmentAdsDocument } from '../../../../graphql/queries/MyAds/__generated__/getMyApartmentAds.query';
import { DateTab } from '../DateTab';

type SetAvailableContainerProps = {
  id: string;
  onClose: () => void;
};

type LockedDateById = {
  id: string;
  startDate: string;
  endDate: string;
};

type FormType = {
  dates: Array<LockedDateById>;
  access: OptionType;
};

const SetAvailableContainer: FC<SetAvailableContainerProps> = ({ id, onClose }) => {
  const { t } = useTranslation(['ui', 'common']);
  const [setAvailableSettings, { loading }] = useSetAvailableSettings();

  const { control, handleSubmit, getValues, setValue, watch, reset, setError } = useForm<FormType>({
    defaultValues: {
      dates: [],
      access: { label: '', value: '' },
    },
  });

  const setDefaultValues = () => {
    const allAds = client.readQuery({
      query: getMyApartmentAdsDocument,
      variables: { input: { status: ApartmentAdStatusType.Published } },
    }).apartmentAd__myApartmentAd_unionRentPeriods;

    const currentAdvert = allAds.apartmentAdShortTermRent.find(
      (ad: { apartmentAdId: string }) => ad.apartmentAdId === id,
    ).apartmentAd.shortTermRent;
    const defaultMonth = monthOptions.find((option) => option.value === String(currentAdvert?.bookingAccessInMonths));
    const defaultLockedDates = currentAdvert?.lockedDates.map((date: LockedDateById) => {
      return { ...date, id: v4() };
    });

    reset({
      dates: defaultLockedDates,
      access: defaultMonth,
    });
  };

  useEffect(() => {
    setDefaultValues();
  }, [t]);

  const lockedDates = watch('dates');

  const onSelectDate = (date: Date | (Date | null)[] | null, onChange: (value: any) => void, prevValue: any) => {
    if (date && Array.isArray(date)) {
      if (date[1] && date[0]) {
        const start = date[0].toString();
        const end = date[1].toString();
        onChange([
          ...prevValue,
          {
            id: v4(),
            startDate: dayjs(start).format('YYYY-MM-DD').toString(),
            endDate: dayjs(end).format('YYYY-MM-DD').toString(),
          },
        ]);
      }
    } else {
      const start = date!.toString();
      onChange([
        ...prevValue,
        {
          id: v4(),
          startDate: dayjs(start).format('YYYY-MM-DD').toString(),
          endDate: dayjs(start).format('YYYY-MM-DD').toString(),
        },
      ]);
    }
  };

  const deleteLockedDate = (id: string) => {
    const dates = getValues('dates');
    const filteredLockedDates = dates.filter((date) => date.id !== id);
    setValue('dates', filteredLockedDates);
  };

  const onSubmit = async () => {
    const { dates, access } = getValues();
    const lockedDates = dates.map((elem) => {
      return {
        startDate: elem?.startDate,
        endDate: elem?.endDate,
      };
    });

    if (areIntersected(lockedDates)) {
      setError('dates', { message: 'error' });
    } else {
      await setAvailableSettings({
        variables: {
          input: {
            lockedDates,
            id,
            bookingAccessInMonths: Number(access.value),
          },
        },
      });
      await onClose();
    }
  };

  const renderLockedDates = () => {
    return lockedDates.map((date) => {
      const formattedDates =
        date.startDate !== date.endDate
          ? `${formatDateToRange(`${date.startDate} - ${date.endDate}`)}`
          : `${formatDateToRange(`${date.startDate}`)}`;
      return <DateTab key={date.id} text={formattedDates} onDeleteDate={deleteLockedDate} id={date.id} />;
    });
  };

  return (
    <MainContainer>
      <Content onSubmit={handleSubmit(onSubmit)}>
        <SetDateContainer>
          <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
            {t('ui:myAdsCard.setAvailableConteiner.blockDate')}
          </AppText>
          <DatePickerContainer>
            <Controller
              name="dates"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DatePicker
                  placeholderText={t('ui:datePicker.placeholder')}
                  isEmpty
                  selectsRange
                  isButton
                  minDate={new Date()}
                  onDateSubmit={(date) => onSelectDate(date, onChange, value)}
                  onChange={(date) => onSelectDate(date, onChange, value)}
                />
              )}
            />
          </DatePickerContainer>
        </SetDateContainer>
        <TabsContainer>{renderLockedDates()}</TabsContainer>
        <SetBookingContainer>
          <TextContainer>
            <BookingText variant={TextVariants.SECONDARY} font="body_24_16_medium">
              {t('ui:myAdsCard.setAvailableConteiner.setBooking')}
            </BookingText>
            <Tooltip
              text={t('ui:myAdsCard.setAvailableConteiner.setBookingInfo')}
              horizontalPosition={TooltipHorizontalPositionEnum.CENTER}
              position={TooltipPositionEnum.BOTTOM}>
              <InfoCircleFilled />
            </Tooltip>
          </TextContainer>
          <DropDownContainer>
            <Controller
              control={control}
              name="access"
              render={({ field: { onChange, value } }) => (
                <DropdownDefault onChange={onChange} isSearchable={false} selected={value} options={monthOptions} />
              )}
            />
          </DropDownContainer>
        </SetBookingContainer>
      </Content>
      <ButtonContainer onClick={onSubmit}>
        <StyledButton type="button" text={t('ui:buttons.save')} isLoading={loading} />
      </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.form`
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
  `}
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
  width: 100%;
`;

const SetDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DatePickerContainer = styled.div`
  max-width: 204px;
  width: 100%;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SetBookingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BookingText = styled(AppText)`
  margin-right: 9px;
`;

const DropDownContainer = styled.div`
  width: 204px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  margin: 16px 24px 0;
  max-width: 240px;
  padding: 12px 88px;
  width: 100%;
  height: 100%;
`;

export default SetAvailableContainer;
