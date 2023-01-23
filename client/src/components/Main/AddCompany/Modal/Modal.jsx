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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            className="modal__input"
            label="Company adress"
            variant="standard"
            color="secondary"
            onChange={(e) => setAdress(e.target.value)}
            value={adress}
          />
          <TextField
            className="modal__input"
            label="Service of activity"
            variant="standard"
            color="secondary"
            onChange={(e) => setService(e.target.value)}
            value={service}
          />
          <TextField
            className="modal__input"
            label="Numbers of employees"
            variant="standard"
            color="secondary"
            onChange={(e) => setNumOfEmployees(e.target.value)}
            value={numOfEmployees}
          />
          <TextField
            className="modal__input"
            label="Description"
            variant="standard"
            color="secondary"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <TextField
            className="modal__input"
            label="Type"
            variant="standard"
            color="secondary"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
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
