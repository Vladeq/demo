import React, { ButtonHTMLAttributes, FC, useState } from 'react';
import styled, { css } from 'styled-components';

import { ArrowRight2 } from '../../../public/svg/components';

type ChatButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const ChatButton: FC<ChatButtonProps> = (props) => {
  const [isDown, setIsDown] = useState(false);
  return (
    <Root {...props} $isDown={isDown} onMouseDown={() => setIsDown(true)} onMouseUp={() => setIsDown(false)}>
      <ArrowUp />
    </Root>
  );
};

export default ChatButton;

const Root = styled.button<{ $isDown: boolean }>`
  ${({ theme: { colors }, $isDown }) => css`
    display: flex;
    width: 40px;
    min-width: 40px;
    height: 40px;

    align-items: center;
    justify-content: center;

    border-radius: 12px;
    background-color: ${colors.greyScale[100]};

    transform: translateY(0);
    transition: all 0.2s linear;

    svg {
      width: 24px;
      height: 24px;

      path {
        stroke: ${colors.greyScale[0]};
      }
    }

    :disabled {
      cursor: not-allowed;
      background-color: ${colors.greyScale[60]};

      svg {
        path {
          stroke: ${colors.greyScale[40]};
        }
      }
    }

    :not(:disabled) {
      :hover {
        background-color: ${colors.greyScale[90]};
      }

      :focus,
      :focus-visible {
        box-shadow: 0 0 0 4px ${colors.greyScale[50]};
      }
    }

    ${$isDown &&
    css`
      transform: translateY(2px);
      box-shadow: 0px 4px 6px rgba(28, 33, 45, 0.3);
    `}
  `}
`;

const ArrowUp = styled(ArrowRight2)`
  transform: rotate(-90deg);
`;
