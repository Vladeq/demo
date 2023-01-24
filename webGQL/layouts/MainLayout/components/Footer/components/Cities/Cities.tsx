import { citiesList, Routes } from 'constains';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import React from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, RentPeriodType } from 'types';
import { LinkTo } from 'ui';

const Cities = () => {
  const { t } = useTranslation('ui', { keyPrefix: 'footer.cities' });

  const { getIsBreakpoint } = useClientSize();

  const isSBreakpoint = getIsBreakpoint('s');

  const citiesListLength = isSBreakpoint ? 3 : citiesList.length;

  const rentPeriods = [
    { label: t('longTermPeriod'), value: RentPeriodType.LONG_TERM },
    { label: t('shortTermPeriod'), value: RentPeriodType.SHORT_TERM },
  ];

  return (
    <Root>
      {rentPeriods.map((period, index) => (
        <Container key={index}>
          <Title>{period.label}</Title>
          {citiesList.slice(0, citiesListLength).map((city, index) => (
            <List key={index}>
              <StyledLinkTo
                text={city.label}
                href={{
                  pathname:
                    period.value === RentPeriodType.SHORT_TERM ? Routes.listApartmentsShort : Routes.listApartmentsLong,
                  query: { term: period.value, label: city.label, lat: city.lat, lng: city.lng },
                }}
              />
            </List>
          ))}
        </Container>
      ))}
    </Root>
  );
};

export default Cities;

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 26px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    gap: 32px;
  }
`;

const Container = styled.div`
  display: grid;
  grid-gap: 21px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    gap: 24px;
  }
`;

const Title = styled.h3`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[0]};
    ${typography.title_22_18_bold}
  `}
`;

const List = styled.div`
  display: grid;
  grid-gap: 16px;
`;

const StyledLinkTo = styled(LinkTo)`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[0]};
    ${typography.body_20_14_regular}
  `}
`;
