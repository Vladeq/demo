import { useReactiveVar } from '@apollo/client';
import { AppConfig } from 'constains';
import {
  SetInnopayCardStart,
  useSetInnopayCardStart,
} from 'graphql/mutations/User/__generated__/setInnopayCardStart.mutation';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import { notify } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

import { innopayCardCompleteVar } from '../../libs/apollo-client/react-variables';

type ModalInnopayProps = {
  onComplete: () => void;
  isPayment?: boolean;
};

export const ModalInnopay: FC<ModalInnopayProps> = ({ onComplete, isPayment = false }) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'security' });
  const isInnopayCardComplete = useReactiveVar(innopayCardCompleteVar);

  const [fetchInnopayCardStart] = useSetInnopayCardStart();
  const [iframeInnopayUrl, setIframeInnopayUrl] = useState('');

  const handleCompleteInnopayCardStart = (data: SetInnopayCardStart) => {
    if (data.innopay__saveCard_start.url) {
      setIframeInnopayUrl(data.innopay__saveCard_start.url);
    }
  };

  const handleComplete = () => {
    if (isInnopayCardComplete) {
      onComplete();
    }
  };

  const returningUrl = isPayment ? `${AppConfig.INNOPAY_PAYMENT_RETURNING_URL}` : `${AppConfig.INNOPAY_RETURNING_URL}`;

  useEffect(() => {
    fetchInnopayCardStart({
      variables: {
        input: {
          returningUrl,
        },
      },
      onCompleted: handleCompleteInnopayCardStart,
      onError: () => notify(t('somethingError')),
    });
  }, []);

  useEffect(handleComplete, [isInnopayCardComplete]);

  return <Root src={iframeInnopayUrl} />;
};

const Root = styled.iframe`
  width: 100%;
  height: 75vh;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    height: 563px;
    max-height: 563px;
  }
`;
