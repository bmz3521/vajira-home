import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { Text, Image, Icon } from '@components';
import { BaseColor } from '@config';
import styles from './styles';

function DiaryItem(props) {
  const {
    style,
    avatar,
    name,
    date,
    image,
    content,
    treatments,
    likes,
    comments,
    viewed,
    onPress,
  } = props;

  return (
    <TouchableOpacity style={[styles.contain, style]} onPress={onPress}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View style={styles.contentLeft}>
          <UserAvatar size="40" name={"name"} src={avatar} style={styles.thumb} />
          <View style={styles.contentHeadline}>
            <Text headline semibold numberOfLines={1}>
              {name}
            </Text>
            <View style={styles.contentDate}>
              <Text caption2 grayColor numberOfLines={1}>
                {date}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text subhead semibold>
          {treatments}
        </Text>
        {!!image && (
          <Image style={styles.contentImage} source={{ uri: image }} />
        )}
        <Text body2 style={{ marginTop: 10 }}>
          {content}
        </Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <Text grayColor>{viewed} viewed</Text>
        </View>
        <View style={styles.footerRight}>
          <View style={styles.footerIconGroup}>
            <Icon
              name="comment"
              size={20}
              color={BaseColor.grayColor}
              style={styles.footerIcon}
            />
            <Text grayColor>{comments}</Text>
          </View>
          <View style={styles.footerIconGroup}>
            <Icon
              name="heart"
              size={20}
              color={BaseColor.grayColor}
              style={styles.footerIcon}
            />
            <Text grayColor>{likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

DiaryItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  avatar: PropTypes.node.isRequired,
  name: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
  treatments: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
  viewed: PropTypes.number,
  onPress: PropTypes.function,
};

DiaryItem.defaultProps = {
  style: {},
  avatar: null,
  name: '',
  date: '',
  image: null,
  content: '',
  treatments: '',
  likes: 0,
  comments: 0,
  viewed: 0,
  onPress: () => {},
};

export default DiaryItem;
