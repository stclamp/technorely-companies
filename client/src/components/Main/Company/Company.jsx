import Header from "components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  editCompany,
  getCompany,
  deleteCompany,
  removeCompany,
  getCompanies,
} from "store/slices/companySlice";
import { Button, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Company({ id, handleLogout }) {
  const company = useSelector((state) => state.company.company);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(company.name || "");
  const [adress, setAdress] = useState(company.adress || "");
  const [service, setService] = useState(company.service || "");
  const [numOfEmployees, setNumOfEmployees] = useState(
    company.numOfEmployees || ""
  );
  const [description, setDescription] = useState(company.description || "");
  const [type, setType] = useState(company.type || "");

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.isAuth && user.isLoading) {
      navigate("/signin");
    }
    dispatch(getCompany(id));
  }, []);

  const handleRemove = (id) => {
    const answer = window.confirm("Are yoy sure?");
    if (answer) {
      dispatch(deleteCompany(id));
      dispatch(removeCompany());
      dispatch(getCompanies());
      navigate("/");
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
    setName(company.name);
    setAdress(company.adress);
    setService(company.service);
    setNumOfEmployees(company.numOfEmployees);
    setDescription(company.description);
    setType(company.type);
  };

  const handleSave = () => {
    if (
      !name.trim() ||
      !adress.trim() ||
      !service.trim() ||
      !numOfEmployees.trim() ||
      !description.trim() ||
      !type.trim()
    ) {
      alert("Input corret data");
      setIsEditable(true);
    } else {
      setIsEditable(false);
      dispatch(
        editCompany({
          id: company.id,
          name,
          adress,
          service,
          numOfEmployees,
          description,
          type,
          userId: company.userId,
        })
      );
    }
  };

  return (
    <>
      <Header handleLogout={handleLogout} />

      <Container>
        <div className="account__wrapper">
          <h2>Company info</h2>
          <p className="account__text">
            Company name:
            {isEditable ? (
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            ) : (
              <span>{name || company.name}</span>
            )}
          </p>
          <p className="account__text">
            Company adress:
            {isEditable ? (
              <input
                type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
            ) : (
              <span>{adress || company.adress}</span>
            )}
          </p>
          <p className="account__text">
            Company service:
            {isEditable ? (
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
            ) : (
              <span>{service || company.service}</span>
            )}
          </p>
          <p className="account__text">
            Company number of emplyees:
            {isEditable ? (
              <input
                type="text"
                value={numOfEmployees}
                onChange={(e) => {
                  setNumOfEmployees(e.target.value);
                }}
              />
            ) : (
              <span>{numOfEmployees || company.numOfEmployees}</span>
            )}
          </p>
          <p className="account__text">
            Company description:
            {isEditable ? (
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <span>{description || company.description}</span>
            )}
          </p>
          <p className="account__text">
            Company type:
            {isEditable ? (
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            ) : (
              <span>{type || company.type}</span>
            )}
          </p>

          {isEditable ? (
            <Button variant="contained" onClick={handleSave}>
              Save Company Info
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEdit}>
              Edit Company Info
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => handleRemove(company.id)}
          >
            DeleteCompany
          </Button>
        </div>
      </Container>
    </>
  );
}
export default Company;
