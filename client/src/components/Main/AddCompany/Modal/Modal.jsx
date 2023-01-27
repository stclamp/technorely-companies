import { TextField, Button } from "@mui/material";
import close from "assets/images/close.svg";
import { Formik } from "formik";
import "./Modal.css";
const Modal = ({
  handleCreateCompany,
  isOpen,
  handleModalClose,
  validationSchema,
}) => {
  return (
    isOpen && (
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
    )
  );
};
export default Modal;
