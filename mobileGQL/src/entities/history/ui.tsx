import { InitiateHistoryItemModel } from '__generated__/types';
import dayjs from 'dayjs';
import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import UserKat from 'shared/assets/images/userKat.png';
import { LikeIcon } from 'shared/assets/svgs';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';
import { colors } from 'shared/styles';

import styles from './ui.styles';

type HistoryCardProps = {
  item: InitiateHistoryItemModel;
};

const HistoryCard: FC<HistoryCardProps> = ({ item }) => {
  const { customer, lastActionAt, isMutual, isSuperLike } = item;
  const { t } = useTranslation();
  const isSimpleInitiate = !isMutual && !isSuperLike;
  const isShowIcon = isSimpleInitiate || isSuperLike;

  const onPress = () => {
    NavigationService.navigate(AppRoutes.ProfileScreen, {
      userId: customer?.id,
      isMutual,
    });
  };
  return (
    <TouchableOpacity onPress={onPress} disabled={isSimpleInitiate} style={styles.root} activeOpacity={0.5}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={isSimpleInitiate ? UserKat : { uri: customer?.avatar?.imageUrl }}
          />
          {isShowIcon && (
            <View style={styles.statusIcon}>
              {isSuperLike ? (
                <LikeIcon width={9} height={9} fill={colors.white} />
              ) : (
                isSimpleInitiate && <Text style={styles.questionText}>?</Text>
              )}
            </View>
          )}
        </View>
        <View>
          <Text style={styles.title}>{customer?.hiddenName}</Text>
          {isSimpleInitiate ? (
            <Text style={styles.text}>{t('entities.history.isInitiate')}</Text>
          ) : (
            <>
              {isMutual && <Text style={styles.text}>{t('entities.history.isMutual')}</Text>}
              {isSuperLike && <Text style={styles.text}>{t('entities.history.isSuperLike')}</Text>}
            </>
          )}
        </View>
      </View>
      <View>
        <Text style={styles.lastTimeText}>{dayjs(lastActionAt).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(HistoryCard);
