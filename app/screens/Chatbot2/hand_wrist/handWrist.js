import { BOT_USER, loadDepartments } from '../firebaseHub';
import { DATA_HAND_WRIST } from './data';
import { main } from './main';

export const handAndWrist = async (currentLength, text, name) => {
  let msg = main(currentLength, 'มือและข้อมือ', name);
  if (text.search('question') != -1) {
    msg = {
      _id: currentLength,
      text: 'คนไข้ควรเตรียมคำตอบเพื่อให้แพทย์วินิจฉัย ดังนี้',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      goBack: text,
      isQuestionCarousel: true,
      data: DATA_HAND_WRIST.selfcheckQuestions,
    };
  } else if (text.search('department') != -1) {
    msg = {
      _id: currentLength,
      text,
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isDepartmentCarousel: true,
      message: 'เลือก',
      data: await loadDepartments(),
    };
  } else if (text.search('cause') != -1) {
    msg = {
      _id: currentLength,
      text: 'อาการผิดปกติ ',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isMainMenuSport: true,
      data: DATA_HAND_WRIST.subMenu,
    };
  } else if (text.search('pain') != -1) {
    return funcPain(currentLength, text, name);
  } else if (text.search('beri') != -1) {
    return funcBeri(currentLength, text, name);
  }

  return msg;
};

// NOTE hand beriberi

const funcBeri = (currentLength, text, name) => {
  let data;
  let textMessage = '';
  switch (text) {
    case 'hand-beri-carpal':
      data = DATA_HAND_WRIST.berisCarpal;
      textMessage =
        'การกดทับเส้นประสาทมีเดียนบริเวณข้อมือ\n(Carpal tunnel syndrome)';
      break;
    case 'hand-beri-cubital':
      data = DATA_HAND_WRIST.berisCubital;
      textMessage =
        'การกดทับเส้นประสาทอัลนาบริเวณข้อศอก\n(Cubital tunnel syndrome)';
      break;
    case 'hand-beri-cervical':
      data = DATA_HAND_WRIST.berisCervical;
      textMessage = 'กระดูกต้นคอเสื่อม\n(Cervical spondylosis)';
      break;
    case 'hand-beri-peripheralneuropathy':
      data = DATA_HAND_WRIST.berisPeripheralNeuv;
      textMessage = 'ปลายประสาทอักเสบ\n(Peripheral neuropathy)';
      break;
    default:
      return {
        _id: currentLength,
        text: 'อาการชา',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: DATA_HAND_WRIST.berisberisMenu,
        },
      };
  }
  return {
    _id: currentLength,
    text: textMessage,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isSport: true,
    isScrollCarousel: true,
    goBackSub: {
      title: 'อาการผิดปกติ',
      val: 'hand-sub-main',
      icon: 'home',
    },
    goBack: text,
    data: data,
  };
};

// NOTE hand pain

const funcPain = (currentLength, text, name) => {
  let textMessage = '';
  let data;
  if (text.search('wrist') != -1) {
    switch (text) {
      case 'hand-pain-wrist-tenosynovitis':
        data = DATA_HAND_WRIST.wristPainTenosynovitis;
        textMessage =
          "ภาวะเส้นเอ็นอักเสบที่ข้อมือ\n(De Quervain's tenosynovitis)";
        break;
      case 'hand-pain-wrist-osteoarthritis':
        data = DATA_HAND_WRIST.wristPainOsteoarthritis;
        textMessage = 'ข้อมือเสื่อม (Wrist osteoarthritis)';
        break;
      default:
        return {
          _id: currentLength,
          text: 'ปวดข้อมือ\n(Wrist osteoarthritis)',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          quickReplies: {
            type: 'radio',
            keepIt: true,
            values: DATA_HAND_WRIST.wristPainMenu,
          },
        };
    }
    return {
      _id: currentLength,
      text: textMessage,
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isScrollCarousel: true,
      goBackSub: {
        title: 'อาการผิดปกติ',
        val: 'hand-sub-main',
        icon: 'home',
      },
      goBack: text,
      data: data,
    };
  } else if (text.search('hands') != -1) {
    switch (text) {
      case 'hand-pain-hands-triggerfinger':
        textMessage = 'โรคนิ้วล็อค หรือโรคนิ้วไกปืน\n(Trigger finger)';
        data = DATA_HAND_WRIST.handPainTriggerfinger;
        break;
      case 'hand-pain-hands-steoarthritis':
        textMessage = 'ข้อนิ้วเสื่อม (Hand steoarthritis)';
        data = DATA_HAND_WRIST.handPainSteoarthritis;
        break;
      default:
        return {
          _id: currentLength,
          text: 'ปวดมือ',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          quickReplies: {
            type: 'radio',
            keepIt: true,
            values: DATA_HAND_WRIST.handPainMenu,
          },
        };
    }
    return {
      _id: currentLength,
      text: textMessage,
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isScrollCarousel: true,
      goBackSub: {
        title: 'อาการผิดปกติ',
        val: 'hand-sub-main',
        icon: 'home',
      },
      goBack: text,
      data: data,
    };
  } else {
    return {
      _id: currentLength,
      text: 'อาการผิดปกติ',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isMainMenuSport: true,
      data: DATA_HAND_WRIST.subMenu,
    };
  }
};
