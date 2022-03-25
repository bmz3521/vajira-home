import { BOT_USER } from '../firebaseHub';
import { DATA_ONCOLOGY } from './data';

export const oncology = async (currentLength, text, name) => {
  let msg;
  if (text === 'oncology-question') {
    msg = {
      _id: currentLength,
      text: 'คำถามสำคัญก่อนมาพบแพทย์',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      goBack: text,
      isFAQSport: true,
      data: DATA_ONCOLOGY.oncologyQuestionleMenu,
    };
  } else if (text === 'oncology-cause') {
    msg = {
      _id: currentLength,
      text: 'โรคที่พบได้บ่อย',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      goBack: text,
      isElbow: true,
      isQuestionCarousel: true,
      data: DATA_ONCOLOGY.oncologyCause,
    };
  } else {
    msg = radioGenerator(
      currentLength,
      'เนื้องอกระบบกระดูกและเนื้อเยื่อเกี่ยวพัน',
      DATA_ONCOLOGY.mainMenu,
    );
  }
  return msg;
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
