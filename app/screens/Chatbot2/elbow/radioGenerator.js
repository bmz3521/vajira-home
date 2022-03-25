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
        type == 'anterior'
          ? anterior
          : type == 'posterior'
          ? posterior
          : type == 'lateral'
          ? lateral
          : medial,
    },
  };
}

const anterior = [
  {
    id: 0,
    title: 'การขาดของเอ็นกล้ามเนื้อไบเซพส่วนปลาย (Distal bicep tendon rupture)',
    value: 'elbow-anterior-distal',
    bColor: '#5BC2C3',
    bgColor: '#79e0e0',
    fColor: '#000000',
  },
  {
    id: 1,
    title: 'การกดทับเส้นประสาทมีเดียนบริเวณข้อศอก (Pronator syndrome)',
    value: 'elbow-anterior-pronator',
    bColor: '#edb62d',
    bgColor: '#F8E0A0',
    fColor: '#000000',
  },
];

const posterior = [
  {
    id: 0,
    title: ' ถุงน้ำเบอร์ซ่าของข้อศอก อักเสบ (Olecranon bursitis)',
    value: 'elbow-posterior-olecranon',
    bColor: '#5BC2C3',
    bgColor: '#79e0e0',
    fColor: '#000000',
  },
  {
    id: 1,
    title: 'อักเสบเอ็นกล้ามเนื้อหลังต้นแขนไตรเซป (triceps tendonitis)',
    value: 'elbow-posterior-triceps',
    bColor: '#edb62d',
    bgColor: '#F8E0A0',
    fColor: '#000000',
  },
];

const lateral = [
  {
    id: 0,
    title:
      'การอักเสบของเอ็นกล้ามเนื้อด้านข้างส่วนนอกข้อศอก (Lateral epicondylitis / Tennis elbow)',
    value: 'elbow-lateral-tennis',
    bColor: '#5BC2C3',
    bgColor: '#79e0e0',
    fColor: '#000000',
  },
];

const medial = [
  {
    id: 0,
    title:
      'การอักเสบของเอ็นกล้ามเนื้อด้านข้างส่วนในข้อศอก (Medial epicondylitis / Golfer’s elbow)',
    value: 'elbow-medial-golfer',
    bColor: '#5BC2C3',
    bgColor: '#79e0e0',
    fColor: '#000000',
  },
  {
    id: 1,
    title:
      'การกดทับของเส้นประสาทอัลน่าบริเวณข้อศอกด้านข้าง (Cubital tunnel syndrome)',
    value: 'elbow-medial-cubital',
    bColor: '#edb62d',
    bgColor: '#F8E0A0',
    fColor: '#000000',
  },
];
