import { useNavigation } from '@react-navigation/native';
import React, { FC, ReactNode, useMemo } from 'react';
import { Text, View } from 'react-native';
import AppRoutes from 'shared/routes';

import SimpleButton from '../AppButton/SimpleButton';
import styles from './example.styles';

type ExampleProps = {
  text: string;
  children?: ReactNode;
  links?: {
    text: string;
    link: AppRoutes;
  }[];
};

const Example: FC<ExampleProps> = ({ text, links, children }) => {
  const navigation = useNavigation<any>();

  const renderLinks = useMemo(() => {
    return links?.map((item, index) => (
      <SimpleButton variant="text" key={index} onPress={() => navigation.navigate(item.link)}>
        <Text style={styles.link}>{item.text}</Text>
      </SimpleButton>
    ));
  }, [links, navigation]);

  return (
    <View style={styles.root}>
      <Text style={styles.typography}>{text}</Text>
      {children}
      {renderLinks}
    </View>
  );
};

export default Example;
