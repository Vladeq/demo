import Image from 'next/image';
import { components, OptionProps } from 'react-select';
import styled from 'styled-components';
import { AppText } from 'ui';
import { stringCircumcision } from 'utils/textHelpers';

type CustomOptionTypes = {
  label: string;
  image: string;
};

const CustomOption = (props: OptionProps<CustomOptionTypes>) => {
  const option = props.data;

  return (
    <components.Option {...props}>
      <StyledOption>
        <ImageContainer>
          <StyledImage src={option.image} height="24" width="24" layout="intrinsic" />
        </ImageContainer>
        <Label font="caption_16_12_regular">{stringCircumcision(option.label, 28)}</Label>
      </StyledOption>
    </components.Option>
  );
};

export default CustomOption;

const Label = styled(AppText)`
  white-space: pre;
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledImage = styled(Image)`
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  min-width: 24px;
  min-height: 24px;
`;
