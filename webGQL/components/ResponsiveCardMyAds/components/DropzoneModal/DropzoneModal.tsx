import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Button, Dropzone } from 'ui';
import { ButtonSize, ButtonVariant } from 'ui/Button/Button';

const DropzoneModal: FC = () => {
  const { t } = useTranslation('ui');
  return (
    <MainContainer>
      <Dropzone onFilesRead={() => {}} buttonText={t('dropzone.buttons.file')} />
      <ContainerWithBorder>
        <StyledButton text={t('buttons.save')} disabled size={ButtonSize.NORMAL} variant={ButtonVariant.PRIMARY} />
      </ContainerWithBorder>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;
const ContainerWithBorder = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.greyScale[30]};
  `}
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
`;

const StyledButton = styled(Button)`
  max-width: 240px;
  padding: 12px 88px;
  height: 100%;
  width: 100%;
`;

export default DropzoneModal;
