import { Button } from "@mui/material";
import { Container } from "@mui/system";
import "./Modal.css";

function Modal({ isOpen, handleCloseModal, handleRemove, id }) {
  const remove = () => {
    handleRemove(id);
    handleCloseModal();
  };
  return (
    isOpen && (
      <Container>
        <div className="modal__wrapper">
          <div className="modal">
            <p className="accept">Are you sure?</p>
            <Button className="modal__yes" variant="contained" onClick={remove}>
              Yes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCloseModal}
            >
              No
            </Button>
          </div>
        </div>
      </Container>
    )
  );
}
export default Modal;
