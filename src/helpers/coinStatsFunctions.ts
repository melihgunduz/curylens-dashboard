import axios from 'axios';

const coinstats = 'SJWfG4elhJVhNg2GjHEfTqcUTeKJjoN9nhQQ7X63+z0=';


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
