import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.less';
// import 'antd/dist/antd.dark.css'; // 引入官方提供的暗色 less 样式入口文件
// import 'antd/dist/antd.compact.css'; // 引入官方提供的紧凑 less 样式入口文件
import { AuthProvider } from './context';
ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
