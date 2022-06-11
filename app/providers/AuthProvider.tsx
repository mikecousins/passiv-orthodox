import { createContext, useEffect, useState } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import axios from 'axios';
import { isPast, parse } from 'date-fns';

type PasswordLoginResponse = {
  mfa_required: {
    type: 'OTP_TOKEN';
    state: string;
  };
  token: null;
};

type TokenLoginResponse = {
  token: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  needToken: boolean;
  passwordLogin: (
    email: string,
    password: string,
    success?: () => void,
    error?: () => void
  ) => void;
  tokenLogin: (token: string, success?: () => void) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const storeToken = (token: string) => {
  // set the auth header in axios with our token
  axios.defaults.headers.common['Authorization'] = `JWT ${token}`;

  // save our jwt token into session storage in case the page is refreshed
  localStorage.setItem('jwt', token);
};

export const parseJwt = (jwt: string) => {
  const base64Payload = jwt.split('.')[1];
  const payload: { sub?: number; exp?: number } = JSON.parse(
    atob(base64Payload)
  );

  return payload;
};

const isExpired = (jwt: string) => {
  return isPast(parse(parseJwt(jwt).exp!.toString(), 't', new Date()));
};

const AuthProvider: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [jwtToken, setJwtToken] = useState<string>();
  const [twoFactorState, setTwoFactorState] = useState('');

  // set our axios auth if we already have a token in storage
  useEffect(() => {
    if (window && localStorage.getItem('jwt')) {
      // set the auth header in axios with our token
      axios.defaults.headers.common[
        'Authorization'
      ] = `JWT ${localStorage.getItem('jwt')}`;
    }
  }, []);

  // setup our axios interceptor to renew tokens
  useEffect(() => {
    // Use interceptor to watch for new token from api
    axios.interceptors.response.use((res) => {
      const newToken = res.headers['X-New-Token'];

      if (newToken) {
        setJwtToken(newToken);

        storeToken(newToken);
      }

      return res;
    });
  }, []);

  const passwordLogin = (
    email: string,
    password: string,
    success?: () => void,
    error?: () => void
  ) => {
    axios
      .post<PasswordLoginResponse>('auth/login', { email, password })
      .then((res) => {
        // store the token in local state
        setTwoFactorState(res.data.mfa_required.state);

        // call the success callback if there is one
        if (success) {
          success();
        }
      })
      .catch(() => {
        if (error) {
          error();
        }
      });
  };

  const tokenLogin = (token: string, success?: () => void) => {
    axios
      .put<TokenLoginResponse>('auth/login', {
        token,
        state: twoFactorState,
      })
      .then((res) => {
        // store the token in local state
        setJwtToken(res.data.token);

        // store the token in local storage and axios
        storeToken(res.data.token);

        // call our success callback
        if (success) {
          success();
        }
      });
  };

  const logout = () => {
    setJwtToken('');
    localStorage.removeItem('jwt');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!jwtToken && !isExpired(jwtToken),
        needToken: (!jwtToken || isExpired(jwtToken)) && !!twoFactorState,
        passwordLogin,
        tokenLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
