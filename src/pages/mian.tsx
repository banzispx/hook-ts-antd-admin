import React, { useEffect } from 'react';
import { Layout } from 'antd';
import PageHeader from 'components/layout/header';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import PageSider from 'components/layout/sider';
import { Route, Switch } from 'react-router-dom';
import 'assets/main.less';
import NotFound from './not-found';
import { MenuConfig, menuList } from 'config/menu';
import { FullPageLoading } from 'components/main';
const { Content } = Layout;
export const AuthenticatedApp = () => {
  const { user } = useAuth();
  const history = useHistory();
  useEffect(() => {
    if (!user?.token) {
      history.replace({ pathname: '/login' });
      return;
    }
  }, [history, user]);
  const getRoute = (List: MenuConfig[]): any => {
    return List.map((item: MenuConfig) => {
      if (item.children && item.children.length > 0) {
        return getRoute(item.children);
      } else {
        return (
          <Route
            path={item.path}
            key={item.menuCode}
            component={item.component}
          />
        );
      }
    });
  };
  return (
    <Layout>
      <PageHeader />
      <Layout className={'content'}>
        <PageSider />
        <Content style={{ margin: '2rem', backgroundColor: '#e4e8ea' }}>
          {/* 在此添加懒加载时展示的内容 */}
          <React.Suspense fallback={<FullPageLoading />}>
            <Switch>
              <Redirect exact={true} from="/" to="/home"></Redirect>
              {getRoute(menuList)}
              <Route component={NotFound}></Route>
            </Switch>
          </React.Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedApp;
