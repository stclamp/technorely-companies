import "./App.css";
import { Routes, Route } from "react-router-dom";
import { getUser } from "api";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";
import { useAuth } from "hooks/use-auth";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Main from "./components/Main/Main";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
