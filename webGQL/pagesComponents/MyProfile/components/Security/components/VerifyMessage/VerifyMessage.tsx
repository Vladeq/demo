import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText } from 'ui';

import { CloseCircle, TickCircle } from '../../../../../../../public/svg/components';

export enum StatusVerifyEnum {
  CONFIRM,
  NOT_CONFIRM,
}

export enum DataEnum {
  EMAIL,
  PHONE,
}

type VerifyMessageProps = {
  typeData: DataEnum;
  status: StatusVerifyEnum;
};

export const VerifyMessage: FC<VerifyMessageProps> = ({ typeData, status }) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'security' });

  return (
    <Root>
      {status === StatusVerifyEnum.CONFIRM && (
        <Inner>
          <StyledTickCircle />
          <Message variant={TextVariants.SECONDARY}>
            {typeData === DataEnum.EMAIL ? t('emailConfirm') : t('phoneConfirm')}
          </Message>
        </Inner>
      )}
      {status === StatusVerifyEnum.NOT_CONFIRM && (
        <Inner>
          <CloseCircleContainer>
            <CloseCircle />
          </CloseCircleContainer>
          <Message variant={TextVariants.SECONDARY}>
            {typeData === DataEnum.EMAIL ? t('emailNotConfirm') : t('phoneNotConfirm')}
          </Message>
        </Inner>
      )}
    </Root>
  );
};

const Root = styled.div`
  margin-bottom: 16px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  column-gap: 8px;
  align-items: center;
`;

const CloseCircleContainer = styled.div`
  width: 24px;
  height: 24px;
`;

const StyledTickCircle = styled(TickCircle)`
  path {
    fill: ${({ theme: { colors } }) => colors.additional.green};
  }
`;

const Message = styled(AppText)`
  ${({ theme: { typography } }) => typography.body_20_14_medium}
`;
