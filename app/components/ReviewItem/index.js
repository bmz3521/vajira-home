import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { BaseColor } from '@config';
import { Text, StarRating } from '@components';
import styles from './styles';

export default class ReviewItem extends Component {
  render() {
    const { style, avatar, name, rate, date, comment, treatments } = this.props;
    return (
      <View style={[styles.contain, style]}>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <View style={styles.contentLeft}>
            <UserAvatar
              size="48"
              name={name}
              src={avatar}
              style={styles.thumb}
            />
            <View style={styles.contentHeadline}>
              <Text headline semibold numberOfLines={1}>
                {name}
              </Text>
              <View>
                <Text caption2 grayColor numberOfLines={1}>
                  {date}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentRate}>
          <StarRating
            buttonStyle={{ marginHorizontal: 1 }}
            disabled={true}
            starSize={14}
            maxStars={5}
            rating={rate}
            selectedStar={() => {}}
            fullStarColor={BaseColor.blueColor}
          />
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text body1 semibold style={{ marginRight: 5 }}>
              Treatment:
            </Text>
            <Text body1>{treatments}</Text>
          </View>
          <Text
            body1
            numberOfLines={30}
            style={{ marginTop: 10, lineHeight: 25 }}
          >
            {comment}
          </Text>
        </View>
      </View>
    );
  }
}

ReviewItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string,
  rate: PropTypes.number,
  date: PropTypes.string,
  comment: PropTypes.string,
  treatments: PropTypes.string,
};

ReviewItem.defaultProps = {
  style: {},
  avatar: null,
  name: '',
  rate: 0,
  date: '',
  comment: '',
  treatments: '',
};
