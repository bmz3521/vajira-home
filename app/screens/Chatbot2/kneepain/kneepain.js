import { BOT_USER } from '../firebaseHub';
import { DATA_KNEE_PAIN } from './data';

export const kneepain = async (currentLength, text, name) => {
  if (text.search('cause') != -1) {
    if (text.search('teen') != -1) {
      return teenCause(currentLength, text);
    } else if (text.search('adult') != -1) {
      return adultCause(currentLength, text);
    } else {
      return radioGenerator(
        currentLength,
        'โรคที่พบบ่อย',
        DATA_KNEE_PAIN.subCauseMenu,
      );
    }
  } else if (text.search('questions') != -1) {
    return {
      _id: currentLength,
      text: 'คำถามที่ต้องเตรียมก่อนมาพบแพทย์',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      isQuestionCarousel: true,
      data: DATA_KNEE_PAIN.kneePainQuestion,
      goBack: text,
    };
  } else {
    return radioGenerator(
      currentLength,
      'ปวดเข่า (Knee Pain)',
      DATA_KNEE_PAIN.mainMenu,
    );
  }
};

const adultCause = (currentLength, text) => {
  let textMessage;
  let data = {};
  switch (text) {
    case 'kneepain-cause-adult-1':
      textMessage = 'ปวดเข่าด้านหน้า';
      data = DATA_KNEE_PAIN.adultMenu1;
      break;
    case 'kneepain-cause-adult-2':
      textMessage = 'ปวดเข่าด้านใน​';
      data = DATA_KNEE_PAIN.adultMenu2;
      break;
    case 'kneepain-cause-adult-3':
      textMessage = 'ปวดเข่าด้านนอก​';
      data = DATA_KNEE_PAIN.adultMenu3;
      break;
    case 'kneepain-cause-adult-4':
      textMessage = 'ปวดเข่าทั่วๆ​';
      data = DATA_KNEE_PAIN.adultMenu4;
      break;
    default:
      return radioGenerator(
        currentLength,
        'วัยเด็กวัยผู้ใหญ่',
        DATA_KNEE_PAIN.adultMenu,
      );
  }
  return {
    _id: currentLength,
    text: textMessage,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSport: true,
    isScrollCarousel: true,
    goBack: text,
    goBackSub: {
      title: 'วัยเด็กวัยผู้ใหญ่',
      val: 'kneepain-cause-main',
      icon: 'home',
    },
    data: data,
  };
};

const teenCause = (currentLength, text) => {
  let textMessage;
  let data = {};
  switch (text) {
    case 'kneepain-cause-teen-1':
      textMessage = 'โรคกระดูกสะบ้าเคลื่อน\n(Patella subluxation)';
      data = DATA_KNEE_PAIN.teenMenu1;
      break;
    case 'kneepain-cause-teen-2':
      textMessage = 'โรคปวดหน้าแข้ง\n(Osgood-Schlatters syndrome)';
      data = DATA_KNEE_PAIN.teenMenu2;
      break;
    case 'kneepain-cause-teen-3':
      textMessage = 'โรคเอ็นสะบ้าอักเสบ\n(Jumper’s knee)';
      data = DATA_KNEE_PAIN.teenMenu3;
      break;
    default:
      return radioGenerator(currentLength, 'วัยรุ่น', DATA_KNEE_PAIN.teenMenu);
  }
  return {
    _id: currentLength,
    text: textMessage,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSport: true,
    isScrollCarousel: true,
    goBack: text,
    goBackSub: {
      title: 'วัยรุ่น',
      val: 'kneepain-cause-main',
      icon: 'home',
    },
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
