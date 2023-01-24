import { ApartmentAdRulesModel } from '__generated__/types';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';
import { returnHomeRules } from 'utils';

type HomeRulesMessageProps = {
  rules: ApartmentAdRulesModel;
};

const HomeRulesMessage: FC<HomeRulesMessageProps> = ({ rules }) => {
  const { colors } = useTheme();
  const { t } = useTranslation('common', { keyPrefix: 'homeRules' });

  const homeRules = useMemo(() => returnHomeRules(rules), [rules]);

  return (
    <Root>
      <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
        {t('homeRules')}
      </AppText>
      <List>
        {homeRules.map((rule, index) => (
          <Item key={index}>
            <rule.icon color={colors.greyScale[100]} width={24} height={24} />
            <AppText font="body_20_14_regular" variant={TextVariants.SECONDARY}>
              {rule.label}
            </AppText>
          </Item>
        ))}
      </List>
    </Root>
  );
};

export default HomeRulesMessage;

const Root = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    padding: 8px 16px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    background-color: ${colors.greyScale[0]};
    border: 1px solid ${colors.greyScale[30]};
    border-radius: 16px;
  `}
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: 16px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    grid-gap: 0;
    align-items: flex-start;
  }
`;

const Item = styled.li`
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
`;
