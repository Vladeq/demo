import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, RadioButton } from 'ui';

import { accommodationOptions } from '../../../../options';

type FieldType = {
  control: Control<any>;
};

const RentType: FC<FieldType> = ({ control }) => {
  return (
    <Controller
      control={control}
      name="rentBookingType"
      render={({ field }) => (
        <>
          {accommodationOptions.map((accommodation, index) => (
            <BookingTypeContainer key={index}>
              <RadioButton
                {...field}
                checked={field.value === accommodation.value}
                onChange={() => field.onChange(accommodation.value)}
              />
              <BookingTypeInfoContainer>
                <BookingTypeTitle font="body_20_14_regular" variant={TextVariants.SECONDARY}>
                  {accommodation.label}
                </BookingTypeTitle>
                <Description font="caption_16_12_regular">{accommodation.description}</Description>
              </BookingTypeInfoContainer>
            </BookingTypeContainer>
          ))}
        </>
      )}
    />
  );
};

export default RentType;

const BookingTypeContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;
const BookingTypeTitle = styled(AppText)`
  margin-bottom: 8px;
`;
const Description = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  max-width: 300px;
`;
const BookingTypeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
