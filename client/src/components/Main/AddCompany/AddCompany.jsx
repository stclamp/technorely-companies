import { Container, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "store/slices/companySlice";
import * as Yup from "yup";
import "./AddCompany.css";
import Modal from "./Modal/Modal";

const AddCompany = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name too short! Must be at least 2 characters."),
    adress: Yup.string()
      .required("Adress is required")
      .min(2, "Adress too short! Must be at least 2 characters."),
    service: Yup.string()
      .required("Service is required")
      .min(2, "Service too short! Must be at least 2 characters"),
    numOfEmployees: Yup.string().required("Number of employees is required"),
    description: Yup.string()
      .required("Description is required")
      .min(2, "Description too short! Must be at least 2 characters"),
    type: Yup.string()
      .required("Type is required")
      .min(2, "Type too short! Must be at least 2 characters"),
  });

  const handleCreateCompany = (values) => {
    dispatch(
      createCompany({
        name: values.name,
        adress: values.adress,
        service: values.service,
        numOfEmployees: values.numOfEmployees,
        description: values.description,
        type: values.type,
        userId: store.user.id + "",
      })
    );
    setIsOpen(false);
  };

  return (
    <div className="add-company__wrapper">
      <Container>
        <Modal
          handleCreateCompany={handleCreateCompany}
          isOpen={isOpen}
          handleModalClose={handleModalClose}
          validationSchema={validationSchema}
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
  );
};

export default AddCompany;
