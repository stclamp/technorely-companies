import { TextField, Button } from "@mui/material";
import close from "assets/images/close.svg";
import "./Modal.css";
const Modal = ({
  name,
  adress,
  service,
  numOfEmployees,
  description,
  type,
  setName,
  setAdress,
  setService,
  setNumOfEmployees,
  setDescription,
  setType,
  handleCreateCompany,
  isOpen,
  handleModalClose,
  setIsSubmit,
  checkValidate,
  setFormErrors,
  formErrors,
}) => {
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
        <form onSubmit={handleCreateCompany} className="modal__form">
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
            onChange={(e) => {
              setName(e.target.value);
              setFormErrors({
                name: "",
                adress: formErrors.adress,
                service: formErrors.service,
                numOfEmployees: formErrors.numOfEmployees,
                description: formErrors.description,
                type: formErrors.type,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
            value={name}
          />
          {formErrors.name && (
            <div>
              <span className="form-span__error">{formErrors.name}</span>
            </div>
          )}
          <TextField
            className="modal__input"
            label="Company adress"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setAdress(e.target.value);
              setFormErrors({
                name: formErrors.name,
                adress: "",
                service: formErrors.service,
                numOfEmployees: formErrors.numOfEmployees,
                description: formErrors.description,
                type: formErrors.type,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
            value={adress}
          />
          {formErrors.adress && (
            <div>
              <span className="form-span__error">{formErrors.adress}</span>
            </div>
          )}
          <TextField
            className="modal__input"
            label="Service of activity"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setService(e.target.value);
              setFormErrors({
                name: formErrors.name,
                adress: formErrors.adress,
                service: "",
                numOfEmployees: formErrors.numOfEmployees,
                description: formErrors.description,
                type: formErrors.type,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
            value={service}
          />
          {formErrors.service && (
            <div>
              <span className="form-span__error">{formErrors.service}</span>
            </div>
          )}
          <TextField
            className="modal__input"
            label="Numbers of employees"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setNumOfEmployees(e.target.value);
              setFormErrors({
                name: formErrors.name,
                adress: formErrors.adress,
                service: formErrors.service,
                numOfEmployees: "",
                description: formErrors.description,
                type: formErrors.type,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
            value={numOfEmployees}
          />
          {formErrors.numOfEmployees && (
            <div>
              <span className="form-span__error">
                {formErrors.numOfEmployees}
              </span>
            </div>
          )}
          <TextField
            className="modal__input"
            label="Description"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setDescription(e.target.value);
              setFormErrors({
                name: formErrors.name,
                adress: formErrors.adress,
                service: formErrors.service,
                numOfEmployees: formErrors.numOfEmployees,
                description: "",
                type: formErrors.type,
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
            value={description}
          />
          {formErrors.description && (
            <div>
              <span className="form-span__error">{formErrors.description}</span>
            </div>
          )}
          <TextField
            className="modal__input"
            label="Type"
            variant="standard"
            color="secondary"
            onChange={(e) => {
              setType(e.target.value);
              setFormErrors({
                name: formErrors.name,
                adress: formErrors.adress,
                service: formErrors.service,
                numOfEmployees: formErrors.numOfEmployees,
                description: formErrors.description,
                type: "",
              });
              if (checkValidate()) {
                setIsSubmit(true);
              }
            }}
            value={type}
          />
          {formErrors.type && (
            <div>
              <span className="form-span__error">{formErrors.type}</span>
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
      </div>
    </>
  ) : null;
};
export default Modal;
