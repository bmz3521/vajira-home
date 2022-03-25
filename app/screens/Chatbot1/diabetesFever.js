import { showOptions } from './diabetesBot';

export const getFever = async (currentLength, text, id) => {
  let msg;

  if (text == 'show fever') {
    const text = 'โปรดเลือดอาการที่ท่านกำลังเป็น';
    const data = [
      {
        id: 0,
        title: 'ไข้สูง ไอ เจ็บคอ มีน้ำมูก\nร่วมกับหอบเหนื่อยง่าย',
        option: 'ไข้สูง ไอ เจ็บคอ มีน้ำมูก\nร่วมกับหอบเหนื่อยง่าย',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Ffever%2Ffever.jpg?alt=media&token=3242528a-eefd-4ad0-af21-7f41f70d41f5',
      },
      {
        id: 1,
        title: 'ท้องเสีย ถ่ายเหลวมากกว่า\n3 ครั้ง ร่วมกับคลื่นไส้',
        option: 'ท้องเสีย ถ่ายเหลวมากกว่า\n3 ครั้ง ร่วมกับคลื่นไส้',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Ffever%2Fdiarrhea.jpg?alt=media&token=22ddcc8d-22de-4c53-aaae-e4533a26681d',
      },
      {
        id: 2,
        title: 'ปัสสาวะแสบขัด\nมีกลิ่นฉุน',
        option: 'ปัสสาวะแสบขัด\nมีกลิ่นฉุน',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Ffever%2Furine.jpg?alt=media&token=c71acf12-28c8-47e1-8c47-63de633d5480',
      },
    ];
    msg = showOptions(currentLength, text, data);
  } else if (text == 'show fever tips') {
    const cardHeight = 280;
    const noButton = true;

    const text = 'ท่านมีอาการเหล่านี้หรือไม่';
    const data = [
      {
        id: 0,
        title:
          'ดื่มน้ำเปล่าที่สะอาด ประมาณ\n1-2 แก้ว/ชั่วโมง (ยกเว้นกรณี\nมีโรคที่ต้องจำกัดปริมาณน้ำ\nเช่น ไต หัวใจ ปอด เป็นต้น',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fthirsty%2Fthirsty-tip1.jpg?alt=media&token=b30c0d5a-ceb3-4640-bbd7-2957d71f9e5a',
      },
      {
        id: 1,
        title: 'หลังจากนั้น ทุกๆ 4-6 ชั่วโมง\nตรวจวัดระดับน้ำตาลซ้ำ\n\n',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fthirsty%2Fthirsty-tip2.jpg?alt=media&token=b61ae10a-5ee7-4b75-88ca-afed29f15497',
      },
      {
        id: 2,
        title: 'ถ้าอาการไม่ดีขึ้น\nควรปรึกษาแพทย์',
        image:
          'https://firebasestorage.googleapis.com/v0/b/vajira-smart-hospital.appspot.com/o/chatbot%2Fthirsty%2Fthirsty-tip3.jpg?alt=media&token=d249d71c-4496-459c-9155-2db6ed6af1cf',
      },
    ];
    msg = showOptions(currentLength, text, data, cardHeight, noButton);
  }

  return msg;
};
