import { message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
const http = axios.create({
  timeout: 5000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
});
interface ResponseType {
  code: string;
  data: object;
  msg?: string;
}
const history = useHistory();
// 响应拦截器
http.interceptors.response.use(
  function (response): any {
    // 请求多语言的json文件
    if (/.*\.json$/.test(response.config.url as string)) {
      return response;
    }
    // 文件下载
    if (
      response.headers &&
      (response.headers['content-type'] ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' ||
        response.headers['content-type'].indexOf('multipart/form-data') > 0)
    ) {
      return response;
    }
    const dealDate: ResponseType = {
      code: response.data.code,
      msg: response.data.msg,
      data: response.data.data,
    };
    // 对错误进行统一处理
    if (response.data.code !== 1) {
      if (response.data.msg) {
        message.error(response.data.msg);
      }
      // code不为1， rejcet，在catch中收集信息，发送操作日志
      return Promise.reject(dealDate);
    }
    // code为1， resolve， try await成功，try中收集信息，发送操作日志
    return Promise.resolve(dealDate);
  },
  function (error) {
    const code = error.message.split('code')[1]?.trim() || '';
    const message = error.response.data.message;
    // http异常返回在这里处理
    // 400报错
    if (+code === 400) {
      message.error('Bad Request');
    }
    // token失效
    if (+code === 401) {
      sessionStorage.clear();
      history.replace('/login');
    }
    // 无权限
    if (+code === 403) {
      message.error(message);
      history.push('/error/403');
    }
    if (+code === 500) {
      message.error('服务异常');
    }

    if (error.message.indexOf('timeout') > -1) {
      // 多语言需要自己在项目中配置
      message.error('请求超时，请重试！');
    }
    return Promise.reject(error);
  }
);

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default http;
