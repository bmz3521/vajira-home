const botAvatar = require('../../../assets/images/vajira-logo.png');

const BOT_USER = {
  _id: 2,
  name: 'Vajira Bot',
  avatar: botAvatar,
};

export async function radioGenerator(currentLength, type) {
  return {
    _id: currentLength,
    text: `โปรดเลือกอาการ`,
    createdAt: new Date().getTime(),
    user: BOT_USER,
    quickReplies: {
      type: 'radio',
      keepIt: true,
      values:
        type == 'lessthan6'
          ? lessthan6
          : type == 'between6and12'
            ? between6and12
            : morethan12,
    },
  };
}

const lessthan6 = [
  {
    id: 0,
    title: 'กระดูกอ่อนลาบรัมฉีกขาด \n(Labral Tear)',
    value: 'shoulder-lessthan6-labral',
    bColor: '#5BC2C3',
    bgColor: '#79e0e0',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
  {
    id: 1,
    title: 'เส้นเอ็นไหล่ฉีกขาด \n(Acute Rotator Cuff Tears)',
    value: 'shoulder-lessthan6-acute',
    bColor: '#edb62d',
    bgColor: '#F8E0A0',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
  {
    id: 2,
    title: 'ข้อไหล่เคลื่อน \n(Shoulder Dislocation)',
    value: 'shoulder-lessthan6-dislocation',
    bColor: '#a2a7bb',
    bgColor: '#cdced3',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
];

const between6and12 = [
  {
    id: 0,
    title: 'เส้นเอ็นข้อไหล่ \n(Rotator Cuff Syndrome)',
    value: 'shoulder-between6and12-rotator',
    bColor: '#5BC2C3',
    bgColor: '#79e0e0',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
  {
    id: 1,
    title: 'เส้นเอ็นของกล้ามเนื้อ Biceps\n (Biceps Tendinitis)',
    value: 'shoulder-between6and12-biceps',
    bColor: '#edb62d',
    bgColor: '#F8E0A0',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
  {
    id: 2,
    title: 'ภาวะไหล่ติด \n(Adhesive Capsulitis / Frozen Shoulder)',
    value: 'shoulder-between6and12-adhesive',
    bColor: '#a2a7bb',
    bgColor: '#cdced3',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
  {
    id: 3,
    title: 'ถุงน้ำอักเสบ \n(Subacromial Cursitis)',
    value: 'shoulder-between6and12-subacromial',
    bColor: '#26a872',
    bgColor: '#88c2aa',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
];

const morethan12 = [
  {
    id: 0,
    title: 'ข้อไหล่เสื่อม \n(Shoulder Osteoarthritis)',
    value: 'shoulder-morethan12-osteo',
    bColor: '#5BC2C3',
    bgColor: '#79e0e0',
    fColor: '#000000',
    txtStyle: { textAlign: 'center' }
  },
];
