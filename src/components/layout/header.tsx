import React, { memo } from 'react';
import { Dropdown, Layout, Menu } from 'antd';
import './Header.less';
import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
const { Header } = Layout;
const User = memo(() => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="1" onClick={logout}>
            退出登录
          </Menu.Item>
        </Menu>
      }
    >
      <span onClick={(e) => e.preventDefault()}>
        Hi, {user?.name} <DownOutlined />
      </span>
    </Dropdown>
  );
});
const PageHeader = () => {
  const history = useHistory();
  const { user } = useAuth();
  return (
    <Header className={classNames('header')}>
      <span
        onClick={() => {
          history.replace({ pathname: '/' });
        }}
        style={{ fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer' }}
      >
        XXX管理系统
      </span>
      <div className={classNames('fr headerRight')}>
        <User />
        <span>{user?.organization}</span>
      </div>
    </Header>
  );
};

export default PageHeader;
