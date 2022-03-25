import { getDiabetesMain } from './diabetesMain';
import { getShaky } from './diabetesShaky';
import { getThirsty } from './diabetesThirsty';
import { getDizzy } from './diabetesDizzy';
import { getFever } from './diabetesFever';

const botAvatar = require('../../assets/images/vajira-logo.png');

const BOT_USER = {
  _id: 2,
  name: 'Vajira Bot',
  avatar: botAvatar,
};

export const textDetector = async (currentLength, text, id, name) => {
  // newText/diabetesCatcher = text taken from Dialogflow

  let msg;

  let diabetesCatcher = text.slice(0, 3);

  if (diabetesCatcher == 'dia') {
    let newText = text.slice(4, text.length);

    if (
      newText == 'diabetes' ||
      newText == 'show main danger' ||
      newText == 'show main warning' ||
      newText == 'show main good' ||
      newText == 'show main pressure' ||
      newText == 'show main pressure values' ||
      newText == 'show main hospitals'
    ) {
      msg = getDiabetesMain(currentLength, newText, id);
    }
  } else if (diabetesCatcher == 'sha') {
    let newText = text.slice(4, text.length);

    if (
      newText == 'show shaky' ||
      newText == 'show shaky measure' ||
      newText == 'show shaky no measure' ||
      newText == 'show sugar blood check' ||
      newText == 'show shaky followup 1' ||
      newText == 'show shaky followup 2' ||
      newText == 'show shaky wait' ||
      newText == 'show shaky followup 3' ||
      newText == 'show self check' ||
      newText == 'show self check followup 1' ||
      newText == 'show self check followup 2'
    ) {
      msg = getShaky(currentLength, newText, id, name);
    }
  } else if (diabetesCatcher == 'thi') {
    let newText = text.slice(4, text.length);

    if (
      newText == 'show thirsty' ||
      newText == 'show options' ||
      newText == 'show blood glucose meter' ||
      newText == 'show no blood glucose meter' ||
      newText == 'show normal glucose' ||
      newText == 'show high glucose followup'
    ) {
      msg = getThirsty(currentLength, newText, id);
    }
  } else if (diabetesCatcher == 'diz') {
    let newText = text.slice(4, text.length);

    if (
      newText == 'show dizzy' ||
      newText == 'show dizzy pressure' ||
      newText == 'show dizzy pressure options' ||
      newText == 'show dizzy good' ||
      newText == 'show dizzy followup 1' ||
      newText == 'show dizzy followup 2' ||
      newText == 'show dizzy danger' ||
      newText == 'show dizzy appointment'
    ) {
      msg = getDizzy(currentLength, newText, id);
    }
  } else if (diabetesCatcher == 'fev') {
    let newText = text.slice(4, text.length);

    if (newText == 'show fever' || newText == 'show fever tips') {
      msg = getFever(currentLength, newText, id);
    }
  } else {
    msg = {
      _id: currentLength,
      text,
      createdAt: new Date().getTime(),
      user: BOT_USER,
    };
  }

  return msg;
};
