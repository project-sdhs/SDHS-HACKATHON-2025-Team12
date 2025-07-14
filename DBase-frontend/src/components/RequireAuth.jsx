import { Navigate } from "react-router-dom";

const RequireAuth = ({ LoginState, children, redirectTo = "/" }) => {
  return LoginState ? children : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;
