/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, SectionList} from 'react-native';
import {useTheme} from 'native-base';
import {UseGlobalStyles} from '../../../../../theme';
import AppIcon from '../../../../../components/Icon';
import Empty from '../../../../../components/Empty';

const NotificationPage = () => {
  const styles = UseGlobalStyles();
  const {colors}: any = useTheme();

  const iconStyles = (item: any) => [
    styles.notificationIconContainer,
    item.type === 'success' && styles.notificationIconSuccess,
    item.type === 'error' && styles.notificationIconError,
    item.type === 'newFeature' && styles.notificationIconNewFeature,
  ];

  const icons = (item: any) =>
    (item.type === 'success' && 'check-circle') ||
    (item.type === 'error' && 'times-circle') ||
    (item.type === 'newFeature' && 'bell');

  return (
    <View style={styles.mainPageContainer}>
      <SectionList
        stickySectionHeadersEnabled={false}
        style={{flex: 1}}
        contentContainerStyle={styles.bottomModalBody}
        ListEmptyComponent={<Empty large />}
        sections={[]}
        renderItem={({item}) => (
          <View style={styles.notificationCard}>
            <View style={iconStyles(item)}>
              <AppIcon
                size={22}
                color={colors.whiteDark}
                name={icons(item) as string}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationDesc}>{item.desc}</Text>
            </View>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.notificationListTitle}>{title}</Text>
        )}
        keyExtractor={index => index.toString()}
      />
    </View>
  );
};

export default NotificationPage;
