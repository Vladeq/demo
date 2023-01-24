import { useClickOutside } from 'hooks';
import dynamic from 'next/dynamic';
import { FC, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ArrowLeft } from '../../../public/svg/components';

type BaseModalProps = {
  isVisible?: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Portal = dynamic(() => import('hocs/portal/portal'), { ssr: false });

const ResponsiveModal: FC<BaseModalProps> = ({ onClose, isVisible, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('keydown', close);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Wrapper>
      <Container ref={ref}>
        <BackButton onClick={onClose}>
          <ArrowLeft />
        </BackButton>
        {children}
      </Container>
    </Wrapper>
  );
};

export default ResponsiveModal;

const Wrapper = styled(Portal)`
  position: fixed;
  top: 72px;
  left: 0;
  z-index: 9999;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 0 16px;
`;

const BackButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  height: 40px;
  cursor: pointer;
`;
