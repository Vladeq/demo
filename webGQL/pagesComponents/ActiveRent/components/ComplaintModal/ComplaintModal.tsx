import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { BreakpointsEnum } from 'types';
import { Button, CheckBox } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

type ComplaintModalProps = {
  landlordId: string;
  onSubmitCallback: () => void;
};

interface SelectData {
  isInsult: boolean;
  isSpam: boolean;
  isScam: boolean;
  isOther: boolean;
}

enum ReasonsEnum {
  IS_INSULT = 'isInsult',
  IS_SPAM = 'isSpam',
  IS_SCAM = 'isScam',
  IS_OTHER = 'isOther',
}

export const ComplaintModal: FC<ComplaintModalProps> = ({ onSubmitCallback }) => {
  const { t } = useTranslation('activeRentPage', { keyPrefix: 'complaintModal' });

  const reasons = useMemo(
    () => [
      { name: ReasonsEnum.IS_INSULT, text: t('isInsult') },
      { name: ReasonsEnum.IS_SPAM, text: t('isSpam') },
      { name: ReasonsEnum.IS_SCAM, text: t('isScam') },
      { name: ReasonsEnum.IS_OTHER, text: t('isOther') },
    ],
    [t],
  );

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<SelectData>({
    defaultValues: {
      isInsult: false,
      isSpam: false,
      isScam: false,
      isOther: false,
    },
  });

  const onSubmit: SubmitHandler<SelectData> = () => {
    onSubmitCallback();
  };

  return (
    <Root>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Reasons>
          {reasons.map((reason, index) => (
            <ReasonContainer key={index}>
              <Reason>{reason.text}</Reason>
              <Controller
                control={control}
                name={reason.name}
                render={({ field: { value, onChange, name } }) => (
                  <CheckBox name={name} checked={value} onChange={onChange} />
                )}
              />
            </ReasonContainer>
          ))}
        </Reasons>
        <Footer>
          <StyledButton
            type="submit"
            isFullWight
            text={t('btnComplain')}
            size={ButtonSize.CARDS}
            variant={ButtonVariant.PRIMARY}
            isLoading={false}
            disabled={!isDirty}
          />
        </Footer>
      </form>
    </Root>
  );
};

const Root = styled.div`
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 0 8px 8px 8px;
  }
`;

const Reasons = styled.div``;

const ReasonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 26px 0px 18px 0px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    padding: 26px 8px 18px 8px;
  }
  :first-child {
    padding-top: 10px;
  }
  @media (max-width: ${BreakpointsEnum.sm}px) {
    border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }
  @media (min-width: ${BreakpointsEnum.sm}px) {
    :not(:last-child) {
      border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
    }
  }
`;

const Reason = styled.div`
  ${({ theme: { typography } }) => typography.body_20_14_regular}
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    margin-left: -24px;
    margin-right: -24px;
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const StyledButton = styled(Button)`
  max-width: 100%;
  margin-top: 24px;
  height: 48px;
  @media (min-width: ${BreakpointsEnum.sm}px) {
    max-width: 240px;
    margin-top: 16px;
    margin-right: 24px;
    margin-bottom: -8px;
    height: 40px;
  }
`;
