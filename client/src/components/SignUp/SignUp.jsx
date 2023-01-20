import { TextField, Button, Container } from "@mui/material";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import Header from "../Header/Header";
import { register } from "api/index";
import { useDispatch } from "react-redux";
import { setUser } from "store/slices/userSlice";

const SignUp = ({ isAuth, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = {
    email,
    password,
    firstName,
    lastName,
    phone,
    nickname,
    description,
    position,
  };

  const handleSignIn = () => {
    register(user).then((data) => {
      dispatch(
        setUser({
          email: data.email,
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          nickname: data.nickname,
          description: data.description,
          position: data.position,
          isAuth: true,
        })
      );
      navigate("/");
    });
  };

  return !isAuth ? (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header />
          <Container>
            <h2 className="sigup__title">Sign Up</h2>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              <TextField
                placeholder="Email"
                type="email"
                color="secondary"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                placeholder="Password"
                type="password"
                color="secondary"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <ReactInputMask
                mask="+380(99) 999-99-99"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              >
                {() => (
                  <TextField placeholder="Phone number" color="secondary" />
                )}
              </ReactInputMask>

              <TextField
                placeholder="First Name"
                color="secondary"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                placeholder="Last Name"
                color="secondary"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <TextField
                placeholder="Nickname"
                color="secondary"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <TextField
                placeholder="Description"
                color="secondary"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <TextField
                placeholder="Position"
                color="secondary"
                value={position}
                onChange={(e) => {
                  setPosition(e.target.value);
                }}
              />
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
              <span className="already_register">Already registered? </span>
              <Link to="/signin">Sing In now</Link>
            </form>
          </Container>
        </>
      )}
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default SignUp;
