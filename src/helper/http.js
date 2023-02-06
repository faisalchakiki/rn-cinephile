import axios from 'axios';

const http = token => {
  const headers = {};
  if (token) {
    console.log(token);
    headers.authorization = 'Bearer ' + token;
  }
  const instance = axios.create({
    baseURL: 'http://192.168.100.10:8888',
    headers,
  });
  return instance;
};

export default http;
