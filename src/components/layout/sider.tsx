import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Menu } from 'antd';
import { MenuConfig, menuList } from 'config/menu';
import { Link, useLocation } from 'react-router-dom';
const { SubMenu } = Menu;
const PageSider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const getMenuNodes = (menuList: MenuConfig[]): JSX.Element[] | null => {
    return menuList.map((item: MenuConfig) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.menuCode} title={item.title} icon={<item.icon />}>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.menuCode} icon={item.icon ? <item.icon /> : ''}>
            <Link to={item?.path || ''}>{item.title}</Link>
          </Menu.Item>
        );
      }
    });
  };
  let selectedKeys: string[] = [];
  let defaultOpenKeys: string[] = [];
  menuList.map((item) => {
    if (item.path === pathname) {
      selectedKeys = [item.menuCode + ''];
      // console.log(item.path, pathname, 112121, selectedKeys);
    }
    if (item.children) {
      item.children.map((child) => {
        if (child.path === pathname) {
          defaultOpenKeys = [item.menuCode + ''];
          selectedKeys = [child.menuCode + ''];
        }
      });
    }
  });
  return (
    <Aside>
      {/* <SwitchBtn
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </SwitchBtn> */}
      <Menu
        selectedKeys={selectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {getMenuNodes(menuList)}
      </Menu>
    </Aside>
  );
};

export default PageSider;

const Aside = styled.aside`
  background-color: #001529;
  height: 100%;
  overflow: hidden;
  width: 240px !important;
  max-width: 240px !important;
  top: 60px;
  position: fixed;
  left: 0px;
  height: 100%;
  box-shadow: none;
  transition: width 0.2s ease-in-out 0s;
`;
const SwitchBtn = styled.button`
  width: 100%;
  background-color: #001529;
`;
