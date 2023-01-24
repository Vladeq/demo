import { makeVar } from '@apollo/client';

export type PositionType = {
  lat: number;
  long: number;
};

const positionVar = makeVar<PositionType | null>(null);

export default positionVar;
