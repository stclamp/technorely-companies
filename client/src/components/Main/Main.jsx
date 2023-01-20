import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser, getUser } from "store/slices/userSlice";
import Header from "components/Header/Header";
import { logout } from "api/index";
import { useEffect } from "react";

const Main = ({ isAuth }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(removeUser());
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return isAuth ? (
    <div>
      <Header handleLogout={handleLogout} />
      <h1>Welcome</h1>

      <button>Log out from</button>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};

export default Main;
