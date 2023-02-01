import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactInputMask from "react-input-mask";
import { register } from "api/index";
import { setUser } from "store/slices/userSlice";

import { TextField, Button, Container } from "@mui/material";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    document.title = "Sign Up | Technorely Companies";
    !store.user.user.isAuth ? navigate("/signup") : navigate("/");
  }, [store.user]);

  const phoneRegExp =
    /(\+[0-9]{2,4}\s\([0-9]{2,3}\)\s[0-9]{3,4}\-[0-9]{2,3}\-[0-9]{2,3})/gm;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Passwort is required")
      .min(4, "Password too short! Must be at least 4 characters."),
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name too short! Must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name too short! Must be at least 2 characters"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is too short")
      .required("Phone is required"),
    nickname: Yup.string()
      .required("Nickname is required")
      .min(2, "Nickname too short! Must be at least 2 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(2, "Description too short! Must be at least 2 characters"),
    position: Yup.string()
      .required("Position is required")
      .min(2, "Position too short! Must be at least 2 characters"),
  });

  const handleSignUp = (values, { setFieldError }) => {
    register({ ...values })
      .then((user) => {
        dispatch(
          setUser({
            ...user,
            email: user.email.toLowerCase(),
            isAuth: true,
          })
        );
        navigate("/");
      })
      .catch((e) => setFieldError("email", "This email is already taken"));
  };

  return (
    <>
      <Container>
        <h2 className="sigup__title">SIGN UP</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            nickname: "",
            description: "",
            position: "",
          }}
          onSubmit={(values, errors) => {
            handleSignUp(values, errors);
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
                    touched.email && errors.email ? "form-input__error" : null
                  }
                  placeholder="Email"
                  type="email"
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
                    touched.password && errors.password
                      ? "form-input__error"
                      : null
                  }
                  placeholder="Password"
                  type="password"
                  color="secondary"
                  value={values.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                {touched.password && errors.password && (
                  <div>
                    <span className="form-span__error">{errors.password}</span>
                  </div>
                )}
                <ReactInputMask
                  mask="+380 (99) 999-99-99"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                >
                  {() => (
                    <TextField
                      className={
                        touched.email && errors.email
                          ? "form-input__error"
                          : null
                      }
                      placeholder="Phone number"
                      color="secondary"
                    />
                  )}
                </ReactInputMask>
                {touched.phone && errors.phone && (
                  <div>
                    <span className="form-span__error">{errors.phone}</span>
                  </div>
                )}
                <TextField
                  className={
                    touched.firstName && errors.firstName
                      ? "form-input__error"
                      : null
                  }
                  placeholder="First Name"
                  color="secondary"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                />
                {touched.firstName && errors.firstName && (
                  <div>
                    <span className="form-span__error">{errors.firstName}</span>
                  </div>
                )}
                <TextField
                  className={
                    touched.lastName && errors.lastName
                      ? "form-input__error"
                      : null
                  }
                  placeholder="Last Name"
                  color="secondary"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                />
                {touched.lastName && errors.lastName && (
                  <div>
                    <span className="form-span__error">{errors.lastName}</span>
                  </div>
                )}
                <TextField
                  className={
                    touched.nickname && errors.nickname
                      ? "form-input__error"
                      : null
                  }
                  placeholder="Nickname"
                  color="secondary"
                  value={values.nickname}
                  onChange={handleChange("nickname")}
                  onBlur={handleBlur("nickname")}
                />
                {touched.nickname && errors.nickname && (
                  <div>
                    <span className="form-span__error">{errors.nickname}</span>
                  </div>
                )}
                <TextField
                  className={
                    touched.description && errors.description
                      ? "form-input__error"
                      : null
                  }
                  placeholder="Description"
                  color="secondary"
                  value={values.description}
                  onChange={handleChange("description")}
                  onBlur={handleBlur("description")}
                />
                {touched.description && errors.description && (
                  <div>
                    <span className="form-span__error">
                      {errors.description}
                    </span>
                  </div>
                )}
                <TextField
                  className={
                    touched.position && errors.position
                      ? "form-input__error"
                      : null
                  }
                  placeholder="Position"
                  color="secondary"
                  value={values.position}
                  onChange={handleChange("position")}
                  onBlur={handleBlur("position")}
                />
                {touched.position && errors.position && (
                  <div>
                    <span className="form-span__error">{errors.position}</span>
                  </div>
                )}
                <Button variant="contained" type="submit">
                  Sign Up
                </Button>
                <span className="already_register">Already registered? </span>
                <Link to="/signin">Sing In now</Link>
              </form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default SignUp;
