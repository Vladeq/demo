import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { FieldValue, FieldValues, useFieldArray, useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { Selector } from 'ui/Selector';

type RoomsSelectorProps = {
  name: string;
  maxRoomsCount?: number;
  isSmall?: boolean;
};
const RoomsSelector = ({ name, isSmall = false, maxRoomsCount = 8 }: RoomsSelectorProps) => {
  const { t } = useTranslation('ui', { keyPrefix: 'roomsSelector' });
  const { control } = useFormContext();

  const { append, remove, update, ...params } = useFieldArray({ control, name });
  const fields = params.fields as SelectorField[];

  const renderButtonText = (index: number) => (index + 1 === maxRoomsCount ? `${index + 1}+` : `${index + 1}`);

  const generateFields = () => {
    const fieldsLength = fields.length;

    if (!fieldsLength)
      for (let i = 0; i <= maxRoomsCount + 1; i++) {
        append({
          name: `room-${i}`,
          value: false,
        });
      }
  };

  const removeFields = () => {
    const fieldsLength = fields.length;

    for (let i = fieldsLength; i === 0; i--) {
      remove(i);
    }
  };

  useEffect(() => {
    generateFields();
    return removeFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxRoomsCount]);

  return (
    <Root $isSmall={isSmall}>
      {fields.map((field, index) =>
        index ? (
          <StyledSelector
            $isSmall={isSmall}
            key={field.id}
            {...field}
            onChange={() => update(index, { name: field.name, value: !field.value })}
            text={renderButtonText(index - 1)}
          />
        ) : (
          <Selector
            key={field.id}
            {...field}
            onChange={() => update(index, { name: field.name, value: !field.value })}
            text={t('studio')}
          />
        ),
      )}
    </Root>
  );
};

export default RoomsSelector;

type SelectorField = {
  id: string;
  name: string;
  value: boolean;
} & FieldValue<FieldValues>;

const Root = styled.div<{ $isSmall: boolean }>`
  display: flex;
  gap: 8px;
  ${({ $isSmall }) => css`
    gap: ${$isSmall && '4px'};
  `}
`;

const StyledSelector = styled(Selector)<{ $isSmall: boolean }>`
  width: 40px !important;
  height: 40px !important;
  padding: 0;

  justify-content: center;
  align-items: center;

  ${({ $isSmall }) => css`
    min-width: ${$isSmall && '40px !important'};
    padding: ${$isSmall && '0 !important'};
  `}
`;
