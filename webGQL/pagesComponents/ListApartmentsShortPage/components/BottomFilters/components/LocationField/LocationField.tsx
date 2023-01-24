import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';

import { ArrowLeft } from '../../../../../../../public/svg/components';
import { useToggle } from '../../../../../../hooks';
import GoogleMapService from '../../../../../../services/google-maps';
import { DefaultAsyncSelect } from '../../../../../../ui';

type LocationFieldProps = {
  control: Control<any>;
};

const LocationField: FC<LocationFieldProps> = ({ control }) => {
  const { isOpened: isOpenedLocation, open: openLocation, close: closeLocation } = useToggle();
  const { t } = useTranslation('listApartmentsPage', { keyPrefix: 'bottomFilters' });

  const loadPlaces = async (value: string) => {
    const res = await GoogleMapService.getPlaces(value);
    return res;
  };

  return (
    <Controller
      control={control}
      name="location"
      render={({ field }) => (
        <AsyncContainer>
          {isOpenedLocation && <StyledArrowLeft onClick={closeLocation} />}
          <AsyncInnerContainer>
            <DefaultAsyncSelect
              loadOptions={loadPlaces}
              label={t('location')}
              placeholder={t('placeholder')}
              menuIsOpen={isOpenedLocation}
              onMenuOpen={openLocation}
              onMenuClose={closeLocation}
              isSecondary
              {...field}
            />
          </AsyncInnerContainer>
        </AsyncContainer>
      )}
    />
  );
};

export default LocationField;

const AsyncContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const AsyncInnerContainer = styled.div`
  width: 100%;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  margin-right: 18px;
  cursor: pointer;
`;
