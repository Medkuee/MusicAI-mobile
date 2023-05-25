/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {View} from 'react-native';
import {Image} from 'react-native';
import {images} from '../../../../theme/variables';
const GuestFavoriteGuestPage = ({navigation}: any) => {
  return (
    <ScrollView style={{backgroundColor: '#fff'}} bounces={true}>
      <SafeAreaView>
        <View
          style={{
            backgroundColor: '#132A6B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
            paddingBottom: 40,
          }}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '500'}}>
            Favourite
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            marginTop: -25,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            display: 'flex',
            alignItems: 'center',
            rowGap: 10,
            justifyContent: 'center',
            height: '100%',
          }}>
          <View>
            <Image source={images.fav} />
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#6393C3',
              fontWeight: '700',
              marginTop: 20,
            }}>
            Empty
          </Text>
          <Text style={{fontSize: 16, color: '#6393C3', marginBottom: 25}}>
            Your favourite music will be listed here
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 3,
              borderStyle: 'solid',
              borderRadius: 15,
              borderColor: '#F39191',
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: '#F39191', fontWeight: '800'}}>
              Add favourite
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default GuestFavoriteGuestPage;
