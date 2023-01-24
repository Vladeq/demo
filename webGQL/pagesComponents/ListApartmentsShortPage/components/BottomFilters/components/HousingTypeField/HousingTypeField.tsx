import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';

import { useClientSize } from '../../../../../../hooks';
import { OptionType } from '../../../../../../types';
import { AppText, CustomOptionWithCheckbox, DropdownDefault } from '../../../../../../ui';
import { removeQueryParam } from '../../../../../../utils';
import { houseTypeOptions } from '../../../../../ListApartmentsLongPage/options';

type HousingTypeFieldProps = {
  control: Control<any>;
};

const HousingTypeField: FC<HousingTypeFieldProps> = ({ control }) => {
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'bottomFilters' });
  const { getIsBreakpoint } = useClientSize();
  const isWidthLgm = getIsBreakpoint('lgm');
  const router = useRouter();
  const defaultHouseOption = houseTypeOptions[0];

  const handleChangeTypeHousing = async (value: Array<OptionType>) => {
    let isCheck;
    if (value?.length === 0) {
      removeQueryParam('apartmentTypes', router);
    } else {
      isCheck = value.includes(defaultHouseOption);
    }
    if (value?.length && !isCheck) {
      const queryValues = value?.map((elem: OptionType) => elem.value).filter((elem: string) => elem);
      await router.push({ query: { ...router.query, apartmentTypes: queryValues } }, undefined, {
        shallow: true,
      });
    } else {
      removeQueryParam('apartmentTypes', router);
    }
  };

  return (
    <Controller
      control={control}
      name="typeHousing"
      render={({ field: { value } }) => (
        <DropdownContainer>
          {!isWidthLgm && <StyledAppText font="caption_14_10_regular">{t('typeHousing')}</StyledAppText>}
          <InnerContainer>
            <DropdownDefault
              isMulti
              maxMenuHeight={212}
              closeMenuOnSelect={false}
              isClearable={false}
              isSearchable={false}
              options={houseTypeOptions}
              selected={value as OptionType}
              customOptionWithCheckbox={CustomOptionWithCheckbox}
              defaultValue={houseTypeOptions[0]}
              onChange={(value) => handleChangeTypeHousing(value)}
            />
          </InnerContainer>
        </DropdownContainer>
      )}
    />
  );
};

export default HousingTypeField;

const DropdownContainer = styled.div``;

const InnerContainer = styled.div`
  padding-right: 24px;
  min-width: 167px;
  border-right: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
`;

const StyledAppText = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[70]};
`;
