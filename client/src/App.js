import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/slices/userSlice";
import { createCompany, getCompanies } from "store/slices/companySlice";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Main from "./components/Main/Main";
import { useEffect } from "react";
import Account from "components/Account/Account";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(getUser());
    }
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
