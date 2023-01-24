import { monthsList } from 'constains';
import { useClickOutside, useToggle } from 'hooks';
import { memo, useCallback, useRef, useState } from 'react';
import { dayjs } from 'services';
import styled, { css } from 'styled-components';
import { AppText } from 'ui/AppText';
import { MAX_RANGE_IN_YEARS } from 'ui/DatePicker/DatePicker';
import { ModalDropDown } from 'ui/ModalDropDown';
import { capitalizeFirstLetter, range } from 'utils';

import { ArrowBottom, ArrowLeft } from '../../../../../public/svg/components';

const DEFAULT_START_DATE = 1900;

const Header = ({
  decreaseMonth,
  prevMonthButtonDisabled,
  increaseMonth,
  nextMonthButtonDisabled,
  monthDate,
  changeYear,
  date,
  isMinDate,
  customHeaderCount,
  changeMonth,
}: HeaderProps) => {
  const cardModalRef = useRef<HTMLDivElement>(null);
  const [isYearsModalOpen, setIsYearsModalOpen] = useState(false);

  const monthName = capitalizeFirstLetter(dayjs(monthDate?.toString() || '').format('MMMM'));

  const currentYear = date.getFullYear();
  const lastYear = new Date().getFullYear() + MAX_RANGE_IN_YEARS;
  const years = range(lastYear, isMinDate ? currentYear : DEFAULT_START_DATE, -1);

  const isSecondCalendar = !!customHeaderCount;

  const { close, isOpened, open } = useToggle();

  const closeModal = () => {
    close();
    setIsYearsModalOpen(false);
  };

  useClickOutside(cardModalRef, closeModal);

  const isMonthsModalOpen = isOpened && !isYearsModalOpen;

  const toggleMonthsModal = () => {
    if (isOpened) {
      closeModal();
    } else {
      open();
    }
  };

  const toggleYearsModal = () => {
    if (isOpened) {
      closeModal();
    } else {
      open();
      setIsYearsModalOpen(true);
    }
  };

  const selectMonth = (monthIndex: number) => {
    const secondMonthIndex = monthIndex - 1 === -1 ? 11 : monthIndex - 1;
    changeMonth(isSecondCalendar ? secondMonthIndex : monthIndex);
    closeModal();
  };

  const selectYear = (year: number) => {
    changeYear(year);
    closeModal();
  };

  const MonthsList = useCallback(
    () => (
      <List>
        {monthsList.map((month) => (
          <ListItem key={month.value} onClick={() => selectMonth(+month.value)}>
            {month.label}
          </ListItem>
        ))}
      </List>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const YearsList = useCallback(
    () => (
      <List>
        {years.map((year) => (
          <ListItem key={year} onClick={() => selectYear(year)}>
            {year}
          </ListItem>
        ))}
      </List>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Root>
      <Button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <LeftIcon />
      </Button>
      <ModalContainer ref={cardModalRef}>
        <ButtonContainer>
          <HeaderButton type="button" onClick={toggleMonthsModal}>
            <AppText font="body_20_14_medium">{monthName}</AppText>
            <Arrow $isOpen={isMonthsModalOpen} />
          </HeaderButton>
          {isSecondCalendar ? (
            <AppText font="body_20_14_medium">{currentYear}</AppText>
          ) : (
            <HeaderButton type="button" onClick={toggleYearsModal}>
              <AppText font="body_20_14_medium">{currentYear}</AppText>
              <Arrow $isOpen={isYearsModalOpen} />
            </HeaderButton>
          )}
        </ButtonContainer>
        <StyledModalDropDown isOpen={isOpened}>{isYearsModalOpen ? <YearsList /> : <MonthsList />}</StyledModalDropDown>
      </ModalContainer>
      <Button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <RightIcon />
      </Button>
    </Root>
  );
};
export default memo(Header);

type HeaderProps = {
  monthDate: Date;
  date: Date;
  changeYear(year: number): void;
  changeMonth(month: number): void;
  customHeaderCount: number;
  decreaseMonth(): void;
  increaseMonth(): void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  isMinDate?: boolean;
};

const Root = styled.div`
  display: flex;
  height: 36px;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
`;

const LeftIcon = styled(ArrowLeft)`
  width: 20px;
  height: 20px;

  path {
    stroke: ${({ theme: { colors } }) => colors.greyScale[100]};
  }
`;

const RightIcon = styled(LeftIcon)`
  transform: rotate(180deg);
`;

const Button = styled.button`
  display: flex;
  height: fit-content;
`;

const List = styled.ul`
  display: grid;
  width: 100%;
  padding: 6px 12px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const ListItem = styled.li`
  width: 100%;
  padding: 12px 0;
  cursor: pointer;

  :not(:first-child) {
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }

  color: ${({ theme: { colors } }) => colors.greyScale[100]};
  ${({ theme: { typography } }) => typography.caption_16_12_regular};
`;

const StyledModalDropDown = styled(ModalDropDown)`
  width: 137px;
  max-height: 212px;
  margin-top: 32px;
  bottom: auto;
  left: auto;
  top: 0;
  right: auto;
  overflow-y: scroll;
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderButton = styled.button`
  display: flex;
  align-items: center;
`;

const Arrow = styled(ArrowBottom)<{ $isOpen: boolean }>`
  ${({ theme: { colors }, $isOpen }) => css`
    width: 13px;
    height: 13px;
    margin-left: 1px;

    transition: all 0.2s ease-in-out;

    ${$isOpen &&
    css`
      transform: rotate(180deg);
    `}

    path {
      fill: ${colors.greyScale[60]};
    }
  `}
`;
