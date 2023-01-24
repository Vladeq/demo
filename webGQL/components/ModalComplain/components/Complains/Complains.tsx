import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, OptionType } from 'types';
import { CheckBox } from 'ui';

type ComplainsProps = {
  control: Control<any>;
  hasUnderline: boolean;
  complains: OptionType[];
};

const Complains: FC<ComplainsProps> = ({ control, hasUnderline, complains }) => {
  const handleChange = (value: Array<string>, onChange: (...event: any[]) => void, selectorValue: string) => {
    const hasSelectorValue = value.includes(selectorValue);
    let newValues: string[];

    if (hasSelectorValue) {
      newValues = value.filter((elem) => elem !== selectorValue);
    } else {
      newValues = [...value, selectorValue];
    }

    onChange(newValues);
  };

  const checkActiveState = (value: Array<string>, selectorValue: string) => value.includes(selectorValue);

  return (
    <Root>
      <Controller
        name="causes"
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            {complains.map((complain, index) => (
              <ReasonContainer $hasUnderline={hasUnderline} key={index}>
                <Reason>{complain.label}</Reason>
                <CheckBox
                  name={`cause-${index}`}
                  checked={checkActiveState(value, complain.value)}
                  onChange={() => handleChange(value, onChange, complain.value)}
                />
              </ReasonContainer>
            ))}
          </>
        )}
      />
    </Root>
  );
};

export default Complains;

const Root = styled.div``;

const Reason = styled.div`
  ${({ theme: { typography } }) => typography.body_20_14_regular}
`;

const ReasonContainer = styled.div<{ $hasUnderline: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 26px 0px 18px 0px;
  :first-child {
    padding-top: 10px;
  }

  ${({ theme: { colors }, $hasUnderline }) => css`
    @media (max-width: ${BreakpointsEnum.sm}px) {
      border-bottom: 1px solid ${colors.greyScale[30]};
    }
    @media (min-width: ${BreakpointsEnum.sm}px) {
      ${$hasUnderline
        ? css`
            border-bottom: 1px solid ${colors.greyScale[30]};
          `
        : css`
            :not(:last-child) {
              border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
            }
          `}
    }
  `}
`;
