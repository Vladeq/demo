import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Selector } from 'ui';
import { SelectorSize } from 'ui/Selector/Selector';
import { v4 } from 'uuid';

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
    <Root>
      <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
        {t('rules.title')}
      </AppText>
      <HouseRulesContainer>
        {rulesNames.map((elem, index) => (
          <Controller
            key={index}
            control={control}
            name={elem.value}
            render={({ field }) => (
              <HouseRulesItem>
                <HouseRulesTitle variant={TextVariants.SECONDARY} font="body_20_14_regular">
                  {elem.label}
                </HouseRulesTitle>
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
    </Root>
  );
};
export default RulesSection;

const Root = styled.div`
  display: flex;
  width: 100%;

  flex-direction: column;
  gap: 16px;
`;

const HouseRulesContainer = styled.div`
  display: grid;
  width: 100%;

  grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
  column-gap: 24px;
  row-gap: 16px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const HouseRulesItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
