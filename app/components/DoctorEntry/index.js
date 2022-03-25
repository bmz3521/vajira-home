import React from 'react';
import { View } from 'react-native';
import { Text, Image } from '@components';
import { BaseColor, Images } from '@config';
import styles from './styles';

function DoctorEntry(props) {
  const { style, imgProfile, firstName, lastName } = props;
  return (
    <View
      style={[
        { flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10 },
        style,
      ]}
    >
      <View
        style={{
          backgroundColor: BaseColor.whiteColor,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: BaseColor.grayColor,
          overflow: 'hidden',
          shadowColor: BaseColor.grayColor,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View>
          <Image
            source={
              !imgProfile || imgProfile === 'img'
                ? Images.profile1
                : { uri: imgProfile }
            }
            style={{
              height: 140,
              width: 140,
            }}
          />
        </View>
        <View
          style={{
            width: 140,
            height: 60,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>
            {firstName} {lastName}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default DoctorEntry;
