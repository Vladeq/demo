import { PositionType } from 'features/location/model/positionVar';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { Users } from 'shared/assets/svgs';
import { CustomerGetByIds } from 'shared/qraphql/mututions/__generated__/customerGetByIds.query';
import { ArrayElem } from 'shared/types';
import { UserCard } from 'widgets';

import styles from './users-list-tab.style';

type UsersListTabProps = {
  users?: CustomerGetByIds['customerGetByIds'];
  position: PositionType | null;
  onRefresh: () => void;
  isRefresh: boolean;
};

const renderItem = ({
  item,
  index,
}: {
  item: ArrayElem<CustomerGetByIds['customerGetByIds']>;
  index: number;
}) => {
  return (
    <View key={item.id} style={[styles.user, index % 2 === 0 && styles.evenUserCard]}>
      <UserCard.UI customerId={item.id} avatarUrl={item.avatar?.imageUrl} />
    </View>
  );
};
const keyExtractor = (item: ArrayElem<CustomerGetByIds['customerGetByIds']>) => item.id;

const UsersListTab: FC<UsersListTabProps> = ({ users, position, onRefresh, isRefresh }) => {
  const { t } = useTranslation();

  if (!position) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{t('screens.Home.UserListTab.title')}</Text>

      {users?.length ? (
        <FlatList
          numColumns={2}
          contentContainerStyle={styles.usersContainer}
          data={users}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />}
        />
      ) : (
        <View style={styles.emptyUsersContainer}>
          <Users />
          <Text style={styles.emptyUsersText}>{t('screens.Home.UserListTab.emptyUsersText')}</Text>
        </View>
      )}
    </View>
  );
};

export default UsersListTab;
