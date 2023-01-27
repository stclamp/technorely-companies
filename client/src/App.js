import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/slices/userSlice";
import { getCompanies } from "store/slices/companySlice";
import { removeUser } from "store/slices/userSlice";
import { logout } from "api/index";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Main from "./components/Main/Main";
import { useEffect } from "react";
import Account from "components/Account/Account";
import Company from "components/Main/Company/Company";
import Header from "components/Header/Header";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const handleLogout = () => {
    logout();
    dispatch(removeUser());
    navigate("/signin");
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(getUser());
    }
    // dispatch(getCompanies(store.user.id + ""));
  }, [dispatch]);

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main handleLogout={handleLogout} />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/account"
          element={<Account handleLogout={handleLogout} />}
        />
        <Route
          path={`/company/${id || store.company.company.id}`}
          element={<Company id={id} handleLogout={handleLogout} />}
        />
      </Routes>
    </div>
  );
}

export default App;
