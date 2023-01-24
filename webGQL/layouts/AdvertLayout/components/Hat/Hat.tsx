import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonVariant } from 'ui/Button/Button';

import { Floppy } from '../../../../../public/svg/components';
import { Routes } from '../../../../constains';

type HatProps = {
  title: string;
  onSaveDraft?: () => void;
  isDisabled?: boolean;
};

const Hat: FC<HatProps> = ({ title, onSaveDraft, isDisabled }) => {
  const { t } = useTranslation('common', { keyPrefix: 'advertHeader' });
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useRouter();

  const handleSaveDraft = async () => {
    if (onSaveDraft) {
      setIsLoading(true);
      await onSaveDraft();
      setIsLoading(false);
    }
  };

  const isButtonShow = pathname !== Routes.adCreate;

  return (
    <Root>
      <Title font="title_48_40_bold" variant={TextVariants.SECONDARY} forwardedAs="h1">
        {title}
      </Title>
      {isButtonShow && (
        <>
          <ButtonContainer>
            <Button
              onClick={handleSaveDraft}
              isLoading={isLoading}
              disabled={isDisabled}
              text={t('button')}
              variant={ButtonVariant.SECONDARY}
              isFullWight
            />
          </ButtonContainer>
          <IconContainer>
            <Floppy />
          </IconContainer>
        </>
      )}
    </Root>
  );
};

export default Hat;

const Root = styled.div`
  width: 100%;
  display: flex;
  padding: 32px 72px;
  align-items: center;
  max-width: 1440px;
  justify-content: space-between;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 16px 32px;
  }
`;

const Title = styled(AppText)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_38_32_bold};
  }
`;

const ButtonContainer = styled.div`
  display: block;
  max-width: 288px;
  width: 100%;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: none;
  }
`;

const IconContainer = styled.div`
  display: none;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  :hover {
    background-color: ${({ theme: { colors } }) => colors.greyScale[30]};
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
  }
`;
