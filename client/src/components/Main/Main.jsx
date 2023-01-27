import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "components/Header/Header";
import TableCompanies from "./TableCompanies/TableCompanies";
import AddCompany from "./AddCompany/AddCompany";
import { getCompanies } from "store/slices/companySlice";
import { useEffect } from "react";

const Main = ({ handleLogout, id, setId, isRedirect, setIsRedirect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = useSelector((state) => state);

  useEffect(() => {
    if (!store.user.isAuth) {
      navigate("/signin");
    } else if (store.user.isAuth) {
      navigate("/");
    }
    dispatch(getCompanies(store.user.id + ""));
  }, [store.user]);

  return (
    <div>
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
