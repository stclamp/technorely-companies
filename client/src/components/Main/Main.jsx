import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header/Header";
import TableCompanies from "./TableCompanies/TableCompanies";
import AddCompany from "./AddCompany/AddCompany";

const Main = ({ handleLogout, id, setId, isRedirect, setIsRedirect }) => {
  const dispatch = useDispatch();

  const store = useSelector((state) => state);

  return store.user.isAuth ? (
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
  ) : (
    <Navigate to="/signin" />
  );
};

export default Main;
