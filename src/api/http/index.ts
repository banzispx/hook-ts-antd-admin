import http from './httpInstance';
import { getSession } from 'utils';
import { AxiosRequestConfig } from 'axios';
interface HttpType {
  [key: string]: (url: string, params: ParamsType) => Promise<unknown>;
}
interface ParamsType {
  payload?: any;
  $token: true;
  $blob: false;
}
// 如需拓展，将要拓展的方法添加至数组中
const HTTP_OPTIONS = ['get', 'post', 'put', 'delete'];
const HTTP: HttpType = {};

HTTP_OPTIONS.forEach((item) => {
  HTTP[item] = (url: string, params: ParamsType) => {
    const { payload, $token = true, $blob = false } = params;

    // header中添加token
    let headers = {};
    if ($token) {
      headers = {
        Authorization: getSession('token'),
      };
    }
    // 下载文件
    let responseType: AxiosRequestConfig['responseType'];
    if ($blob) {
      responseType = 'blob';
    }
    return new Promise((resolve, reject) =>
      http({
        method: item.toUpperCase() as AxiosRequestConfig['method'],
        url,
        data: payload || params,
        headers,
        responseType, // https://www.cnblogs.com/wynblogscc/p/14807532.html
      })
        .then((res) => resolve(res))
        .catch((error) => reject(error))
        .finally(() => {})
    );
  };
});

export default HTTP;
