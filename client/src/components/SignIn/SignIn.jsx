// import "./SignIn.css";
import { TextField, Button, Container } from "@mui/material";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="signin__wrapper">
          <h2 className="signin__title">Sign In</h2>
          <form className="form">
            <TextField placeholder="Email" type={"email"} color="secondary" />
            <TextField
              placeholder="Password"
              type={"password"}
              color="secondary"
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
  );
};

export default SignIn;
