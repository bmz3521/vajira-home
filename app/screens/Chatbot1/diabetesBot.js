const botAvatar = require('../../assets/images/vajira-logo.png');

const BOT_USER = {
  _id: 2,
  name: 'Vajira Bot',
  avatar: botAvatar,
};

export function showQuickReplies(messageId, text, values) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values,
    },
  };
}

export function showOptions(messageId, text, data, cardHeight, noButton) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isDiabetesPath: true,
    data,
    cardHeight,
    noButton,
  };
}

export function showSugarOptions(messageId, text, data) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSugarOptionsPath: true,
    data,
  };
}

export function showSugarWait(messageId, text, image, reply, replyText) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSugarWait: true,
    image,
    reply,
    replyText,
  };
}

export function normalText(text, id, name) {
  return {
    text,
    createdAt: new Date().getTime(),
    user: {
      _id: parseInt(id),
      name: name,
    },
  };
}

export function showShakyOptions(messageId, text, data) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isDiabetesShakyPath: true,
    data,
  };
}

export function showMap(messageId, text, image, map) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isURI: true,
    image,
    map,
  };
}

export function showDanger(
  messageId,
  text,
  image,
  ambulance,
  hotline,
  hospital,
  map,
) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isDanger: true,
    image,
    ambulance,
    hotline,
    hospital,
    map,
  };
}

export function showAppointment(messageId, text, image, appointment, map) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isAppointment: true,
    image,
    appointment,
    map,
  };
}

export function showWarning(
  messageId,
  text,
  image,
  reply,
  replyText,
  reply2,
  reply2Text,
) {
  return {
    _id: messageId,
    text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSugarWarning: true,
    image,
    reply,
    replyText,
    reply2,
    reply2Text,
  };
}

export function showGood(messageId, data) {
  return {
    _id: messageId,
    text: 'no text',
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isGood: true,
    data,
  };
}
