import { isEqual } from 'lodash';
import { useState } from 'react';

import { useGetInterests } from './__generated__/getInterests.query';

const useInterest = () => {
  const { data } = useGetInterests();

  const oldInterstsIds = data?.me.tags.map((item) => item.id);

  const [activeTagsArray, setActiveTagsArray] = useState<string[]>(oldInterstsIds || []);

  const isNoChanges = isEqual(activeTagsArray.sort(), oldInterstsIds?.sort());

  return { activeTagsArray, isNoChanges, setActiveTagsArray };
};

export default useInterest;
