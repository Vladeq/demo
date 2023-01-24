import React, { FC } from 'react';
import AppRoutes from 'shared/routes';
import { Example } from 'shared/ui';
import { DefaultLayout } from 'widgets';

const links = [
  { text: 'to Other UI', link: AppRoutes.UIOtherScreen },
  { text: 'to inputs Screen', link: AppRoutes.InputsScreen },
  { text: 'to Icon Screen', link: AppRoutes.IconsScreen },
  { text: 'to Buttons Screen', link: AppRoutes.ButtonsScreen },
];

const UIKitScreen: FC = () => {
  return (
    <DefaultLayout>
      <Example text="UI Kit" links={links} />
    </DefaultLayout>
  );
};

export default UIKitScreen;
