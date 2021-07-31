import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import React from 'react';
export interface MenuConfig {
  title: string;
  menuCode: number;
  path?: string;
  icon?: any;
  component?: any;
  children?: MenuConfig[];
}
export const menuList: MenuConfig[] = [
  {
    title: '首页',
    menuCode: 200,
    path: '/home',
    icon: SettingFilled,
    component: React.lazy(() => import('./../pages/home')),
  },
  {
    title: '业务管理',
    menuCode: 300,
    icon: HomeOutlined,
    children: [
      {
        title: '客户端管理',
        menuCode: 301,
        path: '/client',
        icon: SmileOutlined,
        component: React.lazy(() => import('./../pages/business/client')),
      },
      {
        title: '水印管理',
        menuCode: 302,
        path: '/print',
        icon: SyncOutlined,
        component: React.lazy(() => import('./../pages/business/print')),
      },
    ],
  },
];
