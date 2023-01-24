import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Selector } from 'ui';
import { v4 } from 'uuid';

import { SelectorSize } from '../../../../ui/Selector/Selector';

enum RulesEnum {
  SMOKE = 'allowedToSmoke',
  CHILDREN = 'allowedWithChildren',
  PARTY = 'allowedToHangingOut',
  PETS = 'allowedWithPets',
}

const RulesVariants = [
  {
    label: 'Да',
    value: true,
    id: v4(),
  },
  {
    label: 'Нет',
    value: false,
    id: v4(),
  },
];

type RulesSectionProps = {
  control: Control<any>;
};

const RulesSection: FC<RulesSectionProps> = ({ control }) => {
  const { t } = useTranslation('importantInfoPage');

  const rulesNames = useMemo(
    () => [
      { label: t('rules.pets.title'), value: RulesEnum.PETS },
      { label: t('rules.children.title'), value: RulesEnum.CHILDREN },
      { label: t('rules.smoke.title'), value: RulesEnum.SMOKE },
      { label: t('rules.party.title'), value: RulesEnum.PARTY },
    ],
    [t],
  );

  return (
    <>
      <SubTitle font="title_22_18_bold" variant={TextVariants.SECONDARY}>
        {t('rules.title')}
      </SubTitle>
      <HouseRulesContainer>
        {rulesNames.map((elem, index) => (
          <Controller
            key={index}
            control={control}
            name={elem.value}
            render={({ field }) => (
              <HouseRulesItem>
                <HouseRulesTitle font="body_20_14_regular">{elem.label}</HouseRulesTitle>
                <SelectorsBox>
                  {RulesVariants.map((rule) => (
                    <StyledSelector
                      key={v4()}
                      onChange={() => field.onChange(rule.value)}
                      checked={field.value === rule.value}
                      size={SelectorSize.NORMAL}
                      name={v4()}
                      text={rule.label}
                    />
                  ))}
                </SelectorsBox>
              </HouseRulesItem>
            )}
          />
        ))}
      </HouseRulesContainer>
    </>
  );
};
export default RulesSection;

const SubTitle = styled(AppText)`
  margin-bottom: 24px;
`;
const HouseRulesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  max-width: 628px;
  column-gap: 60px;
  row-gap: 16px;
  margin-bottom: 32px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 16px;
  }
`;

const HouseRulesItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    width: 163px;
  }
`;
const HouseRulesTitle = styled(AppText)``;

const SelectorsBox = styled.div`
  display: flex;
  gap: 12px;
`;

const StyledSelector = styled(Selector)`
  min-width: 40px;
  padding: 0;
`;
