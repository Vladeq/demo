import { ApartmentAdViewModel, ApartmentRentPeriodType, ApartmentType } from '__generated__/types';
import { ResponsiveCardInSearch } from 'components/ResponsiveCardInSearch';
import { Routes, variantsPlural } from 'constains';
import { useClientSize } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { mockFilters } from 'pagesComponents/ListApartmentsLongPage/components/mockData';
import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button, Pagination } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';
import { handleWordsDeclination } from 'utils';

import { CloseFilled } from '../../../public/svg/components';
import { AdsCard } from './components';

const MAX_SHOW_COUNT_HOUSES = '300';

interface ResponsiveCardInSearchProps extends Partial<Omit<ApartmentAdViewModel, 'address'>> {
  rentType?: string;
  guestsNum?: string;
  id: string;
  pictureSrc: string;
  apartmentType?: ApartmentType;
  address: string;
  title: string;
  price: string;
  type?: ApartmentRentPeriodType;
}

type ListProps = {
  ads: Array<ResponsiveCardInSearchProps>;
  totalItems: number;
  page: number;
  onSetFocusOnCard: (id: string) => void;
  onDeleteFocusOnCard: (id: string) => void;
  onSetPage: (page: number) => void;
  totalPages: number;
};

const List: FC<ListProps> = ({
  ads,
  totalItems,
  onSetPage,
  page,
  totalPages,
  onSetFocusOnCard,
  onDeleteFocusOnCard,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'list' });
  const [filters, setFilters] = useState(mockFilters);
  const { getIsBreakpoint } = useClientSize();
  const router = useRouter();

  const createTitle = (count: number) => {
    if (count === 0) {
      return `${t('titleFirstPart', { count } as unknown as string)}
                ${handleWordsDeclination(Number(count), variantsPlural)}   
                ${t('titleThirdPart')}`;
    }
    if (count === 1) {
      return `${t('foundOne', { count } as unknown as string)} 
              ${handleWordsDeclination(Number(count), variantsPlural)} 
              ${t('titleThirdPart')}`;
    }
    if (count < 5) {
      return `${t('titleFirstPart', { count } as unknown as string)} 
              ${handleWordsDeclination(Number(count), variantsPlural)} 
              ${t('titleThirdPart')}`;
    }
    if (count <= Number(MAX_SHOW_COUNT_HOUSES)) {
      return `${t('titleFirstPart', { count } as unknown as string)} 
              ${handleWordsDeclination(Number(count), variantsPlural)} 
              ${t('titleThirdPart')}`;
    }
    if (count > Number(MAX_SHOW_COUNT_HOUSES)) {
      return `${t('titleFirstPart', { count: '' } as unknown as string)}
              ${t('titleSecondPart')}
              ${MAX_SHOW_COUNT_HOUSES}  
              ${handleWordsDeclination(Number(MAX_SHOW_COUNT_HOUSES), variantsPlural)} 
              ${t('titleThirdPart')}`;
    }
  };

  const deleteOneFilter = (id: number) => {
    const newArr = filters.filter((item) => item.id !== id);
    setFilters(newArr);
  };

  const resetFilters = () => {
    setFilters([]);
  };

  const routeToApartmentPage = (id: string, type: ApartmentRentPeriodType) => {
    router.push({
      pathname: Routes.apartment,
      query: { id, type },
    });
  };

  const isCards = ads?.length > 0;
  const isFilters = filters.length > 0;
  const isWidthLg = getIsBreakpoint('lg');
  const isWidthMd = getIsBreakpoint('md');
  const isWidthSm = getIsBreakpoint('sm');

  const showRange = useMemo(() => {
    if (isWidthSm) return 0;
    if (isWidthMd) return 1;
    if (isWidthLg) return 2;
    return 4;
  }, [isWidthSm, isWidthMd, isWidthLg]);

  return (
    <Root>
      {isWidthSm && <HelperBlock />}
      <StyledAppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
        {createTitle(totalItems)}
      </StyledAppText>
      <Container>
        {isCards ? (
          ads.map((item, index) => (
            <InnerContainer key={index} onClick={() => routeToApartmentPage(item.id, item.type!)}>
              {isWidthMd ? (
                <ResponsiveCardInSearch
                  onSetFocusOnCard={onSetFocusOnCard}
                  onDeleteFocusOnCard={onDeleteFocusOnCard}
                  {...item}
                />
              ) : (
                <AdsCard onSetFocusOnCard={onSetFocusOnCard} onDeleteFocusOnCard={onDeleteFocusOnCard} {...item} />
              )}
            </InnerContainer>
          ))
        ) : (
          <ContainerWithoutCards>
            <WithoutCardTitle variant={TextVariants.SECONDARY} font="title_22_18_bold">
              {t('notFoundTitle')}
            </WithoutCardTitle>
            <SubtitleText font="body_20_14_regular">{t('notFoundSubtitle')}</SubtitleText>
            <FiltersContainer>
              {isFilters
                ? filters.map((item) => (
                    <Item key={item.id}>
                      <AppText variant={TextVariants.SECONDARY} font="caption_14_10_regular">
                        {item.title}
                      </AppText>
                      <StyledCloseFilled onClick={() => deleteOneFilter(item.id)} />
                    </Item>
                  ))
                : null}
            </FiltersContainer>
            <StyledButton
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.SMALL}
              text="Сбросить все фильтры"
              onClick={resetFilters}
              isFullWight={isWidthSm}
            />
          </ContainerWithoutCards>
        )}
      </Container>
      {isCards && (
        <PaginationContainer>
          <Pagination page={page} pageCount={totalPages} setPage={onSetPage} showRange={showRange} />
        </PaginationContainer>
      )}
    </Root>
  );
};

export default List;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 24px 24px 0 0;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  margin-top: -88px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: -70px;
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    z-index: 323;
  }

  @media (max-width: ${BreakpointsEnum.md}px) {
    width: auto;
  }

  @media (min-width: ${BreakpointsEnum.sm}px) {
    margin-top: 0;
    background: ${({ theme: { colors } }) => colors.greyScale[10]};
  }

  @media (min-width: ${BreakpointsEnum.md}px) {
    width: 624px;
    align-items: flex-start;
  }
`;

const WithoutCardTitle = styled(AppText)`
  text-align: center;
  max-width: 265px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 600px;
    text-align: start;
  }
`;
const HelperBlock = styled.div`
  margin-top: 8px;
  width: 50px;
  height: 6px;
  background: ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 21px;
`;
const PaginationContainer = styled.div`
  margin-bottom: 36px;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2px 0;

  @media (min-width: ${BreakpointsEnum.md}px) {
    justify-content: flex-start;
  }
`;
const StyledButton = styled(Button)`
  padding-left: 21.5px;
  padding-right: 21.5px;
  ${({ theme: { typography } }) => typography.caption_16_12_medium};
`;
const StyledCloseFilled = styled(CloseFilled)`
  margin-left: 12px;
  cursor: pointer;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 7px;
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;
const FiltersContainer = styled.div`
  display: flex;
  gap: 8px 8px;
  margin-top: 24px;
  max-width: 486px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 32px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    justify-content: flex-start;
  }
`;
const SubtitleText = styled(AppText)`
  margin-top: 16px;
  text-align: center;
  max-width: 300px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 600px;
    text-align: start;
  }
`;
const ContainerWithoutCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
  padding: 0 15px;

  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0;
  }
  @media (min-width: ${BreakpointsEnum.md}px) {
    align-items: flex-start;
    margin-top: 40px;
  }
`;
const InnerContainer = styled.div`
  margin-top: 16px;
  cursor: pointer;

  @media (min-width: ${BreakpointsEnum.md}px) {
    margin-top: 24px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;

  @media (min-width: ${BreakpointsEnum.md}px) {
    display: block;
    margin-bottom: 40px;
  }
`;

const StyledAppText = styled(AppText)`
  margin-top: 16px;
`;
