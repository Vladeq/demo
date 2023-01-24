import { useTranslation } from 'next-i18next';
import { forwardRef, ForwardRefRenderFunction, memo } from 'react';
import { CalendarContainerProps as DefaultCalendarContainerProps } from 'react-datepicker';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Button } from 'ui/Button';
import { ButtonSize } from 'ui/Button/Button';

import { LightCalendar } from '../LightCalendar';
import { LightCalendarProps } from '../LightCalendar/LightCalendar';

const CalendarContainer: ForwardRefRenderFunction<HTMLDivElement, CalendarContainerProps> = (
  { children, areTwoMonth, lightCalendarProps, isButton, onSelect },
  ref,
) => {
  const { t } = useTranslation('ui', { keyPrefix: 'datePicker' });

  return (
    <Root>
      <Wrapper>
        <Container ref={ref}>{children}</Container>
        {areTwoMonth && <LightCalendar {...lightCalendarProps} />}
      </Wrapper>
      {isButton && <StyledButton onClick={onSelect} size={ButtonSize.SMALL} text={t('apply')} />}
    </Root>
  );
};

export default memo(forwardRef<HTMLDivElement, CalendarContainerProps>(CalendarContainer));

type CalendarContainerProps = {
  isButton: boolean;
  areTwoMonth: boolean;
  lightCalendarProps: LightCalendarProps;
  onSelect: () => void;
} & DefaultCalendarContainerProps;

const Root = styled.div`
  display: grid;
  justify-items: center;
`;

const Wrapper = styled.div`
  justify-items: center;
  display: flex;
  gap: 12px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  .react-datepicker__month-container:last-child {
    display: none;
  }
`;

const StyledButton = styled(Button)`
  width: 180px;
`;
