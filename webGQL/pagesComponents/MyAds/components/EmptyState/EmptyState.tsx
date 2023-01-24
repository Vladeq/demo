import { ApartmentAdStatusType } from '__generated__/types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize } from 'ui/Button/Button';

interface EmptyStateProps {
  status: ApartmentAdStatusType;
}

const EmptyState: FC<EmptyStateProps> = ({ status }) => {
  const { t } = useTranslation('myAdsPage', { keyPrefix: 'emptyState' });

  const isStopped = status === ApartmentAdStatusType.Paused;
  const states = {
    [ApartmentAdStatusType.Active]: (
      <>
        <TitleText variant={TextVariants.SECONDARY} font="title_36_26_bold">
          {t(`activeTitle`)}
        </TitleText>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t(`activeHint`)}
        </AppText>
      </>
    ),
    [ApartmentAdStatusType.Published]: (
      <>
        <TitleText variant={TextVariants.SECONDARY} font="title_36_26_bold">
          {t(`publishedTitle`)}
        </TitleText>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t(`publishedHint`)}
        </AppText>
      </>
    ),
    [ApartmentAdStatusType.Processing]: (
      <>
        <TitleText variant={TextVariants.SECONDARY} font="title_36_26_bold">
          {t(`processTitle`)}
        </TitleText>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t(`processHint`)}
        </AppText>
      </>
    ),
    [ApartmentAdStatusType.Paused]: (
      <>
        <TitleText variant={TextVariants.SECONDARY} font="title_36_26_bold">
          {t(`stoppedTitle`)}
        </TitleText>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t(`stoppedHint`)}
        </AppText>
      </>
    ),
    [ApartmentAdStatusType.Draft]: (
      <>
        <TitleText variant={TextVariants.SECONDARY} font="title_36_26_bold">
          {t(`draftTitle`)}
        </TitleText>
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
          {t(`draftHint`)}
        </AppText>
      </>
    ),
  };
  return (
    <Root>
      <LeftContainer>
        <TextContainer>{states[status]}</TextContainer>
        <StyledButton size={ButtonSize.LONG_TEXT} text={t('button')} />
      </LeftContainer>
      <RightContainer $isStopped={isStopped}>
        {isStopped ? (
          <Image src="/img/stoppedHint.png" alt="hint" width={450} height={250} />
        ) : (
          <Image src="/img/hint.png" alt="hint" width={650} height={250} />
        )}
      </RightContainer>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 67px;
  margin-top: 40px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    margin-top: 24px;
    gap: 32px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  max-width: 584px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 16px;
    margin-bottom: 24px;
  }
`;

const TitleText = styled(AppText)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    ${({ theme: { typography } }) => typography.title_33_24_bold}
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 100%;
  }
`;

const RightContainer = styled.div<{ $isStopped: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ $isStopped }) => ($isStopped ? `367px` : `585px`)};
`;

export default EmptyState;
