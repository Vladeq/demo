import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

import { InfoCircleFilled } from '../../../../../../../public/svg/components';

type AlertProps = {
  price: string;
  paymentDate: string;
  hasButton?: boolean;
};

const Alert: FC<AlertProps> = ({ hasButton = true, price, paymentDate }) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'payments' });
  const { getIsBreakpoint } = useClientSize();

  const handleAlertClick = () => {};

  const isWidthSm = getIsBreakpoint('sm');

  return (
    <Root>
      <InfoContainer>
        <StyledInfoCircle />
        <Info>{t('alertNextPayment')}</Info>
        <Price>{price}</Price>
        <Housing>{t('alertHousing')}</Housing>
        <Info>{t('alertLoss')}</Info>
        <Date>{paymentDate}</Date>
      </InfoContainer>
      {hasButton && (
        <StyledButton
          isFullWight={isWidthSm}
          size={ButtonSize.SMALL}
          text={t('alertButtonPayNow')}
          variant={ButtonVariant.PRIMARY}
          onClick={handleAlertClick}
        />
      )}
    </Root>
  );
};

export default Alert;

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme: { colors } }) => colors.additional.orange};
  border-radius: 8px;
  background: ${({ theme: { colors } }) => colors.additional.orangeLight};
  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-direction: column;
    row-gap: 8px;
  }
`;

const StyledInfoCircle = styled(InfoCircleFilled)`
  margin-right: 8px;
  path {
    fill: ${({ theme: { colors } }) => colors.additional.orange};
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  align-items: center;
  min-height: 32px;
`;

const Info = styled(AppText)`
  margin-right: 4px;
  ${({ theme: { typography } }) => typography.body_20_14_regular}
  color: ${({ theme: { colors } }) => colors.additional.orange};
`;

const Price = styled(AppText)`
  margin-right: 4px;
  ${({ theme: { typography } }) => typography.body_20_14_medium}
  color: ${({ theme: { colors } }) => colors.additional.orange};
`;

const Housing = styled(AppText)`
  margin-right: 4px;
  text-decoration: underline;
  ${({ theme: { typography } }) => typography.body_20_14_medium}
  color: ${({ theme: { colors } }) => colors.additional.orange};
  text-underline-offset: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Date = styled(AppText)`
  margin-right: 4px;
  ${({ theme: { typography } }) => typography.body_20_14_medium}
  color: ${({ theme: { colors } }) => colors.additional.orange};
`;

const StyledButton = styled(Button)`
  white-space: nowrap;
  padding: 8px 17.5px;
`;
