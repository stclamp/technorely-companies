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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const checkValidate = () => {
    if (
      formErrors.name === "" &&
      formErrors.adress === "" &&
      formErrors.service === "" &&
      formErrors.numOfEmployees === "" &&
      formErrors.description === "" &&
      formErrors.type === ""
    ) {
      return true;
    }
  };

  const validate = ({
    name,
    adress,
    service,
    numOfEmployees,
    description,
    type,
  }) => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required!";
    }
    if (!adress) {
      errors.adress = "Adress is required!";
    }
    if (!service) {
      errors.service = "Service number is required!";
    }
    if (!numOfEmployees) {
      errors.numOfEmployees = "Number Of Employees is required!";
    }
    if (!description) {
      errors.description = "Description is required!";
    }
    if (!type) {
      errors.type = "Type is required!";
    }

    return errors;
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleCreateCompany = (e) => {
    e.preventDefault();
    setFormErrors(
      validate({ name, adress, service, numOfEmployees, description, type })
    );
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
    if (isSubmit) {
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
    }
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
            setIsSubmit={setIsSubmit}
            checkValidate={checkValidate}
            setFormErrors={setFormErrors}
            formErrors={formErrors}
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
