import { useClickOutside, useToggle } from 'hooks';
import { FC, useRef } from 'react';
import styled from 'styled-components';

import { CardOnMap } from '../../../CardOnMap';

type MarkerProps = {
  price: string;
  imageUrl: string;
  isFocus: boolean;
  title: string;
};

const Marker: FC<MarkerProps> = ({ price, title, imageUrl, isFocus }) => {
  const { toggle, isOpened, close } = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, close);

  return (
    <Root ref={ref}>
      <Price onClick={toggle} $isCardOpen={isOpened || isFocus}>{`${price} ₸`}</Price>
      {isOpened && <CardOnMap rentType="Квартира целиком" pictureSrc={imageUrl} title={title} price={price} />}
    </Root>
  );
};

export default Marker;

const Root = styled.div`
  position: relative;
`;

const Price = styled.button<{ $isCardOpen?: boolean }>`
  outline: none;
  z-index: 999;
  width: fit-content;
  overflow: hidden;
  padding: 8px;
  height: 35px;
  background-color: ${({ theme: { colors }, $isCardOpen }) =>
    $isCardOpen ? colors.greyScale[100] : colors.greyScale[0]};
  box-shadow: 0 10px 15px rgba(175, 181, 192, 0.18);
  border-radius: 8px;
  color: ${({ theme: { colors }, $isCardOpen }) => ($isCardOpen ? colors.greyScale[0] : colors.greyScale[100])};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 7px !important;
  ${({ theme: { typography } }) => typography.body_20_14_medium};
`;
