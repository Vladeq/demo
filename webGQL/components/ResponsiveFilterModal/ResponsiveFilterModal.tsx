import { useClickOutside } from 'hooks';
import dynamic from 'next/dynamic';
import { FC, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

type ResponsiveFilterModalProps = {
  isVisible?: boolean;
  onGoBack?: () => void;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
};

const Portal = dynamic(() => import('hocs/portal/portal'), { ssr: false });

const ResponsiveFilterModal: FC<ResponsiveFilterModalProps> = ({ onClose, isVisible, children, className }) => {
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
      <Body ref={ref} className={className}>
        {children}
      </Body>
    </Wrapper>
  );
};

export default ResponsiveFilterModal;

const Wrapper = styled(Portal)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999999;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;

const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: ${({ theme: { colors } }) => colors.greyScale[0]};
  outline: none;
`;
