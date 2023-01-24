import { useToggle } from 'hooks';
import useOnClickOutside from 'hooks/useClickOutside';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { NotificationList } from 'ui';

import { NotificationNo, NotificationYes } from '../../../public/svg/components';

const NotifyButton = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const isNotification = false;

  const { close, isOpened, toggle } = useToggle();

  useOnClickOutside(rootRef, close);

  return (
    <Root ref={rootRef}>
      <IconButton onClick={toggle}>{isNotification ? <NotificationYes /> : <NotificationNo />}</IconButton>
      <NotificationList isOpen={isOpened} notifications={[]} />
    </Root>
  );
};

export default NotifyButton;

const Root = styled.div`
  position: relative;
`;

const IconButton = styled.button`
  display: flex;
`;
