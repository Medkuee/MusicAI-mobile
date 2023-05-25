import React from 'react';
import {View, Text, Image} from 'react-native';
import {UseGlobalStyles} from '../theme';
import {images} from '../theme/variables';

type InputProps = {
  large?: boolean;
  desc?: string;
};

const Empty = ({large = false, desc = 'Хоосон байна...'}: InputProps) => {
  const styles = UseGlobalStyles();

  const ImageStyle = [styles.noDataImage, large && styles.noDataImageLarge];
  const TextStyle = [styles.noDataText, large && styles.noDataTextLarge];

  return (
    <View style={styles.noDataContainer}>
      <Image source={images.noData} style={ImageStyle} />
      <Text style={TextStyle}>{desc}</Text>
    </View>
  );
};

export default Empty;
