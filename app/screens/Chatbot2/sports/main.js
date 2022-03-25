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
    isSport: true,
    isMainMenuSport: true,
    data: mainMenuSport,
  };

  return msg;
}

const mainMenuSport = [
  {
    title: 'บาดเจ็บกล้ามเนื้อ \n(Muscle injury)',
    value: 'sports-muscle',
    bColor: '#9B59B6',
    bgColor: '#D7BDE2',
    fColor: '#000000',
    img: require('../images/sport-muscle.jpg'),
  },
  {
    title: 'บาดเจ็บข้อไหล่ \n(Shoulder injury)',
    value: 'sports-should',
    bColor: '#27AE60',
    bgColor: '#ABEBC6',
    fColor: '#000000',
    img: require('../images/sport-shoulder.jpg'),
  },
  {
    title: 'บาดเจ็บเข่า \n(Knee injury)',
    value: 'sports-knee',
    bColor: '#E74C3C',
    bgColor: '#F1948A',
    fColor: '#000000',
    img: require('../images/sport-knee.jpg'),
  },
  {
    title: 'บาดเจ็บข้อเท้า \n(Ankle injury)',
    value: 'sports-ankle',
    bColor: '#27AE60',
    bgColor: '#ABEBC6',
    fColor: '#000000',
    img: require('../images/sport-ankle.jpg'),
  },
  {
    title: 'บาดเจ็บเท้า \n(Foot injury)',
    value: 'sports-foot',
    bColor: '#9B59B6',
    bgColor: '#D7BDE2',
    fColor: '#000000',
    img: require('../images/sport-foot.jpg'),
  },
  {
    title: 'บาดเจ็บจากการวิ่ง \n(Running injury)',
    value: 'sports-running',
    bColor: '#DC7633',
    bgColor: '#F0B27A',
    fColor: '#000000',
    img: require('../images/sport-running.jpg'),
  },
  {
    title: '\nคำถามก่อนมาพบแพทย์',
    value: 'sports-question',
    bColor: '#DC7633',
    bgColor: '#F0B27A',
    fColor: '#000000',
    img: require('../images/sport-question.jpg'),
  },
];
