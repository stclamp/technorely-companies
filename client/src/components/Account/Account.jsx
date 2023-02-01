import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactInputMask from "react-input-mask";
import { Formik } from "formik";
import * as Yup from "yup";
import { editUser } from "store/slices/userSlice";
import { Button, Container, TextField } from "@mui/material";

import "./Account.css";

const Account = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    document.title = "Account | Technorely Companies";
    if (!user.isAuth && user.isLoading) {
      navigate("/signin");
    }
  }, []);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = (values) => {
    setIsEditable(false);
    dispatch(
      editUser({
        ...values,
        email: user.email,
      })
    );
  };

  const phoneRegExp =
    /(\+[0-9]{2,4}\s\([0-9]{2,3}\)\s[0-9]{3,4}\-[0-9]{2,3}\-[0-9]{2,3})/gm;

  const validationSchema = Yup.object().shape({
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

  return (
    <>
      <Container>
        <div className="account__wrapper">
          <h2 className="account__title">Account info</h2>
          {!isEditable ? (
            <>
              <p className="account__text">
                Your first name:
                <span className="text">{user.firstName}</span>
              </p>
              <p className="account__text">
                Your last name:
                <span className="text">{user.lastName}</span>
              </p>
              <p className="account__text">
                Your nickname:
                <span className="text">{user.nickname}</span>
              </p>
              <p className="account__text">
                Your phone:
                <span className="text">{user.phone}</span>
              </p>
              <p className="account__text">
                Your position:
                <span className="text">{user.position}</span>
              </p>
              <p className="account__text">
                Your description:
                <span className="text">{user.description}</span>
              </p>
              <Button variant="contained" onClick={handleEdit}>
                Edit Account Info
              </Button>
            </>
          ) : (
            <Formik
              initialValues={{
                firstName: user.firstName,
                lastName: user.lastName,
                nickname: user.nickname,
                phone: user.phone,
                position: user.position,
                description: user.description,
              }}
              onSubmit={(values, errors) => {
                handleSave(values, errors);
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
                  <form onSubmit={handleSubmit}>
                    <div className="account__text">
                      Your first name:
                      <TextField
                        className={
                          errors.firstName
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.firstName}
                        onChange={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                      />
                      {touched.firstName && errors.firstName && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.firstName}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Your last name:
                      <TextField
                        className={
                          errors.lastName
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.lastName}
                        onChange={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                      />
                      {touched.lastName && errors.lastName && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.lastName}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Your nickname:
                      <TextField
                        className={
                          errors.nickname
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.nickname}
                        onChange={handleChange("nickname")}
                        onBlur={handleBlur("nickname")}
                      />
                      {touched.nickname && errors.nickname && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.nickname}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Your phone:
                      <ReactInputMask
                        mask="+380 (99) 999-99-99"
                        value={values.phone}
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                      >
                        {() => (
                          <TextField
                            className={
                              errors.phone
                                ? "account__input form-input__error"
                                : "account__input"
                            }
                            color="secondary"
                          />
                        )}
                      </ReactInputMask>
                      {touched.phone && errors.phone && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.phone}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Your position:
                      <TextField
                        className={
                          errors.position
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.position}
                        onChange={handleChange("position")}
                        onBlur={handleBlur("position")}
                      />
                      {touched.position && errors.position && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.position}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Your description:
                      <TextField
                        className={
                          errors.description
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.description}
                        onChange={handleChange("description")}
                        onBlur={handleBlur("description")}
                      />
                      {touched.description && errors.description && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.description}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button variant="contained" type="submit">
                      Save Account Info
                    </Button>
                  </form>
                );
              }}
            </Formik>
          )}
        </div>
      </Container>
    </>
  );
};
export default Account;
