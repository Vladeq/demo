import { useClientSize, useWindowScroll } from 'hooks';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Breadcrumbs, IconButton } from 'ui';
import { IconButtonSize } from 'ui/IconButton/IconButton';

import { ArrowLeft } from '../../../../../public/svg/components';

interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { getIsBreakpoint } = useClientSize();
  const { scrollY } = useWindowScroll();

  const isScroll = scrollY > 0;

  return (
    <MainContainer>
      <Content>
        {getIsBreakpoint('s') ? (
          <>
            <TitleBlock $isVisible={!isScroll}>
              <ArrowLeft width={24} height={24} />
              <NavigationTitleText variant={TextVariants.SECONDARY} font="title_22_18_bold">
                {title}
              </NavigationTitleText>
            </TitleBlock>
            <FixedTitleBlock $isVisible={isScroll}>
              <IconButton IconComponent={ArrowLeft} size={IconButtonSize.SMALL} />
              <FixedTitleText variant={TextVariants.SECONDARY} font="body_20_14_medium">
                {title}
              </FixedTitleText>
            </FixedTitleBlock>
          </>
        ) : (
          <Breadcrumbs title={title} />
        )}
        <TitleText variant={TextVariants.SECONDARY}>{title}</TitleText>
      </Content>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 72px 24px;
  max-width: 1440px;
  margin: 0 auto;
  gap: 24px;
  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 0;
  }
`;

const TitleText = styled(AppText)`
  ${({ theme: { typography } }) => typography.title_36_26_bold};
  @media (max-width: ${BreakpointsEnum.s}px) {
    display: none;
  }
`;

const TitleBlock = styled.div<{ $isVisible: boolean }>`
  ${({ $isVisible }) => ($isVisible ? `display: flex` : `display: none`)};
  gap: 16px;
  width: 100%;
  padding: 17px 16px;
  border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const FixedTitleBlock = styled.div<{ $isVisible: boolean }>`
  display: none;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ $isVisible, theme: { colors } }) =>
      css`
        ${$isVisible &&
        css`
          display: flex;
          width: 100%;
          position: fixed;
          top: 72px;
          align-items: center;
          gap: 8px;
          background-color: ${colors.greyScale[10]};
          padding: 0 16px;
          z-index: 99999;
        `}
      `}
  }
`;

const FixedTitleText = styled(AppText)`
  padding: 14px 0px;
`;

const NavigationTitleText = styled(AppText)`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export default Header;
