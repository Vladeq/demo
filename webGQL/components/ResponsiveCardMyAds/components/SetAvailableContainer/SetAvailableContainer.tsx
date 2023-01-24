import { monthOptions } from 'constains';
import { client } from 'libs';
import { useTranslation } from 'next-i18next';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { dayjs } from 'services';
import styled from 'styled-components';
import { OptionType, TextVariants } from 'types';
import { AppText, BaseModal, Button, DatePicker, DropdownDefault, Tooltip } from 'ui';
import { TooltipHorizontalPositionEnum, TooltipPositionEnum } from 'ui/Tooltip/Tooltip';
import { areIntersected, formatDateToRange } from 'utils';
import { v4 } from 'uuid';

import { InfoCircleFilled } from '../../../../../public/svg/components';
import { ApartmentAdStatusType } from '../../../../__generated__/types';
import { useSetAvailableSettings } from '../../../../graphql/mutations/Advert/__generated__/setAvailableSettings.mutation';
import { getMyApartmentAdsDocument } from '../../../../graphql/queries/MyAds/__generated__/getMyApartmentAds.query';
import { useClientSize, useToggle } from '../../../../hooks';
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
  const [setAvailableSettings] = useSetAvailableSettings();
  const { close, open, isOpened } = useToggle();
  const { getIsBreakpoint } = useClientSize();
  const isWidthSm = getIsBreakpoint('sm');

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

  const { control, getValues, setValue, watch, setError, reset } = useForm<FormType>({
    defaultValues: {
      dates: [],
      access: { label: '', value: '' },
    },
  });

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

  const lockedDates = watch('dates');

  const renderLockedDates = () => {
    return lockedDates.map((date) => {
      const formattedDates =
        date.startDate !== date.endDate
          ? `${formatDateToRange(`${date.startDate} - ${date.endDate}`)}`
          : `${formatDateToRange(`${date.startDate}`)}`;
      return <DateTab key={date.id} text={formattedDates} onDeleteDate={deleteLockedDate} id={date.id} />;
    });
  };

  const deleteLockedDate = (id: string) => {
    const dates = getValues('dates');
    const filteredLockedDates = dates.filter((date) => date.id !== id);
    setValue('dates', filteredLockedDates);
  };

  useEffect(() => {
    setDefaultValues();
  }, []);

  return (
    <MainContainer>
      <Content>
        <SetDateContainer>
          <DatePickerContainer>
            <Controller
              name="dates"
              control={control}
              render={({ field: { value, onChange } }) => (
                <StyledDatePicker
                  placeholderText={t('ui:datePicker.placeholder')}
                  isEmpty
                  selectsRange
                  minDate={new Date()}
                  isButton
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
            {!isWidthSm ? (
              <Tooltip
                text={t('ui:myAdsCard.setAvailableConteiner.setBookingInfo')}
                horizontalPosition={TooltipHorizontalPositionEnum.CENTER}
                position={TooltipPositionEnum.BOTTOM}>
                <InfoCircleFilled />
              </Tooltip>
            ) : (
              <TooltipButton onClick={open}>
                <InfoCircleFilled />
              </TooltipButton>
            )}
          </TextContainer>
          <DropDownContainer>
            <Controller
              control={control}
              name="access"
              render={({ field: { onChange, value } }) => (
                <DropdownDefault onChange={onChange} selected={value} isSearchable={false} options={monthOptions} />
              )}
            />
          </DropDownContainer>
        </SetBookingContainer>
      </Content>
      <ButtonContainer>
        <StyledButton onClick={onSubmit} text={t('ui:buttons.save')} />
      </ButtonContainer>
      <StyledBaseModal onClose={close} isBottomMobile isVisible={isOpened}>
        <TooltipText font="body_24_16_regular">
          Это диапазон, в который жильцы могут бронировать ваше жилье.
        </TooltipText>
        <Button onClick={close} text="Понятно" isFullWight />
      </StyledBaseModal>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 96px);
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
  width: 100%;
`;

const SetDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DatePickerContainer = styled.div`
  width: 100%;
`;
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const TabsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SetBookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin-top: 24px;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const BookingText = styled(AppText)``;

const DropDownContainer = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;

const TooltipButton = styled.button`
  border: none;
  outline: unset;
  background: transparent;
`;

const StyledBaseModal = styled(BaseModal)`
  .modal-header {
    display: none;
  }
`;

const TooltipText = styled(AppText)`
  margin-bottom: 24px;
`;

export default SetAvailableContainer;
