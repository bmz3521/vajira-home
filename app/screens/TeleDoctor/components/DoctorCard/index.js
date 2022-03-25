import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { Text, StarRating } from '@components';
import LocationIcon from '@assets/images/location.png';
import { getImage } from '@utils/uploadImageHelper';
import { BaseColor } from '@config';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native';

import styles, {
  Card,
  ProfileImage,
  LeftCard,
  RightCard,
  Tag,
  Image,
  TagText,
  ProfileText,
} from './style';

const DoctorCard = ({ data, handleCard, status }) => {
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => handleCard({ ...data })}
    >
      <Card>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.iconTopParent4}
          onPress={() => handleCard({ ...data })}
        >
          <LeftCard>
            <ProfileImage
              style={styles.shadow}
              source={{
                uri: getImage(_.get(data, 'profileImage')),
              }}
            />
          </LeftCard>
          <View style={{ flex: 3 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text
                bold
                numberOfLines={1}
                style={{ marginTop: 0, color: '#0A5C3E' }}
              >
                {_.get(data, 'fullname')}
              </Text>
              <Text body2 bold>
                {/* $500 */}
              </Text>
            </View>

            {/*<View style={[styles.reviewView]}>
            <StarRating
              disabled={true}
              starSize={16}
              maxStars={5}
              rating={4}
              selectedStar={() => {}}
              fullStarColor={BaseColor.primaryColor}
            />
            <Text style={styles.reviewCount}>119</Text>
          </View>*/}

            <View style={{ marginTop: 8, flexDirection: 'row' }}>
              {/* <Image source={LocationIcon} /> */}
              <Text
                caption1
                numberOfLines={1}
                style={{ flex: 1, color: '#7B7B7B' }}
              >
                คณะแพทย์ศาสตร์
                {_.get(data.detail, 'hospital')}
              </Text>
            </View>

            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              {/* <Image source={LocationIcon} /> */}
              {status == 'online' ? (
                <View>
                  <Text style={styles.textOnline}>{status}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.textOffline}>{status}</Text>
                </View>
              )}
              <Text
                caption1
                numberOfLines={1}
                style={{ flex: 1, color: '#7B7B7B' }}
              >
                {_.get(data.detail, 'specialist')}
              </Text>
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
                marginTop: 10,
              }}
            >
              <Tag>
                <TagText>{_.get(data.detail, 'department')}</TagText>
              </Tag>
            </View> */}
          </View>
          <RightCard>
            <Text
              caption1
              numberOfLines={1}
              style={{
                color: '#0A5C3E',
                fontSize: 30,
              }}
            >
              {'>'}
            </Text>
          </RightCard>
        </TouchableOpacity>
      </Card>
    </TouchableHighlight>
  );
};

export default DoctorCard;
