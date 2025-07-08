import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";

function PrivateRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem(ACCESS_TOKEN_NAME);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;