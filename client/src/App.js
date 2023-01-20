import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "store/slices/userSlice";
import { getCompanies } from "store/slices/companySlice";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Main from "./components/Main/Main";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      dispatch(getUser());
      dispatch(getCompanies());
      console.log(store);
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main isAuth={store.user.isAuth} />} />
        <Route
          path="/signin"
          element={
            <SignIn
              isAuth={store.user.isAuth}
              isLoading={store.user.isLoading}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              isAuth={store.user.isAuth}
              isLoading={store.user.isLoading}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
