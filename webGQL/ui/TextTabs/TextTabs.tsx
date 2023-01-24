import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

interface TabType {
  title: string;
  value: string;
}

interface TabsProps {
  handleChangeActiveTab: (index: number) => () => void;
  activeTab: TabType;
  isSmall?: boolean;
  tabs: Array<TabType>;
  className?: string;
}

const TextTabs: FC<TabsProps> = ({ handleChangeActiveTab, activeTab, tabs, isSmall, className, ...props }) => (
  <Root isSmall={isSmall} {...props}>
    {tabs.map((tab, index) => {
      const isActive = tab.value === activeTab.value;
      return (
        <Tab
          isActive={isActive}
          key={index}
          onClick={handleChangeActiveTab(index)}
          isSmall={isSmall}
          className={className}>
          {tab.title}
        </Tab>
      );
    })}
  </Root>
);

export default TextTabs;

const Root = styled.ul<{ isSmall: boolean | undefined }>`
  display: flex;
  gap: ${({ isSmall }) => (isSmall ? '24px' : '86px')};
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 32px;
  }
`;

const Tab = styled.li<{ isActive: boolean; isSmall: boolean | undefined }>`
  padding-left: 0;
  padding-right: 0;
  padding-bottom: ${({ isSmall }) => (isSmall ? '14px' : '22px')};
  width: auto;
  cursor: pointer;
  color: ${({ theme: { colors }, isActive }) => (isActive ? colors.greyScale[100] : colors.greyScale[60])};
  background-color: ${({ theme: { colors } }) => colors.greyScale[0]};
  ${({ theme: { typography } }) => typography.title_22_18_medium}
  border-bottom: 2px solid
    ${({ theme: { colors }, isActive }) => (isActive ? colors.greyScale[100] : colors.greyScale[0])};
  ${({ theme: { typography } }) => typography.title_22_18_medium}
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.body_24_16_medium}
    padding-bottom: 6px;
  }
`;
