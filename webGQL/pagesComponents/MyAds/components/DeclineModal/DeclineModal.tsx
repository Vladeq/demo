import { useApolloClient } from '@apollo/client';
import { useContractRequestReject } from 'graphql/mutations/Contract/__generated__/contractRequestReject';
import {
  LandlordRentRequest,
  LandlordRentRequestDocument,
  LandlordRentRequestVariables,
} from 'graphql/queries/Contracts/__generated__/getLanlordRentRequest.query';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Button, Textarea } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { LandlordRentRequestType, MAX_REQUESTS } from '../Requests/Requests';

interface InputData {
  reasonText: string;
}

type DeclineModalProps = {
  closeModal: () => void;
  currentRequest: LandlordRentRequestType;
};

const DeclineModal: FC<DeclineModalProps> = ({ currentRequest, closeModal }) => {
  const { t } = useTranslation('myAdsPage', { keyPrefix: 'requests' });
  const { cache } = useApolloClient();

  const [rejectContractRequest, { loading: isRejectLoading }] = useContractRequestReject();

  const { handleSubmit, control } = useForm<InputData>({
    defaultValues: {
      reasonText: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<InputData> = async (values) => {
    await rejectContractRequest({
      variables: { input: { contractRequestId: currentRequest.id, reason: values.reasonText } },
      onCompleted: handleCompletedReject,
    });

    closeModal();
  };

  const handleCompletedReject = () => {
    const rentRequestsExisting = cache.readQuery<LandlordRentRequest, LandlordRentRequestVariables>({
      query: LandlordRentRequestDocument,
      variables: { input: { type: currentRequest.apartmentRentPeriodType, limit: MAX_REQUESTS } },
    });

    const rentRequestsExistingData = rentRequestsExisting?.contractRequest__forLandlord.data || [];
    const rentRequestsIncomingData = rentRequestsExistingData.filter((request) => request.id !== currentRequest.id);

    updateRequestsInCache(rentRequestsExisting, rentRequestsIncomingData);
  };

  const updateRequestsInCache = (
    rentRequestsExisting: LandlordRentRequest | null,
    rentRequestsIncomingData: LandlordRentRequestType[],
  ) => {
    cache.writeQuery<LandlordRentRequest, LandlordRentRequestVariables>({
      query: LandlordRentRequestDocument,
      variables: { input: { type: currentRequest.apartmentRentPeriodType, limit: MAX_REQUESTS } },
      data: {
        ...rentRequestsExisting,
        contractRequest__forLandlord: {
          ...rentRequestsExisting?.contractRequest__forLandlord,
          data: rentRequestsIncomingData,
          pageInfo: {
            count: 0,
            perPage: 0,
            afterCursor: null,
            ...rentRequestsExisting?.contractRequest__forLandlord.pageInfo,
            __typename: 'PageAfterCursorInfo',
          },
          __typename: 'ContractRequestPaginationResponse',
        },
        __typename: 'Query',
      },
      overwrite: true,
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="reasonText"
        rules={{ maxLength: 500 }}
        render={({ field, fieldState: { error } }) => (
          <StyledTextarea
            placeholder={t('placeholderDecline')}
            error={error}
            hasCounter
            maxRows={7}
            maxLength={500}
            {...field}
          />
        )}
      />
      <ButtonContainer>
        <StyledButton
          disabled={isRejectLoading}
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.LONG_TEXT}
          text={t('btnSend')}
        />
      </ButtonContainer>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledTextarea = styled(Textarea)`
  overflow: hidden;
`;

const StyledButton = styled(Button)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;

export default DeclineModal;
