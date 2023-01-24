import { ApartmentAdRulesModel, ShortTermRentCancellationPolicyType } from '__generated__/types';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';
import { returnHomeRules } from 'utils/returnHomeRules';

import { Clock } from '../../../../../public/svg/components';

type ImportantInformationProps = {
  rules?: ApartmentAdRulesModel | null;
  arrivalTime?: string | null;
  departureTime?: string | null;
  cancellationPolicy?: ShortTermRentCancellationPolicyType | null;
};

const ImportantInformation: FC<ImportantInformationProps> = ({
  rules,
  arrivalTime,
  departureTime,
  cancellationPolicy,
}) => {
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'importantInformation' });
  const { colors } = useTheme();

  const homeRules = useMemo(() => rules && returnHomeRules(rules), [rules]);

  const CancellationPolicyMapping = {
    [ShortTermRentCancellationPolicyType.Strict]: t('strictText'),
    [ShortTermRentCancellationPolicyType.Flexible]: t('flexibleText'),
    [ShortTermRentCancellationPolicyType.Inflexible]: t('inflexibleText'),
    [ShortTermRentCancellationPolicyType.Moderate]: t('moderateText'),
  };

  return (
    <Root>
      <AppText font="title_22_18_bold" variant={TextVariants.SECONDARY}>
        {t('informationTitle')}
      </AppText>
      <Container>
        <InformationContainer>
          <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
            {t('houseRules')}
          </AppText>
          <List>
            {arrivalTime && (
              <Item>
                <Clock />
                <StyledIconText font="body_20_14_regular" variant={TextVariants.SECONDARY}>{`${t(
                  'arrivalTime',
                )}${arrivalTime}`}</StyledIconText>
              </Item>
            )}
            {departureTime && (
              <Item>
                <Clock />
                <StyledIconText font="body_20_14_regular" variant={TextVariants.SECONDARY}>{`${t(
                  'departureTime',
                )}${departureTime}`}</StyledIconText>
              </Item>
            )}
            {homeRules?.map((rule, index) => (
              <Item key={index}>
                <rule.icon color={colors.greyScale[100]} width={24} height={24} />
                <StyledIconText font="body_20_14_regular" variant={TextVariants.SECONDARY}>
                  {rule.label}
                </StyledIconText>
              </Item>
            ))}
          </List>
        </InformationContainer>
        {cancellationPolicy && (
          <ShortInformationContainer>
            <AppText font="body_24_16_medium" variant={TextVariants.SECONDARY}>
              {t('cancelRules')}
            </AppText>
            <TextContainer>
              <AppText font="body_20_14_medium" variant={TextVariants.SECONDARY}>
                {CancellationPolicyMapping[cancellationPolicy]}
              </AppText>
            </TextContainer>
          </ShortInformationContainer>
        )}
      </Container>
    </Root>
  );
};

export default ImportantInformation;

const TextContainer = styled.div`
  margin-top: 24px;
  max-width: 250px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    max-width: 100%;
  }
`;
const ShortInformationContainer = styled.div``;
const StyledIconText = styled(AppText)`
  margin-left: 10px;
`;
const Item = styled.div`
  margin-bottom: 20px;
  display: flex;
`;
const List = styled.div`
  margin-top: 24px;
`;
const InformationContainer = styled.div`
  margin-right: 50px;
`;
const Container = styled.div`
  margin-top: 32px;
  display: flex;

  @media (max-width: ${BreakpointsEnum.s}px) {
    flex-direction: column;
    gap: 12px;
  }
`;
const Root = styled.div`
  margin-top: 32px;
  margin-bottom: 62px;
`;
