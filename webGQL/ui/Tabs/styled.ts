import styled, { css } from 'styled-components';

const ActiveTabCSS = css`
  background-color: ${({ theme: { colors } }) => colors.greyScale[100]};
  color: ${({ theme: { colors } }) => colors.greyScale[0]};
  border: none;
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.greyScale[90]};
  }
`;

const InactiveTabCSS = css`
  background-color: ${({ theme: { colors } }) => colors.greyScale[0]};
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
  border: ${({ theme: { colors } }) => `1px solid ${colors.greyScale[30]}`};
  &:hover {
    background-color: ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const getStylesTab = (isActive: boolean) => {
  if (isActive) {
    return ActiveTabCSS;
  }
  return InactiveTabCSS;
};

export const Tab = styled.button<{ isActive: boolean; $isSmall: boolean }>`
  ${({ isActive }) => getStylesTab(isActive)}

  ${({ $isSmall }) => ($isSmall ? 'padding: 5px 15px;' : 'padding: 16px 25px;')}

  cursor: pointer;
  transition: 0.3s;

  :first-child {
    border-radius: 12px 0 0 12px;
  }

  :last-child {
    border-radius: 0 12px 12px 0;
  }

  &:focus {
    box-shadow: 0 0 0 4px ${({ theme: { colors } }) => colors.greyScale[50]};
    z-index: 9999;
  }

  ${({ theme: { typography }, isActive }) =>
    isActive ? typography.caption_16_12_medium : typography.caption_16_12_regular}
`;
