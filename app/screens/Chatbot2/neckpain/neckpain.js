import { BOT_USER } from '../firebaseHub';
import { DATA_NECK_PAIN } from './data';

export const neckPain = (currentLength, text, name) => {
  let msg = radioGenerator(
    currentLength,
    'คุณเลือก ปวดคอ',
    DATA_NECK_PAIN.mainMenu,
  );
  if (text.search('riskpoint') != -1) {
    msg = {
      _id: currentLength,
      text: 'ปัจจัยเสี่ยง',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isOneColor: true,
      goBack: text,
      isScrollCarousel: true,
      data: DATA_NECK_PAIN.neckacheRisk,
    };
  } else if (text.search('treatment') != -1) {
    msg = {
      _id: currentLength,
      text: 'การรักษาเบื้องต้น',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      goBack: text,
      isFAQSport: true,
      data: DATA_NECK_PAIN.basicTreatment,
    };
  } else if (text.search('cause') != -1) {
    msg = {
      _id: currentLength,
      text: 'อาการปวดคอเกิดจากอะไรได้บ้าง',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      goBack: text,
      isFAQSport: true,
      data: DATA_NECK_PAIN.neckpainCause,
    };
  } else if (text.search('neckpain-symptom') != -1) {
    msg = funcSymtom(currentLength, text);
  }
  return msg;
};

/** NOTE เมนู อาการ */

const funcSymtom = (currentLength, text) => {
  switch (text) {
    case 'neckpain-symptom-normal':
      return {
        _id: currentLength,
        text: 'อาการ',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isOneColor: true,
        goBack: text,
        isScrollCarousel: true,
        data: DATA_NECK_PAIN.neckpainSymp,
      };
    case 'neckpain-symptom-bringhospital':
      return {
        _id: currentLength,
        text: 'อาการที่ควรมา รพ.',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isOneColor: true,
        goBack: text,
        isScrollCarousel: true,
        data: DATA_NECK_PAIN.neckpainSymBringHos,
        twoMoreBtn: {
          positive: 'neckpain-symptom-bringhospital-positive',
          negative: 'neckpain-symptom-bringhospital-negative',
        },
      };
    case 'neckpain-symptom-bringhospital-negative':
      return {
        _id: currentLength,
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isBackache: true,
        goBack: text,
        morePicture: true,
        data: DATA_NECK_PAIN.mayBeSymp,
      };

    case 'neckpain-symptom-bringhospital-positive':
      return {
        _id: currentLength,
        text: 'ท่าน "มี" อาการใดอาการหนึ่ง',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        goBack: text,
        isOneColor: true,
        isScrollCarousel: true,
        data: DATA_NECK_PAIN.haveSymp,
      };
    default:
      return radioGenerator(currentLength, 'อาการ', DATA_NECK_PAIN.subsymMenu);
  }
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
