import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, Image, StarRating } from '@components';
import { BaseColor } from '@config';
import PropTypes from 'prop-types';
import styles from './styles';
export default class DoctorItem extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Display Doctor item as grid
   */
  renderGrid() {
    const { style, imgProfile, firstName, lastName, onPress } = this.props;
    return (
      <View style={[styles.girdContent, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
          <Image
            source={imgProfile}
            style={styles.girdImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text headline semibold style={{ marginTop: 5 }}>
          {firstName} {lastName}
        </Text>
      </View>
    );
  }

  render() {
    return this.renderGrid();
  }
}

DoctorItem.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imgProfile: PropTypes.node.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  onPress: PropTypes.func,
};

DoctorItem.defaultProps = {
  style: {},
  imgProfile: '',
  firstName: '',
  lastName: '',
  onPress: () => {},
};
