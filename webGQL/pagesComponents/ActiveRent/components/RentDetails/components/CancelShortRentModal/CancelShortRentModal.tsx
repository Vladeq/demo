import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

type CancelShortRentModalProps = {
  onClose: () => void;
};

export const CancelShortRentModal: FC<CancelShortRentModalProps> = ({ onClose }) => {
  const { t } = useTranslation('activeRentPage', { keyPrefix: 'cancelRentModal' });

  const handleSubmit = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Root>
      <Content font="body_24_16_regular" variant={TextVariants.SECONDARY}>
        {t('shortRentContent')}
      </Content>

      <RulesConteainer>
        <RulesTitle font="body_20_14_medium" variant={TextVariants.SECONDARY}>
          {t('shortRentRulesTitle')}
        </RulesTitle>
        <Rules font="body_20_14_regular" variant={TextVariants.SECONDARY}>
          {t('shortRentRulesContent')}
        </Rules>
      </RulesConteainer>

      <Footer>
        <StyledButton
          isFullWight
          text={t('dontCancel')}
          size={ButtonSize.CARDS}
          variant={ButtonVariant.SECONDARY}
          onClick={handleCancel}
        />
        <StyledButton
          isFullWight
          text={t('confirm')}
          size={ButtonSize.CARDS}
          variant={ButtonVariant.PRIMARY}
          onClick={handleSubmit}
        />
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  padding: 8px;
`;

const Content = styled(AppText)`
  margin-bottom: 24px;
  ${({ theme: { typography } }) => typography.body_24_16_regular}
  color: ${({ theme: { colors } }) => colors.greyScale[100]};
`;

const RulesConteainer = styled.div`
  padding: 16px 24px;
  background-color: ${({ theme: { colors } }) => colors.greyScale[10]};
  border-radius: 12px;
  margin-bottom: 24px;
`;

const RulesTitle = styled(AppText)`
  margin-bottom: 8px;
`;

const Rules = styled(AppText)`
  color: ${({ theme: { colors } }) => colors.greyScale[60]};
`;

const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
`;

const StyledButton = styled(Button)`
  max-width: 100%;
  height: 48px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
  }
`;
