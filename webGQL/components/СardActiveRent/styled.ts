import styled, { css } from 'styled-components';

export const Card = styled.div`
  ${({ theme }) => css`
    display: flex;
    background-color: ${theme.colors.greyScale[0]};
    border: 1px solid ${theme.colors.greyScale[30]};
    border-radius: 24px;
    overflow: hidden;
    &:hover {
      background-color: ${theme.colors.greyScale[10]};
    }
  `}
`;
