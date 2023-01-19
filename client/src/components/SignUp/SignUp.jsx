import { TextField, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import Header from "../Header/Header";

const SignUp = () => {
  return (
    <>
      <Header />
      <Container>
        <h2 className="sigup__title">Sign Up</h2>
        <form className="form">
          <TextField placeholder="Email" type="email" color="secondary" />
          <TextField placeholder="Password" type="password" color="secondary" />
          <ReactInputMask mask="99/99/9999">
            {() => <TextField placeholder="Phone number" color="secondary" />}
          </ReactInputMask>

          <TextField placeholder="First Name" color="secondary" />
          <TextField placeholder="Last Name" color="secondary" />
          <TextField placeholder="Nickname" color="secondary" />
          <TextField placeholder="Description" color="secondary" />
          <TextField placeholder="Position" color="secondary" />
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
          <span className="already_register">Already registered? </span>
          <Link to="/signin">Sing In now</Link>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
