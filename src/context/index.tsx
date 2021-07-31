import React, { createContext } from 'react';
import { AuthForm, User } from '../typing';
// import * as auth from '../auth-provider';
// import { http } from '../utils/http';
import { useMount } from '../hooks/useMount';
import useAsync from 'hooks/useAsync';
import { FullPageErrorFallback, FullPageLoading } from 'components/main';
// import { useQueryClient } from "react-query";

export interface AuthContextProps {
  user: User | null;
  // register: (form: AuthForm) => Promise<void>;
  login: (form: AuthForm) => Promise<void>;
  logout: () => Promise<void>;
}

const bootstrapUser = async () => {
  let user = {
    id: 1,
    name: 'admin',
    email: 'qq',
    title: 'string',
    organization: '超级管理员',
    token: 'token',
  };
  // const token = auth.getToken();
  // if (token) {
  //   const data = await http<{ user: User }>('me', { token });
  //   user = data.user;
  // }
  // console.log(token, 'token');

  return user;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
AuthContext.displayName = 'AuthContext';

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // const queryClient = useQueryClient();

  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () =>
  // auth.logout().then(() => {
  //   setUser(null);
  // });
  const login = (form: AuthForm) =>
    new Promise((resolve) => {
      resolve({});
    }).then(() => {
      setUser({
        id: 1,
        name: 'admin',
        email: 'qq',
        title: 'string',
        organization: '超级管理员',
        token: 'token',
      });
    });
  const logout = () =>
    new Promise((resolve) => {
      resolve({});
    }).then(() => {
      setUser(null);
    });
  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) return <FullPageLoading />;
  if (isError) return <FullPageErrorFallback error={error} />;
  // login, register, logout
  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
