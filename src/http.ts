import axios, { AxiosResponse } from 'axios'

export enum APIErrorType {
  business = 'business',
  original = 'original',
}

export class APIError {
  type: APIErrorType;
  err: any;
  msg: string;
}

export interface Res<T> {
  code?: number;
  message: string;
  data: T;
}

const service = axios.create({
  timeout: 15000,
  withCredentials: false,
})

service.interceptors.request.use(
  config => config,
  err => {
    console.log('请求错误拦截：', err)
    const apiErr: APIError = {
      type: APIErrorType.original,
      err: err,
      msg: '请求失败',
    };
    return Promise.reject(apiErr);
  },
)
service.interceptors.response.use(
  (response: AxiosResponse<Res<any>>) => {
    console.log('resuccess', response.data)
    return Promise.resolve(response.data.data);
    // if (response.data && response.data.code === 0) {
    // }
    // const err: APIError = {
    //   type: APIErrorType.business,
    //   err: null,
    //   msg: response.data.message,
    // };
    // return Promise.reject(err);
  },
  err => {
    console.log('响应错误拦截：', err)
    const apiError = {
      type: APIErrorType.original,
      err,
      msg: '请求失败',
    };
    return Promise.reject(apiError);
  },
)

export function httpGet<T>(
  url: string,
  params: any = {},
) {
  return service.get(
    url,
    params,
  ) as Promise<T>;
}

export function httpPost<T>(
  url: string,
  data: any = {},
  headers: any = {},
) {
  return service.post(
    url,
    data,
    { headers },
  ) as Promise<T>;
}

export function httpPut<T>(
  url: string,
  data: any = {},
  headers: any = {},
) {
  return service.put(
    url,
    data,
    { headers },
  ) as Promise<T>;
}

export function httpDel<T>(
  url: string,
  headers: any = {},
) {
  return service.delete(
    url,
    { headers },
  ) as Promise<T>;
}
