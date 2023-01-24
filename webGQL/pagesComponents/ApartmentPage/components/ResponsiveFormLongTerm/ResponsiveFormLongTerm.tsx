import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { Button, NumberInput, SignedInput } from 'ui';
import { pluralHandler } from 'utils';

type ResponsiveFormLongTermProps = {
  sendContractHandler: (data: DataType) => void;
  loading: boolean;
  close: () => void;
};

const ResponsiveFormLongTerm: FC<ResponsiveFormLongTermProps> = ({ loading, sendContractHandler, close }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'forms' });

  const { control, getValues, handleSubmit } = useForm<DataType>({
    defaultValues: {
      numberOfGuests: 1,
      numberOfChilds: 0,
      numberOfPets: 0,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: DataType) => {
    sendContractHandler(data);
    close();
  };

  const quantity = getValues(['numberOfGuests', 'numberOfChilds', 'numberOfPets']);
  const single = [t('singleGuest'), t('singleChild'), t('singlePet')];
  const plural = [t('pluralGuests'), t('pluralChilds'), t('pluralPets')];

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Content>
        <StyledGuestsInput
          title=""
          value={pluralHandler(quantity, plural, single)}
          onClick={(e) => {
            e.preventDefault();
          }}
        />
        <Container>
          <ModalInputWithBorder title={t('titleGuest')} name="numberOfGuests" initialValue={1} control={control} />
          <ModalInputWithBorder title={t('titleChilds')} name="numberOfChilds" initialValue={0} control={control} />
          <ModalInput title={t('titlePets')} name="numberOfPets" initialValue={0} control={control} />
        </Container>
      </Content>

      <Button text={t('continue')} isFullWight isLoading={loading} />
    </StyledForm>
  );
};

export default ResponsiveFormLongTerm;

type DataType = {
  numberOfGuests: number;
  numberOfChilds: number;
  numberOfPets: number;
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - 88px);
`;

const Content = styled.div``;

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

const ModalInput = styled(NumberInput)`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[0]};
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  `}
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
