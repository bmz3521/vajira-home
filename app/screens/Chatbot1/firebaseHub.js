import firestore from '@react-native-firebase/firestore';

export const NODE_ENV = process.env.NODE_ENV;
// export const NODE_ENV = 'development';

const botAvatar = require('../../assets/images/vajira-logo.png');
const BOT_USER = {
  _id: 2,
  name: 'Vajira Bot',
  avatar: botAvatar,
};
const CHAT_TAG = 'DIABETES';

export const saveMessage = async (payload, id) => {
  await firestore()
    .collection(`CHATBOT_HISTORY_${NODE_ENV}`)
    .doc(id.toString())
    .set({ createdAt: new Date().getTime() }); // NOTE init doc
  await firestore()
    .collection(`CHATBOT_HISTORY_${NODE_ENV}`)
    .doc(id.toString())
    .collection(`MESSAGES_${CHAT_TAG}`)
    .add(payload);

  return payload.text || '';
};

export const loadFallback = currentLength => {
  return {
    _id: currentLength,
    text: `ขออภัย แชทบอทอยู่ระหว่างการเรียนรู้ โปรดเลือกรายการที่ต้องการ`,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'ฉันเป็นผู้ป่วยโรคเบาหวาน',
          value: 'ฉันเป็นผู้ป่วยโรคเบาหวาน',
          bColor: '#66A6FF',
          bgColor: '#66A6FF',
        },
      ],
    },
  };
};

export const loadPreviousData = (userId, userName) => {
  const greetingMessage = {
    _id: 1,
    text: `สวัสดีค่ะคุณ ${userName}\n\nโปรดเลือกรายการที่ต้องการ`,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'ฉันเป็นผู้ป่วยโรคเบาหวาน',
          value: 'ฉันเป็นผู้ป่วยโรคเบาหวาน',
          bColor: '#66A6FF',
          bgColor: '#66A6FF',
        },
      ],
    },
  };

  return firestore()
    .collection(`CHATBOT_HISTORY_${NODE_ENV}`)
    .doc(userId)
    .collection(`MESSAGES_${CHAT_TAG}`)
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get()
    .then(snapshot => {
      let messages = snapshot.docs.map(doc => {
        const firebaseData = doc.data();
        const data = {
          _id: doc.id,
          text: doc.text,
          createdAt: new Date().getTime(),
          ...firebaseData,
        };

        if (!firebaseData.system) {
          data.user = {
            ...firebaseData.user,
            name: firebaseData.user.name,
          };
        }
        return data;
      });

      var isFollowup = messages[0].user._id == 2;

      return messages;
    })
    .catch(function(err) {
      console.log(`First conversation initiated. ${err}`);
      return [greetingMessage];
    });
};
