import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

interface StepComponentProps {
  index: number;
  title: string;
  info: string;
}

const StepComponent: FC<StepComponentProps> = ({ index, title, info }) => {
  return (
    <MainContainer>
      <Content>
        <NumberContainer>
          <NumberText variant={TextVariants.SECONDARY} font="title_56_48_medium">
            {index}
          </NumberText>
        </NumberContainer>
        <TextContainer>
          <AppText variant={TextVariants.SECONDARY} font="title_26_18_medium">
            {title}
          </AppText>
          <TextInfo font="body_22_14_regular">{info}</TextInfo>
        </TextContainer>
      </Content>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.greyScale[30]};
  `}
  display: flex;
  border-radius: 32px;
  gap: 24px;
  width: 100%;
  max-width: 1056px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 343px;
  }
`;

const Content = styled.div`
  display: flex;
  margin: 16px 40px 16px 40px;
  gap: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 16px;
    gap: 16px;
  }
`;

const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    align-items: flex-start;
    margin: 0 16px;
  }
`;

const NumberText = styled(AppText)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_40_32_medium}
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
  }
`;

const TextInfo = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.greyScale[50]};
  `}
`;

export default StepComponent;
