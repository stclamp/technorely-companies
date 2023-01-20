import { Container, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "store/slices/companySlice";
import "./AddCompany.css";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [service, setService] = useState("");
  const [numOfEmployees, setNumOfEmployees] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const handleCreateCompany = (e) => {
    e.preventDefault();
    if (
      !name.trim() &&
      !adress.trim() &&
      !service.trim() &&
      !numOfEmployees &&
      !description.trim() &&
      !type.trim()
    ) {
      return;
    }
    dispatch(
      createCompany({
        name: name,
        adress: adress,
        service: service,
        numOfEmployees: numOfEmployees,
        description: description,
        type: type,
        userId: store.user.id,
      })
    );

    console.log(store);

    setName("");
    setAdress("");
    setService("");
    setNumOfEmployees("");
    setDescription("");
    setType("");
  };

  return (
    <>
      <div className="add-company__wrapper">
        <Container>
          <form onSubmit={handleCreateCompany} className="add-company__form">
            <TextField
              label="Company name"
              variant="standard"
              color="secondary"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextField
              label="Company adress"
              variant="standard"
              color="secondary"
              onChange={(e) => setAdress(e.target.value)}
              value={adress}
            />
            <TextField
              label="Service of activity"
              variant="standard"
              color="secondary"
              onChange={(e) => setService(e.target.value)}
              value={service}
            />
            <TextField
              label="Numbers of employees"
              variant="standard"
              color="secondary"
              onChange={(e) => setNumOfEmployees(e.target.value)}
              value={numOfEmployees}
            />
            <TextField
              label="Description"
              variant="standard"
              color="secondary"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <TextField
              label="Type"
              variant="standard"
              color="secondary"
              onChange={(e) => setType(e.target.value)}
              value={type}
            />
            <Button variant="contained" type="submit">
              Create company
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default AddCompany;
