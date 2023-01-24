import { ChangeEvent, ClipboardEvent, FC, KeyboardEvent, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';

import { AppText } from '../AppText';

type CodeinputProps = { count: number; error?: string; onChange: any };

const CodeInput: FC<CodeinputProps> = ({ count, error, onChange }) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const setFocus = (id: string) => {
    const numberId = Number(id);
    if (inputsRef.current[numberId].value && Number(id) + 1 < count && !inputsRef.current[numberId + 1].value) {
      inputsRef.current[numberId + 1].focus();
    }
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    if (key === 'Backspace') {
      if (target.value === '') {
        if (target.previousElementSibling !== null) {
          const t = target.previousElementSibling as HTMLInputElement;
          t.value = '';
          t.focus();
          e.preventDefault();
        }
      } else {
        target.value = '';
      }
      sendResult();
    }
  };

  const sendResult = () => {
    const res = inputsRef.current.map((input) => input.value).join('');
    onChange(res);
  };
  const handleOnPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData('Text');

    let currentInput = 0;

    for (let i = 0; i < pastedValue.length; i++) {
      const pastedCharacter = pastedValue.charAt(i);
      const currentValue = inputsRef.current[currentInput].value;
      if (!currentValue) {
        inputsRef.current[currentInput].value = pastedCharacter;
        if (inputsRef.current[currentInput].nextElementSibling !== null) {
          (inputsRef.current[currentInput].nextElementSibling as HTMLInputElement).focus();
          currentInput++;
        }
      }
    }
    sendResult();

    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFocus(e.target.id);
    sendResult();
  };

  const calculateInputs = () => {
    return new Array(count)
      .fill('')
      .map((_, i) => (
        <Cell
          type="text"
          key={i}
          inputMode="numeric"
          onKeyDown={handleOnKeyDown}
          pattern="[0-9]+"
          maxLength={1}
          onPaste={handleOnPaste}
          min="0"
          onChange={handleChange}
          id={String(i)}
          max="9"
          ref={(e: HTMLInputElement) => (inputsRef.current[i] = e)}
          isError={!!error}
        />
      ));
  };
  return (
    <Root>
      <InputsContainer $isError={!!error}>{calculateInputs()}</InputsContainer>
      <Error font="caption_16_12_medium">{error}</Error>
    </Root>
  );
};

export default CodeInput;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputsContainer = styled.span<{ $isError?: boolean }>`
  display: flex;
  gap: 16px;

  ${({ theme: { colors }, $isError }) =>
    $isError &&
    css`
    &:focus-within {
      input {
        border:  1px solid ${colors.greyScale[60]} };
      }
    }
  `}
`;

const Cell = styled.input<{ isError?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f7f9;
  border-radius: 12px;
  font-weight: 500;
  font-size: 18px;
  border: ${({ theme: { colors }, isError }) => (isError ? `1px solid ${colors.additional.red}` : 'none')};
  outline: none;
  width: 88px;
  height: 65px;
  line-height: 22px;
  padding: 21px 38px;

  &:focus {
    border: 1px solid ${({ theme: { colors } }) => colors.greyScale[60]};
  }

  ${({ theme: { typography } }) => typography.title_22_18_medium}
  @media (max-width: ${BreakpointsEnum.s}px) {
    width: 74px;
    padding: 21px 30px;
  }
`;

const Error = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.additional.red};
`;
