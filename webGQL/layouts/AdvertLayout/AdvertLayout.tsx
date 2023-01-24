import { Steps } from 'layouts/AdvertLayout/components/Steps';
import { useTranslation } from 'next-i18next';
import { FC, FunctionComponentElement } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';

import { MainLayout } from '../MainLayout';
import { Hat } from './components';

type AdvertLayoutProps = {
  children: FunctionComponentElement<FC>;
  onSaveDraft?: () => void;
  isDisabled?: boolean;
  step?: string;
};

export enum RentTypesEnum {
  LONG = 'LONG',
  SHORT = 'SHORT',
  ALL = 'ALL',
}

const AdvertLayout: FC<AdvertLayoutProps> = ({ children, onSaveDraft, isDisabled, step }) => {
  const { t } = useTranslation('common');

  return (
    <StyledMainLayout
      headTitle={t('advertHeader.title')}
      childrenForHeader={<Hat onSaveDraft={onSaveDraft} isDisabled={isDisabled} title={t('advertHeader.title')} />}
      isSecondaryBackground>
      <Wrapper>
        <Content>{children}</Content>
        <Steps step={step!} />
      </Wrapper>
    </StyledMainLayout>
  );
};

export default AdvertLayout;

const StyledMainLayout = styled(MainLayout)`
  padding-bottom: 80px !important;
  @media (max-width: ${BreakpointsEnum.md}px) {
    padding: 0 !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 48px;
  align-items: flex-start;
  @media (max-width: ${BreakpointsEnum.md}px) {
    flex-direction: column-reverse;
    gap: 0;
  }
`;

const Content = styled.div`
  max-width: 848px;
  width: 100%;
  min-height: 440px;
  border-radius: 21px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[0]};
  @media (max-width: ${BreakpointsEnum.md}px) {
    max-width: 100%;
    border-radius: 0;
  }
`;
