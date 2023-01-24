import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import SvgClose from '../../../public/svg/components/Close';
import SvgSearchNormal from '../../../public/svg/components/SearchNormal';
import { BaseInput } from '../BaseInput';

type SearchInputProps = {
  onClearInput: () => void;
  isLong?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchInput: FC<SearchInputProps> = ({
  defaultValue,
  value,
  disabled,
  onClearInput,
  className,
  isLong,
  ...inputProps
}) => {
  return (
    <Root className={className}>
      <SearchIconContainer>
        <StyledSearchIcon isDisabled={disabled} />
      </SearchIconContainer>
      <StyledSearchInput
        isLong={isLong}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        {...inputProps}
      />
      {!disabled && (value || defaultValue) && (
        <CloseIconContainer onClick={onClearInput}>
          <SvgClose />
        </CloseIconContainer>
      )}
    </Root>
  );
};

export default SearchInput;

const Root = styled.div`
  position: relative;
  max-width: 176px;
  width: 100%;
`;

const StyledSearchInput = styled(BaseInput)`
  width: 100%;
  min-width: 176px;
  padding: 12px 40px 12px 56px;
  border: none;

  &:focus {
    border: ${({ theme: { colors } }) => `1px solid ${colors.greyScale[60]}`};
    padding: 11px 39px 11px 55px;
  }
`;

const SearchIconContainer = styled.div<{ isDisabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: 16px;
  height: 24px;
  transform: translateY(-50%);
`;

const CloseIconContainer = styled.button`
  padding: 0;
  height: 20px;
  right: 16px;
  cursor: pointer;
  border: none;
  top: 12px;
  outline: none;
  background: transparent;
  position: absolute;
`;

const StyledSearchIcon = styled(SvgSearchNormal)<{ isDisabled?: boolean }>`
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'auto')};
  path {
    stroke: ${({ theme: { colors }, isDisabled }) => (isDisabled ? colors.greyScale[40] : colors.greyScale[50])};
  }
`;
