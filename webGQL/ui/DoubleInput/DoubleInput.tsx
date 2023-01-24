import {
  APARTMENT_MAX_PRICE_FOR_BOOKING,
  APARTMENT_MIN_PRICE_FOR_BOOKING_LONG,
  APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT,
  Routes,
} from 'constains';
import { useDebounce } from 'hooks';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AppText } from 'ui';
import { getQueryFromUrl } from 'utils';
import { handleDivisionOnCategories } from 'utils/divisionOnCategories';

type DoubleInputProps = {
  title?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const DoubleInput: FC<DoubleInputProps> = ({ disabled, title }) => {
  const refOnRightTab = useRef<HTMLInputElement>(null);
  const refOnLeftTab = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [minPrice, setMinPrice] = useState(router.query.min as string);
  const [maxPrice, setMaxPrice] = useState(router.query.max as string);

  const defaultMinPrice =
    router.pathname === Routes.listApartmentsShort
      ? APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT
      : APARTMENT_MIN_PRICE_FOR_BOOKING_LONG;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = handleDivisionOnCategories(event.target.value);
  };

  const debouncedMinPrice = useDebounce(minPrice);
  const debouncedMaxPrice = useDebounce(maxPrice);

  const setPriceInQuery = () => {
    const min = debouncedMinPrice?.replaceAll(' ', '');
    const max = debouncedMaxPrice?.replaceAll(' ', '');
    router.push(
      {
        pathname: router.pathname,
        query: { ...getQueryFromUrl(router.asPath), max, min },
      },
      undefined,
      {
        shallow: true,
      },
    );
  };

  const setPriceInInput = () => {
    const { query } = router;
    if (query.max !== maxPrice) {
      setMaxPrice(
        handleDivisionOnCategories(String(router.query.max) || '') ||
          handleDivisionOnCategories(APARTMENT_MAX_PRICE_FOR_BOOKING),
      );
    }
    if (query.min !== minPrice) {
      setMinPrice(
        handleDivisionOnCategories(String(router.query.min) || '') || handleDivisionOnCategories(defaultMinPrice),
      );
    }
  };

  useEffect(() => {
    setPriceInQuery();
  }, [debouncedMinPrice, debouncedMaxPrice]);

  useEffect(() => {
    setPriceInInput();
  }, [router.query]);

  return (
    <Root $isDisabled={disabled}>
      {title && <Title>{title}</Title>}
      <Wrapper $isDisabled={disabled}>
        <InputContainer $isDisabled={disabled} onClick={() => refOnLeftTab?.current?.focus()}>
          <Prefix font="caption_16_12_regular">от</Prefix>
          <StyledInput
            disabled={disabled}
            value={minPrice}
            onChange={async (e) => {
              handleOnChange(e);
              await setMinPrice(() => e.target.value);
            }}
            ref={refOnLeftTab}
          />
        </InputContainer>
        <InputContainer $isDisabled={disabled} onClick={() => refOnRightTab?.current?.focus()}>
          <Prefix font="caption_16_12_regular">до</Prefix>
          <StyledInput
            disabled={disabled}
            type="text"
            value={maxPrice}
            onChange={async (e) => {
              handleOnChange(e);
              await setMaxPrice(() => e.target.value);
            }}
            ref={refOnRightTab}
          />
        </InputContainer>
      </Wrapper>
    </Root>
  );
};

export default DoubleInput;

const Root = styled.div<{ $isDisabled?: boolean }>`
  max-width: 168px;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'auto')};
`;

const InputContainer = styled.button<{ $isDisabled?: boolean }>`
  display: flex;
  position: relative;
  padding: 12px 10px 12px 12px;
  gap: 4px;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'auto')} !important;

  :last-child {
    &:focus-within {
      border-width: 1px 1px 1px 0;
      border-style: solid;
      border-radius: 0 12px 12px 0;
      margin: -1px -1px -1px 1px;
      padding: 12px 10px 12px 11px;
      border-color: ${({ theme: { colors }, $isDisabled }) => ($isDisabled ? 'transparent' : colors.greyScale[60])};
    }
  }

  :first-child {
    &:focus-within {
      border-width: 1px 0 1px 1px;
      border-style: solid;
      border-radius: 12px 0 0 12px;
      margin-left: -1px;
      margin-top: -1px;
      margin-bottom: -1px;
      padding: 12px 10px 12px 12px;
      border-color: ${({ theme: { colors }, $isDisabled }) => ($isDisabled ? 'transparent' : colors.greyScale[60])};
    }
    &:before {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 32px;
      background-color: ${({ theme: { colors } }) => colors.greyScale[30]};
    }
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  padding: 0;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
  ${({ theme: { typography } }) => typography.caption_16_12_regular};

  &:disabled {
    cursor: not-allowed;
  }
`;

const Wrapper = styled.div<{ $isDisabled?: boolean }>`
  display: flex;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'auto')};
  border-radius: 12px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  background: ${({ theme: { colors } }) => colors.greyScale[10]};
`;

const Prefix = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[50]};
`;

const Title = styled(AppText)`
  ${({ theme: { typography } }) => typography.caption_14_10_regular}
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
  margin-bottom: 2px;
`;
