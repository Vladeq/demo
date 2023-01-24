import { ApartmentRentPeriodType } from '__generated__/types';
import { NotifyContainer } from 'components/CardRequest/NotifyContainer';
import { FEE_PERCENTS_LONG_TERM } from 'constains';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { notify } from 'services';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { RequestStatusEnum } from 'types/card';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { getPercentOnRent, handleDivisionOnCategories } from 'utils';

import { useSendContractRequest } from '../../graphql/mutations/Advert/__generated__/sendContractRequest.mutation';
import { FormRequest } from './FormRequest';
import { FormDataFormRequest } from './FormRequest/FormRequest';

interface CardRequestProps {
  cost: number;
  isMonthPeriod: boolean;
  cardStatus: RequestStatusEnum;
  id?: string;
  middleRequest?: string;
}

const CardRequest: FC<CardRequestProps> = ({ cost, cardStatus, id, isMonthPeriod, middleRequest }) => {
  const { t } = useTranslation('ui');

  const [sendContractRequest, { loading }] = useSendContractRequest();

  const sendContractHandler = async (data: FormDataFormRequest) => {
    await sendContractRequest({
      variables: {
        input: {
          apartmentAdId: id!,
          apartmentRentPeriodType: ApartmentRentPeriodType.LongTerm,
          guests: {
            numberOfAdult: data.numberOfGuests,
            numberOfChildren: data.numberOfChilds,
            numberOfPets: data.numberOfPets,
          },
        },
      },
      onCompleted: () => notify(t('cards.requestSuccessful')),
    });
  };

  const serviceCommission = Math.round(getPercentOnRent(cost, FEE_PERCENTS_LONG_TERM));

  const showServiceCommission = handleDivisionOnCategories(String(serviceCommission));
  const showTotal = handleDivisionOnCategories(String(cost + serviceCommission));
  const paymentPeriod = isMonthPeriod ? t('cards.perMonth') : t('cards.perDay');
  const isPaused = cardStatus === 'PAUSED';
  const isAvalaibleFormRequest = cardStatus === 'INIT' || isPaused;

  return (
    <CardContainer>
      <InfoContainer>
        <PeriodContainer>
          {isPaused ? (
            <PeriodText font="title_36_26_bold">{showTotal} ₸ </PeriodText>
          ) : (
            <AppText variant={TextVariants.SECONDARY} font="title_36_26_bold">
              {showTotal} ₸{' '}
            </AppText>
          )}
          <PeriodText font="title_36_26_bold">{paymentPeriod}</PeriodText>
        </PeriodContainer>
        <FeeContainer>
          <ServicesText font="caption_16_12_regular">
            {t('cards.serviceFee')} {showServiceCommission} ₸ {t('cards.feeIncluded')}
          </ServicesText>
        </FeeContainer>
        <NotifyContainer type={cardStatus} middleRequest={middleRequest} />
        <ButtonsContainer>
          {isAvalaibleFormRequest ? (
            <FormRequest isPaused={isPaused} sendContractHandler={sendContractHandler} loading={loading} />
          ) : (
            <StyledButton
              text={t('buttons.btnGoToMyRent')}
              size={ButtonSize.NORMAL}
              variant={ButtonVariant.SECONDARY}
            />
          )}
        </ButtonsContainer>
      </InfoContainer>
    </CardContainer>
  );
};

export default CardRequest;

const CardContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.greyScale[10]};
    border: none;
    border-radius: 22px;
    width: 400px;
  `}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
`;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PeriodText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
    margin: 0 10px;
  `}
`;

const FeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

const ServicesText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[60]};
  `}
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
