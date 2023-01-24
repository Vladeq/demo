import { ApartmentRentPeriodType, MessageModel } from '__generated__/types';
import { useClientSize } from 'hooks';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { BreakpointsEnum } from 'types';

import { HomeRulesMessage } from '../HomeRulesMessage';
import { CancellationPolicyCard, Footer, Header } from './components';

type TermsMessageProps = {
  isLandlord?: boolean;
  isLastMessage: boolean;
  isContractStatusOffering: boolean;
  myId?: string;
  message: MessageModel;
  advertId: string;
};

const TermsMessage: FC<TermsMessageProps> = ({ message, ...headerProps }) => {
  const rules = message.contractData?.rules || null;
  const cost = message.contractData?.cost?.toString() || '';
  const arrivalDate = message.contractData?.arrivalDate || null;
  const departureDate = message.contractData?.departureDate || null;
  const shortTermRentCancellationPolicyType = message.contractData?.shortTermRentCancellationPolicyType;

  const isShortPeriodType = message.contractData?.apartmentRentPeriodType === ApartmentRentPeriodType.ShortTerm;
  const isShowCancellationPolicyCard = isShortPeriodType && shortTermRentCancellationPolicyType;

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  return (
    <Root>
      <Header {...headerProps} isShortPeriodType={isShortPeriodType} message={message} hasButtons={!isMobile} />
      {rules && <HomeRulesMessage {...headerProps} rules={rules} />}
      {isShowCancellationPolicyCard && <CancellationPolicyCard type={shortTermRentCancellationPolicyType} />}
      <Footer
        cost={cost}
        arrivalDate={arrivalDate}
        departureDate={departureDate}
        isShortPeriodType={isShortPeriodType}
        message={message}
        hasInfoContainer={!isMobile}
        {...headerProps}
      />
    </Root>
  );
};

export default TermsMessage;

const Root = styled.div`
  ${({ theme: { colors } }) => css`
    width: 100%;
    padding: 16px;

    display: grid;

    gap: 16px;

    background-color: ${colors.greyScale[0]};
    border: 1px solid ${colors.greyScale[30]};
    border-radius: 16px;
  `}

  @media (max-width: ${BreakpointsEnum.sm}px) {
    display: flex;
    flex-direction: column;
  }
`;
