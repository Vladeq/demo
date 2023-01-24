import { FC } from 'react';
import styled, { css } from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';

import { CloseFilled } from '../../../../../public/svg/components';

interface DateTabProps {
  text: String;
  onDeleteDate: (id: string) => void;
  id: string;
}

const DateTab: FC<DateTabProps> = ({ text, onDeleteDate, id }) => {
  return (
    <MainContainer>
      <Content>
        <TabText variant={TextVariants.SECONDARY} font="caption_14_10_regular">
          {text}
        </TabText>
        <DeleteButton onClick={() => onDeleteDate(id)}>
          <CloseFilled />
        </DeleteButton>
      </Content>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.greyScale[10]};
  `}
  display: flex;
  border-radius: 7px;
  margin: 8px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  align-items: center;
  margin: 6px 12px;
`;

const TabText = styled(AppText)`
  margin-right: 12px;
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  outline: none;
`;

export default DateTab;
