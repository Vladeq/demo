import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Selector } from 'ui';
import { v4 } from 'uuid';

import { roomsArray } from '../../../../options';

type FieldType = {
  control: Control<any>;
};

const EMPTY_VALUE = 'no';

const Rooms: FC<FieldType> = ({ control }) => {
  const handleChange = (value: Array<string>, onChange: (...event: any[]) => void, selectorValue: string) => {
    const hasSelectorValue = value.includes(selectorValue);
    const isEmptyValue = selectorValue === EMPTY_VALUE;
    let newValues: string[];

    if (hasSelectorValue) {
      newValues = value.filter((elem) => elem !== selectorValue);
    } else {
      newValues = isEmptyValue ? [EMPTY_VALUE] : [...value, selectorValue].filter((elem) => elem !== EMPTY_VALUE);
    }
    onChange(newValues);
  };

  const checkActiveState = (value: Array<string>, seletorValue: string) => {
    return seletorValue === EMPTY_VALUE
      ? value.length === 0 || value.includes(seletorValue)
      : value.includes(seletorValue);
  };

  return (
    <RoomsInnerContainer>
      <Controller
        name="numberOfRooms"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {roomsArray.map((selector) => (
              <StyledSelector
                name={v4()}
                text={selector.title}
                onChange={() => handleChange(value, onChange, selector.value)}
                checked={checkActiveState(value, selector.value)}
                key={v4()}
              />
            ))}
          </>
        )}
      />
    </RoomsInnerContainer>
  );
};

export default Rooms;

const RoomsInnerContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: scroll;
  margin-right: -16px;
  padding: 4px 0;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${BreakpointsEnum.sm}px) {
    flex-wrap: wrap;
    margin-right: 0;
    overflow-x: auto;
  }
`;

const StyledSelector = styled(Selector)`
  padding: 12px 16px !important;
  min-width: unset;
  p {
    ${({ theme: { typography } }) => typography.caption_16_12_regular}
  }
`;
