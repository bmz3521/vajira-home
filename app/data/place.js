import { Images } from "@config";
import pharmaShop from '@assets/images/osotSiam.jpeg';

const PlaceListData = [
  {
    id: "0",
    image: pharmaShop,
    title: "ร้านยาโอสถสยาม",
    subtitle: "ภายในมหาวิทยาลัยสยาม ติดธนาคารกรุงเทพ",
    location: "ถ. เพชรเกษม แขวงบางหว้า เขตภาษีเจริญ กรุงเทพมหานคร",
    region: {
      latitude: 13.7819972,
      longitude: 100.5066912
    },
    active: true,
    phone: "0-286-78000 ต่อ 5159",
    rate: 24,
    status: "หยุดวันอาทิตย์และวันหยุดนักขัตฤกษ์",
    rateStatus: "Very Good",
    numReviews: 4.5
  }
];

export { PlaceListData };
