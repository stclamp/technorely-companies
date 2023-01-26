import { Container, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "store/slices/companySlice";
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

  const handleCreateCompany = (values) => {
    dispatch(
      createCompany({
        name: values.name,
        adress: values.adress,
        service: values.service,
        numOfEmployees: values.numOfEmployees,
        description: values.description,
        type: values.type,
        userId: store.user.id,
      })
    );
    setIsOpen(false);
  };

  return (
    <>
      <div className="add-company__wrapper">
        <Container>
          <Modal
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
