import { main } from './main';
import { BOT_USER, loadDepartments } from '../firebaseHub';
import { radioGenerator } from './radioGenerator';
import { DATA_SHOULDER } from './data';

export const shoulder = async (currentLength, text, name) => {
  let msg;

  if (text == 'shoulder') {
    //   console.log('getting main..');
    text = 'ไหล่';
    return main(currentLength, text, name);
  }

  if (text.search('department') != -1) {
    msg = {
      _id: currentLength,
      text,
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isDepartmentCarousel: true,
      message: 'เลือก',
      data: await loadDepartments(),
    };
  } else if (text.search('question') != -1) {
    msg = {
      _id: currentLength,
      text: 'คนไข้ควรเตรียมคำตอบเพื่อให้แพทย์วินิจฉัย ดังนี้',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      isQuestionCarousel: true,
      data: DATA_SHOULDER.selfcheckQuestions,
    };
  } else if (text.search('selfcare') != -1) {
    msg = {
      _id: currentLength,
      text: 'การรักษาเบื้องต้น',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      isSelfcareCarousel: true,
      data: DATA_SHOULDER.tips,
    };
  } else if (text.search('cause') != -1) {
    msg = {
      _id: currentLength,
      text: 'สาเหตุที่พบบ่อย',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isShoulder: true,
      isCauseCarousel: true,
      data: DATA_SHOULDER.causes,
    };
  } else if (text.search('lessthan6') != -1) {

  /** NOTE Less than 6 weeks */
    let type = 'lessthan6';

    if (text.search('labral') != -1) {
      msg = {
        _id: currentLength,
        text: 'กระดูกอ่อนลาบรัมฉีกขาด',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.labral,
      };
    } else if (text.search('acute') != -1) {
      msg = {
        _id: currentLength,
        text: 'เส้นเอ็นไหล่ฉีกขาด',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.acute,
      };
    } else if (text.search('dislocation') != -1) {
      msg = {
        _id: currentLength,
        text: 'ข้อไหล่เคลื่อน',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.dislocation,
      };
    } else {
      msg = radioGenerator(currentLength, type);
    }
  } else if (text.search('between6and12') != -1) {

  /** NOTE Between 6 and 12 weeks */
    let type = 'between6and12';
    if (text.search('rotator') != -1) {
      msg = {
        _id: currentLength,
        text: 'เส้นเอ็นข้อไหล่',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.rotator,
      };
    } else if (text.search('biceps') != -1) {
      msg = {
        _id: currentLength,
        text: 'เส้นเอ็นของกล้ามเนื้อ Biceps',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.biceps,
      };
    } else if (text.search('adhesive') != -1) {
      msg = {
        _id: currentLength,
        text: 'ภาวะไหล่ติด',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.adhesive,
      };
    } else if (text.search('subacromial') != -1) {
      msg = {
        _id: currentLength,
        text: 'ถุงน้ำอักเสบ',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.subacromial,
      };
    } else {
      msg = radioGenerator(currentLength, type);
    }
  } else if (text.search('morethan12') != -1) {

  /** NOTE More than 12 weeks */
    let type = 'morethan12';
    if (text.search('osteo') != -1) {
      msg = {
        _id: currentLength,
        text: 'ข้อไหล่เสื่อม',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isShoulder: true,
        isInfoCarousel: true,
        data: DATA_SHOULDER.osteo,
      };
    } else {
      msg = radioGenerator(currentLength, type);
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
