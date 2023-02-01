import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "store/slices/companySlice";

import TableCompanies from "./TableCompanies/TableCompanies";
import AddCompany from "./AddCompany/AddCompany";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const store = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "Main | Technorely Companies";
    if (!store.user.isAuth) {
      navigate("/signin");
    } else {
      navigate("/");
      dispatch(getCompanies(store.user.id + ""));
    }
  }, [store]);

  return (
    <div>
      <AddCompany />
      <TableCompanies />
    </div>
  );
};

export default Main;
