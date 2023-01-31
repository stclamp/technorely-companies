import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableCompanies from "./TableCompanies/TableCompanies";
import AddCompany from "./AddCompany/AddCompany";
import { getCompanies } from "store/slices/companySlice";
import { useEffect } from "react";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = useSelector((state) => state.user);

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
      <TableCompanies />
    </div>
  );
};

export default Main;
