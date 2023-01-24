import { useContractOfferAccept } from 'graphql/mutations/Contract/__generated__/contractOfferAccept';
import { useGetCardsLazyQuery } from 'graphql/queries/User/__generated__/getCards.query';
import { innopayCardCompleteVar } from 'libs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { Oval as Loader } from 'react-loader-spinner';
import styled, { useTheme } from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { getCookie } from 'utils';

import { CloseCircle, TickCircle } from '../../../public/svg/components';
import { useSetInnopayCardEnd } from '../../graphql/mutations/User/__generated__/setInnopayCardEnd.mutation';

enum StatesEnum {
  LOADING,
  SUCCESS,
  ERROR,
}

const PaymentPage = () => {
  const { colors } = useTheme();
  const [fetchInnopayCardEnd] = useSetInnopayCardEnd();
  const router = useRouter();
  const { t } = useTranslation('paymentPage', { keyPrefix: 'states' });
  const [currentState, setCurrentState] = useState(StatesEnum.LOADING);
  const { cardId, customerReference } = router.query;

  console.log(router.query, 'query');

  const onCompleted = () => {
    setCurrentState(StatesEnum.SUCCESS);
    setTimeout(() => innopayCardCompleteVar(true), 1000);
  };

  const onError = () => {
    setCurrentState(StatesEnum.ERROR);
  };

  const [getCards] = useGetCardsLazyQuery();
  const [acceptContractOfferFetch, { loading }] = useContractOfferAccept({ onCompleted, onError });

  useEffect(() => {
    acceptContractOffer();
  }, [router.query]);

  useEffect(() => {
    if (loading) {
      setCurrentState(StatesEnum.LOADING);
    }
  }, [loading]);

  const states = useMemo(
    () => ({
      [StatesEnum.LOADING]: {
        title: t('paymentInProgress'),
        description: null,
        icon: (
          <Loader
            width={40}
            height={40}
            strokeWidth={3}
            strokeWidthSecondary={3}
            color={colors.greyScale[100]}
            secondaryColor={colors.greyScale[30]}
          />
        ),
      },
      [StatesEnum.SUCCESS]: {
        title: t('paymentMade'),
        description: null,
        icon: <TickCircle color={colors.additional.green} width={40} height={40} />,
      },
      [StatesEnum.ERROR]: {
        title: t('error.title'),
        description: t('error.description'),
        icon: <CloseCircle width={40} height={40} />,
      },
    }),
    [t],
  );

  const isError = currentState === StatesEnum.ERROR;
  const paymentState = states[currentState];

  const acceptContractOffer = async () => {
    await fetchInnopayCardEnd({
      variables: {
        input: {
          cardId: Number(cardId),
          customerReference: customerReference as string,
        },
      },
      onError,
    });
    console.log('cardEnd');
    const cardIdLivin = await getCardId();
    console.log(cardIdLivin, 'liv');
    const chatId = getCookie('chatId') || '';
    console.log(chatId, 'chatId');

    await acceptContractOfferFetch({ variables: { input: { chatId, cardId: cardIdLivin } } });
  };

  const getCardId = async () => {
    const { data } = await getCards();
    const cards = data?.innopay__myCards;
    const currentCard = cards?.find((card) => card.cnpCardId === Number(router.query.cardId));
    return currentCard?.id || '';
  };

  return (
    <Root>
      <StateContainer>
        {paymentState.icon}
        <StateWrapper>
          <AppText font="title_22_18_medium" variant={TextVariants.SECONDARY}>
            {paymentState.title}
          </AppText>
          {paymentState.description && <AppText font="body_24_16_regular">{paymentState.description}</AppText>}
        </StateWrapper>
        {isError && <StyledButton text={t('error.buttonText')} onClick={() => innopayCardCompleteVar(true)} />}
      </StateContainer>
    </Root>
  );
};

export default PaymentPage;

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-items: center;
`;

const StateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 250px;
`;
