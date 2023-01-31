import { TextField, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "api/index";
import { setUser } from "store/slices/userSlice";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    !store.user.user.isAuth ? navigate("/signin") : navigate("/");
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Passwort is required")
      .min(4, "Password too short! Must be at least 4 characters."),
  });

  const handleLogin = (values, { setFieldError }) => {
    login({ ...values })
      .then((user) => {
        dispatch(
          setUser({
            ...user,
            isAuth: true,
          })
        );
        navigate("/");
      })
      .catch((e) => setFieldError("unAuth", "Incorrect email or password"));
  };

  return (
    <>
      <Container>
        <div className="signin__wrapper">
          <h2 className="signin__title">SIGN IN</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, errors) => {
              handleLogin(values, errors);
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => {
              return (
                <form className="form" onSubmit={handleSubmit}>
                  <TextField
                    className={
                      (touched.email && errors.email) || errors.unAuth
                        ? "form-input__error"
                        : null
                    }
                    placeholder="Email"
                    type={"email"}
                    color="secondary"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <div>
                      <span className="form-span__error">{errors.email}</span>
                    </div>
                  )}

                  <TextField
                    className={
                      (touched.password && errors.password) || errors.unAuth
                        ? "form-input__error"
                        : null
                    }
                    placeholder="Password"
                    type={"password"}
                    color="secondary"
                    value={values.password}
                    onChange={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <div>
                      <span className="form-span__error">
                        {errors.password}
                      </span>
                    </div>
                  )}

                  {errors.unAuth && (
                    <div>
                      <span className="form-span__error">{errors.unAuth}</span>
                    </div>
                  )}
                  <Button variant="contained" type="submit">
                    {store.user.isLoading ? "Loading" : "Sign In"}
                  </Button>
                  <span className="no_account">Don't have an account? </span>
                  <Link to="/signup">Sign up now</Link>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
