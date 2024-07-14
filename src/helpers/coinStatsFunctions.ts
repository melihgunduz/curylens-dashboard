import axios from 'axios';
import { coinstats } from '../secrets/secrets.json';

const generalGetOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': coinstats,
  },
};

export function coinListRequest() {
  const options = {
    ...generalGetOptions,
    url: 'https://openapiv1.coinstats.app/coins?limit=10',
  };

  return axios.request(options);

}


export function marketValuesRequest() {
  const options = {
    ...generalGetOptions,
    url: 'https://openapiv1.coinstats.app/markets',
  };

  return axios.request(options);
}

export function newsRequest() {

  const options = {
    ...generalGetOptions,
    url: 'https://openapiv1.coinstats.app/news',
  };

  return axios.request(options);

}
