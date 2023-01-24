import { Routes } from 'constains';
import { useClickOutside, useToggle } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { InputDataFiltersLong } from 'pagesComponents/ListApartmentsLongPage/components/BottomFilters/BottomFilters';
import { InputDataFiltersShort } from 'pagesComponents/ListApartmentsShortPage/components/BottomFilters/BottomFilters';
import { FC, useEffect, useRef } from 'react';
import { Control, UseFormGetValues } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { NumberInput, SignedInput } from 'ui';
import { ModalDropDown } from 'ui/ModalDropDown';
import { pluralHandler } from 'utils/textHelpers';

interface InputData {
  location: { value: string; label: string } | string;
  dateStart: string;
  dateEnd: string;
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;
}

interface GuestFieldProps {
  control: Control<InputData | InputDataFiltersShort | InputDataFiltersLong | any>;
  getValues: UseFormGetValues<InputData | InputDataFiltersShort | InputDataFiltersLong | any>;
  isSecondary?: boolean;
  isFullWidth?: boolean;
  withSettingInQuery?: boolean;
  className?: string;
}

const GuestField: FC<GuestFieldProps> = ({
  control,
  getValues,
  className,
  isSecondary = false,
  isFullWidth = false,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'forms' });
  const formModalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isOpened, toggle, close } = useToggle(false);

  const quantity = getValues(['numberOfGuests', 'numberOfChilds', 'numberOfPets']);
  const single = [t('singleGuest'), t('singleChild'), t('singlePet')];
  const plural = [t('pluralGuests'), t('pluralChilds'), t('pluralPets')];

  useClickOutside(formModalRef, () => {
    close();
  });

  const setParamsInQuery = () => {
    if (
      (!isOpened && router.pathname === Routes.listApartmentsLong) ||
      router.pathname === Routes.listApartmentsShort
    ) {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            numberOfAdults: quantity[0],
            numberOfChild: quantity[1],
            numberOfPets: quantity[2],
          },
        },
        undefined,
        { shallow: true },
      );
    }
  };

  useEffect(() => {
    setParamsInQuery();
  }, [isOpened]);

  return (
    <ModalContainer className={className} $isFullWidth={isFullWidth} ref={formModalRef}>
      <StyledGuestsInput
        $isSecondary={isSecondary}
        $isFullWidth={isFullWidth}
        title={isSecondary ? '' : t('formGuestNum')}
        value={pluralHandler(quantity, plural, single)}
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
      />
      <StyledModalDropDown isOpen={isOpened}>
        <ModalInputWithBorder
          title={t('titleGuest')}
          name="numberOfGuests"
          minValue={1}
          initialValue={Number(router?.query.numberOfGuests!) || 1}
          control={control}
        />
        <ModalInputWithBorder
          title={t('titleChilds')}
          name="numberOfChilds"
          initialValue={Number(router?.query.numberOfChild!) || 0}
          control={control}
        />
        <ModalInput
          title={t('titlePets')}
          name="numberOfPets"
          initialValue={Number(router?.query.numberOfPets!) || 0}
          control={control}
        />
      </StyledModalDropDown>
    </ModalContainer>
  );
};

const StyledModalDropDown = styled(ModalDropDown)`
  width: 277px;
`;

const StyledGuestsInput = styled(SignedInput)<{ $isSecondary: boolean; $isFullWidth: boolean }>`
  width: 100%;
  max-width: 277px;
  @media (max-width: ${BreakpointsEnum.md}px) {
    max-width: 100%;
  }

  ${({ theme, $isSecondary }) => css`
    ${$isSecondary &&
    `
  button{
    background:  ${theme.colors.greyScale[10]} !important;
    padding: 9px 16px 11px !important;
  }`}
  `}
  ${({ theme, $isFullWidth }) => css`
    ${$isFullWidth &&
    `
    max-width: 100%;
    width: 100%;
  button{
    max-width: 100%;
    width: 100%;
    background:  ${theme.colors.greyScale[10]} !important;
  }`}
  `}
`;

const ModalInputWithBorder = styled(NumberInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
    width: 250px;
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
  `}
`;

const ModalInput = styled(NumberInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
    width: 250px;
  `}
`;

const ModalContainer = styled.div<{ $isFullWidth: boolean }>`
  position: relative;
  max-width: 277px;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.md}px) {
    max-width: 100%;
  }
  ${({ $isFullWidth }) => css`
    ${$isFullWidth &&
    `
     max-width: 100%;
   `}
  `}
`;

export default GuestField;
