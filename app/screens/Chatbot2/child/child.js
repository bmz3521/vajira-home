import { BOT_USER } from '../firebaseHub';
import { DATA_CHILD_ORTHO } from './data';

export const childOrtho = (currentLength, text, name) => {
  let msg;
  if (text === 'childs') {
    msg = radioGenerator(
      currentLength,
      'คุณเลือก โรคกระดูกและข้อในเด็ก',
      DATA_CHILD_ORTHO.mainMenuChild,
    );
  } else if (text.search('question') != -1) {
    msg = {
      _id: currentLength,
      text: 'คนไข้ควรเตรียมคำตอบเพื่อให้แพทย์วินิจฉัย ดังนี้',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      isQuestionCarousel: true,
      data: DATA_CHILD_ORTHO.selfcheckQuestions,
    };
  } else if (text.search('cause') != -1) {
    msg = radioGenerator(
      currentLength,
      'สาเหตุที่พบบ่อย',
      DATA_CHILD_ORTHO.subMenuChild,
    );
  } else {
    if (text.search('infected') != -1) {
      return funcInfected(currentLength, text);
    } else if (text.search('deformed') != -1) {
      return funcDeformed(currentLength, text);
    }
  }
  return msg;
};

/** NOTE  การติดเชื้อ */

const funcInfected = (currentLength, text) => {
  let data;
  let textMessage = '';
  if (text === 'childs-infected-inflam') {
    textMessage = 'โรคกระดูกอักเสบติดเชื้อ (Osteomyelitis)';
    data = DATA_CHILD_ORTHO.infectedInflam;
  } else if (text === 'childs-infected-joint') {
    textMessage = 'โรคติดเชื้อในข้อ (Septic arthritis)';
    data = DATA_CHILD_ORTHO.infectedJoint;
  } else {
    return radioGenerator(
      currentLength,
      'การติดเชื้อ',
      DATA_CHILD_ORTHO.infectedMenu,
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

/** NOTE  ความผิดรูป */

const funcDeformed = (currentLength, text) => {
  let data;
  let textMessage = '';
  switch (text) {
    case 'childs-deformed-neck':
      textMessage = 'โรคคอเอียง (Torticollis)';
      data = DATA_CHILD_ORTHO.childsTorticollis;
      break;
    case 'childs-deformed-back':
      return radioGenerator(
        currentLength,
        'คุณเลือก หลัง',
        DATA_CHILD_ORTHO.menuDeformedBack,
      );
    case 'childs-deformed-back-scoliosis':
      textMessage = 'โรคหลังคด (Scoliosis)';
      data = DATA_CHILD_ORTHO.childsScoliosis;
      break;
    case 'childs-deformed-back-kyphosis':
      textMessage = 'โรคหลังค่อม (Kyphosis)';
      data = DATA_CHILD_ORTHO.childsKyphosis;
      break;
    case 'childs-deformed-elbow-lordosis':
      textMessage = 'โรคหลังแอ่น (Lordosis)';
      data = DATA_CHILD_ORTHO.childsLordosis;
      break;
    case 'childs-deformed-elbow':
      textMessage =
        'โรคแขนคอก (Cubitus varus) และ\nโรคข้อศอกชี้ออกด้านนอก (Cubitus vulgus)';
      data = DATA_CHILD_ORTHO.childsCubitusVarusAndVulgus;
      break;
    case 'childs-deformed-hip':
      return radioGenerator(
        currentLength,
        'คุณเลือก สะโพก',
        DATA_CHILD_ORTHO.menuDeformedHip,
      );
    case 'childs-deformed-hip-dysplasia':
      textMessage =
        'โรคสะโพกหลุดหรือหลวม \n(Developmental dysplasia of the hip)';
      data = DATA_CHILD_ORTHO.childsDevelopmentalHip;
      break;
    case 'childs-deformed-hip-epiphysis':
      textMessage =
        'โรคหัวกระดูกสะโพกเคลื่อน \n(Slipped capital femoral epiphysis)';
      data = DATA_CHILD_ORTHO.childsSlippedEpiphysis;
      break;
    case 'childs-deformed-knee':
      return radioGenerator(
        currentLength,
        'คุณเลือก เข่า',
        DATA_CHILD_ORTHO.menuDeformedKnee,
      );
    case 'childs-deformed-knee-physiologicBowed':
      textMessage =
        'โรคขาโก่งและขาเกตามธรรมชาติ \n(Physiologic Bowed legs and knocked knee)';
      data = DATA_CHILD_ORTHO.childsBowedLegs;
      break;
    case 'childs-deformed-knee-tibiaVara':
      textMessage =
        'โรคกระดูกแข้งส่วนต้นโก่งทิเบียวารา (Tibia vara) \nหรือโรคเบลาต์ (Blount’s disease)';
      data = DATA_CHILD_ORTHO.childsTibiaVara;
      break;
    case 'childs-deformed-knee-physiologicBowedOther':
      textMessage = 'โรคขาโก่งเกจากโรคต่างๆ';
      data = DATA_CHILD_ORTHO.childsBowedLegsOther;
      break;
    case 'childs-deformed-knee-congenitalBowing':
      textMessage =
        'โรคกระดูกแข้งโก่งแต่กําเนิด \n(Congenital bowing of tibia)';
      data = DATA_CHILD_ORTHO.childsBowingOfTibia;
      break;
    case 'childs-deformed-foot':
      return radioGenerator(
        currentLength,
        'คุณเลือก เท้า',
        DATA_CHILD_ORTHO.menuDeformedFoot,
      );
    case 'childs-deformed-foot-clubfoot':
      textMessage = 'โรคเท้าปุก (Club foot)';
      data = DATA_CHILD_ORTHO.childsClubFoot;
      break;
    case 'childs-deformed-foot-flatfoot':
      textMessage = 'โรคเท้าแบน (Flat foot)';
      data = DATA_CHILD_ORTHO.childsFlatFoot;
      break;
    case 'childs-deformed-finger':
      return radioGenerator(
        currentLength,
        'คุณเลือก นิ้ว',
        DATA_CHILD_ORTHO.menuDeformedFinger,
      );
    case 'childs-deformed-finger-polydactyly':
      textMessage = 'โรคนิ้วเกิน (Polydactyly)';
      data = DATA_CHILD_ORTHO.childsPolydactyly;
      break;
    case 'childs-deformed-finger-syndactyly':
      textMessage = 'โรคนิ้วติด (Syndactyly)';
      data = DATA_CHILD_ORTHO.childsSyndactyly;
      break;
    default:
      return radioGenerator(
        currentLength,
        'คุณเลือก ความผิดรูป',
        DATA_CHILD_ORTHO.menuDeformed,
      );
  }
  return {
    _id: currentLength,
    text: textMessage,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSport: true,
    bullet: false,
    goBack: text,
    isScrollCarousel: true,
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
