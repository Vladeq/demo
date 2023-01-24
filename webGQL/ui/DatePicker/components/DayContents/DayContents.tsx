import React, { memo } from 'react';
import styled from 'styled-components';

type DayContentsProps = {
  day: number;
  isSelecting: boolean;
};

const DayContents = ({ day, isSelecting }: DayContentsProps) => {
  return (
    <Root className={isSelecting ? 'day--in-selecting-range' : ''}>
      <span>{day}</span>
    </Root>
  );
};

export default memo(DayContents);

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
