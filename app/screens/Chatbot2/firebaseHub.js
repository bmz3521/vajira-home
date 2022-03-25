import firestore from '@react-native-firebase/firestore';
import { departmentList } from '.';
import { getDoctors } from './doctors/doctors';
import { elbow } from './elbow/elbow';
import { handAndWrist } from './hand_wrist/handWrist';
import { shoulder } from './shoulder/shoulder';
import { sport } from './sports/sport';
import { orthoBone } from './ortho/ortho';
import { childOrtho } from './child/child';
import { feetAnkles } from './ankles/feetAnkles';
import { backache } from './backache/backache';
import { neckPain } from './neckpain/neckpain';
import { oncology } from './oncology/oncology';
import { kneepain } from './kneepain/kneepain';

const NODE_ENV = process.env.NODE_ENV;
// const NODE_ENV = 'development';

const botAvatar = require('../../assets/images/vajira-logo.png');
export const BOT_USER = {
  _id: 2,
  name: 'Vajira Bot',
  avatar: botAvatar,
};

const CHAT_TAG = 'ORTHO';

const MAIN_MENU = [
  {
    title: 'ปวดศอก',
    value: 'elbow',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'ปวดไหล่',
    value: 'shoulder',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'บาดเจ็บทางกีฬา',
    value: 'sports',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'มือและข้อมือ',
    value: 'hand',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'กระดูกหัก',
    value: 'fracture',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'กระดูกพรุน',
    value: 'osteoporosis',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'โรคกระดูกและข้อในเด็ก',
    value: 'childs',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'ปัญหาของเท้าและข้อเท้า',
    value: 'feet',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'ปวดหลัง',
    value: 'backache',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'ปวดคอ',
    value: 'neckpain',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'เนื้องอกระบบกระดูก\nและเนื้อเยื่อเกี่ยวพัน',
    value: 'oncology',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
  {
    title: 'ปวดเข่า',
    value: 'kneepain',
    bColor: '#66A6FF',
    bgColor: '#66A6FF',
  },
];

export const saveMessage = async (payload, id) => {
  await firestore()
    .collection(`CHATBOT_HISTORY_${NODE_ENV}`)
    .doc(id.toString())
    .set({ createdAt: new Date().getTime() }); // NOTE init doc
  await firestore()
    .collection(`CHATBOT_HISTORY_${NODE_ENV}`)
    .doc(id.toString())
    .collection(`MESSAGES_${CHAT_TAG}`)
    .add({ ...payload });
  return payload.text || '';
};

export const loadDepartments = () => {
  return firestore()
    .collection('CHATBOT_DATA')
    .doc('main')
    .get()
    .then(snapshot => {
      let department = snapshot.data().department.map(e => {
        const title = e.title;
        const image = e.image;
        const keyword = e.keyword;
        return { title, image, keyword };
      });

      return department;
    });
};

export const loadFallback = currentLength => {
  const image =
    'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fline.png?alt=media&token=63373233-54cd-45cb-acce-aafaf7374a50';

  const line = 'https://lin.ee/gymFOp1';

  return {
    _id: currentLength,
    text: `สอบถามเจ้าหน้าที่`,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    isURI: true,
    image,
    line,
  };
};

export const mainMenu = currentLength => {
  return {
    _id: currentLength,
    text: `โปรดเลือกรายการที่ต้องการ`,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio',
      keepIt: true,
      values: MAIN_MENU,
    },
  };
};

export const loadPreviousData = (userId, userName) => {
  const greetingMessage = {
    _id: 1,
    text: `สวัสดีครับคุณ ${userName}\n\nโปรดเลือกรายการที่ต้องการ`,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: MAIN_MENU,
    },
  };

  return firestore()
    .collection(`CHATBOT_HISTORY_${NODE_ENV}`)
    .doc(userId)
    .collection(`MESSAGES_${CHAT_TAG}`)
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get()
    .then(async snapshot => {
      let messages = await Promise.all(
        snapshot.docs.map(async doc => {
          const firebaseData = doc.data();
          let data;
          if (firebaseData.user._id == 2 && firebaseData.user.avatar) {
            let msg;
            const text = firebaseData.text;
            const currentLength = firebaseData._id;
            if (text === 'main') {
              msg = mainMenu(currentLength);
            } else if (text.split('-')[0] === 'elbow') {
              msg = await elbow(currentLength, text, userName);
            } else if (text.split('-')[0] === 'shoulder') {
              msg = await shoulder(currentLength, text, userName);
            } else if (text.split('-')[0] === 'sports') {
              msg = sport(currentLength, text, userName);
            } else if (text.split('-')[0] === 'kneepain') {
              msg = await kneepain(currentLength, text, userName);
            } else if (text.split('-')[0] === 'hand') {
              msg = await handAndWrist(currentLength, text, userName);
            } else if (text.split('-')[0] === 'backache') {
              msg = await backache(currentLength, text, userName);
            } else if (text.split('-')[0] === 'childs') {
              msg = await childOrtho(currentLength, text, userName);
            } else if (text.split('-')[0] === 'oncology') {
              msg = await oncology(currentLength, text, userName);
            } else if (text.split('-')[0] === 'neckpain') {
              msg = await neckPain(currentLength, text, userName);
            } else if (
              text.split('-')[0] === 'fracture' ||
              text.split('-')[0] === 'osteoporosis'
            ) {
              msg = orthoBone(currentLength, text, userName);
            } else if (text.split('-')[0] === 'feet') {
              msg = await feetAnkles(currentLength, text, userName);
            } else if (departmentList.includes(text)) {
              msg = await getDoctors(currentLength, text);
            } else {
              msg = loadFallback(currentLength);
            }
            msg._id = doc.id;
            data = msg;
          } else {
            data = {
              _id: doc.id,
              text: doc.text,
              createdAt: new Date().getTime(),
              ...firebaseData,
            };
          }
          return data;
        }),
      );

      var isFollowup = messages[0].user._id == 2;

      if (messages.length > 0 && isFollowup) {
        messages.push(greetingMessage);
      } else if (messages.length > 0 && !isFollowup) {
        messages.unshift(greetingMessage);
      }

      return messages;
    })
    .catch(function(err) {
      console.log(`First conversation initiated. ${err}`);
      return [greetingMessage];
    });
};
