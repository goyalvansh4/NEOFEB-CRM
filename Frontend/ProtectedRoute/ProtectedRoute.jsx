import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export function ProtectedRoute({ children }) {
  const token = Cookies.get("token"); // Replace 'token' with the key of your token in cookies.

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}


