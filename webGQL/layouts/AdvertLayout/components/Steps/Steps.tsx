import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Routes } from 'constains';
import { useClientSize } from 'hooks';
import { useRouter } from 'next/router';
import { FC } from 'react';
import i18n from 'services/i18n';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BreakpointsEnum } from 'types';
import { StepProps, Steps as StepsMap } from 'types/advert';

import { LocalTypes } from '../../../../../public/locales/types';
import { LinkOnStep } from './components';

const steps = [
  {
    title: i18n.t('advertCreateSteps.rentType', { ns: LocalTypes.COMMON }),
    link: Routes.adCreate,
    isCurrent: true,
    step: 1,
  },
  { title: i18n.t('advertCreateSteps.houseType', { ns: LocalTypes.COMMON }), link: Routes.adCreateHouseType, step: 2 },
  {
    title: i18n.t('advertCreateSteps.moreAboutHousing', { ns: LocalTypes.COMMON }),
    link: Routes.adCreateAboutHouse,
    step: 3,
  },
  { title: i18n.t('advertCreateSteps.address', { ns: LocalTypes.COMMON }), link: Routes.adCreateAddress, step: 4 },
  { title: i18n.t('advertCreateSteps.photo', { ns: LocalTypes.COMMON }), link: Routes.adCreateHouseMedia, step: 5 },
  {
    title: i18n.t('advertCreateSteps.houseDescription', { ns: LocalTypes.COMMON }),
    link: Routes.adDescriptionHouse,
    step: 6,
  },
  {
    title: i18n.t('advertCreateSteps.importantInfo', { ns: LocalTypes.COMMON }),
    link: Routes.adInformationHouse,
    step: 7,
  },
];

const Steps: FC<StepProps> = ({ step }) => {
  const { getIsBreakpoint } = useClientSize();
  const { pathname } = useRouter();
  const currentSlide = +StepsMap[pathname] - 1;

  const isWidthMD = getIsBreakpoint('md');

  return (
    <Root>
      <StepsContainer>
        {steps.map((elem, index) => {
          const isCurrent = step ? elem.step === +step : index === 0 && true;
          return (
            <LinkOnStep
              title={elem.title}
              isDisabled={elem.step > +step}
              isCurrent={isCurrent}
              link={elem.link}
              key={index}
              isChecked={elem.step < +step}
            />
          );
        })}
      </StepsContainer>
      <StyledSwiper
        spaceBetween={isWidthMD ? 34 : 16}
        slidesPerView="auto"
        loopedSlides={2}
        initialSlide={currentSlide}>
        {steps.map((elem, index) => {
          const isCurrent = step ? elem.step === +step : index === 0 && true;
          return (
            <SwiperSlide key={index} style={{ maxWidth: 'fit-content' }}>
              <LinkOnStep
                title={elem.title}
                isDisabled={elem.step > +step}
                isCurrent={isCurrent}
                link={elem.link}
                key={index}
                isChecked={elem.step < +step}
              />
            </SwiperSlide>
          );
        })}
      </StyledSwiper>
    </Root>
  );
};

export default Steps;

const Root = styled.div`
  padding: 32px 24px;
  position: sticky;
  top: 192px;
  height: 422px;
  width: 100%;
  max-width: 400px;
  border-radius: 21px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[0]};

  @media (max-width: ${BreakpointsEnum.md}px) {
    flex-direction: row;
    gap: 34px;
    overflow-y: hidden;
    white-space: nowrap;
    max-width: 100%;
    height: 30px;
    align-items: center;
    border-radius: 0;
    top: 92px;
    padding: 0 18px;
  }
`;

const StyledSwiper = styled(Swiper)`
  display: none;

  @media (max-width: ${BreakpointsEnum.md}px) {
    display: flex;
    width: 100%;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (max-width: ${BreakpointsEnum.md}px) {
    display: none;
  }
`;
