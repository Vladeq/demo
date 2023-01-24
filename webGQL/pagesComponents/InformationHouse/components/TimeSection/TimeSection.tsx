import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, DropdownDefault } from 'ui';

const options = [
  {
    label: '08:00',
    value: '08:00',
  },
  {
    label: '09:00',
    value: '09:00',
  },
  {
    label: '10:00',
    value: '10:00',
  },
  {
    label: '11:00',
    value: '11:00',
  },
  {
    label: '12:00',
    value: '12:00',
  },
  {
    label: '13:00',
    value: '13:00',
  },
  {
    label: '14:00',
    value: '14:00',
  },
  {
    label: '15:00',
    value: '15:00',
  },
  {
    label: '16:00',
    value: '16:00',
  },
  {
    label: '17:00',
    value: '17:00',
  },
  {
    label: '18:00',
    value: '18:00',
  },
  {
    label: '19:00',
    value: '19:00',
  },
  {
    label: '20:00',
    value: '20:00',
  },
  {
    label: '21:00',
    value: '21:00',
  },
  {
    label: '22:00',
    value: '22:00',
  },
  {
    label: '23:00',
    value: '23:00',
  },
  {
    label: '00:00',
    value: '00:00',
  },
  {
    label: '01:00',
    value: '01:00',
  },
  {
    label: '02:00',
    value: '02:00',
  },
  {
    label: '03:00',
    value: '03:00',
  },
  {
    label: '04:00',
    value: '04:00',
  },
  {
    label: '05:00',
    value: '05:00',
  },
  {
    label: '06:00',
    value: '06:00',
  },
  {
    label: '07:00',
    value: '07:00',
  },
];

type TimeSectionTypes = {
  control: Control<any>;
  defaultArrivalTime?: string | null;
  defaultDepartureTime?: string | null;
  isAllRent?: boolean;
  error?: string;
};

const TimeSection: FC<TimeSectionTypes> = ({ control, defaultArrivalTime, defaultDepartureTime, isAllRent, error }) => {
  const filterOptionForArrival = options.findIndex((option) => option.value === defaultArrivalTime);
  const filterOptionForDepartureTime = options.findIndex((option) => option.value === defaultDepartureTime);
  const { t } = useTranslation('importantInfoPage');

  return (
    <TimeContainer>
      <SubTitle font="title_22_18_bold" variant={TextVariants.SECONDARY}>
        {isAllRent ? t('timeSection.titleAll') : t('timeSection.title')}
      </SubTitle>
      <TimeInputsContainer>
        <Controller
          name="arrivalTime"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <StyledDropdown
              {...field}
              defaultValue={options[filterOptionForArrival]}
              placeholder={t('timeSection.arrival.placeholder')}
              isSearchable={false}
              $isError={!!error}
              onChange={(value) => field.onChange(value.value)}
              options={options}
            />
          )}
        />
        <Controller
          name="departureTime"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <StyledDropdown
              placeholder={t('timeSection.departure.placeholder')}
              defaultValue={options[filterOptionForDepartureTime]}
              isSearchable={false}
              options={options}
              $isError={!!error}
              {...field}
              onChange={(value) => field.onChange(value.value)}
            />
          )}
        />
      </TimeInputsContainer>
      <Error>{error}</Error>
    </TimeContainer>
  );
};
export default TimeSection;

const SubTitle = styled(AppText)`
  margin-bottom: 24px;
`;

const TimeContainer = styled.div`
  margin-bottom: 32px;
`;

const StyledDropdown = styled(DropdownDefault)<{ $isError?: boolean }>`
  width: 100%;
  max-width: 366px;

  .dropdown__control {
    &:focus-within {
      background: ${({ theme: { colors } }) => colors.greyScale[10]};
    }
    border: 1px solid ${({ theme: { colors }, $isError }) => ($isError ? colors.additional.red : colors.greyScale[30])};
    background: none;
  }

  .dropdown__placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }
`;

const TimeInputsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
  }
`;

const Error = styled(AppText)`
  ${({ theme: { typography } }) => typography.caption_14_10_regular};
  color: ${({ theme: { colors } }) => colors.additional.red};
  margin-top: 2px;
`;
