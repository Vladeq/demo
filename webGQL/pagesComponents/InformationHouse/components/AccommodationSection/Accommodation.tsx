import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, RadioButton } from 'ui';

import { ShortTermRentBookingType } from '../../../../__generated__/types';

type AccommodationProps = {
  control: Control<any>;
  isAllRent?: boolean;
};

const Accommodation: FC<AccommodationProps> = ({ control, isAllRent }) => {
  const { t } = useTranslation('importantInfoPage', { keyPrefix: 'accommodation' });

  const accommodationOptions = useMemo(
    () => [
      {
        label: t('request.title'),
        description: t('request.subTitle'),
        value: ShortTermRentBookingType.Request,
      },
      {
        label: t('instant.title'),
        description: t('instant.subTitle'),
        value: ShortTermRentBookingType.Instant,
      },
    ],
    [t],
  );
  return (
    <>
      <SubTitle font="title_22_18_bold" variant={TextVariants.SECONDARY}>
        {isAllRent ? t('titleALl') : t('title')}
      </SubTitle>
      <GuestsRules>
        <Controller
          control={control}
          name="rentBookingType"
          render={({ field }) => (
            <>
              {accommodationOptions.map((elem, index) => (
                <GuestContainer key={index}>
                  <RadioButton
                    {...field}
                    checked={field.value === elem.value}
                    onChange={() => field.onChange(elem.value)}
                  />
                  <GuestInfoContainer>
                    <GuestTitle font="body_20_14_regular" variant={TextVariants.SECONDARY}>
                      {elem.label}
                    </GuestTitle>
                    <GuestDescription font="caption_16_12_regular">{elem.description}</GuestDescription>
                  </GuestInfoContainer>
                </GuestContainer>
              ))}
            </>
          )}
        />
      </GuestsRules>
    </>
  );
};

export default Accommodation;

const GuestContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 362px;
`;

const GuestTitle = styled(AppText)`
  margin-bottom: 10px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin-bottom: 8px;
  }
`;

const GuestDescription = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  max-width: 300px;
`;

const GuestInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GuestsRules = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const SubTitle = styled(AppText)`
  margin-bottom: 24px;
`;
