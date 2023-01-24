import { FC, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { IconButtonSize } from 'ui/IconButton/IconButton';
import { IconButton } from 'ui/index';

import { Add, Minus } from '../../../public/svg/components';
import { AppText } from '../AppText';

type StyledInputProps = {
  $isError?: boolean;
  $isDisabled?: boolean;
};

type NumberInputProps = {
  title?: string;
  buttonSize?: IconButtonSize;
  className?: string;
  isRequired?: boolean;
  name: string;
  initialValue: number;
  control: Control<any>;
  minValue?: number;
};
const NumberInput: FC<NumberInputProps> = ({
  title,
  className,
  name,
  initialValue,
  isRequired,
  control,
  minValue,
  buttonSize = IconButtonSize.SMALL,
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(initialValue);
  const isDisabled = minValue ? inputValue === minValue : inputValue === 0;
  return (
    <Root>
      <InputContainer className={className} onClick={() => ref?.current?.focus()}>
        {title && <Title font="body_20_14_regular">{title}</Title>}
        <Controller
          name={name}
          control={control}
          rules={{
            required: isRequired,
            validate: (value) => !isRequired || value > 0,
          }}
          render={({ field }) => (
            <ControllerContainer>
              <IconButton
                IconComponent={Minus}
                disabled={isDisabled}
                size={buttonSize}
                onClick={(e) => {
                  e.preventDefault();
                  setInputValue((prev) => prev - 1);
                  field.onChange(inputValue - 1);
                }}
              />
              <StyledInput type="number" disabled value={inputValue} ref={ref} />
              <IconButton
                IconComponent={Add}
                size={buttonSize}
                onClick={(e) => {
                  e.preventDefault();
                  setInputValue((prev) => prev + 1);
                  field.onChange(inputValue + 1);
                }}
              />
            </ControllerContainer>
          )}
        />
      </InputContainer>
    </Root>
  );
};

export default NumberInput;

const Root = styled.div``;

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
  appearance: textfield;
  text-align: center;
  width: 30px;
  text-decoration: none;

  ${({ theme: { typography, colors } }) => css`
    &::placeholder {
      color: ${colors.greyScale[50]};
    }
    //
    // &:disabled {
    //   &::placeholder {
    //     color: ${colors.greyScale[30]};
    //   }
    //   cursor: not-allowed;
    //   background-color: transparent;
    //   color: ${colors.greyScale[30]};
    // } //TODO спросить Влада

    ${typography.caption_16_12_regular}
  `}
`;

const InputContainer = styled.div<StyledInputProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  background-color: transparent;
  gap: 2px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'auto')};
  padding: 7px 16px;
`;

const ControllerContainer = styled.div`
  display: flex;
`;

const Title = styled(AppText)<{ $isDisabled?: boolean }>`
  color: ${({ theme: { colors }, $isDisabled }) => ($isDisabled ? colors.greyScale[30] : colors.greyScale[100])};
  text-align: left;
`;
