import { Routes } from 'constains';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { SkeletonChatPreview } from './components';

type EmptyChatBodyProps = {
  isEmptyChat: boolean;
};

const EmptyChatBody: FC<EmptyChatBodyProps> = ({ isEmptyChat }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat' });
  const router = useRouter();

  return (
    <Root>
      <Wrapper>
        <SkeletonChatPreview />
        <SkeletonChatPreview />
      </Wrapper>
      {isEmptyChat ? (
        <Container>
          <Section>
            <AppText variant={TextVariants.SECONDARY} font="title_22_18_medium">
              {t('emptyTitle')}
            </AppText>
            <AppText font="body_24_16_regular">{t('emptyText')}</AppText>
          </Section>
          <StyledButton
            onClick={() => router.push(Routes.home)}
            size={ButtonSize.SMALL}
            isFullWight
            variant={ButtonVariant.SECONDARY}
            text={t('searchAds')}
          />
        </Container>
      ) : (
        <AppText font="body_24_16_regular">{t('selectChat')}</AppText>
      )}
    </Root>
  );
};

export default EmptyChatBody;

const Root = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Container = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Section = styled.div`
  max-width: 371px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  p {
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  max-width: 288px;
`;
