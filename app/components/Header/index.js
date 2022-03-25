import React, { Component } from 'react';
import { View, TouchableOpacity, StatusBar } from 'react-native';
import { Text } from '@components';
import styles from './styles';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

export default class Header extends Component {
  componentDidMount() {
    // StatusBar.setBarStyle("dark-content", true);
  }

  componentWillUnmount() {
    // StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const {
      style,
      styleLeft,
      styleCenter,
      styleRight,
      styleRightSecond,
      title,
      titleName,
      textStyle,
      subTitle,
      onPressLeft,
      onPressRight,
      onPressRightSecond,
    } = this.props;

    return (
      <LinearGradient
        colors={['#0DA36D', '#0A7C53', '#086C48']}
        style={styles.linearGradient}
      >
        <View style={[styles.contain, style]}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.contentLeft, styleLeft]}
              onPress={onPressLeft}
            >
              {this.props.renderLeft()}
            </TouchableOpacity>
          </View>
          <View style={[styles.contentCenter, styleCenter]}>
            {titleName != '' && <Text>{titleName}</Text>}
            <Text headline style={textStyle}>
              {title}
            </Text>
            {subTitle != '' && (
              <Text caption2 light>
                {subTitle}
              </Text>
            )}
          </View>
          <View style={styles.right}>
            <TouchableOpacity
              style={[styles.contentRightSecond, styleRightSecond]}
              onPress={onPressRightSecond}
            >
              {this.props.renderRightSecond()}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contentRight, styleRight]}
              onPress={onPressRight}
            >
              {this.props.renderRight()}
            </TouchableOpacity>
          </View>
          {/* {this.props.renderBottom()} */}
        </View>
      </LinearGradient>
    );
  }
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  titleName: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
};

Header.defaultProps = {
  style: {},
  textStyle: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  titleName: '',
  title: 'Title',
  subTitle: '',
  barStyle: 'dark-content',
};
