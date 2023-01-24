import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

import React from 'react';
import { toast } from 'react-toastify';
import { Toast } from 'ui';

const notify = (title: string, text?: string, action?: () => void): void => {
  toast(<Toast title={title} text={text} action={action} />, {
    position: 'top-right',
    autoClose: 2000,
    closeButton: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
  });
};

export default notify;
