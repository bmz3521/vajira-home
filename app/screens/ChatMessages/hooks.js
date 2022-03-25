import React from 'react';
import moment from 'moment';
import { GiftedChat } from 'react-native-gifted-chat';
import { getPatientInfo } from '@utils/shared';

const getMessage = message => {
  const msg = {
    _id: message.id,
    text: message.text,
    createdAt: message.timestamp,
    user: {
      _id: message.sender.type === 'patient' ? 0 : 1,
      name: message.sender.name || 'anonymous',
    },
  };

  if (!!message.sender.avatar) msg.user.avatar = message.sender.avatar;
  if (message.type === 'media')
    msg.image = URL.createObjectURL(message.media[0]);

  return msg;
};

const useHooks = props => {
  const { actions, actions2, chats, booking, navigation, route } = props;
  const { bookingId, firstMessage } = route.params;

  const [messages, setMessages] = React.useState([]);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    actions.getChats({ id: bookingId });
  }, [bookingId]);

  React.useEffect(() => {
    if (chats.loading || !chats.data) return;

    const patient = getPatientInfo(booking.data);

    const histories = [
      getMessage({
        id: 0,
        ...firstMessage,
        sender: {
          type: 'patient',
          name: patient.name,
        },
      }),
      ...chats.data.map(chat => getMessage(chat)),
    ];
    histories.sort((a, b) => moment(b.createdAt).diff(a.createdAt));
    setMessages(histories);
    setReady(true);
  }, [chats]);

  const onSend = React.useCallback(
    () => (sendMessageBlock = []) => {
      const patient = getPatientInfo(booking.data);
      const clinic = booking.data.clinic;

      const message = {
        id: bookingId,
        source: 'mobile',
        sender: {
          type: 'patient',
          name: patient.name,
          email: patient.email,
        },
        receiver: {
          type: 'clinic',
          avatar: clinic.logo,
          name: clinic.name,
          email: clinic.contactemail,
        },
        type: 'text',
        text: sendMessageBlock[0].text,
        timestamp: sendMessageBlock[0].createdAt,
      };

      actions2.createChat(message);
      setMessages(GiftedChat.append(messages, getMessage(message)));
    },
    [messages],
  );

  return {
    ready,
    messages,
    events: {
      onSend,
    },
  };
};

export { useHooks };
