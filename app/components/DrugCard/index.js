import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Header, SafeAreaView, Icon, Image } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import styles from './styles';

function DrugCard({
  drugs,
  image,
  taken,
  checkForgot,
  checkNotTime,
  openModal,
}) {
  // console.log('checkForgot');
  // console.log(checkForgot);
  // console.log('checkNotTime');
  // console.log(checkNotTime);
  // console.log('taken');
  // console.log(taken);

  return (
    <View style={styles.listContainer}>
      {drugs.map((item, index) => (
        <View key={item.id}>
          <View style={styles.itemContainer}>
            <View style={styles.leftContainer}>
              <Image style={styles.drugImage} source={image} />
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.leftValue,
                    taken ? { color: '#273240' } : null,
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.leftValue,
                    {
                      color: '#000',
                      fontSize: 14,
                      fontWeight: 'normal',
                      marginTop: 5,
                    },
                  ]}
                >
                  {item.drugUsage}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </View>
      ))}

      {!taken && checkForgot ? (
        <LinearGradient style={styles.take} colors={['#ff0000', '#b20e0e']}>
          <View
            underlayColor="grey"
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Text style={styles.buttonText}>คุณลืมทานยา</Text>
          </View>
        </LinearGradient>
      ) : checkNotTime ? (
        <LinearGradient style={styles.take} colors={['#6cc5fc', '#2099e5']}>
          <View
            underlayColor="grey"
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Text style={styles.buttonText}>ยังไม่ถึงเวลาทานยา</Text>
          </View>
        </LinearGradient>
      ) : taken ? (
        <LinearGradient style={styles.take} colors={['#273240', '#273240']}>
          <View
            underlayColor="grey"
            style={{ width: '100%', alignItems: 'center' }}
          >
            <Text style={styles.buttonText}>ทานยาแล้ว</Text>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient style={styles.take} colors={['#0AB678', '#0AB678']}>
          <TouchableOpacity
            underlayColor="grey"
            style={{ width: '100%', alignItems: 'center' }}
            disabled={false}
            onPress={openModal}
          >
            <Text style={styles.buttonText}>รับประทานยา</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
}

export default DrugCard;
