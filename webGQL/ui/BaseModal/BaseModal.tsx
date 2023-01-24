import { useClickOutside } from 'hooks';
import dynamic from 'next/dynamic';
import { FC, ReactNode, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';

import { ArrowLeft, LogoLivin } from '../../../public/svg/components';
import SvgClose from '../../../public/svg/components/Close';
import { AppText } from '../AppText';

export type BaseModalProps = {
  isVisible?: boolean;
  onGoBack?: () => void;
  withStandartTitle?: boolean;
  withBackOption?: boolean;
  whithoutHeader?: boolean;
  isDropZoneModal?: boolean;
  withOutsideClick?: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
  isBottomMobile?: boolean;
  isStickyHeader?: boolean;
};

const Portal = dynamic(() => import('hocs/portal/portal'), { ssr: false });

const BaseModal: FC<BaseModalProps> = ({
  onClose,
  isVisible,
  title,
  onGoBack,
  withStandartTitle,
  withBackOption,
  whithoutHeader,
  isDropZoneModal,
  withOutsideClick = true,
  children,
  className,
  isStickyHeader = false,
  isBottomMobile = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  if (withOutsideClick) {
    useClickOutside(ref, onClose);
  }

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('keydown', close);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Wrapper>
      <Body ref={ref} className={className} $isBottomMobile={isBottomMobile} $withStandartTitle={withStandartTitle}>
        {whithoutHeader ? (
          <Header $isBottomMobile={isBottomMobile} $noPadding={whithoutHeader} $isStickyHeader={isStickyHeader} />
        ) : (
          <Header
            className="modal-header"
            $isBottomMobile={isBottomMobile}
            $isDropZoneModal={isDropZoneModal}
            $isStickyHeader={isStickyHeader}>
            <TitleContainer>
              {withStandartTitle && <LogoLivin />}
              {withBackOption && (
                <BackButton onClick={onGoBack}>
                  <ArrowLeft />
                </BackButton>
              )}
              <Title
                font={isDropZoneModal ? 'body_24_16_medium' : 'title_22_18_bold'}
                forwardedAs="h2"
                variant={TextVariants.SECONDARY}
                $displayNone={withStandartTitle}>
                {title}
              </Title>
            </TitleContainer>
            <IconContainer className="close-button" onClick={onClose}>
              <SvgClose color="#1C212D" />
            </IconContainer>
          </Header>
        )}
        <Container className="modal-container" $isBottomMobile={isBottomMobile}>
          {children}
        </Container>
      </Body>
    </Wrapper>
  );
};

export default BaseModal;

const Wrapper = styled(Portal)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9991;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: inherit;
  background: rgba(28, 33, 45, 0.3);
`;

const Body = styled.div<{ $isBottomMobile: boolean; $withStandartTitle?: boolean }>`
  ${({ theme: { colors }, $isBottomMobile, $withStandartTitle }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    background-color: ${colors.greyScale[0]};
    border-radius: 32px;
    outline: none;

    ${$withStandartTitle &&
    css`
      border-radius: 0;
    `};

    @media (max-width: ${BreakpointsEnum.s}px) {
      ${$isBottomMobile &&
      css`
        position: absolute;
        bottom: 0;
        border-radius: 24px 24px 0 0;
      `}
    }
  `}
`;

type HeaderProps = {
  $isStickyHeader: boolean;
  $isBottomMobile: boolean;
  $noPadding?: boolean;
  $isDropZoneModal?: boolean;
};

const Header = styled.div<HeaderProps>`
  ${({ theme: { colors }, $isBottomMobile, $noPadding, $isDropZoneModal, $isStickyHeader }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    ${$isDropZoneModal ? `padding: 16px 30px 16px 24px` : `padding: 24px 30px 16px 24px;`};
    ${$isStickyHeader &&
    css`
      position: sticky;
      top: 0;
      background: ${colors.greyScale[0]};
      z-index: 999;
    `}
    border-bottom: 1px solid ${colors.greyScale[30]};

    @media (max-width: ${BreakpointsEnum.s}px) {
      border-bottom: 1px solid ${colors.greyScale[30]};
      ${$isBottomMobile &&
      css`
        ${$noPadding ? `padding: 0` : `padding: 31px 16px 8px`};
      `}
    }
  `}
`;

const Title = styled(AppText)<{ $displayNone: boolean | undefined }>`
  ${({ $displayNone }) => $displayNone && `display: none`}
`;

const IconContainer = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  height: 20px;
  cursor: pointer;
`;

const Container = styled.div<{ $isBottomMobile: boolean }>`
  ${({ $isBottomMobile }) => css`
    padding: 16px;

    @media (max-width: ${BreakpointsEnum.s}px) {
      padding: ${$isBottomMobile && '24px 16px 16px 16px'};
    }
  `}
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  height: 20px;
  margin-right: 16px;
  cursor: pointer;
`;
