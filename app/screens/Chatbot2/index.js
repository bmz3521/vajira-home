import React, { Component } from 'react';
import {
  View,
  Linking,
  ActivityIndicator,
  ImageBackground,
  Image,
  Dimensions,
  LogBox,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lightbox from 'react-native-lightbox';

import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import CustomQuickReplies from '../Chatbot1/CustomQuickReplies';
import { elbow } from './elbow/elbow';
import { shoulder } from './shoulder/shoulder';
import { sport } from './sports/sport';
import { handAndWrist } from './hand_wrist/handWrist';
import { orthoBone } from './ortho/ortho';
import { childOrtho } from './child/child';
import { feetAnkles } from './ankles/feetAnkles';
import { backache } from './backache/backache';
import { neckPain } from './neckpain/neckpain';
import { oncology } from './oncology/oncology';
import { kneepain } from './kneepain/kneepain';
import {
  UriLink,
  DepartmentCarousel,
  DoctorCarousel,
} from './doctors/bubble4Doctors';
import { getDoctors, getTables, getCVs } from './doctors/doctors';

import { Elbow } from './elbow/bubbleGenerator';
import { Shoulder } from './shoulder/bubbleGenerator';
import { Sport } from './sports/bubbleGenerator';
import { Backache } from './backache/bubleGenerator';
const botAvatar = require('../../assets/images/vajira-logo.png');

export const departmentList = [
  'back_doctors',
  'shoulder_doctors',
  'wrist_doctors',
  'hip_doctors',
  'foot_doctors',
  'bone_doctors',
  'sport_doctors',
  'children_doctors',
  'tumor_doctors',
];

import {
  saveMessage,
  mainMenu,
  loadPreviousData,
  loadFallback,
  BOT_USER,
} from './firebaseHub';
import { normalText } from '../Chatbot1/diabetesBot';
import { backPressHandler } from './utils';
import BackButton from './components/BackButton';

const loadingImage = require('../Chatbot1/images/loading-screen.jpg');

export class Chatbot2 extends Component {
  state = {
    messages: [],
    id: 1,
    name: '',
    firstMount: true,
    loading: true,
  };

  async componentDidMount() {
    LogBox.ignoreLogs(['Animated']);
    const userId = this.props.user.data.id.toString();
    const userName = this.props.user.data.userInformation.firstname;

    const messages = await loadPreviousData(userId, userName);

    this.setState({
      id: this.props.user.data.id,
      name: this.props.user.data.userInformation.firstname,
      messages,
      loading: false,
    });
  }

  async saveMessgeHandler(payload) {
    await saveMessage(payload, this.state.id);
  }

  renderQuickReplies = props => {
    return <CustomQuickReplies data={props} />;
  };

  addMessage(payload) {
    const currentLength = this.state.messages.length + 1;
    payload._id = currentLength;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, payload),
    }));
  }

  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    const value = messages[0].text;
    await this.saveMessgeHandler(
      normalText(value, this.state.id, this.state.name),
    );

    this.sendBotResponse(value);
  }

  async onQuickReply(quickReply) {
    let regText = quickReply[0].title.replace(/(\n)/g, '');
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, {
        _id: this.state.messages.length + 1,
        text: regText,
        createdAt: new Date().getTime(),
        user: {
          name: this.state.name,
          _id: this.state.id,
        },
      }),
    }));

    const value = quickReply[0].value;
    await this.saveMessgeHandler(
      normalText(regText, this.state.id, this.state.name),
    );
    this.sendBotResponse(value);
  }

  async sendBotResponse(text) {
    let msg;
    const currentLength = this.state.messages.length + 1;
    const name = this.state.name;

    if (text === 'main') {
      msg = mainMenu(currentLength);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'elbow') {
      msg = await elbow(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'shoulder') {
      msg = await shoulder(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'sports') {
      msg = sport(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'kneepain') {
      msg = await kneepain(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'hand') {
      msg = await handAndWrist(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'childs') {
      msg = childOrtho(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'neckpain') {
      msg = neckPain(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'oncology') {
      msg = await oncology(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (
      text.split('-')[0] === 'fracture' ||
      text.split('-')[0] === 'osteoporosis'
    ) {
      msg = orthoBone(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'backache') {
      msg = await backache(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (text.split('-')[0] === 'feet') {
      msg = await feetAnkles(currentLength, text, name);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else if (departmentList.includes(text)) {
      msg = await getDoctors(currentLength, text);
      await saveMessage(
        { text, createdAt: new Date().getTime(), user: BOT_USER },
        this.state.id,
      );
    } else {
      msg = loadFallback(currentLength);
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
      onBackPress: text,
    }));
  }

  async getDoctorDetails(item) {
    if (item == 'main' || item == 'elbow-department') {
      this.sendBotResponse(item);
      return;
    }

    const currentLength = this.state.messages.length + 1;
    let msg;
    let keyword = item[0] || null;
    let value = item[1] || null;
    let type = item[2] || null;

    if (type == 'table') {
      msg = await getTables(currentLength, keyword, value);
    } else if (type == 'cv') {
      msg = await getCVs(currentLength, keyword, value);
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  renderBubble = props => {
    const { navigation } = this.props;
    if (props.currentMessage.isURI) {
      return (
        <UriLink
          onPressLine={() => Linking.openURL(props.currentMessage.line)}
          onPressMe={item => this.sendBotResponse(item)}
          image={props.currentMessage.image}
          message={props.currentMessage.text}
        />
      );
    } else if (props.currentMessage.isDepartmentCarousel) {
      return (
        <DepartmentCarousel
          onPressMe={item => this.sendBotResponse(item)}
          data={props.currentMessage.data}
          message={props.currentMessage.message}
        />
      );
    } else if (props.currentMessage.isDoctorCarousel) {
      return (
        <DoctorCarousel
          onPressMe={item => this.getDoctorDetails(item)}
          navigation={navigation}
          data={props.currentMessage.data}
          message={props.currentMessage.text}
        />
      );
    } else if (props.currentMessage.isElbow) {
      return (
        <Elbow
          onBack={text => this.sendBotResponse(backPressHandler(text))}
          onPressMe={item => this.sendBotResponse(item)}
          item={props.currentMessage}
        />
      );
    } else if (props.currentMessage.isShoulder) {
      return (
        <Shoulder
          onPressMe={item => this.sendBotResponse(item)}
          item={props.currentMessage}
        />
      );
    } else if (props.currentMessage.isSport) {
      return (
        <Sport
          onBack={text => this.sendBotResponse(backPressHandler(text))}
          saveMessage={async text => {
            const regText = text.replace(/(\n)/g, '');
            this.addMessage(
              normalText(regText, this.state.id, this.state.name),
            );
            await this.saveMessgeHandler(
              normalText(regText, this.state.id, this.state.name),
              this.state.id,
            );
          }}
          onPressMe={item => this.sendBotResponse(item)}
          item={props.currentMessage}
        />
      );
    } else if (props.currentMessage.isHand) {
      return <View></View>;
    } else if (props.currentMessage.isBackache) {
      return (
        <Backache
          onBack={text => this.sendBotResponse(backPressHandler(text))}
          onPressMe={item => this.sendBotResponse(item)}
          item={props.currentMessage}
        />
      );
    } else if (props.currentMessage.isGoBack) {
      return (
        <BackButton
          message={props}
          onPressMe={item => this.sendBotResponse(item)}
        />
      );
    }

    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#030e16',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#F0F2F5',
          },
          right: {
            backgroundColor: '#98f74a',
          },
        }}
      />
    );
  };

  renderMessageImage = props => {
    return (
      <View>
        <Lightbox
          activeProps={{
            style: {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            },
            resizeMode: 'contain',
          }}
        >
          <Image
            style={{
              width: 280,
              height: 240,
              borderRadius: 13,
              margin: 3,
              resizeMode: 'cover',
            }}
            source={{ uri: props.currentMessage.image }}
          />
        </Lightbox>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="Orthopedics - โรคกระดูก"
          textStyle={{
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
          renderLeft={() => {
            return <Icon name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}
        />
        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <View style={{ marginTop: 60 }}>
              <ActivityIndicator size="large" color="0A7C53" />
            </View>
            <ImageBackground
              source={loadingImage}
              style={{ zIndex: -1, width: '100%', height: '100%' }}
            ></ImageBackground>
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.onSend(messages)}
              onQuickReply={quickReply => this.onQuickReply(quickReply)}
              renderQuickReplies={this.renderQuickReplies}
              renderBubble={this.renderBubble}
              renderMessageImage={this.renderMessageImage}
              user={{
                _id: this.state.id,
              }}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Chatbot2.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Chatbot2);
