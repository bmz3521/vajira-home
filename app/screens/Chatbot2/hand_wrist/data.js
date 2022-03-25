export const DATA_HAND_WRIST = {
  selfcheckQuestions: [
    {
      id: 0,
      name: 'ระยะเวลาที่มีอาการ (วัน/สัปดาห์/เดือน/ปี)',
    },
    {
      id: 1,
      name:
        'ระดับความรุนแรงคะแนนเต็ม 10 ให้กี่คะแนน(0 คือไม่ปวด 10 คือปวดมากที่สุด)',
    },
    { id: 2, name: 'ข้างที่มีอาการ (ข้างเดียว/สองข้าง)' },
    {
      id: 3,
      name:
        'ตําแหน่งที่มีอาการ เช่น ข้อมือ(ฝั่งนิ้วหัวแม่มือ/ฝั่งนิ้วก้อย) มือ(ฝ่ามือ/หลังมือ) นิ้วมือ',
    },
    { id: 4, name: 'อาการเมื่อขยับหรือเคลื่อนไหว (มากขึ้น/ลดลง/เท่าเดิม)' },
    { id: 5, name: 'อาการติดขัดเวลาขยับ' },
    {
      id: 6,
      name:
        'อาการอื่น ๆ ที่ร่วมด้วย เช่น ปวด ชา อ่อนแรง ไข้ บวม อุ่น อาการที่ตําแหน่งอื่น ๆ',
    },
    { id: 7, name: 'ประวัติอุบัติเหตุ/บาดเจ็บ' },
    { id: 8, name: 'ประวัติการรักษาก่อนหน้า (ใช้ยา/ผ่าตัด)' },
  ],

  subMenu: [
    {
      title: 'อาการปวดข้อมือ',
      value: 'hand-pain-wrist',
      bColor: '#93B5C6',
      bgColor: '#C9CCD5',
      fColor: '#000000',
      img: require('../images/wrist_pain.jpg'),
    },
    {
      title: 'อาการปวดมือ',
      value: 'hand-pain-hands',
      bColor: '#C3BA85',
      bgColor: '#DAD5AB',
      fColor: '#000000',
      img: require('../images/hand_pain.jpg'),
    },
    {
      title: 'อาการมือชา​',
      value: 'hand-beri',
      bColor: '#edb62d',
      bgColor: '#F8E0A0',
      fColor: '#000000',
      img: require('../images/hand-numb.jpg'),
    },
  ],

  wristPainMenu: [
    {
      title: "ภาวะเส้นเอ็นอักเสบที่ข้อมือ \n(De Quervain's tenosynovitis)",
      value: 'hand-pain-wrist-tenosynovitis',
      bColor: '#5BC2C3',
      bgColor: '#79e0e0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
    {
      title: 'ข้อมือเสื่อม \n(Wrist osteoarthritis)​',
      value: 'hand-pain-wrist-osteoarthritis',
      bColor: '#edb62d',
      bgColor: '#F8E0A0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
  ],

  /** NOTE Wrist pain content */

  wristPainTenosynovitis: {
    content: [
      {
        title: 'คืออะไร',
        desc: [
          'ภาวะปลอกหุ้มเอ็นข้อมือด้านนิ้วหัวแม่มืออักเสบหนาตัวขึ้น',
          'มักพบในช่วงอายุ 20 - 50 ปี ที่มีการใช้งานข้อมือในลักษณะบิดกางมือบิดข้อมือ ค่อนข้างมาก',
        ],
      },
      {
        title: 'อาการ',
        desc: [
          'ปวดข้อมือบริเวณโคนนิ้วหัวแม่มือ อาการมากขึ้นเวลา กำมือ บิดข้อมือ จับยกของ',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
          'ใส่อุปกรณ์ประคองมือ',
        ],
      },
    ],
  },

  wristPainOsteoarthritis: {
    content: [
      {
        title: 'คืออะไร',
        desc: [
          'ภาวะกระดูกอ่อนบนกระดูกข้อมือเกิดการเสื่อมสภาพทำให้กระดูกข้อมือเสียดสีกันโดยตรง',
          'มักพบในช่วงอายุมากกว่า 60 ปี ที่มีประวัติการใช้ข้อมือค่อนข้างมาก',
        ],
      },
      {
        title: 'อาการ',
        desc: [
          'อาการปวดเวลาขยับข้อมือ',
          'ข้อมือเคลื่อนไหวได้ลดลงหรือติด',
          'รู้สึกถึงการเสียดสีของกระดูกข้อมือ',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
          'พักการใช้งานข้อมือ',
        ],
      },
    ],
  },

  handPainMenu: [
    {
      title: 'โรคนิ้วล็อค หรือโรคนิ้วไกปืน \n(Trigger finger)',
      value: 'hand-pain-hands-triggerfinger',
      bColor: '#5BC2C3',
      bgColor: '#79e0e0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
    {
      title: 'ข้อนิ้วเสื่อม \n(Hand steoarthritis)​',
      value: 'hand-pain-hands-steoarthritis',
      bColor: '#edb62d',
      bgColor: '#F8E0A0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
  ],

  handPainTriggerfinger: {
    content: [
      {
        title: 'คืออะไร',
        desc: [
          'ภาวะปลอกหุ้มเอ็นนิ้วมือหนาตัวขึ้นทำให้เส้นเอ็นเคลื่อนผ่านได้ลำบากหรือติดได้',
          'มักพบในช่วงอายุ 40-50 ปีที่มีประวัติใช้มือในลักษณะเกร็งนิ้วบ่อย ๆ',
        ],
      },
      {
        title: 'อาการ',
        desc: [
          'ปวดบริเวณโคนนิ้วขณะงอหรือเหยียดนิ้ว',
          'มีอาการติดสะดุดร่วมด้วยจณะเหยียดหรืองอนิ้ว',
          'มีอาการติดล็อคหลังงอนิ้วต้องใช้มืออีกข้างมาช่วยเหยียด',
          'อาจมีนิ้วบวมติดในท่างอร่วมกับอาการปวดมากไม่สามารถเหยียดตรงได้',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
          'พักการใช้งานหลีกเลี่ยงการใช้งานลักษณะงอเหยียดนิ้วมือ',
        ],
      },
    ],
  },

  handPainSteoarthritis: {
    content: [
      {
        title: 'คืออะไร',
        desc: [
          'ภาวะกระดูกอ่อนบนกระดูกมือเกิดการเสื่อมสภาพ ทำให้กระดูกมือเสียดสีกันโดยตรง',
          'มักพบในช่วงอายุมากว่า 60 ปีขึ้นไปที่มีประวัติการใช้นิ้วมือค่อนข้างมาก',
        ],
      },
      {
        title: 'อาการ',
        desc: [
          'อาการปวดเวลาขยับมือ กำมือ เหยียดงอนิ้วมือ',
          'นิ้วมือเคลื่อนไหวได้ลดลงหรือติด',
          'รู้สึกถึงการเสียดสีของกระดูกมือ',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
          'พักการใช้งานนิ้วมือ',
        ],
      },
    ],
  },

  berisberisMenu: [
    {
      title: 'การกดทับเส้นประสาทมีเดียนบริเวณข้อมือ (Carpal tunnel syndrome)',
      value: 'hand-beri-carpal',
      bColor: '#5BC2C3',
      bgColor: '#79e0e0',
      fColor: '#000000',
    },
    {
      title: 'การกดทับเส้นประสาทอัลนาบริเวณข้อศอก (Cubital tunnel syndrome)',
      value: 'hand-beri-cubital',
      bColor: '#edb62d',
      bgColor: '#F8E0A0',
      fColor: '#000000',
    },
    {
      title: 'กระดูกต้นคอเสื่อม (Cervical spondylosis)',
      value: 'hand-beri-cervical',
      bColor: '#9B59B6',
      bgColor: '#D7BDE2',
      fColor: '#000000',
    },
    {
      title: 'ปลายประสาทอักเสบ (Peripheral neuropathy)',
      value: 'hand-beri-peripheralneuropathy',
      bColor: '#DC7633',
      bgColor: '#F0B27A',
      fColor: '#000000',
    },
  ],

  berisCarpal: {
    content: [
      {
        title: 'คืออะไร',
        desc: ['การกดทับของเส้นประสาทมีเดียนบริเวณข้อมือ'],
      },
      {
        title: 'อาการ',
        desc: [
          'ชาบริเวณด้านฝ่ามือของนิ้วหัวแม่มือ นิ้วชี้ นิ้วกลาง และบางส่วนของนิ้วนาง',
          'เป็น ๆ หาย ๆ เป็นมากขึ้นตอนที่ใช้งานข้อมือมาก ๆ',
          'อาจมีอาการปวดฝ่ามือหรือข้อมือร่วมด้วยได้',
          'อาจมีอาการของกล้ามเนื้อมืออ่อนแรงได้',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานลักษณะงอข้อมือหรือกดทับบริเวณข้อมือเป็นเวลานาน',
          'ใส่อุปกรณ์ประคองข้อมือ',
        ],
      },
    ],
  },

  berisCubital: {
    content: [
      {
        title: 'คืออะไร',
        desc: ['การกดทับของเส้นประสาทอัลนาบริเวณข้อศอก'],
      },
      {
        title: 'อาการ',
        desc: [
          'ชาบริเวณนิ้วนาง และนิ้วก้อย',
          'เป็น ๆ หาย ๆ เป็นมากขึ้นตอนที่งอข้อศอกนาน ๆ',
          'อาจมีอาการของกล้ามเนื้อมืออ่อนแรงได้',
          'อาจมีอาการปวดมือหรือท่อนแขนร่วมด้วยได้',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
          'พักการใช้งานข้อศอกหลีกเลี่ยงการใช้งานลักษณะงอข้อศอกเป็นเวลานาน',
        ],
      },
    ],
  },

  berisCervical: {
    content: [
      {
        title: 'คืออะไร',
        desc: [
          'การเสื่อมของกระดูกสันหลังส่วนคอ',
          'ในระยะยาวอาจทำให้มีการกดทับของรากประสาทของกระดูกสันหลังส่วนคอ',
        ],
      },
      {
        title: 'อาการ',
        desc: [
          'ปวดคอร้าวลงแขน',
          'มีอาการชาและอ่อนแรงบริเวณมือ แขนร่วมด้วย',
          'อาการมักเป็นแบบเรื้อรัง',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
        ],
      },
    ],
  },

  berisPeripheralNeuv: {
    content: [
      {
        title: 'คืออะไร',
        desc: [
          'ภาวะเส้นประสาทเกิดความเสียหายโดยมีสาเหตุมาจากภาวะหรือโรคบางชนิด',
        ],
      },
      {
        title: 'สาเหตุ',
        desc: [
          'โรคเบาหวาน พบบ่อยสุดโดยผู้ป่วยเบาหวานครึ่งหนึ่งมักมีอาการปลายประสาทอักเสบร่วมด้วย',
          'การขาดวิตามิน เช่น วิตามิน B1,B6,B12 เป็นต้น',
          'การติดสุรา มักเกิดร่วมกับภาวะขาดโภชนาการทำให้เกิดการขาดวิตามินร่วมด้วยจนเกิดภาวะปลายประสาทอักเสบตามมาได้',
          'โรคทางภูมิคุ้มกัน',
          'ยาบางชนิด เช่น ยาเคมีบำบัดบางชนิด เป็นต้น',
        ],
      },
      {
        title: 'อาการ',
        desc: [
          'มีอาการชาตามมือและเท้า',
          'มักเป็นทั้งสองข้าง',
          'มีอาการปวดแสบบริเวณที่มีอาการชาร่วมด้วยได้',
        ],
      },
      {
        title: 'การรักษาเบื้องต้น',
        desc: [
          'กายภาพบำบัด\n- ประคบเย็น ลดการอักเสบ บวม ถุงน้ำแข็งห่อผ้าขนหนู / แผ่นเจลเย็น ประคบบริเวณที่มีอาการครั้งละ 10 - 20 นาที\n- ประคบร้อน ลดปวด อาการตึง ผ้าชุบน้ำอุ่น ประคบบริเวณที่มีอาการครั้งละ 10 - 15 นาที หลังหายจากการอักเสบ',
          'พักการใช้งานข้อมือหลีกเลี่ยงการใช้งานในงานลักษณะกำมือบิดข้อมือ',
          'บริหาร/ออกกำลังกาย',
        ],
      },
    ],
  },
};