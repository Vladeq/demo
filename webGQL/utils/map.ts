import { FieldPolicy, Reference } from '@apollo/client';

import { Coords } from '../types/advert';

const RADIUS_IN_KM = 6371.071;

type TPageInfo = { afterCursor: string | null; count: number; perPage: number; beforeCursor: string | null };

type KeyArgs = FieldPolicy<string>['keyArgs'];

type Relay<TNode> = {
  data: TNode[];
  pageInfo: TPageInfo;
};

type RelayFieldPolicy<TNode> = FieldPolicy<Relay<TNode>, Relay<TNode>, Relay<TNode>>;

export const mapSizeCalculation = (mk1: Coords, mk2: Coords) => {
  const lat1InRadians = mk1.lat * (Math.PI / 180);
  const lat2InRadians = mk2.lat * (Math.PI / 180);
  const latRadianDifference = lat2InRadians - lat1InRadians;
  const lngRadianDifference = (mk2.lng - mk1.lng) * (Math.PI / 180);

  return (
    2 *
    RADIUS_IN_KM *
    Math.asin(
      Math.sqrt(
        Math.sin(latRadianDifference / 2) * Math.sin(latRadianDifference / 2) +
          Math.cos(lat1InRadians) *
            Math.cos(lat2InRadians) *
            Math.sin(lngRadianDifference / 2) *
            Math.sin(lngRadianDifference / 2),
      ),
    )
  );
};

export function setMarkersInCache<TNode = Reference>(keyArgs: KeyArgs = []): RelayFieldPolicy<TNode> {
  return {
    keyArgs,
    merge(existing, incoming) {
      return { ...incoming };
    },
  };
}
