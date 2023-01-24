import { useTranslation } from 'next-i18next';
import React, { InputHTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { MultipleSignedInput } from 'ui/MultipleSignedInput';
import { formatDateToRange } from 'utils';

type MultipleDateInputProps = { isOpen: boolean; onClick?: () => void; isSecondary?: boolean } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onClick'
>;

const MultipleDateInput = ({
  value = '',
  onChange: _,
  isOpen,
  onClick,
  isSecondary = false,
  ...props
}: MultipleDateInputProps) => {
  const { t } = useTranslation('ui', { keyPrefix: 'forms' });
  const { control, setValue } = useFormContext<DateFormValue>();
  const [focusIndex, setFocusIndex] = useState<null | number>(null);

  const formattedValue = formatDateToRange(value as string);
  const [arrival, departure] = formattedValue.split(' - ');

  useEffect(() => {
    if (isOpen) setFocusIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (departure) {
      setValue('dateEnd', departure);
      setFocusIndex(null);
    }
  }, [departure]);

  useEffect(() => {
    if (arrival) {
      setValue('dateStart', arrival);
      setValue('dateEnd', '');
      setFocusIndex(1);
    }
  }, [arrival]);

  const handleClick = (e: MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <Root onClick={handleClick} htmlFor="multiple">
      <Container>
        <StyledMultipleSignedInput
          $isSecondary={isSecondary}
          control={control}
          buttonType="button"
          focusIndex={focusIndex}
          isDateInput
          defaultsInputsVariables={[
            { name: 'dateStart', title: t('formArrival'), placeholder: t('placeholderWhen') },
            { name: 'dateEnd', title: t('formDeparture'), placeholder: t('placeholderWhen') },
          ]}
        />
      </Container>
      <HiddenInput inputMode="none" id="multiple" onClick={onClick} {...props} />
    </Root>
  );
};

export default MultipleDateInput;

type DateFormValue = {
  dateStart: string;
  dateEnd: string;
};

const Root = styled.label`
  display: flex;
  position: relative;
  width: 100%;
  height: fit-content;
  cursor: pointer;
`;

const StyledMultipleSignedInput = styled(MultipleSignedInput)<{ $isSecondary: boolean }>`
  ${({ theme: { colors, typography }, $isSecondary }) => css`
    width: 100%;
    ${$isSecondary &&
    css`
      border: none;
      height: 48px;
    `};
    background-color: ${$isSecondary ? colors.greyScale[10] : colors.greyScale[0]};
    input {
      input {
        ${typography.caption_14_10_medium}
      }
      color: ${colors.greyScale[100]} !important;
      max-width: none;
    }
  `}
`;

const Container = styled.div`
  cursor: pointer !important;
  pointer-events: none !important;
  p,
  div,
  input,
  button {
    cursor: pointer !important;
    pointer-events: none !important;
  }
  width: 100%;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
`;
