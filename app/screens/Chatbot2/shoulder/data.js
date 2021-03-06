export const DATA_SHOULDER = {
  selfcheckQuestions: [
    { id: 0, name: 'เริ่มมีอาการเมื่อไหร่ (ชั่วโมง/วัน/เดือน/ปี)' },
    {
      id: 1,
      name:
        'ระดับความปวดไหล่ คะแนนเต็ม 10 ให้กี่คะแนน (0 คือไม่ปวด 10 คือปวดมากที่สุด)',
    },
    { id: 2, name: 'ปวดเวลาใช้งานหรือไม่' },
    { id: 3, name: 'รู้สึกไหล่หลวม ไม่มั่นคง' },
    { id: 4, name: 'มีไหล่ติด ขยับลําบากหรือไม่' },
    { id: 5, name: 'อ่อนแรงแขนข้างที่ปวดไหล่' },
    {
      id: 6,
      name:
        'มีอาการร่วมหรือไม่ เช่น ปวดตำแหน่งอื่น, บวมแดงร้อนที่ไหล่, ผื่น, ไข้, น้ำหนักลด, เบื่ออาหาร, ไอ เจ็บคอ, ปวดเวลาตื่นนอนกลางคืน',
    },
    { id: 7, name: 'โรคประจำตัว' },
    { id: 8, name: 'แพ้ยา แพ้อาหาร' },
    {
      id: 9,
      name: 'เคยมีอุบัติเหตุหรือบาดเจ็บที่ไหล่มาก่อนหรือไม่ (วัน/เดือน/ปี)',
    },
    {
      id: 10,
      name: 'เคยผ่าตัดที่ไหล่หรือไม่',
    },
  ],
  tips: [
    {
      id: 0,
      title: 'กายภาพบำบัด',
      content: [
        '1.) ประคบเย็น ลดการอักเสบ โดยการใช้ถุงน้ำเเข็งห่อผ้าขนหนู / แผ่นเจลเย็น 10-15 นาที วันละ 3-5 ครั้ง',
        '2.) ประคบร้อน ลดปวด ลดการตึงตัวของกลางเนื้อ โดยการใช้ผ้าชุบน้ำอุ่น กระเป๋าน้ำร้อน 10-15 นาที ใช้หลังอาการอักเสบหายดี',
      ]
    },
    {
      id: 1,
      title: 'การฟื้นฟู ออกกำลัง',
      content: [
        '1.) บริหารข้อไหล่สม่ำเสมอ เพิ่มพิสัย และ ความเเข็งแรงกล้ามเนื้อ',
      ]
    },
    {
      id: 2,
      content: [
        'พักการใช้งาน หลีกเลี่ยงยกของหนัก หลีกเลี่ยงท่าทางที่ต้องเอื้อมของสูงเหนือศีรษะ',
      ]
    },
  ],
  causes: [
    {
      id: 0,
      name: 'ระยะเวลาที่เริ่มมีอาการ',
      name2: '< 6 สัปดาห์',
      source: require('../images/cause1.jpg'),
      option: 'shoulder-lessthan6',
    },
    {
      id: 1,
      name: 'ระยะเวลาที่เริ่มมีอาการ',
      name2: '6 - 12 สัปดาห์',
      source: require('../images/cause2.jpg'),
      option: 'shoulder-between6and12',
    },
    {
      id: 2,
      name: 'ระยะเวลาที่เริ่มมีอาการ',
      name2: '> 12 สัปดาห์',
      source: require('../images/cause3.jpg'),
      option: 'shoulder-morethan12',
    },
  ],

  /** NOTE Lt 6 weeks content */

  labral: [
    {
      title: 'คืออะไร',
      content: ['ลาบรัมของข้อไหล่เป็นกระดูกอ่อนที่บุอยู่ตามขอบของเบ้าไหล่เพื่อป้องกันการเสียดสีของหัวกระดูกต้นแขนกับขอบของเบ้าเวลาที่เราหมุนหัวไหล่']
    },
    {
      title: 'สาเหตุ',
      content: [
        'การตกลงบนแขนที่เหยียดตรง',
        'การตกโดยเอาหัวไหล่ลง',
        'การยกของหนักมาก ๆ ขึ้นอย่างรวดเร็ว',
        'ใช้งานแขนในลักษณะที่ต้องยกขึ้นเหนือศีรษะบ่อย ๆ เช่น นักกีฬายกน้ำหนัก นักขว้างลูกเบสบอล'
      ]
    },
    {
      title: 'อาการ',
      content: [
        'อาการปวดไหล่เวลายกแขนขึ้นเหนือศีรษะ',
        'อาจมีเสียงคลิกหรือมีไหล่ติดขณะขยับ'
      ]
    },
  ],

  acute: [
    {
      title: 'คืออะไร',
      content: ['เส้นเอ็นไหล่ ประกอบกันเป็นแผงโอบหุ้มข้อไหล่ ทําหน้าที่ให้ความมั่นคงกับข้อไหล่และเป็นแกนหมุนและยกหัวไหล่'
      ]
    },
    {
      title: 'สาเหตุ',
      content: [
        'ความเสื่อมของเส้นเอ็น กลุ่มนี้พบได้บ่อยกว่า เกิดจากการใช้งานมานานๆ และอายุที่มากขึ้น',
        'อุบัติเหตุ เช่น ล้มลงขณะที่แขนเหยียดเท้าพื้น หรือไหล่แขนกระแทกแล้วมีการหดตัวของกล้ามเนื้อและเส้นเอ็นอย่างรุนแรง'
      ]
    },
    {
      title: 'อาการ',
      content: [
        'ปวดเวลานอน โดยเฉพาะตอนนอนตะแคงทับ',
        'อ่อนแรงในขณะยกหรือหมุนหัวไหล่',
        'ปวดเวลายกแขนขึ้นหรือลงในบางท่า',
        'เสียงเสียดสีในขณะขยับบางท่าของไหล่']
    },
  ],

  dislocation: [
    {
      title: 'สาเหตุ',
      content: ['บาดเจ็บที่รุนแรงจนโครงสร้างข้อไหล่ไม่มั่นคง ขณะยกแขนสูงกว่าระดับไหล่']
    },
    {
      title: 'อาการ',
      content: [
        'ปวดไหล่มาก',
        'ไหล่ดูผิดรูป',
        'คลําได้หัวของกระดูกต้นแขนปูดออกมาทางด้านหน้าหรือข้างในรักแร้',
        'รู้สึกว่าไหล่ตก ต้องใช้มืออีกข้างหนึ่งรับน้ำหนักแขนไว้ อาการชาหรือเป็นเหน็บที่แขนข้างนั้น'
      ]
    },
    {
      title: 'การรักษาขั้นต้น',
      content: ['การรักษาขั้นต้นคือการบริหารกล้ามเนื้อรอบหัวไหล่ให้แข็งแรงขึ้น ถ้ายังหลุดอยู่อีกก็จําเป็นต้องผ่าตัดเพื่อซ่อมขอบกระดูกอ่อนลาบรัม แคปซูลหุ้มข้อ หรือเสริมกระดูกส่วนที่แตก']
    },
  ],

  /** NOTE Btw 6 and 12 weeks content */

  rotator: [
    {
      title: 'คืออะไร',
      content: ['เส้นเอ็นข้อไหล่คือ เส้นเอ็นขนาดเล็ก 4 เส้นที่อยู่บริเวณรอบข้อไหล่ เส้นเอ็นกลุ่มนี้เป็นส่วนที่ต่อเนื่องมาจากกล้ามเนื้อสะบักทอดผ่าน ข้อไหล่และยึดเกาะกับ ส่วนบนของกระดูกต้นแขน ทําหน้าที่ช่วยในการขยับไหล่ เช่นกางแขน ยกแขน หมุนไหล่ พบบ่อยในอายุ 35 - 75 ปี']
    },
    {
      title: 'สาเหตุ',
      content: ['การยกแขนขึ้นจนสุดแล้วเหวี่ยงไปข้างหน้าจะทําให้เอ็นเส้นนี้ถูไปกับกระดูกมากขึ้น จนได้รับบาดเจ็บ(อักเสบ)อาจเกิดการถลอกหรืออาจถึงขั้นฉีกขาด']
    },
    {
      title: 'อาการ',
      content: [
        'ปวดไหล่โดยเฉพาะเวลายกหรือขยับไหล่ อาจมีอาการปวดร้าวลงไปบริเวณต้นแขนได้',
        'อาจปวดตอนกลางคืนหรือปวดตอนพักได้',
        'รู้สึกแขนล้าและไม่มีแรง',
        'สุดท้ายพิสัยการเคลื่อนไหวจะลดลง และทํากิจกรรมบางอย่างลําบากเช่นสระผม หวีผม เกาหลัง ติดกระดุม'
      ]
    },
  ],

  biceps: [
    {
      title: 'คืออะไร',
      content: ['โรคนี้มักเป็นในหญิงมากกว่าชาย และในคนที่อยู่ในวัยทํางาน 35 - 75 ปี']
    },
    {
      title: 'สาเหตุ',
      content: ['มักเกิดจากการใช้กล้ามเนื้องอแขนรุนแรง หรือหักโหมเกินไป เช่น การเล่นกล้าม การยกน้ำหนัก(ท่างอแขน) การเล่นบาร์คู่ บาร์เดี่ยว เป็นต้น']
    },
    {
      title: 'อาการ',
      content: ['โดยทั่วไปมักค่อยๆเกิด โดยปวดมากขึ้นๆและใช้ไหล่ได้น้อยลงๆ อาการเจ็บปวดมักจะเสียวร้าวลงมายังแขนส่วนล่าง ถ้าเป็นเรื้อรัง อาการปวดอาจหายไป เหลือแต่อาการไหล่ติด']
    },
  ],

  adhesive: [
    {
      title: 'คืออะไร',
      content: ['เกิดจากการอักเสบเรื้อรังของเยื่อหุ้มไหล่ทําให้มีการหนาตัวและเกิดการหดรั้ง พบบ่อยในคน อายุ 40 - 60 ปี']
    },
    {
      title: 'สาเหตุ',
      content: [
        'เกิดจากการอักเสบเรื้อรังของเยื่อหุ้มไหล่ทําให้มีการหนาตัวและเกิดการหดรั้ง',
        'ซึ่งอาจจะไม่ทราบ หรือ สาเหตุพบจากการบาดเจ็บจึงทําให้เกิดการจํากัดการเคลื่อนไหวของข้อไหล่ เช่น มีกระดูกปลายแขนหักใส่เฝือกนาน 4 - 6 สัปดาห์ หรือผู้ป่วยที่มีการบาดเจ็บของเอ็นกล้ามเนื้อไหล่ โดยมีอาการปวดจนต้องหยุดการใช้งาน',
      ]
    },
    {
      title: 'อาการ',
      content: [
        '**ปวดและเคลื่อนไหวข้อไหล่ได้ลําบาก อาการของโรคแบ่งได้เป็น 3 ระยะคือ:',
        'ระยะปวด (freezing stage) เป็นระยะที่มีอาการปวดไหล่เวลาขยับ ผู้ป่วยจะเริ่มไม่ขยับหัวไหล่และใช้งานแขนข้างนั้นน้อยลงเนื่องจากเจ็บ ระยะนี้กินเวลาประมาณ 2-9 เดือน ระยะนี้ควรประคบเย็นประมาณ 15-20 นาที เมื่อมีอาการปวดและบวมหรืออาจทานยาแก้อักเสบเพื่อบรรเทาอาการปวด',
        'ระยะติด (frozen stage) เป็นระยะที่อาการปวดค่อย ๆ ดีขึ้นอย่างช้า ๆ แต่ข้อติดไปแล้ว ทําให้ขยับไม่สะดวก ระยะนี้กินเวลาอีกประมาณ 4-12 เดือน พอเริ่มหายปวดควรค่อย ๆ เริ่มออกกําลังทํากายภาพหัวไหล่',
        'ระยะหาย (thawing stage) เป็นระยะที่การเคลื่อนไหวของข้อค่อย ๆ กลับมาเป็นปกติ ใช้เวลาอีกประมาณ 1-2 ปี',
      ]
    },
  ],


  subacromial: [
    {
      title: 'คืออะไร',
      content: ['ถุงน้ำที่หัวไหล่ช่วยให้กลุ่มกล้ามเนื้อและเอ็นที่รู้จักกันในชื่อ rotator cuff สามารถทํางานได้ดี']
    },
    {
      title: 'สาเหตุ',
      content: ['ภาวะที่ถุงน้ำอักเสบไปพร้อม ๆ กับ เส้นเอ็น Rotator Cuff']
    },
    {
      title: 'อาการ',
      content: ['บวมและปวดมาก ยกแขนขึ้นหวีผมไม่ได้ ใส่เสื้อยึดไม่ได้ ถ้าเอามือบีบที่หัวไหล่จะปวดมาก']
    },
  ],

  /** NOTE Mt 12 weeks content */

  osteo: [
    {
      title: 'คืออะไร',
      content: ['ภาวะที่กระดูกอ่อนของข้อซึ่งจะปกคลุมทั้งในส่วนของหัวกระดูกและเบ้า เกิดการเสื่อมเสียหาย ทําให้ช่องว่างในข้อแคบลง จนในที่สุดกระดูกทั้งสองด้านก็จะมาเสียดสีกัน และเกิดกระดูกงอกขึ้นรอบๆ ข้อ ส่วนใหญ่พบในคนไข้อายุ > 60 ปีที่เคยใช้งานข้อไหล่หนักมาก่อน']
    },
    {
      title: 'สาเหตุ',
      content: [
        'เป็นข้อไหล่เสื่อมตามอายุการใช้งาน',
        'ภาวะข้ออักเสบชนิดต่างๆ เช่น รูมาตอยด์, โรคเกาท์, โรคลูปัส',
        'ภาวการณ์บาดเจ็บต่อข้อไหล่',
        'กรณีที่เอ็นหมุนรอบข้อไหล่ (Rotator Cuff) ฉีกขาดรุนแรงเป็นเวลานาน'
      ]
    },
    {
      title: 'อาการ',
      content: [
        'อาการปวดเวลาเคลื่อนไหวข้อไหล่',
        'เคลื่อนไหวข้อได้ลดลง หรือไหล่ติดยึด',
        'มีเสียงในข้อเวลาเคลื่อนไหว',
        'กล้ามเนื้อโดยรอบก็จะลีบและอ่อนแรง'
      ]
    },
  ],
}