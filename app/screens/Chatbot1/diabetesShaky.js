import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid-random';
import { NODE_ENV, saveMessage } from './firebaseHub';

import {
  showQuickReplies,
  showDanger,
  showGood,
  showWarning,
  showShakyOptions,
  showSugarOptions,
  showSugarWait,
  normalText,
} from './diabetesBot';

const collectionRef = `CHATBOT_HISTORY_${NODE_ENV}`;

function shakyOptions(option) {
  return [
    {
      id: 0,
      option,
      image:
        'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Foption1.jpg?alt=media&token=288895d6-4128-4460-92ae-993819bb8350',
    },
    {
      id: 1,
      option,
      image:
        'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Foption2.jpg?alt=media&token=b7b2d086-bf10-4fa6-acd5-d71ed8e9295f',
    },
    {
      id: 2,
      option,
      image:
        'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Foption3.jpg?alt=media&token=7eb776b1-5b03-401c-b3ba-66c8c41f677c',
    },
    {
      id: 3,
      option,
      image:
        'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Foption4.jpg?alt=media&token=d98e8906-ae72-4693-870b-830198c8199b',
    },
  ];
}

export const getShaky = async (currentLength, text, id, name) => {
  let msg;

  if (text == 'show shaky') {
    const text = 'ท่านมีเครื่องวัดระดับน้ำตาลในเลือดหรือไม่';
    const values = [
      {
        title: 'มีเครื่องวัดระดับน้ำตาล',
        value: 'มีเครื่องวัด shaky',
        bColor: '#27AE60',
        bgColor: '#27AE60',
      },
      {
        title: 'ไม่มีเครื่องวัดระดับน้ำตาล',
        value: 'ไม่มีเครื่องวัด shaky',
        bColor: '#EC7063',
        bgColor: '#EC7063',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);
  } else if (text == 'show shaky no measure') {
    const text =
      'ควรรับประทานอาหารหรือเครื่องดื่มที่มีคาร์โบโฮเดรต 15 กรัม โดยเลือกทานอย่างใดอย่างหนึ่ง';
    const data = shakyOptions('ไปสถานพยาบาล');
    msg = showSugarOptions(currentLength + uuid(), text, data);
  } else if (text == 'show shaky measure') {
    const text = 'ท่านมีอาการเบื้องต้นของผู้ป่วยเบาหวานที่มีน้ำตาลในเลือดต่ำ';
    const data = [
      {
        id: 0,
        title: 'วัดระดับน้ำตาลในเลือด',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fglucose-monitor.jpg?alt=media&token=739937bd-c6ba-4992-9f4b-a376651185ef',
      },
      // {
      //   id: 1,
      //   title: 'รักษาอาการเบื้องต้นด้วยตัวเอง',
      //   image:
      //     'https://firebasestorage.googleapis.com/v0/b/vajira-diabetes-chatbot.appspot.com/o/drink.png?alt=media&token=edfcb510-ca33-4052-8db0-ac54581dbf2e',
      // },
    ];
    msg = showShakyOptions(currentLength, text, data);
  } else if (text == 'show sugar blood check') {
    const text =
      'หลังจากท่านตรวจวัดระดับน้ำตาลในเลือดเรียบร้อยแล้ว\n\nกรุณาเลือกระดับค่าน้ำตาลในเลือด';
    const values = [
      {
        title: 'ต่ำกว่า 55 มก./ดล.\nหรือไม่รู้สึกตัว',
        value: 'ต่ำกว่า 55 หรือ ไม่รู้สึกตัว',
        bColor: '#CB4335',
        bgColor: '#FF7B7B',
        fColor: '#000000',
      },
      {
        title: 'ต่ำกว่า 70 มก./ดล. ',
        value: 'ต่ำกว่า 70',
        bColor: '#F39C12',
        bgColor: '#F7DC6F',
        fColor: '#000000',
      },
      {
        title: 'มากกว่า 70 มก./ดล. ',
        value: 'มากกว่า 70',
        bColor: '#229954',
        bgColor: '#82E0AA',
        fColor: '#000000',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);
  } else if (text == 'show shaky followup 1') {
    const text =
      'ต่ำกว่าหรือเท่ากับ 70 มก./ดล. (กรณีรู้สึกตัว)\nให้ปฎิบัติตามขั้นตอนดังนี้';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Frules15.jpg?alt=media&token=e4f26040-e9f0-42dd-ba5c-d71014799cbc';
    const reply = 'ต่อไป';
    const replyText = 'ต่อไป';
    msg = showWarning(currentLength + uuid(), text, image, reply, replyText);

    await firestore()
      .collection(collectionRef)
      .doc(id)
      .set(
        {
          userId: id,
          measureTime: 2,
        },
        { merge: true },
      );

    await saveMessage(msg, id);
  } else if (text == 'show shaky followup 2') {
    const text = 'โปรดเลือกหนึ่งรายการ';
    const data = shakyOptions('รอ 15 นาที');
    msg = showSugarOptions(currentLength + uuid(), text, data);

    await saveMessage(msg, id);
  } else if (text == 'show shaky wait') {
    const text = 'รออีก 15 นาที ให้ตรวจวัดน้ำตาลอีกรอบ';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fwait-time.jpg?alt=media&token=9ec7ce4b-b56f-41de-b501-ca8c2bd3f444';
    const reply = 'วัดระดับน้ำตาลในเลือดซ้ำ\n   (ครบ 15 นาทีแล้ว)';
    const replyText = 'วัดระดับน้ำตาลในเลือด';
    msg = showSugarWait(currentLength + uuid(), text, image, reply, replyText);
  } else if (text == 'show shaky followup 3') {
    let db = await firestore()
      .collection(collectionRef)
      .doc(id);

    let snapshot = await firestore()
      .collection(collectionRef)
      .where('userId', '==', id)
      .get();

    let times;

    snapshot.forEach(doc => {
      times = doc.data().measureTime;
      console.log(doc.data().measureTime);
    });

    if (times !== 2) {
      await db.set(
        {
          measureTime: 2,
        },
        { merge: true },
      );
    }

    const text = `โปรดระบุผลตรวจครั้งที่ ${times}`;
    const values = [
      {
        title: 'ต่ำกว่า 55 หรือ ไม่รู้สึกตัว',
        value: 'ต่ำกว่า 55 หรือ ไม่รู้สึกตัว',
        bColor: '#CB4335',
        bgColor: '#FF7B7B',
        fColor: '#000000',
      },
      {
        title: 'ต่ำกว่า 70',
        value: 'ต่ำกว่า 70',
        bColor: '#F39C12',
        bgColor: '#F7DC6F',
        fColor: '#000000',
      },
      {
        title: 'มากกว่า 70',
        value: 'มากกว่า 70',
        bColor: '#229954',
        bgColor: '#82E0AA',
        fColor: '#000000',
      },
    ];

    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  } else if (text == 'show shaky better') {
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

    await saveMessage(normalText('อาการดีขึ้น', id, name), id);
  } else if (text == 'show shaky bad') {
    const text = 'กรุณาทำการนัดหมายแพทย์';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fcritical.jpg?alt=media&token=37fb34fc-1514-42c5-ae89-275dccb79174';
    const ambulance = 'รถฉุกเฉิน 1669';
    const hotline = 'หน่วยกู้ชีพ 1554';
    const map =
      'https://www.google.com/maps/search/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5';

    msg = showDanger(currentLength, text, image, ambulance, hotline, map);

    await saveMessage(normalText('อาการไม่ดีขึ้น', id, name), id);
    // }
    // else if (text == 'show shaky followup 3') {
    //   const text =
    //     'แนะนำให้ท่านดื่มน้ำผลไม้ 200 cc เพิ่มอีก 1 กล่อง จากนั้นนอนพัก 15 นาที';
    //   const values = [
    //     {
    //       title: 'ไปดื่มน้ำผลไม้และนอนพักอีกคร้ัง',
    //       value: 'ไปดื่มน้ำผลไม้และนอนพักอีกคร้ัง',
    //       bColor: '#66A6FF',
    //       bgColor: '#66A6FF',
    //     },
    //   ];

    //   msg = showQuickReplies(currentLength + uuidv4(), text, values);

    //   await firestore()
    //     .collection('CHATBOT_HISTORY')
    //     .doc(id)
    //     .collection('MESSAGES')
    //     .add(msg);
    // } else if (text == 'show shaky followup 4') {
    //   const text = 'หลังจากนอนพักอีกรอบแล้ว อาการดีขึ้นไหมครับ';
    //   const values = [
    //     {
    //       title: 'อาการดีขึ้น',
    //       value: 'อาการดีขึ้น',
    //       bColor: '#008080',
    //       bgColor: '#008080',
    //     },
    //     {
    //       title: 'ไม่ดีขึ้น',
    //       value: 'ไม่ดีขึ้น',
    //       bColor: '#CD5C5C',
    //       bgColor: '#CD5C5C',
    //     },
    //   ];
    //   msg = showQuickReplies(currentLength + uuidv4(), text, values);

    //   await firestore()
    //     .collection('CHATBOT_HISTORY')
    //     .doc(id)
    //     .collection('MESSAGES')
    //     .add(msg);
  } else if (text == 'show self check') {
    const text =
      'แนะนำให้ท่านดื่มน้ำผลไม้ 200 cc จำนวน 1 กล่อง จากนั้นนอนพัก 15 นาที';
    const values = [
      {
        title: 'ไปดื่มน้ำผลไม้และนอนพัก',
        value: 'ไปดื่มน้ำผลไม้และนอนพัก',
        bColor: '#66A6FF',
        bgColor: '#66A6FF',
      },
    ];
    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  } else if (text == 'show self check followup 1') {
    const text = 'หลังจากนอนพักแล้ว ตอนนี้อาการดีขึ้นไหม';
    const values = [
      {
        title: 'อาการดีขึ้น',
        value: 'อาการดีขึ้น',
        bColor: '#008080',
        bgColor: '#008080',
      },
      {
        title: 'ยังคงมีอาการ',
        value: 'ยังคงมีอาการ',
        color: 'red',
        bColor: '#CD5C5C',
        bgColor: '#CD5C5C',
      },
    ];

    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  } else if (text == 'show self check followup 2') {
    const text =
      'แนะนำให้ท่านดื่มน้ำผลไม้ 200 cc เพิ่มอีก 1 กล่อง จากนั้นนอนพัก 15 นาที';
    const values = [
      {
        title: 'ไปดื่มน้ำผลไม้และนอนพักอีกคร้ัง',
        value: 'ไปดื่มน้ำผลไม้และนอนพักอีกคร้ัง',
        bColor: '#66A6FF',
        bgColor: '#66A6FF',
      },
    ];

    msg = showQuickReplies(currentLength + uuid(), text, values);

    await saveMessage(msg, id);
  }

  return msg;
};
