import { SwitchHomeTabs } from 'features';
import { ButtonsScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ArrowIcon, DeleteIcon, EditIcon } from 'shared/assets/svgs';
import { AppButton, AppSwitch } from 'shared/ui';
import { DefaultLayout } from 'widgets';

const ButtonsScreen: FC<ButtonsScreenProps> = () => {
  const [activeToggle, setActiveToggle] = useState(false);

  const { activeTab, onToggleTab } = SwitchHomeTabs.useSwitchHomeTabs();

  return (
    <DefaultLayout customStyles={{ flex: 1, backgroundColor: '#ebe6e6' }}>
      <ScrollView>
        <AppButton.ButtonGradient onPress={() => null}>Text</AppButton.ButtonGradient>
        <AppButton.ButtonGradient onPress={() => null} style={{ width: 116 }}>
          Text
        </AppButton.ButtonGradient>
        <AppButton.ButtonGradient onPress={() => null} isDisabled>
          Text
        </AppButton.ButtonGradient>
        <AppButton.ButtonGradient onPress={() => null} isLoading>
          Text
        </AppButton.ButtonGradient>

        <AppButton.SimpleButton onPress={() => null}>Text</AppButton.SimpleButton>
        <AppButton.SimpleButton onPress={() => null} style={{ width: 116 }}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton isDisabled onPress={() => null}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton isLoading onPress={() => null}>
          Text
        </AppButton.SimpleButton>

        <AppButton.SimpleButton variant="delete" onPress={() => null}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="delete" style={{ width: 116 }} onPress={() => null}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="delete" isDisabled onPress={() => null}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="delete" isLoading onPress={() => null}>
          Text
        </AppButton.SimpleButton>

        <AppButton.SimpleButton variant="text" onPress={() => null}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="text" style={{ width: 116 }} onPress={() => null}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="text" isDisabled onPress={() => null}>
          Text
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="text" isLoading onPress={() => null}>
          Text
        </AppButton.SimpleButton>

        <View style={{ alignItems: 'center' }}>
          <AppButton.IconButton Icon={EditIcon} onPress={() => null} />
          <AppButton.IconButton Icon={EditIcon} isLoading onPress={() => null} />
          <AppButton.IconButton Icon={EditIcon} isDisabled onPress={() => null} />
          <AppButton.IconButton Icon={DeleteIcon} variant="secondary" onPress={() => null} />
          <AppButton.IconButton Icon={DeleteIcon} variant="secondary" isLoading onPress={() => null} />
          <AppButton.IconButton Icon={DeleteIcon} variant="secondary" isDisabled onPress={() => null} />

          <AppButton.SquareButton Icon={ArrowIcon} onPress={() => null} />

          <AppSwitch isOn={activeToggle} onToggle={() => setActiveToggle(!activeToggle)} />

          <SwitchHomeTabs.HomeTabs activeTab={activeTab} onToggleTab={onToggleTab} />
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default ButtonsScreen;
