import { isArray } from '@apollo/client/cache/inmemory/helpers';
import { useTranslation } from 'next-i18next';
import React, { memo, useRef } from 'react';
import ReactDatePicker, { ReactDatePickerCustomHeaderProps, ReactDatePickerProps } from 'react-datepicker';
import styled from 'styled-components';

import { DayContents, Header, PopperContainer } from '../index';

export type LightCalendarProps = {
  label?: string;
  isBigVariant?: boolean;
  isEmpty?: boolean;
  maxDate?: Date | null;
  endDate: Date | null;
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  close: () => void;
  onChange?: (date: Array<Date | null> | Date | null) => void;
} & Omit<ReactDatePickerProps, 'onChange' | 'selectsRange'>;

const LightCalendar = ({
  endDate,
  startDate,
  isBigVariant = false,
  maxDate,
  onChange,
  setEndDate,
  setStartDate,
  close,
  ...props
}: LightCalendarProps) => {
  const datePickerRef = useRef<ReactDatePicker>(null);
  const { i18n } = useTranslation();

  const handleChange = (dates: Array<Date | null> | Date | null) => {
    onChange?.(dates);

    if (dates) {
      if (isArray(dates)) {
        const [start, end] = dates;

        setStartDate(start);
        setEndDate(end);

        if (end) close();
      } else {
        setStartDate(dates);
        close();
      }
    }
  };

  const renderCustomHeader = (props: ReactDatePickerCustomHeaderProps) => <Header {...props} />;
  const renderDayContents = (day: number) => <DayContents day={day} isSelecting={false} />;

  return (
    <ReactDatePicker
      ref={datePickerRef}
      locale={i18n.language}
      calendarContainer={(props) => <Container {...props} />}
      popperContainer={(props) => <PopperContainer isBigVariant={isBigVariant} {...props} />}
      renderCustomHeader={renderCustomHeader}
      renderDayContents={renderDayContents}
      showMonthDropdown
      selected={startDate}
      startDate={startDate}
      endDate={endDate}
      maxDate={maxDate}
      monthsShown={2}
      forceShowMonthNavigation
      selectsRange
      onChange={handleChange}
      inline
      {...props}
    />
  );
};

export default memo(LightCalendar);

const Container = styled.div`
  .react-datepicker__month-container:first-child {
    display: none;
  }
`;
