import ru from 'date-fns/locale/ru';
import { useSelectingDay } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDatePicker, {
  CalendarContainerProps,
  ReactDatePickerCustomHeaderProps,
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';

import { CalendarContainer, DateInput, DayContents, Header, MultipleDateInput, PopperContainer } from './components';

const MAX_RANGE_IN_MONTH = 3;
export const MAX_RANGE_IN_YEARS = 5;

type DatePickerProps = {
  label?: string;
  isButton?: boolean;
  isBigVariant?: boolean;
  isEmpty?: boolean;
  isMaxDate?: boolean;
  selectsRange?: boolean;
  hasReset?: boolean;
  areTwoMonth?: boolean;
  startDate?: Date | null;
  inputType?: DatePickerInputEnum;
  isSecondaryMultipleDateInput?: boolean;
  onChange?: (date: Array<Date | null> | Date | null) => void;
  onDateSubmit?: (startDate: Date | null, endDate: Date | null) => void;
} & Omit<ReactDatePickerProps, 'onChange' | 'selectsRange'>;

const DatePicker = ({
  label,
  isButton = false,
  isEmpty = false,
  isBigVariant = false,
  selectsRange = false,
  hasReset = false,
  areTwoMonth = false,
  isMaxDate = false,
  inputType = DatePickerInputEnum.default,
  onChange,
  onDateSubmit,
  startDate: initialStartDate = null,
  minDate,
  isSecondaryMultipleDateInput,
  ...props
}: DatePickerProps) => {
  const datePickerRef = useRef<ReactDatePicker>(null);
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const dateValue = props.value ? new Date(props.value) : initialStartDate;
  const [startDate, setStartDate] = useState<Date | null>(dateValue);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [maxDate, setMaxDate] = useState<Date | null>(null);

  const resetValue = () => {
    if (hasReset) {
      const isUpdateStartDate = dateValue && dateValue.toDateString() !== startDate?.toDateString();

      if (isUpdateStartDate) {
        setStartDate(dateValue);
      }
    }
  };

  const setDefaultMaxDate = () => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() + MAX_RANGE_IN_YEARS);

    setMaxDate(currentDate);
  };

  useEffect(() => {
    if (endDate) {
      setDefaultMaxDate();
    } else {
      const currentStartDate = new Date(startDate?.toString() || '');
      currentStartDate.setMonth(currentStartDate.getMonth() + MAX_RANGE_IN_MONTH);

      if (!maxDate || currentStartDate < maxDate) {
        setMaxDate(currentStartDate);
      }
    }
  }, [startDate, endDate]);

  useEffect(setDefaultMaxDate, []);
  useEffect(resetValue, [dateValue, hasReset]);

  registerLocale('ru', ru);

  const { isSelecting, rangeStartDay, firstMonthRef } = useSelectingDay(areTwoMonth);

  const params = {
    selected: startDate,
    startDate,
    endDate,
    maxDate: selectsRange || isMaxDate ? maxDate : undefined,
    minDate,
    selectsRange,
    isMaxDate,
    ...props,
  };

  const handleChange = (dates: Array<Date | null> | Date | null) => {
    onChange?.(dates);

    if (dates) {
      if (Array.isArray(dates)) {
        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);
      } else {
        setStartDate(dates);
      }
    }
  };

  const handleSelect = () => {
    datePickerRef?.current?.setOpen?.(false);
    onDateSubmit?.(startDate, endDate);
    setStartDate(null);
  };

  const handleToggleOpened = () => {
    datePickerRef?.current?.setOpen?.(!datePickerRef?.current?.isCalendarOpen());
  };

  const close = () => {
    datePickerRef?.current?.setOpen?.(false);
  };

  const CustomInput = useMemo(() => {
    switch (inputType) {
      case DatePickerInputEnum.multiple: {
        return <MultipleDateInput isOpen={isOpen} isSecondary={isSecondaryMultipleDateInput} />;
      }
      default: {
        return <DateInput onToggleOpened={handleToggleOpened} isEmpty={isEmpty} label={label} />;
      }
    }
  }, [isOpen]);

  const renderCustomHeader = (props: ReactDatePickerCustomHeaderProps) => <Header isMinDate={!!minDate} {...props} />;

  const calendarContainer = (props: CalendarContainerProps) => (
    <CalendarContainer
      ref={firstMonthRef}
      lightCalendarProps={{ ...params, startDate, close, setStartDate, endDate, setEndDate, onChange }}
      onSelect={handleSelect}
      areTwoMonth={areTwoMonth}
      isButton={isButton}
      {...props}
    />
  );

  const renderDayContents = (day: number) => <DayContents day={day} isSelecting={isSelecting && day > rangeStartDay} />;

  const popperContainer = (props: { children: React.ReactNode[] }) => (
    <PopperContainer isBigVariant={isBigVariant} {...props} />
  );

  return (
    <ReactDatePicker
      ref={datePickerRef}
      locale={i18n.language}
      customInput={CustomInput}
      popperContainer={popperContainer}
      renderDayContents={renderDayContents}
      calendarContainer={calendarContainer}
      renderCustomHeader={renderCustomHeader}
      onCalendarOpen={() => setIsOpen(true)}
      onCalendarClose={() => setIsOpen(false)}
      {...params}
      showYearDropdown
      showMonthDropdown
      onChange={handleChange}
      monthsShown={2}
    />
  );
};

export default DatePicker;

export enum DatePickerInputEnum {
  default,
  multiple,
}
