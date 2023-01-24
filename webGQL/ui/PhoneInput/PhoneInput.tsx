import 'react-phone-input-2/lib/style.css';

import { FC } from 'react';
import DefaultPhoneInput, { PhoneInputProps } from 'react-phone-input-2';
import styled from 'styled-components';

import { AppText } from '../AppText';

export type BaseInputProps = {
  label?: string;
  error?: string;
} & PhoneInputProps;

const PhoneInput: FC<BaseInputProps> = ({ disabled, error, ...inputProps }) => (
  <Root>
    <StylePhoneInput
      country="kz"
      isDisabled={disabled!}
      countryCodeEditable={false}
      onlyCountries={['kz']}
      placeholder="+7"
      isValid={() => Boolean(!error)}
      disableDropdown
      {...inputProps}
    />
    {error && <Error>{error}</Error>}
  </Root>
);

export default PhoneInput;

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const Error = styled(AppText)`
  ${({ theme: { typography } }) => typography.caption_14_10_regular};
  color: ${({ theme: { colors } }) => colors.additional.red};
  margin-top: 2px;
`;

const StylePhoneInput = styled(DefaultPhoneInput)<{ isDisabled: boolean }>`
  max-width: 400px;
  border: none;
  cursor: not-allowed;

  .form-control {
    border: none;
    border-radius: 12px;
  }

  .form-control {
    width: 100% !important;
    height: 40px !important;
    padding-left: 67px !important;
    border: none !important;
    border-radius: 12px !important;
    ${({ theme: { typography } }) => typography.caption_16_12_regular} !important;
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]};
    font-family: Euclid Circular B, sans-serif; !important;
  }

  &::after {
    content: '';
    left: -1px;
    top: 0;
    border-radius: 5px;
    width: 401px;
    background: #f6f7f9;
    display: ${({ isDisabled }) => (isDisabled ? 'block' : 'none')};
    position: absolute;
    opacity: 0.6;
    height: 40px;
  }

  .flag-dropdown {
    padding: 16px 10px;
    border: none;
    border-radius: 12px 0 0 12px;
    cursor: initial !important;
  }

  .invalid-number {
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]} !important;
    border: 1px solid ${({ theme: { colors } }) => colors.additional.red} !important;
  }

  .kz {
    background-image: url('/svg/origin/kz.svg') !important;
    background-repeat: no-repeat !important;
    border-radius: 2px !important;
    background-position-y: bottom !important;
  }

  .flag {
    position: relative !important;
    width: 28px;
    height: 20px;
    top: 0 !important;
    margin: 0 !important;
  }

  .selected-flag {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]} !important;
    cursor: auto;
    border: none;
  }
`;
