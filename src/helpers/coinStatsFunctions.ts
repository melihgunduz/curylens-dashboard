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
    url: 'https://openapiv1.coinstats.app/coins',
  };

  axios
    .request(options)
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.error(error);
    });
}

export function coinChartRequest(coinName: string, period: string) {

  const options = {
    ...generalGetOptions,
    url: `https://openapiv1.coinstats.app/coins/${coinName}/charts?period=${period}`,
  };

  axios
    .request(options)
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.error(error);
    });
}

export function marketValuesRequest() {
  const options = {
    ...generalGetOptions,
    url: 'https://openapiv1.coinstats.app/markets',
  };

  axios
    .request(options)
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.error(error);
    });
}

export function newsRequest() {

  const options = {
    ...generalGetOptions,
    url: 'https://openapiv1.coinstats.app/news',
  };

  return axios.request(options);

}
