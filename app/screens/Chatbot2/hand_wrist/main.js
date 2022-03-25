const botAvatar = require('../../../assets/images/vajira-logo.png');

const BOT_USER = {
  _id: 2,
  name: 'Vajira Bot',
  avatar: botAvatar,
};

export function main(currentLength, text, name) {
  var msg = {
    _id: currentLength,
    text: `คุณเลือก ${text}`,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio',
      keepIt: true,
      values: [
        {
          title: 'อาการผิดปกติ',
          value: 'hand-cause',
          bColor: '#27AE60',
          bgColor: '#ABEBC6',
          fColor: '#000000',
        },
        {
          title: 'คำถามก่อนมาพบแพทย์',
          value: 'hand-question',
          bColor: '#DC7633',
          bgColor: '#F0B27A',
          fColor: '#000000',
        },
        // {
        //   title: 'การรักษาเบื้องต้น',
        //   value: 'hand-selfcare',
        //   bColor: '#9B59B6',
        //   bgColor: '#D7BDE2',
        //   fColor: '#000000',
        // },
        {
          title: 'แพทย์เฉพาะทาง',
          value: 'hand-department',
          bColor: '#E74C3C',
          bgColor: '#F1948A',
          fColor: '#000000',
        },
      ],
    },
  };

  return msg;
}
