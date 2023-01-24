import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Control, UseFormGetValues } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { Button, NumberInput, SignedInput } from 'ui';
import { pluralHandler } from 'utils/textHelpers';

import { Routes } from '../../../../constains';

interface InputData {
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;

  location: string;
  dateStart: string;
  dateEnd: string;
  typeHousing: string | string[];
  price: string;
  rooms: string;
}

interface GuestFieldInModalProps {
  control: Control<any>;
  getValues: UseFormGetValues<InputData | any>;
  onClose: () => void;
}

const GuestFieldInModal: FC<GuestFieldInModalProps> = ({ control, getValues, onClose }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'forms' });
  const router = useRouter();

  const { query } = router;

  const values = [+query.numberOfAdults!, +query.numberOfChild!, +query.numberOfPets!];

  const single = [t('singleGuest'), t('singleChild'), t('singlePet')];
  const plural = [t('pluralGuests'), t('pluralChilds'), t('pluralPets')];

  const pluralValues = pluralHandler(values, plural, single);

  const applyFilters = async () => {
    const { numberOfGuests, numberOfChilds, numberOfPets } = getValues();

    await router.push(
      {
        pathname:
          router.pathname === Routes.listApartmentsLong ? Routes.listApartmentsLong : Routes.listApartmentsShort,
        query: {
          ...router.query,
          numberOfAdults: !numberOfGuests && numberOfGuests !== 0 ? router.query.numberOfAdults : numberOfGuests,
          numberOfChild: !numberOfChilds && numberOfChilds !== 0 ? router.query.numberOfChild : numberOfChilds,
          numberOfPets: !numberOfPets && numberOfPets !== 0 ? router.query.numberOfPets : numberOfPets,
        },
      },
      undefined,
      { shallow: true },
    );
    onClose();
  };

  return (
    <ModalContainer>
      <div>
        <StyledGuestsInput
          title=""
          value={pluralValues}
          onClick={(e) => {
            e.preventDefault();
          }}
        />
        <Container>
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
        </Container>
      </div>
      <Button type="submit" onClick={applyFilters} text={t('showVariants')} isFullWight />
    </ModalContainer>
  );
};

export default GuestFieldInModal;

const Container = styled.div`
  margin-top: 17px;
  width: 100%;
`;

const StyledGuestsInput = styled(SignedInput)`
  width: calc(100% - 32px);
  margin-left: 32px;
  button {
    background: ${({ theme: { colors } }) => colors.greyScale[10]} !important;
    padding: 9px 16px 11px !important;
  }
`;

const ModalInputWithBorder = styled(NumberInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
    width: 100%;
    padding-left: 0;
    padding-right: 0;
    border-bottom: 1px solid ${theme.colors.greyScale[30]};
  `}
`;

const ModalInput = styled(NumberInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  `}
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 88px);
`;
