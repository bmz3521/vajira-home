import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import UserAvatar from 'react-native-user-avatar';
import { Image, Icon, Text } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";

export default class ProfileDetail extends Component {
  render() {
    const {
      style,
      image,
      styleLeft,
      styleThumb,
      styleRight,
      onPress,
      textFirst,
      point,
      textSecond,
      textThird,
      icon
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.contain, style, {}]}
        onPress={onPress}
        activeOpacity={1}
      >
        <View
          style={[
            styles.contentLeft,
            styleLeft,
            { flexDirection: "column", alignItems: "center" }
          ]}
        >
          {/* <Image
            style={[{ justifyContent: "center" }]}
            source={image}
            style={[styles.thumb, styleThumb, { width: 60, height: 60 }]}
          /> */}
          <UserAvatar size="60" name={textFirst} src={image} style={[{ justifyContent: "center" }, styles.thumb, styleThumb]} />
          <View>
            {/* <View style={styles.point}>
                            <Text overline whiteColor semibold>
                                {point}
                            </Text>
                        </View> */}
          </View>
          <View>
            <Text
              headline
              semibold
              numberOfLines={1}
              style={{
                marginTop: 5,
                paddingRight: 10,
                alignItems: "center"
              }}
            >
              {textFirst}
            </Text>
          

            <Text
              body2
              style={{
                marginTop: 5,
                paddingRight: 10
              }}
              numberOfLines={1}
            >
              {textSecond}
            </Text>
            <Text footnote grayColor numberOfLines={1}>
              {textThird}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  image: PropTypes.node,
  textFirst: PropTypes.string,
  point: PropTypes.string,
  textSecond: PropTypes.string,
  textThird: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleThumb: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.bool,
  onPress: PropTypes.func
};

ProfileDetail.defaultProps = {
  image: "",
  textFirst: "",
  textSecond: "",
  icon: true,
  point: "",
  style: {},
  styleLeft: {},
  styleThumb: {},
  styleRight: {},
  onPress: () => {}
};
