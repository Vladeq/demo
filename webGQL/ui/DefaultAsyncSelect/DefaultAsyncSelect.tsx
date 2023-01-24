import { useRouter } from 'next/router';
import { FC, FocusEvent, useEffect, useState } from 'react';
import {
  components,
  CSSObjectWithLabel,
  GroupBase,
  InputProps,
  MenuPlacement,
  OptionProps as OptionStateProps,
  StylesConfig,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import GoogleMapService from 'services/google-maps';
import styled from 'styled-components';
import { TextVariants } from 'types';

import { AppText } from '../AppText';

export type OptionProps = { label: string; value: string; image?: string };
type DropdownDefaultProps = {
  selected?: OptionProps;
  defaultValue?: OptionProps;
  label?: string;
  placeholder?: string;
  menuIsOpen?: boolean;
  variant?: 'small' | 'max-content';
  required?: boolean;
  disabled?: boolean;
  noOptionsMessage?: string;
  customOption?: any;
  hideSelectedOptions?: boolean;
  closeMenuOnSelect?: boolean;
  isSearchable?: boolean;
  menuPlacement?: MenuPlacement;
  minMenuHeight?: number;
  maxMenuHeight?: number;
  onChange?: (value: any) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  error?: 'error' | 'warning';
  type?: 'dropdown' | 'input' | 'onboarding-input';
  bigHeightMobile?: boolean;
  className?: string;
  customOptionWithCheckbox?: any;
  isMulti?: boolean;
  isClearable?: boolean;
  loadOptions?: any;
  isSecondary?: boolean;
  onMenuClose?: () => void;
  onMenuOpen?: () => void;
};

export const customStyled: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  loadingIndicator: () => ({
    display: 'none',
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    border: '1px solid #E6E9EE',
    height: '48px',
    outline: 'none',
    background: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    fontWeight: 400,
    padding: '0 12px 0 16px !important',
    boxShadow: 'none',
    fontSize: '12px',
    lineHeight: '16px',

    '&::placeholder': {
      color: '#AFB5C0',
    },
    '&:hover': {
      borderColor: 'none !important',
      boxShadow: 'none',
    },
    '&:focus-within': {
      border: '1px solid #8991A1',
      boxShadow: 'none !important',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#AFB5C0',
    marginTop: '21px',
    marginRight: '0px',
  }),
  input: (provided) => ({
    ...provided,
    marginTop: '21px',
  }),
  singleValue: (provided) => ({
    ...provided,
    marginTop: '21px',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: '16px',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: '0',
    boxShadow: '0px 10px 33px rgba(175, 181, 192, 0.18)',
  }),

  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: '6px 3px',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    '::-webkit-scrollbar': {
      width: '10px',
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar-track': {
      width: '2px',
    },
    '::-webkit-scrollbar-thumb': {
      width: '2px',
      height: '120px',
      boxShadow: `inset 0 0 10px 10px #E6E9EE`,
      border: `solid 4px transparent`,
    },
    overflowX: 'hidden',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided: CSSObjectWithLabel, state: OptionStateProps) => ({
    ...provided,
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '12px 14px',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    position: 'relative',
    backgroundColor: state.isSelected ? '#F6F7F9' : '#ffffff',
    color: 'black',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F6F7F9',
    },
    '&:active': {
      backgroundColor: '#F6F7F9',
    },
    '&:not(:last-child):before': {
      content: '""',
      width: '100%',
      height: '1px',
      left: '12px',
      background: '#E6E9EE',
      position: 'absolute',
      bottom: 0,
    },
  }),
};

export const customStyledSecondary: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  loadingIndicator: () => ({
    display: 'none',
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    border: '1px solid #E6E9EE',
    height: '48px',
    outline: 'none',
    background: '#F6F7F9',
    borderRadius: '12px',
    overflow: 'hidden',
    fontWeight: 400,
    padding: '0 12px 0 16px !important',
    boxShadow: 'none',
    fontSize: '12px',
    lineHeight: '16px',

    '&::placeholder': {
      color: '#AFB5C0',
    },
    '&:hover': {
      borderColor: 'none !important',
      boxShadow: 'none',
    },
    '&:focus-within': {
      border: '1px solid #8991A1',
      boxShadow: 'none !important',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#AFB5C0',
    marginTop: '21px',
    marginRight: '0px',
  }),
  input: (provided) => ({
    ...provided,
    marginTop: '21px',
  }),
  singleValue: (provided) => ({
    ...provided,
    marginTop: '21px',
  }),
  menu: (provided) => ({
    ...provided,
    position: 'absolute',
    top: '40px',
    left: '-105px',
    width: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
    boxShadow: 'none',
    '@media (max-width: 768px)': {
      left: '-85px',
    },
    '@media (max-width: 576px)': {
      left: '-53px',
    },
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: 'red',
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: '6px 0',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
    '::-webkit-scrollbar': {
      width: '10px',
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar-track': {
      width: '2px',
    },
    '::-webkit-scrollbar-thumb': {
      width: '2px',
      height: '120px',
      boxShadow: `inset 0 0 10px 10px #E6E9EE`,
      border: `solid 4px transparent`,
    },
    overflowX: 'hidden',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided: CSSObjectWithLabel, state: OptionStateProps) => ({
    ...provided,
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    padding: '12px 14px',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    position: 'relative',
    backgroundColor: state.isSelected ? '#F6F7F9' : '#ffffff',
    color: 'black',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F6F7F9',
    },
    '&:active': {
      backgroundColor: '#F6F7F9',
    },
    '&:not(:last-child):before': {
      content: '""',
      width: '100%',
      height: '1px',
      left: '12px',
      background: '#E6E9EE',
      position: 'absolute',
      bottom: 0,
    },
  }),
};
const Input = (props: InputProps) => <components.Input name="input" {...props} isHidden={false} />;

const DefaultAsyncSelect: FC<DropdownDefaultProps> = ({
  selected,
  placeholder = 'Выберите...',
  noOptionsMessage = 'Не найдено',
  disabled = false,
  menuIsOpen,
  hideSelectedOptions = false,
  closeMenuOnSelect = true,
  isSearchable = true,
  menuPlacement = 'auto',
  minMenuHeight = 140,
  maxMenuHeight = 300,
  label,
  onChange,
  onFocus,
  className,
  onBlur,
  isMulti,
  isClearable,
  loadOptions,
  isSecondary,
  onMenuOpen,
  onMenuClose,
}) => {
  const router = useRouter();
  const defaultInputValue = router.query.label;

  const [inputValue, setInputValue] = useState(defaultInputValue as unknown as string);

  const getCoordinates = async (placeId: string) => {
    const res = await GoogleMapService.getPlacesDetails(placeId);

    return res;
  };

  const handleChange = async (option: { label: string; value: string }) => {
    if (option?.label) {
      setInputValue(option.label);
      const { location } = await getCoordinates(option.value);
      await router.push(
        { query: { ...router.query, lat: location.lat, lng: location.lng, label: location.label } },
        undefined,
        {
          shallow: true,
        },
      );
    }
  };

  const onInputChange = (inputValue: string, { action }: { action: string }) => {
    if (action === 'input-change') {
      setInputValue(inputValue);
    }
  };

  useEffect(() => {
    setInputValue(router.query.label as string);
  }, [router.query]);

  return (
    <Root>
      {label && (
        <Label variant={TextVariants.SECONDARY} font="caption_14_10_medium">
          {label}
        </Label>
      )}
      <StyledSelect
        // @ts-ignore
        onChange={async (e: { label: string; value: string }) => {
          await handleChange(e);
          if (onChange && e?.value) {
            onChange(e.value);
          }
        }}
        value={selected}
        classNamePrefix="dropdown"
        noOptionsMessage={() => noOptionsMessage}
        tabIndex={0}
        isDisabled={disabled}
        hideSelectedOptions={hideSelectedOptions}
        closeMenuOnSelect={closeMenuOnSelect}
        menuPlacement={menuPlacement}
        onBlur={onBlur}
        onFocus={onFocus}
        menuIsOpen={menuIsOpen}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        defaultValue={defaultInputValue}
        minMenuHeight={minMenuHeight}
        maxMenuHeight={maxMenuHeight}
        isSearchable={isSearchable}
        styles={isSecondary ? customStyledSecondary : customStyled}
        className={className}
        isMulti={isMulti}
        isClearable={isClearable}
        placeholder={placeholder}
        loadOptions={loadOptions}
        components={{ Input }}
        inputValue={inputValue}
        onInputChange={onInputChange}
      />
    </Root>
  );
};

export default DefaultAsyncSelect;

const Root = styled.div`
  position: relative;
  width: 100%;
`;
const StyledSelect = styled(AsyncSelect)``;

const Label = styled(AppText)`
  position: absolute;
  top: 7px;
  left: 18px;
  z-index: 1;
`;
