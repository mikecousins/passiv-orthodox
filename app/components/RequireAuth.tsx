import { FunctionComponent } from "react";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import TwoFactorPage from "../pages/TwoFactorPage";

const RequireAuth: FunctionComponent = ({ children }) => {
  const { isLoggedIn, needToken } = useAuth();
  console.log(isLoggedIn, needToken);

  if (needToken) {
    return <TwoFactorPage />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default RequireAuth;
