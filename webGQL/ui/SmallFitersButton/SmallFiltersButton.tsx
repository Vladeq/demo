import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from 'ui/IconButton';

import { Setting } from '../../../public/svg/components';

type SmallFiltersButtonProps = {
  filtersCount?: number;
};

const SmallFiltersButton: FC<SmallFiltersButtonProps> = ({ filtersCount = 0 }) => {
  return (
    <Root>
      {filtersCount > 0 && <Label>{filtersCount}</Label>}
      <IconButton IconComponent={StyledSettingIcon} />
    </Root>
  );
};

export default SmallFiltersButton;

const Root = styled.div`
  position: relative;
`;
const Label = styled.div`
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
  padding: 2px 0px 0px 3px;
`;
