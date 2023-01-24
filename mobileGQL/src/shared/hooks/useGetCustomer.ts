import { useGetCustomerById } from 'shared/qraphql/queries/__generated__/getCustomerById.query';

const useGetCustomer = (id?: string) => {
  const { data, loading } = useGetCustomerById({ variables: { id } });

  return {
    tags: data && 'tags' in data?.customerGetById ? data?.customerGetById.tags : [],
    avatarImage: data?.customerGetById.avatar?.imageUrl,
    hiddenName: data?.customerGetById.hiddenName,
    loading,
  };
};

export default useGetCustomer;
