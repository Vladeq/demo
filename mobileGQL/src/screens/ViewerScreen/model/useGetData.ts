import { useGetFreeInitiatesLeft } from 'shared/qraphql/queries/__generated__/getFreeInitiatesLeft.query';
import { useGetSuperLikesLeft } from 'shared/qraphql/queries/__generated__/getSuperLikesLeft.query';

import { useGetMe } from './__generated__/getMe.query';

const useGetData = () => {
  const { data: viewer, loading: loadingViewer } = useGetMe();
  const { data: initiateLeft, loading: loadingInitiateLeft } = useGetFreeInitiatesLeft();
  const { data: superLikesLeft, loading: loadingSuperLikesLeft } = useGetSuperLikesLeft();

  return {
    viewer: viewer?.me,
    initiateLeft: initiateLeft?.getFreeInitiatesLeft,
    superLikesLeft: superLikesLeft?.getSuperLikesLeft,
    loadingViewer,
    loadingSuperLikesLeft,
    loadingInitiateLeft,
  };
};

export default useGetData;
