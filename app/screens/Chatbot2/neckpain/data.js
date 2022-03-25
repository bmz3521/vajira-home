export const DATA_NECK_PAIN = {
  mainMenu: [
    {
      title: 'อาการปวดคอ\nเกิดจากอะไรได้บ้าง?',
      value: 'neckpain-cause',
      bColor: '#5BC2C3',
      bgColor: '#79e0e0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
    {
      title: 'ปัจจัยเสี่ยง',
      value: 'neckpain-riskpoint',
      bColor: '#26a872',
      bgColor: '#88c2aa',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
    {
      title: 'การรักษาเบื้องต้น​',
      value: 'neckpain-treatment',
      bColor: '#edb62d',
      bgColor: '#F8E0A0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
    {
      title: 'อาการ',
      value: 'neckpain-symptom',
      bColor: '#a2a7bb',
      bgColor: '#cdced3',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
  ],

  neckacheRisk: {
    content: [
      {
        title: 'อายุที่มากขึ้น',
        desc: [
          'หมอนรองกระดูกเป็นตัวทําให้เกิดความยืดหยุ่นยืดหยุ่นและรับแรงกระแทกของน้ำหนักตัวจากการเคลื่อนไหว เมื่อเวลาผ่านไป หมอนรองกระดูกจะมีการสึกหรอและเสื่อม แตก ส่งผลให้เนื้อของหมอนรองกระดูกปลิ้นออกมากดทับเส้นประสาท ส่งผลให้เกิดอาการปวดคอและหลังได้',
        ],
      },
      {
        title: 'กิจวัตรประจําวัน',
        desc: [
          'การเล่นกีฬา, ยกของหนัก, นั่งผิดท่า, นอนผิดท่า, การทํางานที่ต้องก้มเงยบ่อยๆ หรือใช้กล้ามเนื้อคอมาก, ขับรถนาน ล้วนเป็นสําเหตุที่ทําให้หมอนรองกระดูกเสื่อม',
        ],
      },
      {
        title: 'อุบัติเหตุ',
        desc: [
          'ในกรณีที่ได้รับแรงกดทับหรือการกระแทกที่รุนแรง อาจส่งผลให้หมอนรองกระดูกแตกและปลิ้นออกมากดทับที่เส้นประสาทได้',
        ],
      },
      {
        title: 'โรคบางชนิด',
        desc: [
          'ผู้ป่วยโรคข้อ เช่น รูมาตอยด์ , กระดูกสันหลังติดเชื้อ และเนื้องอกกระดูกสันหลัง',
        ],
      },
    ],
  },

  basicTreatment: [
    {
      title: 'การปรับเปลี่ยนท่าทางการทํากิจวัตรประจําวัน',
      value: 'neckpain-treatment5-qa1',
      imageScript: true,
      expand: false,
      description: [
        {
          desc:
            'หลีกเลี่ยงการนั่งอ่านหนังสือนานๆ การก้มใช้โทรศัพท์มือถือติดต่อกันเป็นเวลานาน',
          image: require('../images/neckpain-1.jpg'),
        },
        {
          desc:
            'การงานคอมพิวเตอร์เป็นเวลานาน จําเป็นต้องปรับเปลี่ยนอิริยาบถท่าทางการทํางานและตําแหน่งของจอคอมพิวเตอร์ให้อยู่ในระดับสายตา',
          image: require('../images/neckpain-2.jpg'),
        },
        {
          desc: 'ไม่นอนหมอนสูงหรือต่ำเกินไป',
          image: require('../images/neckpain-3.jpg'),
        },
        {
          desc:
            'ไม่สะบัดคอแรงๆเพื่อแก้ความเมื่อย\nหลีกเลี่ยงกีฬาบางประเภทเนื่องจากอาจทําให้มีอาการปวดต้นคอมากขึ้น เช่น แบดมินตันเพราะมักต้องแหงนศีรษะเวลาตีลูก\nไม่ควรแหงนศีรษะเป็นระยะเวลานานเพราะจะทําให้กระดูกข้อต่อสันหลังบริเวณคอเกิดการอักเสบ เกิดอาการปวดและเกร็งตัวของกล้ํามเนื้อ',
        },
      ],
    },
    {
      title: 'การทํากายภาพบําบัด',
      value: 'neckpain-treatment5-qa2',
      normal: true,
      expand: false,
      description: [
        'การดึงคอเป็นการใช้แรงดึงกระทําต่อร่างกํายและกระดูกสันหลังส่วนคอ ช่วยทําให้ช่องระหว่างกระดูกสันหลังบริเวณคอกว้างขึ้น ลดการกดทับเส้นประสาทช่วยในการยืดกล้ามเนื้อเส้นเอ็นและลดการเกร็งตัวของกล้ามเนื้อ',
        'การใช้คลื่นเสียงความถี่สูง 20,000 รอบต่อนาทีช่วยในการบําบัดรักษา คลื่นเสียงที่จะกระตุ้นให้เกิดความร้อนลึกเฉพาะที่ ช่วยลดการอักเสบและอาการปวด เพิ่มความยืดหยุ่นของกล้ามเนื้อและเนื้อเยื่อ ทําให้อาการของผู้ป่วยทุเลาลง',
      ],
    },
    {
      title: 'การรับประทานยาบรรเทาปวด',
      value: 'neckpain-treatment5-qa3',
      normal: true,
      expand: false,
      description: [
        'ยาลดการอักเสบ  จะออกฤทธิ์ในการลดปวดตามส่วนต่างๆของร่างกาย ข้อควรระวังในการใช้ยาลดการอักเสบคือต้องรับประทํานยาหลังอาหารทันที เพราะตัวยาอาจทําให้เกิดอาการระคายเคืองต่อกระเพาะอาหารและไม่ควรรับประทานต่อเนื่องนานเกิน 1 เดือน',
      ],
    },
    {
      title: 'การฉีดยาชาระงับปวดเข้าไประหว่างชั้นกล้ามเนื้อ',
      value: 'neckpain-treatment5-qa4',
      normal: true,
      expand: false,
      description: [
        'ยาลดการอักเสบ  จะออกฤทธิ์ในการลดปวดตามส่วนต่างๆของร่างกาย ข้อควรระวังในการใช้ยาลดการอักเสบคือต้องรับประทํานยาหลังอาหารทันที เพราะตัวยาอาจทําให้เกิดอาการระคายเคืองต่อกระเพาะอาหารและไม่ควรรับประทานต่อเนื่องนานเกิน 1 เดือน',
      ],
    },
    {
      title: 'การรักษาโดยการผ่าตัด',
      value: 'neckpain-treatment5-qa5',
      normal: true,
      expand: false,
      description: [
        'ผู้ที่มีอาการปวดมากจนทนไม่ได้แม้จะรักษาโดยรับประทานยา การพักและกายภาพบําบัดเต็มที่แล้ว ยังไม่สามารถทํางานหรือใช้ชีวิตได้ตามปกติ',
        'มีอาการชาอ่อนแรงหรือกล้ามเนื้อขาลีบอย่างชัดเจน หรือมีปัญหาการเดินลําบาก',
        'มีปัญหาระบบขับถ่ายผิดปกติชัดเจน เช่น กลั้นอุจจาระหรือปัสสาวะไม่ได้',
      ],
    },
  ],

  neckpainCause: [
    {
      title: 'ปวดคอเนื่องจากกล้ามเนื้อตึงตัว',
      value: 'neckpain-cause-qa1',
      normal: true,
      expand: false,
      description: [
        'เมื่ออยู่ในท่าเดิมเป็นเวลานาน กล้ามเนื้อและเส้นเอ็นบริเวณคอจะตึงตัว เกิดอาการปวดบริเวณต้นคอ บ่าไหล่ และสะบัก',
      ],
    },
    {
      title: 'กระดูกคอเสื่อม',
      value: 'neckpain-cause-qa2',
      imageScript: true,
      expand: false,
      description: [
        {
          desc:
            'เมื่ออายุมากขึ้นทําให้เกิดการเปลี่ยนแปลงของหมอนรองกระดูกและข้อต่อกระดูกสันหลังทําให้เกิดอาการปวดคอเรื้อรัง ร่างกายจะมีการปรับสภาพโดยพยายามสร้างกระดูกใหม่ขึ้นมาทดแทนส่วนที่เสื่อมไป กระดูกที่สร้างขึ้นมาใหม่(กระดูกงอกเพิ่มขึ้น) เมื่อเอ็กซ์เรย์จะเห็นช่องว่างระหว่างข้อกระดูกคอแคบลง และมีกระดูกที่งอกบริเวณกระดูกสันหลังซึ่งอาจมีการกดเบียดส่วนสําคัญของระบบประสาทดังนี้',
        },
        {
          title: 'กระดูกคอเสื่อมกดทับรากประสาท',
          desc:
            'หินปูนหรือกระดูกงอก เกิดการกดทับรากประสาทและเกิดอาการปวดต้นคอ สะบักและมีอาการปวดร้าวลงแขน ชาหรืออ่อนแรงที่แขนและมือ',
        },
        {
          title: 'กระดูกคอกดทับไขสันหลัง',
          desc:
            'หินปูนหรือกระดูกงอก เกิดการกดทับกดทับไขสันหลังทําให้เกิดอาการปวดคอ อ่อนแรงหรือแขนชา แขนและขา  อาจพบการใช้มือลําบากในการใช้งานในชีวิตประจําวัน เช่น ใช้ตะเกียบลําบาก ลายมือเปลี่ยน ติดกระดุมลําบาก เป็นต้น อาจมีควบคุมปัสสาวะและอุจจําระไม่ได้และสุดท้ายอาจเป็นอัมพาตได้หากไม่ได้รับการรักษา',
        },
        {
          title: 'กระดูกคอกดทับหลอดเลือดแดง',
          desc:
            'หินปูนหรือกระดูกงอก เกิดการกดทับกดหลอดเลือดแดงวิ่งผ่าน เลือดจึงไปเลี้ยงสมองไม่ลดลงทําให้เกิดอาการปวดศีรษะ ปวดตุบๆที่ท้ายทอย สายตาพร่ามัวเห็นภาพซ้อน เวียนศีรษะ คลื่นไส้อาเจียน หูอื้อ วูบล้มกะทันหันแต่ไม่หมดสติ แขนขาอ่อนแรง ชา เป็นต้น',
        },
      ],
    },
  ],

  subsymMenu: [
    {
      title: 'อาการ',
      value: 'neckpain-symptom-normal',
      bColor: '#edb62d',
      bgColor: '#F8E0A0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
    {
      title: 'อาการที่ควรมา รพ.',
      value: 'neckpain-symptom-bringhospital',
      bColor: '#edb62d',
      bgColor: '#F8E0A0',
      fColor: '#000000',
      txtStyle: { textAlign: 'center' },
    },
  ],

  neckpainSymp: {
    content: [
      {
        title: 'อาการ',
        desc: [
          'ผู้ป่วยมักมีอาการปวดเมื่อยบริเวณกระดูกและกล้ามเนื้อบริเวณต้นคอ อาจมีอาการปวดร้าวลงบริเวณบ่า สะบัก และแขนร่วมกับอาการชาลงไปที่มือและนิ้ว หรืออาจรู้สึกปวดแปล๊บๆเหมือนไฟฟ้าช็อตร้าวลงแขน อาจมีอาการปวดจนนอนไม่หลับ',
          'อาการปวดจะเพิ่มมากขึ้นเมื่อแหงนศีรษะ, ก้ม หรือนั่งในท่าที่ไม่เหมาะสมเป็นเวลานานเนื่องจากน้ำหนักศีรษะไปกระทําตรงบริเวณข้อต่อระหว่างกระดูก ทําให้เกิดอาการเกร็งตัวของกล้ามเนื้อรอบๆบริเวณลําคอ เกิดการอักเสบของกระดูกข้อต่อ ทําให้เกิดอาการปวดเมื่อยกล้ามเนื้อรอบๆบริเวณลําคอ ไหล่และบ่า',
          'ในรายที่มีการกดทับของเส้นประสาท จะทําให้กล้ามเนื้อที่เลี้ยงโดยรากประสาทนั้นๆอ่อนแรง เช่นไม่มีแรงกํามือหรือกระดกข้อมือ',
          'บางรายอาจมีปวดท้ายทอยร้าวขึ้นไปยังศีรษะ หรือมีอาการปวดเบ้าตา',
          'หันศีรษะลําบาก ไม่สามารถหันซ้ายขวาได้สุดเหมือนปกติ',
        ],
      },
    ],
  },

  neckpainSymBringHos: {
    content: [
      {
        title: 'อาการที่ควรมารพ.\nท่านมีอาการใดอาการหนึ่งดังต่อไปนี้ร่วมด้วย',
        desc: [
          'มีประวัติบาดเจ็บต่อกระดูกสันหลังส่วนคอนำมาก่อน',
          'ปวดเฉียบพลันจนเคลื่อนไหวไม่ได้',
          'อ่อนแรงหรือชาแขนขาร่วมด้วย',
          'มีปัญหาในการควบคุมปัสสาวะ, อุจจาระ',
          'มีความเสี่ยงในการติดเชื้อ เช่น รับประทานยากดภูมิคุ้มกัน, มีประวัติติดเชื้อในกระแสเลือด, ประวัติการฉีดยาเข้าไขสันหลัง',
          'ประวัติโรคประจำตัวเป็นโรคมะเร็งหรือเคยเป็น',
          'น้ำหนักลดไม่ทราบสาเหตุ',
          'มีอาการอื่นๆร่วม เช่น ไข้, คลื่นไส้อาเจียน, ปวดศีรษะ, การมองเห็นผิดปกติ, เจ็บแน่นหน้าอก',
          'อาการปวดเป็นบริเวณคอด้านหน้า',
          'อาการเป็นมากกว่าเท่ากับ 6 สัปดาห์และรบกวนการนอน การประกอบกิจวัตรประจำวัน',
        ],
      },
    ],
  },

  haveSymp: {
    content: [
      {
        title: 'ควรพบแพทย์\nโรคที่อาจเป็นได้จึงจำเป็นต้องมีการตรวจเพิ่มเติม',
        desc: [
          'โรคกระดูกคอเสื่อมกดทับไขสันหลัง ปวดคอร่วมกับมีอ่อนแรงแขนขา เดินเซ ควบคุมปัสสาวะ, อุจจาระไม่ได้',
          'การติดเชื้อในกระดูกสันหลังคอ มีอาการไข้ ครั่นเนื้อครั่นตัวร่วม มักมีทำหัตถการบริเวณไขสันหลัง หรือประวัติมีภาวะ ภูมิคุ้มกันต่ำ',
          'อาการปวดคอด้าหน้าอาจมีสาเหตุจากเหตุอื่นเช่น กล้ามเนื้อหัวใจขาดเลือดแล้วเจ็บแน่นหน้าอกร้าวมาบริเวณคอ',
        ],
      },
    ],
  },

  /** TODO new component */
  mayBeSymp: {
    title: 'อาการที่รักษาเบื้องต้นได้เอง',
    desc:
      'ยังไม่มีข้อบ่งชี้ในการตรวจเพิ่มเติมทางรังสีเช่นเอ็กซเรย์หรือข้อบ่งชี้ในการผ่าตัด สามารถรักษาเบื้อง ต้นแบบประคับประคองได้; อาการจะค่อยๆดีขึ้นและหายเองได้ใน 3 สัปดาห์',
    content: [
      {
        title: 'โรคที่อาจเป็นได้',
        desc: [
          '\tหมอนรองกระดูกต้นคอเคลื่อน ปวดคอ ขยับคอลำบาก ปวดคอ ร้าวลงแขนได้ อาการมักรุนแรงเมื่อคออยู่ในท่าเดิมเป็น เวลานาน',
          '\tกล้ามเนื้อต้นคออักเสบ มักมีประวัติได้รับการกระแทกบริเวณ กล้ามเนื้อคอ หรืออาจเกิดจากท่าทางการนอน การนั่งที่ไม่ ถูกต้องเป็นเวลานาน',
          '\tข้อต่อกระดูกสันหลังคอเสื่อม ส่วนมากไม่มีอาการ หากเป็นมาก จะมีอาการปวดคอขยับคอลำบาก อาจมีแขนขาอ่อนแรงหรือชา ร่วมด้วยได้',
        ],
      },
      {
        title: 'การรักษาเบื้องต้นด้วยตนเอง',
        desc: [
          {
            label: 'การปรับพฤติกรรม',
            image: require('../images/neckpain-4.jpg'),
          },
          {
            label: 'กายบริหาร',
          },
          /** NOTE use the same imng as backache */
          {
            label: 'ประคบ',
            image: require('../images/backache-6.jpg'),
          },
          {
            label: 'การใช้ยา',
            image: require('../images/neckpain-5.jpg'),
          },
          {
            label: 'ลองรักษาเบื้องต้นครบทุกวิธี อาการยังไม่ดีขึ้น ควรพบแพทย์',
          },
        ],
        image: true,
      },
    ],
  },
};