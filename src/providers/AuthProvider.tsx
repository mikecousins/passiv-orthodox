import {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

type PasswordLoginResponse = {
  mfa_required: {
    type: 'OTP_TOKEN',
    state: string,
  },
  token: null
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
    error?: () => void,
  ) => void;
  tokenLogin: (token: string, success?: () => void) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const storeToken = (token: string) => {
  // set the auth header in axios with our token
  axios.defaults.headers.common['Authorization'] = `JWT ${token}`;

  // save our jwt token into session storage in case the page is refreshed
  localStorage.setItem('jwt', token);
};

const AuthProvider: FunctionComponent = ({ children }) => {
  const [jwtToken, setJwtToken] = useState<string>(
    localStorage.getItem('jwt') ?? '',
  );
  const [twoFactorState, setTwoFactorState] = useState('');

  // set our axios auth if we already have a token in storage
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
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
    error?: () => void,
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
    axios.defaults.headers.common['Authorization'] = undefined;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!jwtToken,
        needToken: !jwtToken && !!twoFactorState,
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