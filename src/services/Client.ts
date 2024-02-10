import axios, { AxiosRequestConfig } from 'axios';

interface Client {
  data?: unknown | undefined;
  method?: string | undefined;
  url: string | undefined;
  params?: any;
  headers?:
  | {
    [key: string]: string | number;
  }
  | undefined;
}

const BASE_URL = 'https://greenavi.com/api'


const REQUEST_TIMEOUT = 8000;

const API = axios.create({
  baseURL: BASE_URL,
  // timeout: REQUEST_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
});

export const ApiClient = async ({ data, method = 'GET', url, params, headers }: Client) => {
  const requestParams: AxiosRequestConfig = {
    method,
    url,
    params,
    data,
    responseType: 'json',
  };

  API.defaults.headers = { ...API.defaults.headers, ...headers };

  return API(requestParams)
    .then((res: any) => ({ data: res.data, status: res.status }))
    .catch((err: any) => {
      console.error(
        err,
        '\nERROR MESSAGE:',
        err.response?.data.message,
        `\nSTATUS: ${err.response?.data.status}`
      );

      return { data: err.response?.data.message, status: err.response?.data.status };
    });
};

export const ApiClientNew = async ({ data, method = 'GET', url, params, headers }: Client) => {
  const requestParams: AxiosRequestConfig = {
    method,
    url,
    params,
    data,
    responseType: 'json',
  };

  API.defaults.headers = { ...API.defaults.headers, ...headers };

  return API(requestParams)
    .then((res: any) => ({ data: res.data, status: res.status }))
    .catch((err: any) => {
      console.error(
        err,
        '\nERROR MESSAGE:',
        err.response?.data.message,
        `\nSTATUS: ${err.response?.data.status}`
      );

      return { data: err.response?.data.message, status: err.response?.data.status };
    });;
};
