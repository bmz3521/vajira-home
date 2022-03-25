import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { Icon, Image } from '@components';
import { Images } from '@config';
import database from '@react-native-firebase/database';

function LocalVieoParticipant({
  chatScreen,
  _onFlipButtonPress,
  setChatScreen,
  setVisibleNote,
  _onMuteButtonPress,
  isAudioEnabled,
  _onEndButtonPress,
  children,
  setOnFlip,
  onFlip,
}) {
  return (
    <View
      style={[
        Styles.optionsContainer,
        {
          elevation: chatScreen ? -1 : 1,
          zIndex: chatScreen ? -1 : 1,
        },
      ]}
    >
      <TouchableOpacity
        style={Styles.optionButton}
        onPress={() => setOnFlip(!onFlip)}
      >
        <View style={Styles.circleSmall}>
          <Text style={Styles.greenText}>
            {onFlip ? 'มุมกระจก' : 'มุมภาพจริง'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.optionButton}
        onPress={_onFlipButtonPress}
      >
        <View style={Styles.circleSmall}>
          <Icon name="camera" style={Styles.greenIcon} />
          <Text style={Styles.greenText}>กล้อง</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.optionButton}
        onPress={() => setChatScreen(true)}
      >
        <View style={Styles.circleSmall}>
          <Icon name="comment-dots" style={Styles.greenIcon} />
          <Text style={Styles.greenText}>ข้อความ</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.optionButton}
        onPress={() => setVisibleNote(true)}
      >
        <View style={Styles.circleSmall}>
          <Icon name="book" style={Styles.greenIcon} />
          <Text style={Styles.greenText}>Note</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.optionButton}
        onPress={_onMuteButtonPress}
      >
        {isAudioEnabled ? (
          <View style={Styles.circleSmall}>
            <Icon name="microphone" style={Styles.greenIcon} />
            <Text style={Styles.greenText}>ไมค์</Text>
          </View>
        ) : (
          <View style={Styles.circleSmall}>
            <Icon name="microphone-slash" style={Styles.greenIcon} />
            <Text style={Styles.greenText}>ไมค์</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={Styles.optionButton} onPress={_onEndButtonPress}>
        <View style={Styles.circleSmall}>
          <Image style={Styles.greenIconRotate} source={Images.phone_end} />
          <Text style={Styles.greenText}>วางสาย</Text>
        </View>
      </TouchableOpacity>
      {children}
      <View />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  optionChat: {
    position: 'absolute',
    paddingHorizontal: 10,
    right: 0,
    top: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {},
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  callWrapper: {
    flexGrow: 1,
  },
  Small: {
    backgroundColor: '#00000050',
    width: 70,
    height: 70,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteGrid: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remoteVideo: {
    width: window.width,
    height: window.height / 3,
  },
  remoteVideoVertical: {
    width: window.width,
    height: window.height,
  },
  circleSmall: {
    backgroundColor: '#17B87B',
    width: 70,
    height: 70,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.84,

    elevation: 12,
  },
  greenIcon: {
    color: '#fff',
    fontSize: 22,
  },
  greenIconRotate: {
    width: 40,
    height: 30,
  },
  greenText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  switchVertical: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 20,
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    position: 'absolute',
    right: 10,
    bottom: 200,
    borderRadius: 2,
    borderColor: '#4e4e4e',
    transform: [{ scaleX: -1 }],
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    // backgroundColor: "blue",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocalVieoParticipant;
