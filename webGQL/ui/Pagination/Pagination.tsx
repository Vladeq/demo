import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { IconButton } from 'ui/IconButton';
import { Selector } from 'ui/Selector';

import { ArrowLeft, ArrowRight } from '../../../public/svg/components';

type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
  showRange?: number;
};

const Pagination: FC<PaginationProps> = ({ page, pageCount, setPage, showRange = 3 }) => {
  const pagesList = useMemo(() => new Array(pageCount).fill(null).map((_, index) => index + 1), [pageCount]);

  const abbreviatedPagesList = useMemo(
    () =>
      pagesList.filter(
        (pageNumber) =>
          pageNumber === 1 ||
          pageNumber === pageCount ||
          (pageNumber > page - showRange && pageNumber <= page + 1 + showRange),
      ),
    [page],
  );

  const isFirstPage = page === 0;
  const isLastPage = page >= pageCount - 1;

  const getIsLeftEllipsis = (index: number) => page >= showRange + 2 && index === 1;
  const getIsRightEllipsis = (index: number, listLength: number) =>
    page <= pageCount - showRange - 3 && index === listLength - 2;

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  if (pageCount < 1) {
    return null;
  }

  return (
    <Root>
      <StyledIconButton disabled={isFirstPage} onClick={prevPage} IconComponent={ArrowLeft} />
      <Container>
        {abbreviatedPagesList.map((pageNumber, index, list) => (
          <>
            {getIsLeftEllipsis(index) && <Ellipsis key={`ellipsis-left-${pageNumber}`}>...</Ellipsis>}
            <PageSelector
              name={`page-${pageNumber}`}
              checked={page === pageNumber - 1}
              onChange={() => setPage(pageNumber - 1)}
              key={pageNumber}
              text={pageNumber}
            />
            {getIsRightEllipsis(index, list.length) && <Ellipsis key={`ellipsis-right-${pageNumber}`}>...</Ellipsis>}
          </>
        ))}
      </Container>
      <StyledIconButton disabled={isLastPage} onClick={nextPage} IconComponent={ArrowRight} />
    </Root>
  );
};

export default Pagination;

const Root = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const PageSelector = styled(Selector)`
  width: 40px;
  min-width: 40px;
  padding: 0;
  justify-content: center;
`;

const StyledIconButton = styled(IconButton)`
  :focus,
  :focus-visible {
    border-width: 1px;
    border-color: ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const Ellipsis = styled.p`
  ${({ theme: { colors, typography } }) => css`
    color: ${colors.greyScale[60]};
    ${typography.body_24_16_regular}
  `}
`;
