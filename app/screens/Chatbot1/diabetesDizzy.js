import uuid from 'uuid-random';

import {
  showQuickReplies,
  showDanger,
  showGood,
  showAppointment,
} from './diabetesBot';

import { saveMessage } from './firebaseHub';

export const getDizzy = async (currentLength, text, id) => {
  let msg;

  if (text == 'show dizzy') {
    const text = 'มีอาการร่วมดังนี้ ปากเบี้ยว ชา หรือแขนขาอ่อนแรงซีกใดซีกหนึ่ง';
    const values = [
      {
        title: 'ไม่มีอาการ',
        value: 'ไม่ปากเบี้ยว',
        bColor: '#D4AC0D',
        bgColor: '#D4AC0D',
      },
      {
        title: 'มีอาการ',
        value: 'มีอาการร่วม',
        bColor: '#EC7063',
        bgColor: '#EC7063',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  } else if (text == 'show dizzy pressure options') {
    const text = 'ท่านควรทำการตรวจวัดความดัน';
    const values = [
      {
        title: 'มีเครื่องตรวจความดัน',
        value: 'มีเครื่องตรวจความดัน',
        bColor: '#27AE60',
        bgColor: '#27AE60',
      },
      {
        title: 'ไม่มีเครื่องตรวจความดัน',
        value: 'ไม่มีเครื่องตรวจความดัน',
        bColor: '#EC7063',
        bgColor: '#EC7063',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);
  } else if (text == 'show dizzy pressure') {
    const text = 'กรุณาระบุระดับค่าความดันโลหิต ทั้งค่าตัวบนและล่าง';
    const values = [
      {
        title: 'ระหว่าง 90/60-140/90',
        value: 'ระหว่าง 90/60-140/90',
        bColor: '#27AE60',
        bgColor: '#27AE60',
      },
      {
        title: 'สูงกว่า 160/100',
        value: 'สูงกว่า 160/100',
        bColor: '#EC7063',
        bgColor: '#EC7063',
      },
      {
        title: 'ต่ำกว่า 90/60',
        value: 'ต่ำกว่า 90/60',
        bColor: '#27AE60',
        bgColor: '#27AE60',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);
  } else if (text == 'show dizzy good') {
    const data = [
      {
        id: 0,
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fs1.jpg?alt=media&token=63eb6fe7-5612-466d-a650-a006733f7f08',
      },
      {
        id: 1,
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fs2.jpg?alt=media&token=805fd821-69f1-48fa-84f8-d3241b933956',
      },
      {
        id: 2,
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fs3.jpg?alt=media&token=0955ba27-85ec-416b-ad6c-bab094dabb91',
      },
      {
        id: 3,
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fs4.jpg?alt=media&token=f7b118a3-6944-4275-9799-b51358b1be3a',
      },
    ];
    msg = showGood(currentLength, data);
  } else if (text == 'show dizzy followup 1') {
    const text = 'ขอให้ท่านนอนพัก 15 นาที';
    const values = [
      {
        title: 'ไปนอนพัก 15 นาที',
        value: 'ไปนอนพัก 15 นาที',
        bColor: '#A0522D',
        bgColor: '#A0522D',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  } else if (text == 'show dizzy followup 2') {
    const text = 'หลังจากนอนพักเรียบร้อยแล้ว ขอให้ท่านวัดความดันซ้ำอีกครั้ง';
    const values = [
      {
        title: 'ระหว่าง 90/60-140/90',
        value: 'ระหว่าง 90/60-140/90',
        bColor: '#27AE60',
        bgColor: '#27AE60',
      },
      {
        title: 'สูงกว่า 160/100',
        value: 'นัดหมายแพทย์',
        bColor: '#EC7063',
        bgColor: '#EC7063',
      },
      {
        title: 'ต่ำกว่า 90/60',
        value: 'ต่ำกว่า 90/60',
        bColor: '#27AE60',
        bgColor: '#27AE60',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  } else if (text == 'show dizzy danger') {
    const text = 'กรุณาทำการนัดหมายแพทย์';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fcritical.jpg?alt=media&token=37fb34fc-1514-42c5-ae89-275dccb79174';
    const ambulance = 'รถฉุกเฉิน 1669';
    const hotline = 'หน่วยกู้ชีพ 1554';
    const hospital = 'นำส่งโรงพยาบาลใกล้บ้าน';
    const map =
      'https://www.google.com/maps/search/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5';
    msg = showDanger(
      currentLength,
      text,
      image,
      ambulance,
      hotline,
      hospital,
      map,
    );
  } else if (text == 'show dizzy appointment') {
    const text = 'กรุณาทำการนัดหมายแพทย์';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fcritical.jpg?alt=media&token=37fb34fc-1514-42c5-ae89-275dccb79174';
    const appointment = 'นำส่งโรงพยาบาลใกล้บ้าน';
    const map =
      'https://www.google.com/maps/search/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5';
    msg = showAppointment(currentLength, text, image, appointment, map);
  }
  return msg;
};
