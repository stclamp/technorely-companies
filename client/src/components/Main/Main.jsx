import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "store/slices/userSlice";
import Header from "components/Header/Header";
import { getUser, logout } from "api/index";
import { useEffect } from "react";
import { useAuth } from "hooks/use-auth";

const Main = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(removeUser());
  };

  // if (getUser().catch((e) => e.response.status === 401)) {
  //   logout();
  //   dispatch(removeUser());
  // }
  // if (getUser()) {
  //   getUser().then((data) => {
  //     dispatch(
  //       setUser({
  //         email: data.email,
  //         id: data.id,
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         phone: data.phone,
  //         numOfEmployees: data.numOfEmployees,
  //         nickname: data.nickname,
  //         description: data.description,
  //         position: data.position,
  //       })
  //     );
  //   });
  // }

  if (getUser()) {
    getUser()
      .then((data) => {
        dispatch(
          setUser({
            email: data.email,
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            numOfEmployees: data.numOfEmployees,
            nickname: data.nickname,
            description: data.description,
            position: data.position,
          })
        );
      })
      .catch((e) => console.log(e));
  }

  const state = useSelector((state) => state);
  console.log(state.user);
  const { isAuth } = useAuth();

  return state.user.email ? (
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
