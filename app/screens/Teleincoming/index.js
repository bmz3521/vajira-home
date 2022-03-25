/**
 *
 * InComingCallScreen
 *
 */

import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableHighlight,
  Vibration,
  BackHandler,
} from 'react-native';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import InCallManager from "react-native-incall-manager";
import moment from 'moment';

import styles from './styles';
import dataProvider from '../../utils/dataProvider';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';

const backgroundImage = require('../../assets/images/blur_bg.jpg');
const defaultAvatar = require('../../assets/images/default_avatar.jpg');

class InComingCallScreen extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  state = {
    fullname: '',
    duration: '',
    symptom: '',
    profileImage: '',
    description: '',
    roomName: '',
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.navigation.state.params) {
      return {
        ...nextProps.navigation.state.params.data,
      };
    }
    return null;
  }

  //   startVibrate = () => {
  //     const PATTERN = [250, 1000, 500];
  //     Vibration.vibrate(PATTERN, true);
  //   };

  handleAnswer = async () => {
    const { roomName, profileImage, fullname } = this.state;
    const { navigation } = this.props;
    const {
      consultCaseType,
      consultCaseId,
      patientConsultId,
    } = navigation.state.params.data;

    await Vibration.cancel();
    // InCallManager.stopRingtone();
    const provider = dataProvider('/Users/me/Logs');
    await provider.create({
      namespace: 'Payment',
      title: 'Receive Calling',
      data: {
        receiveAt: moment(),
        info: this.state,
      },
    });

    dataProvider().request({
      method: 'patch',
      url: `/ConsultCases/${consultCaseId}`,
      data: {
        isAnswered: true,
      },
    });

    if (consultCaseType === 'video')
      navigation.navigate('VideoCall', {
        roomName,
        refUser: { profileImage, fullname, id: patientConsultId },
        consultCase: { id: consultCaseId },
      });
    else if (consultCaseType === 'voice')
      navigation.navigate('VoiceCall', {
        roomName,
        refUser: { profileImage, fullname, id: patientConsultId },
        consultCase: { id: consultCaseId },
      });
  };

  handleReject = async () => {
    const { navigation } = this.props;
    await Vibration.cancel();
    // InCallManager.stopRingtone();
    navigation.navigate('AuthLoading');
  };

  handleBack = () => {
    return true;
  };

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    // this.startVibrate();
    // InCallManager.turnScreenOn();
    // InCallManager.startRingtone("_DEFAULT_");
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  };

  render() {
    const {
      fullname,
      duration,
      symptom,
      description,
      profileImage,
    } = this.state;
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} />
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image
              source={profileImage ? { uri: profileImage } : defaultAvatar}
              style={styles.avatar}
            />
            <Text style={styles.titleText}>{fullname}John Doe</Text>
          </View>
          <View style={styles.subTitleView}>
            <Text style={styles.subTitleHead}>Symptom:</Text>
            <Text style={styles.subTitleBold}>{symptom}Headache</Text>
            <Text style={styles.subTitleText}>
              {description}Lorem ipsum is simply dummy text of the printing and
              typesetting industry
            </Text>
          </View>
          <View style={styles.durationView}>
            <Text style={styles.subTitleHead}>Duration:</Text>
            <Text style={styles.subTitleBold}>{duration} Days</Text>
          </View>
          <View style={styles.incomingView}>
            <Text style={styles.callText}>Incoming call...</Text>
            <DotIndicator color="#d9d9d9" size={10} count={3} />
          </View>
          <View style={styles.btnView}>
            <View style={styles.subTitleView}>
              <TouchableHighlight
                style={{ backgroundColor: '#009624', ...styles.btn }}
                onPress={this.handleAnswer}
              >
                <Icon name="call" size={styles.iconSize} color="white" />
              </TouchableHighlight>
            </View>
            <View style={styles.subTitleView}>
              <TouchableHighlight
                style={{ backgroundColor: '#dd2c00', ...styles.btn }}
                onPress={this.handleReject}
              >
                <Icon name="call-end" size={styles.iconSize} color="white" />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

InComingCallScreen.propTypes = {};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(InComingCallScreen);
