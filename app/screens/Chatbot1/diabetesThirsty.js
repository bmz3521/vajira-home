import uuid from 'uuid-random';
import { saveMessage } from './firebaseHub';

import {
  showQuickReplies,
  showMap,
  showOptions,
  showWarning,
} from './diabetesBot';

export const getThirsty = async (currentLength, text, id) => {
  let msg;

  if (text == 'show thirsty') {
    const text = 'x';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fhigh_sugar.jpg?alt=media&token=5639e1c4-797e-4f46-a119-0a35db7fb80d';
    const reply = 'มีอาการ thirsty';
    const replyText = 'ต่อไป';
    msg = showWarning(currentLength + uuid(), text, image, reply, replyText);
  } else if (text == 'show options') {
    const cardHeight = 330;
    const text = 'ท่านมีอาการเบื้องต้นของผู้ป่วยเบาหวานที่มีน้ำตาลในเลือดสูง';
    const data = [
      {
        id: 0,
        title: 'มีเครื่องวัดระดับน้ำตาลในเลือด',
        option: 'มีเครื่องวัดระดับน้ำตาลในเลือด',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fglucose-monitor.jpg?alt=media&token=739937bd-c6ba-4992-9f4b-a376651185ef',
      },
      {
        id: 1,
        title: 'ไม่มีเครื่องวัดระดับน้ำตาลในเลือด',
        option: 'ไม่มีเครื่องวัดระดับน้ำตาลในเลือด',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fglucose-monitor-no.jpg?alt=media&token=9a5aa0de-337c-4a04-a74b-0a6b2c0469ab',
      },
    ];
    msg = showOptions(currentLength, text, data, cardHeight);
  } else if (text == 'show no blood glucose meter') {
    const text = 'ค้นหาสถานพยาบาล';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2FcheckAtHospital.png?alt=media&token=9f6c86f4-f372-4cf5-9eb2-30725368c08b';
    const map =
      'https://www.google.com/maps/search/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5';

    msg = showMap(currentLength, text, image, map);
  } else if (text == 'show blood glucose meter') {
    const text =
      'หลังจากท่านตรวจวัดระดับน้ำตาลในเลือดเรียบร้อยแล้ว\n\nกรุณาระบุระดับค่าน้ำตาล (หน่วย: mg/dL)';
    const values = [
      {
        title: 'ต่ำกว่า 300',
        value: 'ต่ำกว่า 300',
        bColor: '#008080',
        bgColor: '#008080',
      },
      {
        title: 'สูงกว่า 300',
        value: 'สูงกว่า 300',
        bColor: '#8B0000',
        bgColor: '#8B0000',
      },
    ];

    msg = showQuickReplies(currentLength, text, values);
  } else if (text == 'show normal glucose') {
    const cardHeight = 280;
    const noButton = true;

    const text = 'ท่านมีอาการเหล่านี้หรือไม่';
    const data = [
      {
        id: 0,
        title:
          'ดื่มน้ำเปล่าที่สะอาด ประมาณ\n1-2 แก้ว/ชั่วโมง (ยกเว้นกรณี\nมีโรคที่ต้องจำกัดปริมาณน้ำ\nเช่น ไต หัวใจ ปอด เป็นต้น',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fthirsty%2Fthirsty-tip1.jpg?alt=media&token=b30c0d5a-ceb3-4640-bbd7-2957d71f9e5a',
      },
      {
        id: 1,
        title: 'หลังจากนั้น ทุกๆ 4-6 ชั่วโมง\nตรวจวัดระดับน้ำตาลซ้ำ\n\n',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fthirsty%2Fthirsty-tip2.jpg?alt=media&token=b61ae10a-5ee7-4b75-88ca-afed29f15497',
      },
      {
        id: 2,
        title:
          'ถ้าระดับน้ำตาล >250 มก./ดล.\nสูงติดต่อกัน 2-3 วัน\nควรปรึกษาแพทย์\n',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fthirsty%2Fthirsty-tip3.jpg?alt=media&token=d249d71c-4496-459c-9155-2db6ed6af1cf',
      },
    ];
    msg = showOptions(currentLength, text, data, cardHeight, noButton);
  } else if (text == 'show high glucose followup') {
    const text =
      'มีอาการร่วม เช่น หอบเหนื่อย หายใจเร็วมากกว่า 30 ครั้ง/นาที, คลื่นไส้อาเจียน, หายใจมีกลิ่นเหม็นคล้ายผลไม้เน่า, ปวดท้อง';
    const values = [
      {
        title: 'ไม่มีอาการร่วม',
        value: 'ไม่มีอาการร่วม',
        bColor: '#008080',
        bgColor: '#008080',
      },
      {
        title: 'มีอาการร่วม',
        value: 'มีอาการร่วม',
        bColor: '#8B0000',
        bgColor: '#8B0000',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  }

  return msg;
};
