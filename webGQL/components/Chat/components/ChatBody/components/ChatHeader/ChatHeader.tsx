import { UserComplaintType } from '__generated__/types';
import { ModalComplain } from 'components/ModalComplain';
import { useSendUserComplaint } from 'graphql/mutations/User/__generated__/sendUserComplaint';
import { useClientSize, useToggle } from 'hooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, LightButton } from 'ui';
import { LightButtonSize } from 'ui/LightButton/LightButton';

import { ArrowLeft } from '../../../../../../../public/svg/components';

type ChatHeaderProps = {
  username?: string;
  companionId: string;
};

const ChatHeader: FC<ChatHeaderProps> = ({ username = '', companionId }) => {
  const { close, isOpened, open } = useToggle();
  const { t } = useTranslation('ui', { keyPrefix: 'chat.chatHeader' });
  const { t: tUserComplains } = useTranslation('common', { keyPrefix: 'complains.user' });

  const [sendUserComplaintFetch, { loading }] = useSendUserComplaint();

  const userComplains = useMemo(
    () => [
      { label: tUserComplains('IThinkTheyAreDeceiving'), value: UserComplaintType.IThinkTheyAreDeceiving },
      { label: tUserComplains('thisUserIsBehavingIndecently'), value: UserComplaintType.ThisUserIsBehavingIndecently },
      { label: tUserComplains('thisIsSpam'), value: UserComplaintType.ThisIsSpam },
      { label: tUserComplains('other'), value: UserComplaintType.Other },
    ],
    [tUserComplains],
  );

  const sendUserComplaint = async (causes: string[], reason: string) => {
    await sendUserComplaintFetch({
      variables: { input: { recipientUserId: companionId, cause: causes as UserComplaintType[], reason } },
    });
  };

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  const router = useRouter();

  const hangleGoBackClick = () => {
    router.back();
  };

  return (
    <Root>
      <Username>
        {isMobile && <ArrowLeft onClick={hangleGoBackClick} />}
        <AppText variant={TextVariants.SECONDARY} font="body_24_16_medium">
          {username}
        </AppText>
      </Username>
      <LightButton isUnderline size={LightButtonSize.SMALL} text={t('report')} onClick={open} />
      <ModalComplain
        isLoading={loading}
        submit={sendUserComplaint}
        close={close}
        isVisible={isOpened}
        complains={userComplains}
      />
    </Root>
  );
};

export default ChatHeader;

const Root = styled.div`
  width: 100%;
  height: 72px;

  padding: 24px 16px 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 500px;
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 24px 16px 24px 16px;
  }
`;

const Username = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;
