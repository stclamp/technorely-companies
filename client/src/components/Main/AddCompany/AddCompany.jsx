import { Container, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "store/slices/companySlice";
import "./AddCompany.css";
import Modal from "./Modal/Modal";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [service, setService] = useState("");
  const [numOfEmployees, setNumOfEmployees] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

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

    setName("");
    setAdress("");
    setService("");
    setNumOfEmployees("");
    setDescription("");
    setType("");
    handleModalClose();
  };

  return (
    <>
      <div className="add-company__wrapper">
        <Container>
          <Modal
            name={name}
            adress={adress}
            service={service}
            numOfEmployees={numOfEmployees}
            description={description}
            type={type}
            setName={setName}
            setAdress={setAdress}
            setService={setService}
            setNumOfEmployees={setNumOfEmployees}
            setDescription={setDescription}
            setType={setType}
            handleCreateCompany={handleCreateCompany}
            isOpen={isOpen}
            handleModalClose={handleModalClose}
          />
          <Button
            className="add-company__btn"
            variant="contained"
            onClick={handleModalOpen}
          >
            Add New Company
          </Button>
        </Container>
      </div>
    </>
  );
};

export default AddCompany;
