import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Image, Text } from '@components';
import styles from './styles';
import { Images } from '@config/images';

function ClinicPackageTabItem(props) {
  const {
    image,
    title,
    subtitle,
    clinic,
    discountPrice,
    originalPrice,
    onPress,
  } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.leftView}>
          <Image
            style={styles.image}
            source={
              !image || image === 'img' ? Images.trending1 : { uri: image }
            }
          />
        </View>
        <View style={styles.rightView}>
          <Text body1 semibold>
            [{title}]
          </Text>
          <Text body1 semibold>
            {subtitle}
          </Text>
          <Text body1 grayColor style={{ marginTop: 5 }}>
            {clinic}
          </Text>
          <View style={styles.price}>
            <Text title2 bold blueColor>
              {discountPrice}
            </Text>
            <Text
              caption
              thin
              grayColor
              strike
              style={{ marginLeft: 5, marginBottom: 5 }}
            >
              {originalPrice}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ClinicPackageTabItem;
