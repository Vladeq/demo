import { Accepts } from 'constains';
import { useClientSize } from 'hooks';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, FC, Fragment, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { TextVariants } from 'types';
import { AppText, BaseModal } from 'ui';
import { ModalDropDown } from 'ui/ModalDropDown';

import { CameraOutline, DocumentOutline } from '../../../../../../../public/svg/components';
import { ChatFormValues } from '../../ChatTextarea';

type DropdownMenuProps = {
  isOpen: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  closeMenu: () => void;
};

const DropdownMenu: FC<DropdownMenuProps> = ({ isOpen, onChange, closeMenu }) => {
  const { t } = useTranslation('ui', { keyPrefix: 'chat.chatTextarea.dropdownMenu' });

  const menuItems = useMemo<Array<MenuItemType>>(
    () => [
      { icon: <CameraOutline />, label: t('sendImage'), name: 'image', accept: Accepts.image },
      {
        icon: <DocumentOutline />,
        label: t('sendFile'),
        name: 'file',
        accept: Accepts.document,
      },
    ],
    [t],
  );

  const { getIsBreakpoint } = useClientSize();
  const isMobile = getIsBreakpoint('sm');

  return (
    <>
      {isMobile ? (
        <StyledModal isVisible={isOpen} onClose={closeMenu} isBottomMobile whithoutHeader>
          {menuItems.map((item) => (
            <Fragment key={item.name}>
              <Item>
                <MenuWrapper>
                  {item.icon}
                  <AppText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
                    {item.label}
                  </AppText>
                </MenuWrapper>
              </Item>
              <HiddenInput id={item.name} accept={item.accept} type="file" onChange={onChange} />
            </Fragment>
          ))}
        </StyledModal>
      ) : (
        <Root isOpen={isOpen}>
          {menuItems.map((item) => (
            <Fragment key={item.name}>
              <MenuItem htmlFor={item.name}>
                <MenuWrapper>
                  {item.icon}
                  <AppText variant={TextVariants.SECONDARY} font="caption_16_12_regular">
                    {item.label}
                  </AppText>
                </MenuWrapper>
              </MenuItem>
              <HiddenInput id={item.name} accept={item.accept} type="file" onChange={onChange} />
            </Fragment>
          ))}
        </Root>
      )}
    </>
  );
};

export default DropdownMenu;

type MenuItemType = {
  name: keyof ChatFormValues;
  label: string;
  icon: ReactNode;
  accept: string;
};

const Root = styled(ModalDropDown)`
  position: absolute;
  top: -8px;
  right: 0;
  bottom: auto;
  left: auto;
  margin: 0;

  transform: translateY(-100%);

  box-shadow: 0px 10px 33px rgba(175, 181, 192, 0.18);

  padding: 6px 0;
`;

const MenuItem = styled.label`
  width: 100%;
  padding: 0 12px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme: { colors } }) => colors.greyScale[10]};
  }

  :not(:first-child) div {
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 0 12px;
  :not(:first-child) div {
    border-top: 1px solid ${({ theme: { colors } }) => colors.greyScale[30]};
  }
`;

const MenuWrapper = styled.div`
  display: flex;

  padding: 12px 0;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const StyledModal = styled(BaseModal)`
  max-width: 100%;
`;
