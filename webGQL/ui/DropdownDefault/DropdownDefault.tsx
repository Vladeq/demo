import { FC, FocusEvent } from 'react';
import Select, {
  components,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  GroupBase,
  MenuPlacement,
  OptionProps as OptionStateProps,
  StylesConfig,
} from 'react-select';
import styled from 'styled-components';

import { ArrowUp } from '../../../public/svg/components';
import { AppText } from '../AppText';

export type OptionProps = { label: string; value: string; image?: string };
type DropdownDefaultProps = {
  options: Array<OptionProps>;
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
};

export const customStyled: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
    display: 'flex',
    alignItems: 'center',
    svg: {
      path: {
        fill: state.isDisabled ? '#CDD1DB' : '#8991A1',
      },
    },
    transform: state.selectProps.menuIsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    height: '40px',
    '&:hover': {
      borderColor: 'none !important',
      boxShadow: 'none',
    },
    background: '#F6F7F9',
    border: state.selectProps.menuIsOpen ? '1px solid #AFB5C0' : '1px solid #E6E9EE',
    fontWeight: 400,
    borderRadius: '12px',
    padding: '0 12px 0 16px !important',
    boxShadow: 'none',
    fontSize: '12px',
    lineHeight: '16px',
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
    padding: '6px 0',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    padding: '2px 0',
    marginLeft: 0,
    color: state.selectProps.isDisabled ? '#CDD1DB' : '#1C212D',
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
    paddingLeft: '12px',
    fontWeight: 400,
    fontSize: '12px',
    height: '40px',
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

export const customStyledWithMulti: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  dropdownIndicator: (provided, state) => ({
    display: 'flex',
    alignItems: 'center',
    svg: {
      path: {
        fill: state.isDisabled ? '#CDD1DB' : '#8991A1',
      },
    },
    transform: state.selectProps.menuIsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '143px',
    height: '40px',
    '&:hover': {
      borderColor: 'none !important',
      boxShadow: 'none',
    },
    background: '#F6F7F9',
    border: state.selectProps.menuIsOpen ? '1px solid #AFB5C0' : '1px solid #E6E9EE',
    fontWeight: 400,
    borderRadius: '12px',
    padding: '0 12px 0 16px !important',
    boxShadow: 'none',
    fontSize: '12px',
    lineHeight: '16px',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: '16px',
    minWidth: '167px',
    width: '100%',
    overflow: 'hidden',
    paddingBottom: '0',
    boxShadow: '0px 10px 33px rgba(175, 181, 192, 0.18)',
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
  singleValue: (provided, state) => ({
    ...provided,
    padding: '2px 0',
    marginLeft: 0,
    color: state.selectProps.isDisabled ? '#CDD1DB' : '#1C212D',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
    display: 'flex',
    flexWrap: 'nowrap',
  }),
  option: (provided: CSSObjectWithLabel, state: OptionStateProps) => ({
    ...provided,
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    fontWeight: 400,
    fontSize: '12px',
    height: '40px',
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
  multiValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: 0,
    overflow: 'hidden',
    minWidth: '45px',
    border: 'none',
    backgroundColor: 'transparent',
  }),
  multiValueLabel: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: '0 !important',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
  }),
  multiValueRemove: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: 'none',
  }),
};

const DropdownIndicator = (props: DropdownIndicatorProps) => (
  <components.DropdownIndicator {...props}>
    <ArrowUp />
  </components.DropdownIndicator>
);

const DropdownDefault: FC<DropdownDefaultProps> = ({
  options,
  selected,
  placeholder = 'Выберите...',
  noOptionsMessage = 'Не найдено',
  disabled = false,
  defaultValue,
  menuIsOpen,
  hideSelectedOptions = false,
  closeMenuOnSelect = true,
  isSearchable = true,
  menuPlacement = 'auto',
  minMenuHeight = 140,
  customOption,
  maxMenuHeight = 300,
  label,
  onChange,
  onFocus,
  className,
  onBlur,
  isMulti,
  customOptionWithCheckbox,
  isClearable,
}) => (
  <>
    {label && <Label>{label}</Label>}
    <StyledSelect
      // @ts-ignore
      onChange={onChange}
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
      defaultValue={defaultValue}
      minMenuHeight={minMenuHeight}
      maxMenuHeight={maxMenuHeight}
      isSearchable={isSearchable}
      styles={isMulti ? customStyledWithMulti : customStyled}
      className={className}
      isMulti={isMulti}
      isClearable={isClearable}
      components={{
        ...components,
        DropdownIndicator: DropdownIndicator || components.DropdownIndicator,
        Option: customOption || customOptionWithCheckbox || components.Option,
      }}
      options={options}
      placeholder={placeholder}
    />
  </>
);

export default DropdownDefault;

const StyledSelect = styled(Select)`
  .dropdown__placeholder {
    color: ${({ theme: { colors } }) => colors.additional.placeholderGray};
  }
`;

const Label = styled(AppText)`
  margin-bottom: 4px;
  color: ${({ theme: { colors } }) => colors.greyScale[80]};
  ${({ theme: { typography } }) => typography.caption_14_10_regular};
`;
