import { Button, Container } from "@mui/material";
import Header from "components/Header/Header";
import { useState, useEffect } from "react";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "store/slices/userSlice";

const Account = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");

  const handleEdit = () => {
    setIsEditable(true);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setNickname(user.nickname);
    setPhone(user.phone);
    setPosition(user.position);
    setDescription(user.description);
  };

  const handleSave = () => {
    setIsEditable(false);
    dispatch(
      editUser({
        email: user.email,
        firstName,
        lastName,
        nickname,
        phone,
        position,
        description,
      })
    );
  };

  return (
    <>
      <Header />

      <Container>
        <div className="account__wrapper">
          <h2>Account info</h2>
          <p className="account__text">
            Your first name:{" "}
            {isEditable ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            ) : (
              <span>{user.firstName}</span>
            )}
          </p>
          <p className="account__text">
            Your last name:{" "}
            {isEditable ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            ) : (
              <span>{user.lastName}</span>
            )}
          </p>
          <p className="account__text">
            Your nickname:{" "}
            {isEditable ? (
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            ) : (
              <span>{user.nickname}</span>
            )}
          </p>
          <p className="account__text">
            Your phone:{" "}
            {isEditable ? (
              <ReactInputMask
                mask="+380 (99) 999-99-99"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              >
                {() => <input type="text" value={phone} />}
              </ReactInputMask>
            ) : (
              <span>{user.phone}</span>
            )}
          </p>
          <p className="account__text">
            Your position:{" "}
            {isEditable ? (
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            ) : (
              <span>{user.position}</span>
            )}
          </p>
          <p className="account__text">
            Your description:{" "}
            {isEditable ? (
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <span>{user.description}</span>
            )}
          </p>

          {isEditable ? (
            <Button variant="contained" onClick={handleSave}>
              Save Account Info
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEdit}>
              Edit Account Info
            </Button>
          )}
        </div>
      </Container>
    </>
  );
};
export default Account;
