import { makeVar } from '@apollo/client';

const tokenVar = makeVar<string | null>(null);

export default tokenVar;
