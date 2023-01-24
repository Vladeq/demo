import { innopayCardCompleteVar } from 'libs';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Oval as Loader } from 'react-loader-spinner';
import styled, { useTheme } from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';
import { getCookie, setCookie } from 'utils';

import { CloseCircle, TickCircle } from '../../../public/svg/components';
import { useAddPaymentMethod } from '../../graphql/mutations/Advert/__generated__/addPaymentMethod.mutation';
import { useSetInnopayCardEnd } from '../../graphql/mutations/User/__generated__/setInnopayCardEnd.mutation';
import { useGetCardsLazyQuery } from '../../graphql/queries/User/__generated__/getCards.query';

enum StatesEnum {
  LOADING,
  SUCCESS,
  ERROR,
}

const CardLinkingPage: FC = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const { t } = useTranslation('cardLinkingPage', { keyPrefix: 'states' });
  const [fetchInnopayCardEnd] = useSetInnopayCardEnd();
  const [getCards] = useGetCardsLazyQuery();

  console.log(router.query, 'query innopay'); // не удалять потому что только на стейдже можно эти логи посмотреть

  const onError = () => {
    setCurrentState(StatesEnum.ERROR);
  };

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

  const [currentState, setCurrentState] = useState(StatesEnum.LOADING);
  const [setPaymentMethod] = useAddPaymentMethod();

  const { cardId, customerReference } = router.query;

  const handleCompleteInnopayCardEnd = () => {
    innopayCardCompleteVar(true);
  };
  const advertId = getCookie('advertId');

  const saveCard = async () => {
    if (cardId && customerReference) {
      await fetchInnopayCardEnd({
        variables: {
          input: {
            cardId: Number(cardId),
            customerReference: customerReference as string,
          },
        },
        onError,
        onCompleted: handleCompleteInnopayCardEnd,
      });
      const { data } = await getCards();
      const cards = data?.innopay__myCards;
      const currentCard = cards?.find((card) => card.cnpCardId === Number(cardId));
      await setPaymentMethod({
        variables: {
          input: {
            id: advertId!,
            cardId: currentCard?.id!,
          },
        },
      });
      setCookie('isCardSuccess', 'true');
      setCurrentState(StatesEnum.SUCCESS);
    }
  };

  const paymentState = states[currentState];

  useEffect(() => {
    saveCard();
  }, [router.query]);

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
      </StateContainer>
    </Root>
  );
};

export default CardLinkingPage;

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
