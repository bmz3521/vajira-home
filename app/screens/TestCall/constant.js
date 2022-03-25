export default {
  SUMMARY_PAYLOAD: 'summaryPayload',
  PUSH_TOKEN: 'pushToken',
};

export const TABLE_TYPES = {
  history: 'history',
  prescription: 'prescription',
  department: 'department',
  doctorTypes: 'doctorTypes',
};

export const BOOKING_DOCTOR_STATUS = {
  PATIENT_DRAFT: 'รอคอลเซ็นเตอร์ดำเนินการ',
  CALL_CENTER_DECLINE: 'คอลเซ็นเตอร์ยกเลิก',
  DOCTOR_PENDING: 'รอแพทย์ดำเนินการ',
  DOCTOR_CONFIRM: 'แพทย์ทำการอนุมัติ',
  DOCTOR_DECLINE: 'แพทย์ทำการยกเลิก',
  DOCTOR_ALERT: 'แพทย์ทำการแจ้งปัญหา',
  DOCTOR_PENDING_RX: 'รอแพทย์สั่งยา',
  STAFF_PENDING: 'รอเจ้าหน้าที่ดำเนินการ',
  STAFF_CONFIRM: 'เจ้าหน้าที่ทำการอนุมัติ',
  STAFF_DECLINE: 'เจ้าหน้าที่ทำการยกเลิก',
  STAFF_ALERT: 'เจ้าหน้าที่ทำการแจ้งปัญหา',
  EPHIS_PENDING: 'รอคอนเฟิร์มใบสั่งยา',
  EPHIS_CONFIRM: 'คอนเฟิร์มใบสั่งยาแล้ว',
  PHARMACY_PENDING_RX: 'รอเภสัชยืนยันยาใน E-PHIS',
  PHARMACY_CONFIRM_RX: 'เภสัชทำการยืนยันยาใน E-PHIS',
  PHARMACY_PENDING_BOOKING: 'รอเภสัชทำการจองนัด',
  PHARMACY_CONFIRM_BOOKING: 'เภสัชทำการอนุมัติการจองนัด',
  PHARMACY_DECLINE_BOOKING: 'เภสัชทำการยกเลิกการจองนัด',
  PHARMACY_ALERT: 'เภสัชทำการแจ้งปัญหา',
  PATIENT_PENDING_PAYMENT: 'รอผู้ป่วยชำระเงิน',
  PATIENT_SUCCESS_PAYMENT: 'ผู้ป่วยชำระเงินเรียบร้อย',
  PATIENT_DECLINE_PAYMENT: 'ผู้ป่วยยกเลิกการชำระ',
  BOOKING_COMPLETED: 'เสร็จสิ้นกระบวนการ',
  DOCTOR_COMPLETED: 'เสร็จสิ้นกระบวนการพบแพทย์',
  STAFF_COMPLETED: 'เสร็จสิ้นกระบวนการพบเจ้าหน้าที่',
  PHARMACY_COMPLETED: 'เสร็จสิ้นกระบวนการพบเภสัชกร',
  WAIT_FOR_PHARMACYSTORE_NOTIFY: 'รอร้านยากดแจ้งผู้ป่วย',
  WAIT_FOR_PATIENT_PHARMACY: 'รอผู้ป่วยมารับยา',
  WAIT_FOR_PATIENT_EMS: 'รอผู้ป่วยรับยา',
  WAIT_FOR_PATIENT_PHAMACYSTORE: 'รอผู้ป่วยรับยาที่ร้านยา',
  WAIT_FOR_PATIENT_HOSPITAL: 'รอผู้ป่วยมารับยาที่โรงพยาบาล',
  SUCCESS_BY_EMS: 'ผู้ป่วยได้รับยาแล้ว',
  SUCCESS_BY_PHARMACYSTORE: 'ผู้ป่วยมารับยาจากร้านยาแล้ว',
  SUCCESS_BY_PHARMACY: 'ผู้ป่วยมารับยาแล้ว',
  SUCCESS_BY_PATIENT: 'ผู้ป่วยมารับยาแล้ว',
  CANCELED_BY_PATIENT: 'ผู้ป่วยยกเลิกการมารับยา',
  CANCELED_BY_PHARMACYSTORE: 'ร้านยายกเลิกการมารับยา',
};

export const LOGISTIC = {
  1: 'รับยาที่ร้านยาคุณภาพ',
  2: 'รับยาที่บ้านทางไปรษณีย์',
  3: 'รับยาที่โรงพยาบาลวชิรพยาบาล',
};

export const ROOM_STATUS = {
  exitedWaitingRoom: 'ผู้ป่วยยังไม่เข้าห้องรอ',
  inWaitingRoom: 'ผู้ป่วยอยู่ในห้องรอ',
  calling: 'ผู้ป่วยกำลังพบแพทย์',
  completed: 'ผู้ป่วยพบแพทย์เสร็จสิ้น',
  doctorAlert: 'เกิดข้อผิดพลาด',
};

export const AMBULANCE_STATUS = {
  patientWaiting: 'รอการยืนยัน',
  actionWaiting: 'รอสั่งการ',
  exitWaiting: 'รอการออกจากฐาน',
  moving: 'กำลังเดินทาง',
  arrived: 'ถึงที่เกิดเหตุแล้ว',
  completedSending: 'ส่งผู้ป่วยแล้ว',
  inHospital: 'ถึงรพ. แล้ว',
  cancelled: 'ยกเลิก',
  completed: 'เสร็จสิ้น',
  pass: 'ส่งต่อ',
};

export const AMBULANCE_COLOR = {
  patientWaiting: 'lightcoral',
  actionWaiting: 'brown',
  exitWaiting: 'gold',
  moving: 'blue',
  arrived: 'lightblue',
  completedSending: 'lightgreen',
  inHospital: 'green',
  cancelled: 'red',
  completed: 'gray',
  pass: 'pink',
};

export const PAYMENT_STATUS = {
  PATIENT_PENDING_PAYMENT: 'รอผู้ป่วยชำระเงิน',
  PATIENT_SUCCESS_PAYMENT: 'ผู้ป่วยชำระเงินเรียบร้อย',
};

export const ROLES = {
  patient: 'ผู้ป่วย',
  doctor: 'แพทย์',
  pharmacy: 'เภสัชกร',
  callCenter: 'คอลเซ็นเตอร์',
  nurse: 'พยาบาล',
  physiotherapist: 'นักกายภาพ',
  pharmacySchedule: 'เภสัชกร',
  nutritionist: 'นักโภชนาการ',
  staff: 'เจ้าหน้าที่ EMS',
  pharmacyStore: 'ร้านยา',
};

export const DAY = {
  Monday: [0, 1439],
  Tuesday: [1440, 2879],
  Wednesday: [2880, 4319],
  Thursday: [4320, 5759],
  Friday: [5760, 7199],
  Saturday: [7200, 8639],
  Sunday: [8640, 10079],
};
