import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC, InputHTMLAttributes, useState } from 'react';
import { components, GroupBase, InputProps, NoticeProps, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import GoogleMapService from 'services/google-maps';
import styled from 'styled-components';
import { Coords } from 'types/advert';
import { AppText } from 'ui';
import { customStyled } from 'ui/DropdownDefault/DropdownDefault';
import { stringCircumcision } from 'utils';
import { validateAddress } from 'utils/validations';

import SvgClose from '../../../../../public/svg/components/Close';
import SvgLocation from '../../../../../public/svg/components/Location';

type MapInputProps = {
  onLoadOptions: (value: string) => void;
  onChange: (value: string) => void;
  error: string;
  setError: (error: string) => void;
  setCurrentMarker: (elem: Coords | null) => void;
  setCenter: (elem: Coords) => void;
  setAddress: (address: any) => void;
  defaultValue: string;
} & InputHTMLAttributes<HTMLInputElement>;

const BASE_COORDINATE = { lat: 51.1801, lng: 71.446 };

const Input = (props: InputProps) => <components.Input name="input" {...props} isHidden={false} />;

const LoadingMessage = (props: NoticeProps) => (
  <components.LoadingMessage {...props}>
    <p>Загрузка...</p>
  </components.LoadingMessage>
);

const NoOptionsMessage = (props: NoticeProps) => (
  <components.NoOptionsMessage {...props}>
    <p>Нет результатов</p>
  </components.NoOptionsMessage>
);

const MapInput: FC<MapInputProps> = ({
  onLoadOptions,
  setAddress,
  onChange,
  error,
  setError,
  setCurrentMarker,
  defaultValue,
  setCenter,
  ...inputProps
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const { t } = useTranslation('addressPage');
  const { getIsBreakpoint } = useClientSize();
  const isWidthS = getIsBreakpoint('s');

  const clearInput = () => {
    setInputValue('');
    setError('');
    setCurrentMarker(null);
    setAddress('');
    setCenter(BASE_COORDINATE);
  };

  const onInputChange = (inputValue: string, { action }: { action: string }) => {
    if (action === 'input-change') {
      if (!inputValue) {
        setError('');
        setCurrentMarker(null);
        setCenter(BASE_COORDINATE);
      }
      setInputValue(inputValue);
    }
  };
  const getCoordinates = async (placeId: string) => {
    const res = await GoogleMapService.getPlacesDetails(placeId);
    if (validateAddress(res)) {
      setAddress(res);
    } else {
      setError(t('error'));
    }
    return res;
  };
  const handleChange = async (option: { label: string; value: string }) => {
    if (option?.label) {
      const label = isWidthS ? stringCircumcision(option.label, 30) : option.label;

      setInputValue(label);
      const res = await getCoordinates(option.value);
      await setCurrentMarker({
        lat: res.location.lat,
        lng: res.location.lng,
      });
      await setCenter({
        lat: res.location.lat,
        lng: res.location.lng,
      });
    }
  };

  return (
    <InputContainer>
      <StyledSvgLocation />
      <StyledCloseIcon onClick={clearInput} />
      <StyledDropdown
        styles={customStyles}
        loadOptions={onLoadOptions}
        isClearable
        defaultValue={defaultValue}
        onInputChange={onInputChange}
        inputValue={inputValue}
        controlShouldRenderValue={false}
        placeholder={t('placeholder')}
        components={{ Input, LoadingMessage, NoOptionsMessage }}
        // @ts-ignore
        onChange={async (e: { label: string; value: string }) => {
          await handleChange(e);
          if (onChange && e?.value) {
            onChange(e.value);
          }
        }}
        {...inputProps}
      />
      <Error font="caption_14_10_regular">{error}</Error>
    </InputContainer>
  );
};

export default MapInput;

const InputContainer = styled.div`
  margin-bottom: 24px;
  max-width: 738px;
  position: relative;
`;

const StyledSvgLocation = styled(SvgLocation)`
  position: absolute;
  z-index: 2;
  left: 16px;
  top: 8px;
`;

const StyledCloseIcon = styled(SvgClose)`
  position: absolute;
  right: 16px;
  top: 10px;
  z-index: 2;
  cursor: pointer;
`;

const StyledDropdown = styled(AsyncSelect)``;

const Error = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.additional.red};
`;

const customStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  ...customStyled,
  dropdownIndicator: () => ({
    display: 'none',
  }),
  loadingIndicator: () => ({
    display: 'none',
  }),
  clearIndicator: () => ({
    display: 'none',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '14px',
    borderBottom: '1px solid #E6E9EE !important',
    background: '#FFFFFF !important',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#F6F7F9 !important',
    },
  }),
  control: (provided) => ({
    ...provided,
    fontWeight: 400,
    maxWidth: '739px',
    borderRadius: '12px',
    border: '1px solid #E6E9EE !important',
    boxShadow: 'none',
    fontSize: '12px',
    lineHeight: '16px',
    background: 'white',
    paddingLeft: '56px !important',
    paddingRight: '52px !important',
    width: '100%',
    height: '40px',
    '&:hover': {
      borderColor: 'none !important',
      boxShadow: 'none',
    },
    '&:focus-within': {
      borderColor: '#8991A1 !important',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'rgba(137, 145, 161, 1) !important',
  }),
};
