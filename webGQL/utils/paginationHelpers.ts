import { FieldPolicy, Reference } from '@apollo/client';

type KeyArgs = FieldPolicy<string>['keyArgs'];

type TPageInfo = { afterCursor: string | null; count: number; perPage: number; beforeCursor: string | null };

type Relay<TNode> = {
  data: TNode[];
  pageInfo: TPageInfo;
};

type RelayFieldPolicy<TNode> = FieldPolicy<Relay<TNode>, Relay<TNode>, Relay<TNode>>;

export function getUniqueList(arr: any[], key: string) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

export function relayStylePagination<TNode = Reference>(
  keyArgs: KeyArgs = ['limit', 'afterCursor'],
  uniqueKey: keyof Reference = '__ref',
): RelayFieldPolicy<TNode> {
  return {
    keyArgs,
    merge(existing, incoming, { variables }) {
      const isAfterCursor = !!variables?.input?.afterCursor;
      const existingData = [...(existing?.data || [])];
      const incomingData = [...incoming.data];

      let newData;

      if (isAfterCursor) {
        newData = getUniqueList([...existingData, ...incomingData], uniqueKey);
      } else {
        newData = getUniqueList(incomingData, uniqueKey);
      }

      return { ...incoming, data: newData };
    },
  };
}

export function messagesPagination<TNode = Reference>(
  keyArgs: KeyArgs = ['limit', 'beforeCursor'],
  uniqueKey: keyof Reference = '__ref',
): RelayFieldPolicy<TNode> {
  return {
    keyArgs,
    merge(existing, incoming, { variables }) {
      const isBeforeCursor = !!variables?.input?.beforeCursor;
      const data = [...(existing?.data || [])];
      const existingData = !isBeforeCursor ? data.reverse() : data;
      const incomingData = [...incoming.data]?.reverse();

      let newData;

      if (isBeforeCursor) {
        newData = getUniqueList([...incomingData, ...existingData], uniqueKey);
      } else {
        newData = getUniqueList(incomingData, uniqueKey);
      }

      return { ...incoming, data: newData };
    },
  };
}
