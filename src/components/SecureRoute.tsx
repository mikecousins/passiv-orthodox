import { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../pages/LoginPage';
import TwoFactorPage from '../pages/TwoFactorPage';

type Props = {
  path: string;
}

const SecureRoute: FunctionComponent<Props> = ({ path, children }) => {
  const { isLoggedIn, needToken } = useAuth();

  if (needToken) {
    return <TwoFactorPage />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <Route path={path}>
      {children}
    </Route>
  );
}

export default SecureRoute;