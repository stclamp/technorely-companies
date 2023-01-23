import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute(props) {
  const { children } = props;
  const location = useLocation();
  const { isAuth } = useSelector((store) => store.user);
  useEffect(() => {
    console.log(isAuth);
  }, []);

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}
