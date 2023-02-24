import axios from 'axios';
import {BACKEND_API} from '@env';

console.log(BACKEND_API);
console.log(BACKEND_API);
console.log(BACKEND_API);
console.log(BACKEND_API);
console.log(BACKEND_API);

const http = token => {
  const headers = {};
  if (token) {
    headers.authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: BACKEND_API,
    headers,
  });
  return instance;
};

export default http;
