import React from 'react';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { Image, View, Text } from 'react-native';
const sendIcon = require('../../assets/images/Ever_app_-_icon_Send.png');
import PropTypes from 'prop-types';
import authClient from '@utils/authClient';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getAccessTeleToken } from '@utils/asyncStorage';

const _Chat = require('../../../node_modules/twilio-chat/dist/twilio-chat');

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        borderRadius: 20,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    />
  );
};

const renderSend = props => {
  return (
    <Send
      {...props}
      containerStyle={{
        borderWidth: 0,
        paddingRight: 5,
        justifyContent: 'center',
      }}
    >
      <Image source={sendIcon} style={{ width: 35, height: 35 }} />
    </Send>
  );
};

class Chat extends React.Component {
  state = {
    messages: [],
    chatChannel: undefined,
    loading: true,
    userId: '',
    daosk
  };

  async componentDidMount() {
    const { data } = this.props.navigation.state.params;
    const token = await this.fetchModel();
    const { userId } = await getAccessTeleToken();
    this.setState({ userId: userId });
    const consultCase = await this.fetchConsultCase(data);

    if (consultCase) {
      doctorConsultId = consultCase.doctorConsultId;
      patientConsultId = consultCase.patientConsultId;
      this.setState({ doctorConsultId, patientConsultId });
      this.submitHandler(consultCase);
    }
    this.initMessage();

    const _that = this;
    _Chat.Client.create(token)
      .then(client => {
        this.getChannelDescriptor(client)
          .then(channel => channel.getChannel())
          .then(channel => channel.join())
          .then(channel => {
            chatChannel = channel;
            _that.setState({ chatChannel, loading: false });
            channel.on('messageAdded', this.onMessageAdded);
          })
          .catch(e => console.log('channel', e));
      })
      .catch(e => console.log('channel2', e));
  }

  fetchModel = async () => {
    const { email } = this.props.user.data;
    const res = await authClient.client
      .get(`/Communications/getTokenChat?username=${email}`)
      .then(res => res.data);
    return res;
  };

  fetchConsultCase = async data => {
    const consultCase = {
      description: data.description,
      duration: data.duration,
      image: data.images,
      symptomId: data.symptom.id,
      patientConsultId: this.state.userId,
      doctorConsultId: data.doctor.id,
      consultCaseType: 'chat',
      navigator: 'Chat',
    };
    return consultCase;
  };

  submitHandler = async param => {
    try {
      const res = await authClient.client
        .post('/ConsultCases', param)
        .then(res => res.data);
      return res;
    } catch (e) {
      console.log('submitHandler: ', e);
    }
  };

  initMessage = async () => {
    const { doctorConsultId, patientConsultId } = this.state;
    const filter = {
      where: {
        or: [
          {
            and: [
              {
                senderId: doctorConsultId,
              },
              {
                receiverId: patientConsultId,
              },
            ],
          },
          {
            and: [
              {
                senderId: patientConsultId,
              },
              {
                receiverId: doctorConsultId,
              },
            ],
          },
        ],
      },
    };

    const messages = await authClient.client
      .get(`/MessengerHistories?filter=${JSON.stringify(filter)}`)
      .then(res => res.data);

    const { userId } = this.state;
    const reformatMessage = messages.map(val => {
      if (val.user._id === userId) {
        return {
          _id: val._id,
          text: val.text,
          createdAt: val.createdAt,
          user: {
            _id: 1,
            name: val.user.name,
            avatar: val.user.avatar,
          },
          sent: val.sent,
          received: val.received,
          id: val.id,
          senderId: val.senderId,
          receiverId: val.receiverId,
        };
      }
      return val;
    });
    this.setState({ messages: reformatMessage.reverse() });
  };

  onMessageAdded = message => {
    const { timestamp, index, body, author } = message.state;
    const { email } = this.props.user.data;
    const newBody = JSON.parse(body);
    const {
      text,
      user: { avatar },
    } = newBody;
    if (author !== email) {
      const messagesObj = {
        _id: index,
        text,
        createdAt: new Date(timestamp),
        user: {
          _id: 2,
          name: author,
          avatar,
        },
        sent: true,
        received: true,
      };
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messagesObj),
      }));
    }
  };

  getChannelDescriptor(chatClient) {
    const { email } = this.props.user.data;
    return chatClient
      .getPublicChannelDescriptors()
      .then(function(paginator) {
        if (paginator.items.length > 0) return paginator.items[0];
        // TODO filter channel chat
        else {
          chatClient
            .createChannel({
              uniqueName: email,
              friendlyName: email,
            })
            .then(function(newChannel) {
              return newChannel;
            });
        }
      })
      .then(channel => channel)
      .catch(error => console.log('error getting channel', error) || error);
  }

  onSend(messages = []) {
    const { doctorConsultId, patientConsultId } = this.state;
    const id = this.state.userId;
    const fullname = this.props.user.data.userInformation.firstname;
    const profileImage = 'https://api.adorable.io/avatars/285/net@yopmail.com';
    const { chatChannel } = this.state;
    const receiverId =
      id === doctorConsultId ? patientConsultId : doctorConsultId;

    const formatMessage = {
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt: messages[0].createdAt,
      user: {
        _id: id,
        name: fullname,
        avatar: profileImage,
      },
      sent: true,
      received: true,
      senderId: id,
      receiverId,
    };
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    if (chatChannel) {
      const result = this.state.chatChannel.sendMessage(
        JSON.stringify(formatMessage),
      );
      result
        .then(response => {
          try {
            authClient.client.post('/MessengerHistories', formatMessage);
          } catch (e) {
            console.log(e);
          }
        })
        .catch(e => console.log(e));
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="Chat Screen"
          renderLeft={() => {
            return (
              <Icon
                name="chevron-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderSend={props => renderSend(props)}
          renderInputToolbar={props => customtInputToolbar(props)}
          listViewProps={{
            contentContainerStyle: { flexGrow: 1, justifyContent: 'flex-end' },
          }}
          minInputToolbarHeight={75}
          user={{
            _id: 1,
            name: this.props.user.data.userInformation.firstname,
            avatar: 'https://api.adorable.io/avatars/285/net@yopmail.com',
          }}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Chat);
