import { GenderType } from '__generated__/types';
import { useEditGender } from 'graphql/mutations/User/__generated__/editGender.mutation';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { notify } from 'services';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText, Button, RadioButton } from 'ui';

type GenderFormProps = {
  close: () => void;
  genderType: GenderType;
};

const GenderForm: FC<GenderFormProps> = ({ close, genderType }) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'personalInformation' });

  const [fetchEditGender] = useEditGender();

  const arrayGenderType = [
    { title: t('male'), value: GenderType.Male },
    { title: t('female'), value: GenderType.Female },
  ];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      genderType,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await fetchEditGender({
      variables: {
        input: {
          gender: data.genderType,
        },
      },
      onCompleted: () => notify(t('genderChanged')),
      onError: () => notify(t('somethingError')),
    });
    close();
  };

  return (
    <Root>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {arrayGenderType.map((radio, index) => (
            <Controller
              key={index}
              control={control}
              name="genderType"
              render={({ field: { value, onChange } }) => (
                <GenderItem onClick={() => onChange(radio.value)}>
                  <RadioButton name={String(index)} checked={value === radio.value} />
                  <StyledAppText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
                    {radio.title}
                  </StyledAppText>
                </GenderItem>
              )}
            />
          ))}
          <StyledButton type="submit" text={t('save')} isFullWight />
        </form>
      </Wrapper>
    </Root>
  );
};

export default GenderForm;

type FormValues = {
  genderType: GenderType;
};

const StyledAppText = styled(AppText)`
  margin-left: 10px;
`;
const GenderItem = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  cursor: pointer;
`;
const Wrapper = styled.div`
  width: 100%;
`;
const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: -6px;
  }
`;
const StyledButton = styled(Button)`
  margin-top: 24px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: 16px;
  }
`;
