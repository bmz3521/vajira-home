import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid-random';
import { NODE_ENV, saveMessage } from './firebaseHub';

import {
  showQuickReplies,
  showWarning,
  showMap,
  showGood,
  showDanger,
} from './diabetesBot';

const collectionRef = `CHATBOT_HISTORY_${NODE_ENV}`;

export const getDiabetesMain = async (currentLength, text, id) => {
  let msg;

  if (text == 'diabetes') {
    const text = 'วันนี้มีอาการเป็นอย่างไรบ้าง';
    const values = [
      {
        title: 'หวิวๆ ใจสั่น มือสั่น หิวมาก',
        value: 'หวิวๆ ใจสั่น มือสั่น หิวมาก',
        bColor: '#DC7633',
        bgColor: '#F0B27A',
        fColor: '#000000',
      },
      {
        title: 'ปากแห้ง กระหายน้ำ ฉี่บ่อย',
        value: 'ปากแห้ง กระหายน้ำ ฉี่บ่อย',
        bColor: '#9B59B6',
        bgColor: '#D7BDE2',
        fColor: '#000000',
      },
      {
        title: 'เวียนศีรษะ',
        value: 'เวียนศีรษะ',
        bColor: '#27AE60',
        bgColor: '#ABEBC6',
        fColor: '#000000',
      },
      {
        title: 'ไข้สูงมากกว่า 37.8 องศา',
        value: 'ไข้สูงมากกว่า 37.8 องศา',
        bColor: '#E74C3C',
        bgColor: '#F1948A',
        fColor: '#000000',
      },
    ];
    msg = showQuickReplies(currentLength, text, values);
  } else if (text == 'show main danger') {
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
    });

    if (times !== undefined) {
      await db.set(
        {
          measureTime: 0,
        },
        { merge: true },
      );
    }

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
  } else if (text == 'show main warning') {
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
    });

    if (times === 2) {
      await db.set(
        {
          measureTime: 0,
        },
        { merge: true },
      );

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
    } else {
      const text = 'ต่ำกว่า 70 มก./ดล. และร่วมกับอาการ';
      const image =
        'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Flow_sugar.jpg?alt=media&token=d98bc557-10f0-42ec-b54f-5cfe62d747f2';
      const reply = 'มีอาการร่วมดังกล่าว';
      const replyText = 'ต่อไป';
      msg = showWarning(currentLength + uuid(), text, image, reply, replyText);

      await saveMessage(msg, id);
    }
  } else if (text == 'show main good') {
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
    });

    if (times !== undefined) {
      await db.set(
        {
          measureTime: 0,
        },
        { merge: true },
      );
    }

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
  } else if (text == 'show main hospitals') {
    const text = 'ค้นหาสถานพยาบาล';
    const image =
      'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2FcheckAtHospital.png?alt=media&token=9f6c86f4-f372-4cf5-9eb2-30725368c08b';
    const map =
      'https://www.google.com/maps/search/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%A2%E0%B8%B2%E0%B8%9A%E0%B8%B2%E0%B8%A5';
    msg = showMap(currentLength, text, image, map);
  }

  return msg;
};
