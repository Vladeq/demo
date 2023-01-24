import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, DropdownDefault } from 'ui';

import { ShortTermRentCancellationPolicyType } from '../../../../__generated__/types';
import { Terms } from './components';

type CancelSectionProps = {
  control: Control<any>;
  defaultValue?: string | null;
  isAllRent?: boolean;
};

const CancelSection: FC<CancelSectionProps> = ({ control, defaultValue, isAllRent }) => {
  const { t } = useTranslation('importantInfoPage', { keyPrefix: 'cancel' });
  const { getIsBreakpoint } = useClientSize();

  const rulesOptions = useMemo(
    () => [
      { label: 'Гибкие', value: ShortTermRentCancellationPolicyType.Flexible },
      { label: 'Умеренные', value: ShortTermRentCancellationPolicyType.Moderate },
      { label: 'Негибкие', value: ShortTermRentCancellationPolicyType.Inflexible },
      { label: 'Строгие', value: ShortTermRentCancellationPolicyType.Strict },
    ],
    [t],
  );
  const filterOptionIndex = rulesOptions.findIndex((option) => option.value === defaultValue);

  const isWidthSm = getIsBreakpoint('sm');
  const menuPlacement = isWidthSm ? 'top' : 'auto';

  return (
    <Root>
      <RulesContainer>
        <SubTitle font="title_22_18_bold" variant={TextVariants.SECONDARY}>
          {isAllRent ? t('titleAll') : t('title')}
        </SubTitle>
        <RulesDescription
          font={isWidthSm ? 'body_20_14_regular' : 'body_24_16_regular'}
          variant={TextVariants.SECONDARY}>
          {t('subTitle')}
        </RulesDescription>
        <Controller
          name="cancellationPolicy"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <>
              <StyledDropdown
                {...field}
                menuPlacement={menuPlacement}
                defaultValue={rulesOptions[filterOptionIndex]}
                options={rulesOptions}
                onChange={(value) => field.onChange(value.value)}
                placeholder={t('placeholder')}
              />
              {field.value && <Terms type={field.value} />}
            </>
          )}
        />
      </RulesContainer>
    </Root>
  );
};

export default CancelSection;

const Root = styled.div``;

const SubTitle = styled(AppText)`
  margin-bottom: 24px;
`;

const RulesContainer = styled.div``;

const RulesDescription = styled(AppText)`
  margin-bottom: 16px;
  width: 100%;
  max-width: 708px;
  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 8px;
    margin-bottom: 16px;
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }
`;

const StyledDropdown = styled(DropdownDefault)`
  width: 100%;
  max-width: 366px;

  .dropdown__control {
    &:focus-within {
      background: ${({ theme: { colors } }) => colors.greyScale[10]};
    }
    background: none;
  }
  .dropdown__placeholder {
    color: ${({ theme: { colors } }) => colors.greyScale[60]};
  }
`;
