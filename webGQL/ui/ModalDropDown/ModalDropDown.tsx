import { useDisableScrollBody } from 'hooks/useDisableScroll';
import { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  isDisableScrollBody?: boolean;
  className?: string;
}

const ModalDropDown = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, isDisableScrollBody = true, isOpen, className }, ref) => {
    useDisableScrollBody(isOpen && isDisableScrollBody);
    return (
      <Root className={className} $isOpen={isOpen} ref={ref}>
        {children}
      </Root>
    );
  },
);

ModalDropDown.displayName = 'ModalDropDown';

const Root = styled.div<{ $isOpen: boolean }>`
  ${({ $isOpen, theme }) => css`
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 100;
    display: none;
    border: none;
    border-radius: 16px;
    width: 200px;
    height: fit-content;
    margin-top: 60px;
    padding-right: 0px;
    overflow-y: scroll;
    background-color: ${theme.colors.greyScale[0]};
    box-shadow: 0px 10px 33px ${theme.colors.greyScale[50]};

    ${$isOpen &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
  `}
`;
export default ModalDropDown;
