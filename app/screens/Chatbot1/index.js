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
import { BaseStyle } from '@config';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import CustomQuickReplies from './CustomQuickReplies';

const loadingImage = require('./images/loading-screen.jpg');

import { saveMessage, loadPreviousData, loadFallback } from './firebaseHub';

import { textDetector } from './textDetector';

import { dialogflowConfig } from './env';

import {
  UriLink,
  GoodCarousel,
  Danger,
  Appointment,
  SugarWarning,
  SugarCarousel,
  MainCarousel,
  DoctorCarousel,
  DiabetesCarousel,
  DiabetesShakyCarousel,
  SugarWait,
} from './bubble';
import { normalText } from './diabetesBot';

const botAvatar = require('../../assets/images/vajira-logo.png');

export class Chatbot1 extends Component {
  state = {
    messages: [],
    id: 1,
    name: '',
    firstMount: true,
    // departments: [],
    loading: true,
  };

  async componentDidMount() {
    LogBox.ignoreLogs(['Animated.event']);

    const userId = this.props.user.data.id.toString();
    const userName = this.props.user.data.userInformation.firstname;

    const messages = await loadPreviousData(userId, userName);

    // const departments = await loadDepartments();

    this.setState({
      id: this.props.user.data.id,
      name: this.props.user.data.userInformation.firstname,
      messages,
      // departments,
      loading: false,
    });

    //   console.log('Calling Dialogflow');

    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );

    //   console.log('Finish Calling Dialogflow');
  }

  // normal response (single text):
  // Diaglogflow returns a single value
  // flow: onSend/onQuickReply => Dialogflow => handleGoogleResponse => sendBotResponse(text)

  // rich response (array of texts):
  // Take messages directly from bubble without going through onSend
  // flow: sendBotResponse([text[0], text[1], text[2]])

  async onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    let text = messages[0].text;

    text = await saveMessage(
      normalText(text, this.state.id, this.state.name),
      this.state.id,
    );

    Dialogflow_V2.requestQuery(
      text,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  async onQuickReply(quickReply) {
    this.setState(previousState => ({
      quickReply: GiftedChat.append(previousState.quickReply, quickReply),
    }));

    let text = quickReply[0].value;

    text = await saveMessage(
      normalText(text, this.state.id, this.state.name),
      this.state.id,
    );

    Dialogflow_V2.requestQuery(
      text,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  async handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text);
  }

  async sendBotResponse(text) {
    let msg;
    const currentLength = this.state.messages.length + 1;
    const id = this.state.id.toString();
    const name = this.state.name;

    if (text == 'show fallback') {
      msg = await loadFallback(currentLength);
    } else {
      msg = await textDetector(currentLength, text, id, name);
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));
  }

  async sendBotResponseThroughDialogflow(text) {
    Dialogflow_V2.requestQuery(
      text,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  // cuz of the one-way data flow, this will allow Child to return values to Parent
  // and you want to go through Dialogflow instead of heading straight to sendBotResponse()
  sendFromChildToParent2 = item => {
    this.sendBotResponseThroughDialogflow(item);
  };

  // cuz of the one-way data flow, this will allow Child to return values to Parent
  sendFromChildToParent = item => {
    this.sendBotResponse(item);
  };

  renderBubble = props => {
    let username = props.currentMessage.user.name;

    const { navigation } = this.props;

    if (props.currentMessage.isURI) {
      return (
        <UriLink
          onPressMe={() => Linking.openURL(props.currentMessage.map)}
          image={props.currentMessage.image}
          message={props.currentMessage.text}
        />
      );
    } else if (props.currentMessage.isGood) {
      return (
        <GoodCarousel
          onPressMe={this.sendFromChildToParent2}
          data={props.currentMessage.data}
          message={props.currentMessage.text}
        />
      );
    } else if (props.currentMessage.isDanger) {
      return (
        <Danger
          onPressAmbulance={() => Linking.openURL('tel:1669')}
          onPressHotline={() => Linking.openURL('tel:1554')}
          onPressHospital={() => Linking.openURL(props.currentMessage.map)}
          onPressAppointment={() => navigation.navigate('TeleSymptom')}
          image={props.currentMessage.image}
          ambulance={props.currentMessage.ambulance}
          hotline={props.currentMessage.hotline}
          hospital={props.currentMessage.hospital}
          appointment={props.currentMessage.appointment}
        />
      );
    } else if (props.currentMessage.isAppointment) {
      return (
        <Appointment
          onPressAppointment={() => Linking.openURL(props.currentMessage.map)}
          image={props.currentMessage.image}
          appointment={props.currentMessage.appointment}
        />
      );
    } else if (props.currentMessage.isSugarWarning) {
      return (
        <SugarWarning
          onPressMe={this.sendFromChildToParent2}
          image={props.currentMessage.image}
          suggestion={props.currentMessage.suggestion}
          text={props.currentMessage.text}
          message={props.currentMessage.message}
          reply={props.currentMessage.reply}
          replyText={props.currentMessage.replyText}
          reply2={props.currentMessage.reply2}
          reply2Text={props.currentMessage.reply2Text}
        />
      );
    } else if (props.currentMessage.isMainCarousel) {
      return (
        <MainCarousel
          onPressMe={this.sendFromChildToParent}
          data={props.currentMessage.data}
          message={props.currentMessage.message}
        />
      );
    } else if (props.currentMessage.isDoctorCarousel) {
      return (
        <DoctorCarousel
          onPressMe={this.sendFromChildToParent}
          navigation={navigation}
          data={props.currentMessage.data}
          message={props.currentMessage.text}
        />
      );
    } else if (props.currentMessage.isDiabetesPath) {
      return (
        <DiabetesCarousel
          onPressMe={this.sendFromChildToParent2}
          data={props.currentMessage.data}
          cardHeight={props.currentMessage.cardHeight}
          noButton={props.currentMessage.noButton}
          message={props.currentMessage.text}
        />
      );
    } else if (props.currentMessage.isSugarOptionsPath) {
      return (
        <SugarCarousel
          onPressMe={this.sendFromChildToParent2}
          data={props.currentMessage.data}
          message={props.currentMessage.text}
        />
      );
    } else if (props.currentMessage.isSugarWait) {
      return (
        <SugarWait
          onPressMe={this.sendFromChildToParent2}
          image={props.currentMessage.image}
          text={props.currentMessage.text}
          reply={props.currentMessage.reply}
          replyText={props.currentMessage.replyText}
        />
      );
    } else if (props.currentMessage.isDiabetesShakyPath) {
      return (
        <DiabetesShakyCarousel
          onPressMe={this.sendFromChildToParent2}
          data={props.currentMessage.data}
          message={props.currentMessage.text}
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

  renderQuickReplies = props => {
    return <CustomQuickReplies data={props} />;
  };

  render() {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="Diabetes - โรคเบาหวาน"
          textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
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

Chatbot1.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Chatbot1);
