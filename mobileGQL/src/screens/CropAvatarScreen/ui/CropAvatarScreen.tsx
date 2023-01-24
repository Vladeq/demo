import { CropAvatarScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Example } from 'shared/ui';
import { DefaultLayout } from 'widgets';

const CropAvatarScreen: FC<CropAvatarScreenProps> = ({ navigation }) => {
  return (
    <DefaultLayout>
      <Example text="CropAvatarScreen">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>go Back</Text>
        </TouchableOpacity>
      </Example>
    </DefaultLayout>
  );
};

export default CropAvatarScreen;
