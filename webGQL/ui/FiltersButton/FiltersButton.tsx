import { useTranslation } from 'next-i18next';
import React from 'react';
import styled, { css, useTheme } from 'styled-components';
import { Button } from 'ui/Button';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { Setting } from '../../../public/svg/components';

type FiltersButtonProps = {
  filtersCount?: number;
};

const FiltersButton = ({ filtersCount = 0 }: FiltersButtonProps) => {
  const { t } = useTranslation('ui', { keyPrefix: 'filtersButton' });
  const { colors } = useTheme();

  return (
    <Root>
      {filtersCount > 0 && <Label>{filtersCount}</Label>}
      <Button
        size={ButtonSize.CARDS}
        LeftIconComponent={<StyledSettingIcon color={colors.greyScale[100]} />}
        text={t('filter')}
        variant={ButtonVariant.SECONDARY}
      />
    </Root>
  );
};

export default FiltersButton;

const Root = styled.div`
  position: relative;
`;

const Label = styled.span`
  position: absolute;
  display: flex;

  justify-content: center;
  align-items: center;

  width: 20px;
  height: 21px;
  right: -8px;
  top: -8px;

  border-radius: 50%;

  ${({ theme: { typography, colors } }) => css`
    color: ${colors.greyScale[0]};
    background-color: ${colors.greyScale[100]};

    ${typography.caption_14_10_regular}
  `}
`;

const StyledSettingIcon = styled(Setting)`
  width: 20px;
  height: 20px;
`;
