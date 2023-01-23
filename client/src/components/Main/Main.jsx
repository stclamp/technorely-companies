import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header/Header";
import TableCompanies from "./TableCompanies/TableCompanies";
import AddCompany from "./AddCompany/AddCompany";
import { useEffect } from "react";

const Main = ({ handleLogout, id, setId, isRedirect, setIsRedirect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = useSelector((state) => state);

  console.log(!store.user.isAuth);
  useEffect(() => {
    if (!store.user.isAuth && store.user.isLoading) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <AddCompany />
      <TableCompanies
        id={id}
        setId={setId}
        isRedirect={isRedirect}
        setIsRedirect={setIsRedirect}
      />
    </div>
  );
};

export default Main;
