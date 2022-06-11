import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export const useAuth = () => {
  const { isLoggedIn, needToken, passwordLogin, tokenLogin, logout } =
    useContext(AuthContext)!;
  return {
    isLoggedIn,
    needToken,
    passwordLogin,
    tokenLogin,
    logout,
  };
};
