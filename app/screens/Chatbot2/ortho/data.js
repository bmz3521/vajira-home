export const DATA_ORTHO = {
  fracture: {
    selfcheckQuestions: [
      {
        id: 0,
        name:
          'ประวัติขณะเกิดเหตุ เช่น ท่าทางขณะเกิดเหตุ, ลักษณะขณะเกิดเหตุ, อาการหลังจากเกิดเหตุ',
      },
      {
        id: 1,
        name: 'โรคประจําตัว ยาโรคประจําตัวหรือยาที่ทานประจํา',
      },
      {
        id: 2,
        name: 'การรักษาก่อนมารพ. การปฐมพยาบาลเบื้องต้น เช่น ยา, ทําแผล',
      },
      {
        id: 3,
        name:
          'ประวัติการเจ็บป่วย อุบัติเหตุก่อนหน้า ประวัติผ่าตัดในอดีต เช่น ผ่าตัดใส่เหล็กดามกระดูก',
      },
      {
        id: 4,
        name:
          'ประวัติตั้งครรภ์,ประจําเดือน วันแรกของประจําเดือนครั้งล่าสุด, การคุมกําเนิด',
      },
      {
        id: 5,
        name: 'ประวัติแพ้ยาและอาหาร ชื่อยาที่แพ้, อาการขณะแพ้, การรักษา',
      },
    ],

    fractureDetail: {
      content: [
        {
          title: 'อาการและอาการแสดง',
          desc: [
            'ปวด, บวม หรือมีรอยช้ำบริเวณที่หัก',
            'กระดูกผิดรูป',
            'ไม่สามารถเคลื่อนไหวบริเวณนั้นได้ หรือออกแรงบริเวณที่หักได้',
            'มีอาการชาเหนือบริเวณตำแหน่งที่มีกระดูกหัก',
            'มีกระดูกที่ทิ่มออกมาบริเวณผิวหนัง',
          ],
        },
        {
          title: 'ตรวจเพิ่มเติม',
          desc: ['X-ray หรือ CT Scan'],
        },
        {
          title: 'การปฐมพยาบาลเบื้องต้น',
          desc: [
            'ไม่ควรดึงข้อหรือจัดข้อด้วยตัวเอง',
            'นำวัสดุประคองบริเวณที่บาดเจ็บให้อยู่นิ่ง เช่น การดามเฝือกชั่วคราว',
            'ประคบเย็นบริเวณที่บาดเจ็บ',
            'รีบนำส่งโรงพยาบาลทันที',
          ],
        },
        {
          title: 'การรักษา',
          desc: [
            'การรักษาแบบไม่ผ่าตัด เช่น การเข้าเฝือก หรือใช้วิธีการดึงถ่วงน้ำหนัก',
            'การรักษาแบบผ่าตัดและใช้อุปกรณ์ตามข้อบ่งชี้ซึ่งแพทย์จะเป็นผู้พิจารณา',
          ],
        },
      ],
    },
  },

  osteoporosis: [
    {
      title: 'อะไรคือภาวะกระดูกพรุน ?',
      value: 'osteoporosis-qa1',
      normal: true,
      expand: false,
      description: [
        'โรคกระดูกชนิดหนึ่งที่ทำให้กระดูกเสื่อมและบางลง ทำให้เสียคุณสมบัติการรับน้ำหนัก เปราะและหักง่ายซึ่งโดยทั่วไปมักจะไม่มีอาการ อาจจะมีอาการแสดงก็ต่อเมื่อมีกระดูกหักไปแล้ว',
      ],
    },
    {
      title: 'ปัจจัยเสี่ยงต่อภาวะกระดูกพรุน',
      value: 'osteoporosis-qa2',
      normal: true,
      expand: false,
      description: [
        'วัยหมดประจำเดือน',
        'ดื่มเหล้า',
        'สูบบุหรี่',
        'ยาบางชนิด เช่น ยาสเตียรอยด์ ยากดภูมิคุ้มกัน',
      ],
    },
    {
      title: 'การป้องกันโรคกระดูกพรุน',
      value: 'osteoporosis-qa3',
      normal: true,
      expand: false,
      description: [
        'ออกกำลังกายที่มีน้ำหนักลงบริเวณข้อให้เหมาะสมกับวัย',
        'รับประทานอาหารให้เหมาะสม โดยมีแคลเซียมและวิตามินดีซึ่งเป็นส่วนสำคัญในการเสริมสร้างกระดูกให้แข็งแรง',
      ],
    },
    {
      title: 'ข้อบ่งชี้ในการมาตรวจกระดูกพรุน',
      value: 'osteoporosis-qa4',
      option: true,
      expand: false,
      description: [
        {
          title: 'ช่วงอายุ',
          content: ['ผู้หญิงอายุมากกว่า 65 ปี', 'ผู้ชายอายุมากกว่า 70 ปี'],
        },
        {
          title:
            'ผู้หญิงวัยหมดประจำเดือนที่อายุน้อยกว่า 65 ปี และมีปัจจัยเสี่ยงต่อการมีมวลกระดูกต่ำ',
          content: [
            'มีประวัติกระดูกหัก',
            'รับประทานยาบางชนิดที่ทำให้มวลกระดูกลดลง เช่น ยาสเตียรอยด์',
            'โรคประจำตัวหรือภาวะที่ทำให้มวลกระดูกลดลง',
          ],
        },
        {
          title:
            'ผู้ชายอายุน้อยกว่า 70 ปี และมีปัจจัยเสี่ยงต่อการมีมวลกระดูกต่ำ',
          content: [
            'มีประวัติกระดูกหัก',
            'รับประทานยาบางชนิดที่ทำให้มวลกระดูกลดลง เช่น ยาสเตียรอยด์',
            'โรคประจำตัวหรือภาวะที่ทำให้มวลกระดูกลดลง',
          ],
        },
        {
          title: 'ประวัติตนเอง\nและคนในครอบครัว',
          content: [
            'ได้รับยากลุ่มสเตียรอยด์ขนาดสูง มากกว่าหรือเท่ากับ 7.5 มิลลิกรัมต่อวันติดต่อกันเป็นเวลานานกว่า 3 เดือน',
            'มีประวัติบิดาหรือมารดากระดูกสะโพกหัก',
            'มีประวัติส่วนสูงลดลงมากกว่า 4 เซนติเมตร หรือวัดได้ลดลงมากกว่า 2 เซนติเมตรต่อปี',
            'ค่าดัชนีมวลกายน้อยกว่า 20 kg/m^2',
          ],
        },
      ],
    },
    {
      title: 'การตรวจเพิ่มเติม',
      value: 'osteoporosis-qa5',
      normal: true,
      expand: false,
      description: [
        'ตรวจวัดความหนาแน่นของมวลกระดูก\n(Bone mineral density, BMD)',
      ],
    },
    {
      title: 'การรักษา',
      value: 'osteoporosis-qa6',
      option: true,
      expand: false,
      description: [
        {
          title: 'เมื่อได้รับการวินิจฉัย แพทย์จะเป็นผู้พิจารณาการใช้ยา',
          content: [
            'แคลเซียม',
            'วิตามินดี',
            'ยาป้องกันการสลายกระดูกตามความเหมาะสม',
          ],
        },
        {
          title: 'ป้องกันการหกล้มที่อาจทำให้เกิดกระดูกหักได้',
          content: [
            'แก้ไขภาวะความดันต่ำเวลาเปลี่ยนท่า',
            'หลีกเลี่ยงการใช้ยาที่ทำให้ง่วง',
            'จัดสภาพแวดล้อมภายในบ้านให้ปลอดภัย',
          ],
        },
      ],
    },
  ],
};