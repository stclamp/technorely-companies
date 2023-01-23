// import "./SignIn.css";
import { TextField, Button, Container } from "@mui/material";
import Header from "../Header/Header";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "api/index";
import { setUser } from "store/slices/userSlice";
import { useState, useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  const user = {
    email,
    password,
  };

  const handleLogin = () => {
    login(user)
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
            isAuth: true,
          })
        );
        navigate("/");
      })
      .catch((e) => alert("Invalid user"));
  };

  return (
    <>
      {store.user.isLoading ? (
        <p></p>
      ) : (
        <>
          <Header />
          <Container>
            <div className="signin__wrapper">
              <h2 className="signin__title">Sign In</h2>
              <form
                className="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <TextField
                  placeholder="Email"
                  type={"email"}
                  color="secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  placeholder="Password"
                  type={"password"}
                  color="secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" type="submit">
                  Sign In
                </Button>
                <span className="no_account">Don't have an account? </span>
                <Link to="/signup">Register now</Link>
              </form>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default SignIn;
