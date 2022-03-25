import { BOT_USER } from '../firebaseHub';
import { DATA_ORTHO } from './data';

export const orthoBone = (currentLength, text, name) => {
  let msg;
  if (text.search('fracture') != -1) {
    msg = {
      _id: currentLength,
      text: 'กระดูกหัก (Fracture)',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      moreBtn: {
        title: 'คำถามก่อนพบแพทย์',
        val: 'fracture-question',
        icon: 'question',
      },
      isScrollCarousel: true,
      data: DATA_ORTHO.fracture.fractureDetail,
    };
    if (text === 'fracture-question') {
      msg = {
        _id: currentLength,
        text: 'คนไข้ควรเตรียมคำตอบเพื่อให้แพทย์วินิจฉัย ดังนี้',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isElbow: true,
        isQuestionCarousel: true,
        data: DATA_ORTHO.fracture.selfcheckQuestions,
      };
    }
  } else {
    msg = {
      _id: currentLength,
      text: 'กระดูกพรุน (Osteoporosis)',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isFAQSport: true,
      data: DATA_ORTHO.osteoporosis,
    };
  }
  return msg;
};
