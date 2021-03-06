import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { Text, StarRating } from '@components';
import LocationIcon from '@assets/images/location.png';
import { getImage } from '@utils/uploadImageHelper';
import { BaseColor } from '@config';

import styles, {
  Card,
  ProfileImage,
  LeftCard,
  Tag,
  Image,
  TagText,
} from './style';

const DoctorCard = ({ data, handleCard }) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => handleCard({ ...data })}
    >
      <Card>
        <LeftCard>
          <ProfileImage
            source={{
              uri: getImage(_.get(data, 'profileImage')),
            }}
          />
        </LeftCard>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text bold numberOfLines={1} style={{ marginTop: 0 }}>
              {_.get(data, 'fullname')}
            </Text>
            <Text body2 bold>
              {/* $500 */}
            </Text>
          </View>

          {/* <View style={[styles.reviewView]}>
            <StarRating
              disabled={true}
              starSize={16}
              maxStars={5}
              rating={4}
              selectedStar={() => {}}
              fullStarColor={BaseColor.primaryColor}
            />
            <Text style={styles.reviewCount}>119</Text>
          </View> */}

          <View style={{ marginTop: 5, flexDirection: 'row' }}>
            {/* <Image source={LocationIcon} /> */}
            <Text
              caption1
              numberOfLines={1}
              style={{ flex: 1, color: '#A5A4A4' }}
            >
              {_.get(data.detail, 'department')}
            </Text>
          </View>

          <View style={{ marginTop: 8, flexDirection: 'row' }}>
            {/* <Image source={LocationIcon} /> */}
            <Text
              caption1
              numberOfLines={1}
              style={{ flex: 1, color: '#000000' }}
            >
              {_.get(data.detail, 'hospital')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
              marginTop: 10,
            }}
          >
            <Tag>
              <TagText>{_.get(data.detail, 'specialist')}</TagText>
            </Tag>
          </View>
        </View>
      </Card>
    </TouchableHighlight>
  );
};

export default DoctorCard;
