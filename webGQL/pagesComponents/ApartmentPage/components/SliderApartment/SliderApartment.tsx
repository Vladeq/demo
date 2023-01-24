import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React, { FC, useRef, useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { ArrowLeft, ArrowRight } from '../../../../../public/svg/components';

type SliderProps = {
  images: string[];
  open: () => void;
};

const SliderApartment: FC<SliderProps> = ({ images, open }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'slider' });

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

  const isThumbs = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null;

  return (
    <Root>
      <Wrapper>
        <ButtonPrev ref={prevRef}>
          <ArrowLeft />
        </ButtonPrev>
        <ButtonNext ref={nextRef}>
          <ArrowRight />
        </ButtonNext>
        <MainSwiper
          onInit={(swiper) => handleInit(swiper)}
          spaceBetween={10}
          thumbs={{ swiper: isThumbs }}
          modules={[Navigation, Thumbs]}
          className="mySwiper2">
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt="apartment picture" objectFit="cover" layout="fill" />
            </SwiperSlide>
          ))}
        </MainSwiper>
        <StyledButton
          onClick={open}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          text={t('showAllPhotos')}
        />
      </Wrapper>

      <SecondSwiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        modules={[Navigation, Thumbs]}
        className="mySwiper">
        {images?.map((image, index) => (
          <SwiperSlide key={index}>
            <Image src={image} alt="apartment picture" width={203} height={94} objectFit="cover" />
          </SwiperSlide>
        ))}
      </SecondSwiper>
    </Root>
  );
};

export default SliderApartment;

const ButtonPrev = styled.div`
  display: flex;
  position: absolute;

  top: calc(50% - 20px);
  left: -20px;
  width: 40px;
  height: 40px;
  z-index: 1000;
  align-items: center;
  justify-content: center;

  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(175, 181, 192, 0.18);
  cursor: pointer;
`;
const ButtonNext = styled.div`
  display: flex;
  position: absolute;

  top: calc(50% - 20px);
  right: -20px;
  width: 40px;
  height: 40px;
  z-index: 1000;
  align-items: center;
  justify-content: center;

  background: ${({ theme: { colors } }) => colors.greyScale[0]};
  border: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(175, 181, 192, 0.18);
  cursor: pointer;
`;
const SecondSwiper = styled(Swiper)`
  margin-top: 16px;
  z-index: 0;

  .swiper-slide {
    &.swiper-slide-thumb-active {
      opacity: 0.5 !important;
    }
    span {
      border-radius: 12px !important;
    }
  }
`;
const MainSwiper = styled(Swiper)`
  position: relative;
  height: 389px;
  border-radius: 18px;
`;
const StyledButton = styled(Button)`
  position: absolute;

  bottom: 24px;
  right: 24px;
  padding: 0 23px;
  z-index: 1000;

  ${({ theme: { typography } }) => typography.caption_16_12_medium}
  background: ${({ theme: { colors } }) => colors.greyScale[0]};
`;
const Wrapper = styled.div`
  position: relative;
  z-index: 0;
`;
const Root = styled.div``;
