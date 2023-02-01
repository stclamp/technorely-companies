import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/slices/userSlice";
import { removeUser } from "store/slices/userSlice";
import { logout } from "api/index";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Main from "./components/Main/Main";
import Account from "components/Account/Account";
import Company from "components/Main/Company/Company";
import Header from "components/Header/Header";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber } from "@mui/material/colors";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: amber,
    secondary: {
      main: "#56525Bff",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(getUser());
    }
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    dispatch(removeUser());
    navigate("/signin");
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route
            path={`/company/${id || store.company.company.id}`}
            element={<Company id={id || store.company.company.id} />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
