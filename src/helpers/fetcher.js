import axios from 'axios';
import { API_URL } from '../config'; 

const basicConfig = {
  baseURL: API_URL
};

export const fetcher = (path) => {
  return axios.get(path, {
    ...basicConfig,
  }).then((response) => {
    return response.data;
  });
}

// export const _axios = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// })