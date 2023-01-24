import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const PopperContainer = ({ children, isBigVariant, ...props }: PopperContainerProps) => (
  <Root $isBigVariant={isBigVariant} {...props}>
    {children}
  </Root>
);

export default PopperContainer;

type PopperContainerProps = { children: ReactNode[]; isBigVariant: boolean };

const BigDatePicker = css`
  .react-datepicker__day-names,
  .react-datepicker__week {
    grid-template-columns: repeat(7, 32px);
  }
  .react-datepicker__day-names {
    height: 32px;
  }

  .datepicker__week {
    height: 32px;
  }

  .react-datepicker__day {
    height: 32px;
  }

  .react-datepicker__week:first-child {
    display: flex;
    justify-content: flex-end;
    div {
      width: 32px;
    }
  }

  .react-datepicker__month {
    padding: 0 8px 16px;
  }
`;

const Root = styled.div<{ $isBigVariant: boolean }>`
  ${({ theme: { colors, typography }, $isBigVariant }) => css`
    .react-datepicker-popper {
      position: absolute;
      padding: 8px 16px;
      margin: 8px 0;
      z-index: 1000;

      border-radius: 24px;
      background-color: ${colors.greyScale[0]};
      box-shadow: 0px 10px 33px rgba(175, 181, 192, 0.18);
    }
    .react-datepicker__day-names,
    .react-datepicker__week {
      display: grid;
      grid-template-columns: repeat(7, 28px);
      justify-content: center;
      align-items: center;
      text-align: center;

      [aria-disabled='true'] {
        cursor: not-allowed;
      }
    }

    .react-datepicker__day-names {
      height: 28px;
    }

    .datepicker__week {
      height: 28px;
    }

    .react-datepicker__week:first-child {
      display: flex;
      justify-content: flex-end;
      div {
        width: 28px;
      }
    }

    .react-datepicker__month {
      padding: 0 8px 8px;
    }

    .react-datepicker__day:empty {
      display: none;
    }

    .react-datepicker__day-name,
    .react-datepicker__day {
      display: flex;
      justify-content: center;
      align-items: center;
      ${typography.caption_16_12_regular}
    }

    .react-datepicker__day-name {
      color: ${colors.greyScale[60]};
      text-transform: capitalize;
    }

    .react-datepicker__day {
      height: 28px;
      color: ${colors.greyScale[100]};
      border-radius: 8px;
      overflow: visible;

      cursor: pointer;
    }

    .react-datepicker__day--outside-month {
      color: ${colors.greyScale[30]};

      span {
        width: fit-content !important;
        height: fit-content !important;
        background: transparent !important;
        border: none !important;
      }
    }

    .react-datepicker__day--selected,
    .react-datepicker__day--range-start,
    .react-datepicker__day--selecting-range-start,
    .react-datepicker__day--range-end {
      background: linear-gradient(${colors.gradient.saturation});
      color: ${colors.greyScale[100]};
      border-radius: 8px;
    }

    .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--range-start, .react-datepicker__day--selecting-range-start, .react-datepicker__day--range-end),
    .react-datepicker__day--in-range:not(.react-datepicker__day--range-start, .react-datepicker__day--selecting-range-start, .react-datepicker__day--range-end) {
      padding: 6px 0;

      div {
        padding: 0;
      }

      span {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        border: none !important;
        background-color: ${colors.greyScale[10]};
      }
    }

    .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--range-start, .react-datepicker__day--selecting-range-start, .react-datepicker__day--range-end) {
      :hover {
        border: 1px solid ${colors.greyScale[40]};
        background: ${colors.greyScale[0]};
        color: ${colors.greyScale[100]};

        div,
        span {
          border: none;
          background-color: transparent;
        }
      }
    }

    ${$isBigVariant && BigDatePicker}

    .isNotHover {
      .day--in-selecting-range {
        padding: 6px 0;

        div {
          padding: 0;
        }

        span {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;

          border: none !important;
          background-color: ${colors.greyScale[10]};
        }
      }
    }
  `}
`;
