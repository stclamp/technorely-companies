import { TextField, Button } from "@mui/material";
import close from "assets/images/close.svg";
import { Formik } from "formik";
import * as Yup from "yup";
import "./Modal.css";
const Modal = ({ handleCreateCompany, isOpen, handleModalClose }) => {
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
  return isOpen ? (
    <>
      <div
        className="modal__wrapper"
        onClick={(e) => {
          if (e.target.classList.contains("modal__wrapper")) {
            handleModalClose();
          }
        }}
      >
        <Formik
          initialValues={{
            name: "",
            adress: "",
            service: "",
            numOfEmployees: "",
            description: "",
            type: "",
          }}
          onSubmit={(values, errors) => {
            handleCreateCompany(values, errors);
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
              <form onSubmit={handleSubmit} className="modal__form">
                <img
                  onClick={handleModalClose}
                  className="modal__close"
                  src={close}
                  alt="Close"
                />
                <TextField
                  className="modal__input"
                  label="Company name"
                  variant="standard"
                  color="secondary"
                  value={values.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                />
                {touched.name && errors.name && (
                  <div>
                    <span className="form-span__error">{errors.name}</span>
                  </div>
                )}
                <TextField
                  className="modal__input"
                  label="Company adress"
                  variant="standard"
                  color="secondary"
                  value={values.adress}
                  onChange={handleChange("adress")}
                  onBlur={handleBlur("adress")}
                />
                {touched.adress && errors.adress && (
                  <div>
                    <span className="form-span__error">{errors.adress}</span>
                  </div>
                )}
                <TextField
                  className="modal__input"
                  label="Service of activity"
                  variant="standard"
                  color="secondary"
                  value={values.service}
                  onChange={handleChange("service")}
                  onBlur={handleBlur("service")}
                />
                {touched.service && errors.service && (
                  <div>
                    <span className="form-span__error">{errors.service}</span>
                  </div>
                )}
                <TextField
                  className="modal__input"
                  label="Numbers of employees"
                  variant="standard"
                  color="secondary"
                  value={values.numOfEmployees}
                  onChange={handleChange("numOfEmployees")}
                  onBlur={handleBlur("numOfEmployees")}
                />
                {touched.numOfEmployees && errors.numOfEmployees && (
                  <div>
                    <span className="form-span__error">
                      {errors.numOfEmployees}
                    </span>
                  </div>
                )}
                <TextField
                  className="modal__input"
                  label="Description"
                  variant="standard"
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
                  className="modal__input"
                  label="Type"
                  variant="standard"
                  color="secondary"
                  value={values.type}
                  onChange={handleChange("type")}
                  onBlur={handleBlur("type")}
                />
                {touched.type && errors.type && (
                  <div>
                    <span className="form-span__error">{errors.type}</span>
                  </div>
                )}
                <Button
                  variant="contained"
                  className="modal__add-company-btn"
                  type="submit"
                >
                  Create company
                </Button>
              </form>
            );
          }}
        </Formik>
      </div>
    </>
  ) : null;
};
export default Modal;
