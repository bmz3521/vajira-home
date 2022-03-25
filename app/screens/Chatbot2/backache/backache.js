import { BOT_USER } from '../firebaseHub';
import { DATA_BACK_ACHE } from './data';

export const backache = async (currentLength, text, name) => {
  let msg = radioGenerator(currentLength, 'ปวดหลัง', DATA_BACK_ACHE.mainMenu);
  if (text === 'backache') {
    msg = radioGenerator(currentLength, 'ปวดหลัง', DATA_BACK_ACHE.mainMenu);
  }

  if (text.search('risk') != -1) {
    msg = {
      _id: currentLength,
      text: 'ปัจจัยเสี่ยง',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isOneColor: true,
      goBack: text,
      isScrollCarousel: true,
      data: DATA_BACK_ACHE.backacheRisk,
    };
  } else if (text.search('cause') != -1) {
    msg = {
      _id: currentLength,
      text: 'สาเหตุ​',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      goBack: text,
      isFAQSport: true,
      data: DATA_BACK_ACHE.backacheCause,
    };
  } else if (text.search('wayTreat') != -1) {
    msg = radioGenerator(
      currentLength,
      'ทางเลือกในการรักษา​',
      DATA_BACK_ACHE.choiceHeal,
    );
  } else if (text.search('heal') != -1) {
    let textmessage = '';
    let data;

    if (text === 'backache-heal1') {
      textmessage = 'การรักษาโดยไม่ต้องผ่าตัด';
      data = DATA_BACK_ACHE.backacheHeal1;
    } else if (text === 'backache-heal2') {
      textmessage = 'การรักษาโดยการผ่าตัด​';
      data = DATA_BACK_ACHE.backacheHeal2;
    }

    msg = {
      _id: currentLength,
      text: textmessage,
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      bullet: false,
      isOneColor: true,
      goBack: text,
      isScrollCarousel: true,
      data: data,
    };
  } else if (text.search('withcase') != -1) {
    msg = funcCause(currentLength, text);
  } else if (text.search('bringhospital') != -1) {
    msg = funcBringHos(currentLength, text);
  }
  return msg;
};
const funcBringHos = (currentLength, text) => {
  switch (text) {
    case 'backache-bringhospital-positive':
      return {
        _id: currentLength,
        text: 'ท่าน "มี" อาการใดอาการหนึ่ง',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        goBack: text,
        isOneColor: true,
        isScrollCarousel: true,
        data: DATA_BACK_ACHE.dontSym,
      };
    case 'backache-bringhospital-negative':
      return {
        _id: currentLength,
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isBackache: true,
        goBack: text,
        morePicture: true,
        data: DATA_BACK_ACHE.mayBeSymp,
      };
    default:
      return {
        _id: currentLength,
        text: 'อาการที่ควรมา รพ.',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isOneColor: true,
        goBack: text,
        isScrollCarousel: true,
        data: DATA_BACK_ACHE.backacheSymp,
        twoMoreBtn: {
          positive: 'backache-bringhospital-positive',
          negative: 'backache-bringhospital-negative',
        },
      };
  }
};

const funcCause = (currentLength, text) => {
  let textMessage = '';
  let data;
  switch (text) {
    case 'backache-withcase-1':
      textMessage = 'โรคกระดูกสันหลังคด';
      data = DATA_BACK_ACHE.backacheSub1;
      break;
    case 'backache-withcase-2':
      textMessage = 'กระดูกสันหลังหัก';
      data = DATA_BACK_ACHE.backacheSub2;
      break;
    case 'backache-withcase-3':
      textMessage = 'หมอนรองกระดูกสันหลังกดทับเส้นประสาท';
      data = DATA_BACK_ACHE.backacheSub3;
      break;

    default:
      return radioGenerator(
        currentLength,
        'โรคที่เกี่ยวข้องกับอาการปวดหลัง',
        DATA_BACK_ACHE.backacheSubMenu,
      );
  }
  return {
    _id: currentLength,
    text: textMessage,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSport: true,
    goBack: text,
    isFAQSport: true,
    data: data,
  };
};

const radioGenerator = (currentLength, text, data = []) => {
  return {
    _id: currentLength,
    text: text,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio',
      keepIt: true,
      values: data,
    },
  };
};
