import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "store/slices/userSlice";
import Header from "components/Header/Header";
import { getCompanies, logout } from "api/index";
import { useEffect } from "react";
import TableCompanies from "./TableCompanies/TableCompanies";
import AddCompany from "./AddCompany/AddCompany";

const Main = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(removeUser());
  };

  const store = useSelector((state) => state);

  useEffect(() => {
    // if (localStorage.getItem("email")) {
    //   dispatch(getUser());
    // }
  }, [dispatch]);

  return store.user.isAuth ? (
    <div>
      <Header handleLogout={handleLogout} />
      <AddCompany />
      <TableCompanies />
    </div>
  ) : (
    <Navigate to="/signin" />
  );
};

export default Main;
