import { ApartmentAdDescriptionModel } from '__generated__/types';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BreakpointsEnum, TextVariants } from 'types';
import { AppText } from 'ui';

type DescriptionsProps = {
  description?: ApartmentAdDescriptionModel;
};

const Descriptions: FC<DescriptionsProps> = ({ description }) => {
  const [tags, setTags] = useState<string[]>([]);
  const { t } = useTranslation('apartmentPage', { keyPrefix: 'description' });
  const { getIsBreakpoint } = useClientSize();

  const createTags = (description: ApartmentAdDescriptionModel) => {
    const newTags: string[] = [];
    if (description?.forFamily) {
      newTags.push(t('forFamily'));
    }
    if (description?.remoteView) {
      newTags.push(t('remoteView'));
    }
    if (description?.selfCheckIn) {
      newTags.push(t('selfCheckIn'));
    }
    if (description?.freeParking) {
      newTags.push(t('freeParking'));
    }
    if (description?.quite) {
      newTags.push(t('quite'));
    }
    if (description?.workSpace) {
      newTags.push(t('workSpace'));
    }
    setTags(newTags);
  };

  const isWidthS = getIsBreakpoint('s');

  useEffect(() => {
    if (description) {
      createTags(description);
    }
  }, [description, t]);

  return (
    <Root>
      <AppText variant={TextVariants.SECONDARY} font={isWidthS ? 'title_22_18_medium' : 'title_22_18_bold'}>
        {t('apartmentDescription')}
      </AppText>
      {tags && (
        <Tags>
          {tags.map((tag, index) => (
            <StyledAppText font="body_20_14_medium" variant={TextVariants.SECONDARY} key={index}>
              {tag}
            </StyledAppText>
          ))}
        </Tags>
      )}
      {description?.description && (
        <TextContainer>
          <AppText variant={TextVariants.SECONDARY} font="body_24_16_regular">
            {description.description}
          </AppText>
        </TextContainer>
      )}
    </Root>
  );
};

export default Descriptions;

const TextContainer = styled.div`
  width: 100%;
  margin-top: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  overflow: hidden;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: 32px;
  }
`;
const StyledAppText = styled(AppText)`
  padding: 10px 16px;
  border-radius: 12px;
  background: ${({ theme: { colors } }) => colors.greyScale[10]}; ;
`;
const Tags = styled.div`
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: ${BreakpointsEnum.lg}px) {
    margin-top: 32px;
    gap: 8px;
  }
`;
const Root = styled.div`
  margin-top: 40px;
  word-break: break-all;

  @media (max-width: ${BreakpointsEnum.s}px) {
    margin-top: 32px;
  }
`;
