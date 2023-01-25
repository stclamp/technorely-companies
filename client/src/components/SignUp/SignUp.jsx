import { TextField, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactInputMask from "react-input-mask";
import { register } from "api/index";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/slices/userSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  useEffect(() => {
    if (!store.user.isAuth) {
      navigate("/signup");
    } else {
      navigate("/");
    }
  }, []);

  const checkValidate = () => {
    if (
      formErrors.email === "" &&
      formErrors.password === "" &&
      formErrors.phone === "" &&
      formErrors.firstName === "" &&
      formErrors.lastName === "" &&
      formErrors.nickname === "" &&
      formErrors.description === "" &&
      formErrors.position === ""
    ) {
      return true;
    }
  };

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
    if (!user.phone) {
      errors.phone = "Phone number is required!";
    } else if (/[_]/gm.test(user.phone)) {
      errors.phone = "Phone number is incorrect!";
    }
    if (!user.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!user.lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!user.nickname) {
      errors.nickname = "Nickname is required!";
    }
    if (!user.description) {
      errors.description = "Description is required!";
    }
    if (!user.position) {
      errors.position = "Position is required!";
    }

    return errors;
  };

  const handleSignIn = () => {
    setFormErrors(validate(user));

    if (isSubmit) {
      register(user)
        .then((data) => {
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
        })
        .catch((e) => setFormErrors({ email: "This email already taken" }));
    }
  };

  return (
    <>
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
            className={formErrors.email ? "form-input__error" : null}
            placeholder="Email"
            type="email"
            color="secondary"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFormErrors({
                email: "",
                password: formErrors.password,
                phone: formErrors.phone,
                firstName: formErrors.firstName,
                lastName: formErrors.lastName,
                nickname: formErrors.nickname,
                description: formErrors.description,
                position: formErrors.position,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
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
            type="password"
            color="secondary"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFormErrors({
                email: formErrors.email,
                password: "",
                phone: formErrors.phone,
                firstName: formErrors.firstName,
                lastName: formErrors.lastName,
                nickname: formErrors.nickname,
                description: formErrors.description,
                position: formErrors.position,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
          />
          {formErrors.password && (
            <div>
              <span className="form-span__error">{formErrors.password}</span>
            </div>
          )}
          <ReactInputMask
            mask="+380 (99) 999-99-99"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setFormErrors({
                email: formErrors.email,
                password: formErrors.password,
                phone: "",
                firstName: formErrors.firstName,
                lastName: formErrors.lastName,
                nickname: formErrors.nickname,
                description: formErrors.description,
                position: formErrors.position,
              });

              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
          >
            {() => (
              <TextField
                className={formErrors.phone ? "form-input__error" : null}
                placeholder="Phone number"
                color="secondary"
              />
            )}
          </ReactInputMask>
          {formErrors.phone && (
            <div>
              <span className="form-span__error">{formErrors.phone}</span>
            </div>
          )}

          <TextField
            className={formErrors.firstName ? "form-input__error" : null}
            placeholder="First Name"
            color="secondary"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setFormErrors({
                email: formErrors.email,
                password: formErrors.password,
                phone: formErrors.phone,
                firstName: "",
                lastName: formErrors.lastName,
                nickname: formErrors.nickname,
                description: formErrors.description,
                position: formErrors.position,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
          />
          {formErrors.firstName && (
            <div>
              <span className="form-span__error">{formErrors.firstName}</span>
            </div>
          )}
          <TextField
            className={formErrors.lastName ? "form-input__error" : null}
            placeholder="Last Name"
            color="secondary"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setFormErrors({
                email: formErrors.email,
                password: formErrors.password,
                phone: formErrors.phone,
                firstName: formErrors.firstName,
                lastName: "",
                nickname: formErrors.nickname,
                description: formErrors.description,
                position: formErrors.position,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
          />
          {formErrors.lastName && (
            <div>
              <span className="form-span__error">{formErrors.lastName}</span>
            </div>
          )}
          <TextField
            className={formErrors.nickname ? "form-input__error" : null}
            placeholder="Nickname"
            color="secondary"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setFormErrors({
                email: formErrors.email,
                password: formErrors.password,
                phone: formErrors.phone,
                firstName: formErrors.firstName,
                lastName: formErrors.lastName,
                nickname: "",
                description: formErrors.description,
                position: formErrors.position,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
          />
          {formErrors.nickname && (
            <div>
              <span className="form-span__error">{formErrors.nickname}</span>
            </div>
          )}
          <TextField
            className={formErrors.description ? "form-input__error" : null}
            placeholder="Description"
            color="secondary"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setFormErrors({
                email: formErrors.email,
                password: formErrors.password,
                phone: formErrors.phone,
                firstName: formErrors.firstName,
                lastName: formErrors.lastName,
                nickname: formErrors.nickname,
                description: "",
                position: formErrors.position,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
          />
          {formErrors.description && (
            <div>
              <span className="form-span__error">{formErrors.description}</span>
            </div>
          )}
          <TextField
            className={formErrors.position ? "form-input__error" : null}
            placeholder="Position"
            color="secondary"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
              setFormErrors({
                email: formErrors.email,
                password: formErrors.password,
                phone: formErrors.phone,
                firstName: formErrors.firstName,
                lastName: formErrors.lastName,
                nickname: formErrors.nickname,
                description: formErrors.description,
                position: "",
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
          />
          {formErrors.position && (
            <div>
              <span className="form-span__error">{formErrors.position}</span>
            </div>
          )}
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
