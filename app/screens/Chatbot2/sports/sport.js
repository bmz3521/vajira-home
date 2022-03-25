import { BOT_USER } from '../firebaseHub';
import { DATA_SPORT } from './data';
import { main } from './main';

export const sport = (currentLength, text, name) => {
  let msg;
  if (text === 'sports') {
    text = 'บาดเจ็บทางกีฬา';
    return main(currentLength, text, name);
  }

  if (text.search('question') != -1) {
    msg = {
      _id: currentLength,
      text: 'คนไข้ควรเตรียมคำตอบเพื่อให้แพทย์วินิจฉัย ดังนี้',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isElbow: true,
      isQuestionCarousel: true,
      data: DATA_SPORT.selfcheckQuestions,
    };
  } else if (text.search('muscle') != -1) {
    /** NOTE Sport injury Muscle  */
    if (text.search('strain') != -1) {
      msg = {
        _id: currentLength,
        text: 'กล้ามเนื้อฉีก (Muscle strain)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleStrain,
      };
    } else if (text.search('soreness') != -1) {
      msg = {
        _id: currentLength,
        text: `กล้ามเนื้อระบม (Muscle soreness)​`,
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleSoreness,
      };
    } else if (text.search('contusion') != -1) {
      msg = {
        _id: currentLength,
        text: 'กล้ามเนื้อฟกช้ำ (Muscle contusion)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleContusion,
      };
    } else if (text.search('cramp') != -1) {
      msg = {
        _id: currentLength,
        text: 'ตะคริว (Muscle cramp)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleCramp,
      };
    } else {
      msg = {
        _id: currentLength,
        text: 'โปรดเลือกรายการที่ต้องการ',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: DATA_SPORT.muscleMenu,
        },
      };
    }
  } else if (text.search('should') != -1) {
    /** NOTE Sport injury Shoulder  */
    if (text.search('dislocation') != -1) {
      msg = {
        _id: currentLength,
        text: 'ข้อไหล่หลุด (Shoulder dislocation)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleShDislocation,
      };
    } else if (text.search('shFracture') != -1) {
      msg = {
        _id: currentLength,
        text: 'กระดูกหัก (Fracture)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleShFracture,
      };
    } else if (text.search('shBicipitalTendinitis') != -1) {
      msg = {
        _id: currentLength,
        text: 'เอ็นกล้ามเนื้อ Bicep อักเสบ (Bicipital tendinitis)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleShBicipitalTendinitis,
      };
    } else if (text.search('shSubacromialBursitis') != -1) {
      msg = {
        _id: currentLength,
        text: 'ถุงน้ำที่หัวไหล่อักเสบ (Subacromial bursitis)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleShSubacromialBursitis,
      };
    } else if (text.search('shGlenoidLabrumTear') != -1) {
      msg = {
        _id: currentLength,
        text: 'กระดูกอ่อนลาบรัมฉีกขาด (Glenoid labrum tear)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleShGlenoidLabrumTear,
      };
    } else if (text.search('shRotatorCuffTear') != -1) {
      msg = {
        _id: currentLength,
        text: 'เอ็นกล้ามเนื้อหุ้มข้อไหล่ขาด (Rotator cuff tear)​',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleShRotatorCuffTear,
      };
    } else {
      msg = {
        _id: currentLength,
        text: `โปรดเลือกรายการที่ต้องการ`,
        createdAt: new Date().getTime(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: DATA_SPORT.shuolderMenu,
        },
      };
    }
  } else if (text.search('knee') != -1) {
    /** NOTE Sport injury Knee  */
    if (text.search('knCruciateLigament') != -1) {
      msg = {
        _id: currentLength,
        text: 'เอ็นไขว้ข้อเข่าบาดเจ็บ (Cruciate ligament injury)​',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleKnCruciateLigament,
      };
    } else if (text.search('knMeniscal') != -1) {
      msg = {
        _id: currentLength,
        text: 'หมอนข้อเข่าบาดเจ็บ (Meniscal injury)​​',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleKnMeniscal,
      };
    } else if (text.search('knDislocation') != -1) {
      msg = {
        _id: currentLength,
        text: 'ข้อเข่าเคลื่อน (Knee dislocation)​',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleKnDislocation,
      };
    } else if (text.search('knTibiaOrFibulaFracture') != -1) {
      msg = {
        _id: currentLength,
        text: 'กระดูกแข้งหัก (Tibia or fibula fracture)​',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleKnTibiaOrFibulaFracture,
      };
    } else {
      msg = {
        _id: currentLength,
        text: 'โปรดเลือกรายการที่ต้องการ',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: DATA_SPORT.kneeMenu,
        },
      };
    }
  } else if (text.search('foot') != -1) {
    /** NOTE Sport injury Foot  */
    if (text.search('ftFracture') != -1) {
      msg = {
        _id: currentLength,
        text: 'กระดูกเท้าหัก (Fracture)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleFtFracture,
      };
    } else if (text.search('ftLisfranc') != -1) {
      msg = {
        _id: currentLength,
        text: 'เอ็นกระดูกเท้าบาดเจ็บ (Lisfranc injury)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleftLisfranc,
      };
    } else {
      msg = {
        _id: currentLength,
        text: 'โปรดเลือกรายการที่ต้องการ',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: DATA_SPORT.footMenu,
        },
      };
    }
  } else if (text.search('ankle') != -1) {
    /** NOTE Sport injury Ankle  */
    if (text.search('anSprain') != -1) {
      msg = {
        _id: currentLength,
        text: 'ข้อเท้าแพลง (Ankle sprain)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleAnSprain,
      };
    } else if (text.search('anFracture') != -1) {
      msg = {
        _id: currentLength,
        text: 'กระดูกข้อเท้าหัก (Fracture)',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: DATA_SPORT.muscleAnFracture,
      };
    } else {
      msg = {
        _id: currentLength,
        text: 'โปรดเลือกรายการที่ต้องการ',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: DATA_SPORT.ankleMenu,
        },
      };
    }
  } else if (text.search('running') != -1) {
    /** NOTE Sport injury Running */
    msg = {
      _id: currentLength,
      text: 'คําถามที่พบบ่อยจากการวิ่ง',
      createdAt: new Date().getTime(),
      isSport: true,
      isFAQSport: true,
      user: BOT_USER,
      data: DATA_SPORT.runningFaqMenu,
    };
  } else {
    return main(currentLength, text, name);
  }

  return msg;
};
