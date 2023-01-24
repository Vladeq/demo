import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { useClientSize } from 'hooks';
import Image from 'next/image';
import React, { FC, useMemo, useRef, useState } from 'react';
import styled, { css, useTheme } from 'styled-components';
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BreakpointsEnum } from 'types';

import { ArrowLeft, ArrowRight, CloseBig } from '../../../../../public/svg/components';

type FullViewSliderProps = {
  images: string[];
  close: () => void;
};

const FullViewSlider: FC<FullViewSliderProps> = ({ images, close }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const { getIsBreakpoint } = useClientSize();
  const { colors } = useTheme();

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleInit = (swiper: SwiperCore) => {
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
    }
    swiper.navigation.init();
    swiper.navigation.update();
  };

  const isWidthLg = getIsBreakpoint('lg');
  const isWidthMd = getIsBreakpoint('md');
  const isWidthSm = getIsBreakpoint('sm');

  const isThumbs = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  const showSliders = useMemo(() => {
    if (isWidthMd) return 4;
    if (isWidthLg) return 5;
    return 6;
  }, [isWidthLg, isWidthMd]);

  return (
    <Root>
      <Wrapper>
        {!isWidthSm && (
          <ButtonPrev ref={prevRef}>
            <ArrowLeft color={colors.greyScale[0]} width={40} height={40} />
          </ButtonPrev>
        )}

        <MainSwiper
          onInit={(swiper) => handleInit(swiper)}
          spaceBetween={isWidthSm ? 16 : 10}
          thumbs={{ swiper: isWidthSm ? null : isThumbs }}
          pagination={{
            type: 'fraction',
          }}
          navigation={{
            nextEl: '.next-btn',
          }}
          modules={[Navigation, Thumbs, Pagination]}
          className="mySwiper2">
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt="apartment picture" objectFit="contain" layout="fill" />
            </SwiperSlide>
          ))}
        </MainSwiper>

        {!isWidthSm && (
          <ButtonNext ref={nextRef} className="next-btn">
            <ArrowRight color={colors.greyScale[0]} width={40} height={40} />
          </ButtonNext>
        )}
      </Wrapper>

      {!isWidthSm && (
        <SecondSwiper
          onSwiper={setThumbsSwiper}
          spaceBetween={16.8}
          slidesPerView={showSliders}
          watchSlidesProgress
          modules={[Navigation, Thumbs]}
          className="mySwiper">
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt="apartment picture" width={202} height={94} objectFit="cover" />
            </SwiperSlide>
          ))}
        </SecondSwiper>
      )}

      <CloseContainer onClick={close}>
        <CloseBig />
      </CloseContainer>
    </Root>
  );
};

export default FullViewSlider;

const CloseContainer = styled.div`
  position: absolute;
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  top: 37px;
  right: 72px;
  cursor: pointer;

  @media (max-width: ${BreakpointsEnum.md}px) {
    right: 16px;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    top: 12px;
    z-index: 99999;
  }
`;

const ButtonPrev = styled.div`
  margin-left: 72px;
  width: 40px;
  height: 40px;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.swiper-button-disabled {
    svg {
      path {
        stroke: ${({ theme: { colors } }) => colors.greyScale[60]} !important;
      }
    }
    cursor: auto;
  }

  @media (max-width: ${BreakpointsEnum.md}px) {
    margin-left: 16px;
  }
`;

const ButtonNext = styled.button`
  margin-right: 72px;
  width: 40px;
  height: 40px;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.swiper-button-disabled {
    svg {
      path {
        stroke: ${({ theme: { colors } }) => colors.greyScale[60]} !important;
      }
    }
    cursor: auto;
  }

  @media (max-width: ${BreakpointsEnum.md}px) {
    margin-right: 16px;
  }
`;

const SecondSwiper = styled(Swiper)`
  margin: 40px 0;
  max-width: 1296px;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;

  @media (max-width: ${BreakpointsEnum.lg}px) {
    max-width: 1050px;
  }
  @media (max-width: ${BreakpointsEnum.md}px) {
    max-width: 840px;
  }
  .swiper-wrapper {
    max-width: 100%;
  }

  .swiper-slide {
    width: 202px !important;
    &.swiper-slide-thumb-active {
      filter: contrast(60%) brightness(133%);
    }
  }
`;

const MainSwiper = styled(Swiper)`
  max-width: 1072px;
  width: 100%;
  height: 100%;
  .swiper-pagination-fraction {
    display: none;
  }

  @media (max-width: ${BreakpointsEnum.lg}px) {
    max-width: 800px;
  }
  @media (max-width: ${BreakpointsEnum.md}px) {
    max-width: 600px;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 16px;
    ${({ theme: { typography, colors } }) => css`
      .swiper-pagination-fraction {
        display: block;
        position: absolute;
        top: 24px;
        left: 24px !important;
        ${typography.body_20_14_regular}
        color: ${colors.greyScale[0]};
        padding-top: 4px;
        width: 47px;
        height: 22px;
        border-radius: 30px;
        left: 45%;
      }
    `}
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 56px;
  width: 100%;
  max-height: 648px;
  height: 100%;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-height: 100%;
    margin-top: 0;
  }
`;

const Root = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999999;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(28, 33, 45, 0.8);
`;
