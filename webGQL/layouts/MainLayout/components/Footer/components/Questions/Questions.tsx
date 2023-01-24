import { useTranslation } from 'next-i18next';
import React from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, Button, MailTo } from 'ui';

const Questions = () => {
  const { t } = useTranslation('ui', { keyPrefix: 'footer.questions' });
  return (
    <Root>
      <Title>{t('questionsOrSuggestions')}</Title>
      <MailTo email="example@mail.com">
        <StyledButton isFullWight text={t('writeToUs')} />
      </MailTo>
      <AppText font="caption_16_12_regular">{t('consent')}</AppText>
    </Root>
  );
};

export default Questions;

const Root = styled.div`
  display: grid;
  grid-gap: 18px;
  width: 100%;
  max-width: 291px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    max-width: none;
    gap: 16px;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme: { colors } }) => colors.greyScale[90]};
  margin-bottom: 10px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-bottom: 6px;
  }
`;

const Title = styled.h3`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[0]};
    ${typography.title_22_18_bold}
  `}
`;
