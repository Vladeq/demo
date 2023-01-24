import { OnSubscriptionDataOptions, useApolloClient } from '@apollo/client';
import { ContractChatFragment } from 'graphql/fragments/Contract/__generated__/Contract';
import { UpdateContract, useUpdateContract } from 'graphql/subscription/Contract/__generated__/updateContract';

type ContractChatFragmentType = UpdateContract['updateContract']['contract'];

const useContractSubscription = () => {
  const { cache } = useApolloClient();

  const onSubscriptionData = (contractData: OnSubscriptionDataOptions<UpdateContract>) => {
    const contract = contractData.subscriptionData.data?.updateContract.contract;

    updateContractInCache(contract);
  };

  const updateContractInCache = (contract: ContractChatFragmentType) => {
    cache.writeFragment<ContractChatFragmentType, undefined>({
      fragment: ContractChatFragment,
      data: contract,
      overwrite: true,
      fragmentName: 'ContractChatFragment',
    });
  };

  useUpdateContract({
    onSubscriptionData,
  });
};

export default useContractSubscription;
