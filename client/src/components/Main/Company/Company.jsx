import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editCompany,
  getCompany,
  getCompanies,
  deleteCompany,
  removeCompany,
} from "store/slices/companySlice";
import { Formik } from "formik";
import * as Yup from "yup";
import Modal from "./Modal/Modal";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Container, TextField } from "@mui/material";

import "./Company.css";

function Company({ id }) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `${company.name} | Technorely Companies`;
    dispatch(getCompany(id), getCompanies(user.id + ""));
  }, [user]);

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

  const handleRemove = (id) => {
    dispatch(deleteCompany(id), removeCompany());
    navigate("/");
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleSave = (values) => {
    setIsEditable(false);
    dispatch(
      editCompany({
        ...values,
        id: company.id,
        userId: company.userId,
      }),
      getCompany(id)
    );
  };

  return (
    <>
      <Container>
        <div className="account__wrapper">
          <h2 className="account__title">Company info</h2>
          {!isEditable ? (
            <>
              <p className="account__text">
                Company name:
                <span className="text">{company.name}</span>
              </p>
              <p className="account__text">
                Company adress:
                <span className="text">{company.adress}</span>
              </p>
              <p className="account__text">
                Company service:
                <span className="text">{company.service}</span>
              </p>
              <p className="account__text">
                Company number of employees:
                <span className="text">{company.numOfEmployees}</span>
              </p>
              <p className="account__text">
                Company description:
                <span className="text">{company.description}</span>
              </p>
              <p className="account__text">
                Company type:
                <span className="text">{company.type}</span>
              </p>
              <Button
                className="account__save"
                variant="contained"
                onClick={handleEdit}
              >
                Edit Company Info
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleOpenModal}
              >
                DeleteCompany
              </Button>
            </>
          ) : (
            <Formik
              initialValues={{
                name: company.name,
                adress: company.adress,
                service: company.service,
                numOfEmployees: company.numOfEmployees,
                description: company.description,
                type: company.type,
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
                      Company name:
                      <TextField
                        color="secondary"
                        className={
                          errors.name
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        value={values.name}
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                      />
                      {touched.name && errors.name && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Company adress:
                      <TextField
                        className={
                          errors.adress
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.adress}
                        onChange={handleChange("adress")}
                        onBlur={handleBlur("adress")}
                      />
                      {touched.adress && errors.adress && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.adress}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Company service:
                      <TextField
                        className={
                          errors.service
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.service}
                        onChange={handleChange("service")}
                        onBlur={handleBlur("service")}
                      />
                      {touched.service && errors.service && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.service}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Company number of employees:
                      <TextField
                        className={
                          errors.numOfEmployees
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.numOfEmployees}
                        onChange={handleChange("numOfEmployees")}
                        onBlur={handleBlur("numOfEmployees")}
                      />
                      {touched.numOfEmployees && errors.numOfEmployees && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.numOfEmployees}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="account__text">
                      Company description:
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
                    <div className="account__text">
                      Company type:
                      <TextField
                        className={
                          errors.type
                            ? "account__input form-input__error"
                            : "account__input"
                        }
                        color="secondary"
                        value={values.type}
                        onChange={handleChange("type")}
                        onBlur={handleBlur("type")}
                      />
                      {touched.type && errors.type && (
                        <div>
                          <span className="form-span__error--small">
                            {errors.type}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="account__save"
                      variant="contained"
                    >
                      Save Company Info
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleOpenModal()}
                    >
                      DeleteCompany
                    </Button>
                  </form>
                );
              }}
            </Formik>
          )}

          <Modal
            isOpen={isOpen}
            handleRemove={handleRemove}
            id={company.id}
            handleCloseModal={handleCloseModal}
          />
        </div>
      </Container>
    </>
  );
}
export default Company;
