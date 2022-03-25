import axios from 'axios';
import config from './config';
import { Buffer } from 'buffer';

const key = Buffer.from(config.OMISE_PUBLIC_KEY).toString('base64');
const getToken = card =>
  axios({
    method: 'post',
    url: 'https://vault.omise.co/tokens',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${key}`,
    },
    data: { card },
  }).then(res => {
    return res.data.id;
  });

export default getToken;
