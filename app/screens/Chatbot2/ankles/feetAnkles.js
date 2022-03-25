import { BOT_USER, loadDepartments } from '../firebaseHub';
import { FEET_AND_ANKLES } from './data';

export const feetAnkles = async (currentLength, text, name) => {
  let msg;
  if (text === 'feet') {
    msg = radioGenerator(
      currentLength,
      'คุณเลือก ปัญหาของเท้าและข้อเท้า',
      FEET_AND_ANKLES.mainMenu,
    );
  } else if (text.search('ans') !== -1 || text === 'feet-question') {
    if (text === 'feet-question') {
      msg = radioGenerator(
        currentLength,
        'สอบถามอาการเบื้องต้น',
        FEET_AND_ANKLES.feetquestion,
      );
    } else {
      msg = feetQuestion(currentLength, text);
    }
  } else if (text.search('selfcares') !== -1) {
    msg = {
      _id: currentLength,
      text: 'การดูแลสุขภาพเท้า',
      createdAt: new Date().getTime(),
      user: BOT_USER,
      isSport: true,
      isOneColor: true,
      isScrollCarousel: true,
      goBack: text,
      data: FEET_AND_ANKLES.feetSalfCare,
    };
  } else if (text.search('cause') !== -1) {
    if (text === 'feet-cause-5-selfcare') {
      msg = {
        _id: currentLength,
        text: 'ข้อเท้าแพลง',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isOneColor: true,
        isScrollCarousel: true,
        goBack: text,
        data: FEET_AND_ANKLES.feetCause_5_self,
      };
    } else {
      msg = feetCause(currentLength, text);
    }
  }
  return msg;
};

const feetCause = (currentLength, text) => {
  let data;
  let textMessage = '';
  switch (text) {
    case 'feet-cause-1':
      textMessage = 'โรครองช้ำ';
      data = FEET_AND_ANKLES.feetCause_1;
      break;
    case 'feet-cause-2':
      textMessage = 'นิ้วหัวแม่เท้าเอียง';
      data = FEET_AND_ANKLES.feetCause_2;
      break;
    case 'feet-cause-3':
      textMessage = 'ตาปลาที่เท้า';
      data = FEET_AND_ANKLES.feetCause_3;
      break;
    case 'feet-cause-4':
      textMessage = 'โรคเก๊าท์';
      data = FEET_AND_ANKLES.feetCause_4;
      break;
    case 'feet-cause-5':
      return radioGenerator(
        currentLength,
        'การดูแลเบื้องต้นก่อนพบแพทย์',
        FEET_AND_ANKLES.feetCause_5,
      );
    case 'feet-cause-6':
      return {
        _id: currentLength,
        text: 'เท้าแบน​',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: FEET_AND_ANKLES.feetCause_6,
      };
    case 'feet-cause-7':
      return {
        _id: currentLength,
        text: 'เอ็นร้อยหวายอักเสบ',
        createdAt: new Date().getTime(),
        user: BOT_USER,
        isSport: true,
        isScrollCarousel: true,
        goBack: text,
        data: FEET_AND_ANKLES.feetCause_7,
      };
    default:
      return radioGenerator(
        currentLength,
        'โรคเกี่ยวกับเท้าและข้อเท้า',
        FEET_AND_ANKLES.feetCauseMenu,
      );
  }
  return {
    _id: currentLength,
    text: textMessage,
    createdAt: new Date().getTime(),
    isSport: true,
    goBack: text,
    isFAQSport: true,
    user: BOT_USER,
    data: data,
  };
};

const feetQuestion = (currentLength, text) => {
  let data;
  let textMessage = '';
  switch (text) {
    case 'feet-ans1':
      textMessage = 'เลือก อาการปวด';
      data = FEET_AND_ANKLES.feetquestion_1;
      break;
    case 'feet-ans1-1-finish':
      return normalText(currentLength, 'แนะนําพบศัลยแพทย์');
    case 'feet-ans1-2':
      textMessage = 'มีไข้';
      data = FEET_AND_ANKLES.feetquestion_1_2;
      break;
    case 'feet-ans1-3-finish':
      return normalText(currentLength, 'แนะนําพบแพทย์ประจําคอและหลัง');
    case 'feet-ans1-4-finish':
      return normalText(currentLength, 'แนะนําพบแพทย์ประจําเท้าและข้อเท้า');
    case 'feet-ans1-5-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำเท้าและข้อเท้า');
    case 'feet-ans1-2-1':
      textMessage = 'มีปวด แดง ร้อน';
      data = FEET_AND_ANKLES.feetquestion_1_2_1;
      break;
    case 'feet-ans1-2-1-1-finish':
      return normalText(currentLength, 'แนะนำพบศัลยแพทย์');
    case 'feet-ans1-2-1-2-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำเท้าและข้อเท้า');
    case 'feet-ans1-2-2-finish':
      return normalText(currentLength, 'แนะนําพบแพทย์แผนกฉุกเฉิน');
    case 'feet-ans2':
      textMessage = 'เลือก อาการบวม';
      data = FEET_AND_ANKLES.feetquestion_2;
      break;
    case 'feet-ans2-1':
      textMessage = '1 ข้าง';
      data = FEET_AND_ANKLES.feetquestion_2_1;
      break;
    case 'feet-ans2-1-1':
      textMessage = 'มีปวด แดง ร้อน';
      data = FEET_AND_ANKLES.feetquestion_2_1_1;
      break;
    case 'feet-ans2-1-1-1-finish':
      return normalText(currentLength, 'แนะนำพบศัลยแพทย์');
    case 'feet-ans2-1-1-2-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำเท้าและข้อเท้า');
    case 'feet-ans2-1-2-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำเท้าและข้อเท้า');
    case 'feet-ans2-1-3-finish':
      return normalText(currentLength, 'แนะนําพบแพทย์ประจําเท้าและข้อเท้า');
    case 'feet-ans2-2':
      textMessage = '2 ข้าง';
      data = FEET_AND_ANKLES.feetquestion_2_2;
      break;
    case 'feet-ans2-2-1-finish':
      return normalText(currentLength, 'แนะนำพบสูติแพทย์');
    case 'feet-ans2-2-2-finish':
      return normalText(currentLength, 'แนะนําพบอายุรแพทย์');
    case 'feet-ans2-2-3-finish':
      return normalText(currentLength, 'แนะนําพบแพทย์ประจําเท้าและข้อเท้า');
    case 'feet-ans3':
      textMessage = 'เลือก อาการชา';
      data = FEET_AND_ANKLES.feetquestion_3;
      break;
    case 'feet-ans3-1':
      textMessage = '1 ข้าง';
      data = FEET_AND_ANKLES.feetquestion_3_1;
      break;
    case 'feet-ans3-1-1-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์แผนกฉุกเฉิน');
    case 'feet-ans3-1-2-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำเท้าและข้อเท้า');
    case 'feet-ans3-1-3-finish':
      return normalText(currentLength, 'แนะนำพบอายุรแพทย์');
    case 'feet-ans3-2':
      textMessage = '2 ข้าง';
      data = FEET_AND_ANKLES.feetquestion_3_2;
      break;
    case 'feet-ans3-2-1-finish':
      return normalText(currentLength, 'แนะนําพบอายุรแพทย์');
    case 'feet-ans3-2-2-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำคอและหลัง');
    case 'feet-ans4':
      textMessage = 'เลือก เท้าหรือข้อเท้าผิดรูป';
      data = FEET_AND_ANKLES.feetquestion_4;
      break;
    case 'feet-ans4-1-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำเท้าและข้อเท้า');
    case 'feet-ans4-2-1-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์เวชศาสตร์ฟื้นฟู');
    case 'feet-ans4-2-2-finish':
      return normalText(currentLength, 'แนะนำพบแพทย์ประจำเท้าและข้อเท้า');
    case 'feet-ans4-2':
      textMessage = 'เลือก นิ้วเท้าเบี้ยว';
      data = FEET_AND_ANKLES.feetquestion_4_2;
      break;
    case 'feet-ans5-finish':
      return normalText(currentLength, 'แนะนำพบอายุรแพทย์');
    default:
      textMessage = 'สอบถามอาการเบื้องต้น';
      data = FEET_AND_ANKLES.feetquestion;
      break;
  }
  return radioGenerator(currentLength, textMessage, data);
};

const normalText = (currentLength, text) => {
  return {
    _id: currentLength,
    text,
    isGoBack: true,
    createdAt: new Date().getTime(),
    user: BOT_USER,
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
