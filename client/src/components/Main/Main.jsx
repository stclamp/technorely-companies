import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableCompanies from "./TableCompanies/TableCompanies";
import AddCompany from "./AddCompany/AddCompany";
import { getCompanies } from "store/slices/companySlice";
import { useEffect } from "react";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user.isAuth) {
      navigate("/signin");
    } else if (user.isAuth) {
      navigate("/");
    }
    dispatch(getCompanies(user.id + ""));
  }, [user]);

  return (
    <div>
      <AddCompany />
      <TableCompanies />
    </div>
  );
};

export default Main;
