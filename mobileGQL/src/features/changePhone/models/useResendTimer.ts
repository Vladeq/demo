import { useState } from 'react';
import { useInterval } from 'shared/hooks';

import { RESEND_CODE_TIMER } from '../config';

const useResendTimer = () => {
  const [resendTimer, setResendTimer] = useState(RESEND_CODE_TIMER);

  useInterval(() => {
    if (resendTimer > 0) {
      setResendTimer(resendTimer - 1);
    }
  }, 1000);

  return { resendTimer, setResendTimer };
};

export default useResendTimer;
