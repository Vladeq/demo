import { ApartmentAdStatusType, RentPeriodType, ShortTermRentBookingType } from '__generated__/types';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { BaseMyAdsCardComponentProps, TextVariants } from 'types';
import { AppText, Switch, Tooltip } from 'ui';
import { TooltipHorizontalPositionEnum, TooltipPositionEnum } from 'ui/Tooltip/Tooltip';

import { InfoCircleFilled } from '../../../../../public/svg/components';
import { useChangeRentBookingType } from '../../../../graphql/mutations/Advert/__generated__/changeRentBookingType.mutation';

const TooltipForCard: FC<BaseMyAdsCardComponentProps> = ({
  status,
  rentType,
  id,
  confirmData,
  confirmPhone,
  confirmDocuments,
  confirmed,
  payMethod,
  rentBookingType,
  declineReason,
}) => {
  const { t } = useTranslation('ui', { keyPrefix: 'cards' });

  const [changeBookingTypeAsync, { loading }] = useChangeRentBookingType();

  const isConfirmedInfo = confirmData && confirmPhone && confirmDocuments && payMethod;
  const isProcess = status === ApartmentAdStatusType.Processing;
  const confirmedProcessStatus = isProcess && isConfirmedInfo;
  const notConfirmedProcessStatus = isProcess && !isConfirmedInfo;
  const isDraft = status === ApartmentAdStatusType.Draft;
  const isLongTerm = rentType === RentPeriodType.LongTerm;
  const isDraftAndReject = isDraft && !confirmed && declineReason;
  const activeOrPublishedShortStatus =
    (status === ApartmentAdStatusType.Active || status === ApartmentAdStatusType.Published) &&
    rentType === RentPeriodType.ShortTerm;

  const isInstantRent = rentBookingType === ShortTermRentBookingType.Instant;

  const changeRentBookingType = async () => {
    await changeBookingTypeAsync({
      variables: {
        input: {
          id: id!,
        },
      },
    });
  };

  return (
    <MainContainer>
      {activeOrPublishedShortStatus && (
        <>
          <TextActive variant={TextVariants.SECONDARY} font="body_20_14_regular">
            {t('momentRent')}
          </TextActive>
          <Tooltip
            text={t('momentRentTooltipDashboard')}
            horizontalPosition={TooltipHorizontalPositionEnum.CENTER}
            position={TooltipPositionEnum.BOTTOM}>
            <InfoCircleFilled />
          </Tooltip>
          <StyledSwitch
            checked={isInstantRent}
            disabled={status === ApartmentAdStatusType.Active || loading}
            onChange={changeRentBookingType}
          />
        </>
      )}
      {notConfirmedProcessStatus && (
        <>
          <Tooltip
            text={isLongTerm ? t('tooltipOnProcessLongTerm') : t('tooltipOnProcessShortTerm')}
            horizontalPosition={TooltipHorizontalPositionEnum.END}
            position={TooltipPositionEnum.BOTTOM}>
            <InfoCircleFilled />
          </Tooltip>
          <TabWithText>
            <RedText font="body_20_14_regular">{t('verifyData')}</RedText>
          </TabWithText>
        </>
      )}
      {confirmedProcessStatus && (
        <CheckedTabWithText>
          <CheckedText variant={TextVariants.SECONDARY} font="body_20_14_regular">
            {t('checked')}
          </CheckedText>
        </CheckedTabWithText>
      )}
      {isDraftAndReject && (
        <>
          <Tooltip
            text={declineReason}
            horizontalPosition={TooltipHorizontalPositionEnum.END}
            position={TooltipPositionEnum.BOTTOM}>
            <InfoCircleFilled />
          </Tooltip>
          <TabWithText>
            <RedText font="body_20_14_regular">{t('reject')}</RedText>
          </TabWithText>
        </>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  z-index: 100;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

const TextActive = styled(AppText)`
  margin: 0 5px;
  white-space: nowrap;
`;

const TabWithText = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.additional.redLight};
    border-radius: 8px;
    margin-left: 13px;
  `}
`;

const CheckedTabWithText = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.greyScale[20]};
    border-radius: 8px;
  `}
`;

const CheckedText = styled(AppText)`
  padding: 8px 16px;
  white-space: nowrap;
`;

const RedText = styled(AppText)`
  ${({ theme }) => css`
    color: ${theme.colors.additional.red};
  `}
  padding: 8px 16px;
  white-space: nowrap;
`;

const StyledSwitch = styled(Switch)`
  margin-left: 10px;
`;

export default TooltipForCard;
