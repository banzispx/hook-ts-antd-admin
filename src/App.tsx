import React from 'react';
import Login from './pages/login';
import './App.css';
import { FullPageErrorFallback, FullPageLoading } from './compoments/main';
import ErrorBoundary from './compoments/error-boundary';
function App() {
  return (
    <div className="App">
      {/* 错误边界 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/* 显示FullPageLoading 直到他的子组件加载完成 */}
        <React.Suspense fallback={<FullPageLoading />}>
          {/* {user ? <AuthenticatedApp /> : <UnauthenticatedApp />} */}
          <Login></Login>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
