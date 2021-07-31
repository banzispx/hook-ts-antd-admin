import React from 'react';
import './App.css';
import { FullPageErrorFallback, FullPageLoading } from './components/main';
import ErrorBoundary from './components/error-boundary';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const Login = React.lazy(() => import('./pages/login'));
const Main = React.lazy(() => import('./pages/mian'));
function App() {
  return (
    <div className="App">
      {/* 错误边界 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/* 显示FullPageLoading 直到他的子组件加载完成 */}
        <React.Suspense fallback={<FullPageLoading />}>
          <Router>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/" key="main" component={Main} />
            </Switch>
          </Router>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
