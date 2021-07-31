import { AuthContext } from 'context';
import { useContext } from 'react';

export const useAuth = () => {
  //context provider: user, login, register, logout;
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 必须在AuthProvider中使用');
  }
  return context;
};
