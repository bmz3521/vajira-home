import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { BaseColor } from '@config';
import PropTypes from 'prop-types';
import { Text } from '@components';
import styles from './styles';

export default class Button extends Component {
  render() {
    const {
      style,
      styleText,
      noOfLines,
      icon,
      outline,
      full,
      round,
      flat,
      loading,
      disabled,
      ...rest
    } = this.props;

    return (
      <TouchableOpacity
        {...rest}
        style={StyleSheet.flatten([
          styles.default,
          outline && styles.outline,
          full && styles.full,
          round && styles.round,
          flat && styles.flat,
          style,
        ])}
        disabled={disabled}
        activeOpacity={0.9}
      >
        {icon ? icon : null}
        <Text
          style={StyleSheet.flatten([
            styles.textDefault,
            outline && styles.textOutline,
            styleText,
          ])}
          numberOfLines={noOfLines ? noOfLines : 1}
        >
          {this.props.children || 'Button'}
        </Text>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={outline ? BaseColor.primaryColor : BaseColor.whiteColor}
            style={{ paddingLeft: 5 }}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  round: PropTypes.bool,
  flat: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  style: {},
  icon: null,
  outline: false,
  full: false,
  round: false,
  flat: false,
  loading: false,
  disabled: false,
};
