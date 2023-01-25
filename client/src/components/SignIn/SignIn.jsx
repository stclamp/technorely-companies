import { TextField, Button, Container } from "@mui/material";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "api/index";
import { setUser } from "store/slices/userSlice";
import { useState, useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isValidUser, setIsValidUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    if (!store.user.isAuth) {
      navigate("/signin");
    } else {
      navigate("/");
    }
  }, []);

  const user = {
    email,
    password,
  };

  const validate = (user) => {
    const errors = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!user.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(user.email)) {
      errors.email = "Email must be correct!";
    }
    if (!user.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };

  const handleLogin = () => {
    setFormErrors(validate({ email, password }));
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
      .catch((e) => setIsValidUser(true));
  };

  return (
    <>
      {store.user.isLoading ? (
        <p></p>
      ) : (
        <>
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
                  className={formErrors.email ? "form-input__error" : null}
                  placeholder="Email"
                  type={"email"}
                  color="secondary"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormErrors({ email: "", password: formErrors.password });
                    setIsValidUser(false);
                  }}
                />
                {formErrors.email && (
                  <div>
                    <span className="form-span__error">{formErrors.email}</span>
                  </div>
                )}

                <TextField
                  className={formErrors.password ? "form-input__error" : null}
                  placeholder="Password"
                  type={"password"}
                  color="secondary"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormErrors({ email: formErrors.email, password: "" });
                    setIsValidUser(false);
                  }}
                />
                {formErrors.password && (
                  <div>
                    <span className="form-span__error">
                      {formErrors.password}
                    </span>
                  </div>
                )}

                {isValidUser && !formErrors.email && !formErrors.password && (
                  <div>
                    <span className="form-span__error">
                      Incorrect username or password
                    </span>
                  </div>
                )}
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
