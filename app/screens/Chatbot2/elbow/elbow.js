import { main } from './main';
import { BOT_USER, loadDepartments } from '../firebaseHub';
import { radioGenerator } from './radioGenerator';
import { DATA_ELBOW } from './data';

export const elbow = async (currentLength, text, name) => {
  let msg;

  if (text == 'elbow') {
    //   console.log('getting main..');
    text = 'ข้อศอก';
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
      data: DATA_ELBOW.selfcheckQuestions,
    };
  } else if (text.search('selfcare') != -1) {
    msg = {
      _id: currentLength,
      text: 'การรักษาเบื้องต้น',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      isSelfcareCarousel: true,
      data: DATA_ELBOW.tips,
    };
  } else if (text.search('cause') != -1) {
    msg = {
      _id: currentLength,
      text: 'สาเหตุที่พบบ่อย',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      isCauseCarousel: true,
      data: DATA_ELBOW.causes,
    };
  } else if (text.search('anterior') != -1) {
    /** NOTE Elbow anterior  */
    let type = 'anterior';

    if (text.search('distal') != -1) {
      msg = {
        _id: currentLength,
        text: 'การขาดของเอ็นกล้ามเนื้อไบเซพส่วนปลาย',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        goBack: text,
        isElbow: true,
        isInfoCarousel: true,
        data: DATA_ELBOW.distal,
      };
    } else if (text.search('pronator') != -1) {
      msg = {
        _id: currentLength,
        text: 'การกดทับเส้นประสาทมีเดียนบริเวณข้อศอก',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isElbow: true,
        goBack: text,
        isInfoCarousel: true,
        data: DATA_ELBOW.pronator,
      };
    } else {
      msg = radioGenerator(currentLength, type);
    }
  } else if (text.search('posterior') != -1) {
    /** NOTE Elbow posterior */
    let type = 'posterior';
    if (text.search('olecranon') != -1) {
      if (text.search('treatment') != -1) {
        msg = {
          _id: currentLength,
          text: 'การรักษาจะแตกต่างกันตามสาเหตุ และความรุนแรงของโรค',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          isTreatmentCarousel: true,
          data: DATA_ELBOW.olecranonTreatment,
        };
      } else {
        msg = {
          _id: currentLength,
          text: 'ถุงน้ำเบอร์ซ่าของข้อศอกอักเสบ',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          goBack: text,
          isInfoCarousel: true,
          data: DATA_ELBOW.olecranon,
        };
      }
    } else if (text.search('triceps') != -1) {
      msg = {
        _id: currentLength,
        text: 'อักเสบเอ็นกล้ามเนื้อหลังต้นแขนไตรเซป',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isElbow: true,
        goBack: text,
        isInfoCarousel: true,
        data: DATA_ELBOW.triceps,
      };
    } else {
      msg = radioGenerator(currentLength, type);
    }
  } else if (text.search('lateral') != -1) {
    /** NOTE Elbow lateral */
    let type = 'lateral';
    if (text.search('tennis') != -1) {
      if (text.search('extra') != -1) {
        msg = {
          _id: currentLength,
          text: 'การผ่าตัด',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          isTreatmentCarousel: true,
          data: DATA_ELBOW.tennisExtra,
        };
      } else if (text.search('treatment') != -1) {
        msg = {
          _id: currentLength,
          text: 'การรักษาจะแตกต่างกันตามสาเหตุ และความรุนแรงของโรค',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          isTreatmentCarousel: true,
          data: DATA_ELBOW.tennisTreatment,
        };
      } else {
        msg = {
          _id: currentLength,
          text: 'การอักเสบของเอ็นกล้ามเนื้อด้านข้างส่วนนอกข้อศอก',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          goBack: text,
          isInfoCarousel: true,
          data: DATA_ELBOW.tennis,
        };
      }
    } else {
      msg = radioGenerator(currentLength, type);
    }
  } else if (text.search('medial') != -1) {
    /** NOTE Elbow medial */
    let type = 'medial';
    if (text.search('golfer') != -1) {
      if (text.search('treatment') != -1) {
        msg = {
          _id: currentLength,
          text: 'การรักษาจะแตกต่างกันตามสาเหตุ และความรุนแรงของโรค',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          isTreatmentCarousel: true,
          data: DATA_ELBOW.golferTreatment,
        };
      } else {
        msg = {
          _id: currentLength,
          text: 'การอักเสบของเอ็นกล้ามเนื้อด้านข้างส่วนในข้อศอก',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          isInfoCarousel: true,
          goBack: text,
          data: DATA_ELBOW.golfer,
        };
      }
    } else if (text.search('cubital') != -1) {
      if (text.search('treatment') != -1) {
        msg = {
          _id: currentLength,
          text: 'การรักษาจะแตกต่างกันตามสาเหตุ และความรุนแรงของโรค',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          isTreatmentCarousel: true,
          data: DATA_ELBOW.cubitalTreatment,
        };
      } else {
        msg = {
          _id: currentLength,
          text: 'การกดทับของเส้นประสาทอัลน่าบริเวณข้อศอกด้านข้าง',
          createdAt: new Date().getTime(),
          user: BOT_USER,
          isElbow: true,
          goBack: text,
          isInfoCarousel: true,
          data: DATA_ELBOW.cubital,
        };
      }
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
