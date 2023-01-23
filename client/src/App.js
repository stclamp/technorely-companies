import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/slices/userSlice";
import { getCompanies } from "store/slices/companySlice";
import { removeUser } from "store/slices/userSlice";
import { logout } from "api/index";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Main from "./components/Main/Main";
import { PrivateRoute } from "components/PrivateRoute/PrivateRoute";
import { useEffect, useState } from "react";
import Account from "components/Account/Account";
import Company from "components/Main/Company/Company";

function App() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const handleLogout = () => {
    logout();
    dispatch(removeUser());
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(getUser());
    }
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main handleLogout={handleLogout} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/account"
          element={<Account handleLogout={handleLogout} />}
        />
        <Route
          path={`/company/${store.company.company.id || id}`}
          element={<Company id={id} handleLogout={handleLogout} />}
        />
      </Routes>
    </div>
  );
}

export default App;
