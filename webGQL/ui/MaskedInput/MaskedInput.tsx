import { FC, ReactNode } from 'react';
import InputMask, { Props } from 'react-input-mask-next';

import { BaseInput } from '../BaseInput';

type MaskedFieldProps = {
  mask: any;
  label?: string;
  isFullWidth?: boolean;
  error?: string;
} & Props;

const MaskedInput: FC<MaskedFieldProps> = (props) => {
  const { mask, isFullWidth, onChange, onFocus, onBlur, value, label, readOnly, error, pattern } = props;
  return (
    <InputMask
      mask={mask}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      pattern={pattern}
      readOnly={readOnly}>
      {
        (() => (
          <BaseInput error={error} pattern={pattern} isFullWidth={isFullWidth} readOnly={readOnly} label={label} />
        )) as unknown as ReactNode
      }
    </InputMask>
  );
};

export default MaskedInput;
