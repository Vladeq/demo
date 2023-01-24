import { ApartmentAdStatusType, RentPeriodType } from '__generated__/types';
import { useToggle } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BaseMyAdsCardComponentProps, TextVariants } from 'types';
import { AppText, BaseModal, Switch } from 'ui';

import { InfoCircleFilled } from '../../../../../public/svg/components';
import { TooltipBlock } from '../TooltipBlock';

const TooltipForCard: FC<BaseMyAdsCardComponentProps> = ({
  status,
  rentType,
  confirmData,
  confirmPhone,
  confirmDocuments,
  confirmed,
  payMethod,
  declineReason = '',
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });

  const { isOpened: isOpenDraftTooltip, toggle: toggleDraftTooltip } = useToggle(false);
  const { isOpened: isOpenProcessTooltip, toggle: toggleProcessTooltip } = useToggle(false);
  const { isOpened: isOpenMomentRentTooltip, toggle: toggleMomentRentTooltip } = useToggle(false);

  const isConfirmedInfo = confirmData && confirmPhone && confirmDocuments && payMethod;

  const activeOrPublishedShortStatus =
    (status === ApartmentAdStatusType.Active || status === ApartmentAdStatusType.Published) &&
    rentType === RentPeriodType.ShortTerm;
  const isDraft = status === ApartmentAdStatusType.Draft;
  const isProcess = status === ApartmentAdStatusType.Processing;
  const isLongTerm = rentType === RentPeriodType.LongTerm;
  const isDraftAndReject = isDraft && !confirmed && declineReason;

  return (
    <TooltipContainer>
      {activeOrPublishedShortStatus && (
        <SwitcherContainer>
          <TextIconContainer>
            <TextActive variant={TextVariants.SECONDARY} font="body_20_14_regular">
              {t('momentRent')}
            </TextActive>
            <InfoCircleFilled onClick={toggleMomentRentTooltip} />
          </TextIconContainer>
          <StyledSwitch checked disabled={status === ApartmentAdStatusType.Active} onChange={(e) => console.log(e)} />
        </SwitcherContainer>
      )}
      {isProcess && !isConfirmedInfo && (
        <Container>
          <TabWithText>
            <RedText font="body_20_14_regular">{t('verifyData')}</RedText>
          </TabWithText>
          <InfoCircleFilled onClick={toggleProcessTooltip} />
        </Container>
      )}
      {isProcess && isConfirmedInfo && (
        <Container>
          <CheckedTabWithText>
            <CheckedText variant={TextVariants.SECONDARY} font="body_20_14_regular">
              {t('checked')}
            </CheckedText>
          </CheckedTabWithText>
        </Container>
      )}
      {isDraftAndReject && (
        <DraftContainer>
          <TabWithText>
            <RedText font="body_20_14_regular">{t('reject')}</RedText>
          </TabWithText>
          <InfoCircleFilled onClick={toggleDraftTooltip} />
        </DraftContainer>
      )}
      <StyledBaseModal isBottomMobile whithoutHeader onClose={toggleDraftTooltip} isVisible={isOpenDraftTooltip}>
        <TooltipBlock withButton onButtonClick={toggleDraftTooltip} buttonText="Понятно" text={declineReason} />
      </StyledBaseModal>
      <StyledBaseModal isBottomMobile whithoutHeader onClose={toggleProcessTooltip} isVisible={isOpenProcessTooltip}>
        <TooltipBlock text={isLongTerm ? t('tooltipOnProcessLongTerm') : t('tooltipOnProcessShortTerm')} />
      </StyledBaseModal>
      <StyledBaseModal
        isBottomMobile
        whithoutHeader
        onClose={toggleMomentRentTooltip}
        isVisible={isOpenMomentRentTooltip}>
        <TooltipBlock
          text={t('momentRentTooltip')}
          withButton
          buttonText={t('momentRentTooltipBtn')}
          onButtonClick={toggleMomentRentTooltip}
        />
      </StyledBaseModal>
    </TooltipContainer>
  );
};

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const SwitcherContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 18px;
`;

const Container = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 13px;
  padding-bottom: 16px;
`;

const DraftContainer = styled.div`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 13px;
  padding: 8px 0 16px;
`;

const TextActive = styled(AppText)``;

const TabWithText = styled.div`
  width: fit-content;
  ${({ theme }) => css`
    background-color: ${theme.colors.additional.redLight};
    border-radius: 8px;
  `}
`;

const CheckedTabWithText = styled.div`
  width: fit-content;
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[20]};
    border-radius: 8px;
    padding: 6px 16px;
  `}
`;

const StyledBaseModal = styled(BaseModal)`
  width: 100%;
  max-width: 672px;
  .modal-header {
    border-bottom: none;
  }
`;

const CheckedText = styled(AppText)``;

const RedText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.additional.red};
  `}
  padding: 6px 16px;
`;

const StyledSwitch = styled(Switch)`
  margin-left: 10px;
`;

const TextIconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default TooltipForCard;
