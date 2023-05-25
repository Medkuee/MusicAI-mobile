import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {UseGlobalStyles} from '../../../theme';

export const AppIntroContainer = ({
  title = '',
  desc = '',
  img = '',
  bg = '#FEE8E8',
}: any) => {
  const styles = UseGlobalStyles();

  return (
    <View style={styles.appIntroContainer}>
      <View style={[styles.appIntroImageContainer, {backgroundColor: bg}]}>
        <SafeAreaView />
        <Image style={styles.appIntroImage} source={img} />
      </View>
      <View style={styles.appIntroTextContainer}>
        <Text style={styles.appIntroTitle}>{title}</Text>
        <Text style={styles.appIntroDesc}>{desc}</Text>
      </View>
    </View>
  );
};
