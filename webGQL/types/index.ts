import { typography } from 'styles/general/typography';

export type VariantTypography = keyof typeof typography;

export enum TextVariants {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export type OptionType = {
  label: string;
  value: string;
};

export enum RentPeriodType {
  LONG_TERM = 'LONG_TERM',
  SHORT_TERM = 'SHORT_TERM',
}

export enum BreakpointsEnum {
  lg = 1440,
  lgm = 1200,
  md = 1024,
  sm = 768,
  s = 576,
  xs = 320,
}

export type BreakpointsType = keyof typeof BreakpointsEnum;

export * from './card';
