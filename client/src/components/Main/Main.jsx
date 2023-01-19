import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { useDispatch } from "react-redux";
import { removeUser } from "store/slices/userSlice";
import Header from "components/Header/Header";

const Main = () => {
  const dispatch = useDispatch();

  const { isAuth, email } = useAuth();

  return isAuth ? (
    <div>
      <Header handleLogout={() => dispatch(removeUser())} />
      <h1>Welcome</h1>

      <button>Log out from {email}</button>
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};

export default Main;
